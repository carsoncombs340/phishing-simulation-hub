// server.js - Minimal stable version for Railway
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const connectDB = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB().then(() => {
  console.log('✅ MongoDB connected - Server ready');
});

// In-memory templates (stable - no model files)
let templates = [
  { id: 1, title: "Account Security Alert", content: "Your account has been locked. Click here to verify your identity immediately.", technique: "Urgency + Fear" },
  { id: 2, title: "Package Delivery Notice", content: "Your package is on hold. Click to pay the $1.99 fee and schedule delivery.", technique: "Fake Authority" },
  { id: 3, title: "Password Reset Request", content: "Someone tried to log into your account. Reset your password now.", technique: "Phishing Link" },
  { id: 4, title: "Bank Account Verification", content: "Unusual activity detected. Please verify your banking details.", technique: "Spoofed Sender" }
];

// Mock Email Route
app.post('/api/send-mock-email', async (req, res) => {
  const { title, content, subject } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"Phishing Simulation Hub" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: subject || title,
      html: `<h2>${title}</h2><p>${content}</p><hr><p><em>This is a simulation email for educational purposes.</em></p>`
    });

    res.json({ message: 'Mock email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Simulate Routes
app.get('/api/simulate', (req, res) => {
  res.json(templates);
});

app.get('/', (req, res) => {
  res.send('Backend server for Phishing Simulation Hub is running!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server for Phishing Simulation Hub is running on port ${PORT}`);
});