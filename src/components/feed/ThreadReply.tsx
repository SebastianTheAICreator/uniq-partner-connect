
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, MessageCircle, MoreHorizontal, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThreadReply as ThreadReplyType } from './ThreadModal';

interface ThreadReplyProps {
  reply: ThreadReplyType;
  onLike: () => void;
  onReply: () => void;
  isReplying: boolean;
  depth?: number;
}

const ThreadReply = ({
  reply,
  onLike,
  onReply,
  isReplying,
  depth = 0
}: ThreadReplyProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const maxDepth = 3;
  const shouldNest = depth < maxDepth;

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "group relative",
        depth > 0 && "ml-8 pl-4 border-l-2 border-gray-800/50"
      )}
      style={{ marginLeft: shouldNest ? `${depth * 2}rem` : `${maxDepth * 2}rem` }}
    >
      {/* Thread indicator line */}
      {depth > 0 && (
        <div className="absolute -left-2 top-0 w-0.5 h-full bg-gradient-to-b from-gray-600 to-transparent opacity-30" />
      )}

      <div className={cn(
        "rounded-xl p-4 transition-all duration-300",
        "bg-gray-800/30 hover:bg-gray-800/50",
        "border border-gray-700/30 hover:border-gray-600/50",
        isHovered && "shadow-lg shadow-blue-500/5"
      )}>
        {/* Reply header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-bold">
              {reply.author.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-200 text-sm">{reply.author.name}</span>
                {reply.author.verified && (
                  <Badge className="bg-blue-500/20 text-blue-300 text-xs px-1.5 py-0.5">
                    ✓
                  </Badge>
                )}
                {reply.author.role && (
                  <span className="text-xs text-blue-400">{reply.author.role}</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock className="h-3 w-3" />
                {reply.timestamp}
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 rounded-full text-gray-400 hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>

        {/* Reply content */}
        <div className="mb-3">
          <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
            {reply.content}
          </p>
        </div>

        {/* Reply actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLike}
                className={cn(
                  "h-8 px-3 rounded-lg text-xs transition-all duration-200",
                  reply.hasLiked
                    ? "text-blue-400 bg-blue-900/20 hover:bg-blue-900/30"
                    : "text-gray-400 hover:text-blue-400 hover:bg-blue-900/20"
                )}
              >
                <ThumbsUp className={`h-3 w-3 mr-1 ${reply.hasLiked ? 'fill-blue-400' : ''}`} />
                {reply.likes > 0 && <span>{reply.likes}</span>}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={onReply}
                className={cn(
                  "h-8 px-3 rounded-lg text-xs transition-all duration-200",
                  isReplying
                    ? "text-purple-400 bg-purple-900/20"
                    : "text-gray-400 hover:text-purple-400 hover:bg-purple-900/20"
                )}
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                Reply
              </Button>
            </motion.div>
          </div>

          {reply.replies && reply.replies.length > 0 && (
            <div className="text-xs text-gray-400">
              {reply.replies.length} {reply.replies.length === 1 ? 'reply' : 'replies'}
            </div>
          )}
        </div>

        {/* Nested replies */}
        {reply.replies && reply.replies.length > 0 && (
          <div className="mt-4 space-y-3">
            {reply.replies.map((nestedReply) => (
              <ThreadReply
                key={nestedReply.id}
                reply={nestedReply}
                onLike={() => {}} // Handle nested reply likes
                onReply={() => {}} // Handle nested reply replies
                isReplying={false}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ThreadReply;
