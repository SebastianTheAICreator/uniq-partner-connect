
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from '@/components/sidebar/Sidebar';
import CommunityConversations from '@/components/community/CommunityConversations';
import TopicPosts from '@/components/conversation/TopicPosts';
import { useNotifications } from "@/contexts/NotificationContext";
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';

const CommunityContent = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(() => {
    const savedTopic = localStorage.getItem('selectedTopic');
    return savedTopic || null;
  });
  
  const { addNotification } = useNotifications();
  const { collapsed, isMobile } = useSidebar();

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

  // Calculate dynamic padding based on sidebar state
  const getMainContentPadding = () => {
    if (isMobile) {
      return 'pl-0'; // No padding on mobile as sidebar is overlay
    }
    return collapsed ? 'pl-16' : 'pl-72';
  };

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
        <div className={`flex-1 transition-all duration-300 ${getMainContentPadding()}`}>
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

const CommunityPage = () => {
  return (
    <SidebarProvider>
      <CommunityContent />
    </SidebarProvider>
  );
};

export default CommunityPage;
