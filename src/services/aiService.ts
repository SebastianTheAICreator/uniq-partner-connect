
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

  async getSearchSuggestions(query: string): Promise<SearchSuggestion[]> {
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
      console.error('Error getting search suggestions:', error);
      // Fallback to basic suggestions
      return this.getFallbackSuggestions(query);
    }
  }

  async getContentRecommendations(userId: string, limit: number = 10): Promise<ContentRecommendation[]> {
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
      console.error('Error getting content recommendations:', error);
      return [];
    }
  }

  async getTrendingTopics(): Promise<TrendingTopic[]> {
    try {
      const response = await fetch(`${this.baseUrl}/trending-topics`);
      
      if (!response.ok) {
        throw new Error('Failed to get trending topics');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting trending topics:', error);
      return this.getFallbackTrending();
    }
  }

  async getSearchAnalytics(): Promise<SearchAnalytics> {
    try {
      const response = await fetch(`${this.baseUrl}/search-analytics`);
      
      if (!response.ok) {
        throw new Error('Failed to get search analytics');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting search analytics:', error);
      return {
        totalSearches: 0,
        topQueries: [],
        clickThroughRate: 0,
        avgSessionTime: 0
      };
    }
  }

  async getUserMatches(userId: string): Promise<UserMatch[]> {
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
      console.error('Error getting user matches:', error);
      return [];
    }
  }

  async trackSearch(query: string, resultCount: number): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/track-search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, resultCount, timestamp: new Date().toISOString() })
      });
    } catch (error) {
      console.error('Error tracking search:', error);
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
      { topic: 'remote-work', count: 156, growth: 8.7, category: 'productivity' }
    ];
  }
}

export const aiService = new AIService();
