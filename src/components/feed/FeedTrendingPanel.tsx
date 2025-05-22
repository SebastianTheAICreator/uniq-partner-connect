
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Hash, ArrowRight, Award, Flame, Star, Sparkles } from 'lucide-react';

const trends = [
  { tag: 'artificial-intelligence', posts: 1423, trending: true },
  { tag: 'web3', posts: 845, trending: true },
  { tag: 'startup-funding', posts: 623, trending: false },
  { tag: 'remote-work', posts: 578, trending: true },
  { tag: 'design-systems', posts: 412, trending: false }
];

const trendingUsers = [
  { name: 'Julia Chen', role: 'AI Research Lead', avatar: '', followers: 12400 },
  { name: 'Michael Lee', role: 'VC Partner', avatar: '', followers: 9580 },
  { name: 'Sarah Johnson', role: 'Product Designer', avatar: '', followers: 7230 }
];

const FeedTrendingPanel = () => {
  return (
    <div className="space-y-6">
      {/* Trending Topics - Minimalist card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="border-gray-800 bg-gray-900 overflow-hidden">
          <CardHeader className="pb-2 border-b border-gray-800/50">
            <CardTitle className="text-sm flex items-center text-gray-300">
              <TrendingUp className="mr-2 h-4 w-4 text-gray-400" />
              Trending Topics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-800/50">
              {trends.map((trend, index) => (
                <div key={index} className="px-4 py-3 hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Hash className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                      <span className="text-gray-300 text-sm hover:text-gray-100 transition-colors cursor-pointer">
                        {trend.tag}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {trend.trending && (
                        <Badge className="h-5 px-2 mr-2 bg-gray-800 hover:bg-gray-700 text-gray-300 border-0">
                          <Flame className="h-3 w-3 mr-1 text-gray-300" />
                          Trending
                        </Badge>
                      )}
                      <span className="text-gray-500 text-xs">{trend.posts.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 bg-gray-900">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between text-gray-400 hover:text-gray-300 text-xs border border-gray-800 hover:bg-gray-800 rounded-lg" 
              asChild
            >
              <Link to="/trending-topics">
                <span>Explore all trending topics</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* People to Follow - Sleek card design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="border-gray-800 bg-gray-900 overflow-hidden">
          <CardHeader className="pb-2 border-b border-gray-800/50">
            <CardTitle className="text-sm flex items-center text-gray-300">
              <Users className="mr-2 h-4 w-4 text-gray-400" />
              People to Follow
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-800/50">
              {trendingUsers.map((user, index) => (
                <div key={index} className="px-4 py-3 hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-200 ring-2 ring-gray-700">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="h-full w-full object-cover rounded-full" 
                          />
                        ) : (
                          user.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="text-gray-200 text-sm font-medium leading-tight">
                          {user.name}
                        </div>
                        <div className="text-gray-500 text-xs flex items-center">
                          {user.role}
                          <span className="mx-1">•</span>
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {(user.followers / 1000).toFixed(1)}k
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 rounded-lg text-xs border-gray-700 hover:bg-gray-800 hover:border-gray-600 hover:text-gray-300"
                    >
                      Follow
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 bg-gray-900">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between text-gray-400 hover:text-gray-300 text-xs border border-gray-800 hover:bg-gray-800 rounded-lg" 
              asChild
            >
              <Link to="/discover-people">
                <span>Discover more people</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Premium - Modern minimal card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="border-gray-800 bg-gray-900 overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-800 p-2 rounded-lg">
                <Sparkles className="h-5 w-5 text-gray-300" />
              </div>
              <h3 className="text-base font-medium text-gray-200">Premium Access</h3>
            </div>
            
            <p className="text-sm text-gray-400 mb-5">
              Unlock exclusive content, advanced tools, and premium features with our membership.
            </p>
            
            <div className="flex gap-2 items-center mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-gray-300 fill-gray-300" />
              ))}
              <span className="text-xs text-gray-400 ml-1">5.0 (2.3k reviews)</span>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Monthly Plan</span>
                <Badge className="bg-gray-700 text-gray-300">Popular</Badge>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-200">$9.99</span>
                <span className="text-xs text-gray-400">/month</span>
              </div>
            </div>
            
            <Button 
              className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200"
            >
              Upgrade Now
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FeedTrendingPanel;
