const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'My Resume'
  },
  pdf_url: {
    type: String,
    required: true
  },
  filename: {
    type: String
  },
  is_active: {
    type: Boolean,
    default: true
  },
  uploaded_date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CV', cvSchema);
