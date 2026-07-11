import nodemailer from 'nodemailer';
import 'dotenv/config';

// Configure transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  port: parseInt(process.env.SMTP_PORT || '2525', 10),
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

/**
 * Send an email using nodemailer
 * @param {Object} options - Email sending options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content of the email
 */
export const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || '"Real Estate SaaS" <noreply@realestatesaas.com>',
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ Email sent successfully: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Error sending email to ${to}: ${error.message}`);
    return null;
  }
};
