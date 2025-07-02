# Supabase Database Setup Guide for Iwanyu Platform

## 🗄️ Database Configuration Complete!

Your Iwanyu platform is now configured to use Supabase as the database backend.

## 📋 What's Already Done:
- ✅ Supabase client installed (`@supabase/supabase-js`)
- ✅ Environment variables configured with your Supabase project
- ✅ Prisma schema ready for PostgreSQL (compatible with Supabase)
- ✅ Supabase client configured in `/src/lib/supabase.ts`

## 🔑 Next Steps Required:

### 1. Get Your Database Password

1. Go to your Supabase dashboard: <https://supabase.com/dashboard>
2. Navigate to your project: `januuygbpxenuhhlsjph`
3. Go to **Settings** → **Database**
4. Copy the **Database password** (or reset it if needed)

### 2. Update DATABASE_URL
Replace `[YOUR-PASSWORD]` in `.env.local` with your actual database password:
```bash
DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.januuygbpxenuhhslsph.supabase.co:5432/postgres"
```

### 3. Initialize Database Schema
Run these commands to set up your database tables:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase database
npx prisma db push

# Optional: Seed the database with sample data
npx prisma db seed
```

### 4. Enable Row Level Security (RLS)
In your Supabase dashboard:
1. Go to **Authentication** → **Policies**
2. Enable RLS for each table you want to secure
3. Create policies based on your business logic

## 🚀 Database Schema Included:
Your platform includes a complete e-commerce schema with:
- 👥 **Users** (customers, vendors, admins)
- 🏪 **Vendors** (business profiles)
- 🛍️ **Products** (with categories, variants, inventory)
- 📦 **Orders** (with order items and status tracking)
- ⭐ **Reviews** (product ratings and comments)
- 🛒 **Cart Items** (shopping cart functionality)
- 💳 **Payment Transactions** (order payments)
- 📊 **Categories** (product organization)

## 🔗 Integration Points:
- **Prisma ORM**: Database queries and migrations
- **Supabase Client**: Real-time features and direct queries
- **NextAuth**: Authentication with Supabase adapter
- **API Routes**: Server-side database operations

## 🛡️ Security Features:
- Row Level Security (RLS) ready
- User role-based permissions
- Secure API endpoints
- Protected admin routes

Once you update the DATABASE_URL with your password, your platform will be fully connected to Supabase! 🎉
