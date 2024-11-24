import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

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
      className="space-y-6"
    >
      <div className="space-y-4">
        <Label htmlFor="name" className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Numele comunității
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="h-14 text-lg bg-white/5 border-2 border-white/10 focus:border-white/20 rounded-xl backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20"
          placeholder="Ex: Pasionații de artă digitală"
        />
      </div>

      <div className="space-y-4">
        <Label htmlFor="description" className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Descriere
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="min-h-[160px] text-lg bg-white/5 border-2 border-white/10 focus:border-white/20 rounded-xl backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20"
          placeholder="Descrie viziunea și scopul comunității tale..."
        />
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 border border-white/10">
        <Rocket className="w-6 h-6 text-purple-400" />
        <p className="text-sm text-gray-300">
          O descriere bună ajută membrii să înțeleagă scopul și valorile comunității tale.
        </p>
      </div>
    </motion.div>
  );
};

export default BasicInfoStep;