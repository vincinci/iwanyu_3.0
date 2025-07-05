"use client";

import { useState } from "react";

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
    <section className="py-4 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3">
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          {/* Header */}
          <h2 className="text-lg font-semibold text-white mb-2">
            Stay Updated
          </h2>
          <p className="text-sm text-gray-300 mb-4">
            Get the latest deals and new products
          </p>

          {/* Newsletter Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-3 py-2 text-sm rounded-md border-0 text-gray-900 placeholder-gray-500 focus:ring-1 focus:ring-yellow-400"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50 text-sm"
                >
                  {isSubmitting ? "..." : "Join"}
                </button>
              </div>
            </form>
          ) : (
            <div className="max-w-sm mx-auto">
              <div className="bg-white/10 rounded-md p-3">
                <div className="text-white text-sm font-medium mb-1">
                  ✓ Subscribed!
                </div>
                <p className="text-gray-300 text-xs">
                  You'll receive updates soon.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
