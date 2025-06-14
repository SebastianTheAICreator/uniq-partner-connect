
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Share2,
  TrendingUp,
  X,
  Settings,
  Check,
  Star,
  AlertCircle
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'share' | 'mention' | 'trending' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

interface EnhancedNotificationSystemProps {
  className?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    title: 'New likes on your post',
    message: 'Alexandra and 12 others liked your post about AI innovation',
    timestamp: '2m ago',
    read: false,
    priority: 'medium'
  },
  {
    id: '2',
    type: 'comment',
    title: 'New comment',
    message: 'Michael replied to your post: "Great insights! This really changed my perspective..."',
    timestamp: '5m ago',
    read: false,
    priority: 'high'
  },
  {
    id: '3',
    type: 'follow',
    title: 'New follower',
    message: 'Sarah Blackwood started following you',
    timestamp: '1h ago',
    read: true,
    priority: 'low'
  },
  {
    id: '4',
    type: 'trending',
    title: 'Your post is trending',
    message: 'Your post about market analysis is trending in #strategy',
    timestamp: '2h ago',
    read: false,
    priority: 'high'
  }
];

const NotificationIcon = ({ type, priority }: { type: Notification['type']; priority: Notification['priority'] }) => {
  const baseClasses = "h-4 w-4";
  
  const iconMap = {
    like: <Heart className={cn(baseClasses, "text-red-400")} />,
    comment: <MessageCircle className={cn(baseClasses, "text-blue-400")} />,
    follow: <UserPlus className={cn(baseClasses, "text-green-400")} />,
    share: <Share2 className={cn(baseClasses, "text-purple-400")} />,
    mention: <span className={cn(baseClasses, "text-amber-400")}>@</span>,
    trending: <TrendingUp className={cn(baseClasses, "text-orange-400")} />,
    system: <AlertCircle className={cn(baseClasses, "text-gray-400")} />
  };

  return (
    <div className={cn(
      "relative p-2 rounded-full",
      priority === 'high' && "bg-red-500/10 ring-1 ring-red-500/20",
      priority === 'medium' && "bg-blue-500/10 ring-1 ring-blue-500/20",
      priority === 'low' && "bg-gray-500/10 ring-1 ring-gray-500/20"
    )}>
      {iconMap[type]}
      {priority === 'high' && (
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
          <div className="h-1.5 w-1.5 bg-white rounded-full" />
        </div>
      )}
    </div>
  );
};

const EnhancedNotificationSystem = ({ className }: EnhancedNotificationSystemProps) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'high':
        return notification.priority === 'high';
      default:
        return true;
    }
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Auto-hide after 5 seconds for mobile toast notifications
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen && window.innerWidth < 768) {
        setIsOpen(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div className={cn("relative", className)}>
      {/* Notification bell button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative h-10 w-10 p-0 rounded-full",
          "text-white/70 hover:text-white hover:bg-white/10",
          "transition-all duration-300",
          unreadCount > 0 && "text-blue-400 hover:text-blue-300"
        )}
      >
        <Bell className="h-5 w-5" />
        
        {/* Notification badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-[#0d1117]"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* High priority indicator */}
        {highPriorityCount > 0 && (
          <div className="absolute top-0 right-0 h-2 w-2 bg-orange-500 rounded-full animate-pulse" />
        )}
      </Button>

      {/* Notification panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute right-0 top-12 w-80 md:w-96",
                "bg-[#0f1419]/95 backdrop-blur-xl rounded-2xl border border-white/10",
                "shadow-2xl shadow-black/50 z-50",
                "max-h-[80vh] md:max-h-96 overflow-hidden",
                // Mobile positioning
                "md:right-0 right-4 left-4 md:left-auto md:w-96"
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-white/60 hover:text-white text-xs px-2 py-1 h-7"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Mark all read
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0 rounded-full text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Filter tabs */}
              <div className="flex items-center gap-1 p-3 border-b border-white/5">
                {[
                  { key: 'all', label: 'All', count: notifications.length },
                  { key: 'unread', label: 'Unread', count: unreadCount },
                  { key: 'high', label: 'Important', count: highPriorityCount }
                ].map(({ key, label, count }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key as any)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm transition-all duration-200 flex items-center gap-1.5",
                      filter === key 
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {label}
                    {count > 0 && (
                      <span className={cn(
                        "text-xs px-1.5 py-0.5 rounded-full",
                        filter === key ? "bg-blue-500/30" : "bg-white/10"
                      )}>
                        {count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Notifications list */}
              <div className="max-h-80 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className={cn(
                          "relative p-4 border-b border-white/5 last:border-b-0",
                          "hover:bg-white/[0.02] transition-colors cursor-pointer group",
                          !notification.read && "bg-blue-500/[0.02] border-l-2 border-l-blue-500/30"
                        )}
                        onClick={() => !notification.read && markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <NotificationIcon type={notification.type} priority={notification.priority} />
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className={cn(
                                "text-sm font-medium",
                                notification.read ? "text-white/80" : "text-white"
                              )}>
                                {notification.title}
                              </h4>
                              
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeNotification(notification.id);
                                  }}
                                  className="h-6 w-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                            
                            <p className={cn(
                              "text-sm leading-relaxed mb-2",
                              notification.read ? "text-white/50" : "text-white/70"
                            )}>
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-white/40">
                                {notification.timestamp}
                              </span>
                              
                              {!notification.read && (
                                <div className="h-2 w-2 bg-blue-500 rounded-full" />
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-8 text-center"
                    >
                      <Bell className="h-12 w-12 text-white/20 mx-auto mb-3" />
                      <p className="text-white/60 text-sm">
                        {filter === 'unread' 
                          ? 'No unread notifications' 
                          : filter === 'high'
                            ? 'No important notifications'
                            : 'No notifications yet'
                        }
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {filteredNotifications.length > 0 && (
                <div className="p-3 border-t border-white/10">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-white/60 hover:text-white hover:bg-white/5 text-sm"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Notification Settings
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedNotificationSystem;
