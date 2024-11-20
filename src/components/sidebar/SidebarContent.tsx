import { Settings, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface SidebarContentProps {
  isExpanded: boolean;
  conversations: Array<{
    id: string;
    title: string;
  }>;
}

const SidebarContent = ({ isExpanded, conversations }: SidebarContentProps) => {
  if (!isExpanded) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Conversații Recente</h3>
        <ScrollArea className="h-[200px]">
          {conversations.map((conv) => (
            <div key={conv.id} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm truncate">{conv.title}</span>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Setări</h3>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Preferințe
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Globe className="mr-2 h-4 w-4" />
            Limbă
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SidebarContent;