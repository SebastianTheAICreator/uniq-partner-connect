import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { Notification, NotificationType } from '@/types/notifications';
import { useToast } from '@/components/ui/use-toast';

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (type: NotificationType, title: string, message: string, metadata?: Notification['metadata']) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  unreadCount: number;
}

type NotificationAction = 
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_AS_READ'; payload: string }
  | { type: 'CLEAR_ALL' };

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

function notificationReducer(state: Notification[], action: NotificationAction): Notification[] {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [action.payload, ...state];
    case 'MARK_AS_READ':
      return state.map(notification =>
        notification.id === action.payload
          ? { ...notification, read: true }
          : notification
      );
    case 'CLEAR_ALL':
      return [];
    default:
      return state;
  }
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, dispatch] = useReducer(notificationReducer, [
    {
      id: "1",
      type: "POST_LIKE",
      title: "Nou like la postarea ta",
      message: "Maria a apreciat postarea ta despre evenimentul de vineri",
      timestamp: new Date().toISOString(),
      read: false,
      metadata: { postId: "123" }
    },
    {
      id: "2",
      type: "COMMENT_REPLY",
      title: "Răspuns nou",
      message: "Alex ți-a răspuns la comentariul despre proiectul de grup",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      metadata: { commentId: "456" }
    },
    {
      id: "3",
      type: "GROUP_JOIN",
      title: "Membru nou în grup",
      message: "Elena s-a alăturat grupului Programare Web",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true,
      metadata: { groupId: "789" }
    }
  ]);

  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((
    type: NotificationType,
    title: string,
    message: string,
    metadata?: Notification['metadata']
  ) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      metadata
    };

    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });

    // Show toast for new notifications
    toast({
      title: title,
      description: message,
    });

    console.log('New notification added:', newNotification);
  }, [toast]);

  const markAsRead = useCallback((id: string) => {
    dispatch({ type: 'MARK_AS_READ', payload: id });
    console.log('Notification marked as read:', id);
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
    console.log('All notifications cleared');
  }, []);

  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        addNotification, 
        markAsRead, 
        clearAll,
        unreadCount 
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
