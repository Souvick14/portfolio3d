-- Portfolio Database Seed Data

-- Skills Data
INSERT INTO skills (name, category, proficiency_level, icon_url, order_index) VALUES
-- Frontend
('HTML5', 'Frontend', 95, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', 1),
('CSS3', 'Frontend', 90, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', 2),
('JavaScript', 'Frontend', 90, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 3),
('React', 'Frontend', 85, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 4),
('Three.js', 'Frontend', 80, '/images/threejs-icon.svg', 5),

-- Backend
('Java', 'Backend', 90, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', 6),
('Spring Boot', 'Backend', 85, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', 7),
('Node.js', 'Backend', 85, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 8),
('Express.js', 'Backend', 80, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', 9),

-- Database
('PostgreSQL', 'Database', 85, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', 10),
('MySQL', 'Database', 80, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', 11),
('MongoDB', 'Database', 75, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', 12),

-- Tools
('Git', 'Tools', 90, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', 13),
('Docker', 'Tools', 75, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', 14),
('VS Code', 'Tools', 95, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', 15);

-- Projects Data
INSERT INTO projects (title, description, technologies, github_url, demo_url, image_url, featured, order_index) VALUES
('3D Sci-Fi Portfolio', 'An immersive 3D portfolio website with interactive Three.js elements, animated backgrounds, and real-time database integration.', 
 ARRAY['Three.js', 'Express.js', 'PostgreSQL', 'HTML5', 'CSS3'], 
 'https://github.com/souvick/portfolio3d', NULL, '/images/portfolio-3d.jpg', true, 1),

('Eatli Restaurant Website', 'A modern South Indian restaurant website featuring dark mode, smooth animations, and responsive design.', 
 ARRAY['HTML5', 'CSS3', 'JavaScript'], 
 'https://github.com/souvick/eatli', NULL, '/images/eatli.jpg', true, 2),

('Weather Dashboard', 'Real-time weather application with cultural backgrounds, 5-day forecast, and AQI data for Indian cities.', 
 ARRAY['JavaScript', 'HTML5', 'CSS3', 'Weather API'], 
 'https://github.com/souvick/weather-app', NULL, '/images/weather-app.jpg', true, 3),

('Graph Algorithm Visualizer', 'Interactive visualization tool for graph algorithms including BFS, DFS, and pathfinding.', 
 ARRAY['Java', 'JavaFX'], 
 'https://github.com/souvick/graph-viz', NULL, '/images/graph-viz.jpg', false, 4);

-- Objectives Data
INSERT INTO objectives (title, description, target_date, priority, status, order_index) VALUES
('Master Advanced Three.js', 'Deep dive into advanced Three.js concepts including shaders, particle systems, and performance optimization.', 
 '2025-06-30', 1, 'in-progress', 1),

('Full-Stack Certification', 'Complete comprehensive full-stack development certification covering modern frameworks and best practices.', 
 '2025-12-31', 2, 'in-progress', 2),

('Open Source Contributions', 'Contribute to at least 5 major open-source projects in web development and 3D graphics.', 
 '2025-09-30', 2, 'planned', 3),

('Build SaaS Product', 'Develop and launch a commercial SaaS product using modern tech stack.', 
 '2026-03-31', 1, 'planned', 4);

-- Contact Information Data
INSERT INTO contact_info (type, value, icon, display_order, is_active) VALUES
('email', 'souvick.dev@gmail.com', 'fas fa-envelope', 1, true),
('phone', '+91-XXXXXXXXXX', 'fas fa-phone', 2, true),
('linkedin', 'https://linkedin.com/in/souvickroy', 'fab fa-linkedin', 3, true),
('github', 'https://github.com/souvickroy', 'fab fa-github', 4, true),
('twitter', 'https://twitter.com/souvickdev', 'fab fa-twitter', 5, true);

-- Lifetime Dreams Data
INSERT INTO lifetime_dreams (title, description, category, image_url, order_index) VALUES
('Build a Unicorn Startup', 'Create and scale a technology startup that reaches unicorn status and makes a positive impact on millions of lives.', 
 'Career', '/images/dream-startup.jpg', 1),

('Master 3D Game Development', 'Become proficient in game development using Unreal Engine or Unity, creating immersive gaming experiences.', 
 'Learning', '/images/dream-gamedev.jpg', 2),

('Travel the World', 'Visit all 7 continents, experiencing diverse cultures, cuisines, and landscapes while working remotely.', 
 'Personal', '/images/dream-travel.jpg', 3),

('Publish Technical Book', 'Write and publish a comprehensive book on modern web development and 3D graphics programming.', 
 'Career', '/images/dream-book.jpg', 4),

('Build Smart Home', 'Design and build a fully automated smart home with custom IoT solutions and AI integration.', 
 'Personal', '/images/dream-smarthome.jpg', 5);

-- Lifetime Achievements Data
INSERT INTO lifetime_achievements (title, description, achievement_date, category, image_url, order_index) VALUES
('Bachelor of Technology', 'Completed B.Tech degree in Computer Science Engineering with distinction.', 
 '2024-06-15', 'Education', '/images/achievement-btech.jpg', 1),

('First Full-Stack Project', 'Successfully deployed first production-ready full-stack application serving 1000+ users.', 
 '2024-03-20', 'Career', '/images/achievement-project.jpg', 2),

('Hackathon Winner', 'Won first place in regional hackathon for innovative web application using AI and 3D graphics.', 
 '2024-01-15', 'Awards', '/images/achievement-hackathon.jpg', 3),

('Open Source Contributor', 'Made significant contributions to popular open-source projects with 100+ stars on GitHub.', 
 '2024-08-10', 'Career', '/images/achievement-opensource.jpg', 4);

-- Verify data insertion
SELECT 'Skills inserted: ' || COUNT(*) FROM skills;
SELECT 'Projects inserted: ' || COUNT(*) FROM projects;
SELECT 'Objectives inserted: ' || COUNT(*) FROM objectives;
SELECT 'Contact info inserted: ' || COUNT(*) FROM contact_info;
SELECT 'Dreams inserted: ' || COUNT(*) FROM lifetime_dreams;
SELECT 'Achievements inserted: ' || COUNT(*) FROM lifetime_achievements;
