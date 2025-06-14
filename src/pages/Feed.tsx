
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
import FeedSkeletonLoader from '@/components/feed/FeedSkeletonLoader';
import EnhancedEmptyState from '@/components/feed/EnhancedEmptyState';
import MobileOptimizedPost from '@/components/feed/MobileOptimizedPost';
import EnhancedNotificationSystem from '@/components/feed/EnhancedNotificationSystem';
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
    hasLiked: false,
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
    hasLiked: true,
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
    hasLiked: false,
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
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const toggleFilter = () => setFilterOpen(prev => !prev);
  const toggleDiscovery = () => setDiscoveryOpen(prev => !prev);
  
  const handlePostCreated = (newPost: { content: string; files: any[] }) => {
    createPost(newPost);
    toast({
      title: "Post published successfully",
      description: "Your post is now live and visible to the community",
    });
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

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Calculate dynamic padding based on sidebar state
  const getMainContentPadding = () => {
    if (isMobile) {
      return 'pl-0'; // No padding on mobile as sidebar is overlay
    }
    return collapsed ? 'pl-16' : 'pl-72';
  };

  // Enhanced post interaction handlers
  const handleLike = (postId: string) => {
    // Handle like logic with optimistic updates
    toast({
      title: "Post liked",
      description: "Added to your liked posts",
    });
  };

  const handleDislike = (postId: string) => {
    // Handle dislike logic
  };

  const handleComment = (postId: string) => {
    // Handle comment logic
    toast({
      title: "Opening comments",
      description: "Loading discussion thread",
    });
  };

  const handleShare = (postId: string) => {
    // Handle share logic
    navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
    toast({
      title: "Link copied",
      description: "Post link copied to clipboard",
    });
  };

  const handleRetry = () => {
    setError(null);
    setIsInitialLoading(true);
    // Retry loading logic
    setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000);
  };

  const handleCreatePost = () => {
    // Scroll to post creator
    const creator = document.querySelector('[data-feed-creator]');
    creator?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDiscoverPeople = () => {
    // Navigate to discover people page
    window.location.href = '/discover-people';
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-gray-100">
        <Navbar />
        <div className="container mx-auto pt-20 px-4">
          <EnhancedEmptyState
            type="error"
            onAction={handleRetry}
            onSecondaryAction={() => window.location.reload()}
            secondaryActionLabel="Refresh Page"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100">
      <Navbar>
        <div className="flex items-center gap-4">
          <EnhancedNotificationSystem />
        </div>
      </Navbar>
      
      <div className="container mx-auto pt-20 px-4 md:px-8 flex">
        <Sidebar conversations={mockConversations} />
        
        <div className={`w-full lg:pr-72 transition-all duration-300 ${getMainContentPadding()}`}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 space-y-6"
          >
            {/* Enhanced Feed header with premium styling */}
            <div className="sticky top-16 z-20 py-4 backdrop-blur-lg bg-gradient-to-r from-[#0d1117]/95 via-[#1a1f2c]/95 to-[#0d1117]/95 border-b border-[#30363d]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
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
                    className={`rounded-lg px-3 transition-all duration-300 ${filters.sortBy === 'trending' ? 'bg-blue-900/30 text-blue-400 shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:bg-gray-800/50'}`}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Trending</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setFilters({ ...filters, sortBy: 'recent' })} 
                    className={`rounded-lg px-3 transition-all duration-300 ${filters.sortBy === 'recent' ? 'bg-purple-900/30 text-purple-400 shadow-lg shadow-purple-500/20' : 'text-gray-400 hover:bg-gray-800/50'}`}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Recent</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleFilter} 
                    className={`rounded-lg px-3 transition-all duration-300 ${
                      filterOpen || hasActiveFilters 
                        ? 'bg-green-900/30 text-green-400 border border-green-500/30 shadow-lg shadow-green-500/20' 
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                    }`}
                  >
                    <Filter className="h-4 w-4" />
                    {hasActiveFilters && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-1 text-xs"
                      >
                        •
                      </motion.span>
                    )}
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleDiscovery} 
                    className={`rounded-lg px-3 transition-all duration-300 ${
                      discoveryOpen 
                        ? 'bg-purple-900/30 text-purple-400 border border-purple-500/30 shadow-lg shadow-purple-500/20' 
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                    }`}
                  >
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Enhanced Search Input */}
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
                  className="w-full max-w-md"
                  advanced={true}
                />
                
                {/* Active filters with enhanced styling */}
                {hasActiveFilters && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-3"
                  >
                    <div className="flex flex-wrap gap-2">
                      {query && (
                        <Badge variant="outline" className="bg-blue-900/20 text-blue-300 border-blue-500/30 hover:bg-blue-900/30 transition-colors">
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
                        <Badge key={tag} variant="outline" className="bg-purple-900/20 text-purple-300 border-purple-500/30 hover:bg-purple-900/30 transition-colors">
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
                        <Badge variant="outline" className="bg-green-900/20 text-green-300 border-green-500/30 hover:bg-green-900/30 transition-colors">
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
                      className="text-gray-400 hover:text-gray-200 text-xs hover:bg-gray-800/50 transition-all"
                    >
                      Clear all
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Enhanced Feed Creator */}
            <div data-feed-creator>
              <PremiumFeedCreator onPostCreated={handlePostCreated} />
            </div>
            
            <div className="flex gap-6">
              {/* Main feed with enhanced components */}
              <div className="flex-1">
                <div className="space-y-6 pb-20">
                  {/* Loading state */}
                  {isInitialLoading && (
                    <FeedSkeletonLoader count={3} />
                  )}

                  {/* Content */}
                  {!isInitialLoading && (
                    <>
                      {/* No results with enhanced empty state */}
                      {searchResults.length === 0 && (query || hasActiveFilters) && (
                        <EnhancedEmptyState
                          type={query ? "no-search-results" : "no-filtered-results"}
                          onAction={query ? clearSearch : resetFilters}
                          onSecondaryAction={query ? resetFilters : handleDiscoverPeople}
                          secondaryActionLabel={query ? "Reset Filters" : "Discover People"}
                        />
                      )}

                      {/* Posts with mobile optimization */}
                      <AnimatePresence mode="popLayout">
                        {searchResults.map((post, index) => (
                          <motion.div
                            key={post.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                          >
                            {/* Show mobile optimized post on small screens */}
                            <div className="block md:hidden">
                              <MobileOptimizedPost
                                post={post}
                                onLike={handleLike}
                                onDislike={handleDislike}
                                onComment={handleComment}
                                onShare={handleShare}
                              />
                            </div>
                            
                            {/* Show regular post on larger screens */}
                            <div className="hidden md:block">
                              <FeedPost 
                                post={post} 
                                delay={index * 0.1}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {/* No posts fallback */}
                      {searchResults.length === 0 && !query && !hasActiveFilters && !isInitialLoading && (
                        <EnhancedEmptyState
                          type="no-posts"
                          onAction={handleCreatePost}
                          onSecondaryAction={handleDiscoverPeople}
                        />
                      )}
                    </>
                  )}
                  
                  {/* Enhanced infinite scroll indicator */}
                  {pagination.hasNextPage && searchResults.length > 0 && !isInitialLoading && (
                    <div ref={loadMoreRef} className="flex justify-center py-8">
                      {pagination.isLoading ? (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-6 h-6 border-2 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                          <span className="text-gray-400">Loading more posts...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center"
                        >
                          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Enhanced end of posts indicator */}
                  {!pagination.hasNextPage && searchResults.length > 0 && !isInitialLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center backdrop-blur-sm">
                        <motion.span 
                          animate={{ rotate: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-2xl"
                        >
                          🎉
                        </motion.span>
                      </div>
                      <h3 className="text-lg font-medium text-white/90 mb-2">You're all caught up!</h3>
                      <p className="text-gray-400 text-sm max-w-sm mx-auto">
                        Great job staying connected with the community. Check back later for new updates.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Enhanced sidebar */}
              <div className="hidden lg:block w-72 absolute right-8 top-24 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <FeedTrendingPanel />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <DiscoveryPanel />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Filter Panel */}
      <AdvancedFilterPanel
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onReset={resetFilters}
      />

      {/* Enhanced Discovery Panel Overlay for mobile */}
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
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <DiscoveryPanel className="rounded-t-2xl border-t shadow-2xl" />
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
