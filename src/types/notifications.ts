export type NotificationType = 
  | 'POST_LIKE'
  | 'POST_COMMENT'
  | 'COMMENT_REPLY'
  | 'GROUP_JOIN'
  | 'NEW_DISCUSSION'
  | 'NEW_GROUP'
  | 'MENTION';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: NotificationType;
  read: boolean;
  metadata?: {
    postId?: string;
    commentId?: string;
    groupId?: string;
    discussionId?: string;
    userId?: string;
  };
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}