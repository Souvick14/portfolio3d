# 🚀 3D Sci-Fi Portfolio Website

An immersive, interactive 3D portfolio website with a sci-fi theme featuring Three.js frontend and Express.js backend with PostgreSQL database integration.

## ✨ Features

- **🎨 Stunning Sci-Fi Design**: Violet and neon color palette with glassmorphism effects
- **🌌 3D Animated Background**: 3000+ particle starfield with rotating geometric shapes
- **🤖 Interactive 3D Model**: Rotating platform with language logo spheres in hero section
- **✨ Custom Cursor**: Animated glowing cursor with trail effects
- **📊 Dynamic Content**: All sections load from PostgreSQL database
- **🎭 Smooth Animations**: GSAP-powered scroll animations and transitions
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **⚡ Real-time Updates**: Any database changes automatically reflect on website

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Three.js (3D graphics)
- GSAP (animations)
- Custom sci-fi theme

### Backend
- Node.js
- Express.js
- PostgreSQL
- CORS enabled

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Database Setup

First, ensure PostgreSQL is running and create the database:

```bash
# Open psql or use PgAdmin
createdb portfolio

# Run the schema
psql -U postgres -d portfolio -f database/schema.sql

# Insert sample data
psql -U postgres -d portfolio -f database/seed_data.sql
```

Or using PgAdmin:
1. Connect to localhost:5432
2. Create database named `portfolio`
3. Open Query Tool and run `database/schema.sql`
4. Run `database/seed_data.sql`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start

# For development with auto-reload
npm run dev
```

The backend server will start on `http://localhost:8080`

### 3. Frontend Setup

```bash
# From the root directory, serve the frontend
# Option 1: Using Python
python -m http.server 3000

# Option 2: Using Node.js live-server
npx live-server --port=3000

# Option 3: Using VS Code Live Server extension
# Right-click index.html and select "Open with Live Server"
```

The website will be available at `http://localhost:3000`

## 📁 Project Structure

```
portfolio3d/
├── backend/
│   ├── server.js          # Express server
│   ├── db.js              # Database connection
│   ├── package.json       # Dependencies
│   └── .env               # Environment variables
├── css/
│   ├── styles.css         # Main styles
│   └── cursor.css         # Cursor styles
├── js/
│   ├── main.js            # Entry point
│   ├── api-service.js     # API communication
│   ├── scene.js           # Three.js scene setup
│   ├── background.js      # Particle background
│   ├── main-model.js      # Hero 3D model
│   ├── sections.js        # Dynamic content
│   ├── animations.js      # GSAP animations
│   ├── interactions.js    # Interactive effects
│   └── cursor-effects.js  # Custom cursor
├── database/
│   ├── schema.sql         # Database schema
│   └── seed_data.sql      # Sample data
├── images/                # Image assets
└── index.html             # Main HTML file
```

## 🎯 API Endpoints

- `GET /api/health` - Health check
- `GET /api/skills` - Get all skills grouped by category
- `GET /api/projects` - Get all projects
- `GET /api/projects?featured=true` - Get featured projects
- `GET /api/objectives` - Get all objectives
- `GET /api/contact` - Get contact information
- `GET /api/dreams` - Get lifetime dreams
- `GET /api/achievements` - Get achievements
- `GET /api/all` - Get all data in one request

## 🎨 Customization

### Updating Content

All content is stored in PostgreSQL. Simply update the database and refresh the website:

```sql
-- Add a new skill
INSERT INTO skills (name, category, proficiency_level, icon_url, order_index)
VALUES ('Python', 'Backend', 85, 'icon-url', 10);

-- Add a new project
INSERT INTO projects (title, description, technologies, github_url, featured)
VALUES ('New Project', 'Description', ARRAY['Tech1', 'Tech2'], 'github-url', true);
```

### Changing Colors

Edit `css/styles.css` and modify CSS variables:

```css
:root {
    --color-primary: #8b5cf6;      /* Change primary color */
    --color-neon-cyan: #00ffff;    /* Change neon accents */
    /* ... more variables */
}
```

## 🐛 Troubleshooting

### Backend Connection Issues
- Ensure PostgreSQL is running on port 5432
- Check database credentials in `backend/.env`
- Verify database name is `portfolio`

### CORS Errors
- Check backend server is running on port 8080
- Verify `CORS_ORIGIN` in `.env` matches frontend URL

### 3D Scene Not Loading
- Check browser console for errors
- Ensure Three.js CDN is accessible
- Try clearing browser cache

## 📝 Future Enhancements

- [ ] Mobile hamburger menu
- [ ] Blog section
- [ ] Admin panel for content management
- [ ] Dark/Light mode toggle
- [ ] More 3D models and effects
- [ ] Performance optimizations for mobile

## 📄 License

MIT License - feel free to use this portfolio template!

## 👤 Author

**Souvick Roy**
- Portfolio: [Your Portfolio URL]
- GitHub: [@souvickroy](https://github.com/souvickroy)
- LinkedIn: [Your LinkedIn]

---

Built with ❤️ using Three.js, Express.js & PostgreSQL
