"use server";

import { getOtpByEmail } from "@/data/otp";
import { getAdminByEmail } from "@/data/admin";
import { database } from "@parallane/database";
import bcrypt from "bcrypt";
import { isHumanOrNot } from "@parallane/utils";

export const verifyOtp = async (
  otp: string,
  email: string,
  recaptchaToken: string
) => {
  try {
    await isHumanOrNot(recaptchaToken);

    // OTP LOOK UP
    const existingOtp = await getOtpByEmail(email);

    // CHECK EXISTANCE
    if (!existingOtp) return { error: "Invalid Code" };

    // CHECK EXPIRATION
    const hasExpired = new Date(existingOtp.expires) < new Date();
    if (hasExpired) {
      return { error: `Code has been expired` };
    }

    // CHECK OTP
    const isValidOtp = await bcrypt.compare(otp, existingOtp.otpCode);
    if (!isValidOtp) return { error: "Invalid Code" };

    // DELETE OTP
    await database.otp.delete({
      where: {
        email: existingOtp.email,
      },
    });

    // FIND USER OF THIS OTP
    const existingAdmin = await getAdminByEmail(email);

    return { success: "Seccuess", role: existingAdmin?.role };
  } catch (error) {
    return { error: "Something Happended" };
  }
};
