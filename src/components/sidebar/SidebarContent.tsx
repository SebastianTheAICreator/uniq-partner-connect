
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
                <h3 className="px-3 mb-3 text-xs font-semibold text-[#7B68EE] uppercase tracking-wider">
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
                        "w-full transition-all duration-300 group relative rounded-xl shadow-lg backdrop-blur-sm",
                        collapsed ? "h-12 px-0 justify-center" : "h-11 px-3 justify-start",
                        isActive 
                          ? "bg-gradient-to-r from-[#4A90E2]/30 to-[#7B68EE]/30 text-[#4A90E2] border-r-2 border-[#4A90E2] shadow-[#4A90E2]/25 shadow-lg" 
                          : "text-[#B0C4DE] hover:text-white hover:bg-gradient-to-r hover:from-[#2A3441]/80 hover:to-[#3A4366]/80 hover:shadow-xl",
                        item.isPro && "bg-gradient-to-r from-[#FF8C00]/20 to-[#FFD700]/20 border border-[#FF8C00]/30 shadow-[#FF8C00]/20"
                      )}
                      onClick={() => handleMenuItemClick(item.path)}
                    >
                      <div className={cn(
                        "flex items-center transition-transform duration-200 group-hover:scale-105",
                        collapsed ? "justify-center" : "gap-3 w-full"
                      )}>
                        <item.icon className={cn(
                          "h-5 w-5 transition-all duration-200",
                          isActive ? "text-[#4A90E2] drop-shadow-lg" : "",
                          item.isPro ? "text-[#FF8C00]" : "",
                          !isActive && "group-hover:text-white group-hover:drop-shadow-lg"
                        )} />
                        
                        {!collapsed && (
                          <>
                            <span className="font-semibold flex-1 text-left transition-colors">
                              {item.label}
                            </span>
                            
                            {item.badge && (
                              <span className={cn(
                                "px-2 py-1 rounded-lg text-xs font-bold transition-all duration-200 shadow-sm backdrop-blur-sm",
                                isActive 
                                  ? "bg-[#4A90E2]/30 text-[#4A90E2] shadow-[#4A90E2]/30"
                                  : "bg-[#2A3441]/80 text-[#B0C4DE] group-hover:bg-[#3A4366]/80 group-hover:text-white"
                              )}>
                                {item.badge}
                              </span>
                            )}
                            
                            {item.isPro && (
                              <span className="px-2 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-[#FF8C00] to-[#FFD700] text-white shadow-lg shadow-[#FF8C00]/30">
                                PRO
                              </span>
                            )}
                          </>
                        )}
                      </div>
                      
                      {/* Premium tooltip for collapsed state */}
                      {collapsed && (
                        <div className="absolute left-full ml-3 px-3 py-2 bg-[#1A1F2C]/95 border border-[#3A4366]/50 text-white text-sm rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-2xl backdrop-blur-sm">
                          {item.label}
                          <div className="absolute left-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-[#1A1F2C]/95"></div>
                        </div>
                      )}
                    </Button>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Conversations section with premium styling */}
          {!collapsed && conversations.length > 0 && (
            <motion.div variants={itemVariants}>
              <Separator className="my-4 bg-[#3A4366]/40" />
              
              <h3 className="px-3 mb-3 text-xs font-semibold text-[#7B68EE] uppercase tracking-wider">
                Conversații
              </h3>
              
              <div className="space-y-1">
                {conversations.slice(0, 3).map((conv) => (
                  <Button
                    key={conv.id}
                    variant="ghost"
                    className="w-full h-9 px-3 justify-start text-[#B0C4DE] hover:text-white hover:bg-gradient-to-r hover:from-[#2A3441]/80 hover:to-[#3A4366]/80 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm"
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

      {/* Premium Footer */}
      <div className="p-3 border-t border-[#3A4366]/30 bg-gradient-to-r from-[#1A1F2C]/80 to-[#2A3441]/80 backdrop-blur-sm">
        <div className={cn(
          "flex gap-2",
          collapsed ? "flex-col" : "flex-row"
        )}>
          <Button
            variant="ghost"
            className={cn(
              "transition-all duration-300 text-[#B0C4DE] hover:text-white hover:bg-gradient-to-r hover:from-[#2A3441]/80 hover:to-[#3A4366]/80 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm",
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
              "transition-all duration-300 text-[#FF6B6B] hover:text-[#FF8E8E] hover:bg-gradient-to-r hover:from-[#FF6B6B]/20 hover:to-[#FF4757]/20 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 border border-transparent hover:border-[#FF6B6B]/30 backdrop-blur-sm",
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
