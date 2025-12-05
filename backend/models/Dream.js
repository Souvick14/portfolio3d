const mongoose = require('mongoose');

const dreamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Career', 'Personal', 'Travel', 'Learning', 'Other'],
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

module.exports = mongoose.model('Dream', dreamSchema);
