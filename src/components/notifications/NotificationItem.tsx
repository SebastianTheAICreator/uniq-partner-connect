
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Notification } from '@/types/notifications';
import { 
  Heart, 
  MessageCircle, 
  Users, 
  PlusCircle, 
  AtSign, 
  Bell, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'POST_LIKE':
      return <Heart className="w-5 h-5 text-pink-400" />;
    case 'POST_COMMENT':
    case 'COMMENT_REPLY':
      return <MessageCircle className="w-5 h-5 text-blue-400" />;
    case 'GROUP_JOIN':
    case 'NEW_GROUP':
      return <Users className="w-5 h-5 text-green-400" />;
    case 'NEW_DISCUSSION':
      return <PlusCircle className="w-5 h-5 text-purple-400" />;
    case 'MENTION':
      return <AtSign className="w-5 h-5 text-yellow-400" />;
    default:
      return <Bell className="w-5 h-5 text-gray-400" />;
  }
};

const NotificationItem = React.forwardRef<HTMLDivElement, NotificationItemProps>(({ 
  notification,
  onMarkAsRead 
}, ref) => {
  // Format notification time to relative time (e.g. "2 hours ago")
  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return past.toLocaleDateString();
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30,
        mass: 1
      }}
      className={cn(
        "group relative overflow-hidden rounded-xl backdrop-blur-md transition-all duration-300",
        notification.read
          ? "bg-gradient-to-r from-white/5 to-transparent border border-white/5"
          : "bg-gradient-to-r from-primary/20 via-secondary/15 to-transparent border-t border-l border-white/10 border-b border-r border-white/5 shadow-[0_0_15px_rgba(74,144,226,0.1)]"
      )}
    >
      {/* Premium notification glow effect for unread notifications */}
      {!notification.read && (
        <motion.div 
          className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{ 
            opacity: [0.2, 0.5, 0.2], 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
          }}
        />
      )}

      <div className="flex items-start p-4 gap-4">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={cn(
            "flex-shrink-0 p-2.5 rounded-lg",
            notification.read
              ? "bg-white/5"
              : "bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-xl"
          )}
        >
          {getNotificationIcon(notification.type)}
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={cn(
              "font-medium leading-tight line-clamp-1",
              notification.read 
                ? "text-white/80" 
                : "text-white gradient-text animate-text-shine font-semibold"
            )}>
              {notification.title}
            </h4>

            <span className="text-xs text-white/50 flex-shrink-0">
              {getRelativeTime(notification.timestamp)}
            </span>
          </div>

          <p className="text-sm text-white/70 mt-1 mb-2 line-clamp-2">
            {notification.message}
          </p>
          
          {!notification.read && (
            <div className="flex justify-end">
              <Button 
                variant="aurora" 
                size="sm" 
                rounded="full"
                onClick={() => onMarkAsRead(notification.id)}
                className="group/btn"
              >
                <span className="mr-1.5">Mark as read</span>
                <Check className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              </Button>
            </div>
          )}

          {notification.read && notification.metadata && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-end"
            >
              <Button 
                variant="frost" 
                size="sm" 
                rounded="full"
                className="opacity-70 hover:opacity-100 group/btn"
              >
                <span className="mr-1">View details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

NotificationItem.displayName = "NotificationItem";

export { NotificationItem };
