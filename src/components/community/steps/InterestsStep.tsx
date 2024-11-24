import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

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
      className="space-y-6"
    >
      <div className="space-y-4">
        <Label className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Alege interesele comunității tale
        </Label>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto custom-scrollbar p-2">
          {interests.map((interest) => (
            <motion.div
              key={interest}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="ghost"
                size="lg"
                onClick={() => onInterestToggle(interest)}
                className={cn(
                  "w-full h-14 text-base font-medium rounded-xl transition-all duration-300",
                  selectedInterests.includes(interest)
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-white/20 text-white"
                    : "bg-white/5 border-2 border-white/10 hover:border-white/20 hover:bg-white/10 text-gray-300 hover:text-white"
                )}
              >
                {selectedInterests.includes(interest) && (
                  <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
                )}
                {interest}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default InterestsStep;