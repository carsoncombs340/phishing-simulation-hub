// server.js - Final version with open CORS + email logging
const express = require('express');
const cors = require('cors');

const app = express();

// Completely open CORS (fixes Vercel + localhost)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// In-memory templates
let templates = [
  { id: 1, title: "Account Security Alert", content: "Your account has been locked. Click here to verify your identity immediately.", technique: "Urgency + Fear" },
  { id: 2, title: "Package Delivery Notice", content: "Your package is on hold. Click to pay the $1.99 fee and schedule delivery.", technique: "Fake Authority" },
  { id: 3, title: "Password Reset Request", content: "Someone tried to log into your account. Reset your password now.", technique: "Phishing Link" },
  { id: 4, title: "Bank Account Verification", content: "Unusual activity detected. Please verify your banking details.", technique: "Spoofed Sender" },
  { id: 5, title: "Urgent Account Security Alert", content: "Your account has been compromised. Click here to verify immediately.", technique: "Email spoofing + URL manipulation" },
  { id: 6, title: "Package Delivery Update - Action Required", content: "Your package is on hold. Click to confirm delivery address.", technique: "URL manipulation" },
  { id: 7, title: "IT Security Alert: Virus Detected", content: "Your computer is infected. Click to scan and remove the virus now.", technique: "Social engineering" },
  { id: 8, title: "Urgent: Your Account Has Been Hacked", content: "Click here to reset your password immediately or lose access.", technique: "Email spoofing" }
];

app.get('/', (req, res) => res.send('Backend server for Phishing Simulation Hub is running!'));

app.get('/api/simulate', (req, res) => res.json(templates));

// Real email route with logging
app.post('/api/send-mock-email', async (req, res) => {
  console.log('📧 Email route called with:', req.body);
  const { title, content, subject } = req.body;

  try {
    const transporter = require('nodemailer').createTransport({
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

    console.log('✅ Email sent successfully');
    res.json({ message: 'Mock email sent successfully' });
  } catch (error) {
    console.error('❌ Email error:', error);
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server for Phishing Simulation Hub is running on port ${PORT}`);
});