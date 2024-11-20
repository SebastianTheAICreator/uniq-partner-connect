import { Link } from 'react-router-dom';
import { Heart, Users, Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './ui/use-toast';
import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const Navbar = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simulăm primirea de notificări în timp real
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: 'Notificare nouă',
        message: 'Cineva a răspuns la postarea ta',
        timestamp: 'acum',
        read: false
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
      
      console.log('New notification received:', newNotification);
    }, 30000); // La fiecare 30 secunde

    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId
          ? { ...notif, read: true }
          : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleClearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
    toast({
      title: "Notificări șterse",
      description: "Toate notificările au fost șterse cu succes.",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              UniQ
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link 
              to="/matches" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Matches"
            >
              <Heart className="w-6 h-6 text-primary" />
            </Link>
            <Link 
              to="/community" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Community"
            >
              <Users className="w-6 h-6 text-secondary" />
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                  title="Notifications"
                >
                  <Bell className="w-6 h-6 text-accent" />
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
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle className="flex justify-between items-center">
                    <span>Notificări</span>
                    <button
                      onClick={handleClearAll}
                      className="text-sm text-gray-500 hover:text-primary transition-colors"
                    >
                      Șterge tot
                    </button>
                  </SheetTitle>
                  <SheetDescription>
                    Vezi toate notificările tale recente
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <AnimatePresence>
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className={cn(
                          "p-4 rounded-lg border transition-colors",
                          notification.read
                            ? "bg-gray-50 border-gray-100"
                            : "bg-blue-50 border-blue-100"
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <span className="text-xs text-gray-400 mt-2 block">
                              {notification.timestamp}
                            </span>
                          </div>
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-xs text-blue-600 hover:text-blue-800"
                            >
                              Marchează ca citit
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {notifications.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Nu ai notificări noi
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;