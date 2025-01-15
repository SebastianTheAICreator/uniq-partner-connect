import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Notification } from '@/types/notifications';
import { Heart, MessageCircle, Users, PlusCircle, AtSign, Bell } from 'lucide-react';

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

export const NotificationItem = ({ 
  notification,
  onMarkAsRead 
}: NotificationItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={cn(
        "glass-card p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] card-hover",
        notification.read
          ? "bg-gradient-to-r from-white/5 to-white/0"
          : "bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-glow"
      )}
    >
      <div className="flex items-start space-x-4">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
        >
          {getNotificationIcon(notification.type)}
        </motion.div>
        
        <div className="flex-1 space-y-1">
          <h4 className={cn(
            "font-medium",
            notification.read ? "text-white/80" : "text-white gradient-text"
          )}>
            {notification.title}
          </h4>
          <p className="text-sm text-white/70">
            {notification.message}
          </p>
          <span className="text-xs text-white/50 block">
            {new Date(notification.timestamp).toLocaleString()}
          </span>
        </div>

        {!notification.read && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMarkAsRead(notification.id)}
            className="text-xs text-primary hover:text-primary-hover transition-colors whitespace-nowrap"
          >
            Marchează ca citit
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};