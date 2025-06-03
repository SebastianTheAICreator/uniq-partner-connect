
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Topic, getTopicsByCommunity } from '@/db/database';
import ConversationGrid from './conversation/ConversationGrid';
import ConversationFilters from './conversation/ConversationFilters';
import ConversationStats from './conversation/ConversationStats';
import QuickActions from './conversation/QuickActions';
import CreateDiscussionModal from './conversation/CreateDiscussionModal';
import { useToast } from '@/hooks/use-toast';

interface CommunityConversationsProps {
  communityId?: number;
  onTopicSelect: (topicId: string) => void;
}

export interface FilterState {
  searchQuery: string;
  sortBy: 'recent' | 'popular' | 'trending';
  selectedTags: string[];
  viewMode: 'grid' | 'list';
}

const CommunityConversations = ({ 
  communityId = 1, 
  onTopicSelect 
}: CommunityConversationsProps) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    sortBy: 'recent',
    selectedTags: [],
    viewMode: 'grid'
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTopics();
  }, [communityId]);

  const loadTopics = async () => {
    try {
      setLoading(true);
      const data = await getTopicsByCommunity(communityId);
      setTopics(data);
    } catch (error) {
      console.error('Error loading topics:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut încărca conversațiile.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTopic = async (topicData: { title: string; description: string }) => {
    try {
      // This will be implemented with the existing addTopic function
      await loadTopics(); // Refresh the list
      setShowCreateModal(false);
      toast({
        title: "Succes",
        description: "Conversația a fost creată cu succes!",
        className: "bg-green-500/20 border-green-500/30"
      });
    } catch (error) {
      console.error('Error creating topic:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut crea conversația.",
        variant: "destructive"
      });
    }
  };

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0C10] via-[#0F1117] to-[#0A0C10]">
      {/* Hero Section */}
      <section className="relative py-12 px-6">
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5"></div>
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-4">
              Conversații Comunitate
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              Descoperă discuții interesante, împărtășește idei și conectează-te cu comunitatea
            </p>
            <QuickActions onCreateClick={() => setShowCreateModal(true)} />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <ConversationStats 
        totalTopics={topics.length}
        activeUsers={Math.floor(Math.random() * 50) + 20}
        onlineNow={Math.floor(Math.random() * 15) + 5}
      />

      {/* Filters Section */}
      <ConversationFilters 
        filters={filters}
        onFiltersChange={updateFilters}
      />

      {/* Main Content */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <ConversationGrid
            topics={topics}
            filters={filters}
            loading={loading}
            onTopicClick={onTopicSelect}
          />
        </div>
      </section>

      {/* Create Discussion Modal */}
      <CreateDiscussionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateTopic}
      />
    </div>
  );
};

export default CommunityConversations;
