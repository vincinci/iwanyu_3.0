'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { 
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ShoppingBagIcon,
  HomeIcon,
  HeartIcon,
  BookOpenIcon,
  WrenchScrewdriverIcon,
  MusicalNoteIcon
} from "@heroicons/react/24/outline";
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

// Icon mapping for categories
const iconMapping: Record<string, any> = {
  electronics: DevicePhoneMobileIcon,
  computers: ComputerDesktopIcon,
  fashion: ShoppingBagIcon,
  'home-garden': HomeIcon,
  'health-beauty': HeartIcon,
  books: BookOpenIcon,
  tools: WrenchScrewdriverIcon,
  music: MusicalNoteIcon,
};

// Color mapping for categories
const colorMapping: Record<string, string> = {
  electronics: "bg-blue-500",
  computers: "bg-indigo-500", 
  fashion: "bg-pink-500",
  'home-garden': "bg-green-500",
  'health-beauty': "bg-red-500",
  books: "bg-amber-500",
  tools: "bg-gray-500",
  music: "bg-purple-500",
};

export function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const result = await clientDb.getCategories();
        if (result.error) {
          console.error('Failed to fetch categories:', result.error);
        } else {
          // Limit to first 8 categories for featured display
          setCategories(result.data?.slice(0, 8) || []);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-400 border-t-transparent mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-4 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Shop by Category
          </h2>
          <p className="text-xs text-gray-600">
            Browse products by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {categories.map((category) => {
            const IconComponent = iconMapping[category.slug] || ShoppingBagIcon;
            const color = colorMapping[category.slug] || "bg-gray-500";
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="text-center">
                  {/* Icon */}
                  <div className={`mx-auto w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-105 transition-transform duration-300`}>
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  
                  {/* Category Info */}
                  <h3 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Browse items
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Categories Link */}
        <div className="text-center mt-4">
          <Link
            href="/categories"
            className="text-xs text-yellow-600 hover:text-yellow-700 font-medium"
          >
            View All Categories →
          </Link>
        </div>
      </div>
    </section>
  );
}
