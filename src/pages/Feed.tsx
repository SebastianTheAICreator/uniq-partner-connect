
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  TrendingUp, 
  Sparkles, 
  Clock, 
  Filter, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  MoreHorizontal,
  Image as ImageIcon,
  FileVideo,
  Link2,
  Smile,
  Send
} from 'lucide-react';
import PremiumFeedCreator from '@/components/feed/PremiumFeedCreator';
import FeedPost from '@/components/feed/FeedPost';
import FeedTrendingPanel from '@/components/feed/FeedTrendingPanel';

const mockConversations = [
  { id: '1', title: 'My first conversation' },
  { id: '2', title: 'Another conversation' },
  { id: '3', title: 'Design discussion' }
];

// Mock post data to display in the feed
const mockPosts = [
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
    isPinned: true
  },
  {
    id: '2',
    content: 'Our latest market analysis shows a significant shift in consumer behavior post-pandemic. We've identified 5 key trends that will shape the industry for the next decade.',
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
    attachments: [{
      type: 'image',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
    }]
  },
  {
    id: '3',
    content: 'Thrilled to announce we've secured $175M in Series C funding to accelerate our global expansion and product development. Grateful to our investors who believe in our vision of transforming how enterprises leverage data.',
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
    isPinned: false
  }
];

const Feed = () => {
  const { toast } = useToast();
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'trending' | 'recent'>('trending');

  const toggleFilter = () => setFilterOpen(prev => !prev);

  const handlePostCreated = (content: string) => {
    toast({
      title: "Post published",
      description: "Your post has been published successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1118] to-[#131620] text-white">
      <Navbar />
      
      <div className="container mx-auto pt-20 px-4 md:px-8 flex">
        <Sidebar conversations={mockConversations} />
        
        <div className="w-full lg:pr-72 pl-0 sm:pl-20 md:pl-24 xl:pl-28">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 space-y-6"
          >
            {/* Feed header */}
            <div className="flex items-center justify-between sticky top-16 z-20 py-4 backdrop-blur-lg bg-[#0F1118]/90 border-b border-white/5">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Your Feed
              </h1>
              
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSortBy('trending')}
                  className={`rounded-lg px-3 ${sortBy === 'trending' ? 'bg-white/10 text-white' : 'text-white/70'}`}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Trending</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSortBy('recent')}
                  className={`rounded-lg px-3 ${sortBy === 'recent' ? 'bg-white/10 text-white' : 'text-white/70'}`}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Recent</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFilter}
                  className="rounded-lg px-3"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Post creator */}
            <PremiumFeedCreator onPostCreated={handlePostCreated} />
            
            <div className="flex gap-6">
              {/* Main feed */}
              <div className="flex-1">
                <ScrollArea className="h-[calc(100vh-14rem)]">
                  <div className="space-y-6 pb-20">
                    <AnimatePresence>
                      {mockPosts.map((post, index) => (
                        <FeedPost
                          key={post.id}
                          post={post}
                          delay={index * 0.1}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              </div>
              
              {/* Trending panel - only visible on desktop */}
              <div className="hidden lg:block w-72 absolute right-8 top-24">
                <FeedTrendingPanel />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
