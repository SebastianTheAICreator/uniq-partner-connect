
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

      <div className="pl-[280px] sm:pl-[80px] transition-all duration-300">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Ambient background effects */}
          <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <div className="fixed bottom-0 left-1/3 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -z-10"></div>
          
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
                {/* Hero Header - Redesigned with better spacing and visual hierarchy */}
                <header className="px-8 pt-16 pb-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-30"></div>
                  <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                      <div className="animate-fade-up">
                        <div className="inline-flex items-center gap-2 mb-2 bg-white/5 rounded-full px-3 py-1 backdrop-blur-sm border border-white/5">
                          <Radio className="h-3 w-3 text-accent animate-pulse" />
                          <span className="text-xs text-white/70 font-medium">
                            {conversations.length} Conversații Active
                          </span>
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent animate-text-shine">
                          Conversații
                        </h1>
                        <p className="text-white/60 mt-3 max-w-md">
                          Participă la conversații existente sau inițiază o discuție nouă pe teme care te interesează
                        </p>
                      </div>
                      
                      <Button
                        onClick={() => window.scrollTo({ top: document.getElementById('create-discussion')?.offsetTop, behavior: 'smooth' })}
                        className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_20px_rgba(74,144,226,0.5)] text-white rounded-xl px-5 py-6 shadow-lg transition-all duration-300 h-auto mt-4 md:mt-0 group animate-fade-in"
                        variant="premium"
                        size="lg"
                      >
                        <PlusCircle className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                        <span className="font-medium">Creează o Discuție Nouă</span>
                      </Button>
                    </div>
                    
                    {/* Search and Filter Bar - Enhanced with glass morphism */}
                    <div className="mt-10 p-1.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.1)] flex flex-col sm:flex-row items-center gap-3 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                      <div className="relative flex-1 w-full">
                        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                        <Input
                          type="search"
                          placeholder="Caută conversații..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-white/5 border-0 pl-10 py-6 text-white placeholder:text-white/40 focus:ring-1 focus:ring-primary/30 rounded-xl"
                        />
                      </div>
                      
                      <div className="flex items-center gap-3 px-2 w-full sm:w-auto">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "rounded-xl px-3 py-2 h-10 text-white/60 transition-all duration-200",
                            sortBy === 'recent' && "bg-white/10 text-white shadow-inner"
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
                            "rounded-xl px-3 py-2 h-10 text-white/60 transition-all duration-200",
                            sortBy === 'popular' && "bg-white/10 text-white shadow-inner"
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
                            "rounded-xl px-3 py-2 h-10 text-white/60 transition-all duration-200",
                            sortBy === 'trending' && "bg-white/10 text-white shadow-inner"
                          )}
                          onClick={() => setSortBy('trending')}
                        >
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Trend
                        </Button>
                        
                        <div className="h-8 w-px bg-white/10 mx-1 hidden sm:block"></div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "rounded-xl w-10 h-10 p-0 flex items-center justify-center transition-all duration-200",
                            viewMode === 'grid' && "bg-white/10 text-white shadow-inner"
                          )}
                          onClick={() => setViewMode('grid')}
                        >
                          <LayoutGrid className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "rounded-xl w-10 h-10 p-0 flex items-center justify-center transition-all duration-200",
                            viewMode === 'list' && "bg-white/10 text-white shadow-inner"
                          )}
                          onClick={() => setViewMode('list')}
                        >
                          <LayoutList className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "rounded-xl w-10 h-10 p-0 flex items-center justify-center transition-all duration-200",
                            filterActive && "bg-primary/20 text-primary shadow-[0_0_10px_rgba(74,144,226,0.2)]"
                          )}
                          onClick={() => setFilterActive(!filterActive)}
                        >
                          <SlidersHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Filter Tags - Enhanced with animation */}
                    {filterActive && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 shadow-[0_4px_14px_rgba(0,0,0,0.1)]"
                      >
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-white/10 hover:bg-white/20 text-white cursor-pointer px-3 py-1.5 rounded-lg transition-all duration-200">
                            Video <span className="ml-2">×</span>
                          </Badge>
                          <Badge className="bg-white/10 hover:bg-white/20 text-white cursor-pointer px-3 py-1.5 rounded-lg transition-all duration-200">
                            Recente <span className="ml-2">×</span>
                          </Badge>
                          <Badge className="bg-primary/20 hover:bg-primary/30 text-primary cursor-pointer px-3 py-1.5 rounded-lg transition-all duration-200">
                            Premium <span className="ml-2">×</span>
                          </Badge>
                          <Badge className="bg-secondary/20 hover:bg-secondary/30 text-white cursor-pointer px-3 py-1.5 rounded-lg transition-all duration-200">
                            Tehnologie <span className="ml-2">×</span>
                          </Badge>
                          <Badge className="bg-accent/20 hover:bg-accent/30 text-white cursor-pointer px-3 py-1.5 rounded-lg transition-all duration-200">
                            Design <span className="ml-2">×</span>
                          </Badge>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </header>

                {/* Stats bar - Redesigned with better spacing */}
                <div className="px-8 py-4 bg-white/5 backdrop-blur-sm border-y border-white/5">
                  <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Radio className="h-3.5 w-3.5 text-accent animate-pulse" />
                        <span className="text-white/60 text-sm">
                          {conversations.length} Conversații Active
                        </span>
                      </div>
                      
                      <div className="hidden md:flex items-center gap-2">
                        <Activity className="h-3.5 w-3.5 text-secondary" />
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

                {/* Main content - Improved topic cards layout */}
                <main className="px-8 py-12">
                  <div className="max-w-7xl mx-auto">
                    {filteredConversations.length > 0 ? (
                      <div className={cn(
                        "grid gap-8",
                        viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                      )}>
                        {filteredConversations.map((conv, index) => (
                          <motion.div
                            key={conv.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <TopicCard
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
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 shadow-lg">
                        <MessageSquare className="h-16 w-16 text-white/20 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-white/80 mb-2">Nu am găsit conversații</h3>
                        <p className="text-white/50 max-w-md mx-auto">
                          {searchQuery 
                            ? `Nu există conversații care să conțină "${searchQuery}"`
                            : "Nu există conversații active momentan"}
                        </p>
                        <Button
                          variant="premium" 
                          className="mt-6"
                          onClick={() => window.scrollTo({ top: document.getElementById('create-discussion')?.offsetTop, behavior: 'smooth' })}
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Creează prima conversație
                        </Button>
                      </div>
                    )}
                  </div>
                </main>

                {/* Create discussion section - Enhanced with glass morphism and gradients */}
                <div id="create-discussion" className="px-8 py-16 bg-gradient-to-br from-[#1E1D2D]/80 to-[#1A1F2C]/80 backdrop-blur-md border-t border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-20"></div>
                  <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
                  
                  <div className="max-w-3xl mx-auto relative z-10">
                    <div className="text-center mb-10">
                      <Badge className="mb-4 bg-gradient-to-r from-primary/20 to-secondary/20 text-white border-none px-3 py-1.5">
                        <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Creează
                      </Badge>
                      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80 mb-4">
                        Începe o nouă conversație
                      </h2>
                      <p className="text-white/60 max-w-md mx-auto">
                        Împărtășește-ți gândurile, pune întrebări sau inițiază o discuție pe un subiect care te interesează
                      </p>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] animate-fade-up">
                      <CreateDiscussion onDiscussionCreated={handleNewDiscussion} />
                    </div>
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
