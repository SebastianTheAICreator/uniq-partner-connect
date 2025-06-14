
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { 
  Heart, 
  MessageCircle, 
  Share2,
  Eye,
  ThumbsDown,
  ThumbsUp,
  Bookmark,
  MoreHorizontal,
  Clock,
  Pin,
  Verified,
  Flag,
  Copy,
  ExternalLink
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import RichCommentInput from './RichCommentInput';
import EnhancedComment from './EnhancedComment';
import ThreadModal from './ThreadModal';
import FeedAttachmentPreview from './FeedAttachmentPreview';
import { EnhancedComment as CommentType, CommentAttachment } from '@/types/comment';

export interface PostAuthor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  verified: boolean;
}

export interface PostStats {
  likes: number;
  dislikes: number;
  replies: number;
  shares: number;
  views: number;
}

export interface PostCommentAuthor {
  id: string;
  name: string;
  role: string;
  verified: boolean;
}

export interface PostComment {
  id: string;
  content: string;
  author: PostCommentAuthor;
  timestamp: string;
  likes: number;
  hasLiked: boolean;
}

export interface PostAttachment {
  type: 'image' | 'video' | 'document';
  url: string;
  name?: string;
}

export interface Post {
  id: string;
  content: string;
  author: PostAuthor;
  timestamp: string;
  stats: PostStats;
  tags: string[];
  isPinned: boolean;
  comments: PostComment[];
  attachments?: PostAttachment[];
}

interface FeedPostProps {
  post: Post;
  delay?: number;
  className?: string;
}

