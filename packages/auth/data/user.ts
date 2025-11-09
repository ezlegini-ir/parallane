"use server";

import { database } from "@parallane/database";

export const getUserByIdentifier = async (phoneOrEmail: string) => {
  return await database.user.findFirst({
    where: {
      OR: [{ email: phoneOrEmail }],
    },
  });
};

export const getUserById = async (id: number) => {
  return await database.user.findUnique({
    where: {
      id,
    },
    include: {
      wallet: true,
    },
  });
};
