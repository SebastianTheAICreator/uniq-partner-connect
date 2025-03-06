
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FilePreview } from './types';
import { Button } from '@/components/ui/button';
import {
  ThumbsUp,
  MessageCircle,
  Heart,
  MoreHorizontal,
  Clock,
  Reply
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import PremiumReplyInput from './PremiumReplyInput';

export interface ReplyAuthor {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  verified?: boolean;
}

export interface ReplyData {
  id: string;
  content: string;
  author: ReplyAuthor;
  timestamp: string;
  parentId: string;
  depth?: number;
  likes: number;
  attachments?: FilePreview[];
  hasLiked?: boolean;
  isEdited?: boolean;
}

interface PremiumReplyProps {
  reply: ReplyData;
  onReplyToReply: (parentId: string, content: string, files: FilePreview[]) => void;
  onLike: (replyId: string) => void;
  className?: string;
}

const PremiumReply = ({
  reply,
  onReplyToReply,
  onLike,
  className
}: PremiumReplyProps) => {
  const [isReplying, setIsReplying] = useState(false);
  
  const handleReply = (parentId: string, content: string, files: FilePreview[]) => {
    onReplyToReply(parentId, content, files);
    setIsReplying(false);
  };
  
  const depth = reply.depth || 1;
  const maxDepth = 5;
  const adjustedDepth = Math.min(depth, maxDepth);
  
  const hasAttachments = reply.attachments && reply.attachments.length > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative pl-5",
        className
      )}
    >
      {/* Connection line */}
      <div 
        className={cn(
          "absolute left-0 top-8 bottom-0 w-px",
          "bg-gradient-to-b from-indigo-500/30 via-purple-500/20 to-transparent"
        )}
      />
      
      {/* Horizontal connector */}
      <div 
        className={cn(
          "absolute left-0 top-8 w-5 h-px",
          "bg-gradient-to-r from-indigo-500/30 to-transparent"
        )}
      />
      
      <div className={cn(
        "w-full rounded-xl overflow-hidden",
        "border border-[#3A4366]/30 hover:border-[#3A4366]/50",
        "shadow-lg transition-all duration-300",
        "bg-gradient-to-b from-[#1E2235]/80 to-[#141625]/90",
        "ml-3"
      )}>
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2.5">
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold text-xs",
                "bg-gradient-to-br from-indigo-500/90 to-purple-500/90"
              )}>
                {reply.author.avatar ? (
                  <img 
                    src={reply.author.avatar} 
                    alt={reply.author.name} 
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  reply.author.name.charAt(0)
                )}
              </div>
              
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-white/90 text-sm">{reply.author.name}</span>
                  {reply.author.verified && (
                    <Badge variant="outline" className="h-4 px-1 bg-blue-500/20 text-blue-400 border-none text-[10px]">
                      Pro
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-white/50 text-xs">
                  <Clock className="h-2.5 w-2.5" />
                  <span>{reply.timestamp}</span>
                  {reply.isEdited && (
                    <>
                      <span>•</span>
                      <span>editat</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 rounded-full text-white/60 hover:text-white hover:bg-white/10"
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="mb-3">
            <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
              {reply.content}
            </p>
          </div>
          
          {/* Attachments */}
          {hasAttachments && (
            <div className={cn(
              "mb-3 grid gap-2",
              reply.attachments.length === 1 && "grid-cols-1",
              reply.attachments.length >= 2 && "grid-cols-2",
            )}>
              {reply.attachments.map((file) => (
                <div
                  key={file.id}
                  className={cn(
                    "overflow-hidden rounded-lg border border-[#3A4366]/30",
                    "transition-all duration-300 group h-24"
                  )}
                >
                  {file.type === 'image' && file.preview ? (
                    <img
                      src={file.preview}
                      alt="attachment"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-[#1A1E30]/50">
                      <span className="text-xs text-white/70 font-medium">
                        {file.file.name}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(reply.id)}
              className={cn(
                "h-7 px-2 rounded-lg gap-1.5 text-white/60 hover:text-white hover:bg-white/10 text-xs",
                reply.hasLiked && "text-indigo-400 hover:text-indigo-300"
              )}
            >
              <ThumbsUp className="h-3 w-3" />
              <span>{reply.likes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReplying(!isReplying)}
              className="h-7 px-2 rounded-lg gap-1.5 text-white/60 hover:text-white hover:bg-white/10 text-xs"
            >
              <Reply className="h-3 w-3" />
              <span>Răspunde</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 rounded-full text-white/60 hover:text-white hover:bg-white/10"
            >
              <Heart className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Reply input */}
      <AnimatePresence>
        {isReplying && (
          <div className="mt-3 ml-6">
            <PremiumReplyInput
              postId={reply.parentId}
              onReply={handleReply}
              onCancel={() => setIsReplying(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PremiumReply;
