import { cn } from '@/lib/utils';
import SidebarContent from './SidebarContent';
import { motion } from 'framer-motion';

interface SidebarProps {
  conversations: Array<{
    id: string;
    title: string;
  }>;
}

const Sidebar = ({ conversations }: SidebarProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed left-0 top-[4rem] h-[calc(100vh-4rem)]",
        "w-[240px] bg-gradient-to-b from-[#1a1a2e]/95 via-[#16213e]/95 to-[#1a1a2e]/95",
        "backdrop-blur-md border-r border-white/10",
        "shadow-[4px_0_15px_rgba(139,92,246,0.1)] z-40"
      )}
    >
      <div className="p-4">
        <SidebarContent conversations={conversations} />
      </div>
    </motion.div>
  );
};

export default Sidebar;