
import { useState, useCallback } from 'react';

export type ReactionType = 'like' | 'love' | 'laugh' | 'wow' | 'sad' | 'angry';

export interface PostReaction {
  type: ReactionType;
  count: number;
  hasReacted: boolean;
}

export interface PostReactions {
  [K in ReactionType]: PostReaction;
}

export const useEnhancedReactions = (initialReactions: PostReactions) => {
  const [reactions, setReactions] = useState<PostReactions>(initialReactions);

  const toggleReaction = useCallback((reactionType: ReactionType) => {
    setReactions(prev => {
      const newReactions = { ...prev };
      
      // Remove any existing reaction first
      Object.keys(newReactions).forEach(key => {
        const type = key as ReactionType;
        if (newReactions[type].hasReacted && type !== reactionType) {
          newReactions[type] = {
            ...newReactions[type],
            count: Math.max(0, newReactions[type].count - 1),
            hasReacted: false
          };
        }
      });

      // Toggle the selected reaction
      const currentReaction = newReactions[reactionType];
      newReactions[reactionType] = {
        ...currentReaction,
        count: currentReaction.hasReacted 
          ? Math.max(0, currentReaction.count - 1)
          : currentReaction.count + 1,
        hasReacted: !currentReaction.hasReacted
      };

      return newReactions;
    });
  }, []);

  const getTotalReactions = useCallback(() => {
    return Object.values(reactions).reduce((total, reaction) => total + reaction.count, 0);
  }, [reactions]);

  const getTopReactions = useCallback((limit = 3) => {
    return Object.entries(reactions)
      .filter(([, reaction]) => reaction.count > 0)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, limit)
      .map(([type, reaction]) => ({ type: type as ReactionType, ...reaction }));
  }, [reactions]);

  return {
    reactions,
    toggleReaction,
    getTotalReactions,
    getTopReactions
  };
};
