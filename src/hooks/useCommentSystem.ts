
import { useState, useCallback } from 'react';
import { EnhancedComment, CommentAttachment } from '@/types/comment';

export interface UseCommentSystemProps {
  initialComments?: EnhancedComment[];
  onCommentAdd?: (comment: EnhancedComment) => void;
  onCommentUpdate?: (commentId: string, updates: Partial<EnhancedComment>) => void;
}

export const useCommentSystem = ({
  initialComments = [],
  onCommentAdd,
  onCommentUpdate
}: UseCommentSystemProps = {}) => {
  const [comments, setComments] = useState<EnhancedComment[]>(initialComments);

  const addComment = useCallback((content: string, attachments: CommentAttachment[] = [], parentId?: string) => {
    const newComment: EnhancedComment = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      author: {
        id: 'current-user',
        name: 'You',
        role: 'User',
        verified: false
      },
      timestamp: 'now',
      parentId,
      depth: parentId ? 1 : 0,
      reactions: {
        like: {
          type: 'like',
          count: 0,
          hasReacted: false
        },
        dislike: {
          type: 'dislike',
          count: 0,
          hasReacted: false
        }
      },
      attachments,
      isEdited: false,
      editedAt: undefined,
      replies: [],
      isCollapsed: false
    };

    if (parentId) {
      // Add as reply to existing comment
      setComments(prev => prev.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newComment]
          };
        }
        return comment;
      }));
    } else {
      // Add as top-level comment
      setComments(prev => [...prev, newComment]);
    }

    onCommentAdd?.(newComment);
    return newComment;
  }, [onCommentAdd]);

  const toggleReaction = useCallback((commentId: string, reactionType: 'like' | 'dislike') => {
    const updateReaction = (comment: EnhancedComment): EnhancedComment => {
      if (comment.id === commentId) {
        const currentReaction = comment.reactions[reactionType];
        const oppositeType = reactionType === 'like' ? 'dislike' : 'like';
        const oppositeReaction = comment.reactions[oppositeType];

        const updatedComment = {
          ...comment,
          reactions: {
            ...comment.reactions,
            [reactionType]: {
              ...currentReaction,
              count: currentReaction.hasReacted ? currentReaction.count - 1 : currentReaction.count + 1,
              hasReacted: !currentReaction.hasReacted
            },
            [oppositeType]: oppositeReaction.hasReacted ? {
              ...oppositeReaction,
              count: oppositeReaction.count - 1,
              hasReacted: false
            } : oppositeReaction
          }
        };

        onCommentUpdate?.(commentId, updatedComment);
        return updatedComment;
      }

      // Check replies
      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: comment.replies.map(updateReaction)
        };
      }

      return comment;
    };

    setComments(prev => prev.map(updateReaction));
  }, [onCommentUpdate]);

  const toggleCollapse = useCallback((commentId: string) => {
    const updateCollapse = (comment: EnhancedComment): EnhancedComment => {
      if (comment.id === commentId) {
        const updatedComment = { ...comment, isCollapsed: !comment.isCollapsed };
        onCommentUpdate?.(commentId, updatedComment);
        return updatedComment;
      }

      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: comment.replies.map(updateCollapse)
        };
      }

      return comment;
    };

    setComments(prev => prev.map(updateCollapse));
  }, [onCommentUpdate]);

  const updateComment = useCallback((commentId: string, content: string, attachments: CommentAttachment[]) => {
    const updateContent = (comment: EnhancedComment): EnhancedComment => {
      if (comment.id === commentId) {
        const updatedComment = {
          ...comment,
          content,
          attachments,
          isEdited: true,
          editedAt: new Date().toISOString()
        };
        onCommentUpdate?.(commentId, updatedComment);
        return updatedComment;
      }

      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: comment.replies.map(updateContent)
        };
      }

      return comment;
    };

    setComments(prev => prev.map(updateContent));
  }, [onCommentUpdate]);

  const deleteComment = useCallback((commentId: string) => {
    const filterComment = (comment: EnhancedComment): EnhancedComment | null => {
      if (comment.id === commentId) {
        return null;
      }

      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: comment.replies.map(filterComment).filter(Boolean) as EnhancedComment[]
        };
      }

      return comment;
    };

    setComments(prev => prev.map(filterComment).filter(Boolean) as EnhancedComment[]);
  }, []);

  return {
    comments,
    addComment,
    toggleReaction,
    toggleCollapse,
    updateComment,
    deleteComment,
    setComments
  };
};
