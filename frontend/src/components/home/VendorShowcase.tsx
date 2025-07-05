'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { clientDb } from '@/lib/api-client';

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
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Vendor Header */}
      <div className="relative bg-gray-50 p-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {/* Vendor Logo */}
          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
            <Image
              src={vendor.logo || vendor.user?.image || '/placeholder-product.svg'}
              alt={`${vendor.businessName} logo`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Vendor Info */}
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                {vendor.businessName}
              </h3>
              <CheckBadgeIcon className="h-4 w-4 text-blue-500" />
            </div>
            <div className="flex items-center">
              <StarIcon className="h-3 w-3 text-yellow-400" />
              <span className="text-xs font-medium text-gray-900 ml-1">
                4.5
              </span>
              <span className="text-xs text-gray-500 ml-1">
                (120)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Details */}
      <div className="p-3">
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {vendor.description || 'Professional vendor offering quality products'}
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-center p-2 bg-gray-50 rounded-md">
            <div className="text-sm font-semibold text-gray-900">50+</div>
            <div className="text-xs text-gray-600">Products</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-md">
            <div className="text-sm font-semibold text-gray-900">{new Date(vendor.createdAt).getFullYear()}</div>
            <div className="text-xs text-gray-600">Since</div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/vendors/${vendor.id}`}
          className="block w-full text-center px-3 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors text-sm"
        >
          Visit Store
        </Link>
      </div>
    </div>
  );
}

export function VendorShowcase() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendors() {
      try {
        const result = await clientDb.getVendors(1, 4); // Get first 4 vendors for showcase
        if (result.error) {
          console.error('Failed to fetch vendors:', result.error);
        } else {
          setVendors(result.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch vendors:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchVendors();
  }, []);

  if (loading) {
    return (
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-3">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-400 border-t-transparent mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading vendors...</p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-3">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Top Vendors
          </h2>
          <p className="text-xs text-gray-600">
            Trusted vendors with quality products
          </p>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-4">
          <Link
            href="/vendors"
            className="text-xs text-gray-600 hover:text-gray-900 font-medium"
          >
            View All Vendors →
          </Link>
        </div>
      </div>
    </section>
  );
}
