import Image from 'next/image';
import Link from 'next/link';
import { Users, Target, Heart, Award } from 'lucide-react';

const stats = [
  { label: 'Active Vendors', value: '10,000+' },
  { label: 'Products Listed', value: '500K+' },
  { label: 'Happy Customers', value: '2M+' },
  { label: 'Countries Served', value: '25+' },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Former e-commerce executive with 15+ years of experience building marketplace platforms.',
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Technology leader passionate about creating scalable solutions for global commerce.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Vendor Relations',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Dedicated to helping vendors succeed and grow their businesses on our platform.',
  },
];

const values = [
  {
    icon: Users,
    title: 'Community First',
    description: 'We believe in building a strong community of vendors and customers who support each other.',
  },
  {
    icon: Target,
    title: 'Quality Focus',
    description: 'Every product and vendor on our platform is carefully vetted to ensure the highest quality.',
  },
  {
    icon: Heart,
    title: 'Customer Care',
    description: 'Our customers are at the heart of everything we do, driving our commitment to excellence.',
  },
  {
    icon: Award,
    title: 'Innovation',
    description: 'We continuously innovate to provide the best marketplace experience for everyone.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About Iwanyu
            </h1>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
              Connecting passionate vendors with customers worldwide through our innovative marketplace platform
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              At Iwanyu, we&apos;re on a mission to democratize e-commerce by providing small and medium businesses 
              with the tools and platform they need to reach customers globally. We believe that every entrepreneur 
              deserves the opportunity to showcase their products to the world.
            </p>
            <p className="text-lg text-gray-700">
              Founded in 2024, we&apos;ve grown from a simple idea into a thriving marketplace that connects 
              thousands of vendors with millions of customers across the globe.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Our mission"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Impact</h2>
            <p className="text-lg text-gray-600 mt-4">
              Numbers that showcase our growing community
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          <p className="text-lg text-gray-600 mt-4">
            The principles that guide everything we do
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4">
                <value.icon className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="text-lg text-gray-600 mt-4">
              The people behind Iwanyu&apos;s success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-yellow-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re a vendor looking to grow your business or a customer seeking unique products, 
              Iwanyu is the place for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/vendor/register"
                className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Become a Vendor
              </Link>
              <Link
                href="/products"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
