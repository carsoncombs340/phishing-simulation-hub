// server.js - Super minimal stable version for Railway
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory templates (no models, no crashes)
let templates = [
  { id: 1, title: "Account Security Alert", content: "Your account has been locked. Click here to verify your identity immediately.", technique: "Urgency + Fear" },
  { id: 2, title: "Package Delivery Notice", content: "Your package is on hold. Click to pay the $1.99 fee and schedule delivery.", technique: "Fake Authority" },
  { id: 3, title: "Password Reset Request", content: "Someone tried to log into your account. Reset your password now.", technique: "Phishing Link" },
  { id: 4, title: "Bank Account Verification", content: "Unusual activity detected. Please verify your banking details.", technique: "Spoofed Sender" }
];

// Root route
app.get('/', (req, res) => {
  res.send('Backend server for Phishing Simulation Hub is running!');
});

// Simulate route (this is what the frontend calls)
app.get('/api/simulate', (req, res) => {
  res.json(templates);
});

// Simple mock email route
app.post('/api/send-mock-email', (req, res) => {
  res.json({ message: 'Mock email sent successfully' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server for Phishing Simulation Hub is running on port ${PORT}`);
});