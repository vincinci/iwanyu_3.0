# 🔧 COMPLETE DEPLOYMENT FIX GUIDE

## Current Problem
All your APIs are returning 500 errors because the database connection is failing. Here's the complete fix:

## Step 1: Fix Database Connection (CRITICAL)

### Update Render Environment Variables
1. Go to https://dashboard.render.com
2. Click on your `iwanyu-backend` service
3. Click "Environment" tab
4. Update `DATABASE_URL` to include SSL:

**CURRENT (BROKEN):**
```
DATABASE_URL=postgresql://postgres:davy$100@db.januuygbpxenuhhlsjph.supabase.co:5432/postgres
```

**FIXED (WORKING):**
```
DATABASE_URL=postgresql://postgres:davy$100@db.januuygbpxenuhhlsjph.supabase.co:5432/postgres?sslmode=require
```

### Trigger Redeploy
1. In Render dashboard, click "Manual Deploy"
2. Select "Deploy latest commit"
3. Wait 5-10 minutes for deployment

## Step 2: Test Database Connection

After deployment, test these endpoints:

```bash
# 1. Basic health check (should work)
curl https://iwanyu-3-0.onrender.com/api/health

# 2. Database connection test (should show success)
curl https://iwanyu-3-0.onrender.com/api/db-test

# 3. Test all failing APIs
curl https://iwanyu-3-0.onrender.com/api/categories
curl https://iwanyu-3-0.onrender.com/api/vendors
curl https://iwanyu-3-0.onrender.com/api/products
curl https://iwanyu-3-0.onrender.com/api/products/featured
```

## Step 3: Database Setup (If Tables Don't Exist)

If APIs still return empty arrays, run database setup:

### Option A: Automatic Setup (Recommended)
The deployment should automatically create tables. If not, you can trigger it manually.

### Option B: Manual Database Setup
If you have database access, run:
```sql
-- This will be handled automatically by Prisma
-- No manual SQL needed
```

## Step 4: Verify Frontend Integration

### Check Frontend API Calls
Your frontend should automatically work once backend APIs return data instead of 500 errors.

### Expected Results After Fix:
- ✅ Categories: Should load category list
- ✅ Vendors: Should load vendor profiles  
- ✅ Products: Should load product catalog
- ✅ Featured Products: Should display on homepage

## Step 5: Image Issues (Bonus Fix)

The image 404 error is from Unsplash. Update your image URLs to use:
- Cloudinary: `https://res.cloudinary.com/dxdblhmbm/image/upload/...`
- Shopify CDN: `https://cdn.shopify.com/s/files/...`

## Complete Environment Variables

### For Render (Backend):
```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://postgres:davy$100@db.januuygbpxenuhhlsjph.supabase.co:5432/postgres?sslmode=require
NEXTAUTH_SECRET=your_super_secret_key_here_make_it_long_and_random_123456789
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-80beae9a1e1463654d41a8e4d00515dd-X
FLUTTERWAVE_SECRET_KEY=FLWSECK-cc842f4c47bf0059d3854bf053c11296-1973d2d141dvt-X
FLUTTERWAVE_ENCRYPTION_KEY=cc842f4c47bf3f882628801e
CLOUDINARY_CLOUD_NAME=dxdblhmbm
CLOUDINARY_API_KEY=954418245239319
CLOUDINARY_API_SECRET=hHY4ajUjfuCs7alASYUV4UqZF5o
FRONTEND_URL=https://iwanyu-3-0.vercel.app
```

### For Vercel (Frontend):
```env
NEXT_PUBLIC_API_URL=https://iwanyu-3-0.onrender.com
NEXTAUTH_URL=https://iwanyu-3-0.vercel.app
NEXTAUTH_SECRET=your_super_secret_key_here_make_it_long_and_random_123456789
DATABASE_URL=postgresql://postgres:davy$100@db.januuygbpxenuhhlsjph.supabase.co:5432/postgres?sslmode=require
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-80beae9a1e1463654d41a8e4d00515dd-X
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxdblhmbm
```

## Troubleshooting

### If APIs Still Fail After Database Fix:

1. **Check Render Logs:**
   - Go to Render dashboard
   - Click on your service
   - Check "Logs" tab for errors

2. **Verify Environment Variables:**
   - Ensure all variables are set correctly
   - No extra spaces or missing characters

3. **Manual Database Reset (Last Resort):**
   - In Render dashboard, you can trigger a rebuild
   - This will recreate all database tables

## Expected Timeline

1. **Database URL Fix:** 2 minutes
2. **Render Redeploy:** 5-10 minutes  
3. **API Testing:** 2 minutes
4. **Frontend Verification:** 1 minute

**Total Time:** ~15-20 minutes

## Success Indicators

✅ **All these should work after the fix:**
- Homepage loads with products
- Categories page shows categories
- Vendors page shows vendor profiles
- Product pages load correctly
- Cart functionality works
- No more 500 errors in browser console

## The Root Cause

Supabase (your database) requires SSL connections in production environments. The missing `?sslmode=require` in your DATABASE_URL is causing all database operations to fail, which results in 500 errors on all API endpoints.

**Once you add the SSL parameter, everything will work! 🎉**
