const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  achievement_date: {
    type: Date,
    default: null
  },
  category: {
    type: String,
    enum: ['Education', 'Career', 'Personal', 'Awards', 'Other'],
    default: 'Other'
  },
  image_url: {
    type: String,
    default: ''
  },
  order_index: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Achievement', achievementSchema);
