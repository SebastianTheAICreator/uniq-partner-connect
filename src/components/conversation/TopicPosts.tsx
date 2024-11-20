import React from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import CreatePost from './CreatePost';

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: string;
}

interface TopicPostsProps {
  topicId: string;
  topic: {
    title: string;
    description: string;
  };
  onBack: () => void;
}

const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Aceasta este o postare de test în topic.',
    author: 'User1',
    timestamp: '2 min ago'
  },
  {
    id: '2',
    content: 'O altă postare interesantă despre acest subiect.',
    author: 'User2',
    timestamp: '5 min ago'
  }
];

const TopicPosts = ({ topicId, topic, onBack }: TopicPostsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold gradient-text">{topic.title}</h2>
          <p className="text-gray-600">{topic.description}</p>
        </div>
      </div>

      <CreatePost topicId={topicId} onPostCreated={() => console.log('Post created')} />

      <ScrollArea className="h-[calc(100vh-24rem)]">
        <div className="space-y-6">
          {mockPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-medium text-gray-800">{post.author}</span>
                <span className="text-sm text-gray-500">{post.timestamp}</span>
              </div>
              <p className="text-gray-700">{post.content}</p>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default TopicPosts;