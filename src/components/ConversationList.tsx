import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './sidebar/Sidebar';
import TopicCard from './conversation/TopicCard';
import TopicPosts from './conversation/TopicPosts';
import CreateDiscussion from './conversation/CreateDiscussion';
import { motion, AnimatePresence } from 'framer-motion';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  participants: number;
  timestamp: string;
  likes: number;
  dislikes: number;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Discuție despre artă contemporană',
    lastMessage: 'Ce părere aveți despre ultima expoziție de la MoMA?',
    participants: 45,
    timestamp: '2 min ago',
    likes: 123,
    dislikes: 12
  },
  {
    id: '2',
    title: 'Gaming & eSports',
    lastMessage: 'Cine se alătură pentru un turneu amical?',
    participants: 78,
    timestamp: '5 min ago',
    likes: 89,
    dislikes: 5
  },
];

const ConversationList = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
    console.log('Selected topic:', topicId);
  };

  const handleNewDiscussion = (discussion: { title: string; description: string }) => {
    const newDiscussion: Conversation = {
      id: Date.now().toString(),
      title: discussion.title,
      lastMessage: discussion.description,
      participants: 1,
      timestamp: 'acum',
      likes: 0,
      dislikes: 0
    };
    
    setConversations(prev => [newDiscussion, ...prev]);
    setSelectedTopic(newDiscussion.id);
  };

  const selectedTopicData = conversations.find(conv => conv.id === selectedTopic);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar conversations={conversations} />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 ml-[240px] p-6 bg-gradient-to-br from-[#1A1F2C] via-[#222222] to-[#1A1F2C] backdrop-blur-xl"
      >
        <div className="max-w-4xl mx-auto space-y-8 mt-8">
          <AnimatePresence mode="wait">
            {selectedTopic ? (
              <motion.div
                key="topic-posts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TopicPosts
                  topicId={selectedTopic}
                  topic={{
                    title: selectedTopicData?.title || '',
                    description: selectedTopicData?.lastMessage || ''
                  }}
                  onBack={() => setSelectedTopic(null)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="topic-list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <CreateDiscussion onDiscussionCreated={handleNewDiscussion} />
                {conversations.map((conv, index) => (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TopicCard
                      topic={conv}
                      onTopicClick={handleTopicClick}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ConversationList;