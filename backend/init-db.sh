#!/bin/bash

# Database initialization script for Render deployment

echo "🔄 Starting database initialization..."

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Push schema to database (creates tables if they don't exist)
echo "🗃️ Creating database tables..."
npx prisma db push --accept-data-loss

# Check if seed script exists and run it
if [ -f "scripts/import-products.js" ]; then
    echo "🌱 Seeding database with sample data..."
    node scripts/import-products.js
else
    echo "⚠️ No seed script found, skipping data seeding"
fi

echo "✅ Database initialization complete!"
