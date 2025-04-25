
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'subtle';
}

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, icon, children, variant = 'subtle', ...props }, ref) => {
    const buttonStyles = {
      primary: "bg-interactive text-white border-interactive/20 hover:shadow-classic-blue",
      secondary: "bg-secondary border-white/10 text-white hover:bg-secondary/80",
      subtle: "bg-primary/70 border-white/5 text-white/80 hover:bg-primary hover:text-white"
    };

    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          ref={ref}
          className={cn(
            "font-medium transition-all duration-300",
            "rounded-md border",
            "shadow-sm hover:shadow-md",
            buttonStyles[variant],
            className
          )}
          {...props}
        >
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </Button>
      </motion.div>
    );
  }
);

PremiumButton.displayName = "PremiumButton";

export default PremiumButton;
