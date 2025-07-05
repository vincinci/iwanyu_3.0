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

// Database connection test
app.get('/api/db-test', async (req, res) => {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Test if tables exist by trying to count records
    const tests = await Promise.allSettled([
      prisma.category.count(),
      prisma.product.count(),
      prisma.vendor.count(),
      prisma.user.count()
    ]);
    
    const results = {
      database: 'Connected',
      tables: {
        categories: tests[0].status === 'fulfilled' ? `${tests[0].value} records` : 'Table missing or error',
        products: tests[1].status === 'fulfilled' ? `${tests[1].value} records` : 'Table missing or error',
        vendors: tests[2].status === 'fulfilled' ? `${tests[2].value} records` : 'Table missing or error',
        users: tests[3].status === 'fulfilled' ? `${tests[3].value} records` : 'Table missing or error'
      }
    };
    
    res.json(results);
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ 
      error: 'Database connection failed',
      details: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
});

// Products API
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
      data: products || [],
      count: totalCount || 0,
      page: page,
      limit: limit,
      totalPages: Math.ceil((totalCount || 0) / limit)
    });
  } catch (error) {
    console.error('Products fetch error:', error);
    
    // Check if it's a table not found error
    if (error.code === 'P2021' || error.message.includes('does not exist')) {
      // Return empty data if table doesn't exist
      res.json({
        data: [],
        count: 0,
        page: page,
        limit: limit,
        totalPages: 0
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to fetch products',
        details: error.message 
      });
    }
  }
});

// Featured Products API
app.get('/api/products/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    
    const products = await prisma.product.findMany({
      where: { status: 'ACTIVE' },
      include: {
        vendor: {
          select: { businessName: true, id: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
    
    res.json(products || []);
  } catch (error) {
    console.error('Featured products error:', error);
    
    // Check if it's a table not found error
    if (error.code === 'P2021' || error.message.includes('does not exist')) {
      // Return empty array if table doesn't exist
      res.json([]);
    } else {
      res.status(500).json({ 
        error: 'Failed to fetch featured products',
        details: error.message 
      });
    }
  }
});

// Categories API
app.get('/api/categories', async (req, res) => {
  try {
    // First check if categories table exists
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { name: 'asc' }
    });
    
    // If no categories found, return empty array instead of error
    res.json(categories || []);
  } catch (error) {
    console.error('Categories fetch error:', error);
    
    // Check if it's a table not found error
    if (error.code === 'P2021' || error.message.includes('does not exist')) {
      // Return empty array if table doesn't exist
      res.json([]);
    } else {
      res.status(500).json({ 
        error: 'Failed to fetch categories',
        details: error.message 
      });
    }
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
      data: vendors || [],
      count: totalCount || 0,
      page: page,
      limit: limit,
      totalPages: Math.ceil((totalCount || 0) / limit)
    });
  } catch (error) {
    console.error('Vendors fetch error:', error);
    
    // Check if it's a table not found error
    if (error.code === 'P2021' || error.message.includes('does not exist')) {
      // Return empty data if table doesn't exist
      res.json({
        data: [],
        count: 0,
        page: page,
        limit: limit,
        totalPages: 0
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to fetch vendors',
        details: error.message 
      });
    }
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

// Temporary fallback endpoints for when database is down
app.get('/api/fallback/products', (req, res) => {
  const fallbackProducts = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      slug: 'iphone-15-pro',
      description: 'Latest iPhone with advanced features',
      price: 999.99,
      comparePrice: 1099.99,
      images: ['https://res.cloudinary.com/dxdblhmbm/image/upload/v1/iwanyu/iphone-15-pro.jpg'],
      vendor: { businessName: 'Apple Store', id: 'vendor1' },
      category: { name: 'Electronics', id: 'cat1' },
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24',
      slug: 'samsung-galaxy-s24',
      description: 'Premium Android smartphone',
      price: 849.99,
      comparePrice: 949.99,
      images: ['https://res.cloudinary.com/dxdblhmbm/image/upload/v1/iwanyu/samsung-s24.jpg'],
      vendor: { businessName: 'Samsung Store', id: 'vendor2' },
      category: { name: 'Electronics', id: 'cat1' },
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'MacBook Pro 14"',
      slug: 'macbook-pro-14',
      description: 'Professional laptop for creators',
      price: 1999.99,
      comparePrice: 2199.99,
      images: ['https://res.cloudinary.com/dxdblhmbm/image/upload/v1/iwanyu/macbook-pro-14.jpg'],
      vendor: { businessName: 'Apple Store', id: 'vendor1' },
      category: { name: 'Electronics', id: 'cat1' },
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    }
  ];

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  
  res.json({
    data: fallbackProducts,
    count: fallbackProducts.length,
    page: page,
    limit: limit,
    totalPages: 1
  });
});

