import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ShareEvent {
  topicId: string;
  platform: string;
  timestamp: Date;
  success: boolean;
}

interface ShareAnalytics {
  totalShares: number;
  platformBreakdown: Record<string, number>;
  recentShares: ShareEvent[];
}

export const useShareAnalytics = () => {
  const [analytics, setAnalytics] = useState<ShareAnalytics>({
    totalShares: 0,
    platformBreakdown: {},
    recentShares: []
  });
  const { toast } = useToast();

  const trackShare = useCallback((topicId: string, platform: string, success: boolean = true) => {
    const shareEvent: ShareEvent = {
      topicId,
      platform,
      timestamp: new Date(),
      success
    };

    setAnalytics(prev => {
      const newAnalytics = {
        totalShares: success ? prev.totalShares + 1 : prev.totalShares,
        platformBreakdown: {
          ...prev.platformBreakdown,
          [platform]: (prev.platformBreakdown[platform] || 0) + (success ? 1 : 0)
        },
        recentShares: [shareEvent, ...prev.recentShares.slice(0, 49)] // Keep last 50
      };

      // Store in localStorage for persistence
      localStorage.setItem('shareAnalytics', JSON.stringify(newAnalytics));
      
      return newAnalytics;
    });

    if (success) {
      // Show success feedback
      const platformNames: Record<string, string> = {
        facebook: 'Facebook',
        twitter: 'Twitter',
        whatsapp: 'WhatsApp',
        telegram: 'Telegram',
        email: 'Email',
        clipboard: 'Clipboard',
        native: 'Sistem'
      };

      toast({
        title: "Partajat cu succes!",
        description: `Topicul a fost partajat pe ${platformNames[platform] || platform}.`,
      });
    }

    // Simulate analytics API call
    console.log('Share Analytics:', {
      event: 'topic_shared',
      topicId,
      platform,
      success,
      timestamp: shareEvent.timestamp.toISOString()
    });

  }, [toast]);

  const getTopicShares = useCallback((topicId: string): number => {
    return analytics.recentShares
      .filter(share => share.topicId === topicId && share.success)
      .length;
  }, [analytics.recentShares]);

  const getMostSharedPlatform = useCallback((): string | null => {
    const platforms = Object.entries(analytics.platformBreakdown);
    if (platforms.length === 0) return null;
    
    return platforms.reduce((max, current) => 
      current[1] > max[1] ? current : max
    )[0];
  }, [analytics.platformBreakdown]);

  // Load analytics from localStorage on mount
  const loadAnalytics = useCallback(() => {
    try {
      const stored = localStorage.getItem('shareAnalytics');
      if (stored) {
        const parsedAnalytics = JSON.parse(stored);
        setAnalytics({
          ...parsedAnalytics,
          recentShares: parsedAnalytics.recentShares.map((share: any) => ({
            ...share,
            timestamp: new Date(share.timestamp)
          }))
        });
      }
    } catch (error) {
      console.error('Failed to load share analytics:', error);
    }
  }, []);

  return {
    analytics,
    trackShare,
    getTopicShares,
    getMostSharedPlatform,
    loadAnalytics
  };
};