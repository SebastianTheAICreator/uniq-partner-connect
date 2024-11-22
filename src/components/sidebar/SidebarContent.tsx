import { Clock, TrendingUp, Bookmark, Users, MessageSquare, Bell, LogOut, User } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

interface SidebarContentProps {
  conversations: Array<{
    id: string;
    title: string;
  }>;
}

const SidebarContent = ({ conversations }: SidebarContentProps) => {
  const menuItems = [
    { icon: Clock, label: 'Recente', badge: '3' },
    { icon: TrendingUp, label: 'Trending', badge: '5' },
    { icon: Bookmark, label: 'Salvate', badge: '12' },
    { icon: Users, label: 'Comunități', badge: '24' },
    { icon: MessageSquare, label: 'Mesaje', badge: '2' },
    { icon: Bell, label: 'Notificări', badge: '9' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
              Comunități
            </h2>
            
            {menuItems.map((item) => (
              <Button 
                key={item.label}
                variant="ghost" 
                className="w-full justify-between group hover:bg-primary/5 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-gray-500 group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium">{item.label}</span>
                </span>
                {item.badge && (
                  <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {item.badge}
                  </span>
                )}
              </Button>
            ))}
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="font-medium text-sm text-gray-500">Conversații Recente</h3>
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="flex items-center space-x-3 p-2 hover:bg-primary/5 rounded-lg cursor-pointer transition-all duration-300 group"
              >
                <Clock className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors truncate">
                  {conv.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 space-y-2 border-t border-gray-100">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 hover:bg-primary/5"
          onClick={() => console.log('Profile clicked')}
        >
          <User className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Profil</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 hover:bg-destructive/5 text-destructive hover:text-destructive"
          onClick={() => console.log('Logout clicked')}
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Deconectare</span>
        </Button>
      </div>
    </div>
  );
};

export default SidebarContent;