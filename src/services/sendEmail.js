import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `"Note" <${process.env.EMAIL}>`,
    to: to ? to : "nadabadee2022@gmail.com",
    subject: subject ? subject : "Hello ✔",
    html: html ? html : "<b>Hello world?</b>",
  });
  if (info.accepted.length) {
    return true;
  }
  return false;
};
