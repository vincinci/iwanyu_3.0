// Flutterwave configuration for Rwanda market
export interface FlutterwaveConfig {
  public_key: string
  tx_ref: string
  amount: number
  currency: string
  country: string
  payment_options: string
  customer: {
    email: string
    phone_number: string
    name: string
  }
  customizations: {
    title: string
    description: string
    logo?: string
  }
  meta?: Record<string, any>
}
export const flutterwaveConfig = {
  public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
  tx_ref: '', // This will be generated dynamically
  amount: 0, // This will be set dynamically
  currency: 'RWF', // Rwandan Francs
  country: 'RW', // Rwanda
  payment_options: 'card,mobilemoney,ussd,banktransfer',
  customer: {
    email: '',
    phone_number: '',
    name: '',
  },
  customizations: {
    title: 'Iwanyu Marketplace',
    description: 'Payment for your order',
    logo: 'https://iwanyu.com/logo.png', // Add your actual logo URL
  },
}

// Types for Flutterwave
export interface FlutterwavePaymentData {
  amount: number
  currency: string
  tx_ref: string
  customer: {
    email: string
    phone_number: string
    name: string
  }
  meta?: {
    orderId?: string
    userId?: string
    vendorId?: string
  }
}

// Generate transaction reference
export const generateTxRef = (): string => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000000)
  return `iwanyu_${timestamp}_${random}`
}

// Create Flutterwave config for a specific payment
export const createFlutterwaveConfig = (
  paymentData: FlutterwavePaymentData
): FlutterwaveConfig => {
  return {
    ...flutterwaveConfig,
    tx_ref: paymentData.tx_ref,
    amount: paymentData.amount,
    currency: paymentData.currency,
    customer: paymentData.customer,
    meta: paymentData.meta,
  }
}

// Supported payment methods for Rwanda
export const rwandaPaymentMethods = {
  mobileMoney: [
    { name: 'MTN Mobile Money', code: 'MTN' },
    { name: 'Airtel Money', code: 'AIRTEL' },
  ],
  cards: [
    { name: 'Visa', code: 'VISA' },
    { name: 'Mastercard', code: 'MASTERCARD' },
  ],
  banks: [
    { name: 'Bank of Kigali', code: 'BK' },
    { name: 'Equity Bank', code: 'EQUITY' },
    { name: 'Cogebanque', code: 'COGEBANQUE' },
    { name: 'Ecobank', code: 'ECOBANK' },
  ]
}

// Payment status types
export type PaymentStatus = 'pending' | 'successful' | 'failed' | 'cancelled'

// Webhook event types
export interface FlutterwaveWebhookEvent {
  event: string
  data: {
    id: number
    tx_ref: string
    flw_ref: string
    device_fingerprint: string
    amount: number
    currency: string
    charged_amount: number
    app_fee: number
    merchant_fee: number
    processor_response: string
    auth_model: string
    ip: string
    narration: string
    status: string
    payment_type: string
    created_at: string
    account_id: number
    meta?: {
      orderId?: string
      userId?: string
      vendorId?: string
    }
    customer: {
      id: number
      name: string
      phone_number: string
      email: string
      created_at: string
    }
    card?: {
      first_6digits: string
      last_4digits: string
      issuer: string
      country: string
      type: string
      expiry: string
    }
  }
}
