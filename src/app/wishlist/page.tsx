'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon, TrashIcon, ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { formatRWFSimple } from '@/lib/currency';

// Sample wishlist data
const initialWishlistItems = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199990,
    originalPrice: 249990,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    vendor: 'TechVendor Pro',
    href: '/products/premium-wireless-headphones',
    inStock: true,
    dateAdded: '2024-12-15',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 299990,
    originalPrice: 399990,
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    vendor: 'WearableTech',
    href: '/products/smart-fitness-watch',
    inStock: true,
    dateAdded: '2024-12-10',
  },
  {
    id: 3,
    name: 'Organic Skincare Set',
    price: 89990,
    originalPrice: 129990,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    vendor: 'NaturalBeauty',
    href: '/products/organic-skincare-set',
    inStock: false,
    dateAdded: '2024-12-05',
  },
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (item: any) => {
    // Here you would typically add to cart
    console.log('Adding to cart:', item);
    // Show success message or redirect
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center shadow-lg">
              <HeartIcon className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Start adding products you love to your wishlist to save them for later!
            </p>
            <div className="space-y-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-bold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                Start Shopping
              </Link>
              <div className="text-sm text-gray-500">
                Save your favorite items for easy access
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">{wishlistItems.length} items saved</p>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center px-4 py-2 text-yellow-600 border-2 border-yellow-600 rounded-lg font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Stock Status */}
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Discount Badge */}
                {item.originalPrice > item.price && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 text-xs font-bold text-white bg-yellow-500 rounded-full">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                )}

                {/* Remove from Wishlist */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors group/remove"
                  title="Remove from wishlist"
                >
                  <HeartSolidIcon className="h-4 w-4 text-red-500 group-hover/remove:text-red-600" />
                </button>

                {/* Quick View */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-yellow-50 transition-colors text-sm"
                  >
                    <EyeIcon className="h-4 w-4" />
                    Quick View
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Vendor */}
                <p className="text-xs text-yellow-600 mb-1 font-medium">{item.vendor}</p>
                
                {/* Product Name */}
                <Link href={item.href}>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 hover:text-yellow-600 transition-colors line-clamp-2 leading-tight">
                    {item.name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-lg font-bold text-gray-900">
                    {formatRWFSimple(item.price)}
                  </span>
                  {item.originalPrice > item.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatRWFSimple(item.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Date Added */}
                <p className="text-xs text-gray-500 mb-3">
                  Added {new Date(item.dateAdded).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm"
                  >
                    <ShoppingCartIcon className="h-4 w-4" />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 text-sm"
                  >
                    <TrashIcon className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Continue Shopping */}
        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 text-yellow-600 border-2 border-yellow-600 rounded-lg font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Recommendations */}
        <div className="mt-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 sm:p-8 text-center text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            You Might Also Like
          </h2>
          <p className="text-yellow-100 mb-6">
            Discover more products similar to your wishlist items
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-white text-yellow-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
