import CourseRatingForm from "@/components/forms/CourseRatingForm";
import Table from "@parallane/ui/components/Table";
import { Button } from "@parallane/ui/components/ui/button";
import { TableCell, TableRow } from "@parallane/ui/components/ui/table";
import { getSessionUser } from "@/data/user";
import { database } from "@parallane/database";
import { placeHolder } from "@/public";
import {
  Certificate,
  ClassRoom,
  Course,
  Enrollment,
  Image as ImageType,
  Tutor,
} from "@parallane/database";
import { Download, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CardBox from "../../components/CardBox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@parallane/ui/components/ui/tooltip";
import { getReviewByUserIdAndCourseId } from "@/data/review";
import { redirect } from "next/navigation";
import { loginPageRoute } from "@/middleware";

const CompletedCourses = async () => {
  const user = await getSessionUser();
  if (!user) redirect(loginPageRoute);

  const completedCourses = await database.enrollment.findMany({
    where: { completedAt: { not: null }, userId: user?.id },

    include: {
      classroom: true,
      certificate: true,
      course: {
        include: {
          image: true,
          tutor: true,
        },
      },
    },
  });

  interface EnrollmentType extends Enrollment {
    classroom: ClassRoom;
    certificate: Certificate | null;
    course: Course & { image: ImageType | null; tutor: Tutor | null };
  }

  const renderRows = async (enrollment: EnrollmentType) => {
    const existingReview = await getReviewByUserIdAndCourseId(
      enrollment.userId,
      enrollment.courseId
    );

    const isCertificateAllowedToDownload = !!existingReview;

    return (
      <TableRow>
        <TableCell>
          <Link
            href={`/classroom/${enrollment.classroom?.id}`}
            className="flex gap-2 items-center"
          >
            <Image
              alt=""
              src={enrollment.course.image?.url || placeHolder}
              width={70}
              height={70}
              className="object-cover rounded-sm"
            />
            {enrollment.course.title}
          </Link>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Link href={`/tutors/${enrollment.course.tutor?.slug}`}>
            {enrollment.course.tutor?.name}
          </Link>
        </TableCell>
        <TableCell>
          <a
            className="flex flex-col items-center"
            rel="noopener noreferrer"
            target="_blank"
            href={
              isCertificateAllowedToDownload
                ? enrollment.certificate?.url
                : undefined
            }
          >
            <Button
              variant="link"
              size="icon"
              disabled={!isCertificateAllowedToDownload}
              style={
                isCertificateAllowedToDownload
                  ? undefined
                  : { pointerEvents: "none" }
              }
            >
              <div className="flex flex-col items-center gap-1">
                <Download className="scale-110" />
              </div>
            </Button>
            {!isCertificateAllowedToDownload && (
              <span className="text-xs text-destructive opacity-100 whitespace-pre-line text-center">
                Rating is required to download the certificate.
              </span>
            )}
          </a>
        </TableCell>
        <TableCell>
          <div className="flex justify-end">
            {existingReview ? (
              <TooltipProvider delayDuration={25}>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="flex items-center gap-1">
                      {Array.from({ length: existingReview.rate }).map(
                        (_, index) => (
                          <Star
                            key={index}
                            size={15}
                            fill="#facc15"
                            className="text-yellow-400"
                          />
                        )
                      )}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>{existingReview.content}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <CourseRatingForm
                courseId={enrollment.courseId}
                userId={user?.id}
              />
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <CardBox title="Completed Courses">
      <Table
        columns={columns}
        data={completedCourses}
        renderRows={renderRows}
        noDataMessage="You have not completed any courses yet."
      />
    </CardBox>
  );
};

const columns = [
  { label: "Course", className: "text-left" },
  { label: "Tutor", className: "hidden md:table-cell text-left" },
  { label: "Certificate", className: "text-center" },
  { label: "Your Rating", className: "text-right" },
];

export default CompletedCourses;
