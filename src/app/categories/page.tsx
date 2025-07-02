import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBagIcon, TagIcon } from '@heroicons/react/24/outline';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    description: 'Smartphones, laptops, headphones, and tech accessories',
    productCount: 2456,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    href: '/categories/electronics',
    trending: true,
  },
  {
    id: 2,
    name: 'Fashion & Clothing',
    description: 'Trendy clothing, shoes, and accessories for all ages',
    productCount: 3421,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    href: '/categories/fashion',
    trending: true,
  },
  {
    id: 3,
    name: 'Home & Garden',
    description: 'Furniture, decor, gardening tools, and home essentials',
    productCount: 1876,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    href: '/categories/home-garden',
    trending: false,
  },
  {
    id: 4,
    name: 'Health & Beauty',
    description: 'Skincare, makeup, wellness products, and health supplements',
    productCount: 1543,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    href: '/categories/health-beauty',
    trending: true,
  },
  {
    id: 5,
    name: 'Sports & Fitness',
    description: 'Exercise equipment, activewear, and sports accessories',
    productCount: 987,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    href: '/categories/sports-fitness',
    trending: false,
  },
  {
    id: 6,
    name: 'Books & Education',
    description: 'Books, educational materials, and learning resources',
    productCount: 2134,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    href: '/categories/books-education',
    trending: false,
  },
  {
    id: 7,
    name: 'Automotive',
    description: 'Car accessories, tools, and automotive equipment',
    productCount: 678,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    href: '/categories/automotive',
    trending: false,
  },
  {
    id: 8,
    name: 'Food & Beverages',
    description: 'Gourmet foods, beverages, and culinary essentials',
    productCount: 1245,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d4e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    href: '/categories/food-beverages',
    trending: true,
  },
];

function CategoryCard({ category }: { category: typeof categories[0] }) {
  return (
    <Link href={category.href}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100">
        {/* Category Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {category.trending && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 text-xs font-bold text-white bg-yellow-500 rounded-full">
                Trending
              </span>
            </div>
          )}
        </div>

        {/* Category Info */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-2">
            <TagIcon className="h-5 w-5 text-yellow-600" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
              {category.name}
            </h3>
          </div>
          
          <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
            {category.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ShoppingBagIcon className="h-4 w-4" />
              <span>{category.productCount.toLocaleString()} products</span>
            </div>
            <span className="text-yellow-600 font-semibold text-sm group-hover:underline">
              Browse →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-display">
            Shop by Category
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover thousands of products across our diverse categories. Find exactly what you need from trusted vendors.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 sm:p-8 lg:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-display">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg sm:text-xl text-yellow-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Our vendors are constantly adding new products. Contact us if you need something specific!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-yellow-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
            <Link
              href="/vendor/register"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-yellow-600 transition-all duration-300"
            >
              Become a Vendor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
