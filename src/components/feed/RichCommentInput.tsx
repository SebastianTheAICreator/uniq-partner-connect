
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Send,
  Image,
  FileText,
  Link,
  Smile,
  X,
  Paperclip,
  Code,
  Bold,
  Italic
} from 'lucide-react';
import { CommentAttachment } from '@/types/comment';

interface RichCommentInputProps {
  onSubmit: (content: string, attachments: CommentAttachment[]) => void;
  onCancel?: () => void;
  placeholder?: string;
  maxLength?: number;
  parentId?: string;
  className?: string;
}

const RichCommentInput = ({
  onSubmit,
  onCancel,
  placeholder = "Write a comment...",
  maxLength = 5000,
  parentId,
  className
}: RichCommentInputProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<CommentAttachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const commonEmojis = ['😀', '😂', '❤️', '👍', '👎', '😊', '🔥', '💯', '🎉', '💡', '🤔', '👏'];

  const handleFileSelect = (type: 'image' | 'document') => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image' ? 'image/*' : '.pdf,.doc,.docx,.txt,.md';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      const newAttachments: CommentAttachment[] = [];

      for (const file of files) {
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `${file.name} is larger than 10MB`,
            variant: "destructive"
          });
          continue;
        }

        const attachment: CommentAttachment = {
          id: Math.random().toString(36).substr(2, 9),
          type: file.type.startsWith('image/') ? 'image' : 'document',
          url: URL.createObjectURL(file),
          name: file.name,
          size: file.size
        };

        // Generate preview for images
        if (attachment.type === 'image') {
          attachment.previewUrl = attachment.url;
        }

        newAttachments.push(attachment);
      }

      setAttachments(prev => [...prev, ...newAttachments]);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to process files. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleLinkInsert = () => {
    const url = prompt('Enter URL:');
    if (url && isValidUrl(url)) {
      const attachment: CommentAttachment = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'link',
        url,
        name: url,
        metadata: {
          title: url,
          description: 'External link'
        }
      };
      setAttachments(prev => [...prev, attachment]);
    }
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => {
      const attachment = prev.find(a => a.id === id);
      if (attachment?.url.startsWith('blob:')) {
        URL.revokeObjectURL(attachment.url);
      }
      return prev.filter(a => a.id !== id);
    });
  };

  const insertEmoji = (emoji: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.slice(0, start) + emoji + content.slice(end);
      setContent(newContent);
      
      // Reset cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    }
    setShowEmojiPicker(false);
  };

  const insertFormatting = (type: 'bold' | 'italic' | 'code') => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.slice(start, end);
      
      let wrapper = '';
      switch (type) {
        case 'bold':
          wrapper = '**';
          break;
        case 'italic':
          wrapper = '*';
          break;
        case 'code':
          wrapper = '`';
          break;
      }
      
      const newContent = content.slice(0, start) + wrapper + selectedText + wrapper + content.slice(end);
      setContent(newContent);
      
      setTimeout(() => {
        textarea.focus();
        const newPos = start + wrapper.length + selectedText.length + wrapper.length;
        textarea.setSelectionRange(newPos, newPos);
      }, 0);
    }
  };

  const handleSubmit = () => {
    if (content.trim() || attachments.length > 0) {
      onSubmit(content.trim(), attachments);
      setContent('');
      setAttachments([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  const remainingChars = maxLength - content.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("space-y-3 bg-gray-800/30 rounded-xl p-4 border border-gray-700/50", className)}
    >
      {/* Rich text toolbar */}
      <div className="flex items-center gap-2 pb-2 border-b border-gray-700/30">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertFormatting('bold')}
          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200"
        >
          <Bold className="h-3.5 w-3.5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertFormatting('italic')}
          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200"
        >
          <Italic className="h-3.5 w-3.5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertFormatting('code')}
          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200"
        >
          <Code className="h-3.5 w-3.5" />
        </Button>
        
        <div className="w-px h-4 bg-gray-700/50 mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFileSelect('image')}
          disabled={isUploading}
          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200"
        >
          <Image className="h-3.5 w-3.5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFileSelect('document')}
          disabled={isUploading}
          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200"
        >
          <FileText className="h-3.5 w-3.5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLinkInsert}
          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200"
        >
          <Link className="h-3.5 w-3.5" />
        </Button>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200"
          >
            <Smile className="h-3.5 w-3.5" />
          </Button>
          
          <AnimatePresence>
            {showEmojiPicker && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-10 left-0 z-50 bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl"
              >
                <div className="grid grid-cols-6 gap-1">
                  {commonEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => insertEmoji(emoji)}
                      className="p-1 hover:bg-gray-700 rounded text-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Text input */}
      <Textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        className="min-h-[120px] bg-transparent border-gray-700/50 text-gray-100 placeholder-gray-400 resize-none"
        maxLength={maxLength}
      />

      {/* Attachments preview */}
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2"
          >
            {attachments.map((attachment) => (
              <div key={attachment.id} className="relative group">
                <div className="flex items-center gap-2 bg-gray-700/50 rounded-lg p-2 pr-8">
                  {attachment.type === 'image' && attachment.previewUrl ? (
                    <img
                      src={attachment.previewUrl}
                      alt={attachment.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-600 rounded">
                      {attachment.type === 'document' ? (
                        <FileText className="h-4 w-4 text-gray-300" />
                      ) : (
                        <Link className="h-4 w-4 text-gray-300" />
                      )}
                    </div>
                  )}
                  <span className="text-sm text-gray-300 truncate max-w-[120px]">
                    {attachment.name}
                  </span>
                </div>
                <button
                  onClick={() => removeAttachment(attachment.id)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>Ctrl+Enter to submit</span>
          <span className={cn(
            remainingChars < 100 && remainingChars >= 0 && "text-yellow-400",
            remainingChars < 0 && "text-red-400"
          )}>
            {remainingChars} characters remaining
          </span>
        </div>
        
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
            disabled={(!content.trim() && attachments.length === 0) || remainingChars < 0 || isUploading}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isUploading ? (
              <div className="h-4 w-4 mr-1 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            ) : (
              <Send className="h-4 w-4 mr-1" />
            )}
            {parentId ? 'Reply' : 'Comment'}
          </Button>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
    </motion.div>
  );
};

export default RichCommentInput;
