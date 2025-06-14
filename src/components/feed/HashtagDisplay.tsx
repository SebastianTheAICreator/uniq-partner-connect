
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HashtagDisplayProps {
  hashtags: string[];
  onHashtagClick?: (hashtag: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'interactive';
}

const HashtagDisplay = ({ 
  hashtags, 
  onHashtagClick, 
  className,
  size = 'sm',
  variant = 'default'
}: HashtagDisplayProps) => {
  if (!hashtags || hashtags.length === 0) return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  const variantClasses = {
    default: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    outline: 'bg-transparent text-purple-400 border-purple-500/50',
    interactive: 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30 hover:text-purple-200 transition-all duration-200 cursor-pointer'
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {hashtags.map((hashtag, index) => (
        <motion.div
          key={hashtag}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        >
          <Badge
            variant="outline"
            className={cn(
              sizeClasses[size],
              variantClasses[variant],
              "rounded-full font-medium border flex items-center gap-1"
            )}
            onClick={onHashtagClick ? () => onHashtagClick(hashtag) : undefined}
          >
            <Hash className="h-3 w-3" />
            <span>{hashtag}</span>
          </Badge>
        </motion.div>
      ))}
    </div>
  );
};

export default HashtagDisplay;
