/**
 * Client-side database operations
 * Use these in components and client-side code
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const clientDb = {
  // Get current user (placeholder - implement with your auth system)
  getCurrentUser: async () => {
    // TODO: Implement actual user authentication
    return null
  },

  // Get products with pagination
  getProducts: async (page = 1, limit = 12) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products?page=${page}&limit=${limit}`)
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const result = await response.json()
      return { data: result.data, error: null, count: result.count }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message }, count: 0 }
    }
  },

  // Get single product
  getProduct: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch product')
      }
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message } }
    }
  },

  // Add to cart
  addToCart: async (productId: string, quantity: number) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity })
      })
      if (!response.ok) {
        throw new Error('Failed to add to cart')
      }
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message } }
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`)
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message } }
    }
  },

  // Get single category
  getCategory: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch category')
      }
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message } }
    }
  },

  // Get vendors
  getVendors: async (page = 1, limit = 12) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vendors?page=${page}&limit=${limit}`)
      if (!response.ok) {
        throw new Error('Failed to fetch vendors')
      }
      const result = await response.json()
      return { data: result.data, error: null, count: result.count }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message }, count: 0 }
    }
  },

  // Get single vendor
  getVendor: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vendors/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch vendor')
      }
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message } }
    }
  },

  // Get featured products (latest or most popular)
  getFeaturedProducts: async (limit = 8) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/featured?limit=${limit}`)
      if (!response.ok) {
        throw new Error('Failed to fetch featured products')
      }
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message } }
    }
  },

  // Search products
  searchProducts: async (query: string, page = 1, limit = 12) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`)
      if (!response.ok) {
        throw new Error('Failed to search products')
      }
      const result = await response.json()
      return { data: result.data, error: null, count: result.count }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message }, count: 0 }
    }
  },

  // Get products by vendor
  getProductsByVendor: async (vendorId: string, page = 1, limit = 12) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vendors/${vendorId}/products?page=${page}&limit=${limit}`)
      if (!response.ok) {
        throw new Error('Failed to fetch vendor products')
      }
      const result = await response.json()
      return { data: result.data, error: null, count: result.count }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message }, count: 0 }
    }
  },

  // Get cart items
  getCartItems: async () => {
    try {
      const response = await fetch('/api/cart')
      if (!response.ok) {
        throw new Error('Failed to fetch cart items')
      }
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message } }
    }
  },

  // Remove from cart
  removeFromCart: async (itemId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/${itemId}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Failed to remove from cart')
      }
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message } }
    }
  },

  // Update cart item quantity
  updateCartItem: async (itemId: string, quantity: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      })
      if (!response.ok) {
        throw new Error('Failed to update cart item')
      }
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message } }
    }
  },

  // Auth functions (placeholders)
  signUp: async (email: string, password: string) => {
    // TODO: Implement signup
    console.log('Signup called with:', email, password);
    return { data: null, error: { message: 'Auth not implemented yet' } }
  },

  signIn: async (email: string, password: string) => {
    // TODO: Implement signin
    console.log('Signin called with:', email, password);
    return { data: null, error: { message: 'Auth not implemented yet' } }
  },

  signOut: async () => {
    // TODO: Implement signout
    return { error: null }
  },

  // Create vendor
  createVendor: async (vendorData: Record<string, unknown>) => {
    try {
      const response = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vendorData)
      })
      if (!response.ok) {
        throw new Error('Failed to create vendor')
      }
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message } }
    }
  },

  // Create product
  createProduct: async (productData: Record<string, unknown>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })
      if (!response.ok) {
        throw new Error('Failed to create product')
      }
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message } }
    }
  },

  // Create order
  createOrder: async (orderData: Record<string, unknown>) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })
      if (!response.ok) {
        throw new Error('Failed to create order')
      }
      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message } }
    }
  }
}
