import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Create transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post("/send-email", async (req, res) => {
  const { senderName, senderEmail, subject, message } = req.body;  // ✅ match HTML

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,   // must be YOUR gmail, not sender
      to: process.env.EMAIL_USER,
      subject: subject,
      text: message
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});



app.get("/", (req, res) => {
  res.send("Email server running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started"));