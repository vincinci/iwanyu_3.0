# Database Setup Guide for Iwanyu Platform

## Current Issue
The original Supabase database (db.januuygbpxenuhhlsjph.supabase.co) is no longer accessible, causing deployment failures on Render.

## Solution Options

### Option 1: Fix Current Supabase Project
Project ID: `fsbjcgdpgxiymbgldhaq`
Project Name: `iwanyu-platform`
Status: Created but database not yet accessible

**Steps:**
1. Go to https://supabase.com/dashboard/project/fsbjcgdpgxiymbgldhaq/settings/database
2. Set the database password to: `IwanyuDT$2025`
3. Wait for the database to become available (can take 5-10 minutes)
4. Test connection using:
   ```bash
   postgresql://postgres:IwanyuDT%242025@db.fsbjcgdpgxiymbgldhaq.supabase.co:5432/postgres?sslmode=require
   ```

### Option 2: Create New Neon Database
Neon is more reliable and faster to provision.

**Steps:**
1. Go to https://neon.tech/
2. Sign up/login
3. Create a new database project named "iwanyu-platform"
4. Copy the connection string
5. Update environment variables

### Option 3: Use Railway Database
Railway offers PostgreSQL databases with instant provisioning.

**Steps:**
1. Go to https://railway.app/
2. Create a new project
3. Add a PostgreSQL database
4. Copy the connection string
5. Update environment variables

## Database Schema Setup
Once the database is connected, run:

```bash
cd backend
npx prisma migrate reset --force
npx prisma db push
node clean-and-admin.js
```

## Environment Variables to Update

### Files to Update:
1. `backend/.env` - DATABASE_URL
2. `RENDER_ENV_VARS.txt` - DATABASE_URL
3. Render environment variables (via dashboard)

### Current Values:
```bash
# OLD (not working)
DATABASE_URL=postgresql://postgres:%23IwanyuDT%242025@db.januuygbpxenuhhlsjph.supabase.co:5432/postgres?sslmode=require

# NEW (Supabase - pending)
DATABASE_URL=postgresql://postgres:IwanyuDT%242025@db.fsbjcgdpgxiymbgldhaq.supabase.co:5432/postgres?sslmode=require
```

## Test Database Connection
Use the test script:

```bash
cd backend
node test-db-connection.js
```

## Next Steps
1. Choose one of the database options above
2. Set up the database and get the connection string
3. Update all environment variables
4. Test locally
5. Deploy to Render
6. Test production endpoints

## Current Status
- ✅ Backend server running on Render
- ✅ Frontend deployed on Vercel
- ❌ Database connection failing
- ❌ API endpoints returning errors due to DB issues

## Priority
**HIGH** - This is blocking all API functionality in production.
