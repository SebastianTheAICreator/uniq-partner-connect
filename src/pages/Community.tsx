
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Search, Users, MessageCircle, Plus, Globe, MapPin, TrendingUp
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
import { cn } from "@/lib/utils";

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
        className: "bg-gradient-to-r from-primary/20 to-secondary/20"
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
        className: "bg-gradient-to-r from-primary/10 to-secondary/10"
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
    <div className="min-h-screen bg-gradient-to-br from-[#0A0C10] via-[#0F1117] to-[#0A0C10] flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-24">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-16"
          >
            <Badge className="px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 border-none mb-6">
              <Globe className="h-4 w-4 mr-2 text-secondary" />
              <span className="text-white">Communities</span>
            </Badge>
            
            <h1 className="text-5xl font-bold text-white mb-6">
              Discover Your Tribe
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Connect with like-minded people, share interests, and build meaningful relationships
            </p>
            
            {/* Search and Create */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  type="search"
                  placeholder="Search communities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border-white/20 rounded-xl pl-10 py-3 placeholder:text-white/40 text-white"
                />
              </div>
              <CreateCommunityDialog onCommunityCreated={handleCommunityCreated} />
            </div>
          </motion.div>

          {/* Communities Grid */}
          {filteredCommunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map((community, index) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-primary/30 transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        {community.memberCount > 50 && (
                          <Badge className="bg-gradient-to-r from-secondary/20 to-primary/20 text-white border-none">
                            <TrendingUp className="h-3 w-3 mr-1" /> Popular
                          </Badge>
                        )}
                      </div>
                      
                      <CardTitle className="text-white text-xl mb-2">
                        {community.name}
                      </CardTitle>
                      
                      <div className="flex items-center gap-4 text-white/60 text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-primary/80" />
                          <span>{community.memberCount}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1 text-primary/80" />
                          <span>{community.conversationCount}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {community.interests.slice(0, 3).map((interest, i) => (
                          <span 
                            key={i} 
                            className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70"
                          >
                            {interest}
                          </span>
                        ))}
                        {community.interests.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/50">
                            +{community.interests.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <Button 
                        onClick={() => handleJoinCommunity(community.id!, community.name)}
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium rounded-lg py-3"
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
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-white/20" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                {searchTerm ? "No matches found" : "No communities yet"}
              </h3>
              <p className="text-white/60 max-w-md mx-auto mb-8">
                {searchTerm 
                  ? `No communities match "${searchTerm}". Try different keywords or create a new community.`
                  : "Be the first to create a community and start building connections!"}
              </p>
              <CreateCommunityDialog onCommunityCreated={handleCommunityCreated} />
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CommunityPage;
