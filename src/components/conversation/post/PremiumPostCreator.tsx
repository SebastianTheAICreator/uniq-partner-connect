import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { FilePreview } from './types';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ImageIcon,
  FileVideo,
  FileUp,
  Send,
  X,
  SmileIcon,
  MicIcon,
  AtSign,
  Hash,
  Sparkles
} from 'lucide-react';

interface PremiumPostCreatorProps {
  topicId: string;
  onPostCreated: (post: { content: string; files: FilePreview[] }) => void;
  className?: string;
}

const PremiumPostCreator = ({ topicId, onPostCreated, className }: PremiumPostCreatorProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FilePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMentioning, setIsMentioning] = useState(false);
  const [isTagging, setIsTagging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check for mention or hashtag
  useEffect(() => {
    const words = content.split(' ');
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
  }, [content]);

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
        // Fix: Explicitly type the fileType to match the FilePreview interface
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
      
      toast({
        title: `${files.length} fișier${files.length > 1 ? 'e' : ''} adăugat${files.length > 1 ? 'e' : ''}`,
        description: "Fișierele au fost atașate cu succes",
      });
    }
    
    // Reset input
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
        // Fix: Explicitly type the fileType to match the FilePreview interface
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
      
      toast({
        title: `${files.length} fișier${files.length > 1 ? 'e' : ''} adăugat${files.length > 1 ? 'e' : ''}`,
        description: "Fișierele au fost atașate cu succes",
      });
    }
  };

  const handlePostSubmit = () => {
    if (content.trim() || selectedFiles.length > 0) {
      onPostCreated({
        content: content.trim(),
        files: selectedFiles
      });
      setContent('');
      setSelectedFiles([]);
      setIsExpanded(false);
    }
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("mx-auto w-full", className)}
    >
      <motion.div 
        className={cn(
          "relative overflow-hidden rounded-2xl border transition-all duration-300",
          "bg-white/[0.02] backdrop-blur-xl border-white/10",
          "hover:bg-white/[0.04] hover:border-white/20",
          isExpanded ? "shadow-2xl border-indigo-500/30" : "shadow-xl"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!isExpanded ? handleExpand : undefined}
      >
        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
        
        <div className="p-6">
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center ring-2 ring-white/10">
                <span className="text-white font-semibold text-sm">Tu</span>
              </div>
              <div>
                <p className="text-white font-medium">Creează o postare nouă</p>
                <p className="text-white/50 text-sm">Împărtășește gândurile tale cu comunitatea</p>
              </div>
            </motion.div>
          )}

          <div className={cn(
            "relative rounded-xl overflow-hidden transition-all duration-300",
            isDragging && "ring-2 ring-indigo-500/50 bg-indigo-500/5"
          )}>
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={isExpanded ? "Ce ai pe suflet? Împărtășește cu noi..." : "Creează o postare..."}
              className={cn(
                "w-full resize-none border-0 bg-transparent text-white/90 placeholder:text-white/40",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                isExpanded ? "min-h-[120px] py-4 px-5 text-base" : "min-h-[60px] py-4 px-4 text-sm cursor-pointer"
              )}
              readOnly={!isExpanded}
            />

            {/* Mention/Tag suggestions */}
            {(isMentioning || isTagging) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-4 right-4 bottom-2 bg-[#141625]/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl z-10"
              >
                <div className="p-2">
                  <div className="flex items-center px-3 py-2 text-xs text-white/50">
                    {isMentioning ? (
                      <>
                        <AtSign className="h-3.5 w-3.5 mr-2 text-indigo-400" />
                        <span>Menționează pe cineva</span>
                      </>
                    ) : (
                      <>
                        <Hash className="h-3.5 w-3.5 mr-2 text-purple-400" />
                        <span>Adaugă un hashtag</span>
                      </>
                    )}
                  </div>
                  
                  {isMentioning && (
                    <div className="max-h-28 overflow-y-auto py-1">
                      {['Alex Ionescu', 'Maria Popescu', 'Andrei Dumitrescu'].map((user, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-3 py-2 hover:bg-white/5 text-white/80 text-sm flex items-center rounded-md"
                          onClick={() => {
                            const words = content.split(' ');
                            words[words.length - 1] = `@${user}`;
                            setContent(words.join(' ') + ' ');
                            setIsMentioning(false);
                            textareaRef.current?.focus();
                          }}
                        >
                          <div className="h-6 w-6 rounded-full bg-indigo-500/20 flex items-center justify-center mr-2">
                            <span className="text-xs font-medium">{user[0]}</span>
                          </div>
                          <span>{user}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {isTagging && (
                    <div className="max-h-28 overflow-y-auto py-1">
                      {['design', 'technology', 'ai', 'community', 'innovation'].map((tag, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-3 py-2 hover:bg-white/5 text-white/80 text-sm rounded-md"
                          onClick={() => {
                            const words = content.split(' ');
                            words[words.length - 1] = `#${tag}`;
                            setContent(words.join(' ') + ' ');
                            setIsTagging(false);
                            textareaRef.current?.focus();
                          }}
                        >
                          <span className="text-purple-400">#{tag}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-indigo-500/10 backdrop-blur-sm rounded-xl">
                <div className="bg-[#141625]/90 px-6 py-3 rounded-full border border-indigo-500/30">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-indigo-400" />
                    <span className="text-indigo-300 font-medium">Trage fișierele aici</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* File previews */}
          <AnimatePresence>
            {selectedFiles.length > 0 && isExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {selectedFiles.map(file => (
                    <motion.div
                      key={file.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative group aspect-square"
                    >
                      <div className="h-full w-full rounded-xl overflow-hidden bg-white/[0.02] border border-white/10 group-hover:border-white/30 transition-all">
                        {file.type === 'image' && file.preview ? (
                          <div className="w-full h-full relative">
                            <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center p-3">
                            {file.type === 'video' ? (
                              <FileVideo className="w-8 h-8 mb-2 text-purple-400" />
                            ) : file.type === 'image' ? (
                              <ImageIcon className="w-8 h-8 mb-2 text-indigo-400" />
                            ) : (
                              <FileUp className="w-8 h-8 mb-2 text-pink-400" />
                            )}
                            <p className="text-xs text-white/70 font-medium text-center break-all line-clamp-2">
                              {file.file.name}
                            </p>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
                      >
                        <X className="w-3.5 h-3.5 text-white" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Actions */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-wrap gap-3 items-center justify-between mt-6 pt-4 border-t border-white/10"
              >
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={() => handleFileSelect('image')} 
                    variant="ghost"
                    className="h-10 px-4 rounded-lg text-white/70 hover:text-white hover:bg-white/10 gap-2"
                  >
                    <ImageIcon className="h-4 w-4 text-indigo-400" />
                    <span className="text-sm">Imagine</span>
                  </Button>
                  
                  <Button 
                    onClick={() => handleFileSelect('video')}
                    variant="ghost"
                    className="h-10 px-4 rounded-lg text-white/70 hover:text-white hover:bg-white/10 gap-2"
                  >
                    <FileVideo className="h-4 w-4 text-purple-400" />
                    <span className="text-sm">Video</span>
                  </Button>
                  
                  <Button 
                    onClick={() => handleFileSelect('document')}
                    variant="ghost"
                    className="h-10 px-4 rounded-lg text-white/70 hover:text-white hover:bg-white/10 gap-2"
                  >
                    <FileUp className="h-4 w-4 text-pink-400" />
                    <span className="text-sm">Document</span>
                  </Button>
                  
                  <Button 
                    variant="ghost"
                    className="h-10 px-4 rounded-lg text-white/70 hover:text-white hover:bg-white/10 gap-2"
                  >
                    <SmileIcon className="h-4 w-4 text-amber-400" />
                    <span className="text-sm">Emoji</span>
                  </Button>
                </div>

                <Button 
                  onClick={handlePostSubmit}
                  disabled={!content.trim() && selectedFiles.length === 0}
                  className={cn(
                    "h-10 px-6 rounded-lg gap-2 text-white font-medium",
                    "bg-gradient-to-r from-indigo-500 to-purple-500",
                    "hover:from-indigo-600 hover:to-purple-600",
                    "shadow-lg shadow-indigo-500/25 transition-all duration-300",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  )}
                >
                  <span>Publică</span>
                  <Send className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

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

export default PremiumPostCreator;
