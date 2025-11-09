"use server";

import { getUserByEmail } from "@/data/user";
import { database } from "@parallane/database";
import { sendResetPasswordEmail } from "@parallane/utils";
import { addMinutes } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { ResetPasswordFormType } from "@/lib/validationSchema";

export const sendResetPasswordToken = async (email: string) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser)
      throw new Error("There is no user with this Email address.");

    const existingToken = await database.resetPasswordToken.findFirst({
      where: {
        user: {
          email,
        },
      },
    });

    if (existingToken)
      await database.resetPasswordToken.delete({
        where: {
          id: existingToken.id,
        },
      });

    const token = uuidv4();

    const hashedToken = await bcrypt.hash(token, 10);

    await database.resetPasswordToken.create({
      data: {
        expires: addMinutes(new Date(), 10),
        token: hashedToken,
        userId: existingUser.id,
      },
    });

    await sendResetPasswordEmail(existingUser.email, token);

    return { success: `Reset Link Sent to ${existingUser.email}` };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

interface ResetPasswordProps {
  token: string | undefined;
  data: ResetPasswordFormType;
  email: string;
}

export const resetPassword = async ({
  data,
  email,
  token,
}: ResetPasswordProps) => {
  const { confirmPassword, newPassword } = data;

  try {
    if (!token) throw new Error("No Reset Password Token Provided In URL");

    const existingToken = await database.resetPasswordToken.findFirst({
      where: {
        user: { email },
      },
      include: { user: true },
    });

    if (!existingToken) throw new Error("Invalid Reset Password Token");

    const isExpired = existingToken.expires.getTime() < Date.now();
    if (isExpired) throw new Error("Reset Password Token Expired");

    const isValidToken = await bcrypt.compare(token, existingToken.token);
    if (!isValidToken) throw new Error("Invalid Reset Password Token");

    const isPasswordsMatch = newPassword === confirmPassword;
    if (!isPasswordsMatch) throw new Error("Passwords do not match.");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await database.user.update({
      where: { id: existingToken.userId },
      data: {
        password: hashedPassword,
        emailVerified: existingToken.user.emailVerified
          ? existingToken.user.emailVerified
          : new Date(),
      },
    });

    await database.resetPasswordToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      success: "Password Updated Successfully.",
      newPassword: updatedUser.password,
    };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
