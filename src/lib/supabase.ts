import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Legacy client-side Supabase client (for backward compatibility)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (uses service role key for admin operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Re-export SSR clients for convenience
export { createClient as createBrowserClient } from '@/utils/supabase/client'
export { createClient as createServerClient } from '@/utils/supabase/server'

// Types for your database tables (to be updated based on your schema)
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Your table definitions will go here
      User: {
        Row: {
          id: string
          email: string
          name: string | null
          phone: string | null
          image: string | null
          role: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          phone?: string | null
          image?: string | null
          role?: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          phone?: string | null
          image?: string | null
          role?: string
          createdAt?: string
          updatedAt?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
