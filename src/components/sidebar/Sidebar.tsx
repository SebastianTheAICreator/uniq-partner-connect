
import { cn } from '@/lib/utils';
import SidebarContent from './SidebarContent';
import { motion } from 'framer-motion';

interface SidebarProps {
  conversations: Array<{
    id: string;
    title: string;
  }>;
  onConversationClick?: (id: string) => void;
}

const Sidebar = ({ conversations, onConversationClick }: SidebarProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1
      }}
      className={cn(
        "fixed left-0 top-[4rem] h-[calc(100vh-4rem)]",
        "w-[240px] bg-gradient-to-b from-gray-900 via-blue-900/80 to-gray-900",
        "backdrop-blur-md border-r border-white/5",
        "shadow-[4px_0_15px_rgba(59,130,246,0.1)] z-40",
        "lg:translate-x-0 transition-transform duration-300",
        "-translate-x-full"  // Hidden by default on mobile
      )}
    >
      <motion.div 
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <SidebarContent conversations={conversations} onConversationClick={onConversationClick} />
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
