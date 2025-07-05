import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create sample categories
  const electronicsCategory = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Latest electronic devices and gadgets',
      image: '/placeholder-product.svg',
      isActive: true
    }
  })

  const fashionCategory = await prisma.category.upsert({
    where: { slug: 'fashion' },
    update: {},
    create: {
      name: 'Fashion',
      slug: 'fashion',
      description: 'Trendy clothing and accessories',
      image: '/placeholder-product.svg',
      isActive: true
    }
  })

  const homeCategory = await prisma.category.upsert({
    where: { slug: 'home-kitchen' },
    update: {},
    create: {
      name: 'Home & Kitchen',
      slug: 'home-kitchen',
      description: 'Home appliances and kitchen essentials',
      image: '/placeholder-product.svg',
      isActive: true
    }
  })

  console.log('📦 Categories created')

  // Create sample users
  const vendorUser1 = await prisma.user.upsert({
    where: { email: 'vendor1@example.com' },
    update: {},
    create: {
      email: 'vendor1@example.com',
      name: 'John Doe',
      phone: '+250788123456',
      image: '/placeholder-product.svg',
      role: 'VENDOR' as const
    }
  })

  const vendorUser2 = await prisma.user.upsert({
    where: { email: 'vendor2@example.com' },
    update: {},
    create: {
      email: 'vendor2@example.com',
      name: 'Jane Smith',
      phone: '+250788654321',
      image: '/placeholder-product.svg',
      role: 'VENDOR' as const
    }
  })

  console.log('👤 Users created')

  // Create sample vendors
  const vendor1 = await prisma.vendor.upsert({
    where: { userId: vendorUser1.id },
    update: {},
    create: {
      userId: vendorUser1.id,
      businessName: 'TechWorld Rwanda',
      description: 'Your one-stop shop for the latest electronics and gadgets',
      logo: '/placeholder-product.svg',
      banner: '/placeholder-product.svg',
      status: 'APPROVED' as const,
      commission: 0.1
    }
  })

  const vendor2 = await prisma.vendor.upsert({
    where: { userId: vendorUser2.id },
    update: {},
    create: {
      userId: vendorUser2.id,
      businessName: 'Fashion Forward',
      description: 'Trendy fashion and accessories for the modern lifestyle',
      logo: '/placeholder-product.svg',
      banner: '/placeholder-product.svg',
      status: 'APPROVED' as const,
      commission: 0.12
    }
  })

  console.log('🏪 Vendors created')

  // Create sample products
  const products = [
    {
      name: 'iPhone 15 Pro',
      slug: 'iphone-15-pro',
      description: 'Latest iPhone with advanced camera system and A17 Pro chip',
      price: 1299000,
      comparePrice: 1399000,
      sku: 'IP15P-001',
      inventory: 25,
      status: 'ACTIVE' as const,
      images: ['/placeholder-product.svg'],
      vendorId: vendor1.id,
      categoryId: electronicsCategory.id
    },
    {
      name: 'MacBook Air M3',
      slug: 'macbook-air-m3',
      description: 'Powerful and lightweight laptop with M3 chip',
      price: 1899000,
      comparePrice: null,
      sku: 'MBA-M3-001',
      inventory: 15,
      status: 'ACTIVE' as const,
      images: ['/placeholder-product.svg'],
      vendorId: vendor1.id,
      categoryId: electronicsCategory.id
    },
    {
      name: 'Samsung Galaxy S24',
      slug: 'samsung-galaxy-s24',
      description: 'Premium Android smartphone with AI features',
      price: 1199000,
      comparePrice: 1299000,
      sku: 'SGS24-001',
      inventory: 30,
      status: 'ACTIVE' as const,
      images: ['/placeholder-product.svg'],
      vendorId: vendor1.id,
      categoryId: electronicsCategory.id
    },
    {
      name: 'Designer Dress',
      slug: 'designer-dress-001',
      description: 'Elegant designer dress perfect for special occasions',
      price: 89000,
      comparePrice: 129000,
      sku: 'DD-001',
      inventory: 12,
      status: 'ACTIVE' as const,
      images: ['/placeholder-product.svg'],
      vendorId: vendor2.id,
      categoryId: fashionCategory.id
    },
    {
      name: 'Premium Handbag',
      slug: 'premium-handbag-001',
      description: 'Luxury handbag made from genuine leather',
      price: 156000,
      comparePrice: null,
      sku: 'PH-001',
      inventory: 8,
      status: 'ACTIVE' as const,
      images: ['/placeholder-product.svg'],
      vendorId: vendor2.id,
      categoryId: fashionCategory.id
    },
    {
      name: 'Smart Watch',
      slug: 'smart-watch-001',
      description: 'Feature-rich smartwatch with health monitoring',
      price: 45000,
      comparePrice: 59000,
      sku: 'SW-001',
      inventory: 50,
      status: 'ACTIVE' as const,
      images: ['/placeholder-product.svg'],
      vendorId: vendor1.id,
      categoryId: electronicsCategory.id
    }
  ]

  for (const productData of products) {
    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData
    })
  }

  console.log('📱 Products created')
  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
