import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Video,
  Download,
  ChevronDown,
  ChevronUp,
  Users,
  TrendingUp
} from 'lucide-react';
import RichCommentInput from './RichCommentInput';
import EnhancedComment from './EnhancedComment';
import FileViewerModal from '@/components/conversation/FileViewerModal';
import { EnhancedComment as CommentType, CommentAttachment } from '@/types/comment';

// Post interface and types remain the same as existing code
export interface PostAuthor {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  verified?: boolean;
}

export interface PostStats {
  likes: number;
  dislikes: number;
  replies: number;
  shares: number;
  views: number;
}

export interface PostAttachment {
  type: 'image' | 'video' | 'document';
  url: string;
  name?: string;
  size?: number;
  preview?: string;
}

export interface SimpleComment {
  id: string;
  content: string;
  author: PostAuthor;
  timestamp: string;
  likes: number;
  hasLiked: boolean;
}

export interface Post {
  id: string;
  content: string;
  author: PostAuthor;
  timestamp: string;
  stats: PostStats;
  tags?: string[];
  attachments?: PostAttachment[];
  isPinned?: boolean;
  comments?: SimpleComment[];
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [viewerFile, setViewerFile] = useState<{
    type: 'image' | 'video' | 'document';
    preview?: string;
    file: File;
  } | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Enhanced comments state
  const [enhancedComments, setEnhancedComments] = useState<CommentType[]>([]);

  // Initialize with mock data for demo purposes
  useEffect(() => {
    if (post.id === '1') {
      setEnhancedComments([
        {
          id: 'ec1',
          content: 'This is an enhanced comment with **rich formatting** and support for *markdown-like* syntax.',
          author: {
            id: 'user5',
            name: 'Elena Petrova',
            avatar: '',
            role: 'Product Designer',
            verified: true
          },
          timestamp: '3 hours ago',
          depth: 0,
          reactions: {
            like: { type: 'like', count: 12, hasReacted: false },
            dislike: { type: 'dislike', count: 1, hasReacted: false }
          },
          attachments: [
            {
              id: 'att1',
              type: 'image',
              url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7',
              name: 'Design Mockup.jpg',
              size: 1024 * 1024 * 2.5,
              previewUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300'
            }
          ],
          isEdited: false,
          replies: [
            {
              id: 'ec2',
              content: 'Great point! I also think we should consider the user experience implications.',
              author: {
                id: 'user6',
                name: 'Marcus Johnson',
                avatar: '',
                role: 'UX Researcher',
                verified: false
              },
              timestamp: '2 hours ago',
              depth: 1,
              reactions: {
                like: { type: 'like', count: 5, hasReacted: true },
                dislike: { type: 'dislike', count: 0, hasReacted: false }
              },
              attachments: [],
              isEdited: false,
              replies: []
            }
          ]
        }
      ]);
    }
  }, [post.id]);

