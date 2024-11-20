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
        "fixed top-20 z-50 p-3 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg hover:bg-primary/5 transition-all duration-300 border border-gray-100",
        isExpanded ? "left-64" : "left-20"
      )}
    >
      <Menu className="h-5 w-5 text-gray-600 hover:text-primary transition-colors" />
    </Button>
  );
};

export default SidebarToggle;