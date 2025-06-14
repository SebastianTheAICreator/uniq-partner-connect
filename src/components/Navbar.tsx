
import { Link, useLocation } from 'react-router-dom';
import { Heart, Users, Bell, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from './ui/use-toast';
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { NotificationsPanel } from './notifications/NotificationsPanel';
import { useNotifications } from '@/contexts/NotificationContext';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { toast } = useToast();
  const { notifications, markAsRead, clearAll, unreadCount } = useNotifications();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-primary/95 border-b border-white/5 shadow-classic z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-interactive hover:text-interactive/90 transition-all duration-300">
              UniQ
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link 
              to="/feed" 
              className={cn(
                "p-2 rounded transition-all duration-300 hover:scale-105",
                location.pathname === '/feed' 
                  ? "bg-secondary/80 text-interactive" 
                  : "hover:bg-secondary/50 text-foreground/70 hover:text-interactive"
              )}
              title="Feed"
            >
              <LayoutDashboard className="w-6 h-6 transition-colors" />
            </Link>
            
            <Link 
              to="/matches" 
              className="p-2 rounded hover:bg-secondary/50 transition-all duration-300 hover:scale-105"
              title="Matches"
            >
              <Heart className="w-6 h-6 text-foreground/70 hover:text-interactive transition-colors" />
            </Link>
            
            <Link 
              to="/community" 
              className={cn(
                "p-2 rounded transition-all duration-300 hover:scale-105",
                location.pathname === '/community' 
                  ? "bg-secondary/80 text-interactive" 
                  : "hover:bg-secondary/50 text-foreground/70 hover:text-interactive"
              )}
              title="Community"
            >
              <Users className="w-6 h-6 transition-colors" />
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded hover:bg-secondary/50 transition-all duration-300 relative"
                  title="Notifications"
                >
                  <Bell className="w-6 h-6 text-foreground/70 hover:text-interactive transition-colors" />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-interactive rounded-full text-white text-xs flex items-center justify-center font-medium"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </motion.button>
              </SheetTrigger>
              <NotificationsPanel 
                notifications={notifications}
                onMarkAsRead={markAsRead}
                onClearAll={clearAll}
              />
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
