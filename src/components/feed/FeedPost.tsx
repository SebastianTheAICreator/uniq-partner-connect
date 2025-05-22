
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

// Function to get random tag color
const getTagColor = (tag: string) => {
  const colors = [
    'from-blue-500 to-cyan-400',
    'from-purple-500 to-pink-400',
    'from-green-500 to-emerald-400',
    'from-yellow-500 to-orange-400',
    'from-red-500 to-pink-400',
    'from-indigo-500 to-blue-400',
    'from-teal-500 to-green-400',
    'from-amber-500 to-yellow-400',
  ];
  
  // Deterministic color based on tag content
  const index = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};

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
        "border border-gray-700/50",
        "bg-gradient-to-b from-gray-900 to-gray-950",
        expanded ? "shadow-xl shadow-blue-500/5" : "shadow-md shadow-gray-950/50",
        className
      )}
    >
      <div className="p-5">
        {/* Header with vibrant avatar ring */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-4">
            <div className={cn(
              "h-11 w-11 rounded-full flex items-center justify-center bg-gray-800 text-gray-200",
              "ring-2 ring-gradient-to-r from-blue-500 to-purple-500 ring-offset-2 ring-offset-gray-900"
            )}>
              {post.author.avatar ? (
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="h-full w-full object-cover rounded-full" 
                />
              ) : (
                <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
                  {post.author.name.charAt(0)}
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-100">{post.author.name}</span>
                {post.author.verified && (
                  <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-blue-500/30">
                    Verified
                  </Badge>
                )}
                {post.isPinned && (
                  <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border-purple-500/30">
                    Featured
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1">
                {post.author.role && (
                  <>
                    <span className="text-blue-300">{post.author.role}</span>
                    <span className="mx-1 text-gray-500">•</span>
                  </>
                )}
                <span>{post.timestamp}</span>
                {post.isEdited && (
                  <>
                    <span className="mx-1 text-gray-500">•</span>
                    <span className="italic">edited</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-blue-400 hover:bg-blue-900/20"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="mb-5">
          <p className="text-gray-200 whitespace-pre-wrap leading-relaxed text-base">
            {displayContent}
          </p>
          
          {isLongContent && (
            <button 
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-blue-400 hover:text-blue-300 text-sm mt-3 flex items-center gap-1 font-medium"
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
              {post.tags.map((tag, index) => {
                const colorClass = getTagColor(tag);
                return (
                  <span 
                    key={index} 
                    className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${colorClass} bg-clip-text text-transparent border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer`}
                  >
                    #{tag}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Attachments with hover effects */}
        {hasAttachments && (
          <div className="mb-5 overflow-hidden rounded-xl">
            {post.attachments.map((attachment, idx) => (
              <div 
                key={idx} 
                className="relative group aspect-video w-full overflow-hidden rounded-xl border border-gray-700/50"
              >
                {attachment.type === 'image' && (
                  <>
                    <img 
                      src={attachment.url} 
                      alt="attachment" 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-3 right-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-9 w-9 p-0 rounded-full bg-blue-500/20 backdrop-blur-sm text-blue-300 hover:bg-blue-500/30"
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
            <Eye className="h-3.5 w-3.5 text-blue-400" />
            <span>{post.stats.views.toLocaleString()} views</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5 text-purple-400" />
            <span>{post.stats.replies.toLocaleString()} replies</span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="h-3.5 w-3.5 text-green-400" />
            <span>{post.stats.shares.toLocaleString()} shares</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike} 
              className={cn(
                "h-10 rounded-xl text-gray-400 hover:text-blue-400 hover:bg-blue-900/20",
                liked && "text-blue-400 bg-blue-900/20"
              )}
            >
              <ThumbsUp className={`h-4 w-4 mr-2 ${liked ? 'fill-blue-400' : ''}`} />
              <span className="text-xs font-medium">{likeCount.toLocaleString()}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDislike} 
              className={cn(
                "h-10 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-900/20",
                disliked && "text-red-400 bg-red-900/20"
              )}
            >
              <ThumbsDown className={`h-4 w-4 mr-2 ${disliked ? 'fill-red-400' : ''}`} />
              <span className="text-xs font-medium">{dislikeCount.toLocaleString()}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-10 rounded-xl text-gray-400 hover:text-purple-400 hover:bg-purple-900/20"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="text-xs font-medium">Reply</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleShare} 
              className="h-10 rounded-xl text-gray-400 hover:text-green-400 hover:bg-green-900/20"
            >
              <Share2 className="h-4 w-4 mr-2" />
              <span className="text-xs font-medium">Share</span>
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBookmark} 
            className="h-10 w-10 p-0 rounded-full text-gray-400 hover:text-amber-400 hover:bg-amber-900/20"
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
            className="rounded-xl text-xs text-gray-500 hover:text-blue-400 flex items-center gap-1"
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
                  <Clock className="h-3.5 w-3.5 text-blue-400" />
                  <span>Published on {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Eye className="h-3.5 w-3.5 text-purple-400" />
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
