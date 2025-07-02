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
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-2xl font-bold text-yellow-600">{formatRWF(amount)}</p>
        </div>
      </div>

      {/* Payment Methods Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
          <Smartphone className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium text-sm">Mobile Money</p>
            <p className="text-xs text-gray-600">MTN, Airtel</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
          <CreditCard className="h-5 w-5 text-blue-600" />
          <div>
            <p className="font-medium text-sm">Card Payment</p>
            <p className="text-xs text-gray-600">Visa, Mastercard</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
          <Building className="h-5 w-5 text-purple-600" />
          <div>
            <p className="font-medium text-sm">Bank Transfer</p>
            <p className="text-xs text-gray-600">Local banks</p>
          </div>
        </div>
      </div>

      {/* Pay Now Button */}
      <Button
        onClick={handlePayment}
        disabled={disabled}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 text-lg"
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
