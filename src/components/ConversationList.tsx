import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ThumbsUp, ThumbsDown, Image as ImageIcon, FileVideo, Paperclip, Clock, Settings, Globe, BellRing, Menu } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import { cn } from '@/lib/utils';

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
  const [hasNotification, setHasNotification] = React.useState(false);
  const [notifications, setNotifications] = React.useState<string[]>([]);

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      toast({
        title: "Postare adăugată",
        description: "Mesajul tău a fost publicat cu succes!",
      });
      setNewPost('');
    }
  };

  const handleFileUpload = () => {
    toast({
      title: "În curând",
      description: "Funcționalitatea de încărcare fișiere va fi disponibilă în curând!",
    });
  };

  const handleLike = () => {
    const newNotification = "Cineva a apreciat postarea ta!";
    setNotifications(prev => [newNotification, ...prev]);
    setHasNotification(true);
    toast({
      title: "Notificare nouă",
      description: newNotification,
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left Sidebar */}
      <motion.div 
        initial={{ x: isExpanded ? 0 : -240 }}
        animate={{ x: isExpanded ? 0 : -240 }}
        className={cn(
          "fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg z-50",
          isExpanded ? "w-60" : "w-16"
        )}
      >
        <div className="p-4">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mb-4 flex items-center justify-center"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <div className="relative mb-4">
            <motion.div
              animate={hasNotification ? {
                rotate: [0, 15, -15, 0],
                transition: { duration: 0.5, repeat: 3 }
              } : {}}
            >
              <Button
                variant="ghost"
                className="w-full relative"
                onClick={() => setHasNotification(false)}
              >
                <BellRing className="h-5 w-5" />
                {hasNotification && (
                  <span className="absolute top-0 right-2 h-2 w-2 bg-red-500 rounded-full" />
                )}
              </Button>
            </motion.div>
            
            {hasNotification && isExpanded && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-12 left-0 w-full bg-white rounded-md shadow-lg p-2 z-50"
                >
                  <ScrollArea className="h-40">
                    {notifications.map((notification, index) => (
                      <div key={index} className="p-2 text-sm border-b border-gray-100 last:border-0">
                        {notification}
                      </div>
                    ))}
                  </ScrollArea>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Conversații Recente</h3>
                <ScrollArea className="h-[200px]">
                  {mockConversations.map((conv) => (
                    <div key={conv.id} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm truncate">{conv.title}</span>
                    </div>
                  ))}
                </ScrollArea>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Setări</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Preferințe
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Globe className="mr-2 h-4 w-4" />
                    Limbă
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className={cn(
          "flex-1 p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50",
          isExpanded ? "ml-60" : "ml-16"
        )}
        layout
      >
        <div className="max-w-4xl mx-auto space-y-8">
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
                        className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors"
                        onClick={handleLike}
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