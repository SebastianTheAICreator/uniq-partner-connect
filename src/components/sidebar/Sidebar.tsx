import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import SidebarContent from './SidebarContent';
import SidebarToggle from './SidebarToggle';

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  conversations: Array<{
    id: string;
    title: string;
  }>;
}

const Sidebar = ({ isExpanded, setIsExpanded, conversations }: SidebarProps) => {
  return (
    <>
      <motion.div 
        initial={{ x: isExpanded ? 0 : -280 }}
        animate={{ x: isExpanded ? 0 : -280 }}
        className={cn(
          "fixed left-0 top-0 h-full bg-white/95 backdrop-blur-md border-r border-gray-100/50 shadow-2xl z-50",
          "transition-all duration-300 ease-in-out",
          isExpanded ? "w-[280px]" : "w-20"
        )}
      >
        <div className="p-6">
          <SidebarContent 
            isExpanded={isExpanded}
            conversations={conversations}
          />
        </div>
      </motion.div>
      <SidebarToggle 
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      />
    </>
  );
};

export default Sidebar;