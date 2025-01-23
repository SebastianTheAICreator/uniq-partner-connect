import { Clock, TrendingUp, Bookmark, Users, MessageSquare, Bell, LogOut, User } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { motion } from 'framer-motion';

interface SidebarContentProps {
  conversations: Array<{
    id: string;
    title: string;
  }>;
  onConversationClick?: (id: string) => void;
}

const SidebarContent = ({ conversations, onConversationClick }: SidebarContentProps) => {
  const menuItems = [
    { icon: Clock, label: 'Recente', badge: '3' },
    { icon: TrendingUp, label: 'Trending', badge: '5' },
    { icon: Bookmark, label: 'Salvate', badge: '12' },
    { icon: Users, label: 'Comunități', badge: '24' },
    { icon: MessageSquare, label: 'Mesaje', badge: '2' },
    { icon: Bell, label: 'Notificări', badge: '9' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <ScrollArea className="flex-1 px-2 custom-scrollbar">
        <div className="space-y-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-2"
          >
            <h2 className="px-3 text-lg font-semibold gradient-text">
              Meniu Principal
            </h2>
            
            {menuItems.map((item) => (
              <motion.div key={item.label} variants={itemVariants}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between group hover:bg-white/5 transition-all duration-300"
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">{item.label}</span>
                  </span>
                  {item.badge && (
                    <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <Separator className="mx-2 bg-white/10" />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <h3 className="px-3 font-medium text-sm text-gray-400">Conversații Recente</h3>
            <div className="space-y-1">
              {conversations.map((conv, index) => (
                <motion.div
                  key={conv.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div
                    onClick={() => onConversationClick?.(conv.id)}
                    className="flex items-center space-x-3 px-3 py-2 hover:bg-white/5 rounded-lg cursor-pointer transition-all duration-300 group"
                  >
                    <Clock className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors truncate">
                      {conv.title}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </ScrollArea>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-auto p-3 space-y-2 border-t border-white/10 bg-white/5 backdrop-blur-sm"
      >
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 hover:bg-white/5 text-gray-300 hover:text-white transition-all duration-300"
          onClick={() => console.log('Profile clicked')}
        >
          <User className="h-4 w-4" />
          <span className="text-sm font-medium">Profil</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 hover:bg-destructive/5 text-destructive hover:text-destructive/80 transition-all duration-300"
          onClick={() => console.log('Logout clicked')}
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Deconectare</span>
        </Button>
      </motion.div>
    </div>
  );
};

export default SidebarContent;