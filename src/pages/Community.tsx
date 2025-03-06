import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Users, MessageCircle, Heart, Shield, TrendingUp, Zap, 
  Link2, ShieldCheck, ChartBar, DollarSign, Globe, Bell, Filter, 
  ArrowUpDown, Mic, Brain, Video, Building2, Sparkles, Compass, 
  Award, Radio, BookOpen, MapPin, Star, Tag, Briefcase 
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

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const {
    toast
  } = useToast();
  const [communities, setCommunities] = useState<Community[]>([]);
  const {
    addNotification
  } = useNotifications();
  const [featuredCommunity, setFeaturedCommunity] = useState<Community | null>(null);
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const [viewType, setViewType] = useState<'grid' | 'featured'>('featured');

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
          title: "Eroare",
          description: "Nu am putut încărca comunitățile. Te rugăm să încerci din nou.",
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
        description: `Te-ai alăturat comunității: ${communityName}`,
        className: "bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-blue-500/20 border-none shadow-xl"
      });
      addNotification("GROUP_JOIN", "Te-ai alăturat unei noi comunități!", `Ai devenit membru în comunitatea "${communityName}". Explorează conversațiile și conectează-te cu alți membri.`, {
        groupId: communityId.toString()
      });
    } catch (error) {
      console.error('Error joining community:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut actualiza numărul de membri. Te rugăm să încerci din nou.",
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
        className: "bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border-none"
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

  const communityCategories = [{
    name: "Gaming",
    icon: Video,
    description: "Connect with gamers worldwide"
  }, {
    name: "Business",
    icon: Briefcase,
    description: "Network with professionals"
  }, {
    name: "Creative",
    icon: Brain,
    description: "Share your creative projects"
  }, {
    name: "Tech",
    icon: Zap,
    description: "Discuss the latest innovations"
  }, {
    name: "Education",
    icon: BookOpen,
    description: "Learn together with experts"
  }, {
    name: "Travel",
    icon: Compass,
    description: "Explore destinations worldwide"
  }];

  const filteredCommunities = communities.filter(community => community.name.toLowerCase().includes(searchTerm.toLowerCase()) || community.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase())));

  const toggleCommunityDetails = (id: number | null) => {
    setShowDetails(showDetails === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#151822] via-[#1A1F2C] to-[#151822] flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        {!selectedCategory ? (
          <div className="bg-gradient-to-br from-[#151822] via-[#1A1F2C] to-[#151822]">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 z-0"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536152470836-b943b246224c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 z-0"></div>
              
              <div className="container mx-auto px-6 py-36 relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} 
                  className="max-w-4xl mx-auto text-center space-y-8"
                >
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.3, duration: 0.8 }} 
                    className="inline-block"
                  >
                    <Badge variant="outline" className="px-4 py-1.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md border-none mb-4 font-medium text-white/90">
                      <Sparkles className="h-4 w-4 mr-2" />
                      <span>Platformă Social Premium</span>
                    </Badge>
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.5, duration: 0.8 }} 
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                      Unified Social Platform
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.7, duration: 0.8 }} 
                    className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
                  >
                    Conectează-te cu comunități exclusive într-o experiență socială unificată, redefinită cu inteligență artificială de ultimă generație
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.9, duration: 0.8 }} 
                    className="mt-10 flex gap-5 justify-center flex-wrap"
                  >
                    <CreateCommunityDialog onCommunityCreated={handleCommunityCreated} />
                    
                    <ActionButton 
                      variant="secondary" 
                      className="py-4 px-7 text-white bg-white/5 hover:bg-white/10 backdrop-blur-lg border border-white/5 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl"
                    >
                      <Compass className="h-5 w-5 mr-2" />
                      Explorează Comunitățile
                    </ActionButton>
                  </motion.div>
                </motion.div>
              </div>
            </div>
            
            <div className="py-20 bg-[#1A1F2C]/90 backdrop-blur-2xl border-y border-white/5">
              <div className="container mx-auto px-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.8 }}
                >
                  <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-6 items-stretch">
                      <div className="flex-1 relative rounded-2xl overflow-hidden hover:shadow-[0_0_35px_rgba(124,58,237,0.15)] transition-all duration-500 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <Input 
                          type="search" 
                          placeholder="Caută comunități după interese, tematici sau pasiuni..." 
                          className="w-full pl-14 py-7 text-lg bg-[#151822]/80 border border-white/5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/30"
                          value={searchTerm} 
                          onChange={e => setSearchTerm(e.target.value)} 
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400 h-6 w-6" />
                      </div>
                      
                      <div className="flex gap-2 items-center">
                        <ActionButton 
                          variant="primary" 
                          className="p-4 bg-[#151822]/80 hover:bg-[#151822] rounded-xl transition-colors h-full aspect-square flex items-center justify-center border border-white/5"
                          onClick={() => setViewType(viewType === 'grid' ? 'featured' : 'grid')}
                        >
                          <ArrowUpDown className="h-5 w-5 text-purple-400" />
                        </ActionButton>
                        
                        <ActionButton 
                          variant="primary" 
                          className="p-4 bg-[#151822]/80 hover:bg-[#151822] rounded-xl transition-colors h-full aspect-square flex items-center justify-center border border-white/5"
                        >
                          <Filter className="h-5 w-5 text-purple-400" />
                        </ActionButton>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="py-20 bg-gradient-to-br from-[#151822] via-[#1A1F2C] to-[#151822]">
              <div className="container mx-auto px-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.6 }} 
                  className="mb-16 text-center"
                >
                  <Badge 
                    variant="outline" 
                    className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-md border-none mb-4"
                  >
                    <Tag className="h-3.5 w-3.5 mr-1.5" />
                    <span>Categories</span>
                  </Badge>
                  <h2 className="text-3xl font-bold text-white mb-4">Discover Your Passion</h2>
                  <p className="text-white/70 max-w-2xl mx-auto">
                    Browse through our carefully curated categories to find communities that match your interests
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {communityCategories.map((category, index) => (
                    <motion.button 
                      key={category.name} 
                      initial={{ opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true }} 
                      transition={{ delay: index * 0.1, duration: 0.5 }} 
                      className={cn(
                        "p-6 rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-105 h-full",
                        "flex flex-col items-center justify-center text-center gap-3",
                        "bg-gradient-to-br from-white/5 to-transparent",
                        "border border-white/5 hover:border-purple-500/30",
                        "hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]",
                        "group",
                        selectedCategory === category.name ? 'ring-2 ring-purple-500' : ''
                      )}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 
                                     flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <category.icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-lg mb-1">{category.name}</h3>
                        <p className="text-white/60 text-sm">{category.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
            
            {viewType === 'featured' && featuredCommunity && (
              <div className="py-20 bg-[#1A1F2C]/90 backdrop-blur-xl border-y border-white/5">
                <div className="container mx-auto px-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }} 
                    className="mb-16 text-center"
                  >
                    <Badge 
                      variant="outline" 
                      className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-md border-none mb-4"
                    >
                      <Award className="h-3.5 w-3.5 mr-1.5" />
                      <span>Featured</span>
                    </Badge>
                    <h2 className="text-3xl font-bold text-white mb-4">Spotlight Community</h2>
                    <p className="text-white/70 max-w-2xl mx-auto">
                      Our most popular and active community recommended for you
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.8 }} 
                    className="max-w-4xl mx-auto bg-gradient-to-br from-[#1A1F2C] to-[#151822] rounded-2xl overflow-hidden 
                              border border-white/10 hover:border-purple-500/30 
                              shadow-lg hover:shadow-[0_10px_50px_-15px_rgba(124,58,237,0.3)] 
                              transition-all duration-500 group"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 z-10"></div>
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80')] 
                                     bg-cover bg-center opacity-20 group-hover:scale-105 transition-transform duration-700"></div>
                      <div className="absolute bottom-0 left-0 p-8 z-20">
                        <Badge 
                          className="mb-3 bg-purple-500/20 text-purple-400 backdrop-blur-md border-none"
                        >
                          <Star className="h-3.5 w-3.5 mr-1.5 fill-purple-400" /> Featured
                        </Badge>
                        <h3 className="text-4xl font-bold text-white">{featuredCommunity.name}</h3>
                      </div>
                    </div>
                    
                    <div className="p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 
                                         flex items-center justify-center">
                            <Users className="h-6 w-6 text-purple-400" />
                          </div>
                          <div>
                            <span className="text-white font-medium text-lg text-white">
                              {featuredCommunity.memberCount} membri activi
                            </span>
                            <div className="flex items-center space-x-2 text-white/60 text-sm">
                              <MessageCircle className="h-4 w-4" />
                              <span>{featuredCommunity.conversationCount}/{featuredCommunity.maxConversations} conversații</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          {featuredCommunity.interests.slice(0, 3).map((interest, i) => (
                            <Badge 
                              key={i} 
                              variant="outline" 
                              className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-white/90 border-none"
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-white/80 text-lg leading-relaxed">
                        A vibrant community dedicated to {featuredCommunity.name.toLowerCase()} enthusiasts around the world. 
                        Join us to connect with like-minded individuals, share knowledge, and explore new opportunities.
                      </p>
                      
                      <div className="pt-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <ActionButton 
                            onClick={() => handleJoinCommunity(featuredCommunity.id!, featuredCommunity.name)} 
                            className="flex-1 group flex items-center justify-center space-x-2 bg-gradient-to-r 
                                     from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 
                                     text-white font-medium rounded-xl py-4 hover:shadow-lg transition-all duration-300"
                          >
                            <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            <span>Join Community</span>
                          </ActionButton>
                          
                          <ActionButton 
                            className="flex-1 group flex items-center justify-center space-x-2 
                                     bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl py-4 
                                     transition-all duration-300 border border-white/10"
                          >
                            <Bell className="h-5 w-5" />
                            <span>Follow Updates</span>
                          </ActionButton>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
            
            <div className="py-20 bg-gradient-to-br from-[#151822] via-[#1A1F2C] to-[#151822]">
              <div className="container mx-auto px-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.6 }} 
                  className="mb-16 flex justify-between items-center"
                >
                  <div>
                    <Badge 
                      variant="outline" 
                      className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-md border-none mb-4"
                    >
                      <Globe className="h-3.5 w-3.5 mr-1.5" />
                      <span>Explore</span>
                    </Badge>
                    <h2 className="text-3xl font-bold text-white mb-2">All Communities</h2>
                    <p className="text-white/70">Discover and join communities that match your interests</p>
                  </div>
                  
                  <div className="hidden md:flex items-center space-x-2">
                    <Badge className="bg-purple-500/10 text-purple-400">
                      <Radio className="h-3.5 w-3.5 mr-1.5" /> Live
                    </Badge>
                    <span className="text-white/60">{filteredCommunities.length} communities found</span>
                  </div>
                </motion.div>
                
                <AnimatePresence>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCommunities.map((community, index) => (
                      <motion.div 
                        key={community.id} 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }} 
                        transition={{ delay: index * 0.05, duration: 0.5 }} 
                        className="group"
                      >
                        <div className="bg-gradient-to-br from-[#1A1F2C]/90 to-[#151822]/90 
                                      rounded-xl overflow-hidden border border-white/5 
                                      hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(124,58,237,0.2)] 
                                      transition-all duration-500 h-full hover:-translate-y-1">
                          <div className="p-7 space-y-6">
                            <div className="flex items-center justify-between">
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 
                                           flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <MapPin className="w-6 h-6 text-purple-400" />
                              </div>
                              
                              {community.memberCount > 100 && (
                                <Badge className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 text-white/90 border-none">
                                  <TrendingUp className="h-3 w-3 mr-1" /> Popular
                                </Badge>
                              )}
                            </div>
                            
                            <div>
                              <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors duration-300 mb-2">
                                {community.name}
                              </h3>
                              
                              <div className="flex items-center space-x-3 text-white/60 text-sm mb-3">
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1.5" />
                                  <span>{community.memberCount}</span>
                                </div>
                                <div className="flex items-center">
                                  <MessageCircle className="h-4 w-4 mr-1.5" />
                                  <span>{community.conversationCount}/{community.maxConversations}</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {community.interests.map((interest, i) => (
                                  <span 
                                    key={i} 
                                    className="text-xs px-3 py-1 rounded-full 
                                             bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-white/90"
                                  >
                                    {interest}
                                  </span>
                                ))}
                              </div>
                              
                              <motion.button 
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.95 }} 
                                className="text-white/60 text-sm flex items-center group-hover:text-purple-400 transition-colors mt-2" 
                                onClick={() => toggleCommunityDetails(community.id!)}
                              >
                                {showDetails === community.id ? 'Ascunde detalii' : 'Arată detalii'}
                                <Zap className="h-3.5 w-3.5 ml-1.5" />
                              </motion.button>
                            </div>
                            
                            <AnimatePresence>
                              {showDetails === community.id && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0 }} 
                                  animate={{ opacity: 1, height: 'auto' }} 
                                  exit={{ opacity: 0, height: 0 }} 
                                  className="overflow-hidden"
                                >
                                  <p className="text-white/70 text-sm leading-relaxed my-4">
                                    A community dedicated to {community.name.toLowerCase()} enthusiasts. 
                                    Join us to connect, share, and grow together with like-minded individuals.
                                  </p>
                                  
                                  <div className="grid grid-cols-2 gap-3 text-sm text-white/60 mb-4">
                                    <div className="flex items-center">
                                      <Shield className="h-4 w-4 mr-2 text-purple-400" />
                                      <span>Moderated</span>
                                    </div>
                                    <div className="flex items-center">
                                      <DollarSign className="h-4 w-4 mr-2 text-purple-400" />
                                      <span>Free to join</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Link2 className="h-4 w-4 mr-2 text-purple-400" />
                                      <span>Public access</span>
                                    </div>
                                    <div className="flex items-center">
                                      <ShieldCheck className="h-4 w-4 mr-2 text-purple-400" />
                                      <span>Safe space</span>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            
                            <ActionButton 
                              onClick={() => handleJoinCommunity(community.id!, community.name)} 
                              className="w-full group flex items-center justify-center space-x-2 
                                       bg-gradient-to-r from-purple-500 to-blue-500 
                                       hover:from-purple-600 hover:to-blue-600 
                                       text-white font-medium rounded-lg py-3.5 
                                       hover:shadow-lg transition-all duration-300"
                            >
                              <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                              <span>Join Community</span>
                            </ActionButton>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
                
                {filteredCommunities.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center py-16"
                  >
                    <p className="text-white/60">No communities found matching your search. Try different keywords or create a new community!</p>
                  </motion.div>
                )}
              </div>
            </div>
            
            <div className="py-20 bg-[#1A1F2C]/90 backdrop-blur-xl border-t border-white/5">
              <div className="container mx-auto px-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.6 }} 
                  className="max-w-5xl mx-auto"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="bg-gradient-to-br from-[#1A1F2C] to-[#151822] 
                                  border border-white/5 rounded-xl p-8 text-center 
                                  hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] 
                                  transition-all duration-500 hover:-translate-y-1 group">
                      <ChartBar className="h-10 w-10 text-purple-400 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                      <h3 className="text-4xl font-bold text-white mb-2">{communities.length}</h3>
                      <p className="text-white/60 text-lg">Communities</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-[#1A1F2C] to-[#151822] 
                                  border border-white/5 rounded-xl p-8 text-center 
                                  hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] 
                                  transition-all duration-500 hover:-translate-y-1 group">
                      <Users className="h-10 w-10 text-blue-400 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                      <h3 className="text-4xl font-bold text-white mb-2">
                        {communities.reduce((acc, community) => acc + (community.memberCount || 0), 0)}
                      </h3>
                      <p className="text-white/60 text-lg">Active Members</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-[#1A1F2C] to-[#151822] 
                                  border border-white/5 rounded-xl p-8 text-center 
                                  hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] 
                                  transition-all duration-500 hover:-translate-y-1 group">
                      <MessageCircle className="h-10 w-10 text-purple-400 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                      <h3 className="text-4xl font-bold text-white mb-2">
                        {communities.reduce((acc, community) => acc + (community.conversationCount || 0), 0)}
                      </h3>
                      <p className="text-white/60 text-lg">Conversations</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-[#1A1F2C] to-[#151822] 
                                  border border-white/5 rounded-xl p-8 text-center 
                                  hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] 
                                  transition-all duration-500 hover:-translate-y-1 group">
                      <Tag className="h-10 w-10 text-blue-400 mx-auto mb-6 group-hover:scale-110 transition-transform" />
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
