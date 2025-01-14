import { Link } from 'react-router-dom';
import { Heart, Users, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from './ui/use-toast';
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { NotificationsPanel } from './notifications/NotificationsPanel';
import { useNotifications } from '@/contexts/NotificationContext';

const Navbar = () => {
  const { toast } = useToast();
  const { notifications, markAsRead, clearAll, unreadCount } = useNotifications();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#1a1a2e]/80 via-[#16213e]/80 to-[#1a1a2e]/80 backdrop-blur-md border-b border-white/10 shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hover:animate-text-shine">
              UniQ
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link 
              to="/matches" 
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110"
              title="Matches"
            >
              <Heart className="w-6 h-6 text-primary hover:text-primary-hover transition-colors" />
            </Link>
            <Link 
              to="/community" 
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110"
              title="Community"
            >
              <Users className="w-6 h-6 text-secondary hover:text-secondary-hover transition-colors" />
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 relative"
                  title="Notifications"
                >
                  <Bell className="w-6 h-6 text-accent hover:text-accent-hover transition-colors" />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center"
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