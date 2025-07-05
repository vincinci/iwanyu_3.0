'use client'

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'
import { Button } from '@/components/ui/button'
import { generateTxRef, createFlutterwaveConfig, FlutterwavePaymentData } from '@/lib/flutterwave'
import { formatRWF } from '@/lib/currency'
import { CreditCard, Smartphone, Building } from 'lucide-react'

interface FlutterwavePaymentProps {
  amount: number
  customerEmail: string
  customerPhone: string
  customerName: string
  orderId?: string
  onSuccess?: (response: any) => void
  onClose?: () => void
  disabled?: boolean
  className?: string
}

export function FlutterwavePayment({
  amount,
  customerEmail,
  customerPhone,
  customerName,
  orderId,
  onSuccess,
  onClose,
  disabled = false,
  className = ''
}: FlutterwavePaymentProps) {
  const paymentData: FlutterwavePaymentData = {
    amount,
    currency: 'RWF',
    tx_ref: generateTxRef(),
    customer: {
      email: customerEmail,
      phone_number: customerPhone,
      name: customerName,
    },
    meta: {
      orderId,
    }
  }

  const config = createFlutterwaveConfig(paymentData)

  const handleFlutterPayment = useFlutterwave(config)

  const handlePayment = () => {
    handleFlutterPayment({
      callback: (response) => {
        console.log('Payment response:', response)
        if (response.status === 'successful') {
          onSuccess?.(response)
        }
        closePaymentModal() // this will close the modal programmatically
      },
      onClose: () => {
        console.log('Payment modal closed')
        onClose?.()
      },
    })
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Payment Amount Display */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-xl font-bold text-brand-charcoal">{formatRWF(amount)}</p>
        </div>
      </div>

      {/* Payment Methods Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg">
          <Smartphone className="h-4 w-4 text-brand-green" />
          <div>
            <p className="font-medium text-sm text-brand-charcoal">Mobile Money</p>
            <p className="text-xs text-gray-600">MTN, Airtel</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg">
          <CreditCard className="h-4 w-4 text-brand-blue" />
          <div>
            <p className="font-medium text-sm text-brand-charcoal">Card Payment</p>
            <p className="text-xs text-gray-600">Visa, Mastercard</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg">
          <Building className="h-4 w-4 text-purple-600" />
          <div>
            <p className="font-medium text-sm text-brand-charcoal">Bank Transfer</p>
            <p className="text-xs text-gray-600">Local banks</p>
          </div>
        </div>
      </div>

      {/* Pay Now Button */}
      <Button
        onClick={handlePayment}
        disabled={disabled}
        className="w-full bg-brand-golden hover:bg-brand-golden/90 text-white font-medium py-3"
        size="lg"
      >
        Pay {formatRWF(amount)} Now
      </Button>

      {/* Security Note */}
      <div className="text-center text-xs text-gray-500 mt-2">
        <p>🔒 Your payment is secured by Flutterwave</p>
        <p>Payments processed in Rwandan Francs (RWF)</p>
      </div>
    </div>
  )
}

// Quick Payment Button Component
interface QuickPayButtonProps {
  amount: number
  customerEmail: string
  customerPhone: string
  customerName: string
  orderId?: string
  onSuccess?: (response: any) => void
  onClose?: () => void
  children?: React.ReactNode
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
}

export function QuickPayButton({
  amount,
  customerEmail,
  customerPhone,
  customerName,
  orderId,
  onSuccess,
  onClose,
  children,
  variant = 'default',
  size = 'default',
  disabled = false
}: QuickPayButtonProps) {
  const paymentData: FlutterwavePaymentData = {
    amount,
    currency: 'RWF',
    tx_ref: generateTxRef(),
    customer: {
      email: customerEmail,
      phone_number: customerPhone,
      name: customerName,
    },
    meta: { orderId }
  }

  const config = createFlutterwaveConfig(paymentData)
  const handleFlutterPayment = useFlutterwave(config)

  const handlePayment = () => {
    handleFlutterPayment({
      callback: (response) => {
        if (response.status === 'successful') {
          onSuccess?.(response)
        }
        closePaymentModal()
      },
      onClose: () => onClose?.(),
    })
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled}
      variant={variant}
      size={size}
      className="bg-yellow-500 hover:bg-yellow-600 text-white"
    >
      {children || `Pay ${formatRWF(amount)}`}
    </Button>
  )
}
