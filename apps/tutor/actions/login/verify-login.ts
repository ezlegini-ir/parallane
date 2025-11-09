"use server";

import { database } from "@parallane/database";
import { isHumanOrNot, sendOtpEmail } from "@parallane/utils";
import bcrypt from "bcrypt";

export const verifyLogin = async (
  email: string,
  password: string,
  recaptchaToken: string
) => {
  try {
    await isHumanOrNot(recaptchaToken);

    const existingTutor = await database.tutor.findFirst({
      where: { email },
    });

    if (!existingTutor) return { error: "Invalid Credentials" };

    const isValidPassword = await bcrypt.compare(
      password,
      existingTutor.password
    );

    if (!isValidPassword) return { error: "Invalid Credentials" };

    await sendOtpEmail({ email, tutorId: existingTutor.id });

    return { success: "OTP sent successfully." };
  } catch (error) {
    return { error: String(error) };
  }
};
