# 🚀 Iwanyu Platform - Quick Deployment Summary

## 📋 Deployment Steps

### 1. Backend to Render
```bash
# Repository: iwanyu-platform
# Root Directory: backend
# Build Command: npm install && npx prisma generate
# Start Command: npm start
```

### 2. Frontend to Vercel
```bash
# Repository: iwanyu-platform
# Root Directory: frontend
# Framework: Next.js
# Build Command: npm run build
```

## 🔑 Essential Environment Variables

### Backend (Render)
```env
NODE_ENV=production
PORT=10000
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret_key
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
FLUTTERWAVE_ENCRYPTION_KEY=your_flutterwave_encryption_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
NEXTAUTH_URL=https://your-frontend-url.vercel.app
NEXTAUTH_SECRET=your_secret_key
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
DATABASE_URL=your_database_url
```

## 🔗 Important URLs

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Expected Backend URL**: https://iwanyu-backend-xxxx.onrender.com
- **Expected Frontend URL**: https://iwanyu-platform-xxxx.vercel.app

## ✅ Quick Tests

```bash
# Test backend health
curl https://your-backend-url.onrender.com/api/health

# Test backend products
curl https://your-backend-url.onrender.com/api/products

# Test frontend (open in browser)
https://your-frontend-url.vercel.app
```

## 🚨 Common Issues & Fixes

1. **CORS Error**: Add frontend URL to backend CORS configuration
2. **Build Failure**: Check all environment variables are set
3. **Database Connection**: Verify DATABASE_URL format
4. **Images Not Loading**: Check next.config.js image domains

## 📞 Support Links

- [Render Support](https://render.com/docs)
- [Vercel Support](https://vercel.com/docs)
- [Project Repository](https://github.com/vincinci/iwanyu_3.0)

---

*Ready to deploy! 🎉*
