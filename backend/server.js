require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebaseServiceKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Firestore Database

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to access API

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail Address
    pass: process.env.EMAIL_PASS, // Google App Password
  },
});

// API Endpoint to Handle Form Submissions
app.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save message to Firestore
    await db.collection("messages").add({
      name,
      email,
      message,
      timestamp: new Date(),
    });

    // **1️⃣ Send an Acknowledgment Email to the User**
    const userMailOptions = {
      from: `"Keta Patel" <${process.env.EMAIL_USER}>`,
      to: email, // Send email to the user
      subject: `Thanks for Contacting Me, ${name}!`,
      text: `Hi ${name},\n\nThank you for reaching out! I have received your message:\n\n"${message}"\n\nI will get back to you as soon as possible.\n\nBest,\nKevin`,
    };

    await transporter.sendMail(userMailOptions);

    // **2️⃣ Send a Notification Email to Yourself**
    const adminMailOptions = {
      from: `"Keta Patel" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\nI will get back to you as soon as possible.\n\nBest,\nKeta`,
    };

    await transporter.sendMail(adminMailOptions);

    res.status(200).json({ success: "Message saved and emails sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
