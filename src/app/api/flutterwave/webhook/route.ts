import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { FlutterwaveWebhookEvent } from '@/lib/flutterwave'

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('verif-hash')
    const secretHash = process.env.FLUTTERWAVE_SECRET_HASH
    
    // Verify webhook signature (in production, you should set up FLUTTERWAVE_SECRET_HASH)
    if (secretHash && signature !== secretHash) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event: FlutterwaveWebhookEvent = await request.json()
    
    // Handle successful payment
    if (event.event === 'charge.completed' && event.data.status === 'successful') {
      const supabase = await createClient()
      
      const {
        tx_ref,
        flw_ref,
        amount,
        currency,
        customer,
        status,
        payment_type
      } = event.data

      // Extract order ID from transaction reference
      const orderId = event.data.meta?.orderId || tx_ref

      try {
        // Update order status in database
        const { error: orderError } = await supabase
          .from('Order')
          .update({
            status: 'PAID',
            paymentStatus: 'COMPLETED',
            updatedAt: new Date().toISOString()
          })
          .eq('id', orderId)

        if (orderError) {
          console.error('Error updating order:', orderError)
        }

        // Create payment transaction record
        const { error: transactionError } = await supabase
          .from('Transaction')
          .insert({
            orderId,
            amount,
            currency,
            status: 'COMPLETED',
            paymentMethod: 'FLUTTERWAVE',
            externalTransactionId: flw_ref,
            transactionReference: tx_ref,
            paymentDetails: {
              flutterwave_ref: flw_ref,
              payment_type,
              customer_email: customer.email,
              customer_phone: customer.phone_number,
              status
            },
            createdAt: new Date().toISOString()
          })

        if (transactionError) {
          console.error('Error creating transaction:', transactionError)
        }

        // Send confirmation email (optional)
        // await sendPaymentConfirmationEmail(customer.email, orderId, amount)

        console.log(`Payment successful for order ${orderId}: ${amount} ${currency}`)
        
        return NextResponse.json({ 
          status: 'success', 
          message: 'Payment processed successfully' 
        })

      } catch (dbError) {
        console.error('Database error processing payment:', dbError)
        return NextResponse.json(
          { error: 'Database error processing payment' }, 
          { status: 500 }
        )
      }
    }

    // Handle failed payment
    if (event.event === 'charge.completed' && event.data.status === 'failed') {
      const supabase = await createClient()
      const orderId = event.data.meta?.orderId || event.data.tx_ref

      // Update order status to failed
      const { error } = await supabase
        .from('Order')
        .update({
          paymentStatus: 'FAILED',
          updatedAt: new Date().toISOString()
        })
        .eq('id', orderId)

      if (error) {
        console.error('Error updating failed order:', error)
      }

      return NextResponse.json({ 
        status: 'failed', 
        message: 'Payment failed' 
      })
    }

    // Handle other events
    console.log('Flutterwave webhook event:', event.event, event.data.status)
    
    return NextResponse.json({ 
      status: 'received', 
      message: 'Webhook received' 
    })

  } catch (error) {
    console.error('Flutterwave webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' }, 
      { status: 500 }
    )
  }
}

// Verify Flutterwave transaction
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const transactionId = searchParams.get('transaction_id')
    const txRef = searchParams.get('tx_ref')

    if (!transactionId && !txRef) {
      return NextResponse.json(
        { error: 'Transaction ID or tx_ref required' }, 
        { status: 400 }
      )
    }

    // Verify transaction with Flutterwave API
    const flutterwaveSecretKey = process.env.FLUTTERWAVE_SECRET_KEY
    
    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${flutterwaveSecretKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const verificationData = await response.json()

    if (verificationData.status === 'success') {
      return NextResponse.json({
        status: 'success',
        data: verificationData.data
      })
    } else {
      return NextResponse.json({
        status: 'failed',
        message: 'Transaction verification failed'
      }, { status: 400 })
    }

  } catch (error) {
    console.error('Transaction verification error:', error)
    return NextResponse.json(
      { error: 'Verification failed' }, 
      { status: 500 }
    )
  }
}
