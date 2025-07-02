"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const heroSlides = [
  {
    id: 1,
    title: "Welcome to Iwanyu",
    subtitle: "Your Trusted Multivendor Marketplace",
    description: "Discover amazing products from verified vendors worldwide. Shop with confidence and enjoy fast, secure delivery.",
    buttonText: "Start Shopping",
    buttonLink: "/categories",
    backgroundImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: 2,
    title: "Become a Vendor",
    subtitle: "Grow Your Business with Us",
    description: "Join thousands of successful vendors on our platform. Reach more customers and boost your sales today.",
    buttonText: "Join as Vendor",
    buttonLink: "/vendor/register",
    backgroundImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2326&q=80",
  },
  {
    id: 3,
    title: "Special Deals",
    subtitle: "Up to 70% Off",
    description: "Don't miss our incredible deals on top-rated products. Limited time offers from your favorite vendors.",
    buttonText: "View Deals",
    buttonLink: "/deals",
    backgroundImage: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2315&q=80",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 font-display animate-fade-in">
                  {slide.title}
                </h1>
                <h2 className="text-xl lg:text-2xl text-primary-200 mb-6 animate-slide-up">
                  {slide.subtitle}
                </h2>
                <p className="text-lg text-gray-200 mb-8 leading-relaxed animate-slide-up">
                  {slide.description}
                </p>
                <Link
                  href={slide.buttonLink}
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-black bg-primary-500 rounded-lg hover:bg-primary-400 transition-all duration-300 btn-hover animate-scale-in"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary-500 scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Quick Stats */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="text-white">
              <div className="text-2xl lg:text-3xl font-bold text-primary-400">10K+</div>
              <div className="text-sm text-gray-300">Active Vendors</div>
            </div>
            <div className="text-white">
              <div className="text-2xl lg:text-3xl font-bold text-primary-400">500K+</div>
              <div className="text-sm text-gray-300">Products</div>
            </div>
            <div className="text-white">
              <div className="text-2xl lg:text-3xl font-bold text-primary-400">1M+</div>
              <div className="text-sm text-gray-300">Happy Customers</div>
            </div>
            <div className="text-white">
              <div className="text-2xl lg:text-3xl font-bold text-primary-400">99.9%</div>
              <div className="text-sm text-gray-300">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
