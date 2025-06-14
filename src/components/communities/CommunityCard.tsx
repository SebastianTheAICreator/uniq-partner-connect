
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  MessageSquare, 
  Lock, 
  Globe, 
  Star,
  UserPlus,
  Settings
} from 'lucide-react';
import { Community } from '@/types/community';

interface CommunityCardProps {
  community: Community;
  isMember?: boolean;
  isOwner?: boolean;
  onJoin?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
  className?: string;
}

const CommunityCard = ({
  community,
  isMember = false,
  isOwner = false,
  onJoin,
  onLeave,
  onClick,
  className
}: CommunityCardProps) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`bg-gray-900/50 border-gray-700/50 overflow-hidden hover:border-gray-600/70 transition-all duration-300 cursor-pointer group ${className}`}
        onClick={onClick}
      >
        {/* Cover Image */}
        <div className="relative h-24 bg-gradient-to-r from-blue-600 to-purple-600">
          {community.coverImage && (
            <img 
              src={community.coverImage} 
              alt={community.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute top-2 left-2">
            {community.isPrivate ? (
              <Badge variant="secondary" className="bg-red-500/20 text-red-300 border-red-500/30">
                <Lock className="w-3 h-3 mr-1" />
                Private
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                <Globe className="w-3 h-3 mr-1" />
                Public
              </Badge>
            )}
          </div>
          
          {isOwner && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                <Star className="w-3 h-3 mr-1" />
                Owner
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4 -mt-8 relative">
          {/* Community Avatar */}
          <div className="flex items-start justify-between mb-3">
            <Avatar className="w-16 h-16 border-4 border-gray-900">
              <AvatarImage src={community.avatar} alt={community.name} />
              <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {community.name[0]}
              </AvatarFallback>
            </Avatar>
            
            {isOwner && (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle settings
                }}
              >
                <Settings className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Community Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
              {community.name}
            </h3>
            
            <p className="text-sm text-gray-400 line-clamp-2">
              {community.description}
            </p>
            
            {/* Category Badge */}
            <Badge 
              variant="outline" 
              className="bg-purple-500/10 text-purple-300 border-purple-500/30"
            >
              {community.category}
            </Badge>
            
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-2">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{formatNumber(community.memberCount)} members</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span>{formatNumber(community.postCount)} posts</span>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="pt-3">
              {isMember ? (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLeave?.();
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Member
                </Button>
              ) : (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onJoin?.();
                  }}
                  variant="default"
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CommunityCard;
