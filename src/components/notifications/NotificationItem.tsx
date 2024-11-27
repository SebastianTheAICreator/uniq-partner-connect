import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NotificationProps {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  onMarkAsRead: (id: string) => void;
}

export const NotificationItem = ({ 
  id, 
  title, 
  message, 
  timestamp, 
  read, 
  onMarkAsRead 
}: NotificationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={cn(
        "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
        "border border-white/10 shadow-lg hover:shadow-xl",
        read
          ? "bg-gradient-to-r from-gray-900/40 to-gray-800/40"
          : "bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-white/90">
            {title}
          </h4>
          <p className="text-sm text-white/70 mt-1">
            {message}
          </p>
          <span className="text-xs text-white/50 mt-2 block">
            {timestamp}
          </span>
        </div>
        {!read && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMarkAsRead(id)}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Marchează ca citit
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};