
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, Tag, Heart, Plus, X, Star, Bookmark, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { addCustomInterest, getAllCustomInterests } from "@/db/database";

interface InterestsStepProps {
  interests: string[];
  selectedInterests: string[];
  onInterestToggle: (interest: string) => void;
}

const InterestsStep = ({ interests: defaultInterests, selectedInterests, onInterestToggle }: InterestsStepProps) => {
  const [interests, setInterests] = useState(defaultInterests);
  const [newInterest, setNewInterest] = useState("");
  const [isAddingInterest, setIsAddingInterest] = useState(false);
  const { toast } = useToast();

  // Încarcă interesele salvate când componenta se montează
  useEffect(() => {
    const loadSavedInterests = async () => {
      try {
        console.log('Loading saved interests from database');
        const savedInterests = await getAllCustomInterests();
        const savedInterestNames = savedInterests.map(interest => interest.name);
        setInterests(prev => [...new Set([...prev, ...savedInterestNames])]);
        console.log('Successfully loaded saved interests:', savedInterestNames);
      } catch (error) {
        console.error('Error loading saved interests:', error);
        toast({
          title: "Eroare la încărcarea intereselor",
          description: "Nu am putut încărca interesele salvate. Te rugăm să încerci din nou.",
          variant: "destructive"
        });
      }
    };

    loadSavedInterests();
  }, [toast]);

  const handleAddCustomInterest = async () => {
    if (newInterest.trim()) {
      if (interests.includes(newInterest.trim())) {
        toast({
          title: "Acest interes există deja",
          description: "Te rugăm să alegi un alt nume pentru interesul tău.",
          variant: "destructive"
        });
        return;
      }

      try {
        console.log('Adding new custom interest:', newInterest.trim());
        await addCustomInterest(newInterest.trim());
        setInterests(prev => [...prev, newInterest.trim()]);
        setNewInterest("");
        setIsAddingInterest(false);
        
        toast({
          title: "Interes adăugat cu succes! 🎉",
          description: "Interesul tău a fost salvat și va fi disponibil și data viitoare.",
          className: "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-none"
        });
      } catch (error) {
        console.error('Error saving custom interest:', error);
        toast({
          title: "Eroare la salvare",
          description: "Nu am putut salva noul interes. Te rugăm să încerci din nou.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="space-y-8"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 shadow-lg shadow-indigo-500/5"
          >
            <Tag className="w-6 h-6 text-indigo-400" />
          </motion.div>
          <Label className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-text-shine">
            Alege interesele comunității
          </Label>
        </motion.div>

        {!isAddingInterest ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsAddingInterest(true)}
            className="w-full p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 hover:border-white/20 backdrop-blur-sm group transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-2 text-gray-300 group-hover:text-white">
              <Plus className="w-5 h-5" />
              <span>Adaugă un interes personalizat</span>
            </div>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm shadow-lg shadow-indigo-500/5"
          >
            <div className="flex gap-2">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Scrie numele noului interes..."
                className="flex-1 bg-black/20 border-white/10 focus:border-indigo-500/40 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500/20"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddCustomInterest();
                  }
                }}
              />
              <Button
                onClick={() => setIsAddingInterest(false)}
                variant="frost"
                className="p-2 aspect-square hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <Button
              onClick={handleAddCustomInterest}
              disabled={!newInterest.trim()}
              variant="aurora"
              className="w-full"
            >
              <Plus className="mr-2 w-4 h-4" />
              Adaugă interes
            </Button>
          </motion.div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[350px] overflow-y-auto custom-scrollbar p-2">
          {interests.map((interest, index) => (
            <motion.div
              key={interest}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                variant={selectedInterests.includes(interest) ? "cosmos" : "frost"}
                onClick={() => onInterestToggle(interest)}
                className="w-full h-14 text-lg font-medium rounded-xl transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-2">
                  {selectedInterests.includes(interest) ? (
                    <Check className="w-5 h-5 text-indigo-400" />
                  ) : (
                    <Star className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  {interest}
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative group rounded-xl overflow-hidden"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative flex items-center gap-4 p-6 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-sm rounded-xl">
          <Bookmark className="h-6 w-6 text-indigo-400" />
          <p className="text-gray-300">
            Selectează până la <span className="text-white font-medium">5 interese</span> pentru a ajuta membrii să descopere comunitatea ta
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InterestsStep;
