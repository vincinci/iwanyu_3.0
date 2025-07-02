# Iwanyu 3.0 - Multivendor Ecommerce Platform

A modern, full-stack multivendor ecommerce platform built with Next.js 14, TypeScript, Supabase, and Prisma ORM.

![Iwanyu Platform](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🛍️ **Ecommerce Core**
- **Product Catalog** - Browse and search products with filtering
- **Shopping Cart** - Add to cart, quantity management, checkout
- **Order Management** - Complete order processing and tracking
- **Payment Integration** - Stripe-ready payment processing
- **Reviews & Ratings** - Customer feedback system

### 👥 **Multivendor Support**
- **Vendor Registration** - Easy onboarding for sellers
- **Vendor Dashboard** - Manage products, orders, and analytics
- **Commission System** - Automated vendor payouts
- **Product Management** - Vendor-specific product catalogs

### 🔐 **Authentication & Security**
- **User Roles** - Customer, Vendor, Admin permissions
- **Route Protection** - Middleware-based access control
- **Session Management** - Secure authentication with Supabase
- **Password Reset** - Complete auth flow implementation

### 📱 **Modern UI/UX**
- **Responsive Design** - Mobile-first, works on all devices
- **Yellow & White Theme** - Professional brand colors
- **Accessibility** - WCAG compliant components
- **Loading States** - Smooth user experience

### 🌍 **Localization**
- **RWF Currency** - Rwandan Francs support
- **Local Tax** - VAT calculations
- **Shipping** - Local delivery options

## 🚀 **Tech Stack**

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Beautiful iconography

### **Backend**
- **Supabase** - PostgreSQL database with real-time features
- **Prisma ORM** - Type-safe database operations
- **Next.js API Routes** - Server-side endpoints
- **Middleware** - Route protection and auth

### **Development**
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Git Hooks** - Pre-commit quality checks

## 📋 **Prerequisites**

- Node.js 18+ 
- npm or yarn
- Git
- Supabase account

## 🛠️ **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/vincinci/iwanyu_3.0.git
   cd iwanyu_3.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   DATABASE_URL=your_database_url
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open Prisma Studio** (Optional)
   ```bash
   npx prisma studio
   ```

## 📁 **Project Structure**

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── products/          # Product catalog
│   ├── cart/              # Shopping cart
│   ├── vendor/            # Vendor area
│   └── api/               # API routes
├── components/            # React components
│   ├── home/              # Homepage sections
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility libraries
│   ├── supabase.ts        # Supabase client
│   ├── database.ts        # Database helpers
│   ├── cart.ts            # Cart management
│   └── currency.ts        # Currency formatting
├── utils/supabase/        # SSR Supabase clients
└── middleware.ts          # Route protection
```

## 🗄️ **Database Schema**

The platform includes a comprehensive database schema:

- **Users** - Customer and vendor accounts
- **Vendors** - Business profiles and verification
- **Products** - Product catalog with variants
- **Categories** - Product organization
- **Orders** - Order processing and tracking
- **Cart Items** - Shopping cart functionality
- **Reviews** - Product reviews and ratings
- **Transactions** - Payment processing

## 🔧 **Configuration**

### **Supabase Setup**
1. Create a new Supabase project
2. Copy your project URL and API keys
3. Run database migrations with Prisma
4. Enable Row Level Security (RLS) policies

### **Authentication**
- Email/password authentication
- Role-based access control
- Protected routes with middleware
- Session management

### **Payments** (Optional)
- Stripe integration ready
- Add your Stripe keys to environment variables
- Configure webhooks for order processing

## 🚀 **Deployment**

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### **Other Platforms**
The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- AWS
- DigitalOcean

## 📚 **Documentation**

- [Supabase Setup Guide](./SUPABASE_SETUP.md)
- [SSR Integration Guide](./SUPABASE_SSR_GUIDE.md)
- [Development Guidelines](./.github/copilot-instructions.md)

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 **Authors**

- **Vincinci** - Initial work - [@vincinci](https://github.com/vincinci)

## 🙏 **Acknowledgments**

- Next.js team for the amazing framework
- Supabase for the excellent database solution
- Tailwind CSS for the utility-first styling
- Prisma for the type-safe ORM

## 📞 **Support**

For support, email support@iwanyu.com or join our Discord community.

---

**Built with ❤️ for the Rwandan ecommerce ecosystem**
