const express = require("express");
const dotenv = require("dotenv");
const twilio = require("twilio");
const app = express();
dotenv.config({ path: `${__dirname}/config.env` });
const port = process.env.PORT || 3001;

// specify the twilio details
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Create twilio client
const client = twilio(accountSid, authToken);

// body parser
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

// Generate 6 Digit Otp

const otpGenerate = Math.floor(100000 + Math.random() * 900000);
console.log(otpGenerate);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/v1/verification/sendOtp", (req, res) => {
  // send otp number
  const phoneNumber = req.body.phoneNumber;
  console.log(phoneNumber);

  // send to otp
  client.messages
    .create({
      body: `Your otp ${otpGenerate}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    })
    .then(() => {
      res.status(200).json({
        status: "Success",
        message: "Otp send Successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: "Failed to send otp",
      });
    });
});

// verify otp

app.post("/api/v1/verification/verifyOtp", (req, res) => {
  const { otp } = req.body;

  if (!otpGenerate === otp) {
    res.status(500).json({
      status: "fail",
      message: "Otp is not valid",
    });
  }

  res.status(200).json({
    status: "Success",
    message: "Otp is valid",
  });
});

app.listen(port, () => {
  console.log(`App running in port ${port} .........`);
});
