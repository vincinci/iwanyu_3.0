const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://iwanyu-3-0.vercel.app',
        'https://iwanyu-3-0-git-main.vercel.app',
        /^https:\/\/iwanyu-3-0-.*\.vercel\.app$/,
        process.env.FRONTEND_URL
      ]
    : [
        'http://localhost:3000',
        'http://localhost:3001'
      ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Iwanyu Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Products API
app.get('/api/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        skip: skip,
        take: limit,
        where: { status: 'ACTIVE' },
        include: {
          vendor: {
            select: { businessName: true, id: true }
          },
          category: {
            select: { name: true, id: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({ where: { status: 'ACTIVE' } })
    ]);
    
    res.json({
      data: products,
      count: totalCount,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/featured', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { status: 'ACTIVE' },
      include: {
        vendor: {
          select: { businessName: true, id: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 6
    });
    res.json(products);
  } catch (error) {
    console.error('Featured products error:', error);
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
});

// Categories API
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { name: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Vendors API
app.get('/api/vendors', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    
    const [vendors, totalCount] = await Promise.all([
      prisma.vendor.findMany({
        skip: skip,
        take: limit,
        where: { status: 'APPROVED' },
        include: {
          user: {
            select: { name: true, email: true, image: true }
          },
          _count: {
            select: { products: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.vendor.count({ where: { status: 'APPROVED' } })
    ]);
    
    res.json({
      data: vendors,
      count: totalCount,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (error) {
    console.error('Vendors fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});

// Cart API endpoints
app.get('/api/cart', (req, res) => {
  // Mock cart data for frontend compatibility
  res.json({
    data: [],
    count: 0,
    total: 0
  });
});

app.post('/api/cart', (req, res) => {
  // Mock add to cart endpoint
  res.json({
    success: true,
    message: 'Item added to cart',
    data: req.body
  });
});

app.put('/api/cart/:id', (req, res) => {
  // Mock update cart item endpoint
  res.json({
    success: true,
    message: 'Cart item updated',
    data: req.body
  });
});

app.delete('/api/cart/:id', (req, res) => {
  // Mock remove from cart endpoint
  res.json({
    success: true,
    message: 'Item removed from cart'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Iwanyu Backend API running on port ${PORT}`);
  console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
  console.log(`📦 Products: http://localhost:${PORT}/api/products`);
  console.log(`🏪 Vendors: http://localhost:${PORT}/api/vendors`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
