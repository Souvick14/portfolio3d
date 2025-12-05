const mongoose = require('mongoose');

const objectiveSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  target_date: {
    type: Date,
    default: null
  },
  priority: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'planned'],
    default: 'planned'
  },
  order_index: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Objective', objectiveSchema);
