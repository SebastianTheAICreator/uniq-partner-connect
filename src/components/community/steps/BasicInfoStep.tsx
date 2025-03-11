
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Rocket, Hash, Sparkles, Lightbulb, Pencil, Star, MessageSquare } from "lucide-react";

interface BasicInfoStepProps {
  name: string;
  description: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

const BasicInfoStep = ({ name, description, onNameChange, onDescriptionChange }: BasicInfoStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="space-y-8"
    >
      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 shadow-lg shadow-indigo-500/5"
            >
              <Pencil className="w-6 h-6 text-indigo-400" />
            </motion.div>
            <Label 
              htmlFor="name" 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-text-shine"
            >
              Numele comunității
            </Label>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative flex items-center">
              <Input
                id="name"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                className="h-16 text-lg bg-black/50 border-2 border-white/10 focus:border-indigo-500/40 rounded-xl backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 pl-14 pr-4"
                placeholder="Ex: Creatorii de conținut digital"
              />
              <Hash className="absolute left-4 text-indigo-400 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute right-4"
              >
                <Star className="h-5 w-5 text-purple-400 animate-pulse" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative space-y-4"
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 shadow-lg shadow-purple-500/5"
            >
              <MessageSquare className="w-6 h-6 text-purple-400" />
            </motion.div>
            <Label 
              htmlFor="description" 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-text-shine"
            >
              Descriere
            </Label>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              className="relative min-h-[180px] text-lg bg-black/50 border-2 border-white/10 focus:border-purple-500/40 rounded-xl backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 p-6"
              placeholder="Descrie viziunea și scopul comunității tale..."
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative flex items-center gap-4 p-6 rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-sm">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.7 }}
            className="p-3 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20"
          >
            <Lightbulb className="w-7 h-7 text-indigo-400" />
          </motion.div>
          <div className="space-y-2">
            <h4 className="text-xl font-semibold text-white">Sfat pentru o comunitate de succes</h4>
            <p className="text-base text-gray-300 leading-relaxed">
              O descriere captivantă și autentică va atrage membri care împărtășesc aceleași valori și pasiuni ca tine.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BasicInfoStep;
