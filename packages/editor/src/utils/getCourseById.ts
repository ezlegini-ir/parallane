"use server";

import { database } from "@parallane/database";

export const getCourseById = async (courseId: string) => {
  return await database.course.findUnique({
    where: { id: +courseId },
    include: {
      image: true,
    },
  });
};
