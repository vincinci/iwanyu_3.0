'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FlutterwavePayment } from '@/components/ui/FlutterwavePayment';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { formatRWFSimple } from '@/lib/currency';
import { useCart } from '@/lib/cart';

export default function CartPage() {
  const { items: cartItems, loading, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [customerInfo] = useState({
    email: 'customer@example.com',
    phone: '+250788123456',
    name: 'John Doe'
  });

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(itemId);
      return;
    }
    await updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId: string) => {
    await removeFromCart(itemId);
  };

  const handlePaymentSuccess = (response: unknown) => {
    console.log('Payment successful:', response);
    alert('Payment successful! Order confirmed.');
    clearCart();
    setShowPayment(false);
  };

  const handlePaymentClose = () => {
    setShowPayment(false);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 100000 ? 0 : 9990;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-3 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-500 border-t-transparent mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-3 py-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-brand-charcoal-600" />
            </div>
            <h2 className="text-xl font-semibold text-brand-charcoal-700 mb-2">Your cart is empty</h2>
            <p className="text-sm text-brand-charcoal-600 mb-6">
              Ready to start shopping? Explore our products.
            </p>
            <Link href="/products">
              <Button variant="secondary" size="lg">
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
          <h1 className="text-lg font-semibold text-brand-charcoal-700 flex items-center">
            <Link href="/products" className="mr-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            Shopping Cart
          </h1>
          <span className="text-sm text-brand-yellow-600 font-medium">{cartItems.length} items</span>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4">
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = item.product;
                  const productImage = product?.images?.[0] || '/placeholder-product.svg';
                  const vendorName = product?.vendor?.businessName || 'Unknown Vendor';
                  const productPrice = product?.price || 0;
                  
                  return (
                    <div key={item.id} className="flex items-center space-x-3 py-3 border-b border-gray-100 last:border-b-0">
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                        <Image
                          src={productImage}
                          alt={product?.name || 'Product'}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{product?.name}</h3>
                        <p className="text-xs text-gray-500">by {vendorName}</p>
                        <p className="text-sm font-semibold text-gray-900">{formatRWFSimple(productPrice)}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-md hover:bg-gray-100"
                          title="Decrease quantity"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 py-1 bg-gray-100 rounded text-sm min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-md hover:bg-gray-100"
                          title="Increase quantity"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {formatRWFSimple(productPrice * item.quantity)}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-md"
                          title="Remove item"
                          aria-label="Remove item from cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
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
                <div className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 p-2 rounded text-center">
                  Add {formatRWFSimple(100000 - subtotal)} more for free shipping
                </div>
              )}
              <hr className="border-gray-200" />
              <div className="flex justify-between text-base font-semibold pt-2">
                <span>Total</span>
                <span className="text-yellow-600">{formatRWFSimple(total)}</span>
              </div>
            </div>

            <Button
              onClick={() => setShowPayment(true)}
              variant="primary"
              className="w-full py-2 text-sm font-medium rounded-md"
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
