import { cn } from '@/lib/utils';
import SidebarContent from './SidebarContent';

interface SidebarProps {
  conversations: Array<{
    id: string;
    title: string;
  }>;
}

const Sidebar = ({ conversations }: SidebarProps) => {
  return (
    <div 
      className={cn(
        "fixed left-0 top-[4rem] h-[calc(100vh-4rem)]",
        "w-[240px] bg-gradient-to-b from-white/95 to-white/90",
        "backdrop-blur-md border-r border-gray-100/50",
        "shadow-[4px_0_15px_rgba(0,0,0,0.05)] z-40"
      )}
    >
      <div className="p-4">
        <SidebarContent conversations={conversations} />
      </div>
    </div>
  );
};

export default Sidebar;