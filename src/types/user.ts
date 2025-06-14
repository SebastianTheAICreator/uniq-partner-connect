
export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedAt: string;
  isVerified: boolean;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  interests: string[];
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

export interface UserStats {
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  engagementRate: number;
}

export interface FollowRelationship {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
  isBlocked: boolean;
}
