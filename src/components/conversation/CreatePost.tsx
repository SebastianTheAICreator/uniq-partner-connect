import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';
import { FilePreviewList } from './post/FilePreviewList';
import { ActionButtons } from './post/ActionButtons';
import { CreatePostProps, FilePreview } from './post/types';

const CreatePost = ({ topicId, onPostCreated }: CreatePostProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FilePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Transform values for scroll animations
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const opacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  const translateY = useTransform(scrollY, [0, 100], [0, -10]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = window.scrollY > 50;
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <motion.div 
      ref={containerRef}
      style={{ 
        scale,
        opacity,
        y: translateY
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-gradient-to-br from-[#1a1a2e]/90 via-[#16213e]/90 to-[#1a1a2e]/90",
        "backdrop-blur-xl rounded-xl border border-white/10",
        "shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
        "transition-all duration-500 ease-in-out",
        isExpanded ? "p-6" : "p-4",
        isScrolled ? "scale-95 opacity-90" : "scale-100 opacity-100",
        "hover:border-indigo-500/20 hover:shadow-indigo-500/10",
        "group"
      )}
    >
      <motion.h2 
        className={cn(
          "text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400",
          "bg-clip-text text-transparent mb-4",
          "animate-text-shine"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Creează o postare nouă
      </motion.h2>

      <div
        className={cn(
          "relative rounded-xl transition-all duration-300",
          isDragging && "ring-2 ring-indigo-500/20",
          isScrolled && "transform-gpu"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => setIsExpanded(true)}
      >
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : "120px",
            scale: isScrolled ? 0.98 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Ce gânduri vrei să împărtășești?"
            className={cn(
              "min-h-[120px] bg-white/5 border-white/10 text-white/90 placeholder:text-white/40",
              "focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300",
              "backdrop-blur-sm resize-none rounded-xl",
              "hover:bg-white/10",
              isExpanded ? "min-h-[200px]" : "min-h-[120px]",
              "transform-gpu transition-transform duration-300",
              isScrolled && "scale-95"
            )}
          />
        </motion.div>

        {isDragging && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-indigo-500/5 rounded-xl flex items-center justify-center backdrop-blur-sm"
          >
            <p className="text-indigo-400 font-medium">Trage fișierele aici pentru a le atașa</p>
          </motion.div>
        )}
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <FilePreviewList files={selectedFiles} onRemove={removeFile} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
              />
              
              <ActionButtons 
                onFileSelect={handleFileSelect}
                onSubmit={handlePostSubmit}
                isDisabled={!content.trim() && selectedFiles.length === 0}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CreatePost;
