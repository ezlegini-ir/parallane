"use server";

import { User } from "@parallane/database";
import { formatDuration } from "@parallane/utils";
import { format } from "date-fns";
import path from "path";
import PDFDocument from "pdfkit";

export async function generateCertificate(
  user: User,
  courseTitle: string,
  courseDuration: number,
  completedAt: Date,
  serialNumber: string
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const bgPath = path.join(process.cwd(), "public/certificate-temp.png");

      const fontPath = path.join(
        process.cwd(),
        "public/fonts/Inter-Medium.ttf"
      );

      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        font: fontPath,
      });

      const buffers: Buffer[] = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.image(bgPath, 0, 0, { width: 842, height: 595 });

      const pageWidth = doc.page.width;
      const margin = 50;

      doc.fontSize(21).text(courseTitle, margin, 170, {
        width: pageWidth - margin * 2,
        align: "center",
      });

      doc
        .fontSize(10)
        .fillColor("#909090")
        .text(`Serial Number: ${serialNumber}`, margin, 210, {
          width: pageWidth - margin * 2,
          align: "center",
        });

      doc
        .fontSize(18)
        .fillColor("#000")
        .text(user.name!, margin, 235, {
          width: pageWidth - margin * 2,
          align: "center",
        });

      const certText = `This is to certify that ${user.name} has successfully completed the mentioned course.`;

      doc
        .fontSize(11)
        .fillColor("#6d6d6d")
        .text(certText, margin, 265, {
          width: pageWidth - margin * 2,
          align: "center",
        });

      const courseInfoText = `This course included more than ${formatDuration(courseDuration)} of professional training and was completed on ${format(completedAt, "PPP")}.`;

      doc
        .fontSize(11)
        .fillColor("#6d6d6d")
        .text(courseInfoText, margin, 285, {
          width: pageWidth - margin * 2,
          align: "center",
          features: ["rtlm"],
        });

      doc.end();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
