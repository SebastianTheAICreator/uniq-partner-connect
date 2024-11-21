import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SidebarToggleProps {
  isExpanded: boolean;
  onClick: () => void;
}

const SidebarToggle = ({ isExpanded, onClick }: SidebarToggleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (!isHovered) {
      timeout = setTimeout(() => {
        setShowToggle(false);
      }, 300);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: showToggle || isHovered ? 1 : 0 }}
      onMouseEnter={() => {
        setIsHovered(true);
        setShowToggle(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      className="fixed left-0 top-0 bottom-0 w-16 z-50 flex items-center"
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