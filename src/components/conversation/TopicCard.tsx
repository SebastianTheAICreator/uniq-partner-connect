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
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => onTopicClick(topic.id)}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold gradient-text">{topic.title}</h3>
        <span className="text-sm text-gray-500">{topic.timestamp}</span>
      </div>
      <p className="mt-2 text-gray-600">{topic.lastMessage}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Button variant="ghost" className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors">
            <ThumbsUp className="h-4 w-4" />
            <span>{topic.likes}</span>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors">
            <ThumbsDown className="h-4 w-4" />
            <span>{topic.dislikes}</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <MessageCircle className="h-4 w-4" />
          <span>{topic.participants}/100 participanți</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicCard;