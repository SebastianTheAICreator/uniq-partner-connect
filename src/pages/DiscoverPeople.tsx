
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Search, 
  Award, 
  TrendingUp, 
  Filter, 
  Sparkles,
  BadgeCheck,
  Zap,
  MessageSquare,
  UserPlus,
  UserCircle,
  Briefcase,
  Globe,
  GithubIcon
} from 'lucide-react';

// Mock conversations for sidebar
const mockConversations = [
  { id: '1', title: 'My first conversation' },
  { id: '2', title: 'Another conversation' },
  { id: '3', title: 'Design discussion' }
];

// Mock people data
const peopleSuggestions = [
  {
    id: '1',
    name: 'Julia Chen',
    role: 'AI Research Lead',
    avatar: '',
    followers: 12400,
    following: 345,
    posts: 89,
    company: 'OpenAI',
    location: 'San Francisco',
    verified: true,
    popular: true
  },
  {
    id: '2',
    name: 'Michael Lee',
    role: 'VC Partner',
    avatar: '',
    followers: 9580,
    following: 421,
    posts: 124,
    company: 'Sequoia Capital',
    location: 'New York',
    verified: true,
    popular: true
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    role: 'Product Designer',
    avatar: '',
    followers: 7230,
    following: 560,
    posts: 215,
    company: 'Figma',
    location: 'London',
    verified: true,
    popular: false
  },
  {
    id: '4',
    name: 'David Rodriguez',
    role: 'Chief Technology Officer',
    avatar: '',
    followers: 15730,
    following: 123,
    posts: 76,
    company: 'Meta',
    location: 'Seattle',
    verified: true,
    popular: true
  },
  {
    id: '5',
    name: 'Emily Wong',
    role: 'Senior Data Scientist',
    avatar: '',
    followers: 5640,
    following: 342,
    posts: 98,
    company: 'Google',
    location: 'Mountain View',
    verified: false,
    popular: false
  },
  {
    id: '6',
    name: 'Raj Patel',
    role: 'Blockchain Developer',
    avatar: '',
    followers: 8320,
    following: 213,
    posts: 67,
    company: 'Ethereum Foundation',
    location: 'Berlin',
    verified: true,
    popular: false
  },
  {
    id: '7',
    name: 'Olivia Martinez',
    role: 'UX Researcher',
    avatar: '',
    followers: 4250,
    following: 398,
    posts: 112,
    company: 'Apple',
    location: 'Cupertino',
    verified: false,
    popular: false
  },
  {
    id: '8',
    name: 'Alex Turner',
    role: 'Growth Marketer',
    avatar: '',
    followers: 6870,
    following: 501,
    posts: 187,
    company: 'HubSpot',
    location: 'Boston',
    verified: false,
    popular: true
  }
];

// Categories for filtering
const categories = [
  { id: 'tech', name: 'Technology' },
  { id: 'design', name: 'Design' },
  { id: 'business', name: 'Business' },
  { id: 'science', name: 'Science' },
  { id: 'health', name: 'Health' },
  { id: 'finance', name: 'Finance' }
];

