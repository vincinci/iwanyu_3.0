'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { clientDb } from '@/lib/database';

// Vendor type from database
interface Vendor {
  id: string;
  userId: string;
  businessName: string;
  description: string | null;
  logo: string | null;
  banner: string | null;
  status: string;
  commission: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string | null;
    email: string;
    image: string | null;
  };
}

function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Vendor Banner */}
      <div className="relative h-32 sm:h-40 overflow-hidden">
        <Image
          src={vendor.banner || '/placeholder-product.svg'}
          alt={`${vendor.businessName} banner`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <CheckBadgeIcon className="h-6 w-6 text-yellow-500 bg-white rounded-full p-1" />
        </div>
      </div>

      {/* Vendor Logo Overlap */}
      <div className="relative px-4 sm:px-6">
        <div className="relative -mt-8 w-16 h-16 rounded-xl overflow-hidden ring-4 ring-white shadow-lg">
          <Image
            src={vendor.logo || vendor.user?.image || '/placeholder-product.svg'}
            alt={`${vendor.businessName} logo`}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Vendor Info */}
      <div className="p-4 sm:p-6 pt-2">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
            {vendor.businessName}
          </h3>
          <CheckBadgeIcon className="h-5 w-5 text-yellow-500" />
        </div>

        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {vendor.description || 'Professional vendor offering quality products'}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < 4 ? (
                  <StarSolidIcon className="h-4 w-4 text-yellow-400" />
                ) : (
                  <StarIcon className="h-4 w-4 text-gray-300" />
                )}
              </span>
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">
            4.5
          </span>
          <span className="text-sm text-gray-500">
            (120)
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">50+</div>
            <div className="text-xs text-gray-500">Products</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-lg font-bold text-yellow-700">{new Date(vendor.createdAt).getFullYear()}</div>
            <div className="text-xs text-yellow-600">Since</div>
          </div>
        </div>

        {/* Visit Store Button */}
        <Link
          href={`/vendors/${vendor.id}`}
          className="block w-full text-center px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
        >
          Visit Store
        </Link>
      </div>
    </div>
  );
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVendors() {
      try {
        const result = await clientDb.getVendors(1, 20); // Get first 20 vendors
        if (result.error) {
          throw new Error(result.error.message);
        }
        setVendors(result.data || []);
      } catch (err) {
        console.error('Failed to fetch vendors:', err);
        setError('Failed to load vendors');
      } finally {
        setLoading(false);
      }
    }

    fetchVendors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-500 border-t-transparent mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading vendors...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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

        {/* All Vendors */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 font-display">
            All Vendors ({vendors.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 sm:p-8 lg:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-display">
            Want to Join Our Vendor Network?
          </h2>
          <p className="text-lg sm:text-xl text-yellow-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Start selling your products to customers across Rwanda and beyond!
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
