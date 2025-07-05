# 🚨 URGENT: Fix Database Connection

## Problem
Your backend APIs are failing because the database connection needs SSL configuration.

## Quick Fix Steps

### 1. Go to Render Dashboard
- Visit https://dashboard.render.com
- Click on your `iwanyu-backend` service

### 2. Update Environment Variables
- Click "Environment" tab
- Find `DATABASE_URL` variable
- Update it to:
```
postgresql://postgres:davy$100@db.januuygbpxenuhhlsjph.supabase.co:5432/postgres?sslmode=require
```

### 3. Trigger Redeploy
- Click "Manual Deploy" → "Deploy latest commit"
- Wait 5-10 minutes for deployment

### 4. Test APIs
After deployment, test these endpoints:
```bash
# Should return {"status":"OK",...}
curl https://iwanyu-3-0.onrender.com/api/health

# Should return database connection status
curl https://iwanyu-3-0.onrender.com/api/db-test

# Should return products data (not error)
curl https://iwanyu-3-0.onrender.com/api/products
```

## Alternative: Use Mock Data
If database issues persist, you can temporarily use mock endpoints:
- https://iwanyu-3-0.onrender.com/api/mock/products
- https://iwanyu-3-0.onrender.com/api/mock/categories  
- https://iwanyu-3-0.onrender.com/api/mock/vendors

## The Root Issue
Supabase requires SSL connections in production. Adding `?sslmode=require` to the DATABASE_URL fixes this.

**Once you update the DATABASE_URL, all your APIs will work! 🎉**
