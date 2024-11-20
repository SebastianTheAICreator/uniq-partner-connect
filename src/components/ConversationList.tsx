import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ThumbsUp, ThumbsDown, Image as ImageIcon, FileVideo, Paperclip, Menu } from 'lucide-react';
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

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      toast({
        title: "Postare adăugată",
        description: "Mesajul tău a fost publicat cu succes!",
      });
      window.dispatchEvent(new CustomEvent('newNotification'));
      setNewPost('');
    }
  };

  const handleLike = () => {
    toast({
      title: "Apreciere",
      description: "Ți-a plăcut această postare!",
    });
    window.dispatchEvent(new CustomEvent('newNotification'));
  };

  const handleFileUpload = () => {
    toast({
      title: "În curând",
      description: "Funcționalitatea de încărcare fișiere va fi disponibilă în curând!",
    });
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
          {/* Toggle Sidebar Button */}
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="fixed top-20 left-4 z-50 bg-white/80 backdrop-blur-sm shadow-md rounded-lg"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* New Post Section */}
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
            <div className="flex items-center gap-4">
              <Button onClick={handleFileUpload} variant="outline" className="group">
                <ImageIcon className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                Imagine
              </Button>
              <Button onClick={handleFileUpload} variant="outline" className="group">
                <FileVideo className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                Video
              </Button>
              <Button onClick={handleFileUpload} variant="outline" className="group">
                <Paperclip className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                Atașament
              </Button>
              <Button onClick={handlePostSubmit} className="ml-auto">
                Publică
              </Button>
            </div>
          </motion.div>

          {/* Conversations List */}
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