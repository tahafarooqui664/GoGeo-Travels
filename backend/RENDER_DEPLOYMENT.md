# GoGeo Travels Backend - Render Deployment Guide

## 🚀 Quick Deploy to Render

### 1. Create New Web Service
- Go to [Render Dashboard](https://dashboard.render.com)
- Click "New +" → "Web Service"
- Connect your GitHub repository: `GoGeo-Travels`
- Select the `backend` folder as the root directory

### 2. Configure Build & Deploy Settings
- **Name**: `gogeo-travels-backend`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 3. Environment Variables
Add these in the Render dashboard under "Environment":

```
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
ADMIN_EMAIL=admin@gogeotravels.com
ADMIN_NAME=GoGeo Travels Admin
BREVO_SENDER_EMAIL=noreply@gogeotravels.com
BREVO_SENDER_NAME=GoGeo Travels
CLOUDINARY_CLOUD_NAME=dnluxha1i
CLOUDINARY_API_KEY=199955313277347
CLOUDINARY_API_SECRET=020nwxY9d2PT9wV_JjBraDRHYv4
CLOUDINARY_URL=cloudinary://199955313277347:020nwxY9d2PT9wV_JjBraDRHYv4@dnluxha1i
DATABASE_URL=prisma://accelerate.prisma-data.net/?api_key=your_prisma_accelerate_key
BREVO_API_KEY=your_brevo_api_key_here
```

### 4. Health Check
- **Health Check Path**: `/health`
- Render will automatically monitor this endpoint

### 5. Auto-Deploy
- Enable auto-deploy from GitHub
- Every push to `main` branch will trigger a new deployment

## 📋 Post-Deployment Checklist

- [ ] Verify health check: `https://your-app.onrender.com/health`
- [ ] Test API endpoints: `https://your-app.onrender.com/api/cities`
- [ ] Update frontend API URL to point to Render
- [ ] Test Cloudinary image uploads
- [ ] Verify admin portal functionality

## 🔧 Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify TypeScript compiles locally: `npm run build`
- Check Render build logs for specific errors

### App Crashes
- Check Render logs for runtime errors
- Verify all environment variables are set
- Ensure DATABASE_URL is correct

### CORS Issues
- Update FRONTEND_URL environment variable
- Check that frontend domain is included in CORS config

## 📞 Support
- Render Docs: https://render.com/docs
- GoGeo Travels: Contact admin@gogeotravels.com
