import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Rocket, Hash, Sparkles } from "lucide-react";

interface BasicInfoStepProps {
  name: string;
  description: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

const BasicInfoStep = ({ name, description, onNameChange, onDescriptionChange }: BasicInfoStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-8"
    >
      <div className="space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
          </motion.div>
          <Label 
            htmlFor="name" 
            className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-text-shine"
          >
            Numele comunității
          </Label>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <Input
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="relative h-14 text-lg bg-black/50 border-2 border-white/10 focus:border-white/20 rounded-xl backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 pl-12"
            placeholder="Ex: Pasionații de artă digitală"
          />
          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
        </motion.div>
      </div>

      <div className="space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="p-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 text-pink-400" />
          </motion.div>
          <Label 
            htmlFor="description" 
            className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 animate-text-shine"
          >
            Descriere
          </Label>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="relative min-h-[160px] text-lg bg-black/50 border-2 border-white/10 focus:border-white/20 rounded-xl backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20"
            placeholder="Descrie viziunea și scopul comunității tale..."
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-white/10 backdrop-blur-sm"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20"
        >
          <Rocket className="w-6 h-6 text-purple-400" />
        </motion.div>
        <div className="space-y-1">
          <h4 className="font-medium text-white">Sfat pentru o descriere bună</h4>
          <p className="text-sm text-gray-300">
            O descriere detaliată și clară va ajuta membrii să înțeleagă mai bine scopul și valorile comunității tale.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BasicInfoStep;