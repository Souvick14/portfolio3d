const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

// Import models
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Objective = require('./models/Objective');
const ContactInfo = require('./models/ContactInfo');
const Dream = require('./models/Dream');
const Achievement = require('./models/Achievement');

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ============= SKILLS API =============
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order_index: 1 });
    
    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
      const category = skill.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});
    
    res.json({
      success: true,
      data: groupedSkills,
      total: skills.length
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch skills' 
    });
  }
});

// ============= PROJECTS API =============
app.get('/api/projects', async (req, res) => {
  try {
    const featured = req.query.featured;
    let query = {};
    
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }
    
    const projects = await Project.find(query).sort({ order_index: 1 });
    
    res.json({
      success: true,
      data: projects,
      total: projects.length
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch projects' 
    });
  }
});

// Get single project by ID
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        error: 'Project not found' 
      });
    }
    
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch project' 
    });
  }
});

// ============= OBJECTIVES API =============
app.get('/api/objectives', async (req, res) => {
  try {
    const status = req.query.status;
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    const objectives = await Objective.find(query).sort({ priority: 1, order_index: 1 });
    
    res.json({
      success: true,
      data: objectives,
      total: objectives.length
    });
  } catch (error) {
    console.error('Error fetching objectives:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch objectives' 
    });
  }
});

// ============= CONTACT INFO API =============
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await ContactInfo.find({ is_active: true }).sort({ display_order: 1 });
    
    res.json({
      success: true,
      data: contacts,
      total: contacts.length
    });
  } catch (error) {
    console.error('Error fetching contact info:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch contact information' 
    });
  }
});

// ============= LIFETIME DREAMS API =============
app.get('/api/dreams', async (req, res) => {
  try {
    const category = req.query.category;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    const dreams = await Dream.find(query).sort({ order_index: 1 });
    
    res.json({
      success: true,
      data: dreams,
      total: dreams.length
    });
  } catch (error) {
    console.error('Error fetching dreams:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch dreams' 
    });
  }
});

// ============= LIFETIME ACHIEVEMENTS API =============
app.get('/api/achievements', async (req, res) => {
  try {
    const category = req.query.category;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    const achievements = await Achievement.find(query).sort({ achievement_date: -1, order_index: 1 });
    
    res.json({
      success: true,
      data: achievements,
      total: achievements.length
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch achievements' 
    });
  }
});

// ============= ALL DATA API (for initial load) =============
app.get('/api/all', async (req, res) => {
  try {
    const [skills, projects, objectives, contacts, dreams, achievements] = await Promise.all([
      Skill.find().sort({ order_index: 1 }),
      Project.find().sort({ order_index: 1 }),
      Objective.find().sort({ priority: 1, order_index: 1 }),
      ContactInfo.find({ is_active: true }).sort({ display_order: 1 }),
      Dream.find().sort({ order_index: 1 }),
      Achievement.find().sort({ achievement_date: -1, order_index: 1 })
    ]);
    
    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
      const category = skill.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});
    
    res.json({
      success: true,
      data: {
        skills: groupedSkills,
        projects: projects,
        objectives: objectives,
        contact: contacts,
        dreams: dreams,
        achievements: achievements
      }
    });
  } catch (error) {
    console.error('Error fetching all data:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch data' 
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Endpoint not found' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/*`);
});
