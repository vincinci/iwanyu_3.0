'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/lib/cart';
import Link from 'next/link';

export default function TestPage() {
  const { user, userRole, isVendor, isAdmin } = useAuth();
  const { items, getCartCount, addToCart } = useCart();

  const testAddToCart = () => {
    addToCart('test-product-1', 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🧪 Iwanyu Platform Test Page
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Authentication Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🔐 Authentication Status
            </h2>
            
            {user ? (
              <div className="space-y-2">
                <p className="text-green-600 font-medium">✅ User signed in</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {userRole}</p>
                <p><strong>Is Vendor:</strong> {isVendor ? '✅ Yes' : '❌ No'}</p>
                <p><strong>Is Admin:</strong> {isAdmin ? '✅ Yes' : '❌ No'}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-orange-600 font-medium">⚠️ No user signed in</p>
                <Link 
                  href="/auth/login" 
                  className="inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Test Sign In
                </Link>
              </div>
            )}
          </div>

          {/* Cart Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🛒 Cart Status
            </h2>
            
            <div className="space-y-2 mb-4">
              <p><strong>Items in cart:</strong> {getCartCount()}</p>
              <p><strong>Cart items:</strong></p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {items.map((item, index) => (
                  <li key={index}>
                    {item.product?.name || 'Unknown Product'} (Qty: {item.quantity})
                  </li>
                ))}
                {items.length === 0 && <li>No items in cart</li>}
              </ul>
            </div>
            
            <button 
              onClick={testAddToCart}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Test Add to Cart
            </button>
          </div>

          {/* Vendor Dashboard Access */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🏪 Vendor Dashboard Access
            </h2>
            
            {isVendor ? (
              <div className="space-y-2">
                <p className="text-green-600 font-medium">✅ Vendor access granted</p>
                <Link 
                  href="/vendor/dashboard" 
                  className="inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Go to Vendor Dashboard
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-orange-600 font-medium">⚠️ Vendor access restricted</p>
                <p className="text-sm text-gray-600">
                  {user ? 'Current user is not a vendor' : 'Please sign in as a vendor'}
                </p>
                <p className="text-xs text-gray-500">
                  💡 Tip: Use email containing 'vendor' to test vendor access
                </p>
              </div>
            )}
          </div>

          {/* Navigation Test */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🧭 Navigation Test
            </h2>
            
            <div className="space-y-2">
              <Link href="/" className="block text-blue-600 hover:underline">
                🏠 Home Page
              </Link>
              <Link href="/products" className="block text-blue-600 hover:underline">
                📦 Products Page
              </Link>
              <Link href="/cart" className="block text-blue-600 hover:underline">
                🛒 Cart Page
              </Link>
              <Link href="/auth/login" className="block text-blue-600 hover:underline">
                🔑 Login Page
              </Link>
              <Link href="/auth/register" className="block text-blue-600 hover:underline">
                📝 Register Page
              </Link>
              {isVendor && (
                <Link href="/vendor/dashboard" className="block text-yellow-600 hover:underline">
                  🏪 Vendor Dashboard (Vendor Only)
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Test Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            🧪 How to Test Everything
          </h3>
          
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>
              <strong>Test Cart:</strong> Click "Test Add to Cart" above, then check cart page
            </li>
            <li>
              <strong>Test Authentication:</strong> Go to login page, use any email/password
            </li>
            <li>
              <strong>Test Vendor Access:</strong> Login with email containing "vendor" (e.g., vendor@test.com)
            </li>
            <li>
              <strong>Test Customer Access:</strong> Login with regular email (e.g., user@test.com)
            </li>
            <li>
              <strong>Test Header Menu:</strong> Check if user dropdown shows role-based options
            </li>
            <li>
              <strong>Test Mobile:</strong> Resize browser to mobile and test mobile menu
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
