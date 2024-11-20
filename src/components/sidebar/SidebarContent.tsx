import { Settings, Globe, Clock, Users, MessageSquare, Bookmark, TrendingUp, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { motion } from 'framer-motion';
import { Separator } from '../ui/separator';

interface SidebarContentProps {
  isExpanded: boolean;
  conversations: Array<{
    id: string;
    title: string;
  }>;
}

const SidebarContent = ({ isExpanded, conversations }: SidebarContentProps) => {
  if (!isExpanded) return null;

  const menuItems = [
    { icon: Clock, label: 'Recente', badge: '3' },
    { icon: TrendingUp, label: 'Trending', badge: '5' },
    { icon: Bookmark, label: 'Salvate', badge: '12' },
    { icon: Users, label: 'Comunități', badge: '24' },
    { icon: MessageSquare, label: 'Mesaje', badge: '2' },
    { icon: Bell, label: 'Notificări', badge: '9' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Comunități
        </h2>
        <p className="text-sm text-gray-500">Explorează și conectează-te</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Button 
              key={item.label} 
              variant="ghost" 
              className="w-full justify-between group hover:bg-primary/5 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-gray-500 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium">{item.label}</span>
              </span>
              {item.badge && (
                <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  {item.badge}
                </span>
              )}
            </Button>
          ))}
        </div>

        <Separator className="my-6" />

        <ScrollArea className="h-[200px] pr-4">
          <h3 className="font-medium text-sm text-gray-500 mb-3">Conversații Recente</h3>
          {conversations.map((conv) => (
            <div 
              key={conv.id} 
              className="flex items-center space-x-3 p-2 hover:bg-primary/5 rounded-lg cursor-pointer transition-all duration-300 group"
            >
              <Clock className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors truncate">
                {conv.title}
              </span>
            </div>
          ))}
        </ScrollArea>

        <div className="space-y-3 pt-4">
          <h3 className="font-medium text-sm text-gray-500">Setări</h3>
          <Button variant="ghost" className="w-full justify-start group hover:bg-primary/5">
            <Settings className="mr-3 h-4 w-4 text-gray-500 group-hover:text-primary transition-colors" />
            Preferințe
          </Button>
          <Button variant="ghost" className="w-full justify-start group hover:bg-primary/5">
            <Globe className="mr-3 h-4 w-4 text-gray-500 group-hover:text-primary transition-colors" />
            Limbă
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SidebarContent;