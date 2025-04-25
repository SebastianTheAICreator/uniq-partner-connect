
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-foreground hover:bg-primary/90 border border-white/5",
        destructive: "bg-red-900 text-white hover:bg-red-800 border border-red-800/50",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-white hover:bg-secondary/90 border border-white/5",
        ghost: "hover:bg-secondary hover:text-accent-foreground",
        link: "text-interactive underline-offset-4 hover:underline",
        
        // Classic variants
        'classic': "bg-primary border border-white/10 text-foreground hover:bg-secondary shadow-sm hover:shadow-md transition-all duration-300",
        'classic-blue': "bg-interactive text-white hover:bg-interactive/90 border border-white/10 shadow-classic-blue hover:shadow-classic-lg transition-all duration-300",
        'classic-outline': "bg-transparent border border-white/10 text-foreground hover:bg-primary/80 hover:border-white/20 transition-all duration-300",
        'classic-subtle': "bg-background/70 text-foreground border border-white/5 hover:bg-background hover:border-white/10 transition-all duration-300",
        'classic-ghost': "bg-transparent text-foreground hover:bg-white/5 transition-all duration-300",
        
        // Premium variants (simplified)
        'premium': "bg-interactive text-white hover:bg-interactive/90 border border-white/10 shadow-classic-blue hover:shadow-classic-lg transition-all duration-300",
        'premium-outline': "bg-transparent border border-interactive/20 text-white hover:bg-primary/80 hover:border-interactive/40 transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        '2xl': "h-14 rounded-md px-12 text-lg",
        icon: "h-10 w-10",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        lg: "rounded-lg",
        xl: "rounded-xl",
        '2xl': "rounded-2xl",
        none: "rounded-none"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default"
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
