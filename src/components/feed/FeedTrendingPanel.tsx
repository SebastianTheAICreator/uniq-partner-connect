
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Hash, ExternalLink } from 'lucide-react';

const trendingTopics = [
  { name: 'Artificial Intelligence', posts: 2453, category: 'Technology' },
  { name: 'Remote Work', posts: 1872, category: 'Workplace' },
  { name: 'Sustainability', posts: 1245, category: 'Environment' },
  { name: 'Blockchain', posts: 982, category: 'Technology' },
  { name: 'Mental Health', posts: 873, category: 'Health & Wellness' }
];

const trendingCommunities = [
  { name: 'Tech Enthusiasts', members: 12453, category: 'Technology' },
  { name: 'Digital Nomads', members: 8721, category: 'Lifestyle' },
  { name: 'Startup Founders', members: 7654, category: 'Business' }
];

// Function to get category color
const getCategoryColor = (category: string) => {
  const categoryColors: Record<string, string> = {
    'Technology': 'from-blue-500 to-cyan-400',
    'Workplace': 'from-purple-500 to-pink-400',
    'Environment': 'from-green-500 to-emerald-400',
    'Health & Wellness': 'from-red-500 to-pink-400',
    'Lifestyle': 'from-amber-500 to-yellow-400',
    'Business': 'from-indigo-500 to-blue-400'
  };
  
  return categoryColors[category] || 'from-gray-500 to-gray-400';
};

const FeedTrendingPanel = () => {
  return (
    <div className="space-y-6">
      {/* Trending Topics Section with colorful gradients */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-900 border border-gray-700/50 rounded-xl overflow-hidden backdrop-blur-sm"
      >
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Trending Topics
            </h3>
          </div>
        </div>
        
        <div className="divide-y divide-gray-800/50">
          {trendingTopics.map((topic, index) => {
            const colorClass = getCategoryColor(topic.category);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 hover:bg-gray-800/20 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Hash className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-medium text-gray-200">{topic.name}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Badge className={`text-xs px-2 py-0 h-5 bg-gradient-to-r ${colorClass} text-gray-900`}>
                        {topic.category}
                      </Badge>
                      <span className="text-xs text-gray-400 ml-2">{topic.posts.toLocaleString()} posts</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-blue-400 hover:bg-blue-900/20"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      
      {/* Trending Communities Section with colorful elements */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-gray-900 border border-gray-700/50 rounded-xl overflow-hidden"
      >
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            <h3 className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Active Communities
            </h3>
          </div>
        </div>
        
        <div className="divide-y divide-gray-800/50">
          {trendingCommunities.map((community, index) => {
            const colorClass = getCategoryColor(community.category);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-4 hover:bg-gray-800/20 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorClass}`}></div>
                      <span className="font-medium text-gray-200">{community.name}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Badge className={`text-xs px-2 py-0 h-5 bg-gradient-to-r ${colorClass} text-gray-900`}>
                        {community.category}
                      </Badge>
                      <span className="text-xs text-gray-400 ml-2">{community.members.toLocaleString()} members</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-3 py-0 rounded-full text-xs bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-900/20"
                  >
                    Join
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="p-3 border-t border-gray-800/50">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-center text-sm text-purple-400 hover:bg-purple-900/20 hover:text-purple-300"
          >
            Discover More Communities
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedTrendingPanel;
