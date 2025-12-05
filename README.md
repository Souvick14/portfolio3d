# 🚀 3D Sci-Fi Portfolio Website

An immersive, interactive 3D portfolio website with a sci-fi theme featuring **Three.js frontend** and **Express.js backend** with **MongoDB Atlas** cloud database.

## ✨ Features

- **🎨 Stunning Sci-Fi Design**: Violet and neon color palette with glassmorphism effects
- **🌌 3D Animated Background**: 3000+ particle starfield with rotating geometric shapes
- **🤖 Interactive 3D Model**: Rotating platform with language logo spheres in hero section
- **✨ Custom Cursor**: Animated glowing cursor with trail effects
- **📊 Dynamic Content**: All sections load from MongoDB Atlas cloud database
- **🎭 Smooth Animations**: GSAP-powered scroll animations and transitions
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **☁️ Cloud-Ready**: MongoDB Atlas backend, easy deployment to Vercel/Netlify

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Three.js r128 (3D graphics)
- GSAP 3.12 (animations)
- Custom sci-fi theme

### Backend
- Node.js & Express.js
- Mongoose (MongoDB ODM)
- MongoDB Atlas (Cloud Database)
- CORS enabled

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier available)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Souvick14/portfolio3d.git
cd portfolio3d
```

### 2. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0/0 for all IPs)
5. Get your connection string

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 4. Seed Database

```bash
# Populate MongoDB with sample data
node seed-mongodb.js
```

You should see:
```
✅ Database seeding completed!
   - 15 skills inserted
   - 4 projects inserted
   - 4 objectives inserted
   - 5 contact info inserted
   - 5 dreams inserted
   - 4 achievements inserted
```

### 5. Start Backend Server

```bash
npm start
```

The backend server will start on `http://localhost:8080`

### 6. Start Frontend

Open a new terminal:

```bash
cd portfolio3d

# Option 1: Using live-server
npx live-server --port=3000

# Option 2: Using Python
python -m http.server 3000

# Option 3: Using VS Code Live Server extension
# Right-click index.html and select "Open with Live Server"
```

The website will be available at `http://localhost:3000`

## 📁 Project Structure

```
portfolio3d/
├── backend/
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── models/                 # Mongoose schemas
│   │   ├── Skill.js
│   │   ├── Project.js
│   │   ├── Objective.js
│   │   ├── ContactInfo.js
│   │   ├── Dream.js
│   │   └── Achievement.js
│   ├── server.js               # Express server
│   ├── seed-mongodb.js         # Database seeding script
│   ├── package.json
│   ├── .env.example            # Environment template
│   └── .env                    # Your config (not in git)
├── css/
│   ├── styles.css              # Main styles
│   └── cursor.css              # Cursor styles
├── js/
│   ├── main.js                 # Entry point
│   ├── api-service.js          # API communication
│   ├── scene.js                # Three.js scene setup
│   ├── background.js           # Particle background
│   ├── main-model.js           # Hero 3D model
│   ├── sections.js             # Dynamic content
│   ├── animations.js           # GSAP animations
│   ├── interactions.js         # Interactive effects
│   └── cursor-effects.js       # Custom cursor
├── database/                   # Legacy PostgreSQL files
├── images/                     # Image assets
└── index.html                  # Main HTML file
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

All content is stored in MongoDB. Simply update the database:

```javascript
// Using MongoDB Compass or Atlas web interface
// Or use the Mongoose models in your code

const Skill = require('./backend/models/Skill');

// Add a new skill
await Skill.create({
  name: 'Python',
  category: 'Backend',
  proficiency_level: 85,
  icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  order_index: 20
});
```

Changes are reflected immediately on page refresh!

### Changing Colors

Edit `css/styles.css` and modify CSS variables:

```css
:root {
    --color-primary: #8b5cf6;      /* Change primary color */
    --color-neon-cyan: #00ffff;    /* Change neon accents */
}
```

## 🌐 Deployment

### Backend Deployment (Railway/Render)

1. **Railway** (Recommended):
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli
   
   # Login and deploy
   railway login
   railway init
   railway up
   ```

2. **Render**:
   - Connect your GitHub repo
   - Set environment variables (MONGODB_URI)
   - Deploy

### Frontend Deployment (Vercel/Netlify)

1. **Vercel** (Recommended):
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Netlify**:
   - Drag and drop the portfolio3d folder
   - Or connect GitHub repo

### Update CORS

After deploying frontend, update `backend/.env`:
```
CORS_ORIGIN=https://your-deployed-frontend.vercel.app
```

## 🔧 Environment Variables

Create `backend/.env` from `.env.example`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=8080
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.com
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify connection string in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure database user has read/write permissions

### Data Not Loading
- Ensure backend server is running
- Check browser console for errors
- Verify API endpoint URLs match

### CORS Errors
- Update `CORS_ORIGIN` in `.env` with your frontend URL
- Restart backend server after .env changes

## 📝 Scripts

```bash
# Backend
cd backend
npm install          # Install dependencies
npm start            # Start server
node seed-mongodb.js # Seed database

# Frontend
npx live-server --port=3000  # Start local server
```

## 🎯 Features Highlight

- ✅ **Cloud Database**: MongoDB Atlas (no local DB needed)
- ✅ **Easy Deployment**: Ready for Vercel, Netlify, Railway
- ✅ **Modern Stack**: Latest Node.js, Express, Mongoose
- ✅ **3D Graphics**: Three.js with 3000+ particles
- ✅ **Responsive**: Mobile, tablet, desktop optimized
- ✅ **SEO Optimized**: Proper meta tags and structure

## 📄 License

MIT License - feel free to use this portfolio template!

## 👤 Author

**Souvick Roy**
- GitHub: [@Souvick14](https://github.com/Souvick14)
- LinkedIn: [Your LinkedIn]
- Portfolio: [Your Portfolio URL]

---

Built with ❤️ using Three.js, Express.js & MongoDB Atlas

⭐ Star this repo if you found it helpful!
