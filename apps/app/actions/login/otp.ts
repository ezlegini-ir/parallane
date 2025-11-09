"use server";

import { getUserByEmail } from "@/data/user";
import { sendOtpEmail } from "@parallane/utils";

export async function sendOtp({
  email,
  userId,
}: {
  email: string;
  recaptchaToken?: string;
  userId: number;
}) {
  try {
    const existingUser = await getUserByEmail(email);

    await sendOtpEmail({ email, userId });

    return { isNewUser: !!!existingUser };
  } catch (error) {
    return { error: String(error) };
  }
}
