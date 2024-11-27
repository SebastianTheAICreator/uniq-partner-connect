import { motion } from 'framer-motion';
import { useNotifications } from '@/contexts/NotificationContext';
import { Notification } from '@/types/notifications';
import { cn } from '@/lib/utils';

export const NotificationItem = (notification: Notification) => {
  const { markAsRead } = useNotifications();

  const getIcon = () => {
    switch (notification.type) {
      case 'POST_LIKE':
        return '❤️';
      case 'POST_COMMENT':
        return '💬';
      case 'COMMENT_REPLY':
        return '↩️';
      case 'GROUP_JOIN':
        return '👥';
      case 'NEW_DISCUSSION':
        return '💡';
      case 'NEW_GROUP':
        return '🌟';
      case 'MENTION':
        return '@';
      default:
        return '📢';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      onClick={() => !notification.read && markAsRead(notification.id)}
      className={cn(
        "p-4 rounded-xl backdrop-blur-sm transition-all duration-200",
        "border border-white/10 hover:border-indigo-500/20",
        "bg-gradient-to-br from-white/5 to-white/10",
        "hover:from-white/10 hover:to-white/15",
        "cursor-pointer group",
        !notification.read && "bg-indigo-500/10"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <h4 className={cn(
            "text-white font-medium mb-1",
            !notification.read && "text-indigo-300"
          )}>
            {notification.title}
          </h4>
          <p className="text-white/60 text-sm line-clamp-2">
            {notification.message}
          </p>
          <span className="text-white/40 text-xs mt-2 block">
            {notification.timestamp}
          </span>
        </div>
        {!notification.read && (
          <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:bg-indigo-400 transition-colors" />
        )}
      </div>
    </motion.div>
  );
};