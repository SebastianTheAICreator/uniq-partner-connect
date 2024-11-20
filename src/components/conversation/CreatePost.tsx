import React, { useRef, useState } from 'react';
import { ImageIcon, FileVideo, Paperclip } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CreatePostProps {
  topicId: string;
  onPostCreated: () => void;
}

const CreatePost = ({ topicId, onPostCreated }: CreatePostProps) => {
  const { toast } = useToast();
  const [newPost, setNewPost] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({
    image: null,
    video: null,
    document: null
  });
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (type: 'image' | 'video' | 'document') => {
    const inputRef = {
      image: imageInputRef,
      video: videoInputRef,
      document: documentInputRef
    }[type];
    
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'document') => {
    const file = event.target.files?.[0] || null;
    setSelectedFiles(prev => ({ ...prev, [type]: file }));
    
    if (file) {
      toast({
        title: "Fișier încărcat",
        description: `${file.name} a fost încărcat cu succes!`,
      });
    }
  };

  const handlePostSubmit = () => {
    if (newPost.trim() || Object.values(selectedFiles).some(file => file !== null)) {
      console.log('Posting to topic:', topicId, 'with files:', selectedFiles);
      toast({
        title: "Postare adăugată",
        description: "Mesajul tău a fost publicat cu succes!",
      });
      onPostCreated();
      setNewPost('');
      setSelectedFiles({ image: null, video: null, document: null });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-4"
    >
      <h2 className="text-2xl font-semibold gradient-text">Creează o postare nouă</h2>
      <Textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Ce gânduri vrei să împărtășești?"
        className="min-h-[120px]"
      />
      
      <div className="flex flex-wrap gap-4">
        {Object.entries(selectedFiles).map(([type, file]) => 
          file && (
            <div key={type} className="relative bg-gray-100 p-2 rounded-lg">
              <span className="text-sm text-gray-600">{file.name}</span>
              <button
                onClick={() => setSelectedFiles(prev => ({ ...prev, [type]: null }))}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          )
        )}
      </div>

      <div className="flex items-center gap-4">
        <input
          type="file"
          ref={imageInputRef}
          onChange={(e) => handleFileChange(e, 'image')}
          accept="image/*"
          className="hidden"
        />
        <Button 
          onClick={() => handleFileSelect('image')} 
          variant="outline" 
          className={cn(
            "group",
            selectedFiles.image && "border-primary text-primary"
          )}
        >
          <ImageIcon className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
          Imagine
        </Button>

        <input
          type="file"
          ref={videoInputRef}
          onChange={(e) => handleFileChange(e, 'video')}
          accept="video/*"
          className="hidden"
        />
        <Button 
          onClick={() => handleFileSelect('video')} 
          variant="outline" 
          className={cn(
            "group",
            selectedFiles.video && "border-primary text-primary"
          )}
        >
          <FileVideo className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
          Video
        </Button>

        <input
          type="file"
          ref={documentInputRef}
          onChange={(e) => handleFileChange(e, 'document')}
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
        />
        <Button 
          onClick={() => handleFileSelect('document')} 
          variant="outline" 
          className={cn(
            "group",
            selectedFiles.document && "border-primary text-primary"
          )}
        >
          <Paperclip className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
          Atașament
        </Button>

        <Button 
          onClick={handlePostSubmit} 
          className="ml-auto"
          disabled={!newPost.trim() && !Object.values(selectedFiles).some(file => file !== null)}
        >
          Publică
        </Button>
      </div>
    </motion.div>
  );
};

export default CreatePost;