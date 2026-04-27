// server.js - Full backend for Phishing Simulation Hub (Railway ready)
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const connectDB = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB().then(() => {
  console.log('✅ MongoDB connected - Server ready');
});

// ====================== MOCK EMAIL ROUTE ======================
app.post('/api/send-mock-email', async (req, res) => {
  const { title, content, subject } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  const mailOptions = {
    from: `"Phishing Simulation Hub" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: subject || title,
    html: `
      <h2>${title}</h2>
      <p>${content}</p>
      <hr>
      <p><em>This is a simulation email for educational purposes only.</em></p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Mock email sent');
    res.json({ message: 'Mock email sent successfully' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    res.status(500).json({ message: error.message });
  }
});

// ====================== SIMULATE ROUTES ======================
const PhishingTemplate = require('./models/PhishingTemplate');

app.get('/api/simulate', async (req, res) => {
  try {
    const templates = await PhishingTemplate.find();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/simulate', async (req, res) => {
  try {
    const newTemplate = new PhishingTemplate(req.body);
    await newTemplate.save();
    res.json(newTemplate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Basic progress route (for dashboard)
app.post('/api/progress', async (req, res) => {
  res.json({ message: 'Progress saved' });
});

// Root route
app.get('/', (req, res) => {
  res.send('Backend server for Phishing Simulation Hub is running!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server for Phishing Simulation Hub is running on port ${PORT}`);
});