
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { NotificationItem } from './NotificationItem';
import { Notification } from '@/types/notifications';
import { Button } from '@/components/ui/button';
import { Bell, Check, BellDot } from 'lucide-react';

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
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <SheetContent className="p-0 w-[380px] sm:w-[480px] border-0 overflow-hidden">
      <div className="h-full flex flex-col bg-primary border-l border-white/10 shadow-classic-lg">
        <div className="relative">
          <SheetHeader className="px-6 pt-6 pb-4 relative z-10 border-b border-white/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {unreadCount > 0 ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-interactive p-2 rounded-full shadow-sm"
                    >
                      <BellDot className="w-5 h-5 text-white" />
                    </motion.div>
                  ) : (
                    <div className="bg-secondary/50 p-2 rounded-full">
                      <Bell className="w-5 h-5 text-foreground/70" />
                    </div>
                  )}
                </div>
                <SheetTitle className="text-2xl font-bold text-interactive">
                  Notifications
                </SheetTitle>
              </div>
              
              {notifications.length > 0 && (
                <Button
                  variant="classic-ghost"
                  size="sm"
                  rounded="full"
                  onClick={onClearAll}
                  className="opacity-80 hover:opacity-100"
                >
                  <span className="mr-1.5">Clear all</span>
                  <Check className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <SheetDescription className="text-foreground/60 max-w-[90%]">
              {unreadCount > 0 
                ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                : 'Stay informed about activity in your communities'}
            </SheetDescription>
          </SheetHeader>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 overflow-hidden"
        >
          <div className="h-full px-4 pb-4 overflow-y-auto classic-scrollbar">
            <div className="space-y-3 mt-2 pr-2">
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
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="flex flex-col items-center justify-center py-20 px-6 text-center"
                  >
                    <div className="bg-secondary/30 p-4 rounded-full mb-4">
                      <Bell className="w-8 h-8 text-foreground/30" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground/80 mb-2">All caught up!</h3>
                    <p className="text-sm text-foreground/50 max-w-[260px]">
                      You don't have any notifications right now. We'll notify you when something important happens.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </SheetContent>
  );
};
