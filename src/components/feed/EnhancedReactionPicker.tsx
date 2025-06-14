
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ThumbsUp, 
  Heart, 
  Laugh, 
  Zap, 
  Frown, 
  Angry,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReactionType, PostReactions } from '@/hooks/useEnhancedReactions';

interface EnhancedReactionPickerProps {
  reactions: PostReactions;
  onReactionToggle: (reaction: ReactionType) => void;
  size?: 'sm' | 'md' | 'lg';
}

const reactionConfig = {
  like: { icon: ThumbsUp, emoji: '👍', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  love: { icon: Heart, emoji: '❤️', color: 'text-red-400', bg: 'bg-red-500/20' },
  laugh: { icon: Laugh, emoji: '😂', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  wow: { icon: Zap, emoji: '😮', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  sad: { icon: Frown, emoji: '😢', color: 'text-gray-400', bg: 'bg-gray-500/20' },
  angry: { icon: Angry, emoji: '😠', color: 'text-orange-400', bg: 'bg-orange-500/20' },
};

const EnhancedReactionPicker = ({ 
  reactions, 
  onReactionToggle, 
  size = 'md' 
}: EnhancedReactionPickerProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hoveredReaction, setHoveredReaction] = useState<ReactionType | null>(null);

  const getUserReaction = () => {
    return Object.entries(reactions).find(([, reaction]) => reaction.hasReacted)?.[0] as ReactionType | undefined;
  };

  const getTotalCount = () => {
    return Object.values(reactions).reduce((total, reaction) => total + reaction.count, 0);
  };

  const getTopReactions = () => {
    return Object.entries(reactions)
      .filter(([, reaction]) => reaction.count > 0)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, 3)
      .map(([type]) => type as ReactionType);
  };

  const userReaction = getUserReaction();
  const totalCount = getTotalCount();
  const topReactions = getTopReactions();

  const buttonSize = {
    sm: 'h-8 px-3',
    md: 'h-9 px-4',
    lg: 'h-10 px-5'
  }[size];

  return (
    <div className="relative">
      {/* Main reaction button */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPicker(!showPicker)}
          onMouseEnter={() => setShowPicker(true)}
          className={cn(
            buttonSize,
            "rounded-lg transition-all duration-200 relative",
            userReaction 
              ? `${reactionConfig[userReaction].color} ${reactionConfig[userReaction].bg} hover:opacity-80`
              : "text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
          )}
        >
          {userReaction ? (
            <span className="text-lg mr-2">{reactionConfig[userReaction].emoji}</span>
          ) : (
            <ThumbsUp className="h-4 w-4 mr-2" />
          )}
          <span className="font-medium">{totalCount > 0 ? totalCount : 'React'}</span>
        </Button>

        {/* Top reactions display */}
        {topReactions.length > 0 && (
          <div className="flex items-center gap-1 ml-2">
            {topReactions.map((reactionType) => (
              <motion.div
                key={reactionType}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 text-xs text-gray-400"
              >
                <span className="text-sm">{reactionConfig[reactionType].emoji}</span>
                <span>{reactions[reactionType].count}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Reaction picker popup */}
      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            onMouseLeave={() => setShowPicker(false)}
            className="absolute bottom-full left-0 mb-2 bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl p-2 shadow-2xl z-50"
          >
            <div className="flex items-center gap-1">
              {Object.entries(reactionConfig).map(([type, config]) => {
                const reactionType = type as ReactionType;
                const reaction = reactions[reactionType];
                const IconComponent = config.icon;
                
                return (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      onReactionToggle(reactionType);
                      setShowPicker(false);
                    }}
                    onMouseEnter={() => setHoveredReaction(reactionType)}
                    onMouseLeave={() => setHoveredReaction(null)}
                    className={cn(
                      "relative p-2 rounded-lg transition-all duration-200 group",
                      reaction.hasReacted 
                        ? `${config.color} ${config.bg}` 
                        : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
                    )}
                  >
                    <span className="text-xl">{config.emoji}</span>
                    
                    {/* Tooltip */}
                    {hoveredReaction === reactionType && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded capitalize whitespace-nowrap"
                      >
                        {type}
                      </motion.div>
                    )}

                    {/* Count badge */}
                    {reaction.count > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                      >
                        {reaction.count}
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedReactionPicker;
