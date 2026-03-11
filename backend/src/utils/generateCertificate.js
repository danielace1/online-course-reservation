import PDFDocument from "pdfkit";
import cloudinary from "./cloudinary.js";
import streamifier from "streamifier";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateCertificatePDF = (
  studentName,
  courseTitle,
  certificateNumber,
) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margin: 0,
      });

      const buffers = [];
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", async () => {
        try {
          const pdfBuffer = Buffer.concat(buffers);
          const result = await uploadToCloudinary(pdfBuffer, certificateNumber);
          resolve({
            url: result.secure_url,
            buffer: pdfBuffer,
          });
        } catch (err) {
          reject(err);
        }
      });

      // ===== CONSTANTS & ROBUST LOGO PATH =====
      const primaryColor = "#6366f1";
      const secondaryColor = "#a855f7";
      const darkColor = "#0f172a";
      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;

      // Navigate from backend/src/utils/ to frontend/public/
      const logoPath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "frontend",
        "public",
        "learnify-logo.webp",
      );

      // 1. BACKGROUND & BORDERS
      doc.rect(0, 0, pageWidth, pageHeight).fill("#ffffff");

      doc
        .save()
        .moveTo(0, 0)
        .lineTo(180, 0)
        .lineTo(0, 180)
        .fill(primaryColor)
        .moveTo(pageWidth, pageHeight)
        .lineTo(pageWidth - 180, pageHeight)
        .lineTo(pageWidth, pageHeight - 180)
        .fill(secondaryColor)
        .restore();

      doc
        .rect(25, 25, pageWidth - 50, pageHeight - 50)
        .lineWidth(1.5)
        .stroke(primaryColor);
      doc
        .rect(32, 32, pageWidth - 64, pageHeight - 64)
        .lineWidth(0.5)
        .stroke(secondaryColor);

      // 2. LOGO INTEGRATION
      try {
        doc.image(logoPath, pageWidth / 2 - 25, 60, { width: 50 });
      } catch (e) {
        // Fallback placeholder if image still isn't found
        doc
          .fontSize(25)
          .fillColor(primaryColor)
          .text("L", pageWidth / 2 - 10, 60);
      }

      // 3. BRAND HEADER
      doc
        .fontSize(32)
        .fillColor(primaryColor)
        .text("Learnify", 0, 115, { align: "center", characterSpacing: 1 });
      doc
        .fontSize(9)
        .fillColor("#64748b")
        .text("OFFICIAL ONLINE LEARNING ACADEMY", 0, 150, {
          align: "center",
          characterSpacing: 1.5,
        });

      // 4. MAIN TITLE
      doc
        .fontSize(42)
        .fillColor(darkColor)
        .text("CERTIFICATE", 0, 190, { align: "center" });
      doc
        .fontSize(14)
        .fillColor("#64748b")
        .text("OF COMPLETION", { align: "center", characterSpacing: 4 });

      // 5. BODY
      doc.moveDown(1.5);
      doc
        .fontSize(16)
        .fillColor("#475569")
        .text("This is to proudly certify that", { align: "center" });

      // 6. STUDENT NAME
      doc.moveDown(0.3);
      const safeStudent = studentName ? studentName.toUpperCase() : "STUDENT";
      doc
        .fontSize(38)
        .fillColor(primaryColor)
        .text(safeStudent, { align: "center" });

      const lineY = doc.y + 2;
      doc
        .moveTo(pageWidth / 3, lineY)
        .lineTo((pageWidth / 3) * 2, lineY)
        .lineWidth(1)
        .stroke("#e2e8f0");

      // 7. COURSE INFO
      doc.moveDown(1.2);
      doc
        .fontSize(16)
        .fillColor("#475569")
        .text("has successfully mastered all requirements for", {
          align: "center",
        });
      doc.moveDown(0.3);
      doc
        .fontSize(24)
        .fillColor(darkColor)
        .text(courseTitle || "Professional Course", { align: "center" });

      // 8. FOOTER ALIGNMENT
      const footerY = pageHeight - 110;
      const columnWidth = pageWidth / 3;

      // Column 1: ID
      doc
        .fontSize(8)
        .fillColor("#94a3b8")
        .text("CERTIFICATE ID", 70, footerY, {
          width: columnWidth - 40,
          align: "left",
        });
      doc
        .fontSize(10)
        .fillColor(darkColor)
        .text(certificateNumber, 70, footerY + 12, {
          width: columnWidth - 40,
          align: "left",
        });

      // Column 2: Date
      doc
        .fontSize(8)
        .fillColor("#94a3b8")
        .text("DATE ISSUED", 0, footerY, { align: "center" });
      doc
        .fontSize(10)
        .fillColor(darkColor)
        .text(
          new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          0,
          footerY + 12,
          { align: "center" },
        );

      // Column 3: Authorized
      doc
        .fontSize(8)
        .fillColor("#94a3b8")
        .text("AUTHORIZED BY", pageWidth - columnWidth, footerY, {
          width: columnWidth - 70,
          align: "right",
        });
      doc
        .fontSize(12)
        .fillColor(primaryColor)
        .text(
          "Learnify Academic Board",
          pageWidth - columnWidth,
          footerY + 12,
          { width: columnWidth - 70, align: "right" },
        );

      // 9. VERIFICATION LINK
      doc
        .fontSize(7)
        .fillColor("#cbd5e1")
        .text(
          `Verify authenticity at: ${process.env.CLIENT_URL || "https://learnify.com"}/verify/${certificateNumber}`,
          0,
          pageHeight - 40,
          { align: "center" },
        );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

const uploadToCloudinary = (buffer, certificateNumber) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "online-course-system/certificates",
        resource_type: "image",
        public_id: `certificate-${certificateNumber}`,
        format: "pdf",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
