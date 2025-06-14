
import { cn } from '@/lib/utils';
import SidebarContent from './SidebarContent';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';

interface SidebarProps {
  conversations: Array<{
    id: string;
    title: string;
  }>;
  onConversationClick?: (id: string) => void;
}

const Sidebar = ({
  conversations,
  onConversationClick
}: SidebarProps) => {
  const { collapsed, setCollapsed, isMobile } = useSidebar();

  return (
    <>
      {/* Modern Sidebar Container */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed left-0 top-[4rem] h-[calc(100vh-4rem)] z-50",
          "bg-[#0f1419] border-r border-gray-800/50",
          "backdrop-blur-xl shadow-2xl",
          "transition-all duration-300 ease-out",
          collapsed ? "w-16" : "w-72",
          isMobile && !collapsed ? "translate-x-0" : "",
          isMobile && collapsed ? "-translate-x-full" : ""
        )}
      >
        {/* Header with integrated toggle */}
        <div className="relative h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-800/30">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Menu className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-semibold text-white">UniQuest</span>
              </div>
            )}
            
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={cn(
                "p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50",
                "border border-gray-700/50 hover:border-gray-600/50",
                "transition-all duration-200",
                collapsed ? "mx-auto" : ""
              )}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <SidebarContent 
              conversations={conversations}
              onConversationClick={onConversationClick}
              collapsed={collapsed}
            />
          </div>
        </div>
      </motion.div>

      {/* Mobile overlay */}
      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
};

export default Sidebar;
