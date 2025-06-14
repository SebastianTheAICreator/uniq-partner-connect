
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useDebounce } from './useDebounce';
import { aiService, SearchSuggestion } from '@/services/aiService';
import { Post } from '@/components/feed/FeedPost';

export interface AdvancedSearchFilters {
  dateRange: 'all' | 'today' | 'week' | 'month' | 'year';
  sortBy: 'relevance' | 'recent' | 'popular' | 'trending';
  contentType: 'all' | 'posts' | 'comments' | 'users';
  verified: boolean | null;
  hasMedia: boolean | null;
  minEngagement: number | null;
  tags: string[];
  authors: string[];
  language: string | null;
}

const initialFilters: AdvancedSearchFilters = {
  dateRange: 'all',
  sortBy: 'relevance',
  contentType: 'all',
  verified: null,
  hasMedia: null,
  minEngagement: null,
  tags: [],
  authors: [],
  language: null
};

export const useAdvancedSearch = (posts: Post[]) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<AdvancedSearchFilters>(initialFilters);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(-1);

  const debouncedQuery = useDebounce(query, 300);

  // Get AI-powered search suggestions
  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      const aiSuggestions = await aiService.getSearchSuggestions(searchQuery);
      setSuggestions(aiSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Fetch suggestions when debounced query changes
  useEffect(() => {
    fetchSuggestions(debouncedQuery);
  }, [debouncedQuery, fetchSuggestions]);

  // Advanced search algorithm with AI scoring
  const searchResults = useMemo(() => {
    if (!query.trim()) return posts;

    let filtered = [...posts];

    // Text search with relevance scoring
    if (query.trim()) {
      const searchTerms = query.toLowerCase().split(' ');
      
      filtered = filtered
        .map(post => {
          let score = 0;
          const content = post.content.toLowerCase();
          const authorName = post.author.name.toLowerCase();
          const tags = post.tags?.join(' ').toLowerCase() || '';

          // Exact phrase match gets highest score
          if (content.includes(query.toLowerCase())) {
            score += 10;
          }

          // Individual word matches
          searchTerms.forEach(term => {
            if (content.includes(term)) score += 3;
            if (authorName.includes(term)) score += 2;
            if (tags.includes(term)) score += 4;
          });

          // Boost verified authors
          if (post.author.verified) score += 1;

          // Boost highly engaged posts
          const engagement = post.stats.likes + post.stats.replies + post.stats.shares;
          score += Math.min(engagement / 100, 5);

          return { ...post, searchScore: score };
        })
        .filter(post => post.searchScore > 0);
    }

    // Apply filters
    if (filters.verified !== null) {
      filtered = filtered.filter(post => post.author.verified === filters.verified);
    }

    if (filters.hasMedia !== null) {
      filtered = filtered.filter(post => 
        filters.hasMedia ? post.attachments?.length > 0 : !post.attachments?.length
      );
    }

    if (filters.minEngagement !== null) {
      filtered = filtered.filter(post => {
        const engagement = post.stats.likes + post.stats.replies + post.stats.shares;
        return engagement >= filters.minEngagement!;
      });
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter(post =>
        post.tags?.some(tag => filters.tags.includes(tag))
      );
    }

    if (filters.authors.length > 0) {
      filtered = filtered.filter(post =>
        filters.authors.includes(post.author.id)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aTyped = a as Post & { searchScore?: number };
      const bTyped = b as Post & { searchScore?: number };

      switch (filters.sortBy) {
        case 'relevance':
          return (bTyped.searchScore || 0) - (aTyped.searchScore || 0);
        case 'recent':
          return b.id.localeCompare(a.id); // Assuming ID correlates with recency
        case 'popular':
          const aEngagement = a.stats.likes + a.stats.replies + a.stats.shares;
          const bEngagement = b.stats.likes + b.stats.replies + b.stats.shares;
          return bEngagement - aEngagement;
        case 'trending':
          // Simple trending algorithm based on recent engagement
          const aTrending = a.stats.likes * 2 + a.stats.replies * 3 + a.stats.shares * 5;
          const bTrending = b.stats.likes * 2 + b.stats.replies * 3 + b.stats.shares * 5;
          return bTrending - aTrending;
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, query, filters]);

  const executeSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setQuery(searchQuery);
    
    // Add to search history
    setSearchHistory(prev => {
      const newHistory = [searchQuery, ...prev.filter(q => q !== searchQuery)];
      return newHistory.slice(0, 10); // Keep last 10 searches
    });

    // Track search for analytics
    aiService.trackSearch(searchQuery, searchResults.length);
    
    // Clear suggestions
    setSuggestions([]);
    setSelectedSuggestion(-1);
  }, [searchResults.length]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setSuggestions([]);
    setSelectedSuggestion(-1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const handleKeyNavigation = useCallback((event: KeyboardEvent) => {
    if (!suggestions.length) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedSuggestion(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedSuggestion >= 0) {
          executeSearch(suggestions[selectedSuggestion].query);
        } else {
          executeSearch(query);
        }
        break;
      case 'Escape':
        setSuggestions([]);
        setSelectedSuggestion(-1);
        break;
    }
  }, [suggestions, selectedSuggestion, query, executeSearch]);

  return {
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
    hasActiveFilters: JSON.stringify(filters) !== JSON.stringify(initialFilters),
    resultCount: searchResults.length
  };
};
