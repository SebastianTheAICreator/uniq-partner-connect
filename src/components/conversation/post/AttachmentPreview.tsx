
import React from 'react';
import { X, FileIcon, FileVideo, FileImage } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilePreview } from './types';
import { cn } from '@/lib/utils';

interface AttachmentPreviewProps {
  files: FilePreview[];
  onRemove: (id: string) => void;
}

export const AttachmentPreview = ({ files, onRemove }: AttachmentPreviewProps) => {
  if (files.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
      >
        {files.map(file => (
          <motion.div
            key={file.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="relative group"
          >
            <div className={cn(
              "aspect-square rounded-xl overflow-hidden",
              "bg-[#1E2235] border border-[#3A4366]",
              "flex items-center justify-center",
              "group-hover:border-primary/40 transition-colors"
            )}>
              {file.type === 'image' && file.preview ? (
                <div className="w-full h-full relative">
                  <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ) : (
                <div className="text-white/60 flex flex-col items-center justify-center p-4">
                  {file.type === 'video' ? (
                    <FileVideo className="w-10 h-10 mb-2 text-purple-400" />
                  ) : file.type === 'image' ? (
                    <FileImage className="w-10 h-10 mb-2 text-blue-400" />
                  ) : (
                    <FileIcon className="w-10 h-10 mb-2 text-pink-400" />
                  )}
                  <p className="text-xs text-center text-white/70 font-medium truncate max-w-full px-2">
                    {file.file.name.length > 20 
                      ? `${file.file.name.substring(0, 18)}...` 
                      : file.file.name}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => onRemove(file.id)}
              className={cn(
                "absolute -top-2 -right-2 rounded-full p-1",
                "bg-black/70 backdrop-blur-sm shadow-lg",
                "opacity-0 group-hover:opacity-100 transition-all duration-200",
                "hover:bg-red-500/80 hover:scale-110"
              )}
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
