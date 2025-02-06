
import { MessageCircle, Share2, Bookmark, Heart, TrendingUp, Eye, Clock, Tag, Pin, Video, BarChart, Calendar } from 'lucide-react';
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
      className="glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer card-hover"
      onClick={handleJoinTopic}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          {topic.author && (
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <img src={topic.author.avatar} alt={topic.author.name} />
            </Avatar>
          )}
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-semibold gradient-text">{topic.title}</h3>
              {topic.isTrending && (
                <Badge variant="outline" className="bg-red-500/10 text-red-400">
                  <TrendingUp className="h-3 w-3 mr-1" /> Trending
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-1 text-sm text-white/60">
              <Clock className="h-3 w-3" />
              <span>{topic.timestamp}</span>
              {topic.type && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  {getTypeIcon()}
                  <span>{topic.type}</span>
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {topic.tags?.map(tag => (
            <Badge key={tag} variant="outline" className="bg-primary/10">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <p className="mt-4 text-white/80">{topic.lastMessage}</p>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-white/60">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>{participantCount} participanți</span>
          </div>
          {topic.views && (
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>{topic.views} vizualizări</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
          >
            <Heart className={cn("h-5 w-5", likes > 0 ? "text-red-500 fill-red-500" : "text-white/60")} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBookmark}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
          >
            <Bookmark className={cn("h-5 w-5", isBookmarked ? "text-primary fill-primary" : "text-white/60")} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
          >
            <Share2 className="h-5 w-5 text-white/60" />
          </motion.button>

          <Button
            onClick={handleJoinTopic}
            className={cn(
              "relative overflow-hidden group",
              "bg-gradient-to-r from-primary via-secondary to-accent",
              "hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]",
              "transition-all duration-500"
            )}
          >
            <span className="relative z-10 flex items-center gap-2">
              {hasJoined ? 'Intră în Topic' : 'Alătură-te'}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"
                style={{ mixBlendMode: 'overlay' }}
              />
            </span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicCard;
