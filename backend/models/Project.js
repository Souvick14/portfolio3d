const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: {
    type: [String],
    default: []
  },
  github_url: {
    type: String,
    default: ''
  },
  demo_url: {
    type: String,
    default: ''
  },
  image_url: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  order_index: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
