import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-brand-golden transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-charcoal mt-4">Cookie Policy</h1>
          <p className="text-gray-600 mt-2 text-sm">
            Learn about how Iwanyu uses cookies to enhance your experience
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white">
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold text-brand-charcoal mb-4">What Are Cookies?</h2>
            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and 
              improving our services.
            </p>

            <h2 className="text-xl font-semibold text-brand-charcoal mb-4">How We Use Cookies</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-brand-charcoal mb-2">Essential Cookies</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  These cookies are necessary for the website to function properly. They enable basic 
                  features like page navigation, shopping cart functionality, and secure area access.
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium text-brand-charcoal mb-2">Performance Cookies</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  These cookies help us understand how visitors interact with our website by collecting 
                  and reporting information anonymously. This helps us improve our website performance.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Functionality Cookies</h3>
                <p className="text-gray-700">
                  These cookies remember your preferences and provide enhanced, personalized features. 
                  They may be set by us or by third party providers whose services we use.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Targeting Cookies</h3>
                <p className="text-gray-700">
                  These cookies are used to deliver advertisements relevant to you. They may be used to 
                  limit the number of times you see an advertisement and measure the effectiveness of 
                  advertising campaigns.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-6 mt-8">Managing Your Cookie Preferences</h2>
            <p className="text-gray-700 mb-4">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Browser settings: Most browsers allow you to view, manage, and delete cookies</li>
              <li>Third-party tools: Use privacy tools to block or manage cookies</li>
              <li>Opt-out links: Some cookies can be disabled through specific opt-out mechanisms</li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                <strong>Note:</strong> Disabling certain cookies may affect the functionality of our 
                website and your user experience.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Third-Party Cookies</h2>
            <p className="text-gray-700 mb-6">
              Some cookies are placed by third-party services that appear on our pages. We have no 
              control over these cookies, and you should check the relevant third party&apos;s website 
              for more information about these cookies.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Updates to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this Cookie Policy from time to time. When we do, we will post the updated 
              policy on this page and update the &quot;Last Updated&quot; date below.
            </p>

            <div className="border-t border-gray-200 pt-6 mt-8">
              <p className="text-sm text-gray-500">
                Last Updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Questions About Our Cookie Policy?</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about our use of cookies, please don&apos;t hesitate to contact us.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
