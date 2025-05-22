
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, MoreHorizontal, Bookmark, Eye, Clock, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

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

const FeedPost = ({
  post,
  className,
  delay = 0
}: FeedPostProps) => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [liked, setLiked] = useState(post.hasLiked || false);
  const [disliked, setDisliked] = useState(post.hasDisliked || false);
  const [likeCount, setLikeCount] = useState(post.stats.likes);
  const [dislikeCount, setDislikeCount] = useState(post.stats.dislikes);
  
  const isLongContent = post.content.length > 280;
  const shouldTruncate = isLongContent && !showFullContent;
  const displayContent = shouldTruncate ? post.content.substring(0, 280) + '...' : post.content;
  
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
      description: "This post has been added to your bookmarks"
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(`https://app.domain.com/post/${post.id}`);
    toast({
      title: "Link copied",
      description: "Post link has been copied to clipboard"
    });
  };
  
  const hasAttachments = post.attachments && post.attachments.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "w-full rounded-2xl overflow-hidden transition-all duration-300",
        "border border-gray-800",
        "bg-gradient-to-b from-gray-900 to-gray-950",
        expanded ? "shadow-lg shadow-gray-950" : "shadow-md shadow-gray-950/50",
        className
      )}
    >
      <div className="p-5">
        {/* Header - Simplified, modern design */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-4">
            <div className={cn(
              "h-11 w-11 rounded-full flex items-center justify-center bg-gray-800 text-gray-200",
              "ring-2 ring-gray-700 ring-offset-2 ring-offset-gray-900"
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
                <span className="font-semibold text-gray-100">{post.author.name}</span>
                {post.author.verified && (
                  <Badge className="bg-gray-700 text-gray-200 hover:bg-gray-600">
                    Verified
                  </Badge>
                )}
                {post.isPinned && (
                  <Badge className="bg-gray-600 text-gray-300 hover:bg-gray-500">
                    Featured
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1">
                {post.author.role && (
                  <>
                    <span>{post.author.role}</span>
                    <span className="mx-1">•</span>
                  </>
                )}
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
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-100 hover:bg-gray-800"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Content - Clean typography */}
        <div className="mb-5">
          <p className="text-gray-200 whitespace-pre-wrap leading-relaxed text-base">
            {displayContent}
          </p>
          
          {isLongContent && (
            <button 
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-gray-400 hover:text-gray-200 text-sm mt-3 flex items-center gap-1 font-medium"
            >
              {showFullContent ? "Show less" : "Show more"}
              {showFullContent ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Attachments - Modern card design */}
        {hasAttachments && (
          <div className="mb-5 overflow-hidden rounded-xl">
            {post.attachments.map((attachment, idx) => (
              <div 
                key={idx} 
                className="relative group aspect-video w-full overflow-hidden rounded-xl border border-gray-800"
              >
                {attachment.type === 'image' && (
                  <>
                    <img 
                      src={attachment.url} 
                      alt="attachment" 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-3 right-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-9 w-9 p-0 rounded-full bg-gray-800/80 backdrop-blur-sm text-gray-200 hover:bg-gray-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Interaction stats */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            <span>{post.stats.views.toLocaleString()} views</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            <span>{post.stats.replies.toLocaleString()} replies</span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="h-3.5 w-3.5" />
            <span>{post.stats.shares.toLocaleString()} shares</span>
          </div>
        </div>
        
        {/* Actions - Sleek minimal action bar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800/70">
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike} 
              className={cn(
                "h-10 rounded-xl text-gray-400 hover:text-gray-200 hover:bg-gray-800/70",
                liked && "text-gray-100 bg-gray-800/50"
              )}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              <span className="text-xs font-medium">{likeCount.toLocaleString()}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDislike} 
              className={cn(
                "h-10 rounded-xl text-gray-400 hover:text-gray-200 hover:bg-gray-800/70",
                disliked && "text-gray-100 bg-gray-800/50"
              )}
            >
              <ThumbsDown className="h-4 w-4 mr-2" />
              <span className="text-xs font-medium">{dislikeCount.toLocaleString()}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-10 rounded-xl text-gray-400 hover:text-gray-200 hover:bg-gray-800/70"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="text-xs font-medium">Reply</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleShare} 
              className="h-10 rounded-xl text-gray-400 hover:text-gray-200 hover:bg-gray-800/70"
            >
              <Share2 className="h-4 w-4 mr-2" />
              <span className="text-xs font-medium">Share</span>
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBookmark} 
            className="h-10 w-10 p-0 rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-800/70"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Toggle more post details */}
        <div className="mt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="rounded-xl text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1"
          >
            {expanded ? "Show less" : "Show more"}
            {expanded ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
        
        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-800/50"
            >
              <div className="text-gray-400 text-xs space-y-3">
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
