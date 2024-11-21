import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, MessageCircle, Heart, Sparkles, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import ActionButton from "@/components/ActionButton";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import ConversationList from "@/components/ConversationList";
import CreateCommunityDialog from "@/components/community/CreateCommunityDialog";

interface Community {
  name: string;
  description: string;
  interests: string[];
  memberCount?: number;
  conversationCount?: number;
}

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  const [communities, setCommunities] = useState<Community[]>([
    {
      name: "Arte & Cultură",
      description: "Pentru pasionații de artă și cultură",
      interests: ["Artă", "Cultură"],
      memberCount: 1234,
      conversationCount: 45
    },
    {
      name: "Gaming & Tech",
      description: "Discuții despre jocuri și tehnologie",
      interests: ["Gaming", "Tehnologie"],
      memberCount: 2345,
      conversationCount: 67
    },
  ]);

  const handleJoinCommunity = (communityName: string) => {
    setSelectedCategory(communityName);
    toast({
      title: "Comunitate nouă",
      description: `Te-ai alăturat comunității: ${communityName}`,
    });
  };

  const handleCommunityCreated = (newCommunity: Community) => {
    const communityWithCounts = {
      ...newCommunity,
      memberCount: 1, // Starting with the creator
      conversationCount: 0
    };
    setCommunities(prev => [communityWithCounts, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      
      {!selectedCategory ? (
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="text-center space-y-6">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold gradient-text"
              >
                Descoperă-ți Locul Tău
              </motion.h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Aici vei găsi persoane care te înțeleg, te acceptă și împărtășesc aceleași pasiuni ca tine.
                Alătură-te unei comunități din peste 1200 de opțiuni.
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-2xl mx-auto"
            >
              <Input
                type="search"
                placeholder="Caută comunități după interese..."
                className="w-full pl-12 py-6 text-lg glass-card"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {communities
                .filter(community => 
                  community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  community.interests.some(interest => 
                    interest.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                )
                .map((community, index) => (
                  <motion.div
                    key={community.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-xl overflow-hidden hover-lift"
                  >
                    <div className="p-6 space-y-4 bg-gradient-to-br from-purple-500/10 to-pink-500/5">
                      <div className="flex items-center justify-between">
                        <Users className="w-8 h-8 text-primary" />
                        <span className="text-sm text-gray-500">
                          {community.memberCount} membri
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-800">{community.name}</h3>
                      
                      <div className="flex items-center space-x-2 text-gray-600 text-sm">
                        <MessageCircle className="h-4 w-4" />
                        <span>{community.conversationCount} conversații active</span>
                      </div>

                      <ActionButton
                        onClick={() => handleJoinCommunity(community.name)}
                        className="w-full group flex items-center justify-center space-x-2 bg-white/50 hover:bg-white/80"
                      >
                        <Heart className="h-5 w-5 group-hover:text-primary transition-colors" />
                        <span>Alătură-te</span>
                      </ActionButton>
                    </div>
                  </motion.div>
                ))}
            </div>

            <CreateCommunityDialog onCommunityCreated={handleCommunityCreated} />
          </motion.div>
        </div>
      ) : (
        <ConversationList />
      )}
    </div>
  );
};

export default Community;
