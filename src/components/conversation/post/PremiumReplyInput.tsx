
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FilePreview } from './types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  ImageIcon,
  FileVideo,
  FileUp,
  Send,
  X,
  SmileIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PremiumReplyInputProps {
  postId: string;
  onReply: (postId: string, content: string, files: FilePreview[]) => void;
  onCancel: () => void;
  className?: string;
}

const PremiumReplyInput = ({
  postId,
  onReply,
  onCancel,
  className
}: PremiumReplyInputProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<FilePreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (type: 'image' | 'video' | 'document') => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = {
        image: 'image/*',
        video: 'video/*',
        document: '.pdf,.doc,.docx,.txt'
      }[type];
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    
    if (newFiles.length > 0) {
      const filePreviewPromises = newFiles.map(file => {
        return new Promise<FilePreview>((resolve) => {
          const fileType = file.type.startsWith('image/') 
            ? 'image' 
            : file.type.startsWith('video/') 
              ? 'video' 
              : 'document';
    
          let preview: string | undefined = undefined;
          
          if (fileType === 'image') {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                id: Math.random().toString(36).substr(2, 9),
                file,
                type: fileType,
                preview: reader.result as string
              });
            };
            reader.readAsDataURL(file);
          } else {
            resolve({
              id: Math.random().toString(36).substr(2, 9),
              file,
              type: fileType
            });
          }
        });
      });
      
      Promise.all(filePreviewPromises).then(newFilePreviews => {
        setFiles(prev => [...prev, ...newFilePreviews]);
      });
    }
    
    // Reset input
    if (event.target) {
      event.target.value = '';
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const handleSubmit = () => {
    if (content.trim() || files.length > 0) {
      onReply(postId, content, files);
      setContent('');
      setFiles([]);
    } else {
      toast({
        title: "Conținut invalid",
        description: "Adaugă un text sau fișiere pentru a posta un răspuns.",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "w-full space-y-4",
        className
      )}
    >
      <div className="relative">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Adaugă un răspuns..."
          className={cn(
            "w-full resize-none min-h-[100px] p-4 rounded-lg",
            "bg-[#1A1E30]/80 border-[#3A4366]/50 text-white/90 placeholder:text-white/40",
            "focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/40",
            "transition-all duration-300"
          )}
        />
      </div>
      
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map(file => (
            <div key={file.id} className="relative group">
              <div className={cn(
                "h-16 w-16 rounded-lg overflow-hidden",
                "bg-[#1A1E30] border border-[#3A4366]/50",
                "flex items-center justify-center"
              )}>
                {file.type === 'image' && file.preview ? (
                  <img src={file.preview} alt="preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="text-white/60 flex items-center justify-center">
                    {file.type === 'video' ? (
                      <FileVideo className="h-6 w-6 text-purple-400" />
                    ) : file.type === 'image' ? (
                      <ImageIcon className="h-6 w-6 text-indigo-400" />
                    ) : (
                      <FileUp className="h-6 w-6 text-pink-400" />
                    )}
                  </div>
                )}
              </div>
              
              <button
                onClick={() => removeFile(file.id)}
                className={cn(
                  "absolute -top-1.5 -right-1.5 rounded-full p-1",
                  "bg-black/70 backdrop-blur-sm shadow-lg border border-white/10",
                  "opacity-0 group-hover:opacity-100 transition-all duration-200",
                  "hover:bg-red-500/80"
                )}
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFileSelect('image')}
            className="h-8 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs"
          >
            <ImageIcon className="h-3.5 w-3.5 mr-1.5 text-indigo-400" />
            Imagine
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFileSelect('video')}
            className="h-8 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs"
          >
            <FileVideo className="h-3.5 w-3.5 mr-1.5 text-purple-400" />
            Video
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs"
          >
            <SmileIcon className="h-3.5 w-3.5 mr-1.5 text-amber-400" />
            Emoji
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 px-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs"
          >
            Anulează
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() && files.length === 0}
            className={cn(
              "h-8 px-3 rounded-lg text-white text-xs font-medium",
              "bg-gradient-to-r from-indigo-500 to-purple-500",
              "hover:from-indigo-600 hover:to-purple-600",
              "shadow-md shadow-indigo-500/20",
              "flex items-center gap-1.5",
              "transition-all duration-300",
              (!content.trim() && files.length === 0) && "opacity-50 cursor-not-allowed"
            )}
          >
            <span>Răspunde</span>
            <Send className="h-3 w-3" />
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

export default PremiumReplyInput;
