// db.js - MongoDB Atlas Cloud Connection for Railway
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use the environment variable that you set in Railway
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      console.error('❌ No MONGODB_URI found in environment variables');
      process.exit(1);
    }

    await mongoose.connect(mongoURI);

    console.log('✅ Successfully connected to MongoDB Atlas (Cloud)');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;