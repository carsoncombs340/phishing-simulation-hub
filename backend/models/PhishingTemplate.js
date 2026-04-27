const mongoose = require('mongoose');

const phishingTemplateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, 
  technique: { type: String }, 
});

module.exports = mongoose.model('PhishingTemplate', phishingTemplateSchema);