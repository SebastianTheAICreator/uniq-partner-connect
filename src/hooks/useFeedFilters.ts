
import { useState, useMemo } from 'react';
import { Post } from '@/components/feed/FeedPost';

export interface FilterState {
  timeRange: 'all' | 'today' | 'week' | 'month';
  authors: string[];
  tags: string[];
  minViews: number | null;
  minReplies: number | null;
  verified: boolean | null;
  pinned: boolean | null;
}

const initialFilterState: FilterState = {
  timeRange: 'all',
  authors: [],
  tags: [],
  minViews: null,
  minReplies: null,
  verified: null,
  pinned: null
};

export const useFeedFilters = (posts: Post[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [sortBy, setSortBy] = useState<'trending' | 'recent'>('trending');

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.author.role?.toLowerCase().includes(query) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply time range filter
    if (filters.timeRange !== 'all') {
      const now = new Date();
      const timeThresholds = {
        today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        week: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        month: new Date(now.getFullYear(), now.getMonth(), 1)
      };

      // Note: In a real app, you'd compare with actual post dates
      // For now, we'll filter based on mock data assumptions
      if (filters.timeRange === 'today') {
        filtered = filtered.filter(post => 
          post.timestamp.includes('hour') || post.timestamp.includes('minute')
        );
      }
    }

    // Apply author filters
    if (filters.authors.length > 0) {
      filtered = filtered.filter(post => 
        filters.authors.includes(post.author.id)
      );
    }

    // Apply tag filters
    if (filters.tags.length > 0) {
      filtered = filtered.filter(post => 
        post.tags?.some(tag => filters.tags.includes(tag))
      );
    }

    // Apply minimum views filter
    if (filters.minViews !== null) {
      filtered = filtered.filter(post => 
        post.stats.views >= filters.minViews!
      );
    }

    // Apply minimum replies filter
    if (filters.minReplies !== null) {
      filtered = filtered.filter(post => 
        post.stats.replies >= filters.minReplies!
      );
    }

    // Apply verified filter
    if (filters.verified === true) {
      filtered = filtered.filter(post => post.author.verified === true);
    }

    // Apply pinned filter
    if (filters.pinned === true) {
      filtered = filtered.filter(post => post.isPinned === true);
    }

    // Apply sorting
    if (sortBy === 'trending') {
      filtered.sort((a, b) => {
        // Sort by engagement score (likes + replies + shares)
        const scoreA = a.stats.likes + a.stats.replies + a.stats.shares;
        const scoreB = b.stats.likes + b.stats.replies + b.stats.shares;
        return scoreB - scoreA;
      });
    } else if (sortBy === 'recent') {
      // Sort by recency (mock implementation)
      filtered.sort((a, b) => {
        const getTimeScore = (timestamp: string) => {
          if (timestamp.includes('minute')) return 1000;
          if (timestamp.includes('hour')) return 100;
          if (timestamp.includes('day')) return 10;
          return 1;
        };
        return getTimeScore(b.timestamp) - getTimeScore(a.timestamp);
      });
    }

    return filtered;
  }, [posts, searchQuery, filters, sortBy]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return searchQuery.trim() !== '' ||
           filters.timeRange !== 'all' ||
           filters.authors.length > 0 ||
           filters.tags.length > 0 ||
           filters.minViews !== null ||
           filters.minReplies !== null ||
           filters.verified !== null ||
           filters.pinned !== null;
  }, [searchQuery, filters]);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters(initialFilterState);
  };

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredPosts,
    hasActiveFilters,
    clearAllFilters
  };
};
