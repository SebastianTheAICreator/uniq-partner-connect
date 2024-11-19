import { ButtonHTMLAttributes, FC } from 'react';
import { cn } from "@/lib/utils";

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
    <button
      className={cn(
        "px-6 py-3 rounded-lg font-semibold text-white shadow-lg transition-all duration-300",
        "hover:scale-105 hover:shadow-xl",
        "active:scale-95",
        {
          'bg-primary hover:bg-primary-hover': variant === 'primary',
          'bg-secondary hover:bg-secondary-hover': variant === 'secondary',
          'bg-accent hover:bg-accent-hover': variant === 'accent',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;