import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, Tag, Heart } from "lucide-react";

interface InterestsStepProps {
  interests: string[];
  selectedInterests: string[];
  onInterestToggle: (interest: string) => void;
}

const InterestsStep = ({ interests, selectedInterests, onInterestToggle }: InterestsStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10"
          >
            <Tag className="w-6 h-6 text-purple-400" />
          </motion.div>
          <Label className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-text-shine">
            Alege interesele comunității
          </Label>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar p-2">
          {interests.map((interest, index) => (
            <motion.div
              key={interest}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="ghost"
                onClick={() => onInterestToggle(interest)}
                className={cn(
                  "w-full h-16 text-lg font-medium rounded-xl transition-all duration-300 relative group overflow-hidden",
                  selectedInterests.includes(interest)
                    ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-white/20 text-white"
                    : "bg-black/30 border-2 border-white/10 hover:border-white/20 hover:bg-white/10 text-gray-300 hover:text-white"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-2">
                  {selectedInterests.includes(interest) ? (
                    <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 to-pink-500/50 blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative p-6 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-white/10 backdrop-blur-sm rounded-xl">
          <p className="text-gray-300 text-center">
            Alege până la 5 interese pentru a ajuta membrii să descopere comunitatea ta
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InterestsStep;