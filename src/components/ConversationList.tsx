
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './sidebar/Sidebar';
import TopicCard from './conversation/TopicCard';
import TopicPosts from './conversation/TopicPosts';
import CreateDiscussion from './conversation/CreateDiscussion';
import { motion, AnimatePresence } from 'framer-motion';
import { Topic, addTopic, getTopicsByCommunity } from '@/db/database';
import { 
  MessageCircle, Sparkles, Filter, SlidersHorizontal, 
  Search, Radio, TrendingUp, Clock, Users, Activity,
  LayoutGrid, MessageSquare, LayoutList, PlusCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface ConversationListProps {
  communityId?: number;
}

const ConversationList = ({ communityId = 1 }: ConversationListProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(() => {
    const savedTopic = localStorage.getItem('selectedTopic');
    return savedTopic || null;
  });
  
  const [conversations, setConversations] = useState<Topic[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterActive, setFilterActive] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');

  useEffect(() => {
    const loadTopics = async () => {
      if (communityId) {
        const topics = await getTopicsByCommunity(communityId);
        setConversations(topics);
      }
    };
    loadTopics();
  }, [communityId]);

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

  const filteredConversations = conversations
    .filter(conv => {
      if (!searchQuery) return true;
      return conv.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             (conv.description && conv.description.toLowerCase().includes(searchQuery.toLowerCase()));
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'popular') {
        return (b.participants || 0) - (a.participants || 0);
      } else {
        // For trending, we could use a combination of recency and popularity
        const scoreA = (a.participants || 0) * 0.7 + new Date(a.createdAt).getTime() * 0.3;
        const scoreB = (b.participants || 0) * 0.7 + new Date(b.createdAt).getTime() * 0.3;
        return scoreB - scoreA;
      }
    });

  const selectedTopicData = conversations.find(conv => conv.id?.toString() === selectedTopic);

  const sidebarTopics = conversations.map(conv => ({
    id: conv.id?.toString() || '',
    title: conv.title
  }));

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#151822] via-[#1A1F2C] to-[#151822]">
      <Sidebar 
        conversations={sidebarTopics} 
        onConversationClick={handleTopicClick}
      />

      <div className="pl-[240px] transition-all duration-300">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Decorative elements */}
          <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
          <div className="fixed bottom-0 left-1/3 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
          
          <AnimatePresence mode="wait">
            {selectedTopic ? (
              <motion.div
                key="topic-posts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Header section - Adjusted to move content down */}
                <header className="px-8 pt-16 pb-10">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                      <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
                          Conversații
                        </h1>
                        <p className="text-white/60 mt-3">
                          Participă la conversații existente sau inițiază o discuție nouă
                        </p>
                      </div>
                      
                      <Button
                        onClick={() => window.scrollTo({ top: document.getElementById('create-discussion')?.offsetTop, behavior: 'smooth' })}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 hover:from-purple-600 hover:via-violet-600 hover:to-blue-600 text-white rounded-xl px-5 py-6 shadow-lg hover:shadow-xl transition-all duration-300 h-auto mt-4 md:mt-0"
                      >
                        <PlusCircle className="h-5 w-5" />
                        <span className="font-medium">Creează o Discuție Nouă</span>
                      </Button>
                    </div>
                    
                    {/* Search and filter bar - moved down */}
                    <div className="mt-10 p-1.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5 flex flex-col sm:flex-row items-center gap-3">
                      <div className="relative flex-1 w-full">
                        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                        <Input
                          type="search"
                          placeholder="Caută conversații..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-white/5 border-0 pl-10 py-6 text-white placeholder:text-white/40 focus:ring-1 focus:ring-primary/30"
                        />
                      </div>
                      
                      <div className="flex items-center gap-3 px-2 w-full sm:w-auto">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "rounded-xl px-3 py-2 h-10 text-white/60",
                            sortBy === 'recent' && "bg-white/10 text-white"
                          )}
                          onClick={() => setSortBy('recent')}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Recente
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "rounded-xl px-3 py-2 h-10 text-white/60",
                            sortBy === 'popular' && "bg-white/10 text-white"
                          )}
                          onClick={() => setSortBy('popular')}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Populare
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "rounded-xl px-3 py-2 h-10 text-white/60",
                            sortBy === 'trending' && "bg-white/10 text-white"
                          )}
                          onClick={() => setSortBy('trending')}
                        >
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Trend
                        </Button>
                        
                        <div className="h-8 w-px bg-white/10 mx-1"></div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "rounded-xl w-10 h-10 p-0 flex items-center justify-center",
                            viewMode === 'grid' && "bg-white/10 text-white"
                          )}
                          onClick={() => setViewMode('grid')}
                        >
                          <LayoutGrid className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "rounded-xl w-10 h-10 p-0 flex items-center justify-center",
                            viewMode === 'list' && "bg-white/10 text-white"
                          )}
                          onClick={() => setViewMode('list')}
                        >
                          <LayoutList className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "rounded-xl w-10 h-10 p-0 flex items-center justify-center",
                            filterActive && "bg-primary/20 text-primary"
                          )}
                          onClick={() => setFilterActive(!filterActive)}
                        >
                          <SlidersHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Active filters */}
                    {filterActive && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5"
                      >
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-white/10 hover:bg-white/20 text-white cursor-pointer px-3 py-1.5">
                            Video <span className="ml-2">×</span>
                          </Badge>
                          <Badge className="bg-white/10 hover:bg-white/20 text-white cursor-pointer px-3 py-1.5">
                            Recente <span className="ml-2">×</span>
                          </Badge>
                          <Badge className="bg-primary/20 hover:bg-primary/30 text-primary cursor-pointer px-3 py-1.5">
                            Premium <span className="ml-2">×</span>
                          </Badge>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </header>

                {/* Stats bar */}
                <div className="px-8 py-4 bg-white/5 backdrop-blur-sm">
                  <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Radio className="h-3.5 w-3.5 text-green-400 animate-pulse" />
                        <span className="text-white/60 text-sm">
                          {conversations.length} Conversații Active
                        </span>
                      </div>
                      
                      <div className="hidden md:flex items-center gap-2">
                        <Activity className="h-3.5 w-3.5 text-blue-400" />
                        <span className="text-white/60 text-sm">
                          Actualizat acum {Math.floor(Math.random() * 10) + 1} minute
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-white/60 text-sm">
                        {Math.floor(Math.random() * 50) + 50} membri online
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main content with grid of cards - Added more spacing */}
                <main className="px-8 py-12">
                  <div className="max-w-7xl mx-auto">
                    {filteredConversations.length > 0 ? (
                      <div className={cn(
                        "grid gap-8", // Increased gap from 6 to 8
                        viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                      )}>
                        {filteredConversations.map((conv) => (
                          <TopicCard
                            key={conv.id}
                            topic={{
                              id: conv.id?.toString() || '',
                              title: conv.title,
                              lastMessage: conv.lastMessage || conv.description,
                              participants: conv.participants,
                              timestamp: conv.timestamp || new Date(conv.createdAt).toLocaleDateString('ro-RO', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              }),
                              views: Math.floor(Math.random() * 200) + 50,
                              isTrending: sortBy === 'trending' && filteredConversations.indexOf(conv) < 3,
                              type: Math.random() > 0.7 ? 'video' : Math.random() > 0.5 ? 'poll' : 'discussion',
                              tags: ['Design', 'UI/UX', 'Technology', 'Web Dev'].slice(0, Math.floor(Math.random() * 3) + 1)
                            }}
                            onTopicClick={() => handleTopicClick(conv.id?.toString() || '')}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20">
                        <MessageSquare className="h-12 w-12 text-white/20 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-white/80 mb-2">Nu am găsit conversații</h3>
                        <p className="text-white/50">
                          {searchQuery 
                            ? `Nu există conversații care să conțină "${searchQuery}"`
                            : "Nu există conversații active momentan"}
                        </p>
                      </div>
                    )}
                  </div>
                </main>

                {/* Create discussion section - Improved spacing and positioning */}
                <div id="create-discussion" className="px-8 py-16 bg-gradient-to-br from-[#1E1D2D]/80 to-[#1A1F2C]/80 backdrop-blur-md border-t border-white/5">
                  <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                      <Badge className="mb-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border-none">
                        <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Creează
                      </Badge>
                      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80 mb-4">
                        Începe o nouă conversație
                      </h2>
                      <p className="text-white/60 max-w-md mx-auto">
                        Împărtășește-ți gândurile, pune întrebări sau inițiază o discuție pe un subiect care te interesează
                      </p>
                    </div>
                    
                    <CreateDiscussion onDiscussionCreated={handleNewDiscussion} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ConversationList;
