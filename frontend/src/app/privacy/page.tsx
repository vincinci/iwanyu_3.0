import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, UserCheck } from 'lucide-react';

export default function PrivacyPage() {
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
              <Shield className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              At Iwanyu, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
              multivendor ecommerce platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Eye className="h-6 w-6 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Name, email address, and phone number</li>
                  <li>• Shipping and billing addresses</li>
                  <li>• Payment information (processed securely by our payment partners)</li>
                  <li>• Account credentials and preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Information</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Browser type and version</li>
                  <li>• Device information and IP address</li>
                  <li>• Pages visited and time spent on our platform</li>
                  <li>• Search queries and product interactions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <UserCheck className="h-6 w-6 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Service Provision</h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Process and fulfill orders</li>
                  <li>• Manage your account</li>
                  <li>• Provide customer support</li>
                  <li>• Send order confirmations</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Platform Improvement</h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Analyze usage patterns</li>
                  <li>• Improve our services</li>
                  <li>• Prevent fraud and abuse</li>
                  <li>• Enhance security measures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only:
              </p>
              <ul className="mt-4 text-gray-700 space-y-2">
                <li>• With vendors to fulfill your orders</li>
                <li>• With payment processors for transaction processing</li>
                <li>• With service providers who assist in our operations</li>
                <li>• When required by law or to protect our rights</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="h-6 w-6 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">SSL Encryption</h3>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Secure Storage</h3>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Access Controls</h3>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="text-gray-700 space-y-2">
                <li>• Access your personal information</li>
                <li>• Update or correct your data</li>
                <li>• Delete your account and data</li>
              </ul>
              <ul className="text-gray-700 space-y-2">
                <li>• Opt out of marketing communications</li>
                <li>• Request data portability</li>
                <li>• Lodge a complaint with authorities</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> privacy@iwanyu.rw</p>
              <p><strong>Phone:</strong> +250 XXX XXX XXX</p>
              <p><strong>Address:</strong> Kigali, Rwanda</p>
            </div>
            <div className="mt-6">
              <Link 
                href="/contact" 
                className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
