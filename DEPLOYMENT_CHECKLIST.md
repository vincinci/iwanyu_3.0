# 🚀 Iwanyu Platform Deployment Checklist

## Pre-Deployment Preparation

### ✅ Backend Preparation (Render)
- [ ] Verify `backend/package.json` has correct scripts
- [ ] Ensure `backend/.env` has all required variables
- [ ] Test backend locally with `npm start`
- [ ] Verify database connection works
- [ ] Check CORS configuration for production domains

### ✅ Frontend Preparation (Vercel)
- [ ] Verify `frontend/package.json` has correct scripts
- [ ] Ensure `frontend/.env.local` has all required variables
- [ ] Test frontend locally with `npm run dev`
- [ ] Verify API calls work with backend
- [ ] Check Next.js build passes with `npm run build`

### ✅ Repository Setup
- [ ] All changes committed to git
- [ ] `.gitignore` excludes sensitive files
- [ ] `render.yaml` and `vercel.json` configured
- [ ] Environment variables template created

---

## 🌐 Render Deployment (Backend)

### Step 1: Create Render Service
1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect GitHub repository
4. Select `iwanyu-platform` repository

### Step 2: Configure Service
```
Name: iwanyu-backend
Runtime: Node.js
Region: Ohio (US East)
Branch: main
Root Directory: backend
Build Command: npm install && npx prisma generate
Start Command: npm start
Instance Type: Free (upgrade later if needed)
```

### Step 3: Environment Variables
Add these environment variables in Render dashboard:

**Required Variables:**
```
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://user:password@host:5432/database
NEXTAUTH_SECRET=your_super_secret_key_here
```

**Payment Integration:**
```
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret
FLUTTERWAVE_SECRET_KEY=FLWSECK-your_flutterwave_secret
FLUTTERWAVE_ENCRYPTION_KEY=your_flutterwave_encryption_key
```

**File Upload:**
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 4: Deploy & Test
- [ ] Click "Create Web Service"
- [ ] Wait for deployment to complete (5-10 minutes)
- [ ] Test health endpoint: `https://your-backend-url.onrender.com/api/health`
- [ ] Test products endpoint: `https://your-backend-url.onrender.com/api/products`
- [ ] Note your backend URL for frontend configuration

---

## ▲ Vercel Deployment (Frontend)

### Step 1: Create Vercel Project
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import `iwanyu-platform` repository
4. Select `frontend` as root directory

### Step 2: Configure Project
```
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### Step 3: Environment Variables
Add these environment variables in Vercel dashboard:

**API Configuration:**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
NEXTAUTH_URL=https://your-project-name.vercel.app
NEXTAUTH_SECRET=your_super_secret_key_here
```

**Payment Integration:**
```
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-your_public_key
```

**Database & Upload:**
```
DATABASE_URL=postgresql://user:password@host:5432/database
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Step 4: Deploy & Test
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete (3-5 minutes)
- [ ] Test homepage loads correctly
- [ ] Test product images display
- [ ] Test cart functionality
- [ ] Test API integration with backend

---

## 🔧 Post-Deployment Configuration

### Update Backend CORS
After frontend deployment, update backend environment variables:
```
FRONTEND_URL=https://your-project-name.vercel.app
```

### Database Setup
If using fresh database:
```bash
# Run database migrations
npx prisma db push

# Seed database with sample data
npm run db:seed
```

### Domain Setup (Optional)
- [ ] Configure custom domain in Vercel
- [ ] Update NEXTAUTH_URL with custom domain
- [ ] Update CORS configuration with custom domain

---

## 🧪 Testing & Verification

### Backend Tests
```bash
# Health check
curl https://your-backend-url.onrender.com/api/health

# Get products
curl https://your-backend-url.onrender.com/api/products

# Test CORS
curl -H "Origin: https://your-frontend-url.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://your-backend-url.onrender.com/api/products
```

### Frontend Tests
- [ ] Homepage loads without errors
- [ ] Product listing displays correctly
- [ ] Product images load from CDN
- [ ] Cart functionality works
- [ ] Add to cart API calls succeed
- [ ] Payment flow initiates correctly

### Integration Tests
- [ ] Frontend successfully connects to backend API
- [ ] Cart operations work end-to-end
- [ ] Product images display correctly
- [ ] Payment integration works
- [ ] Error handling displays appropriate messages

---

## 🚨 Troubleshooting Guide

### Common Issues & Solutions

**1. CORS Errors**
```
Solution: Add frontend URL to backend CORS configuration
Check: Backend environment variables include FRONTEND_URL
```

**2. Environment Variable Issues**
```
Solution: Verify all required variables are set in both platforms
Check: No trailing spaces, correct format for DATABASE_URL
```

**3. Build Failures**
```
Backend: Check build logs for missing dependencies
Frontend: Run 'npm run build' locally to identify issues
```

**4. Database Connection Errors**
```
Solution: Verify DATABASE_URL format and credentials
Check: Database server allows external connections
```

**5. Image Loading Issues**
```
Solution: Verify image domains in next.config.js
Check: Cloudinary/CDN URLs are accessible
```

---

## 📊 Performance Monitoring

### Render Monitoring
- Monitor CPU and memory usage
- Check response times
- Review error logs
- Consider upgrading to paid plan

### Vercel Analytics
- Monitor page load times
- Track Core Web Vitals
- Review function invocations
- Monitor edge cache performance

---

## 🔄 Continuous Deployment

### Automatic Deployments
Both platforms will automatically deploy when you push to main branch:

```bash
# Deploy latest changes
git add .
git commit -m "Your commit message"
git push origin main
```

### Manual Deployments
- **Render**: Use "Manual Deploy" button in dashboard
- **Vercel**: Use `vercel --prod` command or dashboard

---

## 📞 Support & Resources

### Documentation
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

### Community Support
- [Render Community](https://community.render.com)
- [Vercel Discord](https://vercel.com/discord)
- [Next.js Discord](https://nextjs.org/discord)

---

## 🎉 Success! Your Iwanyu Platform is Live!

**Backend URL**: `https://iwanyu-backend-xxxx.onrender.com`
**Frontend URL**: `https://iwanyu-platform-xxxx.vercel.app`

### Next Steps:
1. Share your platform with beta users
2. Monitor performance and user feedback
3. Set up error monitoring (Sentry, LogRocket)
4. Configure analytics (Google Analytics, Mixpanel)
5. Plan for scaling (database, CDN, caching)

---

*Deployment completed: July 5, 2025*
