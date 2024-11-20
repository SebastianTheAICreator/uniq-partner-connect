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
        "fixed left-0 top-20 z-50 p-2 bg-white/80 backdrop-blur-sm shadow-md rounded-r-lg",
        isExpanded ? "left-60" : "left-16"
      )}
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
};

export default SidebarToggle;