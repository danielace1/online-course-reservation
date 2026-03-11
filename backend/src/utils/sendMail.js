import transporter from "./mail.js";

export const sendCertificateMail = async (
  email,
  pdfBuffer,
  certificateNumber,
  courseName,
  userName,
) => {
  await transporter.sendMail({
    from: `"Learnify Academy" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `🎓 Congratulations! You've mastered ${courseName}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1px;">COURSE COMPLETED</h1>
        </div>
        
        <div style="padding: 40px 30px; text-align: center; color: #1f2937;">
          <div style="font-size: 50px; margin-bottom: 20px;">🏆</div>
          <h2 style="margin: 0 0 10px 0; color: #111827;">Incredible work, ${userName}!</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
            You have successfully completed <strong>${courseName}</strong>. 
            This achievement demonstrates your dedication to mastering new skills and pushing your professional boundaries.
          </p>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #f9fafb; border-radius: 12px; border: 1px dashed #cbd5e1;">
            <p style="margin: 0; font-size: 14px; color: #64748b; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">
              Certificate ID
            </p>
            <p style="margin: 5px 0 0 0; font-family: monospace; font-size: 18px; color: #4f46e5; font-weight: bold;">
              ${certificateNumber}
            </p>
          </div>

          <p style="font-size: 15px; color: #374151;">
            Your official certificate is attached to this email as a PDF. 
            Share your accomplishment on LinkedIn and tag us!
          </p>
        </div>

        <div style="padding: 30px; background-color: #f3f4f6; text-align: center; border-top: 1px solid #e5e7eb;">
          <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 18px;">What's next for you?</h3>
          <p style="font-size: 14px; color: #6b7280; margin-bottom: 20px;">
            The journey doesn't stop here. Thousands of students are already diving into more advanced topics. Ready for the next challenge?
          </p>
          <a href="${process.env.CLIENT_URL}/courses" 
             style="display: inline-block; padding: 14px 30px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);">
            Explore Next Courses
          </a>
          <p style="margin-top: 30px; font-size: 12px; color: #9ca3af;">
            &copy; 2026 Learnify Academy. All rights reserved.
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `Certificate_${courseName.replace(/\s+/g, "_")}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });
};
