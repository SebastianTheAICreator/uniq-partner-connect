
import { 
  Rss, TrendingUp, Video, Newspaper, Users, Banknote, 
  Heart, MessageSquare, MessageCircle, Building, Sparkles 
} from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

interface SidebarContentProps {
  conversations: Array<{
    id: string;
    title: string;
  }>;
  onConversationClick?: (id: string) => void;
  collapsed?: boolean;
}

const SidebarContent = ({
  conversations,
  onConversationClick,
  collapsed = false
}: SidebarContentProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [{
    icon: Rss,
    label: 'Feed',
    badge: '3',
    path: '/feed'
  }, {
    icon: TrendingUp,
    label: 'Trending',
    badge: '5',
    path: '/trending-topics'
  }, {
    icon: Video,
    label: 'UniVideo',
    badge: '12',
    path: '/univideo'
  }, {
    icon: Newspaper,
    label: 'UniNews',
    badge: '8',
    path: '/uninews'
  }, {
    icon: Users,
    label: 'Comuniti',
    badge: '24',
    path: '/community'
  }, {
    icon: Banknote,
    label: 'UniBanking',
    badge: '4',
    path: '/unibanking'
  }, {
    icon: Heart,
    label: 'Matches',
    badge: '7',
    path: '/matches'
  }, {
    icon: MessageSquare,
    label: 'Friends',
    badge: '9',
    path: '/friends'
  }, {
    icon: MessageSquare,
    label: 'Messages',
    badge: '2',
    path: '/messages'
  }, {
    icon: MessageCircle,
    label: 'Ol-yAIChat',
    badge: '1',
    path: '/chat'
  }, {
    icon: Building,
    label: 'UniQ Enterprise',
    badge: 'PRO',
    className: 'bg-gradient-to-r from-blue-400 to-emerald-400 hover:from-blue-500 hover:to-emerald-500',
    path: '/enterprise'
  }];

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
      {/* App logo/brand */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "flex items-center mb-6 pl-2", 
          collapsed ? "justify-center" : "justify-start"
        )}
      >
        <div className="w-10 h-10 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-emerald-500 animate-pulse opacity-50 blur-sm" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-emerald-500 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
        </div>
        {!collapsed && (
          <span className="ml-3 font-poppins font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 text-lg">
            UniQuest
          </span>
        )}
      </motion.div>
      
      <ScrollArea className="flex-1 pr-2 custom-scrollbar">
        <div className="space-y-8">
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-2">
            {!collapsed && (
              <h2 className="px-3 text-sm font-semibold tracking-wider text-white/70 uppercase font-poppins">
                Meniu Principal
              </h2>
            )}
            
            {menuItems.map(item => {
              const isActive = currentPath === item.path;
              
              return (
                <motion.div key={item.label} variants={itemVariants}>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "group transition-all duration-300",
                      collapsed ? "justify-center w-full px-0" : "w-full justify-between",
                      item.className || '',
                      "hover:bg-white/5 relative overflow-hidden",
                      isActive ? "bg-white/10 text-white" : ""
                    )}
                  >
                    <span className={cn(
                      "flex items-center", 
                      collapsed ? "justify-center" : "gap-3"
                    )}>
                      <div className="relative">
                        <div className={cn(
                          "absolute -inset-1 rounded-full blur-sm",
                          isActive 
                            ? "bg-gradient-to-r from-blue-500/50 to-emerald-500/50 opacity-100" 
                            : "bg-gradient-to-r from-blue-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100"
                        )} />
                        <item.icon className={cn(
                          "h-4 w-4 z-10 relative transition-all duration-300",
                          collapsed ? "h-5 w-5" : "",
                          item.label === 'UniQ Enterprise' ? 'text-white animate-pulse' : isActive ? 'text-blue-300' : 'text-blue-400 group-hover:text-blue-300'
                        )} />
                      </div>
                      
                      {!collapsed && (
                        <span className={cn(
                          "text-sm font-medium transition-colors group-hover:text-white font-inter",
                          item.label === 'UniQ Enterprise' ? 'text-white font-semibold' : isActive ? 'text-white' : 'text-gray-300'
                        )}>
                          {item.label}
                        </span>
                      )}
                    </span>
                    
                    {!collapsed && item.badge && (
                      <span className={cn(
                        "px-2 py-1 text-xs font-medium rounded-full",
                        item.label === 'UniQ Enterprise' 
                          ? 'bg-gradient-to-r from-blue-400 to-emerald-400 text-white' 
                          : isActive
                            ? 'bg-gradient-to-r from-blue-500/40 to-emerald-500/40 text-white'
                            : 'bg-gradient-to-r from-blue-500/20 to-emerald-500/20 text-white'
                      )}>
                        {item.badge}
                      </span>
                    )}
                    
                    {/* Show smaller badges when collapsed */}
                    {collapsed && item.badge && (
                      <div className="absolute -top-1 -right-1">
                        <span className={cn(
                          "px-1.5 py-0.5 text-[10px] font-medium rounded-full",
                          item.label === 'UniQ Enterprise' 
                            ? 'bg-gradient-to-r from-blue-400 to-emerald-400 text-white' 
                            : isActive
                              ? 'bg-gradient-to-r from-blue-500/40 to-emerald-500/40 text-white'
                              : 'bg-gradient-to-r from-blue-500/20 to-emerald-500/20 text-white'
                        )}>
                          {item.badge}
                        </span>
                      </div>
                    )}
                    
                    {/* Active indicator bar */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-emerald-400" />
                    )}
                    
                    {/* Hover effect - sliding gradient */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-emerald-500/0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>

          <Separator className="mx-1 bg-white/5" />

          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <h3 className="px-3 font-medium text-xs text-gray-400 uppercase tracking-wider font-inter">
                Conversații Recente
              </h3>
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
                      className="flex items-center space-x-3 px-3 py-2 hover:bg-white/5 rounded-lg cursor-pointer transition-all duration-300 group relative overflow-hidden"
                    >
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-full bg-blue-500/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        <MessageSquare className="h-4 w-4 text-blue-400 group-hover:text-blue-300 relative z-10 transition-colors" />
                      </div>
                      <span className="text-sm text-gray-400 group-hover:text-white transition-colors truncate font-inter">
                        {conv.title}
                      </span>
                      
                      {/* Hover effect - subtle glow */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-emerald-500/0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-auto p-3 space-y-2 border-t border-white/5 backdrop-blur-sm"
      >
        {!collapsed ? (
          <>
            <Button 
              variant="ghost" 
              onClick={() => console.log('Profile clicked')} 
              className="w-full justify-start gap-3 text-gray-300 hover:text-white transition-all duration-300 font-inter hover:bg-white/5 group relative overflow-hidden"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-blue-500/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                <Users className="h-4 w-4 text-blue-400 group-hover:text-blue-300 relative z-10" />
              </div>
              <span className="text-sm font-medium">Profil</span>
              
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-emerald-500/0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => console.log('Logout clicked')} 
              className="w-full justify-start gap-3 text-red-400 hover:text-red-300 transition-all duration-300 font-inter hover:bg-white/5 group relative overflow-hidden"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-red-500/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                <Heart className="h-4 w-4 relative z-10" />
              </div>
              <span className="text-sm font-medium">Deconectare</span>
              
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <Button 
              variant="ghost" 
              onClick={() => console.log('Profile clicked')} 
              className="w-10 h-10 p-0 rounded-full group relative"
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              <Users className="h-4 w-4 text-blue-400 group-hover:text-blue-300" />
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => console.log('Logout clicked')} 
              className="w-10 h-10 p-0 rounded-full group relative"
            >
              <div className="absolute inset-0 rounded-full bg-red-500/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              <Heart className="h-4 w-4 text-red-400 group-hover:text-red-300" />
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SidebarContent;
