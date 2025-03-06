
import { cn } from '@/lib/utils';
import SidebarContent from './SidebarContent';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

interface SidebarProps {
  conversations: Array<{
    id: string;
    title: string;
  }>;
  onConversationClick?: (id: string) => void;
  onCollapseChange?: (collapsed: boolean) => void;
}

const Sidebar = ({ conversations, onConversationClick, onCollapseChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Notify parent component when collapse state changes
  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(collapsed);
    }
  }, [collapsed, onCollapseChange]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    if (onCollapseChange) {
      onCollapseChange(!collapsed);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 0.8,
          ease: [0.6, -0.05, 0.01, 0.99]
        }}
        className={cn(
          "fixed left-0 top-[4rem] h-[calc(100vh-4rem)]",
          "bg-gradient-to-br from-[#151822]/95 via-[#1A1F2C]/95 to-[#151822]/95",
          "backdrop-blur-lg border-r border-white/5",
          "shadow-[0_4px_30px_rgba(0,0,0,0.15)]",
          "transition-all duration-500 ease-in-out",
          collapsed ? "w-[80px]" : "w-[280px]",
          isMobile ? "-translate-x-full sm:translate-x-0" : "translate-x-0",
          // Increased z-index to make sure sidebar appears above other elements
          "z-50"
        )}
      >
        <div className="h-full w-full relative flex flex-col">
          <div 
            className={cn(
              "absolute -right-3 top-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-1",
              "shadow-lg cursor-pointer z-50 border border-white/10 hover:scale-110 transition-transform",
              "hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]"
            )}
            onClick={toggleCollapsed}
          >
            {collapsed ? 
              <ChevronRight className="h-4 w-4 text-white" /> : 
              <ChevronLeft className="h-4 w-4 text-white" />
            }
          </div>
          
          <div className="p-4 flex-1 overflow-hidden">
            <SidebarContent 
              conversations={conversations} 
              onConversationClick={onConversationClick} 
              collapsed={collapsed}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Overlay for mobile that closes sidebar when clicked */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity",
            isMobile ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
          onClick={() => toggleCollapsed()}
        />
      )}
    </>
  );
};

export default Sidebar;
