# Iwanyu - Multivendor Ecommerce Platform

A modern, professional multivendor marketplace built with Next.js, TypeScript, Tailwind CSS, and Prisma ORM.

## ✨ Features

- **🛒 Multivendor Marketplace**: Support for multiple vendors with individual stores
- **🎨 Beautiful Design**: Professional yellow and white theme with modern UI
- **🔐 Authentication**: Secure user authentication with NextAuth.js
- **💳 Payment Processing**: Integrated Stripe payment system
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **⚡ Performance**: Built with Next.js 15 and App Router for optimal performance
- **🗄️ Database**: PostgreSQL with Prisma ORM (NeonDB ready)
- **🔍 Search & Filters**: Advanced product search and filtering
- **⭐ Reviews & Ratings**: Customer review system
- **📊 Admin Dashboard**: Comprehensive admin panel for platform management
- **📈 Vendor Analytics**: Sales tracking and analytics for vendors

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (NeonDB recommended)
- Stripe account for payments

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd iwanyu-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env` and update with your values:
   ```bash
   # Database
   DATABASE_URL="postgresql://username:password@your-neon-host.neon.tech:5432/iwanyu_db?sslmode=require"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret-key-here"
   
   # Stripe
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
│   ├── home/           # Homepage components
│   ├── layout/         # Layout components (Header, Footer)
│   └── ui/             # Basic UI components
├── lib/                # Utility functions and configurations
│   ├── prisma.ts       # Prisma client setup
│   └── utils.ts        # Helper functions
└── styles/             # Global styles
```

## 🎨 Design System

- **Primary Colors**: Yellow (#FCD34D, #F59E0B) and White
- **Typography**: Inter for body text, Plus Jakarta Sans for headings
- **Components**: Built with Tailwind CSS and Headless UI
- **Icons**: Heroicons and Lucide React

## 🔧 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **UI Components**: Headless UI, Heroicons
- **Deployment**: Vercel (recommended)

## 📦 Database Schema

The platform includes comprehensive models for:
- User management (customers, vendors, admins)
- Product catalog with categories
- Order management system
- Shopping cart functionality
- Review and rating system
- Vendor management
- Payment tracking

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Database Setup (NeonDB)

1. Create a new project on [NeonDB](https://neon.tech)
2. Copy the connection string
3. Update `DATABASE_URL` in your environment variables
4. Run `npx prisma db push` to create tables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact our team or create an issue in the repository.

---

Built with ❤️ by the Iwanyu Team

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
