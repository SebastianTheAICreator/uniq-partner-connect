
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/20 transition-all duration-300",
        'premium-outline': "bg-transparent border border-primary/20 text-white hover:bg-primary/10 hover:border-primary/40 transition-all duration-300",
        'premium-ghost': "bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300",
        glass: "backdrop-blur-md bg-white/10 border border-white/10 text-white hover:bg-white/20 hover:border-white/20 transition-all duration-300",
        'diamond': "relative bg-gradient-to-r from-primary/90 via-secondary/80 to-accent/90 text-white overflow-hidden before:absolute before:inset-0 before:bg-[url('/assets/noise.svg')] before:opacity-5 before:mix-blend-overlay hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300",
        'frost': "backdrop-blur-xl bg-white/5 border border-white/20 text-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-white/10 hover:border-white/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300",
        'aurora': "relative bg-gradient-to-br from-primary/80 via-secondary/60 to-accent/80 text-white overflow-hidden shadow-md after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity hover:shadow-lg hover:shadow-primary/20 transition-all duration-300",
        'neon': "relative bg-transparent border border-primary/50 text-white overflow-hidden before:absolute before:inset-0 before:bg-primary/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity hover:border-primary/80 hover:shadow-[0_0_15px_rgba(74,144,226,0.5)] transition-all duration-300",
        // New premium variants
        'cosmos': "relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white border border-white/10 overflow-hidden shadow-lg before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_top_right,_rgba(74,144,226,0.15),_transparent_70%)] hover:shadow-primary/20 hover:before:opacity-100 hover:scale-[1.02] transition-all duration-300",
        'midnight': "bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_4px_30px_rgba(74,144,226,0.2)] hover:border-white/10 transition-all duration-300",
        'stellar': "relative bg-gradient-to-r from-primary/80 to-secondary/80 text-white overflow-hidden before:absolute before:inset-0 before:bg-[url('/assets/noise.svg')] before:opacity-5 before:mix-blend-overlay after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/30 after:to-transparent hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300",
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
        '2xl': "rounded-2xl"
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
