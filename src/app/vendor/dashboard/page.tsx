'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Plus,
  Edit,
  Eye,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Sample data
const stats = [
  { label: 'Total Sales', value: '$12,345', change: '+12%', icon: DollarSign },
  { label: 'Orders', value: '156', change: '+8%', icon: ShoppingCart },
  { label: 'Products', value: '23', change: '+2%', icon: Package },
  { label: 'Revenue Growth', value: '18%', change: '+5%', icon: TrendingUp },
];

const recentOrders = [
  { id: '#12345', customer: 'John Doe', product: 'Wireless Headphones', amount: '$299.99', status: 'Completed' },
  { id: '#12344', customer: 'Jane Smith', product: 'Smart Speaker', amount: '$149.99', status: 'Processing' },
  { id: '#12343', customer: 'Mike Johnson', product: 'Fitness Tracker', amount: '$199.99', status: 'Shipped' },
];

const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: '$299.99',
    stock: 25,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Smart Home Speaker',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: '$149.99',
    stock: 12,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Fitness Tracker',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: '$199.99',
    stock: 0,
    status: 'Out of Stock',
  },
];

export default function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, TechSound!</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'products', 'orders', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <stat.icon className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.customer} • {order.product}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{order.amount}</p>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Your Products</h2>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-12 h-12 relative rounded-lg overflow-hidden mr-4">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{product.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.stock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              className="text-yellow-600 hover:text-yellow-900"
                              title="View product"
                              aria-label="View product"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit product"
                              aria-label="Edit product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              title="Delete product"
                              aria-label="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
            
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-gray-600">Customer: {order.customer}</p>
                      <p className="text-gray-600">Product: {order.product}</p>
                      <p className="text-gray-600">Amount: {order.amount}</p>
                      <div className="mt-3 flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {order.status === 'Processing' && (
                          <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">
                            Mark as Shipped
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <BarChart3 className="h-16 w-16 text-gray-400" />
                  <p className="ml-4 text-gray-500">Chart will be displayed here</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
                <div className="space-y-3">
                  {products.slice(0, 3).map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-500 mr-3">#{index + 1}</span>
                        <p className="text-sm text-gray-900">{product.name}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
