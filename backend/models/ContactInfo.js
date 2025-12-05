const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['email', 'phone', 'linkedin', 'github', 'twitter', 'other']
  },
  value: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'fas fa-link'
  },
  display_order: {
    type: Number,
    default: 0
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