  const handleLike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    }
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Like removed" : "Post liked",
      description: isLiked ? "You've removed your like from this post." : "You've liked this post.",
    });
  };

  const handleDislike = () => {
    if (isLiked) {
      setIsLiked(false);
    }
    setIsDisliked(!isDisliked);
    toast({
      title: isDisliked ? "Dislike removed" : "Post disliked",
      description: isDisliked ? "You've removed your dislike from this post." : "You've disliked this post.",
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Post bookmarked",
      description: isBookmarked 
        ? "This post has been removed from your bookmarks." 
        : "This post has been added to your bookmarks.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Check out this post: ${post.content.substring(0, 50)}...`);
    toast({
      title: "Link copied",
      description: "Post link has been copied to your clipboard.",
    });
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
    if (!showComments) {
      setIsCommenting(false);
    }
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleComment = (content: string, attachments: CommentAttachment[]) => {
    // Create a new enhanced comment
    const newComment: CommentType = {
      id: `ec${Date.now()}`,
      content,
      author: {
        id: 'currentUser',
        name: 'Current User',
        avatar: '',
        verified: true
      },
      timestamp: 'Just now',
      depth: 0,
      reactions: {
        like: { type: 'like', count: 0, hasReacted: false },
        dislike: { type: 'dislike', count: 0, hasReacted: false }
      },
      attachments,
      isEdited: false,
      replies: []
    };

    setEnhancedComments([newComment, ...enhancedComments]);
    setIsCommenting(false);
    toast({
      title: "Comment posted",
      description: "Your comment has been posted successfully.",
    });
  };

  const handleReply = (parentId: string, content: string, attachments: CommentAttachment[]) => {
    // Find the parent comment to reply to
    const updatedComments = enhancedComments.map(comment => {
      if (comment.id === parentId) {
        // Reply to top-level comment
        const newReply: CommentType = {
          id: `reply${Date.now()}`,
          content,
          author: {
            id: 'currentUser',
            name: 'Current User',
            avatar: '',
            verified: true
          },
          timestamp: 'Just now',
          depth: comment.depth + 1,
          parentId: comment.id,
          reactions: {
            like: { type: 'like', count: 0, hasReacted: false },
            dislike: { type: 'dislike', count: 0, hasReacted: false }
          },
          attachments,
          isEdited: false,
          replies: []
        };
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      } else if (comment.replies.length > 0) {
        // Check nested replies
        return {
          ...comment,
          replies: findAndAddReply(comment.replies, parentId, content, attachments, comment.depth + 1)
        };
      }
      return comment;
    });

    setEnhancedComments(updatedComments);
    toast({
      title: "Reply posted",
      description: "Your reply has been posted successfully.",
    });
  };

  // Helper function to find the parent comment in nested replies
  const findAndAddReply = (
    replies: CommentType[],
    parentId: string,
    content: string,
    attachments: CommentAttachment[],
    depth: number
  ): CommentType[] => {
    return replies.map(reply => {
      if (reply.id === parentId) {
        const newReply: CommentType = {
          id: `reply${Date.now()}`,
          content,
          author: {
            id: 'currentUser',
            name: 'Current User',
            avatar: '',
            verified: true
          },
          timestamp: 'Just now',
          depth,
          parentId: reply.id,
          reactions: {
            like: { type: 'like', count: 0, hasReacted: false },
            dislike: { type: 'dislike', count: 0, hasReacted: false }
          },
          attachments,
          isEdited: false,
          replies: []
        };
        return {
          ...reply,
          replies: [...reply.replies, newReply]
        };
      } else if (reply.replies.length > 0) {
        return {
          ...reply,
          replies: findAndAddReply(reply.replies, parentId, content, attachments, depth + 1)
        };
      }
      return reply;
    });
  };

  const handleEditComment = (commentId: string, content: string, attachments: CommentAttachment[]) => {
    const updatedComments = enhancedComments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content,
          attachments,
          isEdited: true,
          editedAt: 'Just now'
        };
      } else if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: findAndEditComment(comment.replies, commentId, content, attachments)
        };
      }
      return comment;
    });

    setEnhancedComments(updatedComments);
    toast({
      title: "Comment updated",
      description: "Your comment has been updated successfully.",
    });
  };

  // Helper function to find and edit a comment in nested replies
  const findAndEditComment = (
    replies: CommentType[],
    commentId: string,
    content: string,
    attachments: CommentAttachment[]
  ): CommentType[] => {
    return replies.map(reply => {
      if (reply.id === commentId) {
        return {
          ...reply,
          content,
          attachments,
          isEdited: true,
          editedAt: 'Just now'
        };
      } else if (reply.replies.length > 0) {
        return {
          ...reply,
          replies: findAndEditComment(reply.replies, commentId, content, attachments)
        };
      }
      return reply;
    });
  };

  const handleDeleteComment = (commentId: string) => {
    // Filter out the deleted comment from top-level comments
    const updatedComments = enhancedComments.filter(comment => comment.id !== commentId);
    
    // Also check for the comment in nested replies
    const updatedWithNestedDeleted = updatedComments.map(comment => {
      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: removeCommentFromReplies(comment.replies, commentId)
        };
      }
      return comment;
    });

    setEnhancedComments(updatedWithNestedDeleted);
    toast({
      title: "Comment deleted",
      description: "Your comment has been deleted successfully.",
    });
  };

  // Helper function to remove a comment from nested replies
  const removeCommentFromReplies = (replies: CommentType[], commentId: string): CommentType[] => {
    const filteredReplies = replies.filter(reply => reply.id !== commentId);
    return filteredReplies.map(reply => {
      if (reply.replies.length > 0) {
        return {
          ...reply,
          replies: removeCommentFromReplies(reply.replies, commentId)
        };
      }
      return reply;
    });
  };

  const handleReactionToggle = (commentId: string, reactionType: 'like' | 'dislike') => {
    const updatedComments = enhancedComments.map(comment => {
      if (comment.id === commentId) {
        return updateCommentReaction(comment, reactionType);
      } else if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateRepliesReaction(comment.replies, commentId, reactionType)
        };
      }
      return comment;
    });

    setEnhancedComments(updatedComments);
  };

  // Helper function to update a comment's reaction
  const updateCommentReaction = (comment: CommentType, reactionType: 'like' | 'dislike'): CommentType => {
    const oppositeType = reactionType === 'like' ? 'dislike' : 'like';
    
    // If already reacted with this type, remove the reaction
    if (comment.reactions[reactionType].hasReacted) {
      return {
        ...comment,
        reactions: {
          ...comment.reactions,
          [reactionType]: {
            ...comment.reactions[reactionType],
            count: comment.reactions[reactionType].count - 1,
            hasReacted: false
          }
        }
      };
    }
    
    // If reacted with opposite type, remove that and add this one
    const oppositeReaction = comment.reactions[oppositeType].hasReacted
      ? {
          ...comment.reactions[oppositeType],
          count: comment.reactions[oppositeType].count - 1,
          hasReacted: false
        }
      : comment.reactions[oppositeType];
    
    return {
      ...comment,
      reactions: {
        like: reactionType === 'like' ? {
          ...comment.reactions.like,
          count: comment.reactions.like.count + 1,
          hasReacted: true
        } : oppositeReaction,
        dislike: reactionType === 'dislike' ? {
          ...comment.reactions.dislike,
          count: comment.reactions.dislike.count + 1,
          hasReacted: true
        } : (reactionType === 'like' ? oppositeReaction : comment.reactions.dislike)
      }
    };
  };

  // Helper function to update reactions in nested replies
  const updateRepliesReaction = (
    replies: CommentType[],
    commentId: string,
    reactionType: 'like' | 'dislike'
  ): CommentType[] => {
    return replies.map(reply => {
      if (reply.id === commentId) {
        return updateCommentReaction(reply, reactionType);
      } else if (reply.replies.length > 0) {
        return {
          ...reply,
          replies: updateRepliesReaction(reply.replies, commentId, reactionType)
        };
      }
      return reply;
    });
  };

  const handleToggleCollapse = (commentId: string) => {
    const updatedComments = enhancedComments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isCollapsed: !comment.isCollapsed
        };
      } else if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: toggleCollapseInReplies(comment.replies, commentId)
        };
      }
      return comment;
    });

    setEnhancedComments(updatedComments);
  };

  // Helper function to toggle collapse state in nested replies
  const toggleCollapseInReplies = (replies: CommentType[], commentId: string): CommentType[] => {
    return replies.map(reply => {
      if (reply.id === commentId) {
        return {
          ...reply,
          isCollapsed: !reply.isCollapsed
        };
      } else if (reply.replies.length > 0) {
        return {
          ...reply,
          replies: toggleCollapseInReplies(reply.replies, commentId)
        };
      }
      return reply;
    });
  };

  const handleAttachmentView = (attachment: CommentAttachment) => {
    if (attachment.type === 'image' || attachment.type === 'document') {
      // Create a File object from the attachment URL for the modal
      fetch(attachment.url)
        .then(response => response.blob())
        .then(blob => {
          const file = new File([blob], attachment.name || 'file', { type: blob.type });
          setViewerFile({
            type: attachment.type as 'image' | 'video' | 'document',
            preview: attachment.previewUrl || attachment.url,
            file: file
          });
          setIsViewerOpen(true);
        })
        .catch(error => {
          console.error('Error loading file:', error);
          toast({
            title: "Error",
            description: "Could not load the file for viewing.",
            variant: "destructive"
          });
        });
    } else if (attachment.type === 'link') {
      window.open(attachment.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setViewerFile(null);
  };

  // Determine if content should be truncated
  const shouldTruncate = post.content.length > 280 && !isExpanded;
  const truncatedContent = shouldTruncate 
    ? `${post.content.substring(0, 280)}...` 
    : post.content;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={cn("group relative", className)}
      >
        {/* Pinned indicator */}
        {post.isPinned && (
          <div className="absolute -left-4 top-4 flex items-center">
            <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <div className="ml-2 bg-blue-500/10 text-blue-400 text-xs px-2 py-1 rounded-full flex items-center">
              <Pin className="h-3 w-3 mr-1" />
              Pinned
            </div>
          </div>
        )}

        {/* Post card with gradient border */}
        <div className={cn(
          "bg-gray-800/30 rounded-xl p-6 border border-gray-700/30",
          "hover:border-gray-600/50 transition-all duration-300",
          "relative overflow-hidden"
        )}>
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5 pointer-events-none"></div>
          
          {/* Post header with author info */}
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-bold flex items-center justify-center">
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  post.author.name.charAt(0)
                )}
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-200">
                    {post.author.name}
                  </span>
                  {post.author.verified && (
                    <Badge className="bg-blue-500/20 text-blue-300 text-xs px-1.5 py-0">
                      ✓
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {post.author.role && (
                    <span className="text-xs text-blue-400">
                      {post.author.role}
                    </span>
                  )}
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.timestamp}
                  </div>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Post content */}
          <div className="mb-4 relative z-10">
            <p className="text-gray-200 whitespace-pre-wrap">
              {truncatedContent}
            </p>
            
            {shouldTruncate && (
              <Button
                variant="link"
                size="sm"
                onClick={handleToggleExpand}
                className="text-blue-400 hover:text-blue-300 p-0 h-auto mt-1"
              >
                Read more
              </Button>
            )}
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 border-gray-600/30 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Post attachments */}
          {post.attachments && post.attachments.length > 0 && (
            <div className="mb-4 relative z-10">
              <div className="grid grid-cols-1 gap-2">
                {post.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden border border-gray-700/50 bg-gray-800/50"
                  >
                    {attachment.type === 'image' && (
                      <div className="relative group/image">
                        <img
                          src={attachment.url}
                          alt={attachment.name || 'Image attachment'}
                          className="w-full h-auto max-h-[400px] object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-black/50 text-white border-white/20"
                            onClick={() => {
                              // Create a File object for the viewer
                              fetch(attachment.url)
                                .then(response => response.blob())
                                .then(blob => {
                                  const file = new File([blob], attachment.name || 'image', { type: blob.type });
                                  setViewerFile({
                                    type: 'image',
                                    preview: attachment.url,
                                    file: file
                                  });
                                  setIsViewerOpen(true);
                                });
                            }}
                          >
                            <ImageIcon className="h-4 w-4 mr-2" />
                            View Full Image
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {attachment.type === 'video' && (
                      <div className="relative">
                        <video
                          controls
                          className="w-full h-auto max-h-[400px]"
                          src={attachment.url}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                    
                    {attachment.type === 'document' && (
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-blue-500/20 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200">
                              {attachment.name || 'Document'}
                            </p>
                            {attachment.size && (
                              <p className="text-xs text-gray-400">
                                {(attachment.size / 1024).toFixed(1)} KB
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300"
                          onClick={() => {
                            const a = document.createElement('a');
                            a.href = attachment.url;
                            a.download = attachment.name || 'document';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                          }}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Post stats */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Heart className="h-3 w-3 mr-1 text-red-400" />
                {post.stats.likes.toLocaleString()}
              </div>
              
              <div className="flex items-center">
                <ThumbsDown className="h-3 w-3 mr-1" />
                {post.stats.dislikes.toLocaleString()}
              </div>
              
              <div className="flex items-center">
                <MessageCircle className="h-3 w-3 mr-1" />
                {post.stats.replies.toLocaleString()}
              </div>
            </div>
            
            <div className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {post.stats.views.toLocaleString()} views
            </div>
          </div>
          
          {/* Action buttons */}
          <Separator className="mb-4 bg-gray-700/30" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={cn(
                  "rounded-lg",
                  isLiked
                    ? "text-red-400 bg-red-900/20"
                    : "text-gray-400 hover:text-red-400 hover:bg-red-900/10"
                )}
              >
                <Heart className={cn("h-4 w-4 mr-2", isLiked && "fill-red-400")} />
                Like
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDislike}
                className={cn(
                  "rounded-lg",
                  isDisliked
                    ? "text-orange-400 bg-orange-900/20"
                    : "text-gray-400 hover:text-orange-400 hover:bg-orange-900/10"
                )}
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                Dislike
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleComments}
                className={cn(
                  "rounded-lg",
                  showComments
                    ? "text-blue-400 bg-blue-900/20"
                    : "text-gray-400 hover:text-blue-400 hover:bg-blue-900/10"
                )}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Comment
                {post.stats.replies > 0 && (
                  <span className="ml-1 text-xs">({post.stats.replies})</span>
                )}
              </Button>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="rounded-lg text-gray-400 hover:text-purple-400 hover:bg-purple-900/10"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className={cn(
                  "rounded-lg",
                  isBookmarked
                    ? "text-green-400 bg-green-900/20"
                    : "text-gray-400 hover:text-green-400 hover:bg-green-900/10"
                )}
              >
                <Bookmark className={cn("h-4 w-4 mr-2", isBookmarked && "fill-green-400")} />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-700/50 pt-6"
            >
              {/* Comment Input */}
              <div className="mb-6">
                <RichCommentInput
                  onSubmit={handleComment}
                  placeholder="Share your thoughts..."
                />
              </div>

              {/* Enhanced Comments List */}
              {enhancedComments.length > 0 && (
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Enhanced Comments ({enhancedComments.length})
                  </h4>
                  {enhancedComments.map((comment) => (
                    <EnhancedComment
                      key={comment.id}
                      comment={comment}
                      onReply={handleReply}
                      onEdit={handleEditComment}
                      onDelete={handleDeleteComment}
                      onReactionToggle={handleReactionToggle}
                      onToggleCollapse={handleToggleCollapse}
                      onAttachmentView={handleAttachmentView}
                    />
                  ))}
                </div>
              )}

              {/* Legacy Comments */}
              {post.comments && post.comments.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Comments ({post.comments.length})
                  </h4>
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-300">
                          {comment.author.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-200 text-sm">
                              {comment.author.name}
                            </span>
                            <span className="text-xs text-gray-400">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mt-1">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 ml-11">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "h-6 px-2 text-xs",
                            comment.hasLiked
                              ? "text-blue-400"
                              : "text-gray-400 hover:text-blue-400"
                          )}
                        >
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {comment.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-gray-400 hover:text-purple-400"
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* File Viewer Modal */}
      <FileViewerModal
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        file={viewerFile}
      />
    </>
  );
};

export default FeedPost;
