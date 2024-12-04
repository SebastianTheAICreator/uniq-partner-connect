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
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  metadata?: {
    postId?: string;
    commentId?: string;
    groupId?: string;
    discussionId?: string;
    userId?: string;
  };
}