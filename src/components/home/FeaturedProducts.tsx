"use client";

import Link from "next/link";
import Image from "next/image";
import { StarIcon, HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { useState } from 'react';
import { formatRWFSimple } from '@/lib/currency';
import { useCart } from '@/lib/cart';

const featuredProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    vendor: "TechVendor Pro",
    price: 199990, // 199,990 RWF (equivalent to ~$199.99)
    originalPrice: 249990,
    rating: 4.8,
    reviewCount: 1234,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "Best Seller",
    href: "/products/premium-wireless-headphones",
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    vendor: "WearableTech",
    price: 299990,
    originalPrice: 399990,
    rating: 4.6,
    reviewCount: 892,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "25% Off",
    href: "/products/smart-fitness-watch",
    inStock: true,
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    vendor: "ComfortSeating",
    price: 449990,
    originalPrice: 599990,
    rating: 4.9,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "Top Rated",
    href: "/products/ergonomic-office-chair",
    inStock: true,
  },
  {
    id: 4,
    name: "Professional Camera Lens",
    vendor: "PhotoGear Plus",
    price: 899990,
    originalPrice: 1099990,
    rating: 4.7,
    reviewCount: 423,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "New Arrival",
    href: "/products/professional-camera-lens",
    inStock: true,
  },
  {
    id: 5,
    name: "Organic Skincare Set",
    vendor: "NaturalBeauty",
    price: 89990,
    originalPrice: 129990,
    rating: 4.5,
    reviewCount: 789,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "30% Off",
    href: "/products/organic-skincare-set",
    inStock: true,
  },
  {
    id: 6,
    name: "Gaming Mechanical Keyboard",
    vendor: "GameMaster",
    price: 159990,
    originalPrice: 199990,
    rating: 4.8,
    reviewCount: 1156,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "Gaming",
    href: "/products/gaming-mechanical-keyboard",
    inStock: true,
  },
];

function ProductCard({ product }: { product: typeof featuredProducts[0] }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();
  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Add to cart
    addToCart(product, 1);
    
    setIsAddingToCart(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 text-xs font-bold text-white bg-yellow-500 rounded-full shadow-sm">
            {product.badge}
          </span>
        </div>

        {/* Wishlist Button - Mobile Optimized */}
        <button 
          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
          title="Add to wishlist"
          aria-label="Add to wishlist"
        >
          <HeartIcon className="h-4 w-4 text-gray-600 hover:text-yellow-600" />
        </button>

        {/* Quick View Overlay - Hidden on Mobile */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hidden sm:flex">
          <Link
            href={product.href}
            className="px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-yellow-50 transition-colors text-sm"
          >
            Quick View
          </Link>
        </div>
      </div>

      {/* Product Info - Mobile Optimized */}
      <div className="p-3 sm:p-4">
        {/* Vendor */}
        <p className="text-xs sm:text-sm text-yellow-600 mb-1 font-medium">{product.vendor}</p>
        
        {/* Product Name */}
        <Link href={product.href}>
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 hover:text-yellow-600 transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Rating - Compact Mobile Version */}
        <div className="flex items-center gap-1 sm:gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(product.rating) ? (
                  <StarSolidIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                ) : (
                  <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />
                )}
              </span>
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-500">
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price - Mobile Optimized with RWF */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              {formatRWFSimple(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  {formatRWFSimple(product.originalPrice)}
                </span>
                <span className="text-xs sm:text-sm text-yellow-600 font-bold bg-yellow-100 px-2 py-1 rounded-full">
                  -{discountPercentage}%
                </span>
              </>
            )}
          </div>
        </div>

        {/* Add to Cart Button - Mobile Optimized */}
        <button 
          onClick={handleAddToCart}
          disabled={isAddingToCart || !product.inStock}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 sm:py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base"
        >
          {isAddingToCart ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          ) : (
            <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
          {isAddingToCart ? 'Adding...' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 font-display">
              Featured Products
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Handpicked products from our top-rated vendors
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center px-4 lg:px-6 py-2 lg:py-3 text-yellow-600 border-2 border-yellow-600 rounded-lg font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300 text-sm lg:text-base"
          >
            View All Products
          </Link>
        </div>

        {/* Products Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center mt-6 sm:mt-8 lg:mt-12 sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 text-yellow-600 border-2 border-yellow-600 rounded-lg font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
