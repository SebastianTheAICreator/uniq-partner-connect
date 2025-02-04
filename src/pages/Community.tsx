import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Users, MessageCircle, Heart, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import ActionButton from "@/components/ActionButton";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import ConversationList from "@/components/ConversationList";
import CreateCommunityDialog from "@/components/community/CreateCommunityDialog";
import { getAllCommunities, addCommunity, type Community, updateCommunityMemberCount } from "@/db/database";
import { useNotifications } from "@/contexts/NotificationContext";

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  const [communities, setCommunities] = useState<Community[]>([]);
  const { addNotification } = useNotifications();

  // Încarcă comunitățile la montarea componentei
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

      // Notificare toast
      toast({
        title: "Bine ai venit în comunitate! 🎉",
        description: `Te-ai alăturat comunității: ${communityName}`,
        className: "bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-none shadow-xl",
      });

      // Notificare în panoul de notificări
      addNotification(
        "GROUP_JOIN",
        "Te-ai alăturat unei noi comunități!",
        `Ai devenit membru în comunitatea "${communityName}". Explorează conversațiile și conectează-te cu alți membri.`,
        { groupId: communityId.toString() }
      );

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
        title: "Comunitate creată cu succes! 🎉",
        description: `"${newCommunity.name}" este acum live și gata să primească membri.`,
        className: "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-none"
      });
    } catch (error) {
      console.error('Error creating community:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut crea comunitatea. Te rugăm să încerci din nou.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A90E2] via-white to-white">
      <Navbar />
      
      {!selectedCategory ? (
        <div className="container mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-5xl md:text-6xl font-bold text-[#2D3748] font-poppins"
              >
                Descoperă-ți Locul Tău
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-[#4A5568] font-inter max-w-2xl mx-auto"
              >
                Aici vei găsi persoane care te înțeleg, te acceptă și împărtășesc aceleași pasiuni ca tine.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative max-w-2xl mx-auto"
            >
              <Input
                type="search"
                placeholder="Caută comunități după interese..."
                className="w-full pl-12 py-6 text-lg bg-white shadow-lg rounded-xl text-[#4A5568] placeholder:text-[#718096] focus:ring-2 focus:ring-[#4A90E2]/20 border-none transition-all duration-300 font-inter"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A90E2] h-5 w-5" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {communities
                .filter(community => 
                  community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  community.interests.some(interest => 
                    interest.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                )
                .map((community, index) => (
                  <motion.div
                    key={community.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white to-[#F7FAFC] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <Users className="w-8 h-8 text-[#64D2FF] animate-float" />
                        <span className="text-sm text-[#4A5568] font-inter">
                          {community.memberCount} membri
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-[#2D3748] font-poppins">{community.name}</h3>
                      
                      <div className="flex items-center space-x-2 text-[#64D2FF] text-sm font-inter">
                        <MessageCircle className="h-4 w-4" />
                        <span>{community.conversationCount}/{community.maxConversations} conversații active</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {community.interests.map((interest, i) => (
                          <span 
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-[#4A90E2]/10 to-[#64D2FF]/10 text-[#4A5568] font-inter"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>

                      <ActionButton
                        onClick={() => handleJoinCommunity(community.id!, community.name)}
                        className="w-full group flex items-center justify-center space-x-2 bg-gradient-to-r from-[#42E695] to-[#3BB2B8] text-white font-inter rounded-xl py-3 hover:shadow-lg transition-all duration-300"
                      >
                        <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        <span>Alătură-te</span>
                      </ActionButton>
                    </div>
                  </motion.div>
                ))}
            </motion.div>

            <CreateCommunityDialog onCommunityCreated={handleCommunityCreated} />
          </motion.div>
        </div>
      ) : (
        <ConversationList />
      )}
    </div>
  );
};

export default CommunityPage;