import { MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

interface TopicCardProps {
  topic: {
    id: string;
    title: string;
    lastMessage: string;
    participants: number;
    timestamp: string;
    likes: number;
    dislikes: number;
  };
  onTopicClick: (topicId: string) => void;
}

const TopicCard = ({ topic, onTopicClick }: TopicCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer card-hover"
      onClick={() => onTopicClick(topic.id)}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold gradient-text">{topic.title}</h3>
        <span className="text-sm text-white/60">{topic.timestamp}</span>
      </div>
      <p className="mt-2 text-white/80">{topic.lastMessage}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 text-white/60 hover:text-primary transition-colors"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{topic.likes}</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 text-white/60 hover:text-red-500 transition-colors"
            >
              <ThumbsDown className="h-4 w-4" />
              <span>{topic.dislikes}</span>
            </Button>
          </motion.div>
        </div>
        <div className="flex items-center space-x-2 text-white/60">
          <MessageCircle className="h-4 w-4" />
          <span>{topic.participants}/500 participanți</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicCard;