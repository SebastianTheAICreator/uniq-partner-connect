
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Post } from './FeedPost';
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Heart,
  Bookmark,
  Eye,
  Clock,
  ChevronDown,
  ChevronUp,
  ZoomIn
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MobileOptimizedPostProps {
  post: Post;
  onLike: (postId: string) => void;
  onDislike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  className?: string;
}

const MobileOptimizedPost = ({
  post,
  onLike,
  onDislike,
  onComment,
  onShare,
  className
}: MobileOptimizedPostProps) => {
  const { toast } = useToast();
  const [showFullContent, setShowFullContent] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const isLongContent = post.content.length > 180; // Shorter for mobile
  const shouldTruncate = isLongContent && !showFullContent;
  
  const displayContent = shouldTruncate
    ? post.content.substring(0, 180) + '...'
    : post.content;

  const handleBookmark = () => {
    toast({
      title: "Post saved",
      description: "Added to your bookmarks",
    });
  };

  const handleImageClick = (imageUrl: string) => {
    setImagePreview(imageUrl);
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10",
          "hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300",
          "shadow-lg overflow-hidden",
          className
        )}
      >
        {/* Pinned indicator */}
        {post.isPinned && (
          <div className="h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500"></div>
        )}
        
        <div className="p-4">
          {/* Mobile-optimized header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative flex-shrink-0">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm",
                  "bg-gradient-to-br from-indigo-500 to-purple-500 ring-2 ring-white/10"
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
                {post.author.verified && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center ring-2 ring-[#1E2235]">
                    <span className="text-[7px] text-white font-bold">✓</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white text-sm truncate">{post.author.name}</span>
                  {post.author.role && (
                    <Badge variant="outline" className="h-4 px-1.5 bg-indigo-500/10 text-indigo-400 border-indigo-500/30 text-xs flex-shrink-0">
                      {post.author.role}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center text-white/50 text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{post.timestamp}</span>
                  <span className="mx-1">•</span>
                  <Eye className="h-3 w-3 mr-1" />
                  <span>{post.stats.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full text-white/50 hover:text-white hover:bg-white/10 flex-shrink-0"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Content - mobile optimized */}
          <div className="mb-4">
            <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
              {displayContent}
            </p>
            
            {isLongContent && (
              <button 
                onClick={() => setShowFullContent(!showFullContent)}
                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium mt-2 flex items-center gap-1 transition-colors"
              >
                {showFullContent ? "Show less" : "Read more"}
                {showFullContent ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </button>
            )}
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/60">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* Mobile optimized attachments */}
          {post.attachments && post.attachments.length > 0 && (
            <div className="mb-4">
              <div className={cn(
                "grid gap-2 rounded-xl overflow-hidden",
                post.attachments.length === 1 && "grid-cols-1",
                post.attachments.length >= 2 && "grid-cols-2",
              )}>
                {post.attachments.slice(0, 4).map((attachment, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden rounded-lg border border-white/10 hover:border-indigo-500/40 transition-all duration-300 cursor-pointer aspect-square"
                    onClick={() => attachment.url && handleImageClick(attachment.url)}
                  >
                    {attachment.type === 'image' && attachment.url ? (
                      <div className="relative w-full h-full">
                        <img
                          src={attachment.url}
                          alt="attachment"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                          <div className="absolute top-1 right-1 bg-black/50 rounded-full p-1">
                            <ZoomIn className="h-3 w-3 text-white" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center p-2 bg-white/[0.02]">
                        <span className="text-xs text-white/70 font-medium text-center break-all line-clamp-2">
                          {attachment.url?.split('/').pop() || 'Attachment'}
                        </span>
                      </div>
                    )}
                    
                    {idx === 3 && post.attachments!.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          +{post.attachments!.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Mobile optimized actions */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(post.id)}
                className={cn(
                  "h-9 px-3 rounded-lg gap-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-all text-xs",
                  post.hasLiked && "text-indigo-400 hover:text-indigo-300 bg-indigo-500/10"
                )}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                <span className="font-medium">{post.stats.likes}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onComment(post.id)}
                className="h-9 px-3 rounded-lg gap-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-all text-xs"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span className="font-medium">{post.stats.replies}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare(post.id)}
                className="h-9 px-3 rounded-lg gap-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-all text-xs"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span className="font-medium">{post.stats.shares}</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className="h-9 w-9 p-0 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <Bookmark className="h-3.5 w-3.5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <Heart className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Full screen image preview */}
      <AnimatePresence>
        {imagePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setImagePreview(null)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={imagePreview}
              alt="Full size preview"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setImagePreview(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileOptimizedPost;
