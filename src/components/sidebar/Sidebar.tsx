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
        initial={{ x: isExpanded ? 0 : -240 }}
        animate={{ x: isExpanded ? 0 : -240 }}
        className={cn(
          "fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg z-50",
          isExpanded ? "w-60" : "w-16"
        )}
      >
        <div className="p-4">
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