"use server";

import { isHumanOrNot } from "@parallane/utils";
import { ContactFormType } from "@/lib/validationSchema";
import { database } from "@parallane/database";

export const createContact = async (
  data: ContactFormType,
  recaptchaToken: string
) => {
  const { email, fullName, message, subject } = data;
  try {
    await isHumanOrNot(recaptchaToken);

    await database.contact.create({
      data: {
        email,
        fullName,
        message,
        subject,
      },
    });

    return {
      success:
        "Sent successfully! Response time is usually within 24 hours via email.",
    };
  } catch (error) {
    return { error: String(error) };
  }
};
