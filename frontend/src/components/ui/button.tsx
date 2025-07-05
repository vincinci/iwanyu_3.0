import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary CTA - Golden Yellow
        default: "bg-brand-yellow-500 text-brand-charcoal-700 hover:bg-brand-yellow-600 font-semibold",
        primary: "bg-brand-yellow-500 text-brand-charcoal-700 hover:bg-brand-yellow-600 font-semibold",
        // Secondary - Charcoal
        secondary: "bg-brand-charcoal-700 text-white hover:bg-brand-charcoal-800",
        // Success - Soft Green
        success: "bg-brand-green-500 text-white hover:bg-brand-green-600",
        // Info - Sky Blue
        info: "bg-brand-blue-500 text-white hover:bg-brand-blue-600",
        // Destructive - Keep red for warnings
        destructive: "bg-red-500 text-white hover:bg-red-600",
        // Outline variants
        outline: "border border-brand-charcoal-300 text-brand-charcoal-700 hover:bg-gray-50",
        "outline-primary": "border border-brand-yellow-500 text-brand-yellow-600 hover:bg-brand-yellow-50",
        // Ghost and link
        ghost: "hover:bg-gray-100 hover:text-brand-charcoal-700",
        link: "text-brand-blue-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-3 py-1.5 text-sm",
        sm: "h-7 rounded-md px-2.5 text-xs",
        lg: "h-10 rounded-md px-4 text-base",
        xl: "h-12 rounded-lg px-6 text-lg font-semibold",
        icon: "h-8 w-8",
        xs: "h-6 px-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
