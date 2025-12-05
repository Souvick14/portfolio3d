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

// ============= ADMIN API (POST endpoints) =============
// Add new skill
app.post('/api/skills', async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({ success: false, error: 'Failed to add skill' });
  }
});

// Add new project
app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ success: false, error: 'Failed to add project' });
  }
});

// Seed database with sample data
app.post('/api/seed', async (req, res) => {
  try {
    const sampleSkills = [
      { name: 'HTML5', category: 'Frontend', proficiency_level: 95, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', order_index: 1 },
      { name: 'CSS3', category: 'Frontend', proficiency_level: 90, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', order_index: 2 },
      { name: 'JavaScript', category: 'Frontend', proficiency_level: 90, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', order_index: 3 },
      { name: 'React', category: 'Frontend', proficiency_level: 85, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', order_index: 4 },
      { name: 'Node.js', category: 'Backend', proficiency_level: 85, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', order_index: 5 },
      { name: 'MongoDB', category: 'Database', proficiency_level: 85, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', order_index: 6 }
    ];

    const sampleProjects = [
      {
        title: '3D Sci-Fi Portfolio',
        description: 'An immersive 3D portfolio website with interactive Three.js elements.',
        technologies: ['Three.js', 'Express.js', 'MongoDB'],
        github_url: 'https://github.com/Souvick14/portfolio3d',
        featured: true,
        order_index: 1
      }
    ];

    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Skill.insertMany(sampleSkills);
    await Project.insertMany(sampleProjects);

    res.json({ success: true, message: 'Database seeded successfully!' });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ success: false, error: 'Failed to seed database' });
  }
});

// ============= DELETE ENDPOINTS =============
app.delete('/api/skills/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete skill' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete project' });
  }
});

app.delete('/api/objectives/:id', async (req, res) => {
  try {
    await Objective.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Objective deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete objective' });
  }
});

app.delete('/api/contact/:id', async (req, res) => {
  try {
    await ContactInfo.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete contact' });
  }
});

app.delete('/api/dreams/:id', async (req, res) => {
  try {
    await Dream.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Dream deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete dream' });
  }
});

app.delete('/api/achievements/:id', async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Achievement deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete achievement' });
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
