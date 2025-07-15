# GoGeo Travels Frontend - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### 1. Import Project to Vercel
- Go to [Vercel Dashboard](https://vercel.com/dashboard)
- Click "New Project"
- Import your GitHub repository: `GoGeo-Travels`
- Select the `frontend` folder as the root directory

### 2. Configure Project Settings
- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 3. Environment Variables
Add these in the Vercel dashboard under "Environment Variables":

```
NEXT_PUBLIC_API_URL=https://your-backend-domain.onrender.com/api
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dnluxha1i
```

### 4. Domain Configuration
- **Production Domain**: `your-domain.vercel.app` (auto-assigned)
- **Custom Domain**: Add your custom domain if you have one
- **Preview Deployments**: Enabled for all branches

## 📋 Deployment Settings

### Build Configuration
- **Node.js Version**: 18.x (recommended)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Environment Variables Required
| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.onrender.com/api` | Backend API endpoint |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `dnluxha1i` | Cloudinary cloud name for images |

### Performance Optimizations
- ✅ **Image Optimization**: Enabled (Next.js built-in)
- ✅ **Static Generation**: Enabled for static pages
- ✅ **Edge Functions**: Available for API routes
- ✅ **CDN**: Global edge network
- ✅ **Compression**: Automatic gzip/brotli

## 🔧 Post-Deployment Steps

### 1. Update Backend CORS
Update your backend's `FRONTEND_URL` environment variable:
```
FRONTEND_URL=https://your-app.vercel.app
```

### 2. Test Functionality
- [ ] Homepage loads correctly
- [ ] City selection works
- [ ] Vehicle browsing works
- [ ] Booking form submits
- [ ] Admin portal accessible
- [ ] Image uploads work (Cloudinary)

### 3. Custom Domain (Optional)
- Add your custom domain in Vercel dashboard
- Update DNS records as instructed
- Update backend CORS to include custom domain

## 🌐 URLs After Deployment

- **Production**: `https://your-app.vercel.app`
- **Admin Portal**: `https://your-app.vercel.app/admin`
- **Health Check**: Backend health at your Render URL

## 🔍 Monitoring & Analytics

### Vercel Analytics
- Enable Vercel Analytics for performance insights
- Monitor Core Web Vitals
- Track page load times

### Error Monitoring
- Check Vercel Function logs for errors
- Monitor API call failures
- Set up alerts for critical issues

## 🚨 Troubleshooting

### Build Fails
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check TypeScript compilation errors

### Runtime Errors
- Verify environment variables are set
- Check API connectivity to backend
- Verify Cloudinary configuration

### CORS Issues
- Ensure backend FRONTEND_URL is updated
- Check that Vercel domain is in backend CORS config
- Verify API endpoints are accessible

## 📞 Support Resources
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GoGeo Travels: admin@gogeotravels.com
