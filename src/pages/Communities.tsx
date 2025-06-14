
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  TrendingUp, 
  Users, 
  Filter,
  Grid,
  List
} from 'lucide-react';
import CommunityCard from '@/components/communities/CommunityCard';
import CreateCommunityModal from '@/components/communities/CreateCommunityModal';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';
import { Community } from '@/types/community';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'AI Enthusiasts',
    description: 'A community for discussing the latest developments in artificial intelligence, machine learning, and related technologies.',
    avatar: '',
    isPrivate: false,
    memberCount: 12567,
    postCount: 1234,
    createdAt: '2024-01-15T00:00:00Z',
    createdBy: 'user1',
    category: 'Technology',
    tags: ['ai', 'machine-learning', 'technology'],
    rules: ['Be respectful', 'No spam', 'Stay on topic'],
    moderators: ['user1', 'user2'],
    settings: {
      allowPosts: true,
      allowComments: true,
      requireApproval: false,
      allowInvites: true,
      autoModerationEnabled: true
    }
  },
  {
    id: '2',
    name: 'Design System Masters',
    description: 'Learn, share, and discuss design systems, UI/UX best practices, and design tools.',
    avatar: '',
    isPrivate: false,
    memberCount: 8943,
    postCount: 892,
    createdAt: '2024-02-01T00:00:00Z',
    createdBy: 'user3',
    category: 'Design',
    tags: ['design', 'ui', 'ux', 'design-systems'],
    rules: ['Share constructive feedback', 'Credit original work', 'No self-promotion'],
    moderators: ['user3'],
    settings: {
      allowPosts: true,
      allowComments: true,
      requireApproval: false,
      allowInvites: true,
      autoModerationEnabled: false
    }
  },
  {
    id: '3',
    name: 'Startup Founders',
    description: 'Private community for startup founders to share experiences, challenges, and opportunities.',
    avatar: '',
    isPrivate: true,
    memberCount: 342,
    postCount: 156,
    createdAt: '2024-01-20T00:00:00Z',
    createdBy: 'user4',
    category: 'Business',
    tags: ['startup', 'entrepreneurship', 'business'],
    rules: ['Verified founders only', 'No pitching', 'Confidentiality respected'],
    moderators: ['user4', 'user5'],
    settings: {
      allowPosts: true,
      allowComments: true,
      requireApproval: true,
      allowInvites: false,
      autoModerationEnabled: true
    }
  }
];

const mockConversations = [
  { id: '1', title: 'My first conversation' },
  { id: '2', title: 'Another conversation' },
  { id: '3', title: 'Design discussion' }
];

const CommunitiesContent = () => {
  const { toast } = useToast();
  const { collapsed, isMobile } = useSidebar();
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');

  const categories = ['all', ...Array.from(new Set(communities.map(c => c.category)))];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCommunityCreated = (newCommunity: Community) => {
    setCommunities(prev => [newCommunity, ...prev]);
  };

  const handleJoinCommunity = (communityId: string) => {
    setCommunities(prev => prev.map(community => 
      community.id === communityId 
        ? { ...community, memberCount: community.memberCount + 1 }
        : community
    ));
    
    toast({
      title: "Joined community!",
      description: "You've successfully joined the community."
    });
  };

  const getMainContentPadding = () => {
    if (isMobile) {
      return 'pl-0';
    }
    return collapsed ? 'pl-16' : 'pl-72';
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100">
      <Navbar />
      
      <div className="container mx-auto pt-20 px-4 md:px-8 flex">
        <Sidebar conversations={mockConversations} />
        
        <div className={`w-full transition-all duration-300 ${getMainContentPadding()}`}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Communities
                </h1>
                <p className="text-gray-400 mt-1">Discover and join communities around your interests</p>
              </div>
              
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Community
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search communities..."
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-blue-600' : 'border-gray-600 text-gray-300'}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-blue-600' : 'border-gray-600 text-gray-300'}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className={`cursor-pointer ${
                      selectedCategory === category
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
                <TabsTrigger value="discover">Discover</TabsTrigger>
                <TabsTrigger value="my-communities">My Communities</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>

              <TabsContent value="discover" className="mt-6">
                {/* Communities Grid/List */}
                {filteredCommunities.length > 0 ? (
                  <div className={
                    viewMode === 'grid' 
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }>
                    {filteredCommunities.map((community, index) => (
                      <CommunityCard
                        key={community.id}
                        community={community}
                        onJoin={() => handleJoinCommunity(community.id)}
                        onClick={() => {
                          // Navigate to community page
                          toast({
                            title: "Coming soon!",
                            description: "Community pages will be available soon."
                          });
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
                    <h3 className="text-lg font-medium text-gray-300 mb-2">No communities found</h3>
                    <p className="text-gray-400 mb-4">Try adjusting your search or create a new community</p>
                    <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Community
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="my-communities" className="mt-6">
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
                  <h3 className="text-lg font-medium text-gray-300 mb-2">No communities yet</h3>
                  <p className="text-gray-400 mb-4">Join or create communities to see them here</p>
                </div>
              </TabsContent>

              <TabsContent value="trending" className="mt-6">
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Trending communities</h3>
                  <p className="text-gray-400 mb-4">Discover what's popular right now</p>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      {/* Create Community Modal */}
      <CreateCommunityModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCommunityCreated={handleCommunityCreated}
      />
    </div>
  );
};

const Communities = () => {
  return (
    <SidebarProvider>
      <CommunitiesContent />
    </SidebarProvider>
  );
};

export default Communities;
