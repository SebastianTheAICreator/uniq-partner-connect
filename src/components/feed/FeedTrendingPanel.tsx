
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, Users, Hash, ArrowRight, GithubIcon, Award, Flame } from 'lucide-react';

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
      {/* Trending Topics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="overflow-hidden border-gray-800 bg-gray-900/90 backdrop-blur-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center text-gray-300">
              <TrendingUp className="mr-2 h-4 w-4 text-gray-400" />
              Trending Topics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4">
              {trends.map((trend, index) => (
                <div key={index}>
                  <div className="py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <Hash className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                      <span className="text-gray-300 text-sm hover:text-gray-100 transition-colors cursor-pointer">
                        {trend.tag}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {trend.trending && (
                        <div className="mr-2">
                          <Flame className="h-3 w-3 text-gray-400" />
                        </div>
                      )}
                      <span className="text-gray-500 text-xs">{trend.posts.toLocaleString()} posts</span>
                    </div>
                  </div>
                  {index < trends.length - 1 && (
                    <Separator className="bg-gray-800" />
                  )}
                </div>
              ))}
            </div>
            <div className="px-4 pt-2 pb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-between text-gray-400 hover:text-gray-300 text-xs" 
                asChild
              >
                <Link to="/trending-topics">
                  <span>Explore all trending topics</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* People to Follow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="overflow-hidden border-gray-800 backdrop-blur-lg bg-gray-900/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center text-gray-300">
              <Users className="mr-2 h-4 w-4 text-gray-400" />
              People to Follow
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4">
              {trendingUsers.map((user, index) => (
                <div key={index}>
                  <div className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-gray-200 font-semibold text-sm">
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
                        <div className="text-gray-500 text-xs">
                          {user.role}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 rounded-full text-xs border-gray-700 hover:bg-gray-800 hover:border-gray-600 hover:text-gray-300"
                    >
                      Follow
                    </Button>
                  </div>
                  {index < trendingUsers.length - 1 && (
                    <Separator className="bg-gray-800" />
                  )}
                </div>
              ))}
            </div>
            <div className="px-4 pt-2 pb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-between text-gray-400 hover:text-gray-300 text-xs" 
                asChild
              >
                <Link to="/discover-people">
                  <span>Discover more people</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="px-4 py-5 border border-gray-800 backdrop-blur-lg bg-gray-900/90 rounded-lg"
      >
        <div className="flex items-center gap-2 mb-3">
          <Award className="h-4 w-4 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-200">Premium Resources</h3>
        </div>
        
        <p className="text-xs text-gray-400 mb-4">
          Access exclusive reports, analysis tools, and community insights with premium membership.
        </p>
        
        <Button 
          className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-gray-200 border-0" 
          size="sm"
        >
          Upgrade to Premium
        </Button>
      </motion.div>
    </div>
  );
};

export default FeedTrendingPanel;
