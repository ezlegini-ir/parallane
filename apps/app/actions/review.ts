"use server";

import { CourseReviewFormType } from "@/lib/validationSchema";
import { database } from "@parallane/database";

export const createReview = async (
  data: CourseReviewFormType,
  userId: number,
  courseId: number
) => {
  const { rating, review } = data;

  try {
    const existingReview = await database.review.findFirst({
      where: { userId, courseId },
    });
    if (existingReview)
      return { error: "You have already submitted a review." };

    await database.review.create({
      data: {
        rate: rating,
        content: review,
        courseId,
        userId,
      },
    });

    return { success: "Thanks, Your review has been submitted." };
  } catch (error) {
    return { error: String(error) };
  }
};
