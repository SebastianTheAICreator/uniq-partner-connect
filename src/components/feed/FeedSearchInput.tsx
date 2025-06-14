
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeedSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  className?: string;
  placeholder?: string;
}

const FeedSearchInput = ({
  value,
  onChange,
  onClear,
  className,
  placeholder = "Search posts, authors, or topics..."
}: FeedSearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "relative flex items-center transition-all duration-200",
        isFocused && "ring-2 ring-blue-500/20 rounded-lg"
      )}>
        <Search className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            "pl-10 pr-10 bg-gray-800/50 border-gray-700/50 text-gray-100",
            "placeholder:text-gray-400 focus:bg-gray-800/70 focus:border-blue-500/50",
            "h-10 rounded-lg transition-all duration-200"
          )}
        />
        {value && (
          <Button
            onClick={handleClear}
            variant="ghost"
            size="sm"
            className="absolute right-1 h-8 w-8 p-0 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-md"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FeedSearchInput;
