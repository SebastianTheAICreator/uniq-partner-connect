
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
  ChevronUp
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
  const [expanded, setExpanded] = useState(false);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "w-full rounded-xl overflow-hidden backdrop-blur-lg transition-all duration-300",
        "border border-[#3A4366]/50 hover:border-[#3A4366]",
        expanded ? "shadow-2xl" : "shadow-xl",
        "bg-gradient-to-b from-[#1E2235]/90 to-[#141625]/95",
        className
      )}
    >
      {/* Top glowing border effect */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm",
              "bg-gradient-to-br from-indigo-500 to-purple-500"
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
                    Pro
                  </Badge>
                )}
                {post.isPinned && (
                  <Badge variant="outline" className="h-5 px-1.5 bg-amber-500/20 text-amber-400 border-none text-xs">
                    Pinned
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-1.5 text-white/50 text-xs mt-0.5">
                <Clock className="h-3 w-3" />
                <span>{post.timestamp}</span>
                {post.isEdited && (
                  <>
                    <span>•</span>
                    <span>editat</span>
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
              className="text-indigo-400 hover:text-indigo-300 text-sm font-medium mt-2 flex items-center gap-1"
            >
              {showFullContent ? "Arată mai puțin" : "Arată mai mult"}
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
                  className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400"
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
            "mb-4 grid gap-3",
            post.attachments.length === 1 && "grid-cols-1",
            post.attachments.length === 2 && "grid-cols-2",
            post.attachments.length >= 3 && "grid-cols-3",
          )}>
            {post.attachments.map((file, idx) => (
              <div
                key={file.id}
                className={cn(
                  "overflow-hidden rounded-lg border border-[#3A4366]/50 hover:border-indigo-500/40",
                  "aspect-square transition-all duration-300 group",
                  file.type === 'image' ? 'col-span-1' : '',
                  idx === 0 && post.attachments.length === 3 ? 'col-span-full sm:col-span-2 sm:row-span-2' : ''
                )}
              >
                {file.type === 'image' && file.preview ? (
                  <div className="relative h-full w-full">
                    <img
                      src={file.preview}
                      alt="attachment"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center p-4 bg-[#1A1E30]/50">
                    {file.type === 'video' ? (
                      <FileVideo className="h-12 w-12 text-purple-400 mb-2" />
                    ) : file.type === 'image' ? (
                      <FileImage className="h-12 w-12 text-indigo-400 mb-2" />
                    ) : (
                      <FileText className="h-12 w-12 text-pink-400 mb-2" />
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
        <div className="flex items-center justify-between pt-4 border-t border-[#3A4366]/30">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLikeClick(post.id)}
              className={cn(
                "h-9 rounded-lg gap-2 text-white/70 hover:text-white hover:bg-white/10",
                post.hasLiked && "text-indigo-400 hover:text-indigo-300"
              )}
            >
              <ThumbsUp className="h-4 w-4" />
              <span className="text-xs font-medium">{post.stats.likes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDislikeClick(post.id)}
              className={cn(
                "h-9 rounded-lg gap-2 text-white/70 hover:text-white hover:bg-white/10",
                post.hasDisliked && "text-red-400 hover:text-red-300"
              )}
            >
              <ThumbsDown className="h-4 w-4" />
              <span className="text-xs font-medium">{post.stats.dislikes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReplyClick(post.id)}
              className="h-9 rounded-lg gap-2 text-white/70 hover:text-white hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs font-medium">{post.stats.replies}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShareClick(post.id)}
              className="h-9 rounded-lg gap-2 text-white/70 hover:text-white hover:bg-white/10"
            >
              <Share2 className="h-4 w-4" />
              <span className="text-xs font-medium">{post.stats.shares}</span>
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
              <Heart className="h-4 w-4" />
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
              className="mt-4 pt-4 border-t border-[#3A4366]/30"
            >
              <div className="text-white/60 text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Publicat pe {new Date().toLocaleDateString('ro-RO', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Vizualizat de {post.stats.views} persoane</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PremiumPost;
