
import { MessageCircle, Share2, Bookmark, Heart, TrendingUp, Eye, Clock, Tag, Pin, Video, BarChart, Calendar, Award, Star, Sparkles, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { useNotifications } from '@/contexts/NotificationContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Avatar } from '../ui/avatar';
import { Badge } from '../ui/badge';

interface TopicCardProps {
  topic: {
    id: string;
    title: string;
    lastMessage: string;
    participants: number;
    timestamp: string;
    author?: {
      name: string;
      avatar: string;
    };
    views?: number;
    shares?: number;
    type?: 'video' | 'poll' | 'event' | 'discussion';
    tags?: string[];
    isTrending?: boolean;
  };
  onTopicClick: (topicId: string) => void;
}

const TopicCard = ({ topic, onTopicClick }: TopicCardProps) => {
  const { addNotification } = useNotifications();
  const [participantCount, setParticipantCount] = useState(topic.participants);
  const [hasJoined, setHasJoined] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleJoinTopic = () => {
    if (!hasJoined) {
      setParticipantCount(prev => prev + 1);
      setHasJoined(true);
      
      addNotification(
        "NEW_DISCUSSION",
        "Te-ai alăturat unui nou topic!",
        `Ai intrat în topicul "${topic.title}". Explorează conversația și conectează-te cu alți participanți.`,
        { discussionId: topic.id }
      );
    }
    
    onTopicClick(topic.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    addNotification(
      "BOOKMARK",
      isBookmarked ? "Topic eliminat din bookmark" : "Topic salvat",
      `Ai ${isBookmarked ? 'eliminat' : 'adăugat'} "${topic.title}" ${isBookmarked ? 'din' : 'la'} topicurile salvate.`,
      { discussionId: topic.id }
    );
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => prev + 1);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Share implementation
  };

  const getTypeIcon = () => {
    switch(topic.type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'poll': return <BarChart className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative group overflow-hidden rounded-2xl backdrop-blur-lg transition-all duration-300"
    >
      {/* Luxurious background with gradient shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C]/90 to-[#252736]/90 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-teal-500/5 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl z-0 group-hover:bg-purple-500/20 transition-all duration-700"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl z-0 group-hover:bg-blue-500/20 transition-all duration-700"></div>
      
      {/* Shimmering border effect */}
      <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-purple-500/20 z-0 transition-colors duration-300"></div>
      
      {/* Main content */}
      <div className="relative p-7 z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-5">
            {topic.author ? (
              <Avatar className="h-12 w-12 border-2 border-primary/10 shadow-lg">
                <img src={topic.author.avatar} alt={topic.author.name} />
              </Avatar>
            ) : (
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 via-primary/20 to-blue-500/20 shadow-md">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
            )}
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">{topic.title}</h3>
                {topic.isTrending && (
                  <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> Trending
                  </Badge>
                )}
                {topic.type && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/10 flex items-center">
                    {getTypeIcon()}
                    <span className="ml-1 capitalize">{topic.type}</span>
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-3 text-white/60 text-sm">
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1.5 text-white/50" />
                  <span>{topic.timestamp}</span>
                </div>
                
                <div className="flex items-center">
                  <Eye className="h-3.5 w-3.5 mr-1.5 text-white/50" />
                  <span>{topic.views || Math.floor(Math.random() * 100) + 20} vizualizări</span>
                </div>
              </div>
            </div>
          </div>
          
          {Math.random() > 0.7 && (
            <Badge className="bg-gradient-to-r from-yellow-400/20 to-amber-500/20 text-amber-300 border-none">
              <Star className="h-3 w-3 mr-1 fill-amber-300" /> Premium
            </Badge>
          )}
        </div>
        
        <div className="mt-5 relative">
          <p className="text-white/75 leading-relaxed">{topic.lastMessage}</p>
          
          {/* Fade effect for longer messages */}
          {topic.lastMessage.length > 120 && (
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#1A1F2C]/90 to-transparent"></div>
          )}
        </div>
        
        {/* Tags section - improved spacing */}
        {topic.tags && topic.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2.5">
            {topic.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="bg-blue-500/5 border-blue-500/10 text-white/70 px-3 py-1 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
          <div className="flex items-center space-x-6 text-white/70">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-full bg-primary/5 backdrop-blur-sm">
                <MessageCircle className="h-4 w-4 text-primary/80" />
              </div>
              <span className="text-sm font-medium">{participantCount} participanți</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className="flex items-center space-x-1.5 text-white/50 hover:text-primary transition-colors"
              >
                <Heart className={cn("h-4 w-4", likes > 0 ? "text-red-400 fill-red-400" : "")} />
                <span className="text-sm">{likes}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookmark}
                className="flex items-center space-x-1.5 text-white/50 hover:text-primary transition-colors"
              >
                <Bookmark className={cn("h-4 w-4", isBookmarked ? "text-primary fill-primary" : "")} />
              </motion.button>
            </div>
          </div>

          <motion.button
            initial={{ opacity: 0.9 }}
            whileHover={{ 
              scale: 1.02,
              opacity: 1,
              boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleJoinTopic}
            className={cn(
              "relative overflow-hidden group",
              "px-5 py-2.5 rounded-xl text-sm font-medium",
              "bg-gradient-to-r from-purple-500/80 via-primary/80 to-blue-500/80",
              "hover:from-purple-500 hover:via-primary hover:to-blue-500",
              "text-white shadow-md transition-all duration-300"
            )}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              {hasJoined ? 'Continuă Conversația' : 'Alătură-te Acum'}
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/40 via-violet-600/40 to-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity blur-xl group-hover:blur-xl"></div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicCard;
