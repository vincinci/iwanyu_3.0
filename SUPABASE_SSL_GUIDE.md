# 🔐 How to Get SSL Database URL from Supabase

## Method 1: From Supabase Dashboard (Recommended)

### Step 1: Go to Supabase Dashboard
1. Visit [supabase.com](https://supabase.com)
2. Sign in to your account
3. Click on your project (the one you're using for Iwanyu)

### Step 2: Navigate to Database Settings
1. In the left sidebar, click on **"Settings"**
2. Click on **"Database"**
3. Scroll down to **"Connection string"** section

### Step 3: Copy the Connection String
You'll see different connection string formats. Use the **"URI"** format:

**Example:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.xyz.supabase.co:5432/postgres
```

### Step 4: Add SSL Mode
Add `?sslmode=require` to the end:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xyz.supabase.co:5432/postgres?sslmode=require
```

## Method 2: From Your Current URL

### Your Current Database URL
```
postgresql://postgres:davy$100@db.januuygbpxenuhhlsjph.supabase.co:5432/postgres
```

### SSL-Enabled Version (Ready to Use)
```
postgresql://postgres:davy$100@db.januuygbpxenuhhlsjph.supabase.co:5432/postgres?sslmode=require
```

## Method 3: Check Supabase Project Settings

### Alternative Location in Dashboard
1. Go to **Settings** → **API**
2. Look for **"Database URL"** under **Project Configuration**
3. Copy the **Connection string**
4. Add `?sslmode=require` at the end

## Why SSL is Required

### Supabase Security Requirements
- Supabase requires SSL connections for all external connections
- This is for security and data protection
- Without SSL, connections are rejected in production

### SSL Parameters You Can Use
- `?sslmode=require` - Basic SSL requirement (recommended)
- `?sslmode=prefer` - Prefer SSL but allow non-SSL
- `?sslmode=disable` - No SSL (not recommended for production)

## Verify Your Database URL Format

Your complete DATABASE_URL should look like this:
```
postgresql://postgres:davy$100@db.januuygbpxenuhhlsjph.supabase.co:5432/postgres?sslmode=require
```

**Components:**
- `postgresql://` - Protocol
- `postgres` - Username
- `davy$100` - Password (URL encoded)
- `db.januuygbpxenuhhlsjph.supabase.co` - Host
- `5432` - Port
- `postgres` - Database name
- `?sslmode=require` - SSL requirement

## Test Your Connection

### Local Test (Optional)
If you have `psql` installed, you can test:
```bash
psql "postgresql://postgres:davy$100@db.januuygbpxenuhhlsjph.supabase.co:5432/postgres?sslmode=require"
```

### API Test (After Deployment)
```bash
curl https://iwanyu-3-0.onrender.com/api/db-test
```

## Quick Reference

### For Render Environment Variables:
```env
DATABASE_URL=postgresql://postgres:davy$100@db.januuygbpxenuhhlsjph.supabase.co:5432/postgres?sslmode=require
```

### For Vercel Environment Variables:
```env
DATABASE_URL=postgresql://postgres:davy$100@db.januuygbpxenuhhlsjph.supabase.co:5432/postgres?sslmode=require
```

## Troubleshooting

### If Connection Still Fails:
1. **Check Password Encoding**: Special characters might need URL encoding
   - `@` becomes `%40`
   - `#` becomes `%23`
   - `$` is usually fine but can be `%24`

2. **Verify Host**: Make sure the host matches your Supabase project
3. **Check Project Status**: Ensure your Supabase project is active

### Common Issues:
- **Wrong host**: Check your Supabase project URL
- **Incorrect password**: Verify in Supabase settings
- **Missing SSL**: Always add `?sslmode=require`
- **URL encoding**: Special characters in password need encoding

## Summary

**Your working DATABASE_URL is:**
```
postgresql://postgres:davy$100@db.januuygbpxenuhhlsjph.supabase.co:5432/postgres?sslmode=require
```

**Just add `?sslmode=require` to your existing URL and you're good to go! 🎉**
