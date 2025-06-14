
export interface CommentAuthor {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  verified?: boolean;
}

export interface CommentAttachment {
  id: string;
  type: 'image' | 'document' | 'link';
  url: string;
  name?: string;
  size?: number;
  previewUrl?: string;
  metadata?: {
    title?: string;
    description?: string;
    favicon?: string;
  };
}

export interface CommentReaction {
  type: 'like' | 'dislike';
  count: number;
  hasReacted: boolean;
}

export interface EnhancedComment {
  id: string;
  content: string;
  author: CommentAuthor;
  timestamp: string;
  parentId?: string;
  depth: number;
  reactions: {
    like: CommentReaction;
    dislike: CommentReaction;
  };
  attachments: CommentAttachment[];
  isEdited: boolean;
  editedAt?: string;
  replies: EnhancedComment[];
  isCollapsed?: boolean;
}

export interface CommentContextType {
  comments: EnhancedComment[];
  addComment: (comment: Omit<EnhancedComment, 'id' | 'timestamp' | 'reactions' | 'replies'>) => void;
  updateComment: (id: string, updates: Partial<EnhancedComment>) => void;
  deleteComment: (id: string) => void;
  toggleReaction: (commentId: string, reactionType: 'like' | 'dislike') => void;
  collapseComment: (id: string) => void;
}
