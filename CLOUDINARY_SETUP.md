# Cloudinary Setup Guide

## Get Your Cloudinary Credentials

1. Go to https://cloudinary.com/users/register_free
2. Sign up for free account
3. After login, go to Dashboard
4. Copy these values:
   - Cloud Name
   - API Key  
   - API Secret

## Add to Railway

1. Go to your Railway project
2. Click on your backend service
3. Go to "Variables" tab
4. Add these variables:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
5. Deploy will restart automatically

## Local Development

Add to `backend/.env`:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

That's it! File uploads will now work.
