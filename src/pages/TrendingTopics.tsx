
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  Search, 
  ArrowLeft, 
  Hash, 
  Flame, 
  ArrowUpRight, 
  Sparkles,
  Users,
  BarChart3,
  Globe,
  BookOpen
} from 'lucide-react';

// Mock data for trending topics
const allTrendingTopics = [
  {
    category: "Technology",
    topics: [
      { tag: 'artificial-intelligence', posts: 4823, trending: true, growth: '+28%' },
      { tag: 'machine-learning', posts: 3241, trending: true, growth: '+15%' },
      { tag: 'blockchain', posts: 2958, trending: false, growth: '+5%' },
      { tag: 'cloud-computing', posts: 2456, trending: true, growth: '+12%' },
      { tag: 'cybersecurity', posts: 2145, trending: true, growth: '+20%' },
      { tag: 'vr-ar', posts: 1876, trending: false, growth: '+3%' },
    ]
  },
  {
    category: "Business",
    topics: [
      { tag: 'startup-funding', posts: 3542, trending: true, growth: '+18%' },
      { tag: 'remote-work', posts: 3187, trending: true, growth: '+22%' },
      { tag: 'digital-marketing', posts: 2654, trending: false, growth: '+7%' },
      { tag: 'e-commerce', posts: 2432, trending: true, growth: '+14%' },
      { tag: 'venture-capital', posts: 1954, trending: false, growth: '+5%' },
      { tag: 'sustainability', posts: 1876, trending: true, growth: '+25%' },
    ]
  },
  {
    category: "Design",
    topics: [
      { tag: 'design-systems', posts: 2876, trending: true, growth: '+17%' },
      { tag: 'ux-research', posts: 2354, trending: false, growth: '+8%' },
      { tag: 'web-animation', posts: 1985, trending: true, growth: '+13%' },
      { tag: 'typography', posts: 1645, trending: false, growth: '+6%' },
      { tag: '3d-design', posts: 1532, trending: true, growth: '+21%' },
      { tag: 'design-thinking', posts: 1432, trending: false, growth: '+9%' },
    ]
  },
  {
    category: "Development",
    topics: [
      { tag: 'react', posts: 4215, trending: true, growth: '+16%' },
      { tag: 'typescript', posts: 3752, trending: true, growth: '+19%' },
      { tag: 'web3', posts: 3265, trending: true, growth: '+24%' },
      { tag: 'serverless', posts: 2543, trending: false, growth: '+10%' },
      { tag: 'microservices', posts: 2132, trending: true, growth: '+12%' },
      { tag: 'api-design', posts: 1876, trending: false, growth: '+7%' },
    ]
  },
];

const mockConversations = [
  { id: '1', title: 'My first conversation' },
  { id: '2', title: 'Another conversation' },
  { id: '3', title: 'Design discussion' }
];

const TrendingTopics = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter topics based on search term
  const filteredTopics = searchTerm
    ? allTrendingTopics.map(category => ({
        ...category,
        topics: category.topics.filter(topic => 
          topic.tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.topics.length > 0)
    : allTrendingTopics;

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
            {/* Header */}
            <div className="flex items-center justify-between sticky top-16 z-20 py-4 backdrop-blur-lg bg-[#0F1118]/90 border-b border-white/5">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate(-1)}
                  className="rounded-full"
                >
                  <ArrowLeft className="h-5 w-5 text-white/70" />
                </Button>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  Trending Topics
                </h1>
              </div>
              
              <div className="relative w-full max-w-[280px]">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
                <Input
                  type="search"
                  placeholder="Search topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9 pl-9 rounded-full bg-white/5 border-white/10 text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                />
              </div>
            </div>
            
            {/* Main content */}
            <div className="space-y-8 pb-20">
              <Card className="border-[#2a2f45]/50 bg-[#1c1f2e]/60 backdrop-blur-lg overflow-hidden">
                <CardHeader className="pb-3 border-b border-white/5">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-blue-400" />
                    Featured Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                    {['artificial-intelligence', 'web3', 'startup-funding'].map((tag, idx) => (
                      <div 
                        key={idx} 
                        className="p-4 border-b md:border-r border-white/5 last:border-r-0 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                            <Hash className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white/90">{tag}</span>
                              <Flame className="h-3.5 w-3.5 text-amber-500" />
                            </div>
                            <p className="text-xs text-white/50">5,000+ posts this week</p>
                          </div>
                        </div>
                        <p className="text-sm text-white/70 mb-3">
                          Discussions about the latest advancements and applications in this rapidly evolving field.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full border-white/10 hover:bg-white/10 text-white/80 hover:text-white text-xs"
                        >
                          Explore Topic
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <ScrollArea className="h-[calc(100vh-22rem)]">
                {filteredTopics.map((category, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="mb-8"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <CategoryIcon category={category.category} />
                      <h2 className="text-lg font-semibold text-white/90">{category.category}</h2>
                    </div>
                    
                    <Card className="border-[#2a2f45]/50 bg-[#1c1f2e]/60 backdrop-blur-lg overflow-hidden">
                      <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                          {category.topics.map((topic, index) => (
                            <div key={index} className="py-3 px-4 hover:bg-white/5 transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                                    <Hash className="h-4 w-4 text-blue-400" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-white/90">{topic.tag}</span>
                                      {topic.trending && (
                                        <Flame className="h-3.5 w-3.5 text-amber-500" />
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-white/50">
                                      <span>{topic.posts.toLocaleString()} posts</span>
                                      <span className="text-emerald-400">{topic.growth}</span>
                                    </div>
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 rounded-full text-xs text-white/70 hover:text-white hover:bg-white/10"
                                >
                                  View
                                  <ArrowUpRight className="ml-1 h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </ScrollArea>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Helper component to render category icons
const CategoryIcon = ({ category }: { category: string }) => {
  switch (category.toLowerCase()) {
    case 'technology':
      return <Sparkles className="h-5 w-5 text-blue-400" />;
    case 'business':
      return <BarChart3 className="h-5 w-5 text-emerald-400" />;
    case 'design':
      return <BookOpen className="h-5 w-5 text-purple-400" />;
    case 'development':
      return <Globe className="h-5 w-5 text-amber-400" />;
    default:
      return <Hash className="h-5 w-5 text-blue-400" />;
  }
};

export default TrendingTopics;
