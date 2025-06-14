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
    <div className="min-h-screen bg-[#0d1117] text-gray-100">
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
            {/* Enhanced Feed header */}
            <div className="sticky top-16 z-20 py-4 backdrop-blur-lg bg-gradient-to-r from-[#0d1117]/95 via-[#1a1f2c]/95 to-[#0d1117]/95 border-b border-[#30363d]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Feed</h1>
                  <div className="h-5 w-5 rounded-full bg-blue-500 animate-pulse"></div>
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {resultCount} results
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setFilters({ ...filters, sortBy: 'trending' })} 
                    className={`rounded-lg px-3 ${filters.sortBy === 'trending' ? 'bg-blue-900/30 text-blue-400' : 'text-gray-400'}`}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Trending</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setFilters({ ...filters, sortBy: 'recent' })} 
                    className={`rounded-lg px-3 ${filters.sortBy === 'recent' ? 'bg-purple-900/30 text-purple-400' : 'text-gray-400'}`}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Recent</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleFilter} 
                    className={`rounded-lg px-3 transition-colors ${
                      filterOpen || hasActiveFilters 
                        ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                    }`}
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
                    className={`rounded-lg px-3 transition-colors ${
                      discoveryOpen 
                        ? 'bg-purple-900/30 text-purple-400 border border-purple-500/30' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                    }`}
                  >
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Advanced Search Input */}
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
                  onKeyDown={handleKeyNavigation}
                  className="w-full max-w-md"
                  advanced={true}
                />
                
                {/* Active filters summary */}
                {hasActiveFilters && (
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex flex-wrap gap-2">
                      {query && (
                        <Badge variant="outline" className="bg-blue-900/20 text-blue-300 border-blue-500/30">
                          Search: "{query}"
                          <button 
                            onClick={clearSearch}
                            className="ml-1 hover:text-blue-200"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {filters.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="bg-purple-900/20 text-purple-300 border-purple-500/30">
                          #{tag}
                          <button 
                            onClick={() => setFilters({
                              ...filters,
                              tags: filters.tags.filter(t => t !== tag)
                            })}
                            className="ml-1 hover:text-purple-200"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {filters.minEngagement && (
                        <Badge variant="outline" className="bg-green-900/20 text-green-300 border-green-500/30">
                          {filters.minEngagement}+ engagement
                          <button 
                            onClick={() => setFilters({ ...filters, minEngagement: null })}
                            className="ml-1 hover:text-green-200"
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
                      className="text-gray-400 hover:text-gray-200 text-xs"
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* New Feed Creator */}
            <PremiumFeedCreator onPostCreated={handlePostCreated} />
            
            <div className="flex gap-6">
              {/* Main feed with search results */}
              <div className="flex-1">
                <div className="space-y-6 pb-20">
                  {/* No results message */}
                  {searchResults.length === 0 && (query || hasActiveFilters) && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-300 mb-2">No posts found</h3>
                      <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
                      <div className="flex gap-2 justify-center">
                        <Button onClick={clearSearch} variant="outline" size="sm">
                          Clear search
                        </Button>
                        <Button onClick={resetFilters} variant="outline" size="sm">
                          Reset filters
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Posts with enhanced search results */}
                  <AnimatePresence>
                    {searchResults.map((post, index) => (
                      <FeedPost 
                        key={post.id}
                        post={post} 
                        delay={index * 0.1}
                      />
                    ))}
                  </AnimatePresence>
                  
                  {/* Infinite scroll trigger */}
                  {pagination.hasNextPage && searchResults.length > 0 && (
                    <div ref={loadMoreRef} className="flex justify-center py-8">
                      {pagination.isLoading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-2 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                          <span className="text-gray-400">Loading more posts...</span>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* End of posts indicator */}
                  {!pagination.hasNextPage && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-8"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <span className="text-xl">🎉</span>
                      </div>
                      <p className="text-gray-400 text-sm">You've reached the end! Great job staying connected.</p>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Enhanced sidebar with trending and discovery */}
              <div className="hidden lg:block w-72 absolute right-8 top-24 space-y-6">
                <FeedTrendingPanel />
                <DiscoveryPanel />
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
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setDiscoveryOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <DiscoveryPanel className="rounded-t-2xl border-t" />
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
