
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
                <h3 className="px-3 mb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                        "w-full transition-all duration-200 group relative",
                        collapsed ? "h-12 px-0 justify-center" : "h-11 px-3 justify-start",
                        isActive 
                          ? "bg-blue-500/10 text-blue-400 border-r-2 border-blue-500" 
                          : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50",
                        item.isPro && "bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20"
                      )}
                      onClick={() => handleMenuItemClick(item.path)}
                    >
                      <div className={cn(
                        "flex items-center",
                        collapsed ? "justify-center" : "gap-3 w-full"
                      )}>
                        <item.icon className={cn(
                          "h-5 w-5 transition-colors",
                          isActive ? "text-blue-400" : "",
                          item.isPro ? "text-orange-400" : ""
                        )} />
                        
                        {!collapsed && (
                          <>
                            <span className="font-medium flex-1 text-left">
                              {item.label}
                            </span>
                            
                            {item.badge && (
                              <span className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                isActive 
                                  ? "bg-blue-500/20 text-blue-300"
                                  : "bg-gray-700/50 text-gray-400"
                              )}>
                                {item.badge}
                              </span>
                            )}
                            
                            {item.isPro && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-orange-400 to-purple-400 text-white">
                                PRO
                              </span>
                            )}
                          </>
                        )}
                      </div>
                      
                      {/* Tooltip for collapsed state */}
                      {collapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                          {item.label}
                        </div>
                      )}
                    </Button>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Conversations section - only show when not collapsed */}
          {!collapsed && conversations.length > 0 && (
            <motion.div variants={itemVariants}>
              <Separator className="my-4 bg-gray-800/50" />
              
              <h3 className="px-3 mb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Conversații
              </h3>
              
              <div className="space-y-1">
                {conversations.slice(0, 3).map((conv) => (
                  <Button
                    key={conv.id}
                    variant="ghost"
                    className="w-full h-9 px-3 justify-start text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                    onClick={() => onConversationClick?.(conv.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-3" />
                    <span className="truncate text-sm">{conv.title}</span>
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-gray-800/30">
        <div className={cn(
          "flex gap-2",
          collapsed ? "flex-col" : "flex-row"
        )}>
          <Button
            variant="ghost"
            className={cn(
              "transition-all duration-200 text-gray-400 hover:text-gray-200 hover:bg-gray-800/50",
              collapsed ? "h-12 px-0 justify-center" : "flex-1 justify-center"
            )}
            onClick={() => console.log('Profile clicked')}
          >
            <User className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Profil</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "transition-all duration-200 text-red-400 hover:text-red-300 hover:bg-red-500/10",
              collapsed ? "h-12 px-0 justify-center" : "flex-1 justify-center"
            )}
            onClick={() => console.log('Logout clicked')}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Ieșire</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
