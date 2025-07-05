"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-40 overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-3 w-full">
          <div className="text-center">
            <h1 className="text-lg font-bold text-white mb-2">
              Welcome to Iwanyu
            </h1>
            <p className="text-sm text-gray-300 mb-4">
              Your trusted marketplace for quality products
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
