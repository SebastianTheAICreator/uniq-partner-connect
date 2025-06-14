
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Image, Smile, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThreadReplyInputProps {
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const ThreadReplyInput = ({
  onSubmit,
  onCancel,
  placeholder = "Write a reply...",
  autoFocus = false
}: ThreadReplyInputProps) => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
      setIsFocused(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCancel = () => {
    setContent('');
    setIsFocused(false);
    onCancel?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl border transition-all duration-300",
        isFocused || content
          ? "border-blue-500/50 bg-gray-800/50 shadow-lg shadow-blue-500/5"
          : "border-gray-700/50 bg-gray-800/30 hover:border-gray-600/50"
      )}
    >
      <div className="p-4">
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={cn(
            "min-h-[80px] resize-none border-0 bg-transparent p-0 focus-visible:ring-0",
            "text-gray-200 placeholder:text-gray-400",
            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600"
          )}
        />

        {/* Actions */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700/50">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
            >
              <Image className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {(isFocused || content) && onCancel && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="h-8 px-3 text-gray-400 hover:text-gray-200"
              >
                Cancel
              </Button>
            )}
            
            <Button
              onClick={handleSubmit}
              disabled={!content.trim()}
              size="sm"
              className={cn(
                "h-8 px-4 rounded-lg font-medium transition-all duration-200",
                content.trim()
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              )}
            >
              <Send className="h-3 w-3 mr-1" />
              Reply
            </Button>
          </div>
        </div>

        {/* Character count and keyboard shortcut hint */}
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>⌘ + Enter to send</span>
          <span className={cn(
            "transition-colors",
            content.length > 280 ? "text-red-400" : "text-gray-500"
          )}>
            {content.length}/500
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ThreadReplyInput;
