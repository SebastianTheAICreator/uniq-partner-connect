
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, Clock, Filter, Search, X, Sparkles, Menu } from 'lucide-react';
import PremiumFeedCreator from '@/components/feed/PremiumFeedCreator';
import FeedPost from '@/components/feed/FeedPost';
import FeedTrendingPanel from '@/components/feed/FeedTrendingPanel';
import FeedSearchInput from '@/components/feed/FeedSearchInput';
import AdvancedFilterPanel from '@/components/feed/AdvancedFilterPanel';
import DiscoveryPanel from '@/components/feed/DiscoveryPanel';
import { Post } from '@/components/feed/FeedPost';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';
import { useFeedPosts } from '@/hooks/useFeedPosts';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useAdvancedSearch } from '@/hooks/useAdvancedSearch';
import { cn } from '@/lib/utils';

// Mock conversation data to display in the sidebar
const mockConversations = [
  { id: '1', title: 'My first conversation' },
  { id: '2', title: 'Another conversation' }, 
  { id: '3', title: 'Design discussion' }
];

// Mock post data to display in the feed with sample comments
const initialMockPosts: Post[] = [
  {
    id: '1',
    content: 'Just launched our revolutionary AI feature that helps businesses increase productivity by 300%. Early users are seeing unprecedented results across their workflows.',
    author: {
      id: 'user1',
      name: 'Alexandra Chen',
      role: 'Chief AI Officer',
      avatar: '',
      verified: true
    },
    timestamp: '2 hours ago',
    stats: {
      likes: 2452,
      dislikes: 12,
      replies: 342,
      shares: 158,
      views: 12789
    },
    tags: ['artificial-intelligence', 'productivity', 'future-of-work'],
    isPinned: true,
    comments: [
      {
        id: 'comment1',
        content: 'This is absolutely revolutionary! The productivity gains we\'ve seen in our beta testing are incredible.',
        author: {
          id: 'user4',
          name: 'David Kim',
          role: 'Product Manager',
          verified: true
        },
        timestamp: '1h ago',
        likes: 24,
        hasLiked: false
      },
      {
        id: 'comment2',
        content: 'Amazing work! The AI integration is seamless. Our team productivity has increased by over 250%.',
        author: {
          id: 'user6',
          name: 'Marcus Johnson',
          role: 'Engineering Lead',
          verified: true
        },
        timestamp: '45m ago',
        likes: 31,
        hasLiked: false
      }
    ]
  },
  {
    id: '2',
    content: "Our latest market analysis shows a significant shift in consumer behavior post-pandemic. We've identified 5 key trends that will shape the industry for the next decade.",
    author: {
      id: 'user2',
      name: 'Michael Reynolds',
      role: 'Market Strategist',
      avatar: '',
      verified: true
    },
    timestamp: '5 hours ago',
    stats: {
      likes: 1836,
      dislikes: 23,
      replies: 215,
      shares: 427,
      views: 8943
    },
    tags: ['market-analysis', 'consumer-trends', 'strategy'],
    isPinned: false,
    attachments: [
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
      }
    ],
    comments: [
      {
        id: 'comment3',
        content: 'Fascinating analysis! The shift towards mobile-first experiences is particularly interesting.',
        author: {
          id: 'user7',
          name: 'Lisa Chen',
          role: 'Strategy Consultant',
          verified: true
        },
        timestamp: '3h ago',
        likes: 12,
        hasLiked: false
      }
    ]
  },
  {
    id: '3',
    content: "Thrilled to announce we've secured $175M in Series C funding to accelerate our global expansion and product development. Grateful to our investors who believe in our vision of transforming how enterprises leverage data.",
    author: {
      id: 'user3',
      name: 'Sarah Blackwood',
      role: 'CEO & Founder',
      avatar: '',
      verified: true
    },
    timestamp: '1 day ago',
    stats: {
      likes: 4278,
      dislikes: 0,
      replies: 532,
      shares: 982,
      views: 26754
    },
    tags: ['funding', 'startup', 'venture-capital'],
    isPinned: false,
    comments: [
      {
        id: 'comment4',
        content: 'Congratulations on the funding! This is exactly the kind of innovation we need in the data space.',
        author: {
          id: 'user8',
          name: 'Alex Rodriguez',
          role: 'Investor',
          verified: true
        },
        timestamp: '12h ago',
        likes: 18,
        hasLiked: false
      }
    ]
  }
];