const DiscoverPeople = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterPopular, setFilterPopular] = useState(false);

  // Filtered people based on search and filters
  const filteredPeople = peopleSuggestions.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesVerified = filterVerified ? person.verified : true;
    const matchesPopular = filterPopular ? person.popular : true;
    
    return matchesSearch && matchesVerified && matchesPopular;
  });

  const handleFollow = (personId: string) => {
    toast({
      title: "Following",
      description: "You are now following this person",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1118] to-[#131620] text-white">
      <Navbar />
      
      <div className="container mx-auto pt-20 px-4 md:px-8 flex">
        <Sidebar conversations={mockConversations} />
        
        <div className="w-full lg:pr-6 pl-0 sm:pl-20 md:pl-24 xl:pl-28">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 space-y-6"
          >
            {/* Page header */}
            <div className="flex flex-col gap-4 sticky top-16 z-20 py-4 backdrop-blur-lg bg-[#0F1118]/90 border-b border-white/5">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  Discover People
                </h1>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="premium-ghost"
                    size="sm"
                    onClick={() => setFilterVerified(!filterVerified)}
                    className={`rounded-lg px-3 ${filterVerified ? 'bg-blue-500/20 border-blue-500/50' : ''}`}
                  >
                    <BadgeCheck className="mr-2 h-4 w-4 text-blue-400" />
                    <span className="hidden sm:inline">Verified</span>
                  </Button>
                  
                  <Button
                    variant="premium-ghost"
                    size="sm"
                    onClick={() => setFilterPopular(!filterPopular)}
                    className={`rounded-lg px-3 ${filterPopular ? 'bg-amber-500/20 border-amber-500/50' : ''}`}
                  >
                    <TrendingUp className="mr-2 h-4 w-4 text-amber-400" />
                    <span className="hidden sm:inline">Popular</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-lg px-3"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input 
                  type="text"
                  placeholder="Search people by name, role, or company..."
                  className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-blue-500/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Main content with two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left column - filters */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  {/* Categories */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <Card className="overflow-hidden border-[#2a2f45]/50 bg-[#1c1f2e]/60 backdrop-blur-lg">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center text-white/90">
                          <Globe className="mr-2 h-4 w-4 text-blue-400" />
                          Categories
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="px-4 py-2">
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`rounded-full text-xs h-7 px-3 ${activeCategory === null ? 'bg-blue-500/20 text-blue-300' : 'text-white/70'}`}
                              onClick={() => setActiveCategory(null)}
                            >
                              All
                            </Button>
                            {categories.map((category) => (
                              <Button
                                key={category.id}
                                variant="ghost"
                                size="sm"
                                className={`rounded-full text-xs h-7 px-3 ${activeCategory === category.id ? 'bg-blue-500/20 text-blue-300' : 'text-white/70'}`}
                                onClick={() => setActiveCategory(category.id)}
                              >
                                {category.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                
                  {/* Pro Membership */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="px-4 py-5 rounded-xl border border-[#2a2f45]/50 bg-[#1c1f2e]/60 backdrop-blur-lg"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="h-4 w-4 text-amber-400" />
                      <h3 className="text-sm font-medium text-white/90">Pro Membership</h3>
                    </div>
                    
                    <p className="text-xs text-white/70 mb-4">
                      Connect with unlimited professionals and expand your network with premium features.
                    </p>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0"
                      size="sm"
                    >
                      Upgrade to Pro
                    </Button>
                  </motion.div>
                </div>
              </div>
              
              {/* Right column - people grid */}
              <div className="lg:col-span-3">
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-20">
                    {filteredPeople.map((person, index) => (
                      <motion.div
                        key={person.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="overflow-hidden border-[#2a2f45]/50 bg-[#1c1f2e]/80 backdrop-blur-lg hover:bg-[#1c1f2e]/95 transition-all duration-300">
                          <CardContent className="p-5">
                            <div className="flex flex-col items-center text-center">
                              <div className="relative">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xl mb-3">
                                  {person.avatar ? (
                                    <img 
                                      src={person.avatar} 
                                      alt={person.name} 
                                      className="h-full w-full object-cover rounded-full"
                                    />
                                  ) : (
                                    person.name.charAt(0)
                                  )}
                                </div>
                                {person.verified && (
                                  <div className="absolute bottom-2 right-0 bg-blue-500 rounded-full p-0.5">
                                    <BadgeCheck className="h-3.5 w-3.5 text-white" />
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-center space-x-1 mb-1">
                                <h3 className="font-semibold text-white">{person.name}</h3>
                                {person.popular && (
                                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                                )}
                              </div>
                              
                              <p className="text-white/60 text-sm">{person.role}</p>
                              <p className="text-white/60 text-xs mb-3">{person.company} · {person.location}</p>
                              
                              <div className="flex justify-between w-full mb-4 text-xs">
                                <div className="text-center">
                                  <p className="font-semibold text-white">{person.posts}</p>
                                  <p className="text-white/60">Posts</p>
                                </div>
                                <div className="text-center">
                                  <p className="font-semibold text-white">{person.followers.toLocaleString()}</p>
                                  <p className="text-white/60">Followers</p>
                                </div>
                                <div className="text-center">
                                  <p className="font-semibold text-white">{person.following.toLocaleString()}</p>
                                  <p className="text-white/60">Following</p>
                                </div>
                              </div>
                              
                              <div className="flex w-full space-x-2">
                                <Button
                                  variant="premium-ghost"
                                  size="sm"
                                  className="flex-1 h-8"
                                >
                                  <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                                  Message
                                </Button>
                                <Button
                                  variant="aurora"
                                  size="sm"
                                  className="flex-1 h-8"
                                  onClick={() => handleFollow(person.id)}
                                >
                                  <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPeople;
