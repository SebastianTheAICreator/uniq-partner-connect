import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SidebarToggleProps {
  isExpanded: boolean;
  onClick: () => void;
}

const SidebarToggle = ({ isExpanded, onClick }: SidebarToggleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-20 z-50"
    >
      <Button
        variant="ghost"
        onClick={onClick}
        className={cn(
          "p-3 ml-4",
          "bg-white/95 backdrop-blur-md shadow-xl rounded-xl",
          "hover:bg-primary/10 transition-all duration-300",
          "border border-gray-100/50 hover:border-primary/20",
          "hover:scale-105 hover:shadow-primary/20",
          "group"
        )}
      >
        <Menu className="h-5 w-5 text-gray-700 group-hover:text-primary transition-colors" />
      </Button>
    </motion.div>
  );
};

export default SidebarToggle;