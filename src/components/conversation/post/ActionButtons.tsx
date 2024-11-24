import React from 'react';
import { ImageIcon, FileVideo, Paperclip, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ActionButtonsProps {
  onFileSelect: (type: 'image' | 'video' | 'document') => void;
  onSubmit: () => void;
  isDisabled: boolean;
}

export const ActionButtons = ({ onFileSelect, onSubmit, isDisabled }: ActionButtonsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4"
    >
      <Button 
        onClick={() => onFileSelect('image')} 
        variant="outline" 
        className="group hover:bg-white/5 border-white/10 bg-white/5 backdrop-blur-sm text-white"
      >
        <ImageIcon className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
        Imagine
      </Button>

      <Button 
        onClick={() => onFileSelect('video')} 
        variant="outline"
        className="group hover:bg-white/5 border-white/10 bg-white/5 backdrop-blur-sm text-white"
      >
        <FileVideo className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
        Video
      </Button>

      <Button 
        onClick={() => onFileSelect('document')} 
        variant="outline"
        className="group hover:bg-white/5 border-white/10 bg-white/5 backdrop-blur-sm text-white"
      >
        <Paperclip className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
        Atașament
      </Button>

      <Button 
        onClick={onSubmit}
        className={cn(
          "ml-auto",
          "bg-gradient-to-r from-primary via-purple-600 to-pink-500",
          "hover:from-primary/90 hover:via-purple-700 hover:to-pink-600",
          "text-white shadow-lg hover:shadow-xl transition-all duration-300"
        )}
        disabled={isDisabled}
      >
        <Send className="mr-2 h-4 w-4" />
        Publică
      </Button>
    </motion.div>
  );
};