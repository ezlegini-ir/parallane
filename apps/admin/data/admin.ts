"use server";
import { auth } from "@parallane/auth";
import { database } from "@parallane/database";

export const getAdmins = async () => {
  return await database.admin.findMany();
};

export const getAdminByEmail = async (email: string) => {
  return await database.admin.findFirst({
    where: { email },
  });
};

export const getAdminById = async (id: string | number) => {
  return await database.admin.findUnique({
    where: {
      id: +id,
    },
    include: { image: true },
  });
};

export const getSessionAdmin = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return userId ? await getAdminById(userId) : null;
};
