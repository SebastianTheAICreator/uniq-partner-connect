
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
      return <Heart className="w-5 h-5 text-interactive" />;
    case 'POST_COMMENT':
    case 'COMMENT_REPLY':
      return <MessageCircle className="w-5 h-5 text-interactive" />;
    case 'GROUP_JOIN':
    case 'NEW_GROUP':
      return <Users className="w-5 h-5 text-interactive" />;
    case 'NEW_DISCUSSION':
      return <PlusCircle className="w-5 h-5 text-interactive" />;
    case 'MENTION':
      return <AtSign className="w-5 h-5 text-interactive" />;
    default:
      return <Bell className="w-5 h-5 text-foreground/50" />;
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
        "group relative overflow-hidden rounded border transition-all duration-300",
        notification.read
          ? "bg-primary/80 border-white/5"
          : "bg-secondary/30 border-interactive/20 shadow-sm"
      )}
    >
      <div className="flex items-start p-4 gap-4">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className={cn(
            "flex-shrink-0 p-2.5 rounded",
            notification.read
              ? "bg-secondary/30"
              : "bg-interactive/10"
          )}
        >
          {getNotificationIcon(notification.type)}
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={cn(
              "font-medium leading-tight line-clamp-1",
              notification.read 
                ? "text-foreground/80" 
                : "text-interactive font-semibold"
            )}>
              {notification.title}
            </h4>

            <span className="text-xs text-foreground/50 flex-shrink-0">
              {getRelativeTime(notification.timestamp)}
            </span>
          </div>

          <p className="text-sm text-foreground/70 mt-1 mb-2 line-clamp-2">
            {notification.message}
          </p>
          
          {!notification.read && (
            <div className="flex justify-end">
              <Button 
                variant="classic-blue" 
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
                variant="classic-outline" 
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
