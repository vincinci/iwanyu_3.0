import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

const topVendors = [
  {
    id: 1,
    name: "TechVendor Pro",
    category: "Electronics",
    description: "Premium electronics and gadgets from top brands",
    rating: 4.9,
    reviewCount: 2456,
    productCount: 1234,
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    verified: true,
    href: "/vendors/techvendor-pro",
    joinedYear: 2019,
  },
  {
    id: 2,
    name: "Fashion Forward",
    category: "Fashion & Clothing",
    description: "Trendy clothing and accessories for all ages",
    rating: 4.8,
    reviewCount: 1876,
    productCount: 2341,
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    verified: true,
    href: "/vendors/fashion-forward",
    joinedYear: 2020,
  },
  {
    id: 3,
    name: "Home & Garden Plus",
    category: "Home & Garden",
    description: "Everything you need for your home and garden",
    rating: 4.7,
    reviewCount: 1532,
    productCount: 987,
    logo: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    verified: true,
    href: "/vendors/home-garden-plus",
    joinedYear: 2018,
  },
  {
    id: 4,
    name: "Fitness Gear Hub",
    category: "Sports & Fitness",
    description: "Professional fitness equipment and activewear",
    rating: 4.8,
    reviewCount: 1234,
    productCount: 567,
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    verified: true,
    href: "/vendors/fitness-gear-hub",
    joinedYear: 2021,
  },
];

function VendorCard({ vendor }: { vendor: typeof topVendors[0] }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 hover:border-yellow-200">
      {/* Vendor Header with Gradient Background */}
      <div className="relative bg-gradient-to-br from-yellow-50 to-white p-6 border-b border-yellow-100">
        <div className="flex items-start gap-4">
          {/* Vendor Logo with Ring */}
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-yellow-100 group-hover:ring-yellow-200 transition-all duration-300">
            <Image
              src={vendor.logo}
              alt={`${vendor.name} logo`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Vendor Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">
                {vendor.name}
              </h3>
              {vendor.verified && (
                <CheckBadgeIcon className="h-6 w-6 text-yellow-500" />
              )}
            </div>
            <p className="text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full inline-block mb-2">
              {vendor.category}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white px-2 py-1 rounded-lg shadow-sm">
                <StarIcon className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-bold text-gray-900 ml-1">
                  {vendor.rating}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {vendor.reviewCount.toLocaleString()} reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Details */}
      <div className="p-6">
        <p className="text-gray-600 mb-6 leading-relaxed">
          {vendor.description}
        </p>
        
        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <div className="text-2xl font-bold text-gray-900 mb-1">{vendor.productCount.toLocaleString()}</div>
            <div className="text-sm font-medium text-gray-600">Products</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-700 mb-1">{vendor.joinedYear}</div>
            <div className="text-sm font-medium text-yellow-600">Since</div>
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <Link
          href={vendor.href}
          className="block w-full text-center px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-bold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Visit Store
        </Link>
      </div>
    </div>
  );
}

export function VendorShowcase() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-2xl mb-6">
            <CheckBadgeIcon className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-display">
            Top Rated Vendors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our most trusted vendors with exceptional ratings and quality products. 
            Each vendor is carefully vetted to ensure the best shopping experience.
          </p>
        </div>

        {/* Vendors Grid with Enhanced Spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          {topVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>

        {/* Enhanced Become a Vendor CTA */}
        <div className="mt-20 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-3xl transform rotate-1"></div>
          <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-3xl p-8 lg:p-12 text-center text-white shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6 font-display">
                Join Our Vendor Community
              </h3>
              <p className="text-xl text-yellow-100 mb-8 leading-relaxed">
                Start selling your products to millions of customers worldwide. 
                Easy setup, competitive fees, and powerful tools to grow your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/vendor/register"
                  className="px-10 py-4 bg-white text-yellow-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Become a Vendor
                </Link>
                <Link
                  href="/vendors"
                  className="px-10 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-yellow-600 transition-all duration-300 transform hover:scale-105"
                >
                  Browse All Vendors
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-8 pt-8 border-t border-yellow-400 grid grid-cols-1 sm:grid-cols-3 gap-6 text-yellow-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-sm">Active Vendors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">1M+</div>
                  <div className="text-sm">Products Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">99%</div>
                  <div className="text-sm">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
