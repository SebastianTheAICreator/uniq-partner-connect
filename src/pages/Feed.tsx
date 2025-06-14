
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, Clock, Filter, Search, X, Settings, Sparkles } from 'lucide-react';
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
  const { collapsed, isMobile } = useSidebar();
  
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

  // Calculate dynamic padding based on sidebar state
  const getMainContentPadding = () => {
    if (isMobile) {
      return 'pl-0'; // No padding on mobile as sidebar is overlay
    }
    return collapsed ? 'pl-16' : 'pl-72';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      
      <div className="container mx-auto pt-20 px-4 md:px-8 flex">
        <Sidebar conversations={mockConversations} />
        
        <div className={`w-full lg:pr-72 transition-all duration-300 ${getMainContentPadding()}`}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 space-y-6"
          >
            {/* Enhanced Feed header with improved dark theme */}
            <div className="sticky top-16 z-20 py-4 backdrop-blur-xl bg-gradient-to-r from-slate-950/95 via-slate-900/95 to-slate-950/95 border-b border-slate-800/50 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                    Feed
                  </h1>
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse shadow-lg shadow-blue-500/50"></div>
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 shadow-lg">
                      {resultCount} results
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setFilters({ ...filters, sortBy: 'trending' })} 
                    className={cn(
                      "rounded-xl px-4 py-2 transition-all duration-300 shadow-lg",
                      filters.sortBy === 'trending' 
                        ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-300 border border-blue-500/50 shadow-blue-500/25' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:shadow-lg'
                    )}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Trending</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setFilters({ ...filters, sortBy: 'recent' })} 
                    className={cn(
                      "rounded-xl px-4 py-2 transition-all duration-300 shadow-lg",
                      filters.sortBy === 'recent' 
                        ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-300 border border-purple-500/50 shadow-purple-500/25' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:shadow-lg'
                    )}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Recent</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleFilter} 
                    className={cn(
                      "rounded-xl px-4 py-2 transition-all duration-300 shadow-lg",
                      filterOpen || hasActiveFilters 
                        ? 'bg-gradient-to-r from-green-600/30 to-emerald-600/30 text-green-300 border border-green-500/50 shadow-green-500/25' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:shadow-lg'
                    )}
                  >
                    <Filter className="h-4 w-4" />
                    {hasActiveFilters && (
                      <span className="ml-1 text-xs animate-pulse">•</span>
                    )}
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleDiscovery} 
                    className={cn(
                      "rounded-xl px-4 py-2 transition-all duration-300 shadow-lg",
                      discoveryOpen 
                        ? 'bg-gradient-to-r from-orange-600/30 to-yellow-600/30 text-orange-300 border border-orange-500/50 shadow-orange-500/25' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:shadow-lg'
                    )}
                  >
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Advanced Search Input with enhanced styling */}
              <div className="relative">
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
                  className="w-full max-w-md bg-slate-800/50 border-slate-700/50 focus:border-blue-500/50 shadow-xl"
                  advanced={true}
                />
                
                {/* Active filters summary with improved styling */}
                {hasActiveFilters && (
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex flex-wrap gap-2">
                      {query && (
                        <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-500/50 shadow-lg">
                          Search: "{query}"
                          <button 
                            onClick={clearSearch}
                            className="ml-1 hover:text-blue-200 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {filters.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-500/50 shadow-lg">
                          #{tag}
                          <button 
                            onClick={() => setFilters({
                              ...filters,
                              tags: filters.tags.filter(t => t !== tag)
                            })}
                            className="ml-1 hover:text-purple-200 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {filters.minEngagement && (
                        <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-500/50 shadow-lg">
                          {filters.minEngagement}+ engagement
                          <button 
                            onClick={() => setFilters({ ...filters, minEngagement: null })}
                            className="ml-1 hover:text-green-200 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                    </div>
                    <Button
                      onClick={resetFilters}
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-slate-200 text-xs transition-colors"
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* New Feed Creator with enhanced styling */}
            <div className="bg-gradient-to-r from-slate-900/50 via-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 shadow-2xl">
              <PremiumFeedCreator onPostCreated={handlePostCreated} />
            </div>
            
            <div className="flex gap-6">
              {/* Main feed with enhanced card styling */}
              <div className="flex-1">
                <div className="space-y-6 pb-20">
                  {/* No results message with enhanced styling */}
                  {searchResults.length === 0 && (query || hasActiveFilters) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-16 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl border border-slate-700/50 shadow-2xl"
                    >
                      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center shadow-lg">
                        <Search className="h-10 w-10 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-200 mb-3">No posts found</h3>
                      <p className="text-slate-400 mb-6 max-w-md mx-auto">Try adjusting your search or filters to find what you're looking for</p>
                      <div className="flex gap-3 justify-center">
                        <Button 
                          onClick={clearSearch} 
                          variant="outline" 
                          size="sm"
                          className="bg-slate-800/50 border-slate-600/50 hover:bg-slate-700/50 shadow-lg"
                        >
                          Clear search
                        </Button>
                        <Button 
                          onClick={resetFilters} 
                          variant="outline" 
                          size="sm"
                          className="bg-slate-800/50 border-slate-600/50 hover:bg-slate-700/50 shadow-lg"
                        >
                          Reset filters
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Posts with enhanced styling */}
                  <AnimatePresence>
                    {searchResults.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-br from-slate-900/60 via-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
                      >
                        <FeedPost 
                          post={post} 
                          delay={index * 0.1}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Infinite scroll trigger with enhanced styling */}
                  {pagination.hasNextPage && searchResults.length > 0 && (
                    <div ref={loadMoreRef} className="flex justify-center py-8">
                      {pagination.isLoading ? (
                        <div className="flex items-center gap-3 bg-slate-900/50 px-6 py-3 rounded-xl border border-slate-700/50 shadow-xl">
                          <div className="w-6 h-6 border-2 border-t-blue-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin shadow-lg"></div>
                          <span className="text-slate-300 font-medium">Loading more posts...</span>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center"
                        >
                          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* End of posts indicator with enhanced styling */}
                  {!pagination.hasNextPage && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12 bg-gradient-to-r from-slate-900/30 to-slate-800/30 rounded-2xl border border-slate-700/30"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center shadow-lg">
                        <span className="text-2xl animate-bounce">🎉</span>
                      </div>
                      <p className="text-slate-400 text-sm font-medium">You've reached the end! Great job staying connected.</p>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Enhanced sidebar with improved styling */}
              <div className="hidden lg:block w-72 absolute right-8 top-24 space-y-6">
                <div className="bg-gradient-to-br from-slate-900/60 via-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl">
                  <FeedTrendingPanel />
                </div>
                <div className="bg-gradient-to-br from-slate-900/60 via-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/50 shadow-2xl">
                  <DiscoveryPanel />
                </div>
              </div>
            </div>
          </motion.div>
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

      {/* Discovery Panel Overlay for mobile */}
      <AnimatePresence>
        {discoveryOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setDiscoveryOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border border-slate-700/50 shadow-2xl">
                <DiscoveryPanel className="rounded-t-2xl border-t" />
              </div>
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
