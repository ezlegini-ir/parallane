"use server";

import {
  PaymentType,
  renderFinishCourseEmail,
  renderOtpEmail,
  renderResetPasswordEmail,
  renderSuccessPaymentEmail,
  renderSuccessPaymentEmailToAdmin,
} from "./email-templates";
import { generateOtp } from "./otp";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Parallane <admin@parallane.com>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error(error);
      return { success: false, error };
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
};

//! -------------------------------------------------------------------

export const sendOtpEmail = async (data: {
  email: string;
  userId?: number;
  adminId?: number;
  tutorId?: number;
}) => {
  try {
    const { plainOtp } = await generateOtp(
      data.email,
      data.userId,
      data.adminId,
      data.tutorId
    );
    const emailHtml = await renderOtpEmail(plainOtp);

    await sendEmail({
      subject: `🔒 Email Verification: ${plainOtp}`,
      to: data.email,
      html: emailHtml,
    });

    return { success: true };
  } catch (error) {
    return { error: String(error) };
  }
};

//! -------------------------------------------------------------------

export const sendResetPasswordEmail = async (email: string, token: string) => {
  try {
    const emailHtml = await renderResetPasswordEmail(token, email);

    await sendEmail({
      subject: `🔒 Reset Password | Parallane`,
      to: email,
      html: emailHtml,
    });

    return { success: true };
  } catch (error) {
    throw new Error(String(error));
  }
};

//! -------------------------------------------------------------------

export const sendSuccessPaymentEmail = async (
  email: string,
  fullName: string,
  payment: PaymentType
) => {
  const emailHtml = await renderSuccessPaymentEmail(fullName, payment);

  await sendEmail({
    to: email,
    subject: `✅ Success Enrollment!`,
    html: emailHtml,
  });
};

//! -------------------------------------------------------------------

export const sendSuccessPaymentEmailToAdmin = async (
  email: string,
  fullName: string,
  payment: PaymentType
) => {
  const emailHtml = await renderSuccessPaymentEmailToAdmin(fullName, payment);

  await sendEmail({
    to: email,
    subject: `✅ Success Enrollment!!`,
    html: emailHtml,
  });
};

//! -------------------------------------------------------------------

export const sendFinishCourseEmail = async (
  email: string,
  courseTitle: string,
  fullName: string
) => {
  const emailHtml = await renderFinishCourseEmail(courseTitle, fullName);

  await sendEmail({
    to: email,
    subject: `🎉 Course Finished!`,
    html: emailHtml,
  });
};
