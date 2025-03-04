import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Users, MessageCircle, Heart, Shield, TrendingUp, Zap, Link2, ShieldCheck, ChartBar, DollarSign, Globe, Bell, Filter, ArrowUpDown, Mic, Brain, Video, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import ActionButton from "@/components/ActionButton";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import ConversationList from "@/components/ConversationList";
import CreateCommunityDialog from "@/components/community/CreateCommunityDialog";
import { getAllCommunities, addCommunity, type Community, updateCommunityMemberCount } from "@/db/database";
import { useNotifications } from "@/contexts/NotificationContext";
import Footer from "@/components/Footer";

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  const [communities, setCommunities] = useState<Community[]>([]);
  const { addNotification } = useNotifications();

  useEffect(() => {
    const loadCommunities = async () => {
      try {
        const savedCommunities = await getAllCommunities();
        if (savedCommunities.length > 0) {
          setCommunities(savedCommunities);
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

  const communityCategories = [
    {
      name: "Gaming",
      icon: Video
    },
    {
      name: "Business",
      icon: Building2
    },
    {
      name: "Creative",
      icon: Brain
    },
    {
      name: "Tech",
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 bg-[#222222] hover:bg-[#333333] mx-0 flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        {!selectedCategory ? (
          <div className="container mx-auto px-4 py-32 bg-[#222222]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-12">
              <div className="text-center space-y-6">
                <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-6xl font-bold text-white font-poppins">
                  UniQ Communities Hub
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xl text-gray-300 font-inter max-w-3xl mx-auto">
                  Conectează-te cu comunități globale și creează experiențe unice împreună cu AI
                </motion.p>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="relative max-w-3xl mx-auto">
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl rounded-xl p-2">
                  <div className="flex-1 relative">
                    <Input type="search" placeholder="Caută comunități după interese..." className="w-full pl-12 py-6 text-lg bg-transparent text-white placeholder:text-gray-400 border-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 font-inter" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                  <ActionButton variant="primary" className="p-3 hover:bg-white/10 rounded-lg transition-colors">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </ActionButton>
                  <ActionButton variant="primary" className="p-3 hover:bg-white/10 rounded-lg transition-colors">
                    <ArrowUpDown className="h-5 w-5 text-gray-400" />
                  </ActionButton>
                  <ActionButton variant="primary" className="p-3 hover:bg-white/10 rounded-lg transition-colors">
                    <Mic className="h-5 w-5 text-gray-400" />
                  </ActionButton>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {communityCategories.map((category, index) => <motion.button key={category.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }} className={`p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 ${selectedCategory === category.name ? 'ring-2 ring-blue-500' : ''}`} onClick={() => setSelectedCategory(category.name)}>
                    <category.icon className="h-6 w-6 text-blue-400 mb-2" />
                    <span className="text-white font-medium">{category.name}</span>
                  </motion.button>)}
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communities.filter(community => community.name.toLowerCase().includes(searchTerm.toLowerCase()) || community.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()))).map((community, index) => <motion.div key={community.id || index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-800/50 rounded-xl border border-white/10 hover:border-blue-500/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      <div className="p-6 space-y-4 bg-[#222222] hover:bg-[#333333]">
                        <div className="flex items-center justify-between">
                          <Users className="w-8 h-8 text-blue-400 animate-float" />
                          <span className="text-sm text-gray-400 font-inter">
                            {community.memberCount} membri
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-white font-poppins">
                          {community.name}
                        </h3>
                        
                        <div className="flex items-center space-x-2 text-gray-400 text-sm font-inter">
                          <MessageCircle className="h-4 w-4" />
                          <span>{community.conversationCount}/{community.maxConversations} conversații active</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {community.interests.map((interest, i) => <span key={i} className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 text-gray-300 font-inter">
                              {interest}
                            </span>)}
                        </div>

                        <ActionButton onClick={() => handleJoinCommunity(community.id!, community.name)} className="w-full group flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-400 to-emerald-400 hover:from-blue-500 hover:to-emerald-500 text-white font-inter rounded-lg py-3 hover:shadow-lg transition-all duration-300">
                          <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span>Join Community</span>
                        </ActionButton>
                      </div>
                    </motion.div>)}
              </motion.div>

              <CreateCommunityDialog onCommunityCreated={handleCommunityCreated} />
            </motion.div>
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
