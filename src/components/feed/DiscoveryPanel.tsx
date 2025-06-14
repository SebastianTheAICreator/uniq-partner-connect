
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, 
  Users, 
  Hash, 
  ArrowRight, 
  Sparkles,
  Brain,
  Target,
  Refresh
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { aiService, TrendingTopic, UserMatch } from '@/services/aiService';

interface DiscoveryPanelProps {
  className?: string;
}

const DiscoveryPanel = ({ className }: DiscoveryPanelProps) => {
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [userMatches, setUserMatches] = useState<UserMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'trending' | 'people' | 'topics'>('trending');

  const fetchDiscoveryData = async () => {
    setIsLoading(true);
    try {
      const [trending, matches] = await Promise.all([
        aiService.getTrendingTopics(),
        aiService.getUserMatches('current-user')
      ]);
      
      setTrendingTopics(trending);
      setUserMatches(matches);
    } catch (error) {
      console.error('Error fetching discovery data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscoveryData();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors = {
      technology: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      design: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      productivity: 'bg-green-500/20 text-green-300 border-green-500/30',
      business: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      science: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  return (
    <Card className={cn("bg-gray-900/50 border-gray-700/50 overflow-hidden", className)}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Discover</h3>
          </div>
          <Button
            onClick={fetchDiscoveryData}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-gray-200"
            disabled={isLoading}
          >
            <Refresh className={cn("h-4 w-4", isLoading && "animate-spin")} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 bg-gray-800/50 rounded-lg p-1">
          {[
            { key: 'trending', label: 'Trending', icon: TrendingUp },
            { key: 'people', label: 'People', icon: Users },
            { key: 'topics', label: 'Topics', icon: Hash }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors",
                activeTab === key
                  ? "bg-blue-500/20 text-blue-300"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/30"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'trending' && (
            <motion.div
              key="trending"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic.topic}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group p-3 rounded-lg border border-gray-700/30 hover:border-gray-600/50 hover:bg-gray-800/30 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Hash className="h-4 w-4 text-blue-400" />
                          <span className="font-medium text-white">{topic.topic}</span>
                          <Badge 
                            variant="outline" 
                            className={getCategoryColor(topic.category)}
                          >
                            {topic.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{topic.count} posts</span>
                          <span className="flex items-center gap-1 text-green-400">
                            <TrendingUp className="h-3 w-3" />
                            +{topic.growth}%
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-200 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <Separator className="bg-gray-700/50" />

              <Button variant="outline" className="w-full border-gray-600/50 text-gray-300 hover:bg-gray-800/50">
                <Brain className="h-4 w-4 mr-2" />
                View All Trending
              </Button>
            </motion.div>
          )}

          {activeTab === 'people' && (
            <motion.div
              key="people"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="space-y-3">
                {userMatches.length > 0 ? (
                  userMatches.map((match, index) => (
                    <motion.div
                      key={match.userId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group p-3 rounded-lg border border-gray-700/30 hover:border-gray-600/50 hover:bg-gray-800/30 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {match.userId[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-white">User {match.userId}</div>
                            <div className="text-sm text-gray-400">
                              {Math.round(match.similarity * 100)}% match
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                          Follow
                        </Button>
                      </div>
                      {match.commonInterests.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {match.commonInterests.slice(0, 3).map((interest) => (
                            <Badge
                              key={interest}
                              variant="outline"
                              className="text-xs bg-gray-800/50 border-gray-600/50"
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No user recommendations available</p>
                  </div>
                )}
              </div>

              <Separator className="bg-gray-700/50" />

              <Button variant="outline" className="w-full border-gray-600/50 text-gray-300 hover:bg-gray-800/50">
                <Target className="h-4 w-4 mr-2" />
                Find More People
              </Button>
            </motion.div>
          )}

          {activeTab === 'topics' && (
            <motion.div
              key="topics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                {['AI', 'Design', 'Startup', 'Tech', 'UX', 'Code'].map((topic, index) => (
                  <motion.button
                    key={topic}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg border border-gray-700/30 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200 text-left"
                  >
                    <div className="font-medium text-white">#{topic}</div>
                    <div className="text-sm text-gray-400">{Math.floor(Math.random() * 100) + 20} posts</div>
                  </motion.button>
                ))}
              </div>

              <Separator className="bg-gray-700/50" />

              <Button variant="outline" className="w-full border-gray-600/50 text-gray-300 hover:bg-gray-800/50">
                <Hash className="h-4 w-4 mr-2" />
                Explore All Topics
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default DiscoveryPanel;
