
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Bookmark,
  Heart,
  Clock,
  Eye,
  Award,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';

export interface PostAuthor {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
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
  previewUrl?: string;
}

export interface Post {
  id: string;
  content: string;
  author: PostAuthor;
  timestamp: string;
  stats: PostStats;
  attachments?: PostAttachment[];
  hasLiked?: boolean;
  hasDisliked?: boolean;
  isPinned?: boolean;
  isEdited?: boolean;
  tags?: string[];
}

interface FeedPostProps {
  post: Post;
  className?: string;
  delay?: number;
}

const FeedPost = ({ post, className, delay = 0 }: FeedPostProps) => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [liked, setLiked] = useState(post.hasLiked || false);
  const [disliked, setDisliked] = useState(post.hasDisliked || false);
  const [likeCount, setLikeCount] = useState(post.stats.likes);
  const [dislikeCount, setDislikeCount] = useState(post.stats.dislikes);
  
  const isLongContent = post.content.length > 280;
  const shouldTruncate = isLongContent && !showFullContent;
  
  const displayContent = shouldTruncate
    ? post.content.substring(0, 280) + '...'
    : post.content;
    
  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
      if (disliked) {
        setDisliked(false);
        setDislikeCount(prev => prev - 1);
      }
    }
  };
  
  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setDislikeCount(prev => prev - 1);
    } else {
      setDisliked(true);
      setDislikeCount(prev => prev + 1);
      if (liked) {
        setLiked(false);
        setLikeCount(prev => prev - 1);
      }
    }
  };

  const handleBookmark = () => {
    toast({
      title: "Post saved",
      description: "This post has been added to your bookmarks",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`https://app.domain.com/post/${post.id}`);
    toast({
      title: "Link copied",
      description: "Post link has been copied to clipboard",
    });
  };

  const hasAttachments = post.attachments && post.attachments.length > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "w-full rounded-xl overflow-hidden backdrop-blur-lg transition-all duration-300",
        "border border-[#2a2f45]/50 hover:border-[#2a3154]",
        expanded ? "shadow-2xl" : "shadow-xl",
        "bg-gradient-to-b from-[#1c1f2e]/90 to-[#141625]/95",
        className
      )}
    >
      {/* Top glowing border effect */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm",
              "bg-gradient-to-br from-blue-500 to-purple-500"
            )}>
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
                <span className="font-medium text-white/90">{post.author.name}</span>
                {post.author.verified && (
                  <Badge variant="outline" className="h-5 px-1.5 bg-blue-500/20 text-blue-400 border-none text-xs">
                    Verified
                  </Badge>
                )}
                {post.isPinned && (
                  <Badge variant="outline" className="h-5 px-1.5 bg-amber-500/20 text-amber-400 border-none text-xs">
                    Featured
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-1.5 text-white/50 text-xs mt-0.5">
                {post.author.role && (
                  <>
                    <span>{post.author.role}</span>
                    <span className="mx-1">•</span>
                  </>
                )}
                <Clock className="h-3 w-3" />
                <span>{post.timestamp}</span>
                {post.isEdited && (
                  <>
                    <span>•</span>
                    <span>edited</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full text-white/70 hover:text-white hover:bg-white/10"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="mb-4">
          <p className="text-white/90 whitespace-pre-wrap leading-relaxed">
            {displayContent}
          </p>
          
          {isLongContent && (
            <button 
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-2 flex items-center gap-1"
            >
              {showFullContent ? "Show less" : "Show more"}
              {showFullContent ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Attachments */}
        {hasAttachments && (
          <div className="mb-4 grid gap-3">
            {post.attachments.map((attachment, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden border border-[#2a2f45]/50 hover:border-blue-500/40 transition-all duration-300 group"
              >
                {attachment.type === 'image' && (
                  <div className="relative h-full w-full">
                    <img
                      src={attachment.url}
                      alt="attachment"
                      className="h-full w-full object-cover max-h-[400px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 right-0 p-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#2a2f45]/30">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "h-9 rounded-lg gap-2 text-white/70 hover:text-white hover:bg-white/10",
                liked && "text-blue-400 hover:text-blue-300"
              )}
            >
              <ThumbsUp className="h-4 w-4" />
              <span className="text-xs font-medium">{likeCount.toLocaleString()}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDislike}
              className={cn(
                "h-9 rounded-lg gap-2 text-white/70 hover:text-white hover:bg-white/10",
                disliked && "text-red-400 hover:text-red-300"
              )}
            >
              <ThumbsDown className="h-4 w-4" />
              <span className="text-xs font-medium">{dislikeCount.toLocaleString()}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-9 rounded-lg gap-2 text-white/70 hover:text-white hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs font-medium">{post.stats.replies.toLocaleString()}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="h-9 rounded-lg gap-2 text-white/70 hover:text-white hover:bg-white/10"
            >
              <Share2 className="h-4 w-4" />
              <span className="text-xs font-medium">{post.stats.shares.toLocaleString()}</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className="h-9 w-9 p-0 rounded-full text-white/70 hover:text-white hover:bg-white/10"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 rounded-full text-white/70 hover:text-white hover:bg-white/10"
            >
              <Award className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-[#2a2f45]/30"
            >
              <div className="text-white/60 text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Published on {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Eye className="h-3.5 w-3.5" />
                  <span>Viewed by {post.stats.views.toLocaleString()} people</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FeedPost;
