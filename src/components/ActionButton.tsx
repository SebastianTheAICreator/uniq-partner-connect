import { ButtonHTMLAttributes, FC } from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
}

const ActionButton: FC<ActionButtonProps> = ({ 
  children, 
  variant = 'primary',
  className,
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "px-6 py-3 rounded-lg font-semibold text-white shadow-lg",
        "transition-all duration-300",
        "hover:shadow-xl",
        {
          'bg-gradient-to-r from-primary to-primary-hover': variant === 'primary',
          'bg-gradient-to-r from-secondary to-secondary-hover': variant === 'secondary',
          'bg-gradient-to-r from-accent to-accent-hover': variant === 'accent',
        },
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default ActionButton;