
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, MessageCircle, Users, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThreadReply } from './ThreadModal';

interface ThreadPreviewProps {
  replies: ThreadReply[];
  totalReplies: number;
  participants: number;
  onViewFull: () => void;
  className?: string;
}

const ThreadPreview = ({
  replies,
  totalReplies,
  participants,
  onViewFull,
  className
}: ThreadPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewReplies = replies.slice(0, 3);
  const hasMore = totalReplies > 3;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className={cn(
        "border-t border-gray-800/50 bg-gray-800/20 rounded-b-xl overflow-hidden",
        className
      )}
    >
      {/* Thread stats header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-blue-900/20 text-blue-300 border-blue-500/30 text-xs">
              <MessageCircle className="h-3 w-3 mr-1" />
              {totalReplies} replies
            </Badge>
            <Badge variant="outline" className="bg-purple-900/20 text-purple-300 border-purple-500/30 text-xs">
              <Users className="h-3 w-3 mr-1" />
              {participants} people
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {hasMore && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-7 px-2 text-xs text-gray-400 hover:text-gray-200"
              >
                {isExpanded ? (
                  <>Show less <ChevronUp className="h-3 w-3 ml-1" /></>
                ) : (
                  <>Show {totalReplies - 3} more <ChevronDown className="h-3 w-3 ml-1" /></>
                )}
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewFull}
              className="h-7 px-3 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 transition-all duration-200"
            >
              View thread
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Reply previews */}
      <div className="px-4 pb-4">
        <div className="space-y-3">
          {previewReplies.map((reply, index) => (
            <motion.div
              key={reply.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-colors cursor-pointer"
              onClick={onViewFull}
            >
              <div className="h-6 w-6 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-bold flex-shrink-0">
                {reply.author.name.charAt(0)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-200 truncate">
                    {reply.author.name}
                  </span>
                  {reply.author.verified && (
                    <Badge className="bg-blue-500/20 text-blue-300 text-xs px-1 py-0">✓</Badge>
                  )}
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="h-2 w-2" />
                    {reply.timestamp}
                  </span>
                </div>
                
                <p className="text-sm text-gray-300 line-clamp-2">
                  {reply.content}
                </p>
                
                {reply.likes > 0 && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                    <span>{reply.likes} likes</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Show more replies when expanded */}
          <AnimatePresence>
            {isExpanded && hasMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                {replies.slice(3).map((reply, index) => (
                  <motion.div
                    key={reply.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition-colors cursor-pointer"
                    onClick={onViewFull}
                  >
                    <div className="h-6 w-6 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-bold flex-shrink-0">
                      {reply.author.name.charAt(0)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-200 truncate">
                          {reply.author.name}
                        </span>
                        {reply.author.verified && (
                          <Badge className="bg-blue-500/20 text-blue-300 text-xs px-1 py-0">✓</Badge>
                        )}
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="h-2 w-2" />
                          {reply.timestamp}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-300 line-clamp-2">
                        {reply.content}
                      </p>
                      
                      {reply.likes > 0 && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                          <span>{reply.likes} likes</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ThreadPreview;
