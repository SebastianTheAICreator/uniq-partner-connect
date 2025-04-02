
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
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-b from-gray-900/95 to-gray-900/90 backdrop-blur-md border-b border-white/5 shadow-lg z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent hover:from-blue-500 hover:to-emerald-500 transition-all duration-300">
              UniQ
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link 
              to="/matches" 
              className="p-2 rounded-full hover:bg-blue-500/10 transition-all duration-300 hover:scale-110"
              title="Matches"
            >
              <Heart className="w-6 h-6 text-gray-400 hover:text-blue-400 transition-colors" />
            </Link>
            <Link 
              to="/community" 
              className="p-2 rounded-full hover:bg-blue-500/10 transition-all duration-300 hover:scale-110"
              title="Community"
            >
              <Users className="w-6 h-6 text-gray-400 hover:text-blue-400 transition-colors" />
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-blue-500/10 transition-all duration-300 relative"
                  title="Notifications"
                >
                  <Bell className="w-6 h-6 text-gray-400 hover:text-blue-400 transition-colors" />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full text-white text-xs flex items-center justify-center font-medium"
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
