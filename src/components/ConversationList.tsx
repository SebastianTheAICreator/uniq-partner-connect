import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ThumbsUp, ThumbsDown, Image as ImageIcon, FileVideo, Paperclip } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';
import { cn } from '@/lib/utils';
import Sidebar from './sidebar/Sidebar';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  participants: number;
  timestamp: string;
  likes: number;
  dislikes: number;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Discuție despre artă contemporană',
    lastMessage: 'Ce părere aveți despre ultima expoziție de la MoMA?',
    participants: 45,
    timestamp: '2 min ago',
    likes: 123,
    dislikes: 12
  },
  {
    id: '2',
    title: 'Gaming & eSports',
    lastMessage: 'Cine se alătură pentru un turneu amical?',
    participants: 78,
    timestamp: '5 min ago',
    likes: 89,
    dislikes: 5
  },
];

const ConversationList = () => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [newPost, setNewPost] = React.useState('');
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
      console.log('Posting with files:', selectedFiles);
      toast({
        title: "Postare adăugată",
        description: "Mesajul tău a fost publicat cu succes!",
      });
      window.dispatchEvent(new CustomEvent('newNotification'));
      setNewPost('');
      setSelectedFiles({ image: null, video: null, document: null });
    }
  };

  const handleLike = () => {
    toast({
      title: "Apreciere",
      description: "Ți-a plăcut această postare!",
    });
    window.dispatchEvent(new CustomEvent('newNotification'));
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar 
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        conversations={mockConversations}
      />

      <motion.div 
        className={cn(
          "flex-1 p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50",
          isExpanded ? "ml-60" : "ml-16"
        )}
        layout
      >
        <div className="max-w-4xl mx-auto space-y-8 mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 space-y-4"
          >
            <h2 className="text-2xl font-semibold gradient-text">Creează o postare nouă</h2>
            <Textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Ce gânduri vrei să împărtășești?"
              className="min-h-[120px]"
            />
            
            {/* File preview section */}
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

          <ScrollArea className="h-[calc(100vh-24rem)]">
            <div className="space-y-6">
              {mockConversations.map((conv) => (
                <motion.div
                  key={conv.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold">{conv.title}</h3>
                    <span className="text-sm text-gray-500">{conv.timestamp}</span>
                  </div>
                  <p className="mt-2 text-gray-600">{conv.lastMessage}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button 
                        onClick={handleLike}
                        className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{conv.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors">
                        <ThumbsDown className="h-4 w-4" />
                        <span>{conv.dislikes}</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <MessageCircle className="h-4 w-4" />
                      <span>{conv.participants} participanți</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </motion.div>
    </div>
  );
};

export default ConversationList;