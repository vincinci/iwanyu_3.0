"use client";

import Link from "next/link";
import Image from "next/image";
import { StarIcon, HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from 'react';
import { formatRWFSimple } from '@/lib/currency';
import { useCart } from '@/lib/cart';
import { clientDb } from '@/lib/database';

// Product type from database
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  comparePrice: number | null;
  images: string[];
  inventory: number;
  vendorId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  vendor?: {
    businessName: string;
  };
}

function ProductCard({ product }: { product: Product }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();
  
  // Calculate discount if comparePrice exists
  const discountPercentage = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(product.id, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const productImage = product.images?.[0] || '/placeholder-product.svg';
  const vendorName = product.vendor?.businessName || 'Unknown Vendor';
  const inStock = product.inventory > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden border border-gray-100">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={productImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-1.5 left-1.5">
            <span className="px-1.5 py-0.5 text-xs font-medium text-white bg-red-500 rounded shadow-sm">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          className="absolute top-1.5 right-1.5 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          title="Add to wishlist"
          aria-label="Add to wishlist"
        >
          <HeartIcon className="h-3 w-3 text-gray-600 hover:text-gray-800" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-2.5">
        {/* Vendor */}
        <p className="text-xs text-gray-500 mb-1 font-medium">{vendorName}</p>
        
        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 mb-1.5 hover:text-gray-700 transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < 4 ? (
                  <StarSolidIcon className="h-2.5 w-2.5 text-yellow-400" />
                ) : (
                  <StarIcon className="h-2.5 w-2.5 text-gray-300" />
                )}
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">4.0</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-semibold text-gray-900">
              {formatRWFSimple(product.price)}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatRWFSimple(product.comparePrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={isAddingToCart || !inStock}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-yellow-500 text-white rounded-md font-medium hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          {isAddingToCart ? (
            <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></div>
          ) : (
            <ShoppingCartIcon className="h-3.5 w-3.5" />
          )}
          {isAddingToCart ? 'Adding...' : inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        setLoading(true);
        const { data, error } = await clientDb.getFeaturedProducts(6);
        
        if (error) {
          throw new Error(error.message);
        }
        
        setProducts(data || []);
      } catch (err) {
        console.error('Failed to fetch featured products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-3">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-400 border-t-transparent mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-3">
          <div className="text-center">
            <p className="text-sm text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-3 py-1.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Featured Products
            </h2>
            <p className="text-xs text-gray-600">
              {products.length > 0 
                ? `${products.length} products available`
                : "Handpicked products from our vendors"
              }
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs text-gray-600 hover:text-gray-900 font-medium"
          >
            View All →
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products available at the moment.</p>
            <p className="text-gray-500 text-sm mt-2">Check back soon for new products!</p>
          </div>
        )}

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
