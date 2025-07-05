'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBagIcon, TagIcon } from '@heroicons/react/24/outline';
import { clientDb } from '@/lib/api-client';

// Category type from database
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  isActive: boolean;
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden border border-gray-200">
        {/* Category Image */}
        <div className="relative h-32 sm:h-40 overflow-hidden">
          <Image
            src={category.image || '/placeholder-product.svg'}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Category Info */}
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <TagIcon className="h-4 w-4 text-brand-golden" />
            <h3 className="text-base sm:text-lg font-semibold text-brand-charcoal group-hover:text-brand-golden transition-colors">
              {category.name}
            </h3>
          </div>
          
          <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-2">
            {category.description || 'Explore our collection in this category'}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ShoppingBagIcon className="h-3 w-3" />
              <span>Browse products</span>
            </div>
            <span className="text-brand-golden font-medium text-xs group-hover:underline">
              Browse →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const result = await clientDb.getCategories();
        if (result.error) {
          throw new Error(result.error.message);
        }
        setCategories(result.data || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-brand-golden border-t-transparent mx-auto"></div>
            <p className="mt-2 text-gray-600 text-sm">Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <p className="text-red-600 text-sm">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-brand-golden text-white rounded-lg hover:bg-brand-golden/80 text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-charcoal mb-2">
            Shop by Category
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Discover thousands of products across our diverse categories from trusted vendors.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-brand-golden to-brand-golden/90 rounded-lg p-4 sm:p-6 text-center text-white">
          <h2 className="text-lg sm:text-xl font-bold mb-2">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-sm text-white/90 mb-4 max-w-lg mx-auto">
            Our vendors are constantly adding new products. Contact us if you need something specific!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="px-4 sm:px-6 py-2 bg-white text-brand-golden rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
            >
              Contact Us
            </Link>
            <Link
              href="/vendor/register"
              className="px-4 sm:px-6 py-2 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-brand-golden transition-colors text-sm"
            >
              Become a Vendor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
