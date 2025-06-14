
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Link as LinkIcon, 
  Calendar, 
  Users, 
  MessageCircle,
  UserPlus,
  UserMinus,
  MoreHorizontal,
  Verified
} from 'lucide-react';
import { UserProfile } from '@/types/user';

interface UserProfileCardProps {
  user: UserProfile;
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onUnfollow?: () => void;
  onMessage?: () => void;
  className?: string;
}

const UserProfileCard = ({
  user,
  isOwnProfile = false,
  isFollowing = false,
  onFollow,
  onUnfollow,
  onMessage,
  className
}: UserProfileCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className={`bg-gray-900/50 border-gray-700/50 overflow-hidden ${className}`}>
      <div className="relative">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        
        {/* Profile Info */}
        <div className="p-6 -mt-16 relative">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-gray-900">
                  <AvatarImage src={user.avatar} alt={user.displayName} />
                  <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {user.displayName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-gray-900 ${getStatusColor(user.status)}`}></div>
              </div>
              
              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">{user.displayName}</h2>
                  {user.isVerified && (
                    <Verified className="w-5 h-5 text-blue-400 fill-current" />
                  )}
                </div>
                <p className="text-gray-400">@{user.username}</p>
                
                {user.bio && (
                  <p className="text-gray-300 mt-2">{user.bio}</p>
                )}
                
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                  {user.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        Website
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-8">
              {!isOwnProfile && (
                <>
                  <Button
                    onClick={onMessage}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  
                  {isFollowing ? (
                    <Button
                      onClick={onUnfollow}
                      variant="outline"
                      size="sm"
                      className="border-red-600 text-red-400 hover:bg-red-900/20"
                    >
                      <UserMinus className="w-4 h-4 mr-2" />
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      onClick={onFollow}
                      variant="default"
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Follow
                    </Button>
                  )}
                </>
              )}
              
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-700/50">
            <div className="text-center">
              <div className="text-lg font-semibold text-white">{user.postsCount}</div>
              <div className="text-sm text-gray-400">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-white">{user.followersCount}</div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-white">{user.followingCount}</div>
              <div className="text-sm text-gray-400">Following</div>
            </div>
          </div>
          
          {/* Interests */}
          {user.interests.length > 0 && (
            <div className="mt-4">
              <div className="text-sm text-gray-400 mb-2">Interests</div>
              <div className="flex flex-wrap gap-2">
                {user.interests.slice(0, 5).map((interest, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-blue-500/10 text-blue-300 border-blue-500/30"
                  >
                    {interest}
                  </Badge>
                ))}
                {user.interests.length > 5 && (
                  <Badge variant="outline" className="bg-gray-700/50 text-gray-400">
                    +{user.interests.length - 5} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UserProfileCard;
