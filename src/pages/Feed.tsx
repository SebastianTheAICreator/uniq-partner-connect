
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
    <div className="min-h-screen bg-gradient-to-br from-[#0A0C10] via-[#0F1117] to-[#0A0C10]">
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
            {/* Premium Feed header with enhanced dark theme */}
            <div className="sticky top-16 z-20 py-4 backdrop-blur-xl bg-gradient-to-r from-[#1A1F2C]/95 via-[#1E293B]/95 to-[#1A1F2C]/95 border-b border-[#3A4366]/30 shadow-2xl rounded-2xl mx-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4A90E2] via-[#7B68EE] to-[#00D4FF]">
                    Feed
                  </h1>
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#4A90E2] to-[#7B68EE] animate-pulse shadow-lg shadow-[#4A90E2]/50"></div>
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="bg-[#4A90E2]/20 text-[#4A90E2] border-[#4A90E2]/30 shadow-lg">
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
                      "rounded-xl px-4 py-2 transition-all duration-300 shadow-lg border border-[#3A4366]/20",
                      filters.sortBy === 'trending' 
                        ? 'bg-gradient-to-r from-[#4A90E2]/30 to-[#7B68EE]/30 text-[#4A90E2] border-[#4A90E2]/50 shadow-[#4A90E2]/25' 
                        : 'text-[#B0C4DE] hover:text-white hover:bg-gradient-to-r hover:from-[#2A3441] hover:to-[#3A4366] hover:shadow-lg'
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
                      "rounded-xl px-4 py-2 transition-all duration-300 shadow-lg border border-[#3A4366]/20",
                      filters.sortBy === 'recent' 
                        ? 'bg-gradient-to-r from-[#7B68EE]/30 to-[#DA70D6]/30 text-[#7B68EE] border-[#7B68EE]/50 shadow-[#7B68EE]/25' 
                        : 'text-[#B0C4DE] hover:text-white hover:bg-gradient-to-r hover:from-[#2A3441] hover:to-[#3A4366] hover:shadow-lg'
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
                      "rounded-xl px-4 py-2 transition-all duration-300 shadow-lg border border-[#3A4366]/20",
                      filterOpen || hasActiveFilters 
                        ? 'bg-gradient-to-r from-[#32CD32]/30 to-[#00FF7F]/30 text-[#32CD32] border-[#32CD32]/50 shadow-[#32CD32]/25' 
                        : 'text-[#B0C4DE] hover:text-white hover:bg-gradient-to-r hover:from-[#2A3441] hover:to-[#3A4366] hover:shadow-lg'
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
                      "rounded-xl px-4 py-2 transition-all duration-300 shadow-lg border border-[#3A4366]/20",
                      discoveryOpen 
                        ? 'bg-gradient-to-r from-[#FF8C00]/30 to-[#FFD700]/30 text-[#FF8C00] border-[#FF8C00]/50 shadow-[#FF8C00]/25' 
                        : 'text-[#B0C4DE] hover:text-white hover:bg-gradient-to-r hover:from-[#2A3441] hover:to-[#3A4366] hover:shadow-lg'
                    )}
                  >
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Enhanced Search Input with premium styling */}
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
                  className="w-full max-w-md bg-gradient-to-r from-[#2A3441]/80 to-[#3A4366]/80 border-[#4A90E2]/30 focus:border-[#4A90E2]/50 shadow-xl backdrop-blur-sm"
                  advanced={true}
                />
                
                {/* Active filters with premium styling */}
                {hasActiveFilters && (
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex flex-wrap gap-2">
                      {query && (
                        <Badge variant="outline" className="bg-[#4A90E2]/20 text-[#4A90E2] border-[#4A90E2]/50 shadow-lg backdrop-blur-sm">
                          Search: "{query}"
                          <button 
                            onClick={clearSearch}
                            className="ml-1 hover:text-[#7B68EE] transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {filters.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="bg-[#7B68EE]/20 text-[#7B68EE] border-[#7B68EE]/50 shadow-lg backdrop-blur-sm">
                          #{tag}
                          <button 
                            onClick={() => setFilters({
                              ...filters,
                              tags: filters.tags.filter(t => t !== tag)
                            })}
                            className="ml-1 hover:text-[#DA70D6] transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {filters.minEngagement && (
                        <Badge variant="outline" className="bg-[#32CD32]/20 text-[#32CD32] border-[#32CD32]/50 shadow-lg backdrop-blur-sm">
                          {filters.minEngagement}+ engagement
                          <button 
                            onClick={() => setFilters({ ...filters, minEngagement: null })}
                            className="ml-1 hover:text-[#00FF7F] transition-colors"
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
                      className="text-[#B0C4DE] hover:text-white text-xs transition-colors"
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Premium Feed Creator with enhanced styling */}
            <div className="bg-gradient-to-br from-[#1A1F2C]/80 via-[#2A3441]/80 to-[#1A1F2C]/80 rounded-2xl border border-[#3A4366]/30 shadow-2xl backdrop-blur-xl">
              <PremiumFeedCreator onPostCreated={handlePostCreated} />
            </div>
            
            <div className="flex gap-6">
              {/* Main feed with premium card styling */}
              <div className="flex-1">
                <div className="space-y-6 pb-20">
                  {/* No results message with premium styling */}
                  {searchResults.length === 0 && (query || hasActiveFilters) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-16 bg-gradient-to-br from-[#1A1F2C]/60 to-[#2A3441]/60 rounded-2xl border border-[#3A4366]/30 shadow-2xl backdrop-blur-xl"
                    >
                      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#4A90E2]/20 to-[#7B68EE]/20 flex items-center justify-center shadow-lg">
                        <Search className="h-10 w-10 text-[#4A90E2]" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">No posts found</h3>
                      <p className="text-[#B0C4DE] mb-6 max-w-md mx-auto">Try adjusting your search or filters to find what you're looking for</p>
                      <div className="flex gap-3 justify-center">
                        <Button 
                          onClick={clearSearch} 
                          variant="outline" 
                          size="sm"
                          className="bg-[#2A3441]/60 border-[#3A4366]/50 hover:bg-[#3A4366]/60 shadow-lg backdrop-blur-sm"
                        >
                          Clear search
                        </Button>
                        <Button 
                          onClick={resetFilters} 
                          variant="outline" 
                          size="sm"
                          className="bg-[#2A3441]/60 border-[#3A4366]/50 hover:bg-[#3A4366]/60 shadow-lg backdrop-blur-sm"
                        >
                          Reset filters
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Posts with premium styling */}
                  <AnimatePresence>
                    {searchResults.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-br from-[#1A1F2C]/70 via-[#2A3441]/70 to-[#1A1F2C]/70 rounded-2xl border border-[#3A4366]/30 shadow-2xl hover:shadow-[#4A90E2]/10 transition-all duration-300 backdrop-blur-xl"
                      >
                        <FeedPost 
                          post={post} 
                          delay={index * 0.1}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Infinite scroll trigger with premium styling */}
                  {pagination.hasNextPage && searchResults.length > 0 && (
                    <div ref={loadMoreRef} className="flex justify-center py-8">
                      {pagination.isLoading ? (
                        <div className="flex items-center gap-3 bg-[#1A1F2C]/60 px-6 py-3 rounded-xl border border-[#3A4366]/30 shadow-xl backdrop-blur-sm">
                          <div className="w-6 h-6 border-2 border-t-[#4A90E2] border-r-[#7B68EE] border-b-transparent border-l-transparent rounded-full animate-spin shadow-lg"></div>
                          <span className="text-white font-medium">Loading more posts...</span>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center"
                        >
                          <div className="w-3 h-3 bg-gradient-to-r from-[#4A90E2] to-[#7B68EE] rounded-full animate-pulse shadow-lg shadow-[#4A90E2]/50"></div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* End of posts indicator with premium styling */}
                  {!pagination.hasNextPage && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12 bg-gradient-to-r from-[#1A1F2C]/40 to-[#2A3441]/40 rounded-2xl border border-[#3A4366]/20 backdrop-blur-sm"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#4A90E2]/20 via-[#7B68EE]/20 to-[#FF69B4]/20 flex items-center justify-center shadow-lg">
                        <span className="text-2xl animate-bounce">🎉</span>
                      </div>
                      <p className="text-[#B0C4DE] text-sm font-medium">You've reached the end! Great job staying connected.</p>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Premium sidebar with enhanced styling */}
              <div className="hidden lg:block w-72 absolute right-8 top-24 space-y-6">
                <div className="bg-gradient-to-br from-[#1A1F2C]/70 via-[#2A3441]/70 to-[#1A1F2C]/70 rounded-2xl border border-[#3A4366]/30 shadow-2xl backdrop-blur-xl">
                  <FeedTrendingPanel />
                </div>
                <div className="bg-gradient-to-br from-[#1A1F2C]/70 via-[#2A3441]/70 to-[#1A1F2C]/70 rounded-2xl border border-[#3A4366]/30 shadow-2xl backdrop-blur-xl">
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
            className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setDiscoveryOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-[#1A1F2C]/95 via-[#2A3441]/95 to-[#1A1F2C]/95 border border-[#3A4366]/30 shadow-2xl backdrop-blur-xl">
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
