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

// Authentication endpoints
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
        emailVerified: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const bcrypt = require('bcryptjs');
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token: 'jwt-token-placeholder' // TODO: Implement proper JWT
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, phone, role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password, and name are required' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone: phone || null,
        role: role || 'CUSTOMER',
        emailVerified: new Date() // Auto-verify for now
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        createdAt: true
      }
    });

    res.status(201).json({
      message: 'Registration successful',
      user,
      token: 'jwt-token-placeholder' // TODO: Implement proper JWT
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get current user endpoint
app.get('/api/auth/me', async (req, res) => {
  try {
    // TODO: Implement proper JWT token validation
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // For now, return a placeholder response
    res.json({ message: 'User info endpoint - JWT implementation needed' });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Cart API endpoints will be implemented later

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
