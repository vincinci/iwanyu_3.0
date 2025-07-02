import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    let query = supabase
      .from('Product')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('createdAt', { ascending: false })
    
    // Filter by category if provided
    if (category) {
      query = query.eq('categoryId', category)
    }
    
    const { data, error, count } = await query
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    return NextResponse.json({
      data,
      count,
      page,
      totalPages: Math.ceil((count || 0) / limit)
    })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('Product')
      .insert({
        ...body,
        userId: user.id
      })
      .select()
      .single()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    return NextResponse.json({ data }, { status: 201 })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
