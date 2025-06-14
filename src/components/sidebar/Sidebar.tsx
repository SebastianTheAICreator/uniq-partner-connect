
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
      {/* Premium Dark Sidebar Container */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed left-0 top-[4rem] h-[calc(100vh-4rem)] z-50",
          "bg-gradient-to-b from-[#0A0C10] via-[#0F1117] to-[#0A0C10]",
          "border-r border-[#3A4366]/30 shadow-2xl",
          "backdrop-blur-xl",
          "transition-all duration-300 ease-out",
          collapsed ? "w-16" : "w-72",
          isMobile && !collapsed ? "translate-x-0" : "",
          isMobile && collapsed ? "-translate-x-full" : ""
        )}
        style={{
          boxShadow: "4px 0 25px rgba(0, 0, 0, 0.4), 0 0 50px rgba(74, 144, 226, 0.08)"
        }}
      >
        {/* Header with premium styling */}
        <div className="relative h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-[#3A4366]/30 bg-gradient-to-r from-[#1A1F2C]/90 to-[#2A3441]/90 backdrop-blur-sm">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4A90E2] via-[#7B68EE] to-[#00D4FF] flex items-center justify-center shadow-lg shadow-[#4A90E2]/30">
                  <Menu className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#4A90E2] to-[#7B68EE]">
                  UniQuest
                </span>
              </div>
            )}
            
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={cn(
                "p-2 rounded-xl bg-[#2A3441]/80 hover:bg-[#3A4366]/80",
                "border border-[#3A4366]/50 hover:border-[#4A90E2]/50",
                "transition-all duration-200 shadow-lg hover:shadow-xl",
                "hover:scale-105 active:scale-95 backdrop-blur-sm",
                collapsed ? "mx-auto" : ""
              )}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4 text-[#B0C4DE] hover:text-white transition-colors" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-[#B0C4DE] hover:text-white transition-colors" />
              )}
            </button>
          </div>

          {/* Content with premium dark theme */}
          <div className="flex-1 overflow-hidden bg-gradient-to-b from-[#1A1F2C]/60 to-[#0A0C10]/60 backdrop-blur-sm">
            <SidebarContent 
              conversations={conversations}
              onConversationClick={onConversationClick}
              collapsed={collapsed}
            />
          </div>
        </div>
      </motion.div>

      {/* Premium mobile overlay */}
      {isMobile && !collapsed && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
};

export default Sidebar;
