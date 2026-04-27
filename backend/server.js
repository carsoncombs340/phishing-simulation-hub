// server.js - Final version with open CORS for Vercel
const express = require('express');
const cors = require('cors');

const app = express();

// Open CORS - allows Vercel, localhost, and everything
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// In-memory templates (8 simulations)
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

// In-memory progress
let progressData = [];

// Routes
app.get('/', (req, res) => res.send('Backend server for Phishing Simulation Hub is running!'));

app.get('/api/simulate', (req, res) => res.json(templates));

app.post('/api/send-mock-email', (req, res) => {
  res.json({ message: 'Mock email sent successfully' });
});

app.post('/api/progress', (req, res) => {
  const entry = {
    userId: req.body.userId,
    templateId: req.body.templateId,
    score: req.body.score,
    decision: req.body.decision,
    feedback: req.body.feedback,
    timestamp: new Date()
  };
  progressData.push(entry);
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