const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/database');

// Import models
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Objective = require('./models/Objective');
const ContactInfo = require('./models/ContactInfo');
const Dream = require('./models/Dream');
const Achievement = require('./models/Achievement');

// Sample data
const skills = [
  // Frontend
  { name: 'HTML5', category: 'Frontend', proficiency_level: 95, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', order_index: 1 },
  { name: 'CSS3', category: 'Frontend', proficiency_level: 90, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', order_index: 2 },
  { name: 'JavaScript', category: 'Frontend', proficiency_level: 90, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', order_index: 3 },
  { name: 'React', category: 'Frontend', proficiency_level: 85, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', order_index: 4 },
  { name: 'Three.js', category: 'Frontend', proficiency_level: 80, icon_url: '/images/threejs-icon.svg', order_index: 5 },
  
  // Backend
  { name: 'Java', category: 'Backend', proficiency_level: 90, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', order_index: 6 },
  { name: 'Spring Boot', category: 'Backend', proficiency_level: 85, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', order_index: 7 },
  { name: 'Node.js', category: 'Backend', proficiency_level: 85, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', order_index: 8 },
  { name: 'Express.js', category: 'Backend', proficiency_level: 80, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', order_index: 9 },
  
  // Database
  { name: 'MongoDB', category: 'Database', proficiency_level: 85, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', order_index: 10 },
  { name: 'PostgreSQL', category: 'Database', proficiency_level: 85, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', order_index: 11 },
  { name: 'MySQL', category: 'Database', proficiency_level: 80, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', order_index: 12 },
  
  // Tools
  { name: 'Git', category: 'Tools', proficiency_level: 90, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', order_index: 13 },
  { name: 'Docker', category: 'Tools', proficiency_level: 75, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', order_index: 14 },
  { name: 'VS Code', category: 'Tools', proficiency_level: 95, icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', order_index: 15 }
];

const projects = [
  {
    title: '3D Sci-Fi Portfolio',
    description: 'An immersive 3D portfolio website with interactive Three.js elements, animated backgrounds, and real-time database integration.',
    technologies: ['Three.js', 'Express.js', 'MongoDB', 'HTML5', 'CSS3'],
    github_url: 'https://github.com/Souvick14/portfolio3d',
    demo_url: '',
    image_url: '/images/portfolio-3d.jpg',
    featured: true,
    order_index: 1
  },
  {
    title: 'Eatli Restaurant Website',
    description: 'A modern South Indian restaurant website featuring dark mode, smooth animations, and responsive design.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github_url: 'https://github.com/Souvick14/eatli',
    demo_url: '',
    image_url: '/images/eatli.jpg',
    featured: true,
    order_index: 2
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather application with cultural backgrounds, 5-day forecast, and AQI data for Indian cities.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Weather API'],
    github_url: 'https://github.com/Souvick14/weather-app',
    demo_url: '',
    image_url: '/images/weather-app.jpg',
    featured: true,
    order_index: 3
  },
  {
    title: 'Graph Algorithm Visualizer',
    description: 'Interactive visualization tool for graph algorithms including BFS, DFS, and pathfinding.',
    technologies: ['Java', 'JavaFX'],
    github_url: 'https://github.com/Souvick14/graph-viz',
    demo_url: '',
    image_url: '/images/graph-viz.jpg',
    featured: false,
    order_index: 4
  }
];

const objectives = [
  {
    title: 'Master Advanced Three.js',
    description: 'Deep dive into advanced Three.js concepts including shaders, particle systems, and performance optimization.',
    target_date: new Date('2025-06-30'),
    priority: 1,
    status: 'in-progress',
    order_index: 1
  },
  {
    title: 'Full-Stack Certification',
    description: 'Complete comprehensive full-stack development certification covering modern frameworks and best practices.',
    target_date: new Date('2025-12-31'),
    priority: 2,
    status: 'in-progress',
    order_index: 2
  },
  {
    title: 'Open Source Contributions',
    description: 'Contribute to at least 5 major open-source projects in web development and 3D graphics.',
    target_date: new Date('2025-09-30'),
    priority: 2,
    status: 'planned',
    order_index: 3
  },
  {
    title: 'Build SaaS Product',
    description: 'Develop and launch a commercial SaaS product using modern tech stack.',
    target_date: new Date('2026-03-31'),
    priority: 1,
    status: 'planned',
    order_index: 4
  }
];

const contactInfo = [
  { type: 'email', value: 'souvick.dev@gmail.com', icon: 'fas fa-envelope', display_order: 1, is_active: true },
  { type: 'phone', value: '+91-XXXXXXXXXX', icon: 'fas fa-phone', display_order: 2, is_active: true },
  { type: 'linkedin', value: 'https://linkedin.com/in/souvickroy', icon: 'fab fa-linkedin', display_order: 3, is_active: true },
  { type: 'github', value: 'https://github.com/Souvick14', icon: 'fab fa-github', display_order: 4, is_active: true },
  { type: 'twitter', value: 'https://twitter.com/souvickdev', icon: 'fab fa-twitter', display_order: 5, is_active: true }
];

const dreams = [
  {
    title: 'Build a Unicorn Startup',
    description: 'Create and scale a technology startup that reaches unicorn status and makes a positive impact on millions of lives.',
    category: 'Career',
    image_url: '/images/dream-startup.jpg',
    order_index: 1
  },
  {
    title: 'Master 3D Game Development',
    description: 'Become proficient in game development using Unreal Engine or Unity, creating immersive gaming experiences.',
    category: 'Learning',
    image_url: '/images/dream-gamedev.jpg',
    order_index: 2
  },
  {
    title: 'Travel the World',
    description: 'Visit all 7 continents, experiencing diverse cultures, cuisines, and landscapes while working remotely.',
    category: 'Personal',
    image_url: '/images/dream-travel.jpg',
    order_index: 3
  },
  {
    title: 'Publish Technical Book',
    description: 'Write and publish a comprehensive book on modern web development and 3D graphics programming.',
    category: 'Career',
    image_url: '/images/dream-book.jpg',
    order_index: 4
  },
  {
    title: 'Build Smart Home',
    description: 'Design and build a fully automated smart home with custom IoT solutions and AI integration.',
    category: 'Personal',
    image_url: '/images/dream-smarthome.jpg',
    order_index: 5
  }
];

const achievements = [
  {
    title: 'Bachelor of Technology',
    description: 'Completed B.Tech degree in Computer Science Engineering with distinction.',
    achievement_date: new Date('2024-06-15'),
    category: 'Education',
    image_url: '/images/achievement-btech.jpg',
    order_index: 1
  },
  {
    title: 'First Full-Stack Project',
    description: 'Successfully deployed first production-ready full-stack application serving 1000+ users.',
    achievement_date: new Date('2024-03-20'),
    category: 'Career',
    image_url: '/images/achievement-project.jpg',
    order_index: 2
  },
  {
    title: 'Hackathon Winner',
    description: 'Won first place in regional hackathon for innovative web application using AI and 3D graphics.',
    achievement_date: new Date('2024-01-15'),
    category: 'Awards',
    image_url: '/images/achievement-hackathon.jpg',
    order_index: 3
  },
  {
    title: 'Open Source Contributor',
    description: 'Made significant contributions to popular open-source projects with 100+ stars on GitHub.',
    achievement_date: new Date('2024-08-10'),
    category: 'Career',
    image_url: '/images/achievement-opensource.jpg',
    order_index: 4
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to MongoDB
    await connectDB();
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      Skill.deleteMany({}),
      Project.deleteMany({}),
      Objective.deleteMany({}),
      ContactInfo.deleteMany({}),
      Dream.deleteMany({}),
      Achievement.deleteMany({})
    ]);
    
    // Insert new data
    console.log('📝 Inserting new data...');
    await Promise.all([
      Skill.insertMany(skills),
      Project.insertMany(projects),
      Objective.insertMany(objectives),
      ContactInfo.insertMany(contactInfo),
      Dream.insertMany(dreams),
      Achievement.insertMany(achievements)
    ]);
    
    console.log('✅ Database seeding completed!');
    console.log(`   - ${skills.length} skills inserted`);
    console.log(`   - ${projects.length} projects inserted`);
    console.log(`   - ${objectives.length} objectives inserted`);
    console.log(`   - ${contactInfo.length} contact info inserted`);
    console.log(`   - ${dreams.length} dreams inserted`);
    console.log(`   - ${achievements.length} achievements inserted`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
seedDatabase();
