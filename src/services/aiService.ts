
export interface SearchSuggestion {
  query: string;
  type: 'user' | 'topic' | 'hashtag' | 'content';
  relevance: number;
}

export interface ContentRecommendation {
  postId: string;
  score: number;
  reason: string;
  category: string;
}

export interface TrendingTopic {
  topic: string;
  count: number;
  growth: number;
  category: string;
}

export interface SearchAnalytics {
  totalSearches: number;
  topQueries: string[];
  clickThroughRate: number;
  avgSessionTime: number;
}

export interface UserMatch {
  userId: string;
  similarity: number;
  commonInterests: string[];
}

class AIService {
  private baseUrl = '/api'; // Will be Supabase Edge Functions
  private fallbackMode = false;

  async getSearchSuggestions(query: string): Promise<SearchSuggestion[]> {
    if (this.fallbackMode) {
      return this.getFallbackSuggestions(query);
    }

    try {
      const response = await fetch(`${this.baseUrl}/search-suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get search suggestions');
      }
      
      return await response.json();
    } catch (error) {
      console.log('Falling back to local suggestions for search');
      this.fallbackMode = true;
      return this.getFallbackSuggestions(query);
    }
  }

  async getContentRecommendations(userId: string, limit: number = 10): Promise<ContentRecommendation[]> {
    if (this.fallbackMode) {
      return this.getFallbackRecommendations(limit);
    }

    try {
      const response = await fetch(`${this.baseUrl}/content-recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, limit })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get content recommendations');
      }
      
      return await response.json();
    } catch (error) {
      console.log('Falling back to local recommendations');
      this.fallbackMode = true;
      return this.getFallbackRecommendations(limit);
    }
  }

  async getTrendingTopics(): Promise<TrendingTopic[]> {
    if (this.fallbackMode) {
      return this.getFallbackTrending();
    }

    try {
      const response = await fetch(`${this.baseUrl}/trending-topics`);
      
      if (!response.ok) {
        throw new Error('Failed to get trending topics');
      }
      
      return await response.json();
    } catch (error) {
      console.log('Falling back to local trending topics');
      this.fallbackMode = true;
      return this.getFallbackTrending();
    }
  }

  async getSearchAnalytics(): Promise<SearchAnalytics> {
    if (this.fallbackMode) {
      return this.getFallbackAnalytics();
    }

    try {
      const response = await fetch(`${this.baseUrl}/search-analytics`);
      
      if (!response.ok) {
        throw new Error('Failed to get search analytics');
      }
      
      return await response.json();
    } catch (error) {
      console.log('Falling back to local analytics');
      this.fallbackMode = true;
      return this.getFallbackAnalytics();
    }
  }

  async getUserMatches(userId: string): Promise<UserMatch[]> {
    if (this.fallbackMode) {
      return this.getFallbackUserMatches();
    }

    try {
      const response = await fetch(`${this.baseUrl}/user-matches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get user matches');
      }
      
      return await response.json();
    } catch (error) {
      console.log('Falling back to local user matches');
      this.fallbackMode = true;
      return this.getFallbackUserMatches();
    }
  }

  async trackSearch(query: string, resultCount: number): Promise<void> {
    if (this.fallbackMode) {
      console.log(`Tracked search locally: ${query} (${resultCount} results)`);
      return;
    }

    try {
      await fetch(`${this.baseUrl}/track-search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, resultCount, timestamp: new Date().toISOString() })
      });
    } catch (error) {
      console.log('Search tracking failed, continuing offline');
      this.fallbackMode = true;
    }
  }

  private getFallbackSuggestions(query: string): SearchSuggestion[] {
    const suggestions = [
      { query: `${query} users`, type: 'user' as const, relevance: 0.8 },
      { query: `#${query}`, type: 'hashtag' as const, relevance: 0.7 },
      { query: `${query} discussions`, type: 'topic' as const, relevance: 0.6 }
    ];
    
    return suggestions.filter(s => s.query.toLowerCase() !== query.toLowerCase());
  }

  private getFallbackTrending(): TrendingTopic[] {
    return [
      { topic: 'artificial-intelligence', count: 245, growth: 23.5, category: 'technology' },
      { topic: 'design-systems', count: 189, growth: 15.2, category: 'design' },
      { topic: 'remote-work', count: 156, growth: 8.7, category: 'productivity' },
      { topic: 'startup-funding', count: 134, growth: 12.3, category: 'business' },
      { topic: 'machine-learning', count: 198, growth: 18.9, category: 'technology' },
      { topic: 'user-experience', count: 167, growth: 10.4, category: 'design' }
    ];
  }

  private getFallbackRecommendations(limit: number): ContentRecommendation[] {
    const recommendations = [
      { postId: '1', score: 0.95, reason: 'Similar interests in AI', category: 'technology' },
      { postId: '2', score: 0.87, reason: 'Popular in your network', category: 'design' },
      { postId: '3', score: 0.82, reason: 'Trending topic match', category: 'productivity' }
    ];
    
    return recommendations.slice(0, limit);
  }

  private getFallbackUserMatches(): UserMatch[] {
    return [
      { 
        userId: 'alex_dev', 
        similarity: 0.89, 
        commonInterests: ['React', 'TypeScript', 'AI'] 
      },
      { 
        userId: 'sarah_design', 
        similarity: 0.76, 
        commonInterests: ['UX Design', 'Figma', 'Design Systems'] 
      },
      { 
        userId: 'mike_startup', 
        similarity: 0.71, 
        commonInterests: ['Entrepreneurship', 'SaaS', 'Growth'] 
      },
      { 
        userId: 'jenny_ai', 
        similarity: 0.84, 
        commonInterests: ['Machine Learning', 'Python', 'Data Science'] 
      }
    ];
  }

  private getFallbackAnalytics(): SearchAnalytics {
    return {
      totalSearches: 1234,
      topQueries: ['AI', 'React', 'Design', 'Startup'],
      clickThroughRate: 0.67,
      avgSessionTime: 4.2
    };
  }

  // Reset fallback mode (useful for retrying)
  resetConnection(): void {
    this.fallbackMode = false;
  }

  // Check if we're in fallback mode
  isOffline(): boolean {
    return this.fallbackMode;
  }
}

export const aiService = new AIService();
