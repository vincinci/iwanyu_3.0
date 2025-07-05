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
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <HeartIcon className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal mb-3">Your wishlist is empty</h2>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              Start adding products you love to your wishlist to save them for later!
            </p>
            <div className="space-y-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-golden text-white rounded-lg font-medium hover:bg-brand-golden/90 transition-colors"
              >
                <ShoppingCartIcon className="h-4 w-4" />
                Start Shopping
              </Link>
              <div className="text-xs text-gray-500">
                Save your favorite items for easy access
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-charcoal mb-1">My Wishlist</h1>
            <p className="text-gray-600 text-sm">{wishlistItems.length} items saved</p>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center px-4 py-2 text-brand-golden border border-brand-golden rounded-lg font-medium hover:bg-brand-golden hover:text-white transition-colors text-sm"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-200">
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
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Discount Badge */}
                {item.originalPrice > item.price && (
                  <div className="absolute top-2 left-2">
                    <span className="px-1.5 py-0.5 text-xs font-medium text-white bg-brand-golden rounded">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                )}

                {/* Remove from Wishlist */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors group/remove"
                  title="Remove from wishlist"
                >
                  <HeartSolidIcon className="h-3 w-3 text-red-500 group-hover/remove:text-red-600" />
                </button>

                {/* Quick View */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors text-xs"
                  >
                    <EyeIcon className="h-3 w-3" />
                    Quick View
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3">
                {/* Vendor */}
                <p className="text-xs text-brand-golden mb-1 font-medium">{item.vendor}</p>
                
                {/* Product Name */}
                <Link href={item.href}>
                  <h3 className="text-sm font-semibold text-brand-charcoal mb-2 hover:text-brand-golden transition-colors line-clamp-2 leading-tight">
                    {item.name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-base font-bold text-brand-charcoal">
                    {formatRWFSimple(item.price)}
                  </span>
                  {item.originalPrice > item.price && (
                    <span className="text-xs text-gray-500 line-through">
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
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-brand-golden text-white rounded-lg font-medium hover:bg-brand-golden/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    <ShoppingCartIcon className="h-3 w-3" />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                  >
                    <TrashIcon className="h-3 w-3" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Continue Shopping */}
        <div className="text-center mt-6 sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 text-brand-golden border border-brand-golden rounded-lg font-medium hover:bg-brand-golden hover:text-white transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Recommendations */}
        <div className="mt-8 bg-gradient-to-r from-brand-golden to-brand-golden/90 rounded-lg p-4 sm:p-6 text-center text-white">
          <h2 className="text-lg sm:text-xl font-bold mb-2">
            You Might Also Like
          </h2>
          <p className="text-white/90 mb-4 text-sm">
            Discover more products similar to your wishlist items
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 bg-white text-brand-golden rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
