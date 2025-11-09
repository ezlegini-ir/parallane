"use server";

import { database } from "@parallane/database";
import {
  generateCertificate,
  generateUniqueSerial,
  sendFinishCourseEmail,
} from "@parallane/utils";
import { UploadApiResponse } from "cloudinary";
import { uploadCloudFile } from "@parallane/utils";
import { getSessionUser } from "@/data/user";

export const createLessonProgress = async (
  lessonId: number,
  classroomId: string
) => {
  try {
    const result = await database.$transaction(async (tx) => {
      const existingClassroom = await tx.classRoom.findFirst({
        where: { id: classroomId },
        include: {
          enrollment: {
            include: {
              lessonProgress: true,
              course: {
                include: {
                  curriculum: {
                    include: {
                      lessons: {
                        include: {
                          lessonProgress: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!existingClassroom) return { error: "Classroom Not Found." };

      await tx.lessonProgress.create({
        data: {
          completed: true,
          completedAt: new Date(),
          enrollmentId: existingClassroom.enrollmentId,
          userId: existingClassroom.userId,
          lessonId,
        },
      });

      const totalLessons =
        existingClassroom.enrollment.course.curriculum.reduce(
          (acc, curr) => acc + curr.lessons.length,
          0
        );

      const totalCompletedLessons = await tx.lessonProgress.count({
        where: {
          Enrollment: {
            classroom: {
              id: classroomId,
            },
          },
        },
      });

      const progress = (totalCompletedLessons / totalLessons) * 100;

      await tx.enrollment.update({
        where: {
          id: existingClassroom.enrollmentId,
        },
        data: {
          progress,
          status: "IN_PROGRESS",
        },
      });

      const isLastLesson = totalCompletedLessons === totalLessons;

      if (isLastLesson) {
        await tx.enrollment.update({
          where: {
            id: existingClassroom.enrollmentId,
          },
          data: {
            completedAt: new Date(),
            progress,
          },
        });

        return {
          success: "Congratulations! You completed the course successfully.",
          isLastLesson: true,
          enrollment: existingClassroom.enrollment,
        };
      } else {
        return {
          success: "Good Job! Lesson marked as completed.",
          isLastLesson: false,
        };
      }
    });

    // Certificate
    if (result.enrollment && result.isLastLesson) {
      const serialNumber = await generateUniqueSerial();

      const user = await getSessionUser();
      if (!user) throw new Error("User not found. please log in again.");

      const updatedClassroom = await database.classRoom.update({
        where: { id: classroomId },
        data: {
          enrollment: {
            update: {
              status: "COMPLETED",
            },
          },
        },
        include: { enrollment: { include: { course: true } } },
      });
      if (!updatedClassroom)
        throw new Error("Course Not Found. Please try again later.");

      const existingCertificate = await database.certificate.findFirst({
        where: {
          enrollment: {
            classroom: {
              id: classroomId,
            },
          },
        },
      });

      if (!existingCertificate) {
        const buffer = await generateCertificate(
          user,
          updatedClassroom?.enrollment.course.title,
          updatedClassroom.enrollment.course.duration,
          updatedClassroom.enrollment.completedAt || new Date(),
          serialNumber
        );

        const { secure_url, bytes, public_id, resource_type } =
          (await uploadCloudFile(buffer, {
            format: "pdf",
            resource_type: "raw",
            folder: "certificate",
          })) as UploadApiResponse;

        const newCertificate = await database.certificate.create({
          data: {
            serial: serialNumber,
            url: secure_url,
            enrollmentId: result.enrollment.id,
          },
        });

        await database.file.create({
          data: {
            format: "pdf",
            public_id,
            size: bytes,
            type: "CERTIFICATE",
            url: secure_url,
            resource_type,
            fileName: serialNumber + ".pdf",
            certificateId: newCertificate.id,
          },
        });

        await sendFinishCourseEmail(
          user.email,
          result.enrollment.course.title,
          user.name!
        );
      }
    }

    return result;
  } catch (error) {
    return { error: String(error) };
  }
};
