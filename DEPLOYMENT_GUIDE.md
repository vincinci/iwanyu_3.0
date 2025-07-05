# Iwanyu Platform Deployment Guide

## 🚀 Deployment Overview

This guide covers deploying the Iwanyu Multivendor Ecommerce Platform:
- **Backend**: Node.js/Express API → Render
- **Frontend**: Next.js Application → Vercel

## 📋 Prerequisites

Before deployment, ensure you have:
- [x] GitHub repository with latest code
- [x] Render account (render.com)
- [x] Vercel account (vercel.com)
- [x] Environment variables ready
- [x] Database URL (Supabase/NeonDB)

---

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Backend for Render

1. **Create `render.yaml` for build configuration**:
```yaml
services:
  - type: web
    name: iwanyu-backend
    env: node
    buildCommand: npm install && npx prisma generate
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

2. **Update `package.json` scripts if needed**:
```json
{
  "scripts": {
    "start": "node server.js",
    "build": "npx prisma generate",
    "dev": "nodemon server.js"
  }
}
```

### Step 2: Deploy to Render

1. **Go to Render Dashboard**:
   - Visit [render.com](https://render.com)
   - Click "New" → "Web Service"

2. **Connect Repository**:
   - Connect your GitHub account
   - Select `iwanyu-platform` repository
   - Choose `backend` folder as root directory

3. **Configure Service**:
   - **Name**: `iwanyu-backend`
   - **Runtime**: Node.js
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for better performance)

4. **Set Environment Variables**:
   ```env
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=your_database_url_here
   NEXTAUTH_SECRET=your_nextauth_secret_here
   STRIPE_PUBLISHABLE_KEY=your_stripe_key_here
   STRIPE_SECRET_KEY=your_stripe_secret_here
   FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_here
   FLUTTERWAVE_ENCRYPTION_KEY=your_flutterwave_encryption_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://iwanyu-backend-xxxx.onrender.com`

### Step 3: Test Backend Deployment

```bash
# Test health endpoint
curl https://your-backend-url.onrender.com/api/health

# Test products endpoint
curl https://your-backend-url.onrender.com/api/products
```

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Vercel

1. **Create `vercel.json` configuration**:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "functions": {
    "app/api/**/*.js": {
      "maxDuration": 30
    }
  }
}
```

2. **Update environment variables reference**:
   - Create `.env.example` with all required variables
   - Ensure `.env.local` is in `.gitignore`

### Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"

2. **Import Repository**:
   - Connect GitHub account
   - Select `iwanyu-platform` repository
   - Choose `frontend` as root directory

3. **Configure Project**:
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
   - **Root Directory**: `frontend`

4. **Set Environment Variables**:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   NEXTAUTH_URL=https://your-frontend-url.vercel.app
   NEXTAUTH_SECRET=your_nextauth_secret_here
   DATABASE_URL=your_database_url_here
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your frontend URL: `https://your-app-name.vercel.app`

### Step 3: Update Backend CORS

After frontend deployment, update backend CORS settings:

```javascript
// In backend/server.js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-url.vercel.app'
  ],
  credentials: true
}));
```

---

## 🔐 Environment Variables Setup

### Backend (.env)
```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://user:password@host:5432/database
NEXTAUTH_SECRET=your_super_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
FLUTTERWAVE_SECRET_KEY=FLWSECK-your_flutterwave_secret_key
FLUTTERWAVE_ENCRYPTION_KEY=your_flutterwave_encryption_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-your_flutterwave_public_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXTAUTH_URL=https://your-frontend-url.vercel.app
NEXTAUTH_SECRET=your_super_secret_key_here
DATABASE_URL=postgresql://user:password@host:5432/database
```

---

## 📊 Post-Deployment Checklist

### ✅ Backend Verification
- [ ] Health check endpoint responds
- [ ] Products API returns data
- [ ] Cart API endpoints work
- [ ] Database connection successful
- [ ] CORS allows frontend domain

### ✅ Frontend Verification
- [ ] Homepage loads correctly
- [ ] Product images display
- [ ] Cart functionality works
- [ ] API calls to backend succeed
- [ ] Payment integration works

### ✅ Integration Testing
- [ ] Frontend can fetch products from backend
- [ ] Cart operations work end-to-end
- [ ] Payment flow completes
- [ ] Error handling works properly

---

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Add your Vercel URL to backend CORS origins
   - Ensure credentials are properly configured

2. **Environment Variables**:
   - Double-check all required variables are set
   - Ensure no trailing spaces in values

3. **Database Connection**:
   - Verify DATABASE_URL format
   - Check database server allows connections

4. **Build Failures**:
   - Check build logs for specific errors
   - Ensure all dependencies are listed in package.json

### Render Specific Issues

1. **Build timeouts**: Increase build timeout in settings
2. **Memory issues**: Upgrade to paid plan for more resources
3. **Database connections**: Use connection pooling

### Vercel Specific Issues

1. **Function timeouts**: Increase timeout in vercel.json
2. **Build size**: Optimize bundle size and assets
3. **Edge runtime**: Consider using Node.js runtime for API routes

---

## 🚀 Continuous Deployment

### Automatic Deployments

1. **Render**: Auto-deploys on pushes to main branch
2. **Vercel**: Auto-deploys on pushes to main branch

### Manual Deployments

1. **Render**: Use dashboard "Manual Deploy" button
2. **Vercel**: Use `vercel --prod` command or dashboard

---

## 📈 Performance Optimization

### Backend (Render)
- Use paid plan for better performance
- Implement caching for frequently accessed data
- Optimize database queries
- Use connection pooling

### Frontend (Vercel)
- Optimize images with Next.js Image component
- Use static generation where possible
- Implement proper caching headers
- Minimize bundle size

---

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive keys
2. **CORS**: Restrict to specific domains
3. **Rate Limiting**: Implement API rate limiting
4. **HTTPS**: Ensure all communications use HTTPS
5. **Input Validation**: Validate all user inputs

---

## 📞 Support

If you encounter issues:
1. Check deployment logs first
2. Verify environment variables
3. Test API endpoints individually
4. Check CORS configuration
5. Review database connections

**Deployment URLs**:
- Backend: `https://iwanyu-backend-xxxx.onrender.com`
- Frontend: `https://iwanyu-platform-xxxx.vercel.app`

---

*Last updated: July 5, 2025*
