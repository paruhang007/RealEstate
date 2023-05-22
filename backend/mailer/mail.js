const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendMail = async (email, generatedCode) => {
  console.log(process.env.AEY);
  console.log(process.env.APP_EMAIL);
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_KEY,
    },
  });

  const mailOptions = {
    from: "Ghar Jagga Nepal ",
    to: email,
    subject: "Email Verification",
    text: `Your verification code is ${generatedCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendMail;
