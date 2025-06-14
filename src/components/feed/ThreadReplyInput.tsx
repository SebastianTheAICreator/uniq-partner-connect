
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, X } from 'lucide-react';

interface ThreadReplyInputProps {
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  placeholder?: string;
}

const ThreadReplyInput = ({ onSubmit, onCancel, placeholder = "Write a reply..." }: ThreadReplyInputProps) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        className="min-h-[100px] bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 resize-none"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          Press Ctrl+Enter to submit
        </span>
        <div className="flex gap-2">
          {onCancel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={!content.trim()}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4 mr-1" />
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreadReplyInput;
