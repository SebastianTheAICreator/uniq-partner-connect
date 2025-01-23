import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './sidebar/Sidebar';
import TopicCard from './conversation/TopicCard';
import TopicPosts from './conversation/TopicPosts';
import CreateDiscussion from './conversation/CreateDiscussion';
import { motion, AnimatePresence } from 'framer-motion';
import { Topic, addTopic, getTopicsByCommunity } from '@/db/database';

interface ConversationListProps {
  communityId?: number;
}

const ConversationList = ({ communityId = 1 }: ConversationListProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(() => {
    // Încercăm să restaurăm topicul selectat din localStorage
    const savedTopic = localStorage.getItem('selectedTopic');
    return savedTopic || null;
  });
  
  const [conversations, setConversations] = useState<Topic[]>([]);

  useEffect(() => {
    const loadTopics = async () => {
      if (communityId) {
        const topics = await getTopicsByCommunity(communityId);
        setConversations(topics);
      }
    };
    loadTopics();
  }, [communityId]);

  // Salvăm topicul selectat în localStorage de fiecare dată când se schimbă
  useEffect(() => {
    if (selectedTopic) {
      localStorage.setItem('selectedTopic', selectedTopic);
    } else {
      localStorage.removeItem('selectedTopic');
    }
  }, [selectedTopic]);

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
    console.log('Selected topic:', topicId);
  };

  const handleNewDiscussion = async (discussion: { title: string; description: string }) => {
    const newTopic = {
      communityId,
      title: discussion.title,
      description: discussion.description,
      participants: 0
    };
    
    const topicId = await addTopic(newTopic);
    const topics = await getTopicsByCommunity(communityId);
    setConversations(topics);
    setSelectedTopic(topicId.toString());
  };

  const selectedTopicData = conversations.find(conv => conv.id?.toString() === selectedTopic);

  const sidebarTopics = conversations.map(conv => ({
    id: conv.id?.toString() || '',
    title: conv.title
  }));

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar 
        conversations={sidebarTopics} 
        onConversationClick={handleTopicClick}
      />

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 0.8,
          ease: [0.6, -0.05, 0.01, 0.99]
        }}
        className="flex-1 ml-[240px] p-6 bg-gradient-to-br from-[#1A1F2C] via-[#222222] to-[#1A1F2C] backdrop-blur-xl"
      >
        <motion.div 
          className="max-w-4xl mx-auto space-y-8 mt-8"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {selectedTopic ? (
              <motion.div
                key="topic-posts"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <TopicPosts
                  topicId={selectedTopic}
                  topic={{
                    title: selectedTopicData?.title || '',
                    description: selectedTopicData?.description || ''
                  }}
                  onBack={() => setSelectedTopic(null)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="topic-list"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <CreateDiscussion onDiscussionCreated={handleNewDiscussion} />
                {conversations.map((conv, index) => (
                  <motion.div
                    key={conv.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: [0.6, -0.05, 0.01, 0.99]
                        }
                      }
                    }}
                  >
                    <TopicCard
                      topic={{
                        id: conv.id?.toString() || '',
                        title: conv.title,
                        lastMessage: conv.lastMessage || conv.description,
                        participants: conv.participants,
                        timestamp: conv.timestamp || conv.createdAt.toISOString()
                      }}
                      onTopicClick={() => handleTopicClick(conv.id?.toString() || '')}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ConversationList;