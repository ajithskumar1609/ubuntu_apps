const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // create transport => services

  const transport = nodemailer.createTransport({
    // transport configuration
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "ajith <ajith@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // actually send mail
  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
