"use server";

import { database } from "@parallane/database";
import { isHumanOrNot } from "@parallane/utils";
import bcrypt from "bcryptjs";

export const verifyOtp = async (
  otp: string,
  email: string,
  recaptchaToken?: string
) => {
  try {
    if (recaptchaToken) await isHumanOrNot(recaptchaToken);

    const existingOtp = await database.otp.findFirst({
      where: {
        email,
      },
    });

    if (!existingOtp) return { error: "The entered code is not valid!" };

    const hasExpired = existingOtp.expires < new Date();
    if (hasExpired) {
      await database.otp.delete({
        where: { email },
      });

      return { error: `The verification code has expired` };
    }

    const isValidOtp = await bcrypt.compare(otp, existingOtp.otpCode);
    if (!isValidOtp) return { error: "The entered code is not valid" };

    const deletedOtp = await database.otp.delete({
      where: {
        email: existingOtp.email,
      },
      include: { user: true },
    });

    await database.user.update({
      where: { id: deletedOtp.user?.id },
      data: { emailVerified: new Date(), email },
    });

    return { success: "Authentication was successful!" };
  } catch (error) {
    return { error: String(error) };
  }
};
