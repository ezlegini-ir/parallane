"use server";

import { database } from "@parallane/database";
import bcrypt from "bcryptjs";
import { addMinutes, differenceInSeconds } from "date-fns";

export const generateOtp = async (
  email: string,
  userId?: number,
  adminId?: number,
  tutorId?: number
) => {
  // GENERATE DAYA
  const plainOtp = Math.floor(10000 + Math.random() * 90000).toString();
  const expires = addMinutes(new Date(), 2);

  // LOOK UP USER
  const existingToken = await database.otp.findFirst({
    where: {
      email,
    },
  });

  if (existingToken && existingToken.expires > new Date()) {
    const remainingSeconds = differenceInSeconds(
      existingToken.expires,
      new Date()
    );
    throw new Error(
      `An OTP has already been sent to this email. Please wait ${remainingSeconds} seconds before requesting a new one.`
    );
  }

  if (existingToken) {
    await database.otp.delete({
      where: { email },
    });
  }

  // HASH OTP
  const hashedOTP = await bcrypt.hash(plainOtp, 10);

  await database.otp.create({
    data: {
      expires,
      email,
      otpCode: hashedOTP,
      userId,
      adminId,
      tutorId,
    },
  });

  return { plainOtp };
};
