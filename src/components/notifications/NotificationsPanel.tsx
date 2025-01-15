import { motion, AnimatePresence } from 'framer-motion';
import { SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { NotificationItem } from './NotificationItem';
import { Notification } from '@/types/notifications';

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export const NotificationsPanel = ({
  notifications,
  onMarkAsRead,
  onClearAll
}: NotificationsPanelProps) => {
  return (
    <SheetContent className="w-[400px] sm:w-[540px] bg-gradient-to-br from-[#1a1a2e]/95 via-[#16213e]/95 to-[#1a1a2e]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl">
      <SheetHeader className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SheetTitle className="flex justify-between items-center">
            <span className="text-2xl font-bold gradient-text animate-text-shine">
              Notificări
            </span>
            {notifications.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClearAll}
                className="text-sm text-primary hover:text-primary-hover transition-colors"
              >
                Șterge tot
              </motion.button>
            )}
          </SheetTitle>
          <SheetDescription className="text-white/60">
            Vezi toate notificările tale recente
          </SheetDescription>
        </motion.div>
      </SheetHeader>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mt-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-4 custom-scrollbar"
      >
        <AnimatePresence mode="popLayout">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-8 rounded-lg text-center"
            >
              <p className="text-white/50">Nu ai notificări noi</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </SheetContent>
  );
};