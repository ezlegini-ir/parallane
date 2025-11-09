"use server";

import { database } from "@parallane/database";

export const getPostById = async (postId: string) => {
  return await database.post.findUnique({
    where: { id: +postId },
    include: {
      image: true,
    },
  });
};
