import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, MessageCircle, Heart, Shield, TrendingUp, Zap, Link2, ShieldCheck, ChartBar, DollarSign, Globe, Bell, Filter, ArrowUpDown, Mic, Brain, Video, Building2, Sparkles, Compass, Award, Radio, BookOpen, MapPin, Star, Tag, Briefcase } from "lucide-react";
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
          // Set the most popular community as featured
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
  return <div className="min-h-screen bg-gradient-to-br from-gray-900 bg-[#222222] flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        {!selectedCategory ? <div className="bg-[#222222]">
            {/* Hero Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-emerald-900/30 z-0"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 z-0"></div>
              
              <div className="container mx-auto px-6 py-32 relative z-10 bg-gray-900">
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8
            }} className="max-w-4xl mx-auto text-center space-y-6">
                  <motion.div initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 0.2,
                duration: 0.8
              }} className="inline-block">
                    <Badge variant="outline" className="px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 backdrop-blur-md border-none mb-4 font-medium text-white/90">
                      <Sparkles className="h-4 w-4 mr-2 animate-float" />
                      <span>Premium Community Platform</span>
                    </Badge>
                  </motion.div>
                  
                  <motion.h1 initial={{
                opacity: 0,
                y: -20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.4,
                duration: 0.8
              }} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-poppins leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 animate-text-shine">UniQ Communities Hub</span>
                  </motion.h1>
                  
                  <motion.p initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 0.6,
                duration: 0.8
              }} className="text-xl text-white/80 font-inter max-w-3xl mx-auto leading-relaxed">
                    Connectează-te cu comunități exclusive și creează experiențe memorabile împreună cu inteligența artificială de ultimă generație
                  </motion.p>
                  
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.8,
                duration: 0.8
              }} className="mt-8 flex gap-4 justify-center flex-wrap">
                    <CreateCommunityDialog onCommunityCreated={handleCommunityCreated} />
                    
                    <ActionButton variant="secondary" className="py-3 px-6 text-white bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/10 transition-all duration-300 rounded-xl">
                      <Compass className="h-5 w-5 mr-2" />
                      Explorează Comunitățile
                    </ActionButton>
                  </motion.div>
                </motion.div>
              </div>
            </div>
            
            {/* Search Section */}
            <div className="py-16 bg-[#1A1F2C]/80 backdrop-blur-xl">
              <div className="container mx-auto px-6">
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                  <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-6 items-stretch">
                      <div className="flex-1 relative rounded-2xl overflow-hidden bg-[#222222] border border-white/5 shadow-[0_0_25px_rgba(59,130,246,0.1)] hover:shadow-[0_0_35px_rgba(59,130,246,0.15)] transition-all duration-300">
                        <Input type="search" placeholder="Caută comunități după interese, tematici sau pasiuni..." className="w-full pl-14 py-7 text-lg bg-transparent border-none text-white placeholder:text-white/40 focus:ring-2 focus:ring-blue-500/30" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400 h-6 w-6" />
                      </div>
                      
                      <div className="flex gap-2 items-center">
                        <ActionButton variant="primary" className="p-4 hover:bg-white/10 rounded-xl transition-colors h-full aspect-square flex items-center justify-center bg-[#222222] border border-white/5" onClick={() => setViewType(viewType === 'grid' ? 'featured' : 'grid')}>
                          <ArrowUpDown className="h-5 w-5 text-blue-400" />
                        </ActionButton>
                        
                        <ActionButton variant="primary" className="p-4 hover:bg-white/10 rounded-xl transition-colors h-full aspect-square flex items-center justify-center bg-[#222222] border border-white/5">
                          <Filter className="h-5 w-5 text-blue-400" />
                        </ActionButton>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Categories Section */}
            <div className="py-16 bg-[#222222]">
              <div className="container mx-auto px-6">
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="mb-12 text-center">
                  <Badge variant="outline" className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 backdrop-blur-md border-none mb-4">
                    <Tag className="h-3.5 w-3.5 mr-1.5" />
                    <span>Categories</span>
                  </Badge>
                  <h2 className="text-3xl font-bold text-white mb-4 font-poppins">Discover Your Passion</h2>
                  <p className="text-white/70 max-w-2xl mx-auto">Browse through our carefully curated categories to find communities that match your interests</p>
                </motion.div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {communityCategories.map((category, index) => <motion.button key={category.name} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: index * 0.1,
                duration: 0.5
              }} className={`p-6 rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-105 h-full flex flex-col items-center justify-center text-center gap-3 bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] ${selectedCategory === category.name ? 'ring-2 ring-blue-500' : ''}`} onClick={() => setSelectedCategory(category.name)}>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center">
                        <category.icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-lg mb-1">{category.name}</h3>
                        <p className="text-white/60 text-sm">{category.description}</p>
                      </div>
                    </motion.button>)}
                </div>
              </div>
            </div>
            
            {/* Featured Community */}
            {viewType === 'featured' && featuredCommunity && <div className="py-16 bg-[#1A1F2C]/80">
                <div className="container mx-auto px-6">
                  <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="mb-12 text-center">
                    <Badge variant="outline" className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 backdrop-blur-md border-none mb-4">
                      <Award className="h-3.5 w-3.5 mr-1.5" />
                      <span>Featured</span>
                    </Badge>
                    <h2 className="text-3xl font-bold text-white mb-4 font-poppins">Spotlight Community</h2>
                    <p className="text-white/70 max-w-2xl mx-auto">Our most popular and active community recommended for you</p>
                  </motion.div>
                  
                  <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }} className="max-w-4xl mx-auto bg-gradient-to-br from-[#222222] to-[#1A1F2C] rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/20 shadow-lg hover:shadow-xl transition-all duration-500 group">
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-emerald-900/40 z-10 bg-neutral-950"></div>
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 group-hover:scale-105 transition-transform duration-700"></div>
                      <div className="absolute bottom-0 left-0 p-6 z-20">
                        <Badge className="mb-3 bg-blue-500/20 text-blue-400 backdrop-blur-md border-none">
                          <Star className="h-3.5 w-3.5 mr-1.5 fill-blue-400" /> Featured
                        </Badge>
                        <h3 className="text-3xl font-bold text-white font-poppins">{featuredCommunity.name}</h3>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center">
                            <Users className="h-6 w-6 text-blue-400" />
                          </div>
                          <div>
                            <span className="text-white font-medium">
                              {featuredCommunity.memberCount} membri activi
                            </span>
                            <div className="flex items-center space-x-2 text-white/60 text-sm">
                              <MessageCircle className="h-4 w-4" />
                              <span>{featuredCommunity.conversationCount}/{featuredCommunity.maxConversations} conversații</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          {featuredCommunity.interests.slice(0, 3).map((interest, i) => <Badge key={i} variant="outline" className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 text-white/90 border-none">
                              {interest}
                            </Badge>)}
                        </div>
                      </div>
                      
                      <p className="text-white/80 text-lg leading-relaxed">
                        A vibrant community dedicated to {featuredCommunity.name.toLowerCase()} enthusiasts around the world. 
                        Join us to connect with like-minded individuals, share knowledge, and explore new opportunities.
                      </p>
                      
                      <div className="pt-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <ActionButton onClick={() => handleJoinCommunity(featuredCommunity.id!, featuredCommunity.name)} className="flex-1 group flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-inter rounded-xl py-4 hover:shadow-lg transition-all duration-300">
                            <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Join Community</span>
                          </ActionButton>
                          
                          <ActionButton className="flex-1 group flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white font-inter rounded-xl py-4 transition-all duration-300 border border-white/10">
                            <Bell className="h-5 w-5" />
                            <span>Follow Updates</span>
                          </ActionButton>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>}
            
            {/* All Communities */}
            <div className="py-16 bg-[#222222]">
              <div className="container mx-auto px-6">
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="mb-12 flex justify-between items-center">
                  <div>
                    <Badge variant="outline" className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 backdrop-blur-md border-none mb-4">
                      <Globe className="h-3.5 w-3.5 mr-1.5" />
                      <span>Explore</span>
                    </Badge>
                    <h2 className="text-3xl font-bold text-white mb-2 font-poppins">All Communities</h2>
                    <p className="text-white/70">Discover and join communities that match your interests</p>
                  </div>
                  
                  <div className="hidden md:flex items-center space-x-2">
                    <Badge className="bg-blue-500/10 text-blue-400">
                      <Radio className="h-3.5 w-3.5 mr-1.5" /> Live
                    </Badge>
                    <span className="text-white/60">{filteredCommunities.length} communities found</span>
                  </div>
                </motion.div>
                
                <AnimatePresence>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCommunities.map((community, index) => <motion.div key={community.id} initial={{
                  opacity: 0,
                  y: 20
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  delay: index * 0.05,
                  duration: 0.5
                }} className="group">
                        <div className="bg-gradient-to-br from-[#1A1F2C]/90 to-[#222222]/90 rounded-xl overflow-hidden border border-white/5 hover:border-blue-500/20 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 h-full hover:-translate-y-1">
                          <div className="p-6 space-y-5">
                            <div className="flex items-center justify-between">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/10 to-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <MapPin className="w-6 h-6 text-blue-400 animate-float" />
                              </div>
                              
                              {community.memberCount > 100 && <Badge className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 text-white/90 border-none">
                                  <TrendingUp className="h-3 w-3 mr-1" /> Popular
                                </Badge>}
                            </div>
                            
                            <div>
                              <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 mb-2 font-poppins">
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
                                {community.interests.map((interest, i) => <span key={i} className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 text-white/90">
                                    {interest}
                                  </span>)}
                              </div>
                              
                              <motion.button whileHover={{
                          scale: 1.05
                        }} whileTap={{
                          scale: 0.95
                        }} className="text-white/60 text-sm flex items-center group-hover:text-blue-400 transition-colors mt-2" onClick={() => toggleCommunityDetails(community.id!)}>
                                {showDetails === community.id ? 'Ascunde detalii' : 'Arată detalii'}
                                <Zap className="h-3.5 w-3.5 ml-1.5" />
                              </motion.button>
                            </div>
                            
                            <AnimatePresence>
                              {showDetails === community.id && <motion.div initial={{
                          opacity: 0,
                          height: 0
                        }} animate={{
                          opacity: 1,
                          height: 'auto'
                        }} exit={{
                          opacity: 0,
                          height: 0
                        }} className="overflow-hidden">
                                  <p className="text-white/70 text-sm leading-relaxed my-4">
                                    A community dedicated to {community.name.toLowerCase()} enthusiasts. 
                                    Join us to connect, share, and grow together with like-minded individuals.
                                  </p>
                                  
                                  <div className="grid grid-cols-2 gap-3 text-sm text-white/60 mb-4">
                                    <div className="flex items-center">
                                      <Shield className="h-4 w-4 mr-2 text-blue-400" />
                                      <span>Moderated</span>
                                    </div>
                                    <div className="flex items-center">
                                      <DollarSign className="h-4 w-4 mr-2 text-blue-400" />
                                      <span>Free to join</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Link2 className="h-4 w-4 mr-2 text-blue-400" />
                                      <span>Public access</span>
                                    </div>
                                    <div className="flex items-center">
                                      <ShieldCheck className="h-4 w-4 mr-2 text-blue-400" />
                                      <span>Safe space</span>
                                    </div>
                                  </div>
                                </motion.div>}
                            </AnimatePresence>
                            
                            <ActionButton onClick={() => handleJoinCommunity(community.id!, community.name)} className="w-full group flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-400 to-emerald-400 hover:from-blue-500 hover:to-emerald-500 text-white font-inter rounded-lg py-3.5 hover:shadow-lg transition-all duration-300">
                              <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                              <span>Join Community</span>
                            </ActionButton>
                          </div>
                        </div>
                      </motion.div>)}
                  </div>
                </AnimatePresence>
                
                {filteredCommunities.length === 0 && <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} className="text-center py-12">
                    <p className="text-white/60">No communities found matching your search. Try different keywords or create a new community!</p>
                  </motion.div>}
              </div>
            </div>
            
            {/* Statistics Section */}
            <div className="py-16 bg-[#1A1F2C]/80 border-t border-white/5">
              <div className="container mx-auto px-6">
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-[#222222] border border-white/5 rounded-xl p-6 text-center hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300">
                      <ChartBar className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold text-white mb-1">{communities.length}</h3>
                      <p className="text-white/60">Communities</p>
                    </div>
                    
                    <div className="bg-[#222222] border border-white/5 rounded-xl p-6 text-center hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300">
                      <Users className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold text-white mb-1">
                        {communities.reduce((acc, community) => acc + (community.memberCount || 0), 0)}
                      </h3>
                      <p className="text-white/60">Active Members</p>
                    </div>
                    
                    <div className="bg-[#222222] border border-white/5 rounded-xl p-6 text-center hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300">
                      <MessageCircle className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold text-white mb-1">
                        {communities.reduce((acc, community) => acc + (community.conversationCount || 0), 0)}
                      </h3>
                      <p className="text-white/60">Conversations</p>
                    </div>
                    
                    <div className="bg-[#222222] border border-white/5 rounded-xl p-6 text-center hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300">
                      <Tag className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold text-white mb-1">
                        {communities.reduce((acc, community) => acc + (community.interests?.length || 0), 0)}
                      </h3>
                      <p className="text-white/60">Interest Tags</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div> : <ConversationList />}
      </div>
      
      <Footer />
    </div>;
};
export default CommunityPage;