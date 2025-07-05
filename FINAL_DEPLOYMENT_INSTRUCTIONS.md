# 🚀 FINAL DEPLOYMENT INSTRUCTIONS

## Your Deployment URLs:
- **Backend**: https://iwanyu-3-0.onrender.com
- **Frontend**: https://iwanyu-3-0.vercel.app

## 📋 STEP-BY-STEP DEPLOYMENT

### 🔧 RENDER BACKEND DEPLOYMENT

1. **Go to [render.com](https://render.com)**
2. **Click "New" → "Web Service"**
3. **Connect GitHub repository: `iwanyu_3.0`**
4. **Configure Service:**
   ```
   Name: iwanyu-backend
   Runtime: Node.js
   Branch: main
   Root Directory: backend
   Build Command: npm install && npx prisma generate
   Start Command: npm start
   Instance Type: Free
   ```

5. **Add Environment Variables** (copy from `RENDER_ENV_VARS.txt`):
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=postgresql://postgres:davy$100@db.januuygbpxenuhhlsjph.supabase.co:5432/postgres
   NEXTAUTH_SECRET=your_super_secret_key_here_make_it_long_and_random_123456789
   NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-80beae9a1e1463654d41a8e4d00515dd-X
   FLUTTERWAVE_SECRET_KEY=FLWSECK-cc842f4c47bf0059d3854bf053c11296-1973d2d141dvt-X
   FLUTTERWAVE_ENCRYPTION_KEY=cc842f4c47bf3f882628801e
   CLOUDINARY_CLOUD_NAME=dxdblhmbm
   CLOUDINARY_API_KEY=954418245239319
   CLOUDINARY_API_SECRET=hHY4ajUjfuCs7alASYUV4UqZF5o
   CLOUDINARY_URL=cloudinary://954418245239319:hHY4ajUjfuCs7alASYUV4UqZF5o@dxdblhmbm
   FRONTEND_URL=https://iwanyu-3-0.vercel.app
   ```

6. **Click "Create Web Service"**
7. **Wait 5-10 minutes for deployment**

### ▲ VERCEL FRONTEND DEPLOYMENT

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import GitHub repository: `iwanyu_3.0`**
4. **Configure Project:**
   ```
   Framework: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

5. **Add Environment Variables** (copy from `VERCEL_ENV_VARS.txt`):
   ```
   NEXT_PUBLIC_API_URL=https://iwanyu-3-0.onrender.com
   NEXTAUTH_URL=https://iwanyu-3-0.vercel.app
   NEXTAUTH_SECRET=your_super_secret_key_here_make_it_long_and_random_123456789
   DATABASE_URL=postgresql://postgres:davy$100@db.januuygbpxenuhhlsjph.supabase.co:5432/postgres
   NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-80beae9a1e1463654d41a8e4d00515dd-X
   FLUTTERWAVE_SECRET_KEY=FLWSECK-cc842f4c47bf0059d3854bf053c11296-1973d2d141dvt-X
   FLUTTERWAVE_ENCRYPTION_KEY=cc842f4c47bf3f882628801e
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxdblhmbm
   CLOUDINARY_API_KEY=954418245239319
   CLOUDINARY_API_SECRET=hHY4ajUjfuCs7alASYUV4UqZF5o
   CLOUDINARY_URL=cloudinary://954418245239319:hHY4ajUjfuCs7alASYUV4UqZF5o@dxdblhmbm
   ```

6. **Click "Deploy"**
7. **Wait 3-5 minutes for deployment**

## 🧪 TESTING YOUR DEPLOYMENT

### Test Backend:
```bash
# Health check
curl https://iwanyu-3-0.onrender.com/api/health

# Products API
curl https://iwanyu-3-0.onrender.com/api/products
```

### Test Frontend:
- Open: https://iwanyu-3-0.vercel.app
- Check if homepage loads
- Verify product images display
- Test cart functionality

## 🔄 AUTOMATIC DEPLOYMENTS

Both platforms will automatically redeploy when you push to the main branch:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

## 🚨 IMPORTANT NOTES

1. **NEXTAUTH_SECRET**: Generate a strong secret key for production
2. **Database**: Your Supabase database is already configured
3. **CORS**: Backend is configured to accept requests from your Vercel frontend
4. **Images**: Cloudinary and Shopify CDN images are configured
5. **Payment**: Flutterwave is configured for payments

## ✅ SUCCESS CHECKLIST

- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel  
- [ ] All environment variables set
- [ ] Backend health check passes
- [ ] Frontend loads without errors
- [ ] API communication works
- [ ] Images load correctly
- [ ] Cart functionality works

## 📞 SUPPORT

If you encounter issues:
1. Check deployment logs in Render/Vercel dashboards
2. Verify all environment variables are set correctly
3. Test API endpoints individually
4. Check browser console for errors

**Your Iwanyu platform is ready to go live! 🎉**

---

*Backend URL*: https://iwanyu-3-0.onrender.com
*Frontend URL*: https://iwanyu-3-0.vercel.app