app.get('/api/fallback/categories', (req, res) => {
  const fallbackCategories = [
    { id: 'cat1', name: 'Electronics', slug: 'electronics', isActive: true, _count: { products: 15 } },
    { id: 'cat2', name: 'Fashion', slug: 'fashion', isActive: true, _count: { products: 25 } },
    { id: 'cat3', name: 'Home & Garden', slug: 'home-garden', isActive: true, _count: { products: 18 } },
    { id: 'cat4', name: 'Books', slug: 'books', isActive: true, _count: { products: 12 } }
  ];
  
  res.json(fallbackCategories);
});

app.get('/api/fallback/vendors', (req, res) => {
  const fallbackVendors = [
    {
      id: 'vendor1',
      businessName: 'Tech Hub Rwanda',
      businessDescription: 'Leading technology retailer in Rwanda',
      status: 'APPROVED',
      user: { name: 'Tech Hub', email: 'contact@techhub.rw', image: 'https://res.cloudinary.com/dxdblhmbm/image/upload/v1/iwanyu/vendor1.jpg' },
      _count: { products: 15 },
      createdAt: new Date().toISOString()
    },
    {
      id: 'vendor2',
      businessName: 'Fashion Forward',
      businessDescription: 'Trendy fashion and accessories',
      status: 'APPROVED',
      user: { name: 'Fashion Forward', email: 'hello@fashionforward.rw', image: 'https://res.cloudinary.com/dxdblhmbm/image/upload/v1/iwanyu/vendor2.jpg' },
      _count: { products: 25 },
      createdAt: new Date().toISOString()
    },
    {
      id: 'vendor3',
      businessName: 'Home Essentials',
      businessDescription: 'Everything for your home and garden',
      status: 'APPROVED',
      user: { name: 'Home Essentials', email: 'info@homeessentials.rw', image: 'https://res.cloudinary.com/dxdblhmbm/image/upload/v1/iwanyu/vendor3.jpg' },
      _count: { products: 18 },
      createdAt: new Date().toISOString()
    }
  ];

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  
  res.json({
    data: fallbackVendors,
    count: fallbackVendors.length,
    page: page,
    limit: limit,
    totalPages: 1
  });
});

app.get('/api/fallback/products/featured', (req, res) => {
  const featuredProducts = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      slug: 'iphone-15-pro',
      description: 'Latest iPhone with advanced features',
      price: 999.99,
      comparePrice: 1099.99,
      images: ['https://res.cloudinary.com/dxdblhmbm/image/upload/v1/iwanyu/iphone-15-pro.jpg'],
      vendor: { businessName: 'Tech Hub Rwanda', id: 'vendor1' },
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24',
      slug: 'samsung-galaxy-s24',
      description: 'Premium Android smartphone',
      price: 849.99,
      comparePrice: 949.99,
      images: ['https://res.cloudinary.com/dxdblhmbm/image/upload/v1/iwanyu/samsung-s24.jpg'],
      vendor: { businessName: 'Tech Hub Rwanda', id: 'vendor1' },
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    }
  ];

  const limit = parseInt(req.query.limit) || 6;
  res.json(featuredProducts.slice(0, limit));
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
