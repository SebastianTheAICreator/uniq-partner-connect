import React from 'react';
import { X, FileVideo, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilePreview } from './types';

interface FilePreviewListProps {
  files: FilePreview[];
  onRemove: (id: string) => void;
}

export const FilePreviewList = ({ files, onRemove }: FilePreviewListProps) => {
  if (files.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="flex flex-wrap gap-4"
      >
        {files.map(file => (
          <motion.div
            key={file.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative group"
          >
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-800/30 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:border-white/20 transition-colors">
              {file.preview ? (
                <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-white/60">
                  {file.type === 'video' && <FileVideo className="w-8 h-8" />}
                  {file.type === 'document' && <Paperclip className="w-8 h-8" />}
                </div>
              )}
            </div>
            <button
              onClick={() => onRemove(file.id)}
              className="absolute -top-2 -right-2 bg-black/50 backdrop-blur-sm rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/70"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};