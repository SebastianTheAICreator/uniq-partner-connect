
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
  ChevronDown,
  ChevronUp,
  Sparkles,
  MicIcon,
  Link2Icon,
  SmileIcon,
  X,
  UserCircle,
  AtSign,
  Hash
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
      className={cn(
        "mx-auto w-full backdrop-blur-lg rounded-xl",
        className
      )}
    >
      <motion.div 
        initial="initial"
        animate={isExpanded ? "expanded" : "initial"}
        variants={{
          initial: { boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" },
          expanded: { boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)" }
        }}
        className={cn(
          "relative overflow-hidden rounded-xl border transition-all duration-300",
          "bg-gradient-to-b from-[#1E2235]/80 to-[#141625]/90",
          "border-[#3A4366]/50 hover:border-[#3A4366]",
          isExpanded ? "shadow-2xl" : "shadow-xl"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!isExpanded ? handleExpand : undefined}
      >
        {/* Glow effect at top edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
        
        {/* Glow effect at bottom edge */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        
        <div className={cn(
          "p-5 transition-all duration-300",
          isExpanded ? "p-6" : "p-4"
        )}>
          {isExpanded && (
            <div className="flex justify-between items-center mb-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center">
                  <UserCircle className="h-5 w-5 text-indigo-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90">Creează o postare nouă</p>
                  <p className="text-xs text-white/50">Vizibilă tuturor utilizatorilor din această comunitate</p>
                </div>
              </motion.div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-8 w-8 p-0 rounded-full text-white/70 hover:text-white hover:bg-white/10"
              >
                <ChevronUp className="h-4 w-4" />
                <span className="sr-only">Minimize</span>
              </Button>
            </div>
          )}

          <div className={cn(
            "w-full transition-all duration-300 relative rounded-lg overflow-hidden",
            isDragging && "ring-2 ring-indigo-500/30"
          )}>
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={isExpanded ? "Ce gânduri vrei să împărtășești?" : "Creează o postare..."}
              className={cn(
                "w-full resize-none transition-all duration-300 border-0",
                "bg-[#1E2235]/80 text-white/90 placeholder:text-white/40",
                "focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500/40",
                isExpanded ? "min-h-[120px] py-4 px-5 text-base" : "min-h-[56px] py-4 px-4 text-sm"
              )}
            />

            {(isMentioning || isTagging) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-4 right-4 bottom-2 bg-[#141625] border border-[#3A4366] rounded-lg shadow-xl z-10"
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
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg">
                <div className="bg-[#141625]/90 px-4 py-2 rounded-full border border-indigo-500/30">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-400" />
                    <span className="text-indigo-300 font-medium text-sm">Trage fișierele aici</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <AnimatePresence mode="wait">
            {selectedFiles.length > 0 && isExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {selectedFiles.map(file => (
                    <motion.div
                      key={file.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative group aspect-square"
                    >
                      <div className={cn(
                        "h-full w-full rounded-lg overflow-hidden",
                        "bg-[#1A1E30] border border-[#3A4366]",
                        "flex items-center justify-center",
                        "group-hover:border-indigo-500/40 transition-colors"
                      )}>
                        {file.type === 'image' && file.preview ? (
                          <div className="w-full h-full relative">
                            <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ) : (
                          <div className="text-white/60 flex flex-col items-center justify-center p-3">
                            {file.type === 'video' ? (
                              <FileVideo className="w-8 h-8 mb-2 text-purple-400" />
                            ) : file.type === 'image' ? (
                              <ImageIcon className="w-8 h-8 mb-2 text-indigo-400" />
                            ) : (
                              <FileUp className="w-8 h-8 mb-2 text-pink-400" />
                            )}
                            <p className="text-xs text-center text-white/70 font-medium truncate max-w-full px-1">
                              {file.file.name.length > 15 
                                ? `${file.file.name.substring(0, 13)}...` 
                                : file.file.name}
                            </p>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className={cn(
                          "absolute -top-2 -right-2 rounded-full p-1",
                          "bg-black/70 backdrop-blur-sm shadow-lg border border-white/10",
                          "opacity-0 group-hover:opacity-100 transition-all duration-200",
                          "hover:bg-red-500/80 hover:scale-110"
                        )}
                      >
                        <X className="w-3.5 h-3.5 text-white" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mt-5 flex flex-wrap gap-2 items-center justify-between"
              >
                <div className="flex flex-wrap gap-2 items-center">
                  <Button 
                    onClick={() => handleFileSelect('image')} 
                    variant="ghost"
                    className="h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs font-medium"
                  >
                    <ImageIcon className="h-3.5 w-3.5 mr-2 text-indigo-400" />
                    Imagine
                  </Button>
                  <Button 
                    onClick={() => handleFileSelect('video')}
                    variant="ghost"
                    className="h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs font-medium"
                  >
                    <FileVideo className="h-3.5 w-3.5 mr-2 text-purple-400" />
                    Video
                  </Button>
                  <Button 
                    onClick={() => handleFileSelect('document')}
                    variant="ghost"
                    className="h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs font-medium"
                  >
                    <FileUp className="h-3.5 w-3.5 mr-2 text-pink-400" />
                    Document
                  </Button>
                  
                  <Button 
                    variant="ghost"
                    className="h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs font-medium"
                  >
                    <SmileIcon className="h-3.5 w-3.5 mr-2 text-amber-400" />
                    Emoji
                  </Button>
                  <Button 
                    variant="ghost"
                    className="h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs font-medium"
                  >
                    <MicIcon className="h-3.5 w-3.5 mr-2 text-red-400" />
                    Audio
                  </Button>
                </div>

                <Button 
                  onClick={handlePostSubmit}
                  disabled={!content.trim() && selectedFiles.length === 0}
                  className={cn(
                    "h-9 px-4 rounded-lg gap-2 text-white font-medium text-sm",
                    "bg-gradient-to-r from-indigo-500 to-purple-500",
                    "hover:from-indigo-600 hover:to-purple-600",
                    "shadow-lg shadow-indigo-500/20",
                    "border border-white/10",
                    "transition-all duration-300",
                    (!content.trim() && selectedFiles.length === 0) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span>Publică</span>
                  <Send className="h-3.5 w-3.5" />
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
