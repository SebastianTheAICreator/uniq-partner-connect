
import { ButtonHTMLAttributes, FC } from 'react';
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ActionButtonProps extends HTMLMotionProps<"button"> {
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "px-6 py-3 rounded-lg font-semibold text-white shadow-classic",
        "transition-all duration-300",
        "hover:shadow-classic-md border",
        {
          'bg-interactive border-interactive/30 hover:bg-interactive/90': variant === 'primary',
          'bg-secondary border-white/5 hover:bg-secondary/90': variant === 'secondary',
          'bg-accent border-white/5 hover:bg-accent/90': variant === 'accent',
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
