
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Search, 
  PlusCircle, 
  Users, 
  TrendingUp, 
  Sparkles,
  MessageCircle,
  Heart,
  Share2
} from 'lucide-react';

interface EnhancedEmptyStateProps {
  type: 'no-posts' | 'no-search-results' | 'no-filtered-results' | 'error';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  onSecondaryAction?: () => void;
  secondaryActionLabel?: string;
  className?: string;
}

const EmptyStateIcon = ({ type }: { type: EnhancedEmptyStateProps['type'] }) => {
  const iconProps = {
    className: "h-12 w-12",
    strokeWidth: 1.5
  };

  switch (type) {
    case 'no-posts':
      return <MessageCircle {...iconProps} className="text-blue-400" />;
    case 'no-search-results':
      return <Search {...iconProps} className="text-purple-400" />;
    case 'no-filtered-results':
      return <TrendingUp {...iconProps} className="text-green-400" />;
    case 'error':
      return <Sparkles {...iconProps} className="text-red-400" />;
    default:
      return <MessageCircle {...iconProps} className="text-blue-400" />;
  }
};

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-8 left-12 text-blue-400/20"
    >
      <Heart className="h-6 w-6" />
    </motion.div>
    
    <motion.div
      animate={{
        y: [0, 10, 0],
        rotate: [0, -5, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
      className="absolute top-16 right-16 text-purple-400/20"
    >
      <Share2 className="h-5 w-5" />
    </motion.div>
    
    <motion.div
      animate={{
        y: [0, -8, 0],
        rotate: [0, 3, 0]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
      className="absolute bottom-12 left-20 text-green-400/20"
    >
      <Users className="h-7 w-7" />
    </motion.div>
  </div>
);

const EnhancedEmptyState = ({
  type,
  title,
  description,
  actionLabel,
  onAction,
  onSecondaryAction,
  secondaryActionLabel,
  className
}: EnhancedEmptyStateProps) => {
  const getDefaultContent = () => {
    switch (type) {
      case 'no-posts':
        return {
          title: 'No posts yet',
          description: 'Be the first to share something amazing with the community! Your voice matters.',
          actionLabel: 'Create Post',
          secondaryActionLabel: 'Discover People'
        };
      case 'no-search-results':
        return {
          title: 'No results found',
          description: 'We couldn\'t find any posts matching your search. Try different keywords or browse trending topics.',
          actionLabel: 'Clear Search',
          secondaryActionLabel: 'View Trending'
        };
      case 'no-filtered-results':
        return {
          title: 'No posts match your filters',
          description: 'Try adjusting your filters or explore different topics to discover new content.',
          actionLabel: 'Reset Filters',
          secondaryActionLabel: 'Browse All'
        };
      case 'error':
        return {
          title: 'Something went wrong',
          description: 'We\'re having trouble loading the feed right now. Please try again in a moment.',
          actionLabel: 'Try Again',
          secondaryActionLabel: 'Refresh Page'
        };
      default:
        return {
          title: 'Nothing here yet',
          description: 'Start exploring or create something new!',
          actionLabel: 'Get Started'
        };
    }
  };

  const content = {
    title: title || getDefaultContent().title,
    description: description || getDefaultContent().description,
    actionLabel: actionLabel || getDefaultContent().actionLabel,
    secondaryActionLabel: secondaryActionLabel || getDefaultContent().secondaryActionLabel
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "relative flex flex-col items-center justify-center py-16 px-8 text-center",
        "min-h-[400px]",
        className
      )}
    >
      <FloatingElements />
      
      {/* Main icon container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative mb-8"
      >
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
          <EmptyStateIcon type={type} />
        </div>
        
        {/* Decorative rings */}
        <div className="absolute inset-0 rounded-full border border-white/5 animate-ping animation-delay-1000" />
        <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-md mx-auto space-y-4"
      >
        <h3 className="text-2xl font-bold text-white">
          {content.title}
        </h3>
        <p className="text-white/60 text-lg leading-relaxed">
          {content.description}
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 mt-8"
      >
        {onAction && (
          <Button
            onClick={onAction}
            className={cn(
              "px-8 py-3 rounded-xl gap-2 text-white font-medium",
              "bg-gradient-to-r from-blue-600 to-purple-600",
              "hover:from-blue-700 hover:to-purple-700",
              "shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40",
              "transform hover:scale-105 transition-all duration-300"
            )}
          >
            <PlusCircle className="h-4 w-4" />
            {content.actionLabel}
          </Button>
        )}
        
        {onSecondaryAction && (
          <Button
            onClick={onSecondaryAction}
            variant="outline"
            className={cn(
              "px-6 py-3 rounded-xl",
              "bg-white/5 border-white/20 text-white/80",
              "hover:bg-white/10 hover:border-white/30 hover:text-white",
              "backdrop-blur-sm transition-all duration-300"
            )}
          >
            {content.secondaryActionLabel}
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EnhancedEmptyState;
