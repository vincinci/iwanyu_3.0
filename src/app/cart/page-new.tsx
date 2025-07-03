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
    price: 199990,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    vendor: 'TechSound',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    price: 29990,
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    vendor: 'EcoWear',
    quantity: 2,
  },
  {
    id: 3,
    name: 'Smart Home Speaker',
    price: 149990,
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
    alert('Payment successful! Order confirmed.');
    setCartItems([]);
    setShowPayment(false);
  };

  const handlePaymentClose = () => {
    setShowPayment(false);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100000 ? 0 : 9990;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-3 py-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-sm text-gray-600 mb-6">
              Ready to start shopping? Explore our products.
            </p>
            <Link href="/products">
              <Button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 text-sm font-medium rounded-md">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-3 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-gray-900 flex items-center">
            <Link href="/products" className="mr-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            Shopping Cart
          </h1>
          <span className="text-sm text-gray-600">{cartItems.length} items</span>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 py-3 border-b border-gray-100 last:border-b-0">
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-xs text-gray-500">by {item.vendor}</p>
                      <p className="text-sm font-semibold text-gray-900">{formatRWFSimple(item.price)}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        {formatRWFSimple(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatRWFSimple(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600 font-semibold">Free!</span>
                  ) : (
                    formatRWFSimple(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">VAT (18%)</span>
                <span className="font-medium">{formatRWFSimple(tax)}</span>
              </div>
              {subtotal < 100000 && (
                <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded text-center">
                  Add {formatRWFSimple(100000 - subtotal)} more for free shipping
                </div>
              )}
              <hr className="border-gray-200" />
              <div className="flex justify-between text-base font-semibold pt-2">
                <span>Total</span>
                <span className="text-gray-900">{formatRWFSimple(total)}</span>
              </div>
            </div>

            <Button
              onClick={() => setShowPayment(true)}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 text-sm font-medium rounded-md"
            >
              Proceed to Checkout
            </Button>

            {showPayment && (
              <div className="mt-4 p-3 border border-gray-200 rounded-md bg-gray-50">
                <h3 className="text-sm font-medium mb-3 text-center">Complete Payment</h3>
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
                  size="sm"
                  className="w-full mt-2"
                >
                  Cancel
                </Button>
              </div>
            )}

            <div className="mt-4 text-center">
              <Link
                href="/products"
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                Continue Shopping →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
