
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
      primary: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-transparent hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]",
      secondary: "bg-white/10 backdrop-blur-md border-white/10 text-white hover:bg-white/15",
      subtle: "bg-white/5 border-white/10 backdrop-blur-sm text-white/80 hover:bg-white/10 hover:text-white"
    };

    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          ref={ref}
          className={cn(
            "font-medium transition-all duration-300",
            "rounded-xl border",
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
