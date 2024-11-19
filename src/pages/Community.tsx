import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, MessageCircle, Heart, Sparkles, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import ActionButton from "@/components/ActionButton";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const categories = [
    { name: "Arte & Cultură", icon: Sparkles, color: "from-purple-500/10 to-pink-500/5" },
    { name: "Gaming & Tech", icon: Shield, color: "from-blue-500/10 to-cyan-500/5" },
    { name: "LGBTQ+", icon: Heart, color: "from-pink-500/10 to-rose-500/5" },
    { name: "Lifestyle", icon: Users, color: "from-green-500/10 to-emerald-500/5" },
    { name: "Muzică", icon: MessageCircle, color: "from-yellow-500/10 to-amber-500/5" },
    { name: "Sport & Fitness", icon: Shield, color: "from-red-500/10 to-orange-500/5" },
    { name: "Spiritualitate", icon: Sparkles, color: "from-indigo-500/10 to-violet-500/5" },
    { name: "Hobby-uri", icon: Heart, color: "from-teal-500/10 to-emerald-500/5" },
  ];

  const handleJoinCommunity = (category: string) => {
    toast({
      title: "Comunitate nouă",
      description: `Te-ai alăturat comunității: ${category}`,
    });
    console.log("Joined community:", category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      
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
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl overflow-hidden hover-lift"
              >
                <div className={`p-6 space-y-4 bg-gradient-to-br ${category.color}`}>
                  <div className="flex items-center justify-between">
                    <category.icon className="w-8 h-8 text-primary" />
                    <span className="text-sm text-gray-500">
                      {Math.floor(Math.random() * 1000 + 100)} membri
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                  
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <MessageCircle className="h-4 w-4" />
                    <span>{Math.floor(Math.random() * 50 + 10)} conversații active</span>
                  </div>

                  <ActionButton
                    onClick={() => handleJoinCommunity(category.name)}
                    className="w-full group flex items-center justify-center space-x-2 bg-white/50 hover:bg-white/80"
                  >
                    <Heart className="h-5 w-5 group-hover:text-primary transition-colors" />
                    <span>Alătură-te</span>
                  </ActionButton>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center space-y-6 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-semibold gradient-text">Nu găsești ce cauți?</h2>
            <p className="text-gray-600">
              Creează propria ta comunitate și conectează-te cu persoane care împărtășesc aceleași pasiuni ca tine.
            </p>
            <ActionButton
              variant="secondary"
              onClick={() => toast({
                title: "În curând",
                description: "Această funcționalitate va fi disponibilă în curând!",
              })}
              className="group"
            >
              Creează o Comunitate Nouă
              <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </ActionButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Community;