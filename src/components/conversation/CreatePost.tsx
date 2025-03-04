
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CreatePostProps, FilePreview } from './post/types';
import { AttachmentPreview } from './post/AttachmentPreview';
import PremiumInput from './post/PremiumInput';
import PremiumButton from './post/PremiumButton';
import { 
  ImageIcon, 
  FileVideo, 
  FileUp, 
  Send, 
  ChevronDown, 
  Sparkles,
  MicIcon,
  Link2Icon,
  SmileIcon
} from 'lucide-react';

const CreatePost = ({ topicId, onPostCreated }: CreatePostProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FilePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
    
    files.forEach(file => {
      const fileType = file.type.startsWith('image/') 
        ? 'image' 
        : file.type.startsWith('video/') 
          ? 'video' 
          : 'document';

      const preview = fileType === 'image' ? URL.createObjectURL(file) : undefined;

      setSelectedFiles(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        file,
        type: fileType,
        preview
      }]);
    });

    if (files.length > 0) {
      setIsExpanded(true);
      toast({
        title: "Fișiere atașate",
        description: `${files.length} fișier${files.length > 1 ? 'e' : ''} ${files.length > 1 ? 'au' : 'a'} fost atașat${files.length > 1 ? 'e' : ''} cu succes!`,
      });
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
    files.forEach(file => {
      const fileType = file.type.startsWith('image/') 
        ? 'image' 
        : file.type.startsWith('video/') 
          ? 'video' 
          : 'document';

      const preview = fileType === 'image' ? URL.createObjectURL(file) : undefined;

      setSelectedFiles(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        file,
        type: fileType,
        preview
      }]);
    });
    
    if (files.length > 0) {
      setIsExpanded(true);
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

  const handleMinimize = () => {
    setIsExpanded(false);
  };

  // Premium card animations and effects
  const baseVariants = {
    collapsed: {
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      y: 0
    },
    expanded: {
      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)",
      y: 0
    }
  };

  const haloVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 0.5 },
    tap: { opacity: 0.8, scale: 0.98 }
  };

  return (
    <motion.div 
      ref={containerRef}
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={baseVariants}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={() => !isExpanded && handleExpand()}
      className={cn(
        "relative mx-auto w-full max-w-4xl",
        "rounded-2xl overflow-hidden",
        isExpanded ? "mb-8" : "mb-4",
        "sticky top-4 z-50"
      )}
    >
      {/* Premium halo effect */}
      <motion.div
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={haloVariants}
        className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 blur-sm"
      />

      {/* Main container */}
      <motion.div
        className={cn(
          "relative rounded-2xl p-5",
          "bg-gradient-to-br from-[#191C2D] to-[#121525]",
          "backdrop-blur-xl border border-[#3A4366]",
          isDragging && "ring-2 ring-indigo-500/30",
          isExpanded ? "p-6" : "p-4",
          "cursor-pointer transition-all duration-300"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Premium top edge light effect */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-4"
          >
            <motion.h2 
              className="text-xl font-semibold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Creează o postare nouă
            </motion.h2>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                handleMinimize();
              }}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronDown className="w-5 h-5 text-white/70" />
            </motion.button>
          </motion.div>
        )}

        {/* Input area */}
        <div className={cn(
          "relative rounded-xl transition-all duration-300",
          "backdrop-blur-md",
          isDragging && "ring-2 ring-primary/20"
        )}>
          <motion.div
            initial={false}
            animate={{ height: "auto" }}
            transition={{ duration: 0.4 }}
          >
            <PremiumInput
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ce gânduri vrei să împărtășești?"
              minimized={!isExpanded}
            />
          </motion.div>

          <AnimatePresence>
            {isDragging && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-xl flex items-center justify-center backdrop-blur-sm bg-gradient-to-r from-indigo-500/20 to-purple-500/20"
              >
                <motion.div
                  className="flex items-center gap-2 bg-[#121525]/90 px-4 py-2 rounded-full border border-indigo-500/30"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                >
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span className="text-indigo-300 font-medium text-sm">Trage fișierele aici pentru încărcare</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* File preview */}
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-5"
              >
                <AttachmentPreview files={selectedFiles} onRemove={removeFile} />
              </motion.div>

              {/* Action buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mt-5 flex flex-wrap gap-2 items-center justify-between"
              >
                <div className="flex flex-wrap gap-2 items-center">
                  <PremiumButton 
                    onClick={() => handleFileSelect('image')} 
                    icon={<ImageIcon className="h-4 w-4 text-blue-400" />}
                  >
                    Imagine
                  </PremiumButton>
                  <PremiumButton 
                    onClick={() => handleFileSelect('video')} 
                    icon={<FileVideo className="h-4 w-4 text-purple-400" />}
                  >
                    Video
                  </PremiumButton>
                  <PremiumButton 
                    onClick={() => handleFileSelect('document')} 
                    icon={<FileUp className="h-4 w-4 text-pink-400" />}
                  >
                    Document
                  </PremiumButton>
                  
                  {/* Additional premium options */}
                  <PremiumButton 
                    icon={<MicIcon className="h-4 w-4 text-red-400" />}
                  >
                    Audio
                  </PremiumButton>
                  <PremiumButton 
                    icon={<Link2Icon className="h-4 w-4 text-green-400" />}
                  >
                    Link
                  </PremiumButton>
                  <PremiumButton 
                    icon={<SmileIcon className="h-4 w-4 text-yellow-400" />}
                  >
                    Emoji
                  </PremiumButton>
                </div>

                <PremiumButton 
                  onClick={handlePostSubmit}
                  variant="primary"
                  icon={<Send className="h-4 w-4" />}
                  disabled={!content.trim() && selectedFiles.length === 0}
                  className={cn(
                    "px-5 py-2 ml-auto",
                    (!content.trim() && selectedFiles.length === 0) && "opacity-50 pointer-events-none"
                  )}
                >
                  Publică
                </PremiumButton>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
      </motion.div>
    </motion.div>
  );
};

export default CreatePost;
