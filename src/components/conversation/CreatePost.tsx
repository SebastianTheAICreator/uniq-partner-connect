import React, { useRef, useState } from 'react';
import { ImageIcon, FileVideo, Paperclip, X, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface CreatePostProps {
  topicId: string;
  onPostCreated: (post: { content: string; files: FilePreview[] }) => void;
}

interface FilePreview {
  id: string;
  file: File;
  type: 'image' | 'video' | 'document';
  preview?: string;
}

const CreatePost = ({ topicId, onPostCreated }: CreatePostProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FilePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      console.log('Submitting post:', { content, files: selectedFiles });
      onPostCreated({
        content: content.trim(),
        files: selectedFiles
      });
      setContent('');
      setSelectedFiles([]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100 p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent">
        Creează o postare nouă
      </h2>

      <div
        className={cn(
          "relative rounded-xl transition-all duration-300",
          isDragging && "ring-2 ring-primary/20"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ce gânduri vrei să împărtășești?"
          className="min-h-[120px] border-2 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
        />
        {isDragging && (
          <div className="absolute inset-0 bg-primary/5 rounded-xl flex items-center justify-center">
            <p className="text-primary font-medium">Trage fișierele aici pentru a le atașa</p>
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-4"
          >
            {selectedFiles.map(file => (
              <motion.div
                key={file.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative group"
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  {file.preview ? (
                    <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400">
                      {file.type === 'video' && <FileVideo className="w-8 h-8" />}
                      {file.type === 'document' && <Paperclip className="w-8 h-8" />}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        
        <Button 
          onClick={() => handleFileSelect('image')} 
          variant="outline" 
          className="group hover:bg-primary/5"
        >
          <ImageIcon className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
          Imagine
        </Button>

        <Button 
          onClick={() => handleFileSelect('video')} 
          variant="outline"
          className="group hover:bg-primary/5"
        >
          <FileVideo className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
          Video
        </Button>

        <Button 
          onClick={() => handleFileSelect('document')} 
          variant="outline"
          className="group hover:bg-primary/5"
        >
          <Paperclip className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
          Atașament
        </Button>

        <Button 
          onClick={handlePostSubmit}
          className={cn(
            "ml-auto",
            "bg-gradient-to-r from-primary via-purple-600 to-pink-500",
            "hover:from-primary/90 hover:via-purple-700 hover:to-pink-600",
            "text-white shadow-lg hover:shadow-xl transition-all duration-300"
          )}
          disabled={!content.trim() && selectedFiles.length === 0}
        >
          <Send className="mr-2 h-4 w-4" />
          Publică
        </Button>
      </div>
    </motion.div>
  );
};

export default CreatePost;
