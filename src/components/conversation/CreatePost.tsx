import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';
import { FilePreviewList } from './post/FilePreviewList';
import { ActionButtons } from './post/ActionButtons';
import { CreatePostProps, FilePreview } from './post/types';
import { ArrowLeft } from 'lucide-react';

const CreatePost = ({ topicId, onPostCreated }: CreatePostProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FilePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [forceMinimize, setForceMinimize] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 200], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = window.scrollY > 50;
        setIsScrolled(scrolled);
        console.log('Scroll position:', window.scrollY, 'Is scrolled:', scrolled);
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
      setForceMinimize(true);
    }
  };

  const handleMinimize = () => {
    setIsExpanded(false);
    setForceMinimize(true);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setForceMinimize(false);
  };

  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9]
      }}
      className={cn(
        "relative overflow-hidden z-50",
        "bg-gradient-to-br from-[#1a1a2e]/95 via-[#16213e]/95 to-[#1a1a2e]/95",
        "backdrop-blur-xl rounded-3xl border border-white/10",
        "shadow-[0_8px_32px_rgba(0,0,0,0.15)]",
        "transition-all duration-500 ease-out",
        isExpanded ? "p-8" : "p-6",
        isScrolled || forceMinimize ? "sticky top-4 w-[calc(100%-2rem)] max-w-4xl mx-auto" : "w-full",
        "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
        "group cursor-pointer"
      )}
      onClick={() => !isExpanded && handleExpand()}
    >
      {/* Premium gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />
      
      <motion.div 
        className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ opacity }}
      />

      {isExpanded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleMinimize();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white/70" />
        </button>
      )}

      {(!forceMinimize) && (
        <motion.h2 
          className={cn(
            "relative text-2xl font-bold",
            "bg-gradient-to-r from-primary via-secondary to-accent",
            "bg-clip-text text-transparent mb-6",
            "animate-text-shine"
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Creează o postare nouă
        </motion.h2>
      )}

      <div
        className={cn(
          "relative rounded-2xl transition-all duration-300",
          isDragging && "ring-2 ring-primary/20"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => setIsExpanded(true)}
      >
        <motion.div
          initial={false}
          animate={{ height: "auto" }}
          transition={{ 
            duration: 0.4,
            ease: [0.6, 0.05, -0.01, 0.9]
          }}
        >
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Ce gânduri vrei să împărtășești?"
            className={cn(
              "min-h-[120px] w-full",
              "bg-white/[0.03] border-white/10 text-white/90 placeholder:text-white/40",
              "focus:ring-2 focus:ring-primary/20 focus:border-primary/30",
              "transition-all duration-300 ease-out",
              "backdrop-blur-sm resize-none rounded-xl",
              "hover:bg-white/[0.05]",
              isExpanded ? "min-h-[200px]" : "min-h-[120px]"
            )}
          />
        </motion.div>

        <AnimatePresence>
          {isDragging && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/5 rounded-xl flex items-center justify-center backdrop-blur-sm"
            >
              <motion.p 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="text-primary font-medium flex items-center gap-2"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                Trage fișierele aici pentru a le atașa
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4"
            >
              <FilePreviewList files={selectedFiles} onRemove={removeFile} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="mt-6"
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
