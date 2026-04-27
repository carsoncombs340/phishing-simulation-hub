const express = require('express');
const cors = require('cors');
const connectDB = require('./db');      
const PhishingTemplate = require('./models/PhishingTemplate');
const UserProgress = require('./models/UserProgress');
const User = require('./models/User');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001;

app.use(cors());           
app.use(express.json());   

// Basic test route
app.get('/', (req, res) => {
  res.send('Backend server for Phishing Simulation Hub is running!');
});

//USER AUTH 
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = new User({ username, password, email });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || user.password !== password) {   
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ 
      message: 'Login successful', 
      username: user.username 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

//SIMULATION TEMPLATES 
app.get('/api/simulate', async (req, res) => {
  try {
    const templates = await PhishingTemplate.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching templates' });
  }
});

app.post('/api/simulate', async (req, res) => {
  try {
    const newTemplate = new PhishingTemplate(req.body);
    await newTemplate.save();
    res.json({ message: 'Template saved', data: newTemplate });
  } catch (error) {
    res.status(500).json({ message: 'Error saving template' });
  }
});

//PROGRESS TRACKING
app.get('/api/progress', async (req, res) => {
  try {
    const progress = await UserProgress.find({ userId: req.query.userId });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress' });
  }
});

app.post('/api/progress', async (req, res) => {
  try {
    const newProgress = new UserProgress(req.body);
    await newProgress.save();
    res.json({ message: 'Progress saved', data: newProgress });
  } catch (error) {
    res.status(500).json({ message: 'Error saving progress' });
  }
});

//SEND MOCK EMAIL 
app.post('/api/send-mock-email', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'carsoncombs340@gmail.com',
        pass: 'pfqgstaiotwhmslf'
      }
    });

    const mailOptions = {
      from: '"Phishing Simulation Hub" <carsoncombs340@gmail.com>',
      to: req.body.email || 'carsoncombs340@gmail.com',
      subject: req.body.subject || 'Urgent: Account Security Alert',
      html: `
        <h2>${req.body.title || 'Account Verification Required'}</h2>
        <p>${req.body.content || 'Your account has been flagged. Please verify immediately.'}</p>
        <p style="color:red;"><strong>This is a SIMULATED phishing email for training only.</strong></p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Mock email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

//Start the server after connecting to MongoDB
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});