const FeedContent = () => {
  const { toast } = useToast();
  const { collapsed, setCollapsed, isMobile } = useSidebar();
  
  // Use the posts management hook with infinite scroll support
  const { posts, pagination, loadMorePosts, createPost } = useFeedPosts(initialMockPosts);
  
  // Use the advanced search hook
  const {
    query,
    setQuery,
    filters,
    setFilters,
    suggestions,
    isSearching,
    searchHistory,
    searchResults,
    selectedSuggestion,
    executeSearch,
    clearSearch,
    resetFilters,
    handleKeyNavigation,
    hasActiveFilters,
    resultCount
  } = useAdvancedSearch(posts);
  
  // Use the infinite scroll hook
  const { isFetching, loadMoreRef } = useInfiniteScroll({
    hasNextPage: pagination.hasNextPage,
    isLoading: pagination.isLoading
  });
  
  const [filterOpen, setFilterOpen] = useState(false);
  const [discoveryOpen, setDiscoveryOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleFilter = () => setFilterOpen(prev => !prev);
  const toggleDiscovery = () => setDiscoveryOpen(prev => !prev);
  
  const handlePostCreated = (newPost: { content: string; files: any[] }) => {
    createPost(newPost);
  };

  // Fix the keyboard event handler type
  const handleKeyDown = (event: React.KeyboardEvent) => {
    handleKeyNavigation(event.nativeEvent);
  };

  // Trigger load more when infinite scroll detects intersection
  useEffect(() => {
    if (isFetching) {
      loadMorePosts();
    }
  }, [isFetching, loadMorePosts]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Premium Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 luxury-backdrop border-b border-white/10">
        <Navbar />
      </div>
      
      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <Button
          onClick={() => setCollapsed(!collapsed)}
          variant="ghost"
          size="sm"
          className="fixed top-20 left-4 z-40 premium-button md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      <div className="flex min-h-screen pt-16">
        {/* Sidebar */}
        <Sidebar conversations={mockConversations} />
        
        {/* Main Content */}
        <div className={cn(
          "flex-1 transition-all duration-300 ease-out",
          !isMobile && (collapsed ? "ml-16" : "ml-72"),
          isMobile && "ml-0"
        )}>
          <div className="max-w-4xl mx-auto mobile-container">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mobile-spacing py-6"
            >
              {/* Premium Feed Header */}
              <div className="sticky top-16 z-30 py-6 luxury-backdrop border-b border-white/5 mb-8">
                {/* Header Title */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.h1 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent"
                    >
                      Premium Feed
                    </motion.h1>
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-white/80 to-white/40 animate-luxury-pulse"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                    />
                    {hasActiveFilters && (
                      <Badge className="bg-white/10 text-white border-white/20 animate-luxury-glow">
                        {resultCount} results
                      </Badge>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setFilters({ ...filters, sortBy: 'trending' })} 
                      className={cn(
                        "premium-button text-xs sm:text-sm",
                        filters.sortBy === 'trending' ? 'bg-white/20 text-white' : 'text-white/70'
                      )}
                    >
                      <TrendingUp className="mr-1 h-4 w-4" />
                      <span className="hidden sm:inline">Trending</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setFilters({ ...filters, sortBy: 'recent' })} 
                      className={cn(
                        "premium-button text-xs sm:text-sm",
                        filters.sortBy === 'recent' ? 'bg-white/20 text-white' : 'text-white/70'
                      )}
                    >
                      <Clock className="mr-1 h-4 w-4" />
                      <span className="hidden sm:inline">Recent</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={toggleFilter} 
                      className={cn(
                        "premium-button",
                        filterOpen || hasActiveFilters 
                          ? 'bg-white/20 text-white border-white/30' 
                          : 'text-white/70'
                      )}
                    >
                      <Filter className="h-4 w-4" />
                      {hasActiveFilters && (
                        <span className="ml-1 text-xs">•</span>
                      )}
                    </Button>

                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={toggleDiscovery} 
                      className={cn(
                        "premium-button",
                        discoveryOpen 
                          ? 'bg-white/20 text-white border-white/30' 
                          : 'text-white/70'
                      )}
                    >
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Premium Search */}
                <div className="relative mb-4">
                  <FeedSearchInput
                    value={query}
                    onChange={setQuery}
                    onSearch={executeSearch}
                    onClear={clearSearch}
                    suggestions={suggestions}
                    isSearching={isSearching}
                    searchHistory={searchHistory}
                    selectedSuggestion={selectedSuggestion}
                    onKeyDown={handleKeyDown}
                    className="w-full premium-input"
                    advanced={true}
                  />
                </div>
                
                {/* Active Filters */}
                {hasActiveFilters && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-2 flex-wrap"
                  >
                    {query && (
                      <Badge className="premium-glass text-white border-white/20">
                        Search: "{query}"
                        <button 
                          onClick={clearSearch}
                          className="ml-1 hover:text-white/70"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {filters.tags.map(tag => (
                      <Badge key={tag} className="premium-glass text-white border-white/20">
                        #{tag}
                        <button 
                          onClick={() => setFilters({
                            ...filters,
                            tags: filters.tags.filter(t => t !== tag)
                          })}
                          className="ml-1 hover:text-white/70"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {filters.minEngagement && (
                      <Badge className="premium-glass text-white border-white/20">
                        {filters.minEngagement}+ engagement
                        <button 
                          onClick={() => setFilters({ ...filters, minEngagement: null })}
                          className="ml-1 hover:text-white/70"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    <Button
                      onClick={resetFilters}
                      variant="ghost"
                      size="sm"
                      className="text-white/60 hover:text-white text-xs premium-button"
                    >
                      Clear all
                    </Button>
                  </motion.div>
                )}
              </div>
              
              {/* Premium Post Creator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <PremiumFeedCreator onPostCreated={handlePostCreated} />
              </motion.div>
              
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Posts Feed */}
                <div className="lg:col-span-3 mobile-spacing">
                  {/* No results message */}
                  {searchResults.length === 0 && (query || hasActiveFilters) && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16 premium-card mobile-padding"
                    >
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                        <Search className="h-8 w-8 text-white/40" />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-2">No posts found</h3>
                      <p className="text-white/60 mb-6">Try adjusting your search or filters</p>
                      <div className="flex gap-3 justify-center">
                        <Button onClick={clearSearch} className="premium-button">
                          Clear search
                        </Button>
                        <Button onClick={resetFilters} className="premium-button">
                          Reset filters
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Posts */}
                  <AnimatePresence mode="popLayout">
                    {searchResults.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.1,
                          ease: "easeOut"
                        }}
                        className="luxury-hover"
                      >
                        <FeedPost 
                          post={post} 
                          delay={index * 0.1}
                          className="premium-card"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Infinite Scroll Loader */}
                  {pagination.hasNextPage && searchResults.length > 0 && (
                    <motion.div 
                      ref={loadMoreRef} 
                      className="flex justify-center py-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {pagination.isLoading ? (
                        <div className="flex items-center gap-3 premium-glass mobile-padding rounded-xl">
                          <div className="w-6 h-6 border-2 border-t-white border-r-white border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                          <span className="text-white/80">Loading more posts...</span>
                        </div>
                      ) : (
                        <div className="w-2 h-2 bg-white/40 rounded-full animate-luxury-pulse"></div>
                      )}
                    </motion.div>
                  )}

                  {/* End Indicator */}
                  {!pagination.hasNextPage && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12"
                    >
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-white/10 to-white/5 flex items-center justify-center animate-luxury-glow">
                        <span className="text-2xl">✨</span>
                      </div>
                      <p className="text-white/60 text-sm">You've reached the end! Great job staying connected.</p>
                    </motion.div>
                  )}
                </div>
                
                {/* Sidebar Panels */}
                <div className="lg:col-span-1 space-y-6 hidden lg:block">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <FeedTrendingPanel />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <DiscoveryPanel />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Advanced Filter Panel */}
      <AdvancedFilterPanel
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onReset={resetFilters}
      />

      {/* Mobile Discovery Panel */}
      <AnimatePresence>
        {discoveryOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 lg:hidden luxury-backdrop"
            onClick={() => setDiscoveryOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <DiscoveryPanel className="rounded-t-2xl border-t border-white/10 premium-glass" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Feed = () => {
  return (
    <SidebarProvider>
      <FeedContent />
    </SidebarProvider>
  );
};

export default Feed;
