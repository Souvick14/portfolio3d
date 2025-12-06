const express = require('express');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const connectDB = require('./config/database');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Import models
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Objective = require('./models/Objective');
const ContactInfo = require('./models/ContactInfo');
const Dream = require('./models/Dream');
const Achievement = require('./models/Achievement');
const CV = require('./models/CV');

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: [
    'https://portfolio3d-azure-nine.vercel.app',
    'http://localhost:5500',
    'http://localhost:3000',
    'http://127.0.0.1:5500'
  ],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ============= FILE UPLOAD API =============
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    // Determine resource type based on file mimetype
    let resourceType = 'image';
    if (req.file.mimetype === 'application/pdf') {
      resourceType = 'raw'; // PDFs need 'raw' type in Cloudinary
    }

    // Upload to Cloudinary using buffer
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'portfolio',
          resource_type: resourceType
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    const result = await uploadPromise;
    
    res.json({ 
      success: true, 
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: resourceType
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: 'Failed to upload file' });
  }
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

// Add new objective
app.post('/api/objectives', async (req, res) => {
  try {
    const objective = new Objective(req.body);
    await objective.save();
    res.status(201).json({ success: true, data: objective });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to add objective' });
  }
});

// Add new contact
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new ContactInfo(req.body);
    await contact.save();
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to add contact' });
  }
});

// Add new dream
app.post('/api/dreams', async (req, res) => {
  try {
    const dream = new Dream(req.body);
    await dream.save();
    res.status(201).json({ success: true, data: dream });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to add dream' });
  }
});

// Add new achievement
app.post('/api/achievements', async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).json({ success: true, data: achievement });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to add achievement' });
  }
});

// ============= ADMIN API (PUT endpoints for updating) =============
// Update skill by ID
app.put('/api/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!skill) {
      return res.status(404).json({ success: false, error: 'Skill not found' });
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ success: false, error: 'Failed to update skill' });
  }
});

// Update project by ID
app.put('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ success: false, error: 'Failed to update project' });
  }
});

// Update objective by ID
app.put('/api/objectives/:id', async (req, res) => {
  try {
    const objective = await Objective.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!objective) {
      return res.status(404).json({ success: false, error: 'Objective not found' });
    }
    res.json({ success: true, data: objective });
  } catch (error) {
    console.error('Error updating objective:', error);
    res.status(500).json({ success: false, error: 'Failed to update objective' });
  }
});

// Update contact by ID
app.put('/api/contact/:id', async (req, res) => {
  try {
    const contact = await ContactInfo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ success: false, error: 'Failed to update contact' });
  }
});

// Update dream by ID
app.put('/api/dreams/:id', async (req, res) => {
  try {
    const dream = await Dream.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!dream) {
      return res.status(404).json({ success: false, error: 'Dream not found' });
    }
    res.json({ success: true, data: dream });
  } catch (error) {
    console.error('Error updating dream:', error);
    res.status(500).json({ success: false, error: 'Failed to update dream' });
  }
});

// Update achievement by ID
app.put('/api/achievements/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!achievement) {
      return res.status(404).json({ success: false, error: 'Achievement not found' });
    }
    res.json({ success: true, data: achievement });
  } catch (error) {
    console.error('Error updating achievement:', error);
    res.status(500).json({ success: false, error: 'Failed to update achievement' });
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


// ============= CV API =============
// Get active CV
app.get('/api/cv', async (req, res) => {
  try {
    const cv = await CV.findOne({ is_active: true }).sort({ uploaded_date: -1 });
    res.json({ success: true, data: cv });
  } catch (error) {
    console.error('Error fetching CV:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Upload/Create new CV
app.post('/api/cv', async (req, res) => {
  try {
    // Deactivate all previous CVs
    await CV.updateMany({}, { is_active: false });
    
    const cv = new CV(req.body);
    await cv.save();
    res.status(201).json({ success: true, data: cv });
  } catch (error) {
    console.error('Error creating CV:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update CV
app.put('/api/cv/:id', async (req, res) => {
  try {
    const cv = await CV.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!cv) {
      return res.status(404).json({ success: false, error: 'CV not found' });
    }
    res.json({ success: true, data: cv });
  } catch (error) {
    console.error('Error updating CV:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete CV
app.delete('/api/cv/:id', async (req, res) => {
  try {
    const cv = await CV.findByIdAndDelete(req.params.id);
    if (!cv) {
      return res.status(404).json({ success: false, error: 'CV not found' });
    }
    res.json({ success: true, message: 'CV deleted successfully' });
  } catch (error) {
    console.error('Error deleting CV:', error);
    res.status(500).json({ success: false, error: error.message });
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