const FeedPost = ({ post, delay = 0, className }: FeedPostProps) => {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [showThreadModal, setShowThreadModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState<PostComment | null>(null);
  
  // State for managing comments locally
  const [localComments, setLocalComments] = useState<CommentType[]>([]);
  const [commentStats, setCommentStats] = useState(post.stats);

  const displayStats = useMemo(() => {
    return {
      likes: commentStats.likes + (isLiked ? 1 : 0) - (isDisliked && isLiked ? 1 : 0),
      dislikes: commentStats.dislikes + (isDisliked ? 1 : 0) - (isLiked && isDisliked ? 1 : 0),
      replies: commentStats.replies,
      shares: commentStats.shares
    };
  }, [commentStats, isLiked, isDisliked]);

  // Convert PostComments to EnhancedComments and include local comments
  const enhancedComments = useMemo(() => {
    const originalComments = post.comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      author: {
        id: comment.author.id,
        name: comment.author.name,
        role: comment.author.role,
        verified: comment.author.verified
      },
      timestamp: comment.timestamp,
      parentId: undefined,
      depth: 0,
      reactions: {
        like: {
          type: 'like' as const,
          count: comment.likes,
          hasReacted: comment.hasLiked
        },
        dislike: {
          type: 'dislike' as const,
          count: 0,
          hasReacted: false
        }
      },
      attachments: [] as CommentAttachment[],
      isEdited: false,
      editedAt: undefined,
      replies: [] as CommentType[],
      isCollapsed: false
    }));

    return [...originalComments, ...localComments];
  }, [post.comments, localComments]);

  const handleLike = (type: 'like' | 'dislike') => {
    if (type === 'like') {
      setIsLiked(!isLiked);
      setIsDisliked(false);
    } else {
      setIsDisliked(!isDisliked);
      setIsLiked(false);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    toast({
      title: "Post shared",
      description: "Your post has been shared successfully."
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "The post link has been copied to your clipboard."
    });
  };

  const handleReport = () => {
    toast({
      title: "Post reported",
      description: "Thank you, this post has been reported."
    });
  };

  const handleComment = (commentContent: string, attachments: CommentAttachment[] = []) => {
    const newComment: CommentType = {
      id: Math.random().toString(36).substr(2, 9),
      content: commentContent,
      author: {
        id: 'current-user',
        name: 'You',
        role: 'User',
        verified: false
      },
      timestamp: 'now',
      parentId: undefined,
      depth: 0,
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

    setLocalComments(prev => [...prev, newComment]);
    setCommentStats(prev => ({ ...prev, replies: prev.replies + 1 }));
    
    toast({
      title: "Comment added",
      description: "Your comment has been added successfully."
    });
  };

  const handleCommentReact = (commentId: string, reaction: 'like' | 'dislike') => {
    setLocalComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        const currentReaction = comment.reactions[reaction];
        const oppositeReaction = reaction === 'like' ? comment.reactions.dislike : comment.reactions.like;
        
        return {
          ...comment,
          reactions: {
            ...comment.reactions,
            [reaction]: {
              ...currentReaction,
              count: currentReaction.hasReacted ? currentReaction.count - 1 : currentReaction.count + 1,
              hasReacted: !currentReaction.hasReacted
            },
            [oppositeReaction.type]: oppositeReaction.hasReacted ? {
              ...oppositeReaction,
              count: oppositeReaction.count - 1,
              hasReacted: false
            } : oppositeReaction
          }
        };
      }
      return comment;
    }));

    toast({
      title: `Comment ${reaction}d`,
      description: `You ${reaction}d this comment.`
    });
  };

  const handleCommentReply = (parentId: string, content: string, attachments: CommentAttachment[]) => {
    const newReply: CommentType = {
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
      depth: 1,
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

    setLocalComments(prev => prev.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      }
      return comment;
    }));

    setCommentStats(prev => ({ ...prev, replies: prev.replies + 1 }));
    
    toast({
      title: "Reply added",
      description: "Your reply has been added successfully."
    });
  };

  const handleToggleCollapse = (commentId: string) => {
    setLocalComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, isCollapsed: !comment.isCollapsed };
      }
      return comment;
    }));
    
    toast({
      title: "Comment toggled",
      description: "Comment visibility has been toggled."
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={cn("group relative", className)}
      >
        {/* Pinned indicator */}
        {post.isPinned && (
          <div className="flex items-center gap-2 mb-3 text-sm text-amber-400">
            <Pin className="h-4 w-4" />
            <span>Pinned post</span>
          </div>
        )}

        <div className="bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden hover:border-gray-600/70 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-blue-500/5">
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-white/10">
                  {post.author.avatar ? (
                    <img src={post.author.avatar} alt={post.author.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    post.author.name[0]
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{post.author.name}</h3>
                    {post.author.verified && (
                      <Verified className="h-4 w-4 text-blue-400 fill-current" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{post.author.role}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-500">{post.timestamp}</span>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleCopyLink}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy link
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShare}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in new tab
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleReport}>
                    <Flag className="h-4 w-4 mr-2" />
                    Report post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-4">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-200 leading-relaxed text-base">
                {post.content}
              </p>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Attachments */}
            {post.attachments && post.attachments.length > 0 && (
              <FeedAttachmentPreview attachments={post.attachments} />
            )}
          </div>

          {/* Stats bar */}
          <div className="px-6 py-2 border-t border-gray-700/50 bg-gray-800/30">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {formatNumber(post.stats.views)}
                </span>
                <span>{formatNumber(post.stats.likes)} likes</span>
                <span>{formatNumber(displayStats.replies)} replies</span>
              </div>
              <span>{formatNumber(post.stats.shares)} shares</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="px-6 py-4 border-t border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button
                  onClick={() => handleLike('like')}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-9 px-3 rounded-lg transition-all duration-200",
                    isLiked 
                      ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" 
                      : "text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                  )}
                >
                  <ThumbsUp className={cn("h-4 w-4 mr-2", isLiked && "fill-current")} />
                  <span>{formatNumber(displayStats.likes)}</span>
                </Button>

                <Button
                  onClick={() => handleLike('dislike')}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-9 px-3 rounded-lg transition-all duration-200",
                    isDisliked 
                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
                      : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                  )}
                >
                  <ThumbsDown className={cn("h-4 w-4 mr-2", isDisliked && "fill-current")} />
                  <span>{formatNumber(displayStats.dislikes)}</span>
                </Button>

                <Button
                  onClick={() => setShowComments(!showComments)}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-9 px-3 rounded-lg transition-all duration-200",
                    showComments 
                      ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30" 
                      : "text-gray-400 hover:text-purple-400 hover:bg-purple-500/10"
                  )}
                >
                  <MessageCircle className={cn("h-4 w-4 mr-2", showComments && "fill-current")} />
                  <span>{formatNumber(displayStats.replies)}</span>
                </Button>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  onClick={handleShare}
                  variant="ghost"
                  size="sm"
                  className="h-9 px-3 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-500/10 transition-all duration-200"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  <span>{formatNumber(displayStats.shares)}</span>
                </Button>

                <Button
                  onClick={handleBookmark}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-9 px-3 rounded-lg transition-all duration-200",
                    isBookmarked 
                      ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30" 
                      : "text-gray-400 hover:text-amber-400 hover:bg-amber-500/10"
                  )}
                >
                  <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
                </Button>
              </div>
            </div>
          </div>

          {/* Comments section */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-700/50 bg-gray-800/20"
              >
                <div className="p-6 space-y-4">
                  {/* Comment input */}
                  <RichCommentInput
                    onSubmit={handleComment}
                    placeholder="Share your thoughts..."
                  />

                  {/* Comments list */}
                  <div className="space-y-4">
                    {enhancedComments.slice(0, showAllComments ? undefined : 2).map((comment, index) => (
                      <EnhancedComment
                        key={comment.id}
                        comment={comment}
                        onReactionToggle={handleCommentReact}
                        onReply={handleCommentReply}
                        onToggleCollapse={handleToggleCollapse}
                        delay={index * 0.1}
                      />
                    ))}

                    {/* Show more/less button */}
                    {enhancedComments.length > 2 && (
                      <Button
                        onClick={() => setShowAllComments(!showAllComments)}
                        variant="ghost"
                        size="sm"
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                      >
                        {showAllComments 
                          ? 'Show less' 
                          : `View ${enhancedComments.length - 2} more ${enhancedComments.length === 3 ? 'comment' : 'comments'}`
                        }
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Thread Modal */}
      <ThreadModal
        isOpen={showThreadModal}
        onClose={() => setShowThreadModal(false)}
        threadData={selectedComment ? {
          post: post,
          replies: [],
          stats: {
            totalReplies: 0,
            participants: 1,
            engagementRate: 0
          }
        } : null}
        onReply={(content: string, parentId?: string) => {
          toast({
            title: "Reply added",
            description: "Your reply has been added successfully."
          });
        }}
        onLikeReply={(replyId: string) => {
          toast({
            title: "Reply liked",
            description: "You liked this reply."
          });
        }}
      />
    </div>
  );
};

export default FeedPost;
