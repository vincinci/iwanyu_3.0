"use client";

import { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setEmail("");
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 lg:p-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <EnvelopeIcon className="h-8 w-8 text-white" />
            </div>

            {/* Header */}
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-display">
              Stay in the Loop
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new products, 
              exclusive deals, and special offers from our vendor community.
            </p>

            {/* Newsletter Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-6 py-4 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed btn-hover"
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="bg-white/20 rounded-lg p-6">
                  <div className="text-white text-lg font-semibold mb-2">
                    🎉 Thank you for subscribing!
                  </div>
                  <p className="text-primary-100">
                    You&apos;ll receive our latest updates and exclusive offers soon.
                  </p>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-white">
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="font-semibold mb-1">Exclusive Deals</h3>
                <p className="text-sm text-primary-100">
                  Get access to subscriber-only discounts and early bird offers
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🚀</div>
                <h3 className="font-semibold mb-1">New Arrivals</h3>
                <p className="text-sm text-primary-100">
                  Be the first to discover new products from our vendors
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📈</div>
                <h3 className="font-semibold mb-1">Vendor Spotlights</h3>
                <p className="text-sm text-primary-100">
                  Learn about featured vendors and their success stories
                </p>
              </div>
            </div>

            {/* Privacy Note */}
            <p className="text-sm text-primary-200 mt-8">
              We respect your privacy. Unsubscribe at any time.{" "}
              <a href="/privacy" className="underline hover:text-white transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
