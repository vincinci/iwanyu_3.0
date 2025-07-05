import { NextRequest, NextResponse } from 'next/server';

// Mock cart data for development
let cartData = {
  id: 1,
  userId: 1,
  items: [],
  total: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export async function GET() {
  try {
    return NextResponse.json(cartData);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Mock adding item to cart
    const newItem = {
      id: Date.now(),
      productId: body.productId,
      quantity: body.quantity || 1,
      price: body.price || 0,
      name: body.name || 'Product',
      image: body.image || '',
    };
    
    cartData.items.push(newItem);
    cartData.total += newItem.price * newItem.quantity;
    cartData.updatedAt = new Date().toISOString();
    
    return NextResponse.json(cartData);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Mock updating cart item
    const itemIndex = cartData.items.findIndex(item => item.id === body.itemId);
    if (itemIndex !== -1) {
      const oldItem = cartData.items[itemIndex];
      cartData.total -= oldItem.price * oldItem.quantity;
      
      cartData.items[itemIndex] = {
        ...oldItem,
        quantity: body.quantity || oldItem.quantity,
        price: body.price || oldItem.price,
      };
      
      cartData.total += cartData.items[itemIndex].price * cartData.items[itemIndex].quantity;
      cartData.updatedAt = new Date().toISOString();
    }
    
    return NextResponse.json(cartData);
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('itemId');
    
    if (itemId) {
      // Remove specific item
      const itemIndex = cartData.items.findIndex(item => item.id === parseInt(itemId));
      if (itemIndex !== -1) {
        const removedItem = cartData.items[itemIndex];
        cartData.total -= removedItem.price * removedItem.quantity;
        cartData.items.splice(itemIndex, 1);
        cartData.updatedAt = new Date().toISOString();
      }
    } else {
      // Clear entire cart
      cartData.items = [];
      cartData.total = 0;
      cartData.updatedAt = new Date().toISOString();
    }
    
    return NextResponse.json(cartData);
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { error: 'Failed to remove from cart' },
      { status: 500 }
    );
  }
}
