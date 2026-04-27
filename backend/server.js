// server.js - Stable + Real Progress Tracking
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data (simulations + progress)
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

let progressData = [];   // ← This stores your real decisions

// Routes
app.get('/', (req, res) => res.send('Backend server for Phishing Simulation Hub is running!'));

app.get('/api/simulate', (req, res) => res.json(templates));

app.post('/api/send-mock-email', (req, res) => {
  res.json({ message: 'Mock email sent successfully' });
});

// Progress tracking (this is the important part)
app.post('/api/progress', (req, res) => {
  const { userId, templateId, score, decision, feedback } = req.body;
  progressData.push({
    userId,
    templateId,
    score,
    decision,
    feedback,
    timestamp: new Date()
  });
  res.json({ message: 'Progress saved' });
});

app.get('/api/progress', (req, res) => {
  const userId = req.query.userId;
  const userProgress = progressData.filter(p => p.userId === userId);
  res.json(userProgress);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server for Phishing Simulation Hub is running on port ${PORT}`);
});