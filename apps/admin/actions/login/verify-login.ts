"use server";

import { getAdminByEmail } from "@/data/admin";
import { isHumanOrNot, sendOtpEmail } from "@parallane/utils";
import bcrypt from "bcrypt";

export const verifyLogin = async (
  email: string,
  password: string,
  recaptchaToken: string
) => {
  try {
    await isHumanOrNot(recaptchaToken);

    const existingAdmin = await getAdminByEmail(email);
    if (!existingAdmin) return { error: "Invalid Credentials" };

    const isValidPassword = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!isValidPassword) return { error: "Invalid Credentials" };

    await sendOtpEmail({
      email,
      adminId: existingAdmin.id,
    });

    return { success: `Otp Sent to ${email}.` };
  } catch (error) {
    return { error: String(error) };
  }
};
