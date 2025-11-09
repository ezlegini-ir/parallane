"use server";

import { auth } from "@parallane/auth";
import { database } from "@parallane/database";

export const getTutorById = async (id: string | number) => {
  return await database.tutor.findUnique({
    where: {
      id: +id,
    },
    include: { image: true },
  });
};

export const getAllTutors = async () => {
  return await database.tutor.findMany({
    include: { image: true },
  });
};

export const getSessionTutor = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return userId ? await getTutorById(userId) : null;
};
