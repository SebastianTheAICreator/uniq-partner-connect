
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import CommunityHeader from "@/components/community/CommunityHeader";
import CommunityGrid from "@/components/community/CommunityGrid";
import CommunityStats from "@/components/community/CommunityStats";
import { getAllCommunities, addCommunity, type Community } from "@/db/database";
import { useNotifications } from "@/contexts/NotificationContext";
import Footer from "@/components/Footer";
import Sidebar from "@/components/sidebar/Sidebar";

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const { toast } = useToast();
  const [communities, setCommunities] = useState<Community[]>([]);
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

  const handleCommunityCreated = async (newCommunity: Omit<Community, 'id' | 'createdAt'>) => {
    try {
      const communityWithDefaults = {
        ...newCommunity,
        memberCount: 1,
        conversationCount: 0,
        maxConversations: 500
      };
      await addCommunity(communityWithDefaults);
      const updatedCommunities = await getAllCommunities();
      setCommunities(updatedCommunities);
      toast({
        title: "Community created! 🎉",
        description: `"${newCommunity.name}" is now live.`,
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

  // Filter communities based on search and category
  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      community.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || 
      community.interests.some(interest => interest.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  const handleJoinCommunity = async (communityId: number, communityName: string) => {
    try {
      const updatedCommunities = communities.map(c => 
        c.id === communityId ? { ...c, memberCount: (c.memberCount || 0) + 1 } : c
      );
      setCommunities(updatedCommunities);
      
      toast({
        title: "Welcome! 🎉",
        description: `You've joined ${communityName}`,
        className: "bg-gradient-to-r from-primary/20 to-secondary/20 border-none"
      });
      
      addNotification("GROUP_JOIN", "You've joined a new community!", 
        `You are now a member of "${communityName}".`, {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0C10] via-[#0F1117] to-[#0A0C10]">
      <Navbar />
      
      <div className="flex">
        <Sidebar conversations={[]} />
        
        <div className="flex-1 ml-16 lg:ml-72">
          <div className="pt-20">
            {/* Header with Search and Filters */}
            <CommunityHeader
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
              onCommunityCreated={handleCommunityCreated}
            />

            {/* Stats Section */}
            <CommunityStats communities={communities} />

            {/* Communities Grid */}
            <CommunityGrid
              communities={filteredCommunities}
              onJoinCommunity={handleJoinCommunity}
              searchTerm={searchTerm}
              onCommunityCreated={handleCommunityCreated}
            />
          </div>
          
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
