
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from '@/components/sidebar/Sidebar';
import CommunityConversations from '@/components/community/CommunityConversations';
import TopicPosts from '@/components/conversation/TopicPosts';
import { useNotifications } from "@/contexts/NotificationContext";

const CommunityPage = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(() => {
    const savedTopic = localStorage.getItem('selectedTopic');
    return savedTopic || null;
  });
  
  const { addNotification } = useNotifications();

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    localStorage.setItem('selectedTopic', topicId);
  };

  const handleBackToList = () => {
    setSelectedTopic(null);
    localStorage.removeItem('selectedTopic');
  };

  // Mock topic data for TopicPosts component
  const selectedTopicData = {
    title: 'Conversație Selectată',
    description: 'Aceasta este o conversație din comunitate'
  };

  // Mock sidebar conversations data
  const sidebarConversations = [
    { id: '1', title: 'Design Modern' },
    { id: '2', title: 'Tehnologii Noi' },
    { id: '3', title: 'AI și Viitorul' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0C10] via-[#0F1117] to-[#0A0C10] flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex">
        {/* Sidebar */}
        <Sidebar 
          conversations={sidebarConversations}
          onConversationClick={handleTopicSelect}
        />

        {/* Main Content */}
        <div className="flex-1 pl-[280px] sm:pl-[80px] transition-all duration-300">
          <AnimatePresence mode="wait">
            {selectedTopic ? (
              <motion.div
                key="topic-posts"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TopicPosts
                  topicId={selectedTopic}
                  topic={selectedTopicData}
                  onBack={handleBackToList}
                />
              </motion.div>
            ) : (
              <motion.div
                key="conversations-list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <CommunityConversations
                  communityId={1}
                  onTopicSelect={handleTopicSelect}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CommunityPage;
