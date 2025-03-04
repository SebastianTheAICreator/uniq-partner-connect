
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface PremiumInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minimized?: boolean;
}

const PremiumInput = forwardRef<HTMLTextAreaElement, PremiumInputProps>(
  ({ className, minimized = false, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        className={cn(
          "w-full transition-all duration-300 ease-in-out",
          "bg-[#1E2235]/80 border-[#3A4366] text-white/90 placeholder:text-white/40",
          "focus:ring-2 focus:ring-primary/30 focus:border-primary/40",
          "backdrop-blur-sm resize-none rounded-xl",
          "hover:bg-[#262A42]/80",
          minimized ? "py-4 min-h-[56px]" : "min-h-[120px]",
          className
        )}
        {...props}
      />
    );
  }
);

PremiumInput.displayName = "PremiumInput";

export default PremiumInput;
