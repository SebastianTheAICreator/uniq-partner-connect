
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, TrendingUp, Users, Clock, Eye } from 'lucide-react';
import { Topic } from '@/db/database';
import { FilterState } from '../CommunityConversations';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ConversationGridProps {
  topics: Topic[];
  filters: FilterState;
  loading: boolean;
  onTopicClick: (topicId: string) => void;
}

interface ConversationCardProps {
  topic: Topic;
  onTopicClick: (topicId: string) => void;
  viewMode: 'grid' | 'list';
}

const ConversationCard = ({ topic, onTopicClick, viewMode }: ConversationCardProps) => {
  const handleClick = () => {
    onTopicClick(topic.id?.toString() || '');
  };

  const mockStats = {
    views: Math.floor(Math.random() * 200) + 50,
    replies: Math.floor(Math.random() * 20) + 1,
    trending: Math.random() > 0.8
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group cursor-pointer overflow-hidden backdrop-blur-lg transition-all duration-300",
        "bg-gradient-to-br from-[#1A1F2C]/90 to-[#252736]/90",
        "border border-white/5 hover:border-purple-500/20",
        "rounded-xl shadow-lg hover:shadow-2xl",
        viewMode === 'list' && "flex items-center p-4 space-x-4"
      )}
      onClick={handleClick}
    >
      {/* Card Content */}
      <div className={cn("p-6 space-y-4", viewMode === 'list' && "p-0 flex-1 space-y-2")}>
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className={cn(
                "font-semibold text-white group-hover:text-purple-200 transition-colors",
                viewMode === 'grid' ? "text-lg" : "text-base"
              )}>
                {topic.title}
              </h3>
              {mockStats.trending && (
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending
                </Badge>
              )}
            </div>
            
            {topic.description && (
              <p className={cn(
                "text-white/70 leading-relaxed",
                viewMode === 'grid' ? "text-sm line-clamp-3" : "text-sm line-clamp-2"
              )}>
                {topic.description}
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center space-x-4 text-sm text-white/60">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{topic.participants || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{mockStats.replies}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{mockStats.views}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-white/50">
            <Clock className="h-3 w-3" />
            <span>
              {new Date(topic.createdAt).toLocaleDateString('ro-RO', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ConversationGrid = ({ topics, filters, loading, onTopicClick }: ConversationGridProps) => {
  const filteredTopics = useMemo(() => {
    return topics
      .filter(topic => {
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          return (
            topic.title.toLowerCase().includes(query) ||
            (topic.description && topic.description.toLowerCase().includes(query))
          );
        }
        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'popular':
            return (b.participants || 0) - (a.participants || 0);
          case 'trending':
            // Mock trending score based on participants and recency
            const scoreA = (a.participants || 0) + (Date.now() - new Date(a.createdAt).getTime()) / 1000000;
            const scoreB = (b.participants || 0) + (Date.now() - new Date(b.createdAt).getTime()) / 1000000;
            return scoreB - scoreA;
          case 'recent':
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
  }, [topics, filters]);

  if (loading) {
    return (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white/5 rounded-xl h-48 border border-white/10"></div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredTopics.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
          <MessageCircle className="h-8 w-8 text-purple-400" />
        </div>
        <h3 className="text-xl font-medium text-white/90 mb-2">
          {filters.searchQuery ? 'Nicio conversație găsită' : 'Nicio conversație încă'}
        </h3>
        <p className="text-white/60 max-w-md mx-auto">
          {filters.searchQuery 
            ? `Nu există conversații care să conțină "${filters.searchQuery}"`
            : 'Fii primul care începe o conversație în această comunitate!'
          }
        </p>
      </motion.div>
    );
  }

  return (
    <div className={cn(
      "grid gap-6",
      filters.viewMode === 'grid' 
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1"
    )}>
      <AnimatePresence initial={false}>
        {filteredTopics.map(topic => (
          <ConversationCard
            key={topic.id}
            topic={topic}
            onTopicClick={onTopicClick}
            viewMode={filters.viewMode}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ConversationGrid;
