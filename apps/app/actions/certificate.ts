"use server";

import { isHumanOrNot } from "@parallane/utils";
import { database } from "@parallane/database";

export const verifyCertificate = async (
  serial: string,
  recaptchaToken: string
) => {
  try {
    await isHumanOrNot(recaptchaToken);

    const certificate = await database.certificate.findFirst({
      where: { serial },
      include: {
        enrollment: {
          include: {
            user: true,
            course: true,
          },
        },
      },
    });

    if (certificate) {
      return {
        success:
          "This Certificate is valid and registered in parallane's system.",
        certificate,
      };
    } else {
      return {
        error:
          "This Certificate is not valid and registered in parallane's system. ",
      };
    }
  } catch (error) {
    return { error: String(error) };
  }
};
