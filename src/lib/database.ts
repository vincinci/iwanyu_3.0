import { supabase, supabaseAdmin } from './supabase'
import { createClient as createBrowserClient } from '@/utils/supabase/client'
import { createClient as createServerClient } from '@/utils/supabase/server'

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
      .from('Product')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('createdAt', { ascending: false })
    
    return { data, error, count }
  },

  // Get single product
  getProduct: async (id: string) => {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('Product')
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
      .from('CartItem')
      .insert({
        userId: user.id,
        productId,
        quantity
      })
    
    return { data, error }
  }
}

/**
 * Server-side database operations
 * Use these in Server Components and API routes
 */
export const serverDb = {
  // Get current user (server-side)
  getCurrentUser: async () => {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Get products (server-side)
  getProducts: async (page = 1, limit = 12) => {
    const supabase = await createServerClient()
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    const { data, error, count } = await supabase
      .from('Product')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('createdAt', { ascending: false })
    
    return { data, error, count }
  },

  // Get single product (server-side)
  getProduct: async (id: string) => {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .eq('id', id)
      .single()
    
    return { data, error }
  }
}

/**
 * Server-side database operations
 * Use these in API routes and server-side code only
 */
export const adminDb = {
  // Create user (admin operation)
  createUser: async (userData: any) => {
    const { data, error } = await supabaseAdmin
      .from('User')
      .insert(userData)
    
    return { data, error }
  },

  // Get all orders (admin operation)
  getAllOrders: async () => {
    const { data, error } = await supabaseAdmin
      .from('Order')
      .select('*')
      .order('createdAt', { ascending: false })
    
    return { data, error }
  },

  // Update product status (vendor/admin operation)
  updateProductStatus: async (productId: string, status: string) => {
    const { data, error } = await supabaseAdmin
      .from('Product')
      .update({ status })
      .eq('id', productId)
    
    return { data, error }
  },

  // Delete user (admin operation)
  deleteUser: async (userId: string) => {
    const { data, error } = await supabaseAdmin
      .from('User')
      .delete()
      .eq('id', userId)
    
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
        { event: '*', schema: 'public', table: 'Product' }, 
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
          table: 'Order',
          filter: `userId=eq.${userId}`
        }, 
        callback
      )
      .subscribe()
  }
}
