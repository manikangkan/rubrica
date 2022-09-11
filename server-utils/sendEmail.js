import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    service: process.env.EMAIL_SERVICE,
    auth: {
      type: "OAuth2",
      user: process.env.SENDER_EMAIL,
      clientId: process.env.SENDER_CLIENT_ID,
      clientSecret: process.env.SENDER_CLIENT_SECRET,
      refreshToken: process.env.SENDER_REFRESH_TOKEN,
      accessToken: process.env.SENDER_ACCESS_TOKEN,
    },
  });
  const mailOptions = {
    from: `Manikangkan from Rubrica ${process.env.SENDER_EMAIL}`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};
