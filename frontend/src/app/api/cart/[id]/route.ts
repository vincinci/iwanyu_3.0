import { NextRequest, NextResponse } from 'next/server';

// Mock cart data for development (should be shared with main cart route)
let cartData = {
  id: 1,
  userId: 1,
  items: [],
  total: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const itemId = parseInt(params.id);
    
    // Remove specific item from cart
    const itemIndex = cartData.items.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      const removedItem = cartData.items[itemIndex];
      cartData.total -= removedItem.price * removedItem.quantity;
      cartData.items.splice(itemIndex, 1);
      cartData.updatedAt = new Date().toISOString();
    }
    
    return NextResponse.json(cartData);
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json(
      { error: 'Failed to remove cart item' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const itemId = parseInt(params.id);
    const body = await request.json();
    
    // Update specific cart item
    const itemIndex = cartData.items.findIndex(item => item.id === itemId);
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
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 }
    );
  }
}
