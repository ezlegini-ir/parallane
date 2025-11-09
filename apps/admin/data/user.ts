"use server";

import { auth } from "@parallane/auth";
import { database } from "@parallane/database";

export const getUserByEmail = async (email: string) => {
  return await database.user.findFirst({
    where: { email: email },
  });
};

export const getUserById = async (id: number) => {
  if (!id) return;
  return await database.user.findUnique({
    where: {
      id,
    },
    include: {
      wallet: true,
    },
  });
};

export const getSessionUser = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return userId ? await getUserById(+userId) : null;
};

export const getUsersCount = async () => {
  return await database.user.count();
};
