import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Users, MessageCircle, Heart, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import ActionButton from "@/components/ActionButton";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import ConversationList from "@/components/ConversationList";
import CreateCommunityDialog from "@/components/community/CreateCommunityDialog";
import { getAllCommunities, addCommunity, type Community } from "@/db/database";

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  const [communities, setCommunities] = useState<Community[]>([]);

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

  const handleJoinCommunity = (communityName: string) => {
    setSelectedCategory(communityName);
    toast({
      title: "Bine ai venit în comunitate! 🎉",
      description: `Te-ai alăturat comunității: ${communityName}`,
      className: "bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-none shadow-xl",
    });
  };

  const handleCommunityCreated = async (newCommunity: Omit<Community, 'id' | 'createdAt'>) => {
    try {
      await addCommunity(newCommunity);
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
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1a1a2e]">
      <Navbar />
      
      {!selectedCategory ? (
        <div className="container mx-auto px-4 py-24">
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
                className="text-5xl md:text-6xl font-bold gradient-text text-glow"
              >
                Descoperă-ți Locul Tău
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-300 max-w-2xl mx-auto"
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
                className="w-full pl-12 py-6 text-lg glass-card text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary h-5 w-5" />
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
                    className="glass-card rounded-xl overflow-hidden card-hover border-glow"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <Users className="w-8 h-8 text-primary animate-float" />
                        <span className="text-sm text-gray-400">
                          {community.memberCount} membri
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold gradient-text">{community.name}</h3>
                      
                      <div className="flex items-center space-x-2 text-gray-300 text-sm">
                        <MessageCircle className="h-4 w-4" />
                        <span>{community.conversationCount}/{community.maxConversations} conversații active</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {community.interests.map((interest, i) => (
                          <span 
                            key={i}
                            className="text-xs px-3 py-1 rounded-full glass-gradient text-white/80"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>

                      <ActionButton
                        onClick={() => handleJoinCommunity(community.name)}
                        className="w-full group flex items-center justify-center space-x-2 button-gradient text-white"
                      >
                        <Heart className="h-5 w-5 group-hover:text-pink-300 transition-colors" />
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