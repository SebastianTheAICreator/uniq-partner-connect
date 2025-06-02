
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Users, MessageCircle, Heart, Plus, Filter, 
  ArrowUpDown, Globe, TrendingUp, ChevronRight,
  MapPin, Star, Award
} from "lucide-react";
import { Input } from "@/components/ui/input";
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
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const [hoveredCommunity, setHoveredCommunity] = useState<number | null>(null);

  useEffect(() => {
    const loadCommunities = async () => {
      try {
        const savedCommunities = await getAllCommunities();
        setCommunities(savedCommunities);
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
          <div className="py-24 bg-[#0A0C10]">
            <div className="container mx-auto px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }} 
                className="mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-6"
              >
                <div>
                  <Badge 
                    className="px-3 py-1 bg-gradient-to-r from-primary/20 to-interactive/20 backdrop-blur-md border-none mb-4"
                  >
                    <Globe className="h-3.5 w-3.5 mr-1.5 text-interactive" />
                    <span className="text-white/90">Communities</span>
                  </Badge>
                  <h1 className="text-4xl font-bold text-white mb-4">Explore Communities</h1>
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
                  
                  <CreateCommunityDialog onCommunityCreated={handleCommunityCreated} />
                </div>
              </motion.div>
              
              <AnimatePresence>
                {filteredCommunities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCommunities.map((community, index) => (
                      <motion.div 
                        key={community.id} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: index * 0.05, duration: 0.5 }}
                        whileHover={{ y: -5 }}
                        onHoverStart={() => setHoveredCommunity(community.id!)}
                        onHoverEnd={() => setHoveredCommunity(null)}
                        className="group"
                      >
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0F1117]/90 to-[#0A0C10]/90 
                                      border border-white/5 hover:border-primary/30 
                                      transition-all duration-500 h-full">
                          
                          <div className={cn(
                            "absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 -z-10",
                            hoveredCommunity === community.id && "opacity-100"
                          )}></div>
                          
                          <div className="p-7 space-y-6 relative z-10">
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
                                </motion.div>
                              )}
                            </AnimatePresence>
                            
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
        ) : (
          <ConversationList />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CommunityPage;
