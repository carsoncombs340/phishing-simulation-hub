const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  simulationId: { type: mongoose.Schema.Types.ObjectId, ref: 'PhishingTemplate' },
  score: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  feedback: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserProgress', userProgressSchema);