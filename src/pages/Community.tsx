import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, MessageCircle, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import ActionButton from "@/components/ActionButton";
import { useToast } from "@/components/ui/use-toast";

interface Interest {
  id: string;
  name: string;
  category: string;
  activeUsers: number;
}

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const categories = [
    "Arte & Cultură",
    "Gaming & Tech",
    "LGBTQ+",
    "Lifestyle",
    "Muzică",
    "Sport & Fitness",
    "Spiritualitate",
    "Hobby-uri",
  ];

  const handleJoinCommunity = (interest: string) => {
    toast({
      title: "Comunitate nouă",
      description: `Te-ai alăturat comunității: ${interest}`,
    });
    console.log("Joined community:", interest);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">
            Descoperă Comunitatea Ta
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Peste 1200 de comunități te așteaptă să te alături conversațiilor despre pasiunile și interesele tale
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <Input
            type="search"
            placeholder="Caută comunități după interese..."
            className="w-full pl-12 py-6 text-lg glass-card"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-xl p-6 space-y-4"
            >
              <h3 className="text-xl font-semibold text-primary">{category}</h3>
              <div className="flex items-center space-x-4 text-gray-600">
                <Users className="h-5 w-5" />
                <span>{Math.floor(Math.random() * 1000 + 100)} membri</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-600">
                <MessageCircle className="h-5 w-5" />
                <span>{Math.floor(Math.random() * 50 + 10)} conversații active</span>
              </div>
              <ActionButton
                onClick={() => handleJoinCommunity(category)}
                className="w-full flex items-center justify-center space-x-2"
              >
                <Heart className="h-5 w-5" />
                <span>Alătură-te</span>
              </ActionButton>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            Nu găsești ce cauți? Poți crea propria ta comunitate!
          </p>
          <ActionButton
            variant="secondary"
            onClick={() => toast({
              title: "În curând",
              description: "Această funcționalitate va fi disponibilă în curând!",
            })}
            className="mt-4"
          >
            Creează o Comunitate Nouă
          </ActionButton>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Community;