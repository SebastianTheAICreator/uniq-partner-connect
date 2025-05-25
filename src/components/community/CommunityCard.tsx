
import { useState } from "react";
import { motion } from "framer-motion";
import { Users, MessageCircle, TrendingUp, Heart, MapPin, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type Community } from "@/db/database";

interface CommunityCardProps {
  community: Community;
  onJoin: (id: number, name: string) => void;
}

const CommunityCard = ({ community, onJoin }: CommunityCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryIcon = (interests: string[]) => {
    if (interests.some(i => i.toLowerCase().includes('tech'))) return Zap;
    if (interests.some(i => i.toLowerCase().includes('business'))) return TrendingUp;
    if (interests.some(i => i.toLowerCase().includes('creative'))) return Heart;
    return MapPin;
  };

  const CategoryIcon = getCategoryIcon(community.interests);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group h-full"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F1117]/90 to-[#0A0C10]/90 
                    border border-white/5 hover:border-primary/20 
                    transition-all duration-500 h-full backdrop-blur-sm">
        
        {/* Background glow effect */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-500",
          isHovered && "opacity-100"
        )}></div>
        
        <div className="p-8 space-y-6 relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent
                          flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <CategoryIcon className="w-7 h-7 text-primary" />
            </div>
            
            {(community.memberCount || 0) > 100 && (
              <Badge className="bg-gradient-to-r from-primary/10 to-interactive/10 text-white/90 border-none">
                <TrendingUp className="h-3 w-3 mr-1 text-interactive" /> Popular
              </Badge>
            )}
          </div>
          
          {/* Community info */}
          <div className="space-y-4 flex-1">
            <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {community.name}
            </h3>
            
            <div className="flex items-center space-x-4 text-white/60 text-sm">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-primary/80" />
                <span>{(community.memberCount || 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-2 text-primary/80" />
                <span>{community.conversationCount || 0}</span>
              </div>
            </div>
            
            <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
              A thriving community for {community.name.toLowerCase()} enthusiasts. 
              Connect with experts and share knowledge in a supportive environment.
            </p>
            
            <div className="flex flex-wrap gap-2">
              {community.interests.slice(0, 3).map((interest, i) => (
                <span 
                  key={i} 
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/70 
                           hover:bg-primary/10 hover:text-white transition-colors border border-white/10"
                >
                  {interest}
                </span>
              ))}
              {community.interests.length > 3 && (
                <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/50">
                  +{community.interests.length - 3} more
                </span>
              )}
            </div>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-2 gap-3 py-4">
            <div className="bg-white/5 rounded-lg p-3 flex flex-col items-center text-center 
                          group-hover:bg-primary/10 transition-colors text-xs">
              <Shield className="h-4 w-4 text-primary mb-1" />
              <span className="text-white/80">Moderated</span>
            </div>
            <div className="bg-white/5 rounded-lg p-3 flex flex-col items-center text-center 
                          group-hover:bg-primary/10 transition-colors text-xs">
              <Zap className="h-4 w-4 text-primary mb-1" />
              <span className="text-white/80">Active</span>
            </div>
          </div>
          
          {/* Join button */}
          <Button 
            onClick={() => onJoin(community.id!, community.name)} 
            className="w-full group flex items-center justify-center space-x-2 
                     bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90
                     text-white font-medium rounded-xl py-6 
                     shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Join Community</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityCard;
