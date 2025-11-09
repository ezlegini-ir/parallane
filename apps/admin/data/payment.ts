"use server";

import { database } from "@parallane/database";

export const getPaymentById = async (id: number) => {
  return await database.enrollment.findMany({
    where: { id },
  });
};
