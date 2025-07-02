'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FlutterwavePayment } from '@/components/ui/FlutterwavePayment';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { formatRWFSimple } from '@/lib/currency';

// Sample cart data with RWF prices
const initialCartItems = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199990, // 199,990 RWF
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    vendor: 'TechSound',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    price: 29990, // 29,990 RWF
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    vendor: 'EcoWear',
    quantity: 2,
  },
  {
    id: 3,
    name: 'Smart Home Speaker',
    price: 149990, // 149,990 RWF
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    vendor: 'SmartTech',
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [showPayment, setShowPayment] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    email: 'customer@example.com',
    phone: '+250788123456',
    name: 'John Doe'
  });

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handlePaymentSuccess = (response: any) => {
    console.log('Payment successful:', response);
    // Handle successful payment
    // - Clear cart
    // - Redirect to success page
    // - Send confirmation email
    alert('Payment successful! Order confirmed.');
    setCartItems([]);
    setShowPayment(false);
  };

  const handlePaymentClose = () => {
    setShowPayment(false);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100000 ? 0 : 9990; // Free shipping over 100,000 RWF
  const tax = subtotal * 0.18; // 18% VAT in Rwanda
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-md mx-auto">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center shadow-lg">
              <ShoppingBag className="h-16 w-16 text-yellow-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Ready to start shopping? Explore our amazing products and find something you love!
            </p>
            <div className="space-y-4">
              <Link href="/products">
                <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Start Shopping
                </Button>
              </Link>
              <div className="text-sm text-gray-500">
                Free shipping on orders over $100
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/products" className="inline-flex items-center text-gray-600 hover:text-yellow-600 mb-4 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-2">{cartItems.length} items in your cart</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <ShoppingBag className="w-6 h-6 mr-3 text-yellow-600" />
                  Cart Items ({cartItems.length})
                </h2>
                
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-6 py-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded-xl px-4 transition-colors">
                      <div className="w-24 h-24 relative rounded-xl overflow-hidden shadow-md">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-yellow-600 font-medium bg-yellow-100 px-2 py-1 rounded-full inline-block mb-2">
                          by {item.vendor}
                        </p>
                        <p className="text-xl font-bold text-gray-900">{formatRWFSimple(item.price)}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3 bg-gray-100 rounded-xl p-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                          title="Decrease quantity"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-center min-w-[60px] font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                          title="Increase quantity"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900 mb-3">
                          {formatRWFSimple(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all"
                          title="Remove item"
                          aria-label="Remove item from cart"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-lg">{formatRWFSimple(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-lg">
                    {shipping === 0 ? (
                      <span className="text-green-600 font-bold">Free!</span>
                    ) : (
                      formatRWFSimple(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">VAT (18%)</span>
                  <span className="font-semibold text-lg">{formatRWFSimple(tax)}</span>
                </div>
                {subtotal < 100000 && (
                  <div className="text-sm text-yellow-700 bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
                    <div className="font-semibold">🚚 Almost there!</div>
                    Add {formatRWFSimple(100000 - subtotal)} more for free shipping!
                  </div>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between text-xl font-bold pt-2">
                  <span>Total</span>
                  <span className="text-yellow-600">{formatRWFSimple(total)}</span>
                </div>
              </div>

              <Button
                onClick={() => setShowPayment(true)}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Proceed to Checkout
              </Button>

              {/* Flutterwave Payment Component */}
              {showPayment && (
                <div className="mt-6 p-6 border border-yellow-200 rounded-xl bg-yellow-50">
                  <h3 className="text-lg font-semibold mb-4 text-center">Complete Your Payment</h3>
                  <FlutterwavePayment
                    amount={total}
                    customerEmail={customerInfo.email}
                    customerPhone={customerInfo.phone}
                    customerName={customerInfo.name}
                    orderId={`order_${Date.now()}`}
                    onSuccess={handlePaymentSuccess}
                    onClose={handlePaymentClose}
                  />
                  <Button
                    onClick={() => setShowPayment(false)}
                    variant="outline"
                    className="w-full mt-4"
                  >
                    Cancel Payment
                  </Button>
                </div>
              )}

              <div className="mt-6 text-center">
                <Link
                  href="/products"
                  className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                >
                  Continue Shopping →
                </Link>
              </div>

              {/* Enhanced Security Features */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3 flex-shrink-0" />
                    <span className="font-medium">Secure SSL encryption</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3 flex-shrink-0" />
                    <span className="font-medium">30-day return guarantee</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3 flex-shrink-0" />
                    <span className="font-medium">24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
