
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
        variant="classic-outline" 
        className="group hover:bg-primary/80"
      >
        <ImageIcon className="mr-2 h-4 w-4 group-hover:text-interactive transition-colors" />
        Imagine
      </Button>

      <Button 
        onClick={() => onFileSelect('video')} 
        variant="classic-outline"
        className="group hover:bg-primary/80"
      >
        <FileVideo className="mr-2 h-4 w-4 group-hover:text-interactive transition-colors" />
        Video
      </Button>

      <Button 
        onClick={() => onFileSelect('document')} 
        variant="classic-outline"
        className="group hover:bg-primary/80"
      >
        <Paperclip className="mr-2 h-4 w-4 group-hover:text-interactive transition-colors" />
        Atașament
      </Button>

      <Button 
        onClick={onSubmit}
        className={cn(
          "ml-auto",
          "bg-interactive hover:bg-interactive/90",
          "text-white shadow-classic hover:shadow-classic-blue transition-all duration-300",
          "border border-white/10 hover:border-white/20",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        disabled={isDisabled}
      >
        <Send className="mr-2 h-4 w-4" />
        Publică
      </Button>
    </motion.div>
  );
};
