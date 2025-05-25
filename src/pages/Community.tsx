
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Users, MessageCircle, Heart, Sparkles, Filter, 
  ArrowUpDown, Compass, Award, Star, Tag, ChevronRight,
  Globe, Bell, TrendingUp, Zap, Shield, Link2, 
  ShieldCheck, ChartBar, MapPin, Radio, Plus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import ActionButton from "@/components/ActionButton";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import ConversationList from "@/components/ConversationList";
import CreateCommunityDialog from "@/components/community/CreateCommunityDialog";
import { getAllCommunities, addCommunity, type Community, updateCommunityMemberCount } from "@/db/database";
import { useNotifications } from "@/contexts/NotificationContext";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  const [communities, setCommunities] = useState<Community[]>([]);
  const { addNotification } = useNotifications();
  const [featuredCommunity, setFeaturedCommunity] = useState<Community | null>(null);
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const [viewType, setViewType] = useState<'grid' | 'featured'>('featured');
  const [hoveredCommunity, setHoveredCommunity] = useState<number | null>(null);

  useEffect(() => {
    const loadCommunities = async () => {
      try {
        const savedCommunities = await getAllCommunities();
        if (savedCommunities.length > 0) {
          setCommunities(savedCommunities);
          const sorted = [...savedCommunities].sort((a, b) => (b.memberCount || 0) - (a.memberCount || 0));
          setFeaturedCommunity(sorted[0]);
        }
      } catch (error) {
        console.error('Error loading communities:', error);
        toast({
          title: "Error",
          description: "Failed to load communities. Please try again.",
          variant: "destructive"
        });
      }
    };
    loadCommunities();
  }, [toast]);

  const handleJoinCommunity = async (communityId: number, communityName: string) => {
    try {
      await updateCommunityMemberCount(communityId);
      const updatedCommunities = await getAllCommunities();
      setCommunities(updatedCommunities);
      setSelectedCategory(communityName);
      toast({
        title: "Welcome to the community! 🎉",
        description: `You've joined the ${communityName} community`,
        className: "bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-none shadow-xl"
      });
      addNotification("GROUP_JOIN", "You've joined a new community!", `You are now a member of "${communityName}". Explore conversations and connect with other members.`, {
        groupId: communityId.toString()
      });
    } catch (error) {
      console.error('Error joining community:', error);
      toast({
        title: "Error",
        description: "Could not update member count. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCommunityCreated = async (newCommunity: Omit<Community, 'id' | 'createdAt'>) => {
    try {
      const communityWithDefaults = {
        ...newCommunity,
        memberCount: 0,
        conversationCount: 0,
        maxConversations: 500
      };
      await addCommunity(communityWithDefaults);
      const updatedCommunities = await getAllCommunities();
      setCommunities(updatedCommunities);
      toast({
        title: "Community created successfully! 🎉",
        description: `"${newCommunity.name}" is now live and ready for members.`,
        className: "bg-gradient-to-r from-primary/10 to-accent/10 border-none"
      });
    } catch (error) {
      console.error('Error creating community:', error);
      toast({
        title: "Error",
        description: "Could not create the community. Please try again.",
        variant: "destructive"
      });
    }
  };

  const communityCategories = [
    { name: "Technology", icon: Zap, description: "Explore cutting-edge innovations" },
    { name: "Business", icon: ChartBar, description: "Connect with professionals" },
    { name: "Creative", icon: Sparkles, description: "Share your creative projects" },
    { name: "Science", icon: Globe, description: "Discover scientific advances" },
    { name: "Education", icon: Shield, description: "Learn from experts worldwide" },
    { name: "Lifestyle", icon: Heart, description: "Connect over shared interests" }
  ];

  const filteredCommunities = communities.filter(community => 
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    community.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleCommunityDetails = (id: number | null) => {
    setShowDetails(showDetails === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0C10] via-[#0F1117] to-[#0A0C10] flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        {!selectedCategory ? (
          <div className="overflow-hidden">
            {/* Hero Section */}
            <div className="relative">
              {/* Background elements */}
              <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-10 z-0"></div>
              <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] -z-10"></div>
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[100px] -z-10"></div>
              
              <div className="container mx-auto px-6 py-36 relative z-10">
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 0.8 }} 
                  className="max-w-4xl mx-auto text-center space-y-8"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <Badge 
                      className="px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-md border-none 
                              text-white font-medium rounded-full shadow-md"
                    >
                      <Sparkles className="h-4 w-4 mr-2 text-secondary" />
                      Premium Social Platform
                    </Badge>
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.5, duration: 0.6 }} 
                    className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
                      Where Communities
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-text-shine">
                      Come to Life
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.7, duration: 0.6 }} 
                    className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
                  >
                    Connect with like-minded individuals in exclusive communities powered by next-generation AI, 
                    designed for meaningful interactions and exceptional experiences.
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.9, duration: 0.6 }} 
                    className="flex flex-wrap gap-5 justify-center mt-10"
                  >
                    <CreateCommunityDialog onCommunityCreated={handleCommunityCreated} />
                    
                    <Button
                      className="py-6 px-8 text-white border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 
                              backdrop-blur-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      variant="outline"
                      onClick={() => window.scrollTo({ top: document.getElementById('communities-section')?.offsetTop, behavior: 'smooth' })}
                    >
                      <Compass className="h-5 w-5 mr-2 text-secondary" />
                      Explore Communities
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-1 left-0 right-0 h-20 bg-gradient-to-t from-[#0F1117] to-transparent z-10"></div>
            </div>
            
            {/* Categories Section */}
            <div id="categories-section" className="py-24 bg-[#0F1117]">
              <div className="container mx-auto px-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.6 }} 
                  className="mb-16 text-center"
                >
                  <Badge 
                    className="mb-4 px-3 py-1 bg-gradient-to-r from-primary/20 to-accent/20 border-none"
                  >
                    <Tag className="h-3.5 w-3.5 mr-1.5 text-accent" />
                    <span className="text-white/90">Categories</span>
                  </Badge>
                  <h2 className="text-3xl font-bold text-white mb-4">Discover Your Interest</h2>
                  <p className="text-white/70 max-w-2xl mx-auto">
                    Explore our diverse categories and find communities that align with your passions
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                  {communityCategories.map((category, index) => (
                    <motion.button 
                      key={category.name} 
                      initial={{ opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true }} 
                      transition={{ delay: index * 0.1, duration: 0.5 }} 
                      whileHover={{ y: -5, scale: 1.02 }}
                      className={cn(
                        "relative p-6 rounded-xl transition-all duration-300 h-full overflow-hidden group",
                        "flex flex-col items-center justify-center text-center gap-3",
                        "bg-white/[0.03] backdrop-blur-sm border border-white/[0.05]",
                        "hover:border-primary/20 hover:bg-primary/[0.05]",
                        "hover:shadow-[0_0_30px_rgba(74,144,226,0.2)]",
                        selectedCategory === category.name ? 'ring-2 ring-primary shadow-[0_0_30px_rgba(74,144,226,0.3)]' : ''
                      )}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 
                                     group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-transparent 
                                   flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                        <category.icon className="h-7 w-7 text-primary" />
                      </div>
                      
                      <div className="relative z-10">
                        <h3 className="text-white font-medium text-lg mb-1">{category.name}</h3>
                        <p className="text-white/60 text-sm">{category.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Featured Community Section */}
            {viewType === 'featured' && featuredCommunity && (
              <div className="py-24 bg-gradient-to-b from-[#0F1117] to-[#0A0C10]">
                <div className="container mx-auto px-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }} 
                    className="mb-16 text-center"
                  >
                    <Badge 
                      className="px-3 py-1 bg-gradient-to-r from-primary/20 to-interactive/20 backdrop-blur-md border-none mb-4"
                    >
                      <Award className="h-3.5 w-3.5 mr-1.5 text-interactive" />
                      <span className="text-white/90">Featured</span>
                    </Badge>
                    <h2 className="text-3xl font-bold text-white mb-4">Spotlight Community</h2>
                    <p className="text-white/70 max-w-2xl mx-auto">
                      Our most vibrant and engaging community recommended for you
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.8 }} 
                    className="max-w-4xl mx-auto rounded-2xl overflow-hidden group"
                  >
                    <div className="relative isolate overflow-hidden">
                      {/* Premium glass card effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1117]/95 to-[#0A0C10]/95 backdrop-blur-md z-10"></div>
                      
                      {/* Background image with gradient overlay */}
                      <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80')] 
                                       bg-cover bg-center opacity-20 group-hover:scale-105 group-hover:opacity-30 transition-all duration-700"></div>
                      </div>
                      
                      {/* Card content */}
                      <div className="relative z-20 p-8">
                        <div className="flex flex-col gap-8">
                          {/* Header section */}
                          <div>
                            <Badge 
                              className="mb-4 bg-primary/20 text-primary backdrop-blur-xl rounded-md"
                            >
                              <Star className="h-3.5 w-3.5 mr-1.5 fill-primary" /> Featured
                            </Badge>
                            <h3 className="text-4xl font-bold text-white mb-6 group-hover:text-primary transition-colors duration-300">
                              {featuredCommunity.name}
                            </h3>
                          </div>
                          
                          {/* Stats section */}
                          <div className="flex items-center justify-between flex-wrap gap-6">
                            <div className="flex items-center gap-5">
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 
                                             flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <Users className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <span className="text-white text-lg font-medium">
                                  {featuredCommunity.memberCount.toLocaleString()} active members
                                </span>
                                <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
                                  <MessageCircle className="h-4 w-4" />
                                  <span>
                                    {featuredCommunity.conversationCount.toLocaleString()}/{featuredCommunity.maxConversations.toLocaleString()} conversations
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 flex-wrap">
                              {featuredCommunity.interests.slice(0, 3).map((interest, i) => (
                                <Badge 
                                  key={i} 
                                  className="bg-white/5 hover:bg-white/10 text-white/90 border-none transition-colors px-3 py-1.5"
                                >
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {/* Description */}
                          <p className="text-white/80 text-lg leading-relaxed">
                            A thriving community dedicated to {featuredCommunity.name.toLowerCase()} enthusiasts. 
                            Join us to connect with experts, share insights, and stay at the forefront of innovation.
                          </p>
                          
                          {/* Community highlights */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                            <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center text-center group-hover:bg-primary/10 transition-colors">
                              <Shield className="h-6 w-6 text-primary mb-2" />
                              <span className="text-white font-medium">Moderated</span>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center text-center group-hover:bg-primary/10 transition-colors">
                              <Radio className="h-6 w-6 text-primary mb-2" />
                              <span className="text-white font-medium">Active Daily</span>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center text-center group-hover:bg-primary/10 transition-colors">
                              <Link2 className="h-6 w-6 text-primary mb-2" />
                              <span className="text-white font-medium">Resources</span>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center text-center group-hover:bg-primary/10 transition-colors">
                              <ShieldCheck className="h-6 w-6 text-primary mb-2" />
                              <span className="text-white font-medium">Verified</span>
                            </div>
                          </div>
                          
                          {/* Action buttons */}
                          <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button 
                              onClick={() => handleJoinCommunity(featuredCommunity.id!, featuredCommunity.name)} 
                              className="flex-1 group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90
                                       text-white font-medium rounded-xl py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <Heart className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                              <span>Join Community</span>
                            </Button>
                            
                            <Button 
                              variant="outline"
                              className="flex-1 group bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl py-6
                                       border border-white/10 hover:border-white/20 transition-all duration-300"
                            >
                              <Bell className="h-5 w-5 mr-2" />
                              <span>Follow Updates</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
            
            {/* Communities Grid Section */}
            <div id="communities-section" className="py-24 bg-[#0A0C10]">
              <div className="container mx-auto px-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.6 }} 
                  className="mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-6"
                >
                  <div>
                    <Badge 
                      className="px-3 py-1 bg-gradient-to-r from-primary/20 to-interactive/20 backdrop-blur-md border-none mb-4"
                    >
                      <Globe className="h-3.5 w-3.5 mr-1.5 text-interactive" />
                      <span className="text-white/90">Explore</span>
                    </Badge>
                    <h2 className="text-3xl font-bold text-white mb-2">Browse Communities</h2>
                    <p className="text-white/70 max-w-2xl">
                      Discover communities aligned with your interests and connect with like-minded individuals
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1 min-w-[240px]">
                      <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input
                        type="search"
                        placeholder="Search communities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/5 border-white/10 rounded-lg pl-10 py-6 placeholder:text-white/40 text-white w-full"
                      />
                    </div>
                    
                    <Button 
                      variant="outline"
                      size="icon"
                      className="bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-white rounded-lg p-2 h-12 w-12"
                      onClick={() => setViewType(viewType === 'grid' ? 'featured' : 'grid')}
                    >
                      <ArrowUpDown className="h-5 w-5" />
                    </Button>
                    
                    <Button 
                      variant="outline"
                      size="icon"
                      className="bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-white rounded-lg p-2 h-12 w-12"
                    >
                      <Filter className="h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
                
                <AnimatePresence>
                  {filteredCommunities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredCommunities.map((community, index) => (
                        <motion.div 
                          key={community.id} 
                          initial={{ opacity: 0, y: 20 }} 
                          whileInView={{ opacity: 1, y: 0 }} 
                          viewport={{ once: true }} 
                          transition={{ delay: index * 0.05, duration: 0.5 }}
                          whileHover={{ y: -5 }}
                          onHoverStart={() => setHoveredCommunity(community.id!)}
                          onHoverEnd={() => setHoveredCommunity(null)}
                          className="group"
                        >
                          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0F1117]/90 to-[#0A0C10]/90 
                                        border border-white/5 hover:border-primary/30 
                                        transition-all duration-500 h-full">
                            
                            {/* Background glow effect on hover */}
                            <div className={cn(
                              "absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 -z-10",
                              hoveredCommunity === community.id && "opacity-100"
                            )}></div>
                            
                            <div className="p-7 space-y-6 relative z-10">
                              {/* Header with icon and badge */}
                              <div className="flex items-center justify-between">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/10 to-transparent
                                             flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                  <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                
                                {community.memberCount > 100 && (
                                  <Badge className="bg-gradient-to-r from-primary/10 to-interactive/10 text-white/90 border-none">
                                    <TrendingUp className="h-3 w-3 mr-1 text-interactive" /> Popular
                                  </Badge>
                                )}
                              </div>
                              
                              {/* Community details */}
                              <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                                  {community.name}
                                </h3>
                                
                                <div className="flex items-center space-x-4 text-white/60 text-sm">
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-1.5 text-primary/80" />
                                    <span>{community.memberCount.toLocaleString()}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <MessageCircle className="h-4 w-4 mr-1.5 text-primary/80" />
                                    <span>{community.conversationCount}/{community.maxConversations}</span>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                  {community.interests.map((interest, i) => (
                                    <span 
                                      key={i} 
                                      className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/70 hover:bg-primary/10 hover:text-white transition-colors"
                                    >
                                      {interest}
                                    </span>
                                  ))}
                                </div>
                                
                                <motion.button 
                                  whileHover={{ scale: 1.05 }} 
                                  whileTap={{ scale: 0.95 }} 
                                  className="text-white/60 text-sm flex items-center group-hover:text-primary transition-colors" 
                                  onClick={() => toggleCommunityDetails(community.id!)}
                                >
                                  {showDetails === community.id ? 'Hide details' : 'Show details'}
                                  <ChevronRight className={cn(
                                    "h-3.5 w-3.5 ml-1.5 transition-transform",
                                    showDetails === community.id && "rotate-90"
                                  )} />
                                </motion.button>
                              </div>
                              
                              {/* Expandable details section */}
                              <AnimatePresence>
                                {showDetails === community.id && (
                                  <motion.div 
                                    initial={{ opacity: 0, height: 0 }} 
                                    animate={{ opacity: 1, height: 'auto' }} 
                                    exit={{ opacity: 0, height: 0 }} 
                                    className="overflow-hidden"
                                  >
                                    <p className="text-white/70 text-sm leading-relaxed my-4">
                                      A community dedicated to {community.name.toLowerCase()}. 
                                      Join us to connect, share knowledge, and grow together with like-minded individuals.
                                    </p>
                                    
                                    <div className="grid grid-cols-2 gap-3 text-sm text-white/60 mb-4">
                                      <div className="flex items-center">
                                        <Shield className="h-4 w-4 mr-2 text-primary" />
                                        <span>Moderated</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Zap className="h-4 w-4 mr-2 text-primary" />
                                        <span>Free to join</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Link2 className="h-4 w-4 mr-2 text-primary" />
                                        <span>Public access</span>
                                      </div>
                                      <div className="flex items-center">
                                        <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                                        <span>Safe space</span>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                              
                              {/* Join button */}
                              <Button 
                                onClick={() => handleJoinCommunity(community.id!, community.name)} 
                                className="w-full group flex items-center justify-center space-x-2 
                                         bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90
                                         text-white font-medium rounded-lg py-5 
                                         shadow-md hover:shadow-xl transition-all duration-300"
                              >
                                <Plus className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                <span>Join Community</span>
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="text-center py-20 bg-white/[0.02] rounded-xl border border-white/5"
                    >
                      <Search className="h-12 w-12 text-white/20 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-white/80 mb-2">No communities found</h3>
                      <p className="text-white/50 max-w-md mx-auto">
                        {searchTerm 
                          ? `No communities match "${searchTerm}". Try different keywords or create a new community.`
                          : "No communities available. Be the first to create one!"}
                      </p>
                      
                      <div className="mt-8">
                        <CreateCommunityDialog onCommunityCreated={handleCommunityCreated} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="py-24 bg-gradient-to-t from-[#0F1117] to-[#0A0C10]">
              <div className="container mx-auto px-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.6 }} 
                  className="max-w-5xl mx-auto"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="relative overflow-hidden rounded-xl p-8 text-center bg-white/[0.02] backdrop-blur-sm
                                  border border-white/5 hover:border-primary/20 hover:bg-primary/[0.02]
                                  transition-all duration-500 hover:-translate-y-1 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 
                                     group-hover:opacity-100 transition-opacity duration-500"></div>
                      <ChartBar className="h-10 w-10 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
                      <h3 className="text-4xl font-bold text-white mb-2">{communities.length}</h3>
                      <p className="text-white/60 text-lg">Communities</p>
                    </div>
                    
                    <div className="relative overflow-hidden rounded-xl p-8 text-center bg-white/[0.02] backdrop-blur-sm
                                  border border-white/5 hover:border-secondary/20 hover:bg-secondary/[0.02]
                                  transition-all duration-500 hover:-translate-y-1 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 
                                     group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Users className="h-10 w-10 text-secondary mx-auto mb-6 group-hover:scale-110 transition-transform" />
                      <h3 className="text-4xl font-bold text-white mb-2">
                        {communities.reduce((acc, community) => acc + (community.memberCount || 0), 0).toLocaleString()}
                      </h3>
                      <p className="text-white/60 text-lg">Members</p>
                    </div>
                    
                    <div className="relative overflow-hidden rounded-xl p-8 text-center bg-white/[0.02] backdrop-blur-sm
                                  border border-white/5 hover:border-accent/20 hover:bg-accent/[0.02]
                                  transition-all duration-500 hover:-translate-y-1 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 
                                     group-hover:opacity-100 transition-opacity duration-500"></div>
                      <MessageCircle className="h-10 w-10 text-accent mx-auto mb-6 group-hover:scale-110 transition-transform" />
                      <h3 className="text-4xl font-bold text-white mb-2">
                        {communities.reduce((acc, community) => acc + (community.conversationCount || 0), 0).toLocaleString()}
                      </h3>
                      <p className="text-white/60 text-lg">Conversations</p>
                    </div>
                    
                    <div className="relative overflow-hidden rounded-xl p-8 text-center bg-white/[0.02] backdrop-blur-sm
                                  border border-white/5 hover:border-interactive/20 hover:bg-interactive/[0.02]
                                  transition-all duration-500 hover:-translate-y-1 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-interactive/5 to-transparent opacity-0 
                                     group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Tag className="h-10 w-10 text-interactive mx-auto mb-6 group-hover:scale-110 transition-transform" />
                      <h3 className="text-4xl font-bold text-white mb-2">
                        {communities.reduce((acc, community) => acc + (community.interests?.length || 0), 0)}
                      </h3>
                      <p className="text-white/60 text-lg">Interest Tags</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          <ConversationList />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CommunityPage;
