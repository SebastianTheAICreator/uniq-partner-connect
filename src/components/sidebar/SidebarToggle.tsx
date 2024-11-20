import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface SidebarToggleProps {
  isExpanded: boolean;
  onClick: () => void;
}

const SidebarToggle = ({ isExpanded, onClick }: SidebarToggleProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "fixed top-20 z-50 p-3 bg-white/95 backdrop-blur-md shadow-xl rounded-xl hover:bg-primary/10 transition-all duration-300 border border-gray-100/50",
        isExpanded ? "right-6" : "right-6",
        "hover:scale-105 hover:shadow-primary/20"
      )}
    >
      <Menu className="h-5 w-5 text-gray-700 hover:text-primary transition-colors" />
    </Button>
  );
};

export default SidebarToggle;