
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Search, Users, MessageCircle, Plus, Heart, TrendingUp, Star
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreateCommunityDialog from "@/components/community/CreateCommunityDialog";
import { getAllCommunities, addCommunity, type Community, updateCommunityMemberCount } from "@/db/database";
import { useNotifications } from "@/contexts/NotificationContext";

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [communities, setCommunities] = useState<Community[]>([]);
  const { toast } = useToast();
  const { addNotification } = useNotifications();

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
      
      toast({
        title: "Welcome! 🎉",
        description: `You've joined ${communityName}`,
      });
      
      addNotification("GROUP_JOIN", "Community Joined!", `You are now a member of "${communityName}".`, {
        groupId: communityId.toString()
      });
    } catch (error) {
      console.error('Error joining community:', error);
      toast({
        title: "Error",
        description: "Could not join community. Please try again.",
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
        title: "Community Created! 🎉",
        description: `"${newCommunity.name}" is now live.`,
      });
    } catch (error) {
      console.error('Error creating community:', error);
      toast({
        title: "Error",
        description: "Could not create community. Please try again.",
        variant: "destructive"
      });
    }
  };

  const filteredCommunities = communities.filter(community => 
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    community.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full mb-6">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Connect & Discover</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Community</span>
            </h1>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-12">
              Join communities that share your interests and connect with like-minded people
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto mb-8">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search communities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border-white/20 rounded-full pl-12 py-4 placeholder:text-slate-400 text-white h-12"
                />
              </div>
              <CreateCommunityDialog onCommunityCreated={handleCommunityCreated} />
            </div>
          </motion.div>

          {/* Communities Grid */}
          {filteredCommunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCommunities.map((community, index) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full bg-white/5 backdrop-blur border-white/10 hover:border-blue-400/30 transition-all duration-300 group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Users className="w-7 h-7 text-blue-400" />
                        </div>
                        {community.memberCount > 50 && (
                          <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30">
                            <Star className="h-3 w-3 mr-1" /> Popular
                          </Badge>
                        )}
                      </div>
                      
                      <CardTitle className="text-white text-2xl mb-3 group-hover:text-blue-300 transition-colors">
                        {community.name}
                      </CardTitle>
                      
                      <div className="flex items-center gap-6 text-slate-400 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-400" />
                          <span>{community.memberCount} members</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-purple-400" />
                          <span>{community.conversationCount} topics</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-8">
                        {community.interests.slice(0, 3).map((interest, i) => (
                          <span 
                            key={i} 
                            className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300 border border-white/10"
                          >
                            {interest}
                          </span>
                        ))}
                        {community.interests.length > 3 && (
                          <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-slate-400">
                            +{community.interests.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <Button 
                        onClick={() => handleJoinCommunity(community.id!, community.name)}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-xl py-3 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Join Community
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-20"
            >
              <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8">
                <Search className="h-16 w-16 text-slate-400" />
              </div>
              <h3 className="text-3xl font-semibold text-white mb-4">
                {searchTerm ? "No matches found" : "Start Building Community"}
              </h3>
              <p className="text-slate-400 max-w-md mx-auto mb-8 text-lg">
                {searchTerm 
                  ? `No communities match "${searchTerm}". Try different keywords or create a new community.`
                  : "Be the first to create a community and start connecting with others!"}
              </p>
              <CreateCommunityDialog onCommunityCreated={handleCommunityCreated} />
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CommunityPage;
