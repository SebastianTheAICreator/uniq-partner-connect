import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { useNotifications } from '@/contexts/NotificationContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface TopicCardProps {
  topic: {
    id: string;
    title: string;
    lastMessage: string;
    participants: number;
    timestamp: string;
  };
  onTopicClick: (topicId: string) => void;
}

const TopicCard = ({ topic, onTopicClick }: TopicCardProps) => {
  const { addNotification } = useNotifications();
  const [participantCount, setParticipantCount] = useState(topic.participants);
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoinTopic = () => {
    if (!hasJoined) {
      setParticipantCount(prev => prev + 1);
      setHasJoined(true);
      
      // Add notification when joining topic
      addNotification(
        "NEW_DISCUSSION",
        "Te-ai alăturat unui nou topic!",
        `Ai intrat în topicul "${topic.title}". Explorează conversația și conectează-te cu alți participanți.`,
        { discussionId: topic.id }
      );
    }
    
    onTopicClick(topic.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer card-hover"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold gradient-text">{topic.title}</h3>
        <span className="text-sm text-white/60">{topic.timestamp}</span>
      </div>
      
      <p className="mt-2 text-white/80">{topic.lastMessage}</p>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-white/60">
          <MessageCircle className="h-4 w-4" />
          <span>{participantCount} participanți</span>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TopicCard;