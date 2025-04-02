import React, { useState, useEffect, useMemo } from 'react';
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
  LayoutGrid, LayoutList, PlusCircle, Flame, Check, ChevronDown,
  ListFilter, BookOpen, Zap, Award, Bookmark, Star, Shield,
  RefreshCw, Settings, ArrowDown, ArrowUp, X, RefreshCcw, Wifi
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

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
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [showTagSelector, setShowTagSelector] = useState(false);
  const { toast } = useToast();

  const availableTags = useMemo(() => [
    { name: 'Design', color: 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' },
    { name: 'Technology', color: 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' },
    { name: 'AI', color: 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' },
    { name: 'Business', color: 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' },
    { name: 'Education', color: 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30' },
    { name: 'Premium', color: 'bg-primary/20 text-primary hover:bg-primary/30' },
    { name: 'Video', color: 'bg-red-500/20 text-red-400 hover:bg-red-500/30' },
    { name: 'Poll', color: 'bg-teal-500/20 text-teal-400 hover:bg-teal-500/30' },
  ], []);

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
    try {
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
      
      toast({
        title: "Discuție creată cu succes",
        description: "Noua ta discuție a fost publicată.",
        className: "bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border-none"
      });
    } catch (error) {
      console.error('Error creating topic:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut crea discuția. Încearcă din nou.",
        variant: "destructive"
      });
    }
  };

  const toggleTag = (tag: string) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  const clearFilters = () => {
    setActiveTags([]);
    setSearchQuery('');
    setFilterActive(false);
  };

  const filteredConversations = useMemo(() => {
    return conversations
      .filter(conv => {
        if (searchQuery && !(
          conv.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (conv.description && conv.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )) {
          return false;
        }
        
        if (activeTags.length > 0) {
          const mockConvTags = ['Design', 'Technology', 'AI', 'Business'].slice(0, Math.floor(Math.random() * 4) + 1);
          
          return activeTags.some(tag => mockConvTags.includes(tag));
        }
        
        return true;
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
  }, [conversations, searchQuery, sortBy, activeTags]);

  const selectedTopicData = conversations.find(conv => conv.id?.toString() === selectedTopic);

  const sidebarTopics = conversations.map(conv => ({
    id: conv.id?.toString() || '',
    title: conv.title
  }));

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#0F111A] via-[#171B29] to-[#0F111A]">
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
          <div className="fixed top-40 right-[5%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] -z-10"></div>
          <div className="fixed bottom-40 left-[30%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10"></div>
          <div className="fixed top-[20%] left-[10%] w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px] -z-10"></div>
          
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
                <header className="px-8 pt-16 pb-10">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                      <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80 mb-2">
                          Conversațiile Comunității
                        </h1>
                        <p className="text-white/60 max-w-2xl">
                          Explorează discuțiile active, împărtășește-ți ideile și conectează-te cu alți membri interesați de aceleași subiecte.
                        </p>
                      </div>
                      
                      <Button
                        onClick={() => window.scrollTo({ top: document.getElementById('create-discussion')?.offsetTop, behavior: 'smooth' })}
                        variant="aurora"
                        rounded="xl"
                        size="lg"
                        className="flex items-center gap-2 h-auto py-3 md:py-4"
                      >
                        <PlusCircle className="h-5 w-5" />
                        <span className="font-medium">Inițiază o Discuție</span>
                      </Button>
                    </div>
                    
                    <div className="mt-10 relative z-30">
                      <div className="p-1.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                        <div className="flex flex-col sm:flex-row items-stretch gap-3">
                          <div className="relative flex-1 w-full">
                            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                            <Input
                              type="search"
                              placeholder="Caută după titlu, descriere sau tag-uri..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full bg-white/5 border-0 pl-10 py-6 text-white placeholder:text-white/40 focus:ring-1 focus:ring-primary/30 rounded-xl"
                            />
                          </div>
                          
                          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "rounded-lg px-4 py-2 h-11 text-white/60",
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
                                "rounded-lg px-4 py-2 h-11 text-white/60",
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
                                "rounded-lg px-4 py-2 h-11 text-white/60",
                                sortBy === 'trending' && "bg-white/10 text-white"
                              )}
                              onClick={() => setSortBy('trending')}
                            >
                              <TrendingUp className="h-4 w-4 mr-2" />
                              Trend
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "rounded-lg w-11 h-11 p-0 flex items-center justify-center",
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
                                "rounded-lg w-11 h-11 p-0 flex items-center justify-center",
                                viewMode === 'list' && "bg-white/10 text-white"
                              )}
                              onClick={() => setViewMode('list')}
                            >
                              <LayoutList className="h-4 w-4" />
                            </Button>
                            
                            <div className="relative">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                  "rounded-lg w-11 h-11 p-0 flex items-center justify-center",
                                  (filterActive || activeTags.length > 0) && "bg-primary/20 text-primary"
                                )}
                                onClick={() => {
                                  setFilterActive(!filterActive);
                                  setShowTagSelector(false);
                                }}
                              >
                                <ListFilter className="h-4 w-4" />
                                {activeTags.length > 0 && (
                                  <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-white text-xs font-medium">
                                    {activeTags.length}
                                  </span>
                                )}
                              </Button>
                            </div>
                            
                            <div className="relative">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                  "rounded-lg h-11 px-4 flex items-center gap-2 text-white/60",
                                  showTagSelector && "bg-white/10 text-white"
                                )}
                                onClick={() => {
                                  setShowTagSelector(!showTagSelector);
                                  setFilterActive(false);
                                }}
                              >
                                <span>Tag-uri</span>
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                              
                              <AnimatePresence>
                                {showTagSelector && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-full mt-2 w-64 p-3 rounded-xl overflow-hidden 
                                              bg-[#171B29]/95 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.2)] z-50"
                                  >
                                    <div className="mb-2 pb-2 border-b border-white/10 flex items-center justify-between">
                                      <h3 className="text-sm font-medium text-white/90">Selectează tag-uri</h3>
                                      {activeTags.length > 0 && (
                                        <Button 
                                          variant="ghost" 
                                          size="sm" 
                                          className="h-6 px-2 text-xs text-white/60 hover:text-white"
                                          onClick={clearFilters}
                                        >
                                          Resetează
                                        </Button>
                                      )}
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto scrollbar-thin">
                                      {availableTags.map((tag) => (
                                        <Badge 
                                          key={tag.name}
                                          className={cn(
                                            "cursor-pointer px-3 py-1.5 flex items-center gap-1",
                                            tag.color,
                                            activeTags.includes(tag.name) && "ring-2 ring-white/20"
                                          )}
                                          onClick={() => toggleTag(tag.name)}
                                        >
                                          {activeTags.includes(tag.name) && <Check className="h-3 w-3" />}
                                          {tag.name}
                                        </Badge>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {filterActive && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="mt-3 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] z-30"
                        >
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-white/90">Filtre active</h3>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 px-3 text-xs text-white/60 hover:text-white"
                                onClick={clearFilters}
                              >
                                <RefreshCcw className="h-3 w-3 mr-1.5" />
                                Resetează toate
                              </Button>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {activeTags.map(tag => (
                                <Badge 
                                  key={tag}
                                  className="bg-white/10 hover:bg-white/20 text-white cursor-pointer px-3 py-1.5 flex items-center gap-1"
                                  onClick={() => toggleTag(tag)}
                                >
                                  {tag}
                                  <X className="h-3 w-3 ml-1" />
                                </Badge>
                              ))}
                              
                              {searchQuery && (
                                <Badge className="bg-white/10 hover:bg-white/20 text-white cursor-pointer px-3 py-1.5 flex items-center gap-1">
                                  Căutare: "{searchQuery.length > 15 ? searchQuery.substring(0, 15) + '...' : searchQuery}"
                                  <X className="h-3 w-3 ml-1" onClick={() => setSearchQuery('')} />
                                </Badge>
                              )}
                              
                              {activeTags.length === 0 && !searchQuery && (
                                <div className="text-white/60 text-sm">
                                  Niciun filtru activ. Folosește opțiunile de filtrare pentru a rafina rezultatele.
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </header>

                <div className="px-8 py-4 bg-white/[0.02] backdrop-blur-sm border-y border-white/5">
                  <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Radio className="h-3.5 w-3.5 text-green-400 animate-pulse" />
                        <span className="text-white/60 text-sm">
                          {filteredConversations.length} din {conversations.length} conversații
                        </span>
                      </div>
                      
                      <div className="hidden md:flex items-center gap-2">
                        <Wifi className="h-3.5 w-3.5 text-blue-400" />
                        <span className="text-white/60 text-sm">
                          Actualizat acum {Math.floor(Math.random() * 10) + 1} minute
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-white/60 text-sm">
                          {Math.floor(Math.random() * 50) + 50} membri online
                        </span>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-3 text-white/60 text-xs rounded-lg"
                        onClick={() => setSortBy(sortBy === 'recent' ? 'popular' : 'recent')}
                      >
                        {sortBy === 'recent' ? (
                          <ArrowDown className="h-3.5 w-3.5 mr-1.5" />
                        ) : (
                          <ArrowUp className="h-3.5 w-3.5 mr-1.5" />
                        )}
                        
                        {sortBy === 'recent' ? 'Cele mai noi' : 'Cele mai populare'}
                      </Button>
                    </div>
                  </div>
                </div>

                <main className="px-8 py-12">
                  <div className="max-w-7xl mx-auto">
                    {filteredConversations.length > 0 ? (
                      <div className={cn(
                        "grid gap-6",
                        viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                      )}>
                        {filteredConversations.map((conv) => (
                          <motion.div
                            key={conv.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
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
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-center py-20 backdrop-blur-md bg-white/[0.01] border border-white/5 rounded-2xl"
                      >
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-white/5 to-white/2 flex items-center justify-center mb-6">
                          <MessageCircle className="h-10 w-10 text-white/20" />
                        </div>
                        <h3 className="text-xl font-medium text-white/80 mb-2">Nicio conversație găsită</h3>
                        <p className="text-white/50 max-w-lg mx-auto mb-8">
                          {searchQuery || activeTags.length > 0
                            ? `Nu există conversații care să se potrivească criteriilor tale de căutare.`
                            : "Nu există conversații active momentan în această comunitate."}
                        </p>
                        
                        {(searchQuery || activeTags.length > 0) && (
                          <Button
                            variant="premium-ghost"
                            rounded="lg"
                            className="mx-auto"
                            onClick={clearFilters}
                          >
                            <RefreshCcw className="h-4 w-4 mr-2" />
                            Resetează filtrele
                          </Button>
                        )}
                      </motion.div>
                    )}
                  </div>
                </main>

                <div id="create-discussion" className="px-8 py-16 bg-gradient-to-br from-[#131725]/90 to-[#0F111A]/90 backdrop-blur-lg border-t border-white/5">
                  <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                      <Badge className="mb-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border-none px-3 py-1.5">
                        <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Creează Conținut
                      </Badge>
                      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80 mb-4">
                        Inițiază o nouă conversație
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
