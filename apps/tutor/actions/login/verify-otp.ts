"use server";

import { isHumanOrNot } from "@parallane/utils";
import { database } from "@parallane/database";
import bcrypt from "bcrypt";
import { getOtpByEmail } from "@/data/otp";

export const verifyOtp = async (
  otp: string,
  identifier: string,
  recaptchaToken: string
) => {
  try {
    await isHumanOrNot(recaptchaToken);

    const existingOtp = await getOtpByEmail(identifier);

    if (!existingOtp) return { error: "Invalid Code" };

    const hasExpired = new Date(existingOtp.expires) < new Date();
    if (hasExpired) {
      return { error: `Code has been expired` };
    }

    const isValidOtp = await bcrypt.compare(otp, existingOtp.otpCode);
    if (!isValidOtp) return { error: "Invalid Code" };

    await database.otp.delete({
      where: {
        email: existingOtp.email,
      },
    });

    return { success: "Seccuess" };
  } catch (error) {
    return { error: "Something Happended" };
  }
};
