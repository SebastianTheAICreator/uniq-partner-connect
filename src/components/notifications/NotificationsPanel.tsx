import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NotificationItem } from './NotificationItem';
import { useNotifications } from '@/contexts/NotificationContext';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const NotificationsPanel = () => {
  const { notifications, clearAll } = useNotifications();

  return (
    <SheetContent className="w-[400px] sm:w-[540px] bg-gradient-to-br from-gray-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl">
      <SheetHeader>
        <SheetTitle className="flex justify-between items-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Notificări
          </motion.span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearAll}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Șterge tot
          </motion.button>
        </SheetTitle>
        <SheetDescription className="text-white/60">
          Vezi toate notificările tale recente
        </SheetDescription>
      </SheetHeader>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-4 custom-scrollbar"
      >
        <AnimatePresence>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              {...notification}
            />
          ))}
        </AnimatePresence>
        
        {notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-white/50"
          >
            Nu ai notificări noi
          </motion.div>
        )}
      </motion.div>
    </SheetContent>
  );
};