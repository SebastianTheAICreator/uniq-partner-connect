
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { FilePreview } from '@/components/conversation/post/types';
import { 
  Sparkles, 
  ImageIcon, 
  FileVideo,
  FileUp,
  X, 
  Send,
  SmileIcon,
  AtSign,
  Hash
} from 'lucide-react';

interface PremiumFeedCreatorProps {
  onPostCreated: (post: { content: string; files: FilePreview[] }) => void;
}

const PremiumFeedCreator = ({ onPostCreated }: PremiumFeedCreatorProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FilePreview[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMentioning, setIsMentioning] = useState(false);
  const [isTagging, setIsTagging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    const files = Array.from(event.target.files || []);
    
    if (files.length > 0) {
      const newFiles = files.map(file => {
        const fileType = file.type.startsWith('image/') 
          ? 'image' as const
          : file.type.startsWith('video/') 
            ? 'video' as const
            : 'document' as const;

        const preview = fileType === 'image' ? URL.createObjectURL(file) : undefined;

        return {
          id: Math.random().toString(36).substr(2, 9),
          file,
          type: fileType,
          preview
        };
      });

      setSelectedFiles(prev => [...prev, ...newFiles]);
      setIsExpanded(true);
    }
    
    if (event.target) {
      event.target.value = '';
    }
  };

  const removeFile = (id: string) => {
    setSelectedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const newFiles = files.map(file => {
        const fileType = file.type.startsWith('image/') 
          ? 'image' as const
          : file.type.startsWith('video/') 
            ? 'video' as const 
            : 'document' as const;

        const preview = fileType === 'image' ? URL.createObjectURL(file) : undefined;

        return {
          id: Math.random().toString(36).substr(2, 9),
          file,
          type: fileType,
          preview
        };
      });

      setSelectedFiles(prev => [...prev, ...newFiles]);
      setIsExpanded(true);
    }
  };
  
  const handleSubmit = () => {
    if (!content.trim() && selectedFiles.length === 0) return;
    
    onPostCreated({
      content: content.trim(),
      files: selectedFiles
    });
    
    setContent('');
    setSelectedFiles([]);
    setIsExpanded(false);
    
    toast({
      title: "Post published",
      description: "Your post has been published successfully."
    });
  };
  
  const expand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  // Check for mentions and hashtags
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    const words = newContent.split(' ');
    const lastWord = words[words.length - 1];
    
    if (lastWord.startsWith('@') && lastWord.length > 1) {
      setIsMentioning(true);
      setIsTagging(false);
    } else if (lastWord.startsWith('#') && lastWord.length > 1) {
      setIsTagging(true);
      setIsMentioning(false);
    } else {
      setIsMentioning(false);
      setIsTagging(false);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
            Y
          </div>
          
          <div className="flex-1">
            <div className={cn(
              "relative rounded-xl overflow-hidden transition-all duration-300",
              isDragging && "ring-2 ring-blue-500/50 bg-blue-500/5"
            )}>
              <Textarea
                ref={textareaRef}
                value={content}
                onChange={handleContentChange}
                onClick={!isExpanded ? expand : undefined}
                placeholder={isExpanded ? "What's on your mind? Share with the community..." : "Share your thoughts..."}
                className="resize-none bg-gray-800/50 border-gray-700/50 focus:border-blue-500/50 rounded-xl placeholder:text-gray-500 min-h-[60px] transition-all duration-300"
                rows={isExpanded ? 4 : 2}
                readOnly={!isExpanded}
              />

              {isDragging && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-500/10 backdrop-blur-sm rounded-xl">
                  <div className="bg-gray-900/90 px-6 py-3 rounded-full border border-blue-500/30">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-blue-400" />
                      <span className="text-blue-300 font-medium">Drop files here</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mention/Tag suggestions */}
              {(isMentioning || isTagging) && isExpanded && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-4 right-4 bottom-2 bg-gray-800/95 backdrop-blur-sm border border-gray-600 rounded-lg shadow-xl z-10"
                >
                  <div className="p-2">
                    <div className="flex items-center px-3 py-2 text-xs text-gray-400">
                      {isMentioning ? (
                        <>
                          <AtSign className="h-3.5 w-3.5 mr-2 text-blue-400" />
                          <span>Mention someone</span>
                        </>
                      ) : (
                        <>
                          <Hash className="h-3.5 w-3.5 mr-2 text-purple-400" />
                          <span>Add a hashtag</span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* File previews */}
            <AnimatePresence>
              {selectedFiles.length > 0 && isExpanded && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {selectedFiles.map(file => (
                      <motion.div
                        key={file.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative group aspect-square"
                      >
                        <div className="h-full w-full rounded-lg overflow-hidden bg-gray-800/50 border border-gray-600 group-hover:border-gray-500 transition-all">
                          {file.type === 'image' && file.preview ? (
                            <div className="w-full h-full relative">
                              <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          ) : (
                            <div className="h-full flex flex-col items-center justify-center p-2">
                              {file.type === 'video' ? (
                                <FileVideo className="w-6 h-6 mb-1 text-purple-400" />
                              ) : file.type === 'image' ? (
                                <ImageIcon className="w-6 h-6 mb-1 text-blue-400" />
                              ) : (
                                <FileUp className="w-6 h-6 mb-1 text-green-400" />
                              )}
                              <p className="text-xs text-gray-300 font-medium text-center break-all line-clamp-2">
                                {file.file.name}
                              </p>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => handleFileSelect('image')}
                      variant="ghost" 
                      size="sm" 
                      className="h-9 px-3 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      <span>Image</span>
                    </Button>
                    
                    <Button 
                      onClick={() => handleFileSelect('video')}
                      variant="ghost" 
                      size="sm" 
                      className="h-9 px-3 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-purple-500/10"
                    >
                      <FileVideo className="h-4 w-4 mr-2" />
                      <span>Video</span>
                    </Button>
                    
                    <Button 
                      onClick={() => handleFileSelect('document')}
                      variant="ghost" 
                      size="sm" 
                      className="h-9 px-3 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-500/10"
                    >
                      <FileUp className="h-4 w-4 mr-2" />
                      <span>Document</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 px-3 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-amber-500/10"
                    >
                      <SmileIcon className="h-4 w-4 mr-2" />
                      <span>Emoji</span>
                    </Button>
                  </div>
                  
                  <Button
                    onClick={handleSubmit}
                    disabled={!content.trim() && selectedFiles.length === 0}
                    className="h-9 px-5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Post</span>
                    <Send className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
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

export default PremiumFeedCreator;
