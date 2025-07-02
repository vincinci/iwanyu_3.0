import Link from 'next/link';
import { ArrowLeft, FileText, Users, ShoppingCart, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-yellow-600 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-gray-600 mt-1">Last updated: December 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                By accessing and using the Iwanyu platform, you agree to be bound by these Terms of Service and all applicable 
                laws and regulations. If you do not agree with any of these terms, you are prohibited from using this service.
              </p>
            </div>
          </section>

          {/* Platform Description */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <ShoppingCart className="h-6 w-6 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">Platform Description</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Iwanyu is a multivendor ecommerce platform that connects buyers with verified vendors across Rwanda. 
              We facilitate transactions but do not directly sell products.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">For Buyers</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Browse and purchase products</li>
                  <li>• Create and manage accounts</li>
                  <li>• Leave reviews and ratings</li>
                  <li>• Track orders and deliveries</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">For Vendors</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• List and sell products</li>
                  <li>• Manage inventory and orders</li>
                  <li>• Communicate with customers</li>
                  <li>• Access analytics and reports</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Accounts */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="h-6 w-6 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">User Accounts</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Creation</h3>
                <p className="text-gray-700 leading-relaxed">
                  You must provide accurate and complete information when creating an account. You are responsible for 
                  maintaining the security of your account credentials.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Prohibited Uses</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Using the platform for illegal activities</li>
                  <li>• Posting false or misleading information</li>
                  <li>• Attempting to compromise platform security</li>
                  <li>• Harassing other users or vendors</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Vendor Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vendor Terms</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Listings</h3>
                <p className="text-gray-700 leading-relaxed">
                  Vendors must provide accurate product descriptions, pricing, and availability. All products must comply 
                  with Rwandan laws and regulations.
                </p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Fulfillment</h3>
                <p className="text-gray-700 leading-relaxed">
                  Vendors are responsible for processing orders promptly, shipping products securely, and providing 
                  accurate tracking information.
                </p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Commission and Fees</h3>
                <p className="text-gray-700 leading-relaxed">
                  Platform commission rates vary by category (5-15%). Monthly subscription fees may apply. 
                  Payment processing fees are additional.
                </p>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Accepted Methods</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Mobile Money (MTN MoMo, Airtel Money)</li>
                    <li>• Bank cards (Visa, Mastercard)</li>
                    <li>• Bank transfers</li>
                    <li>• Cash on delivery (where available)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Payment Processing</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• All prices are in Rwandan Francs (RWF)</li>
                    <li>• Payments are processed securely</li>
                    <li>• Refunds processed within 7-14 days</li>
                    <li>• Vendor payments weekly</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Liability and Disclaimers */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">Liability and Disclaimers</h2>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Platform Limitations</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Iwanyu serves as a marketplace platform. We are not responsible for:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Product quality, accuracy of descriptions, or vendor reliability</li>
                <li>• Disputes between buyers and vendors</li>
                <li>• Delivery delays or shipping issues</li>
                <li>• Third-party payment processing errors</li>
              </ul>
            </div>
          </section>

          {/* Returns and Refunds */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns and Refunds</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Return Policy</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• 30-day return window for most items</li>
                  <li>• Items must be in original condition</li>
                  <li>• Return shipping may apply</li>
                  <li>• Some items non-returnable</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Refund Process</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Refunds to original payment method</li>
                  <li>• Processing time: 7-14 business days</li>
                  <li>• Vendor-specific policies may apply</li>
                  <li>• Platform mediation available</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to terminate or suspend accounts that violate these terms. Users may delete their 
              accounts at any time. Upon termination, certain provisions of these terms will survive.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Questions About Terms</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> legal@iwanyu.rw</p>
              <p><strong>Phone:</strong> +250 XXX XXX XXX</p>
              <p><strong>Address:</strong> Kigali, Rwanda</p>
            </div>
            <div className="mt-6 flex space-x-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Contact Support
              </Link>
              <Link 
                href="/privacy" 
                className="inline-flex items-center px-4 py-2 border border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
