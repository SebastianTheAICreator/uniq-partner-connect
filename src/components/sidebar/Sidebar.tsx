
import { cn } from '@/lib/utils';
import SidebarContent from './SidebarContent';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  conversations: Array<{
    id: string;
    title: string;
  }>;
  onConversationClick?: (id: string) => void;
}

const Sidebar = ({ conversations, onConversationClick }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

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
          "fixed left-0 top-[4rem] h-[calc(100vh-4rem)] z-30",
          "bg-gradient-to-br from-[#1a1a2e] to-[#16213e]",
          "backdrop-blur-md border-r border-white/10",
          "shadow-[0_4px_30px_rgba(0,0,0,0.2)]",
          "lg:translate-x-0 transition-all duration-500 ease-in-out",
          collapsed ? "w-[80px]" : "w-[280px]",
          "-translate-x-full sm:translate-x-0" // Hidden by default on mobile, visible on sm and up
        )}
      >
        <div className="h-full w-full relative flex flex-col">
          <div 
            className={cn(
              "absolute -right-4 top-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-1",
              "shadow-lg cursor-pointer z-50 border border-white/20 hover:scale-110 transition-transform",
              "hover:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            )}
            onClick={() => setCollapsed(!collapsed)}
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
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-20 sm:hidden transition-opacity",
          "-translate-x-full" // Hidden by default
        )}
        onClick={() => setCollapsed(true)}
      />
    </>
  );
};

export default Sidebar;
