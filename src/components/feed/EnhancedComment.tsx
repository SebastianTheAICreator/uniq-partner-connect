
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  MoreHorizontal,
  Clock,
  ChevronDown,
  ChevronRight,
  Reply,
  Edit,
  Trash2,
  ExternalLink,
  FileText,
  Download,
  Image as ImageIcon
} from 'lucide-react';
import { EnhancedComment as CommentType, CommentAttachment } from '@/types/comment';
import RichCommentInput from './RichCommentInput';

interface EnhancedCommentProps {
  comment: CommentType;
  onReply: (parentId: string, content: string, attachments: CommentAttachment[]) => void;
  onEdit?: (commentId: string, content: string, attachments: CommentAttachment[]) => void;
  onDelete?: (commentId: string) => void;
  onReactionToggle: (commentId: string, reactionType: 'like' | 'dislike') => void;
  onToggleCollapse: (commentId: string) => void;
  onAttachmentView?: (attachment: CommentAttachment) => void;
  maxDepth?: number;
  delay?: number;
  className?: string;
}

const EnhancedComment = ({
  comment,
  onReply,
  onEdit,
  onDelete,
  onReactionToggle,
  onToggleCollapse,
  onAttachmentView,
  maxDepth = 5,
  delay = 0,
  className
}: EnhancedCommentProps) => {
  const { toast } = useToast();
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showReplies, setShowReplies] = useState(!comment.isCollapsed);

  const handleReply = (parentId: string, content: string, attachments: CommentAttachment[]) => {
    onReply(parentId, content, attachments);
    setIsReplying(false);
  };

  const handleEdit = (commentId: string, content: string, attachments: CommentAttachment[]) => {
    if (onEdit) {
      onEdit(commentId, content, attachments);
      setIsEditing(false);
    }
  };

  const handleAttachmentClick = (attachment: CommentAttachment) => {
    if (onAttachmentView) {
      onAttachmentView(attachment);
    } else {
      // Fallback behavior
      if (attachment.type === 'link') {
        window.open(attachment.url, '_blank', 'noopener,noreferrer');
      } else if (attachment.type === 'document') {
        const link = document.createElement('a');
        link.href = attachment.url;
        link.download = attachment.name || 'document';
        link.click();
      }
    }
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-700/50 px-1 py-0.5 rounded text-sm">$1</code>');
  };

  const canReply = comment.depth < maxDepth;
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "relative",
        comment.depth > 0 && "ml-6 pl-4 border-l border-gray-700/30",
        className
      )}
    >
      {/* Comment body */}
      <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 hover:border-gray-600/50 transition-colors">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center">
              {comment.author.avatar ? (
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                comment.author.name.charAt(0)
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-200 text-sm">
                  {comment.author.name}
                </span>
                {comment.author.verified && (
                  <Badge className="bg-blue-500/20 text-blue-300 text-xs px-1.5 py-0">
                    ✓
                  </Badge>
                )}
                {comment.author.role && (
                  <Badge variant="outline" className="text-xs px-1.5 py-0">
                    {comment.author.role}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock className="h-3 w-3" />
                <span>{comment.timestamp}</span>
                {comment.isEdited && (
                  <>
                    <span>•</span>
                    <span className="italic">edited</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        {isEditing ? (
          <RichCommentInput
            onSubmit={(content, attachments) => handleEdit(comment.id, content, attachments)}
            onCancel={() => setIsEditing(false)}
            placeholder="Edit your comment..."
            className="mb-4"
          />
        ) : (
          <div className="mb-4">
            <div
              className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: formatContent(comment.content) }}
            />
            
            {/* Enhanced Attachments with Modal Integration */}
            {comment.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {comment.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    onClick={() => handleAttachmentClick(attachment)}
                    className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-all duration-200 border border-gray-600/20 hover:border-gray-500/40"
                  >
                    {attachment.type === 'image' && attachment.previewUrl ? (
                      <div className="relative">
                        <img
                          src={attachment.previewUrl}
                          alt={attachment.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <ImageIcon className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-600 rounded">
                        {attachment.type === 'document' ? (
                          <FileText className="h-6 w-6 text-gray-300" />
                        ) : (
                          <ExternalLink className="h-6 w-6 text-gray-300" />
                        )}
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-200 truncate">
                        {attachment.name}
                      </p>
                      {attachment.metadata?.description && (
                        <p className="text-xs text-gray-400 truncate">
                          {attachment.metadata.description}
                        </p>
                      )}
                      {attachment.size && (
                        <p className="text-xs text-gray-500">
                          {(attachment.size / 1024).toFixed(1)} KB
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {attachment.type === 'image' && (
                        <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                          View
                        </Badge>
                      )}
                      {attachment.type === 'document' && (
                        <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/30">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Badge>
                      )}
                      {attachment.type === 'link' && (
                        <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/30">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Open
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReactionToggle(comment.id, 'like')}
              className={cn(
                "h-8 px-2 text-xs",
                comment.reactions.like.hasReacted
                  ? "text-blue-400 bg-blue-900/20"
                  : "text-gray-400 hover:text-blue-400"
              )}
            >
              <ThumbsUp className="h-3 w-3 mr-1" />
              {comment.reactions.like.count > 0 && comment.reactions.like.count}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReactionToggle(comment.id, 'dislike')}
              className={cn(
                "h-8 px-2 text-xs",
                comment.reactions.dislike.hasReacted
                  ? "text-red-400 bg-red-900/20"
                  : "text-gray-400 hover:text-red-400"
              )}
            >
              <ThumbsDown className="h-3 w-3 mr-1" />
              {comment.reactions.dislike.count > 0 && comment.reactions.dislike.count}
            </Button>
            
            {canReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplying(!isReplying)}
                className="h-8 px-2 text-xs text-gray-400 hover:text-purple-400"
              >
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </Button>
            )}
            
            {hasReplies && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplies(!showReplies)}
                className="h-8 px-2 text-xs text-gray-400 hover:text-gray-200"
              >
                {showReplies ? (
                  <ChevronDown className="h-3 w-3 mr-1" />
                ) : (
                  <ChevronRight className="h-3 w-3 mr-1" />
                )}
                {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200"
              >
                <Edit className="h-3 w-3" />
              </Button>
            )}
            
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(comment.id)}
                className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Reply input */}
      <AnimatePresence>
        {isReplying && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3"
          >
            <RichCommentInput
              onSubmit={(content, attachments) => handleReply(comment.id, content, attachments)}
              onCancel={() => setIsReplying(false)}
              placeholder="Write a reply..."
              parentId={comment.id}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nested replies */}
      <AnimatePresence>
        {showReplies && hasReplies && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-4"
          >
            {comment.replies.map((reply) => (
              <EnhancedComment
                key={reply.id}
                comment={reply}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
                onReactionToggle={onReactionToggle}
                onToggleCollapse={onToggleCollapse}
                maxDepth={maxDepth}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EnhancedComment;
