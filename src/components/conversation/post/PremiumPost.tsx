
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FilePreview } from './types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Heart,
  Bookmark,
  FileVideo,
  FileImage,
  FileText,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

export interface PostData {
  id: string;
  content: string;
  author: PostAuthor;
  timestamp: string;
  stats: PostStats;
  attachments?: FilePreview[];
  hasLiked?: boolean;
  hasDisliked?: boolean;
  isPinned?: boolean;
  isEdited?: boolean;
  tags?: string[];
}

interface PremiumPostProps {
  post: PostData;
  onReplyClick: (postId: string) => void;
  onLikeClick: (postId: string) => void;
  onDislikeClick: (postId: string) => void;
  onShareClick: (postId: string) => void;
  className?: string;
}

const PremiumPost = ({
  post,
  onReplyClick,
  onLikeClick,
  onDislikeClick,
  onShareClick,
  className
}: PremiumPostProps) => {
  const { toast } = useToast();
  const [showFullContent, setShowFullContent] = useState(false);
  
  const isLongContent = post.content.length > 280;
  const shouldTruncate = isLongContent && !showFullContent;
  
  const displayContent = shouldTruncate
    ? post.content.substring(0, 280) + '...'
    : post.content;
    
  const handleBookmark = () => {
    toast({
      title: "Postare salvată",
      description: "Postarea a fost adăugată la favorite",
    });
  };

  const hasAttachments = post.attachments && post.attachments.length > 0;
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "group relative bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10",
        "hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300",
        "shadow-lg hover:shadow-2xl overflow-hidden",
        className
      )}
    >
      {/* Pinned indicator */}
      {post.isPinned && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500"></div>
      )}
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold",
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
                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center ring-2 ring-[#1E2235]">
                  <span className="text-[8px] text-white font-bold">✓</span>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white">{post.author.name}</span>
                {post.author.role && (
                  <Badge variant="outline" className="h-5 px-2 bg-indigo-500/10 text-indigo-400 border-indigo-500/30 text-xs">
                    {post.author.role}
                  </Badge>
                )}
                {post.isPinned && (
                  <Badge className="h-5 px-2 bg-amber-500/20 text-amber-400 text-xs">
                    Fixat
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.timestamp}</span>
                {post.isEdited && (
                  <>
                    <span>•</span>
                    <span>editat</span>
                  </>
                )}
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{post.stats.views}</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-full text-white/50 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="mb-6">
          <p className="text-white/90 text-base leading-relaxed whitespace-pre-wrap">
            {displayContent}
          </p>
          
          {isLongContent && (
            <button 
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-indigo-400 hover:text-indigo-300 text-sm font-medium mt-3 flex items-center gap-1 transition-colors"
            >
              {showFullContent ? "Arată mai puțin" : "Citește mai mult"}
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
                  className="text-xs px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Attachments */}
        {hasAttachments && (
          <div className={cn(
            "mb-6 grid gap-3 rounded-xl overflow-hidden",
            post.attachments.length === 1 && "grid-cols-1",
            post.attachments.length === 2 && "grid-cols-2",
            post.attachments.length >= 3 && "grid-cols-2 md:grid-cols-3",
          )}>
            {post.attachments.map((file, idx) => (
              <div
                key={file.id}
                className={cn(
                  "relative overflow-hidden rounded-lg border border-white/10 hover:border-indigo-500/40",
                  "transition-all duration-300 group/attachment bg-white/[0.02]",
                  file.type === 'image' ? 'aspect-video' : 'aspect-square'
                )}
              >
                {file.type === 'image' && file.preview ? (
                  <div className="relative h-full w-full">
                    <img
                      src={file.preview}
                      alt="attachment"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/attachment:opacity-100 transition-opacity"></div>
                  </div>
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center p-4">
                    {file.type === 'video' ? (
                      <FileVideo className="h-8 w-8 text-purple-400 mb-2" />
                    ) : file.type === 'image' ? (
                      <FileImage className="h-8 w-8 text-indigo-400 mb-2" />
                    ) : (
                      <FileText className="h-8 w-8 text-pink-400 mb-2" />
                    )}
                    <span className="text-xs text-white/70 font-medium text-center break-all line-clamp-2">
                      {file.file.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLikeClick(post.id)}
              className={cn(
                "h-10 px-4 rounded-lg gap-2 text-white/70 hover:text-white hover:bg-white/10 transition-all",
                post.hasLiked && "text-indigo-400 hover:text-indigo-300 bg-indigo-500/10"
              )}
            >
              <ThumbsUp className="h-4 w-4" />
              <span className="font-medium">{post.stats.likes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDislikeClick(post.id)}
              className={cn(
                "h-10 px-4 rounded-lg gap-2 text-white/70 hover:text-white hover:bg-white/10 transition-all",
                post.hasDisliked && "text-red-400 hover:text-red-300 bg-red-500/10"
              )}
            >
              <ThumbsDown className="h-4 w-4" />
              <span className="font-medium">{post.stats.dislikes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReplyClick(post.id)}
              className="h-10 px-4 rounded-lg gap-2 text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="font-medium">{post.stats.replies}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShareClick(post.id)}
              className="h-10 px-4 rounded-lg gap-2 text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <Share2 className="h-4 w-4" />
              <span className="font-medium">{post.stats.shares}</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className="h-10 w-10 p-0 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default PremiumPost;
