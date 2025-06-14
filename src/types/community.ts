
export interface Community {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  coverImage?: string;
  isPrivate: boolean;
  memberCount: number;
  postCount: number;
  createdAt: string;
  createdBy: string;
  category: string;
  tags: string[];
  rules: string[];
  moderators: string[];
  settings: CommunitySettings;
}

export interface CommunitySettings {
  allowPosts: boolean;
  allowComments: boolean;
  requireApproval: boolean;
  allowInvites: boolean;
  autoModerationEnabled: boolean;
}

export interface CommunityMember {
  id: string;
  communityId: string;
  userId: string;
  role: 'member' | 'moderator' | 'admin';
  joinedAt: string;
  isActive: boolean;
}

export interface CommunityPost {
  id: string;
  communityId: string;
  authorId: string;
  content: string;
  attachments?: any[];
  isPinned: boolean;
  isLocked: boolean;
  createdAt: string;
  updatedAt?: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
}
