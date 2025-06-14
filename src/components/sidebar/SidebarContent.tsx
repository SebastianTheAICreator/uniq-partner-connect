
import { 
  Home, TrendingUp, Video, Newspaper, Users, Building,
  MessageSquare, Heart, Banknote, Settings, User, LogOut
} from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Organized menu sections
  const menuSections = [
    {
      title: "Principală",
      items: [
        { icon: Home, label: 'Feed', path: '/feed', badge: 3 },
        { icon: TrendingUp, label: 'Trending', path: '/trending-topics', badge: 5 }
      ]
    },
    {
      title: "Conținut",
      items: [
        { icon: Video, label: 'UniVideo', path: '/univideo', badge: 12 },
        { icon: Newspaper, label: 'UniNews', path: '/uninews', badge: 8 }
      ]
    },
    {
      title: "Social", 
      items: [
        { icon: Users, label: 'Comuniti', path: '/community', badge: 24 },
        { icon: MessageSquare, label: 'Prieteni', path: '/friends', badge: 9 },
        { icon: MessageSquare, label: 'Mesaje', path: '/messages', badge: 2 },
        { icon: Heart, label: 'Matches', path: '/matches', badge: 7 }
      ]
    },
    {
      title: "Business",
      items: [
        { icon: Banknote, label: 'UniBanking', path: '/unibanking', badge: 4 },
        { icon: Building, label: 'Enterprise', path: '/enterprise', isPro: true }
      ]
    }
  ];

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 px-3 py-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {menuSections.map((section, sectionIndex) => (
            <motion.div key={section.title} variants={itemVariants}>
              {!collapsed && (
                <h3 className="px-3 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = currentPath === item.path;
                  
                  return (
                    <Button
                      key={item.label}
                      variant="ghost"
                      className={cn(
                        "w-full transition-all duration-300 group relative rounded-xl shadow-lg",
                        collapsed ? "h-12 px-0 justify-center" : "h-11 px-3 justify-start",
                        isActive 
                          ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-300 border-r-2 border-blue-400 shadow-blue-500/25 shadow-lg" 
                          : "text-slate-400 hover:text-slate-200 hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60 hover:shadow-xl",
                        item.isPro && "bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 shadow-orange-500/20"
                      )}
                      onClick={() => handleMenuItemClick(item.path)}
                    >
                      <div className={cn(
                        "flex items-center transition-transform duration-200 group-hover:scale-105",
                        collapsed ? "justify-center" : "gap-3 w-full"
                      )}>
                        <item.icon className={cn(
                          "h-5 w-5 transition-all duration-200",
                          isActive ? "text-blue-400 drop-shadow-lg" : "",
                          item.isPro ? "text-orange-400" : "",
                          !isActive && "group-hover:text-white group-hover:drop-shadow-lg"
                        )} />
                        
                        {!collapsed && (
                          <>
                            <span className="font-semibold flex-1 text-left transition-colors">
                              {item.label}
                            </span>
                            
                            {item.badge && (
                              <span className={cn(
                                "px-2 py-1 rounded-lg text-xs font-bold transition-all duration-200 shadow-sm",
                                isActive 
                                  ? "bg-blue-500/30 text-blue-200 shadow-blue-500/30"
                                  : "bg-slate-700/60 text-slate-300 group-hover:bg-slate-600/60 group-hover:text-white"
                              )}>
                                {item.badge}
                              </span>
                            )}
                            
                            {item.isPro && (
                              <span className="px-2 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30">
                                PRO
                              </span>
                            )}
                          </>
                        )}
                      </div>
                      
                      {/* Enhanced tooltip for collapsed state */}
                      {collapsed && (
                        <div className="absolute left-full ml-3 px-3 py-2 bg-slate-900/95 border border-slate-700/50 text-white text-sm rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-2xl backdrop-blur-sm">
                          {item.label}
                          <div className="absolute left-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-slate-900/95"></div>
                        </div>
                      )}
                    </Button>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Conversations section with enhanced styling */}
          {!collapsed && conversations.length > 0 && (
            <motion.div variants={itemVariants}>
              <Separator className="my-4 bg-slate-800/60" />
              
              <h3 className="px-3 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Conversații
              </h3>
              
              <div className="space-y-1">
                {conversations.slice(0, 3).map((conv) => (
                  <Button
                    key={conv.id}
                    variant="ghost"
                    className="w-full h-9 px-3 justify-start text-slate-400 hover:text-slate-200 hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    onClick={() => onConversationClick?.(conv.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-3 transition-transform duration-200 group-hover:scale-105" />
                    <span className="truncate text-sm font-medium">{conv.title}</span>
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </ScrollArea>

      {/* Enhanced Footer */}
      <div className="p-3 border-t border-slate-800/50 bg-gradient-to-r from-slate-900/60 to-slate-800/60 backdrop-blur-sm">
        <div className={cn(
          "flex gap-2",
          collapsed ? "flex-col" : "flex-row"
        )}>
          <Button
            variant="ghost"
            className={cn(
              "transition-all duration-300 text-slate-400 hover:text-slate-200 hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60 rounded-xl shadow-lg hover:shadow-xl hover:scale-105",
              collapsed ? "h-12 px-0 justify-center" : "flex-1 justify-center"
            )}
            onClick={() => console.log('Profile clicked')}
          >
            <User className="h-4 w-4" />
            {!collapsed && <span className="ml-2 font-medium">Profil</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "transition-all duration-300 text-red-400 hover:text-red-300 hover:bg-gradient-to-r hover:from-red-600/20 hover:to-red-500/20 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 border border-transparent hover:border-red-500/30",
              collapsed ? "h-12 px-0 justify-center" : "flex-1 justify-center"
            )}
            onClick={() => console.log('Logout clicked')}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2 font-medium">Ieșire</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
