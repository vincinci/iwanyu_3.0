import Image from 'next/image';
import Link from 'next/link';
import { StarIcon, CheckBadgeIcon, MapPinIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

const vendors = [
  {
    id: 1,
    name: 'TechVendor Pro',
    category: 'Electronics',
    description: 'Premium electronics and gadgets from top brands worldwide',
    rating: 4.9,
    reviewCount: 2456,
    productCount: 1234,
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    verified: true,
    href: '/vendors/techvendor-pro',
    joinedYear: 2019,
    location: 'Kigali, Rwanda',
    featured: true,
  },
  {
    id: 2,
    name: 'Fashion Forward',
    category: 'Fashion & Clothing',
    description: 'Trendy clothing and accessories for the modern lifestyle',
    rating: 4.8,
    reviewCount: 1876,
    productCount: 2341,
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    verified: true,
    href: '/vendors/fashion-forward',
    joinedYear: 2020,
    location: 'Kigali, Rwanda',
    featured: true,
  },
  {
    id: 3,
    name: 'Home & Garden Plus',
    category: 'Home & Garden',
    description: 'Everything you need for your home and garden projects',
    rating: 4.7,
    reviewCount: 1532,
    productCount: 987,
    logo: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    verified: true,
    href: '/vendors/home-garden-plus',
    joinedYear: 2018,
    location: 'Butare, Rwanda',
    featured: false,
  },
  {
    id: 4,
    name: 'Natural Beauty',
    category: 'Health & Beauty',
    description: 'Organic skincare and natural beauty products',
    rating: 4.6,
    reviewCount: 1234,
    productCount: 567,
    logo: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    verified: true,
    href: '/vendors/natural-beauty',
    joinedYear: 2021,
    location: 'Musanze, Rwanda',
    featured: false,
  },
  {
    id: 5,
    name: 'Fitness Gear Hub',
    category: 'Sports & Fitness',
    description: 'Professional fitness equipment and activewear',
    rating: 4.8,
    reviewCount: 987,
    productCount: 432,
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    verified: true,
    href: '/vendors/fitness-gear-hub',
    joinedYear: 2022,
    location: 'Kigali, Rwanda',
    featured: true,
  },
  {
    id: 6,
    name: 'Local Crafts Rwanda',
    category: 'Arts & Crafts',
    description: 'Authentic Rwandan crafts and handmade products',
    rating: 4.9,
    reviewCount: 654,
    productCount: 234,
    logo: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    verified: true,
    href: '/vendors/local-crafts-rwanda',
    joinedYear: 2020,
    location: 'Nyanza, Rwanda',
    featured: true,
  },
];

function VendorCard({ vendor }: { vendor: typeof vendors[0] }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Vendor Banner */}
      <div className="relative h-32 sm:h-40 overflow-hidden">
        <Image
          src={vendor.banner}
          alt={`${vendor.name} banner`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {vendor.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-bold text-white bg-yellow-500 rounded-full">
              Featured
            </span>
          </div>
        )}
        {vendor.verified && (
          <div className="absolute top-3 right-3">
            <CheckBadgeIcon className="h-6 w-6 text-yellow-500 bg-white rounded-full p-1" />
          </div>
        )}
      </div>

      {/* Vendor Logo Overlap */}
      <div className="relative px-4 sm:px-6">
        <div className="relative -mt-8 w-16 h-16 rounded-xl overflow-hidden ring-4 ring-white shadow-lg">
          <Image
            src={vendor.logo}
            alt={`${vendor.name} logo`}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Vendor Info */}
      <div className="p-4 sm:p-6 pt-2">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
            {vendor.name}
          </h3>
          {vendor.verified && (
            <CheckBadgeIcon className="h-5 w-5 text-yellow-500" />
          )}
        </div>

        <p className="text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full inline-block mb-3">
          {vendor.category}
        </p>

        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {vendor.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
          <MapPinIcon className="h-4 w-4" />
          <span>{vendor.location}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(vendor.rating) ? (
                  <StarSolidIcon className="h-4 w-4 text-yellow-400" />
                ) : (
                  <StarIcon className="h-4 w-4 text-gray-300" />
                )}
              </span>
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {vendor.rating}
          </span>
          <span className="text-sm text-gray-500">
            ({vendor.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{vendor.productCount.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Products</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-lg font-bold text-yellow-700">{vendor.joinedYear}</div>
            <div className="text-xs text-yellow-600">Since</div>
          </div>
        </div>

        {/* Visit Store Button */}
        <Link
          href={vendor.href}
          className="block w-full text-center px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
        >
          Visit Store
        </Link>
      </div>
    </div>
  );
}

export default function VendorsPage() {
  const featuredVendors = vendors.filter(vendor => vendor.featured);
  const allVendors = vendors;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-display">
            Our Trusted Vendors
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover amazing products from verified vendors across Rwanda. Each vendor is carefully selected for quality and reliability.
          </p>
        </div>

        {/* Featured Vendors */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 font-display">
            Featured Vendors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {featuredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>

        {/* All Vendors */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 font-display">
            All Vendors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {allVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>

        {/* Become a Vendor CTA */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 sm:p-8 lg:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-display">
            Join Our Vendor Community
          </h2>
          <p className="text-lg sm:text-xl text-yellow-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Start selling your products to customers across Rwanda. Join thousands of successful vendors on our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vendor/register"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-yellow-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Become a Vendor
            </Link>
            <Link
              href="/contact"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-yellow-600 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
