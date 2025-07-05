"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShoppingCartIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/lib/cart";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isVendor, isAdmin, signOut, loading } = useAuth();
  const { getCartCount } = useCart();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Vendors", href: "/vendors" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex items-center justify-between h-12">
          {/* Logo - Mobile Optimized */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-1.5">
              <div className="w-7 h-7 bg-brand-yellow-500 rounded-md flex items-center justify-center">
                <span className="text-brand-charcoal-700 font-bold text-sm">I</span>
              </div>
              <span className="text-lg font-bold text-brand-charcoal-700">
                iwanyu
              </span>
            </Link>
          </div>

          {/* Search bar - Hidden on mobile, show in mobile menu */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-brand-yellow-500 focus:border-brand-yellow-500 text-brand-charcoal-700"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-brand-yellow-600" aria-label="Search">
                <MagnifyingGlassIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right side icons - Mobile Optimized */}
          <div className="flex items-center space-x-1">
            {/* Search icon for mobile */}
            <button className="p-2 text-brand-charcoal-600 hover:text-brand-charcoal-700 lg:hidden" aria-label="Search">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            {/* Cart */}
            <Link href="/cart" className="p-2 text-brand-charcoal-600 hover:text-brand-charcoal-700 relative">
              <ShoppingCartIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-yellow-500 text-brand-charcoal-700 text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User account */}
            {loading ? (
              <div className="p-2">
                <div className="w-5 h-5 animate-pulse bg-gray-300 rounded-full"></div>
              </div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-1 p-2 text-brand-charcoal-600 hover:text-brand-charcoal-700"
                  title="User menu"
                  aria-label="Open user menu"
                >
                  <UserIcon className="h-5 w-5" />
                  <ChevronDownIcon className="h-3 w-3" />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="p-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-brand-charcoal-700 truncate">{user.email}</p>
                      <p className="text-xs text-brand-charcoal-500">
                        {isAdmin ? 'Admin' : isVendor ? 'Vendor' : 'Customer'}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="block px-3 py-2 text-sm text-brand-charcoal-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-3 py-2 text-sm text-brand-charcoal-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Orders
                      </Link>
                      <Link
                        href="/wishlist"
                        className="block px-3 py-2 text-sm text-brand-charcoal-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Wishlist
                      </Link>
                      {isVendor && (
                        <>
                          <hr className="my-1" />
                          <Link
                            href="/vendor/dashboard"
                            className="block px-3 py-2 text-sm text-brand-green-600 hover:bg-brand-green-50 font-medium"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Vendor Dashboard
                          </Link>
                        </>
                      )}
                      {isAdmin && (
                        <>
                          <hr className="my-1" />
                          <Link
                            href="/admin/dashboard"
                            className="block px-3 py-2 text-sm text-brand-blue-600 hover:bg-brand-blue-50 font-medium"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Admin Dashboard
                          </Link>
                        </>
                      )}
                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          signOut();
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="p-2 text-brand-charcoal-600 hover:text-brand-charcoal-700">
                <UserIcon className="h-5 w-5" />
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-brand-charcoal-600 hover:text-brand-charcoal-700"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex border-t border-gray-200">
          <div className="flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="py-2 text-sm font-medium text-brand-charcoal-600 hover:text-brand-charcoal-700 border-b-2 border-transparent hover:border-brand-yellow-500 transition-colors"
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
          {/* Mobile search */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-brand-yellow-500 focus:border-brand-yellow-500 text-brand-charcoal-700"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-brand-yellow-600" aria-label="Search">
                <MagnifyingGlassIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          <div className="py-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-brand-charcoal-700 hover:text-brand-charcoal-800 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile user menu */}
          <div className="border-t border-gray-200 py-2">
            {user ? (
              <>
                <div className="px-3 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-brand-charcoal-700 truncate">{user.email}</p>
                  <p className="text-xs text-brand-charcoal-500">
                    {isAdmin ? 'Admin' : isVendor ? 'Vendor' : 'Customer'}
                  </p>
                </div>
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-sm font-medium text-brand-charcoal-700 hover:text-brand-charcoal-800 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/orders"
                  className="block px-3 py-2 text-sm font-medium text-brand-charcoal-700 hover:text-brand-charcoal-800 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  href="/wishlist"
                  className="block px-3 py-2 text-sm font-medium text-brand-charcoal-700 hover:text-brand-charcoal-800 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Wishlist
                </Link>
                {isVendor && (
                  <Link
                    href="/vendor/dashboard"
                    className="block px-3 py-2 text-sm font-medium text-brand-green-600 hover:text-brand-green-700 hover:bg-brand-green-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Vendor Dashboard
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className="block px-3 py-2 text-sm font-medium text-brand-blue-600 hover:text-brand-blue-700 hover:bg-brand-blue-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 text-sm font-medium text-brand-charcoal-700 hover:text-brand-charcoal-800 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-3 py-2 text-sm font-medium text-brand-charcoal-700 hover:text-brand-charcoal-800 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
                <Link
                  href="/vendor/register"
                  className="block px-3 py-2 text-sm font-medium text-brand-yellow-600 hover:text-brand-yellow-700 hover:bg-brand-yellow-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Become a Vendor
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
