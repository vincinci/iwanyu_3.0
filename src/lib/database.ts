import { createClient as createBrowserClient } from '@/utils/supabase/client'

/**
 * Client-side database operations
 * Use these in components and client-side code
 */
export const clientDb = {
  // Get current user
  getCurrentUser: async () => {
    const supabase = createBrowserClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Get products with pagination
  getProducts: async (page = 1, limit = 12) => {
    const supabase = createBrowserClient()
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    const { data, error, count } = await supabase
      .from('products')
      .select(`
        *,
        vendor:vendors(businessName)
      `, { count: 'exact' })
      .eq('status', 'ACTIVE')
      .range(from, to)
      .order('createdAt', { ascending: false })
    
    return { data, error, count }
  },

  // Get single product
  getProduct: async (id: string) => {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    return { data, error }
  },

  // Add to cart
  addToCart: async (productId: string, quantity: number) => {
    const supabase = createBrowserClient()
    const user = await clientDb.getCurrentUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('cart_items')
      .insert({
        userId: user.id,
        productId,
        quantity
      })
    
    return { data, error }
  },

  // Get categories
  getCategories: async () => {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('isActive', true)
      .order('name', { ascending: true })
    
    return { data, error }
  },

  // Get single category
  getCategory: async (id: string) => {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()
    
    return { data, error }
  },

  // Get products by category
  getProductsByCategory: async (categoryId: string, page = 1, limit = 12) => {
    const supabase = createBrowserClient()
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    const { data, error, count } = await supabase
      .from('products')
      .select(`
        *,
        vendor:vendors(businessName),
        category:categories(name, slug)
      `, { count: 'exact' })
      .eq('categoryId', categoryId)
      .eq('status', 'ACTIVE')
      .range(from, to)
      .order('createdAt', { ascending: false })
    
    return { data, error, count }
  },

  // Get vendors
  getVendors: async (page = 1, limit = 12) => {
    const supabase = createBrowserClient()
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    const { data, error, count } = await supabase
      .from('vendors')
      .select(`
        *,
        user:users(name, email, image)
      `, { count: 'exact' })
      .eq('status', 'APPROVED')
      .range(from, to)
      .order('createdAt', { ascending: false })
    
    return { data, error, count }
  },

  // Get single vendor
  getVendor: async (id: string) => {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('vendors')
      .select(`
        *,
        user:users(name, email, image)
      `)
      .eq('id', id)
      .single()
    
    return { data, error }
  },

  // Get featured products (latest or most popular)
  getFeaturedProducts: async (limit = 8) => {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        vendor:vendors(businessName),
        category:categories(name, slug)
      `)
      .eq('status', 'ACTIVE')
      .limit(limit)
      .order('createdAt', { ascending: false })
    
    return { data, error }
  },

  // Search products
  searchProducts: async (query: string, page = 1, limit = 12) => {
    const supabase = createBrowserClient()
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    const { data, error, count } = await supabase
      .from('products')
      .select(`
        *,
        vendor:vendors(businessName),
        category:categories(name, slug)
      `, { count: 'exact' })
      .eq('status', 'ACTIVE')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .range(from, to)
      .order('createdAt', { ascending: false })
    
    return { data, error, count }
  },

  // Get cart items
  getCartItems: async () => {
    const supabase = createBrowserClient()
    const user = await clientDb.getCurrentUser()
    if (!user) return { data: null, error: new Error('User not authenticated') }

    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(
          id,
          name,
          price,
          images,
          vendor:vendors(businessName)
        )
      `)
      .eq('userId', user.id)
      .order('createdAt', { ascending: false })
    
    return { data, error }
  },

  // Update cart item quantity
  updateCartItem: async (itemId: string, quantity: number) => {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
    
    return { data, error }
  },

  // Remove from cart
  removeFromCart: async (itemId: string) => {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)
    
    return { data, error }
  }
}

/**
 * Authentication helpers
 */
export const auth = {
  // Sign up (client-side)
  signUp: async (email: string, password: string, userData?: any) => {
    const supabase = createBrowserClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    
    return { data, error }
  },

  // Sign in (client-side)
  signIn: async (email: string, password: string) => {
    const supabase = createBrowserClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    return { data, error }
  },

  // Sign out (client-side)
  signOut: async () => {
    const supabase = createBrowserClient()
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Reset password (client-side)
  resetPassword: async (email: string) => {
    const supabase = createBrowserClient()
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    return { data, error }
  }
}

/**
 * Real-time subscriptions (client-side only)
 */
export const realtime = {
  // Subscribe to product changes
  subscribeToProducts: (callback: (payload: any) => void) => {
    const supabase = createBrowserClient()
    return supabase
      .channel('products')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'products' }, 
        callback
      )
      .subscribe()
  },

  // Subscribe to order changes
  subscribeToOrders: (userId: string, callback: (payload: any) => void) => {
    const supabase = createBrowserClient()
    return supabase
      .channel('orders')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'orders',
          filter: `userId=eq.${userId}`
        }, 
        callback
      )
      .subscribe()
  }
}
