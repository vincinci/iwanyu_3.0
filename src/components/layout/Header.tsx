"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShoppingCartIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Vendors", href: "/vendors" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      {/* Top bar - Hidden on mobile for better space usage */}
      <div className="bg-yellow-500 text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center space-x-4">
              <span>📞 +250 788 123 456</span>
              <span>✉️ support@iwanyu.rw</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/vendor/register" className="hover:text-yellow-200 transition-colors">
                Become a Vendor
              </Link>
              <span>|</span>
              <Link href="/help" className="hover:text-yellow-200 transition-colors">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo - Mobile Optimized */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">I</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 font-display">
                iwanyu
              </span>
            </Link>
          </div>

          {/* Search bar - Hidden on mobile, show in mobile menu */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, vendors, categories..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-yellow-500" aria-label="Search">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right side icons - Mobile Optimized */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search icon for mobile */}
            <button className="p-2 text-gray-600 hover:text-yellow-500 lg:hidden" aria-label="Search">
              <MagnifyingGlassIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Wishlist - Hidden on very small screens */}
            <Link href="/wishlist" className="hidden sm:block p-2 text-gray-600 hover:text-yellow-500 relative">
              <HeartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs">
                3
              </span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="p-2 text-gray-600 hover:text-yellow-500 relative">
              <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                2
              </span>
            </Link>

            {/* User account - Hidden on mobile, show in mobile menu */}
            <div className="relative group hidden sm:block">
              <Link href="/auth/login" className="p-2 text-gray-600 hover:text-yellow-500">
                <UserIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              {/* Dropdown menu for user account */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link href="/auth/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign In
                  </Link>
                  <Link href="/auth/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Register
                  </Link>
                  <div className="border-t border-gray-100"></div>
                  <Link href="/vendor/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Vendor Dashboard
                  </Link>
                  <Link href="/vendor/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Become a Vendor
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-yellow-500"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex border-t border-gray-200">
          <div className="flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="py-4 text-sm font-medium text-gray-700 hover:text-yellow-600 border-b-2 border-transparent hover:border-yellow-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400" aria-label="Search">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile navigation */}
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-base font-medium text-gray-700 hover:text-yellow-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/vendor/register"
                className="block py-2 text-base font-medium text-yellow-600 hover:text-yellow-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Become a Vendor
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
