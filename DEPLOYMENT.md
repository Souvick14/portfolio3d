# 🚀 Portfolio Deployment Guide

## ✅ Your Portfolio is Ready for Deployment!

**GitHub Repository:** https://github.com/Souvick14/portfolio3d

---

## 📊 What You Have:

- ✅ MongoDB Atlas configured: `portfolio.jiyi3if.mongodb.net`
- ✅ Railway token ready
- ✅ Deployment configs created
- ✅ Code on GitHub

---

## 🚀 Deploy Backend to Railway

### Step 1: Open Railway Dashboard
Go to: https://railway.app/dashboard

### Step 2: New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **`Souvick14/portfolio3d`**

### Step 3: Configure Service
1. Railway will detect Node.js automatically
2. Click on the service → **"Settings"**
3. Set **Root Directory**: `backend`
4. Set **Start Command**: `npm start`

### Step 4: Add Environment Variables
Click **"Variables"** tab and add:

```
MONGODB_URI=mongodb+srv://souvickroy200212_db_user:Eskyq6gfdbgELLMa@portfolio.jiyi3if.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=8080
NODE_ENV=production
CORS_ORIGIN=*
```

### Step 5: Deploy!
- Railway will automatically deploy
- Wait 2-3 minutes
- Copy your Railway URL (looks like: `https://portfolio3d-production.up.railway.app`)

### Step 6: Seed Database from Railway
Once deployed, open Railway **"Deployments"** → **"View Logs"**

Then run this command in Railway's **"Terminal"**:
```bash
node seed-mongodb.js
```

✅ Your backend is live!

---

## 🌐 Deploy Frontend to Vercel

### Step 1: Open Vercel
Go to: https://vercel.com/new

### Step 2: Import from GitHub
1. Click **"Import Project"**
2. Select **`Souvick14/portfolio3d`**

### Step 3: Configure
- **Framework Preset:** Other
- **Root Directory:** `./`
- **Build Command:** (leave empty)
- **Output Directory:** `./`

### Step 4: Add Environment Variable
Add this variable:
```
VITE_API_URL=https://your-railway-url.railway.app
```
(Use the Railway URL from Step 5 above)

### Step 5: Deploy!
- Click **"Deploy"**
- Wait 1-2 minutes
- Vercel will give you a URL like: `https://portfolio3d.vercel.app`

✅ Your frontend is live!

---

## 🔗 Connect Frontend to Backend

Update the API base URL in your code:

```javascript
// js/api-service.js - Line 2
const API_BASE_URL = 'https://your-railway-url.railway.app';
```

Then push to GitHub:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

Vercel will auto-redeploy with the new URL!

---

## ⚠️ MongoDB Atlas IP Whitelist

Your MongoDB needs to allow Railway's IP:

1. Go to: https://cloud.mongodb.com/v2/6717b2189b25db34e1054b8e#/security/network/accessList
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"**: `0.0.0.0/0`
4. Click **"Confirm"**

This allows Railway to connect to your database.

---

## ✅ Final Checklist

- [ ] Deploy backend to Railway
- [ ] Add environment variables to Railway
- [ ] Whitelist IPs in MongoDB Atlas (0.0.0.0/0)
- [ ] Seed database from Railway terminal
- [ ] Deploy frontend to Vercel
- [ ] Update API URL in code
- [ ] Push changes to GitHub
- [ ] Test live website!

---

## 🎉 Your Portfolio Will Be Live At:

**Frontend:** `https://portfolio3d.vercel.app` (or your custom domain)

**Backend API:** `https://your-app.railway.app`

**Database:** MongoDB Atlas (cloud)

---

## 🆘 Need Help?

If you get stuck, check the Railway/Vercel logs for errors. Common issues:
- MongoDB IP whitelist not set
- Environment variables missing
- API URL not updated in frontend

---

**Ready to deploy? Follow the steps above!** 🚀
