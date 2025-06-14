
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
      {/* Enhanced Dark Sidebar Container */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed left-0 top-[4rem] h-[calc(100vh-4rem)] z-50",
          "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950",
          "border-r border-slate-800/50 shadow-2xl",
          "backdrop-blur-xl",
          "transition-all duration-300 ease-out",
          collapsed ? "w-16" : "w-72",
          isMobile && !collapsed ? "translate-x-0" : "",
          isMobile && collapsed ? "-translate-x-full" : ""
        )}
        style={{
          boxShadow: "4px 0 25px rgba(0, 0, 0, 0.3), 0 0 50px rgba(59, 130, 246, 0.05)"
        }}
      >
        {/* Header with integrated toggle and enhanced styling */}
        <div className="relative h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-slate-800/50 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Menu className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  UniQuest
                </span>
              </div>
            )}
            
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={cn(
                "p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/60",
                "border border-slate-700/50 hover:border-slate-600/50",
                "transition-all duration-200 shadow-lg hover:shadow-xl",
                "hover:scale-105 active:scale-95",
                collapsed ? "mx-auto" : ""
              )}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4 text-slate-300 hover:text-white transition-colors" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-slate-300 hover:text-white transition-colors" />
              )}
            </button>
          </div>

          {/* Content with enhanced dark theme */}
          <div className="flex-1 overflow-hidden bg-gradient-to-b from-slate-900/50 to-slate-950/50">
            <SidebarContent 
              conversations={conversations}
              onConversationClick={onConversationClick}
              collapsed={collapsed}
            />
          </div>
        </div>
      </motion.div>

      {/* Enhanced mobile overlay */}
      {isMobile && !collapsed && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
};

export default Sidebar;
