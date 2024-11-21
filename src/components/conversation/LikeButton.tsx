import { ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
  count: number;
  isLiked: boolean;
  onClick: () => void;
}

const LikeButton = ({ count, isLiked, onClick }: LikeButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "flex items-center space-x-2 relative",
        isLiked && "text-primary"
      )}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ThumbsUp className="h-5 w-5" />
      </motion.div>
      <motion.span
        key={count}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        {count}
        {isLiked && (
          <motion.div
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 text-primary"
          >
            +1
          </motion.div>
        )}
      </motion.span>
    </Button>
  );
};

export default LikeButton;