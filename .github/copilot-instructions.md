# Copilot Instructions for Iwanyu Multivendor Ecommerce Platform

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a multivendor ecommerce platform called "Iwanyu" built with:
- **Frontend**: Next.js 14 with TypeScript and App Router
- **Styling**: Tailwind CSS with yellow and white theme
- **Database**: NeonDB with Prisma ORM
- **UI**: Professional design with nice icons and interactive elements

## Theme Guidelines
- **Primary Colors**: Yellow (#FCD34D, #F59E0B) and White (#FFFFFF)
- **Accent Colors**: Gray shades for text and borders
- **Design**: Clean, modern, professional appearance
- **Icons**: Use Lucide React or Heroicons for consistent iconography

## Architecture Patterns
- Use Next.js App Router for file-based routing
- Implement Server Components where possible
- Use TypeScript for type safety
- Follow component-based architecture
- Implement proper error boundaries and loading states

## Multivendor Features
- Vendor registration and management
- Product catalog per vendor
- Order management system
- Commission tracking
- Vendor dashboard
- Admin panel for platform management

## Database Schema (Prisma)
- Users (customers, vendors, admins)
- Products with vendor association
- Orders and order items
- Categories and subcategories
- Reviews and ratings
- Payment transactions

## Code Style
- Use functional components with hooks
- Implement proper TypeScript types
- Follow Next.js best practices
- Use Tailwind CSS classes consistently
- Ensure responsive design for all components
