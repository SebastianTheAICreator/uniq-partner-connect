
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, MoreHorizontal, Bookmark, Eye, Clock, ChevronDown, ChevronUp, ExternalLink, Heart, Play } from 'lucide-react';

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

// Enhanced tag color function with more vibrant gradients
const getTagColor = (tag: string) => {
  const colors = [
    'from-blue-500 via-cyan-400 to-teal-400',
    'from-purple-500 via-pink-400 to-rose-400',
    'from-green-500 via-emerald-400 to-cyan-400',
    'from-yellow-500 via-orange-400 to-red-400',
    'from-red-500 via-pink-400 to-purple-400',
    'from-indigo-500 via-blue-400 to-cyan-400',
    'from-teal-500 via-green-400 to-emerald-400',
    'from-amber-500 via-yellow-400 to-orange-400',
  ];
  
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
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.stats.likes);
  const [dislikeCount, setDislikeCount] = useState(post.stats.dislikes);
  const [isHovered, setIsHovered] = useState(false);
  
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
      toast({
        title: "Post liked!",
        description: "You liked this post."
      });
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
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Bookmark removed" : "Post bookmarked",
      description: bookmarked ? "Post removed from your bookmarks" : "This post has been added to your bookmarks"
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(`https://app.domain.com/post/${post.id}`);
    toast({
      title: "Link copied!",
      description: "Post link has been copied to clipboard"
    });
  };
  
  const hasAttachments = post.attachments && post.attachments.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "w-full rounded-2xl overflow-hidden transition-all duration-500 group",
        "border border-gray-700/30 hover:border-blue-500/20",
        "bg-gradient-to-br from-gray-900/90 via-gray-900 to-gray-950/90",
        "backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/5",
        "transform hover:scale-[1.01] hover:-translate-y-1",
        className
      )}
    >
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse" />
      </div>
      
      <div className="relative p-6">
        {/* Enhanced header with glowing avatar */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center bg-gray-800 text-gray-200",
                "ring-2 ring-offset-2 ring-offset-gray-900 transition-all duration-300",
                isHovered ? "ring-blue-500/50 shadow-lg shadow-blue-500/25" : "ring-gray-700/50"
              )}>
                {post.author.avatar ? (
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="h-full w-full object-cover rounded-full" 
                  />
                ) : (
                  <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                    {post.author.name.charAt(0)}
                  </div>
                )}
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse" />
            </motion.div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-100 text-lg">{post.author.name}</span>
                {post.author.verified && (
                  <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-blue-500/40 animate-pulse">
                    ✓ Verified
                  </Badge>
                )}
                {post.isPinned && (
                  <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 hover:bg-purple-500/30 border-purple-500/40">
                    📌 Featured
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                {post.author.role && (
                  <>
                    <span className="text-blue-400 font-medium">{post.author.role}</span>
                    <span className="text-gray-500">•</span>
                  </>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.timestamp}
                </span>
                {post.isEdited && (
                  <>
                    <span className="text-gray-500">•</span>
                    <span className="italic text-gray-500">edited</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 w-9 p-0 rounded-full text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 transition-all duration-200"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Enhanced content with better typography */}
        <div className="mb-6">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-200 whitespace-pre-wrap leading-relaxed text-base font-light tracking-wide">
              {displayContent}
            </p>
          </div>
          
          {isLongContent && (
            <motion.button 
              onClick={() => setShowFullContent(!showFullContent)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-blue-400 hover:text-blue-300 text-sm mt-4 flex items-center gap-2 font-medium transition-colors duration-200"
            >
              {showFullContent ? "Show less" : "Read more"}
              <motion.div
                animate={{ rotate: showFullContent ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </motion.button>
          )}
          
          {/* Enhanced tags with gradient backgrounds */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {post.tags.map((tag, index) => {
                const colorClass = getTagColor(tag);
                return (
                  <motion.span 
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -1 }}
                    className={cn(
                      "text-xs px-3 py-1.5 rounded-full font-medium",
                      "bg-gradient-to-r", colorClass,
                      "text-white shadow-lg hover:shadow-xl",
                      "border border-white/20 hover:border-white/40",
                      "cursor-pointer transition-all duration-200"
                    )}
                  >
                    #{tag}
                  </motion.span>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Enhanced media attachments with better previews */}
        {hasAttachments && (
          <div className="mb-6">
            {post.attachments!.map((attachment, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative group aspect-video w-full overflow-hidden rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300"
              >
                {attachment.type === 'image' && (
                  <>
                    <img 
                      src={attachment.url} 
                      alt="attachment" 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div className="text-white">
                          <p className="text-sm font-medium">High resolution image</p>
                          <p className="text-xs text-gray-300">Click to view full size</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-10 w-10 p-0 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
                
                {attachment.type === 'video' && (
                  <>
                    <div className="h-full w-full bg-gray-800 flex items-center justify-center">
                      <div className="text-center text-gray-300">
                        <Play className="h-16 w-16 mx-auto mb-2 text-blue-400" />
                        <p className="text-sm">Video content</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        variant="ghost" 
                        size="lg" 
                        className="h-16 w-16 p-0 rounded-full bg-blue-500/80 text-white hover:bg-blue-500 backdrop-blur-sm"
                      >
                        <Play className="h-8 w-8 ml-1" />
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Enhanced interaction stats with icons and colors */}
        <div className="flex items-center gap-6 text-sm text-gray-400 mb-5 p-3 rounded-xl bg-gray-800/30">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05, color: "#60a5fa" }}
          >
            <Eye className="h-4 w-4 text-blue-400" />
            <span className="font-medium">{post.stats.views.toLocaleString()}</span>
            <span className="text-xs">views</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05, color: "#a855f7" }}
          >
            <MessageCircle className="h-4 w-4 text-purple-400" />
            <span className="font-medium">{post.stats.replies.toLocaleString()}</span>
            <span className="text-xs">replies</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05, color: "#10b981" }}
          >
            <Share2 className="h-4 w-4 text-green-400" />
            <span className="font-medium">{post.stats.shares.toLocaleString()}</span>
            <span className="text-xs">shares</span>
          </motion.div>
        </div>
        
        {/* Enhanced action buttons with better animations */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
          <div className="flex items-center gap-1">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLike} 
                className={cn(
                  "h-11 px-4 rounded-xl text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 transition-all duration-200",
                  liked && "text-blue-400 bg-blue-900/20 shadow-lg shadow-blue-500/10"
                )}
              >
                <motion.div
                  animate={{ scale: liked ? [1, 1.3, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ThumbsUp className={`h-4 w-4 mr-2 ${liked ? 'fill-blue-400' : ''}`} />
                </motion.div>
                <span className="text-sm font-medium">{likeCount.toLocaleString()}</span>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleDislike} 
                className={cn(
                  "h-11 px-4 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-all duration-200",
                  disliked && "text-red-400 bg-red-900/20 shadow-lg shadow-red-500/10"
                )}
              >
                <ThumbsDown className={`h-4 w-4 mr-2 ${disliked ? 'fill-red-400' : ''}`} />
                <span className="text-sm font-medium">{dislikeCount.toLocaleString()}</span>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-11 px-4 rounded-xl text-gray-400 hover:text-purple-400 hover:bg-purple-900/20 transition-all duration-200"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Reply</span>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShare} 
                className="h-11 px-4 rounded-xl text-gray-400 hover:text-green-400 hover:bg-green-900/20 transition-all duration-200"
              >
                <Share2 className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Share</span>
              </Button>
            </motion.div>
          </div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBookmark} 
              className={cn(
                "h-11 w-11 p-0 rounded-full text-gray-400 hover:text-amber-400 hover:bg-amber-900/20 transition-all duration-200",
                bookmarked && "text-amber-400 bg-amber-900/20 shadow-lg shadow-amber-500/10"
              )}
            >
              <motion.div
                animate={{ scale: bookmarked ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-amber-400' : ''}`} />
              </motion.div>
            </Button>
          </motion.div>
        </div>
        
        {/* Enhanced expandable details */}
        <AnimatePresence>
          {expanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 pt-4 border-t border-gray-800/50"
            >
              <div className="text-gray-400 text-sm space-y-4 bg-gray-800/20 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span className="font-medium">Published on {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Eye className="h-4 w-4 text-purple-400" />
                  <span className="font-medium">Viewed by {post.stats.views.toLocaleString()} people in the last 24 hours</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Heart className="h-4 w-4 text-pink-400" />
                  <span className="font-medium">Engagement rate: {Math.round((post.stats.likes + post.stats.replies) / post.stats.views * 100)}%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Enhanced toggle button */}
        <div className="mt-4 flex justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="rounded-xl text-sm text-gray-500 hover:text-blue-400 flex items-center gap-2 hover:bg-blue-900/10 transition-all duration-200"
            >
              {expanded ? "Show less details" : "Show more details"}
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeedPost;
