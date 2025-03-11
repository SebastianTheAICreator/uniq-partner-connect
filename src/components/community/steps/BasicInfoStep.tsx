
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  Hash,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  LayoutGrid,
  Shield,
  Atom,
  Wand2,
  PenLine,
  HeartHandshake,
  BrainCircuit,
  Zap
} from "lucide-react";

interface BasicInfoStepProps {
  name: string;
  description: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

const BasicInfoStep = ({
  name,
  description,
  onNameChange,
  onDescriptionChange,
}: BasicInfoStepProps) => {
  const { toast } = useToast();
  const [nameFocus, setNameFocus] = useState(false);
  const [descFocus, setDescFocus] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const descTextareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Input validation effect
  useEffect(() => {
    setNameValid(name.length >= 3);
  }, [name]);
  
  // Character counter helpers
  const descCharCount = description.length;
  const maxDescChars = 500;
  const descProgress = Math.min(descCharCount / maxDescChars, 1);
  const descCountColor = 
    descCharCount > maxDescChars * 0.9 
      ? "text-amber-400" 
      : descCharCount > maxDescChars 
        ? "text-red-400" 
        : "text-blue-400";
  
  // Auto-resizing textarea
  useEffect(() => {
    if (descTextareaRef.current) {
      descTextareaRef.current.style.height = "0px";
      const scrollHeight = descTextareaRef.current.scrollHeight;
      descTextareaRef.current.style.height = scrollHeight + "px";
    }
  }, [description]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full overflow-hidden pb-8"
    >
      {/* Background overlay effects */}
      <div className="absolute -top-[250px] -left-[250px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[250px] -right-[250px] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-blue-500/10 to-violet-500/10 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 space-y-16">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4"
          >
            <LayoutGrid className="w-8 h-8 text-indigo-400" />
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white">
            Creează-ți comunitatea
          </h1>
          
          <p className="text-white/60 max-w-xl mx-auto">
            Definește identitatea comunității tale cu un nume sugestiv și o descriere captivantă care să atragă membrii potriviți.
          </p>
        </motion.div>

        {/* Name Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
        >
          <div className="relative group">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-end gap-3">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-white/5 shadow-lg shadow-blue-500/5"
                >
                  <PenLine className="w-7 h-7 text-blue-400" />
                </motion.div>
                
                <div className="space-y-1">
                  <Label
                    htmlFor="name"
                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 animate-text-shine"
                  >
                    Numele comunității
                  </Label>
                  
                  <p className="text-white/60 text-sm">
                    Alegerea perfectă influențează identitatea comunității tale
                  </p>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: nameValid ? 1 : 0, scale: nameValid ? 1 : 0.8 }}
                className="ml-auto"
              >
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              </motion.div>
            </div>

            <div className="relative group/input">
              {/* Background blur+glow effect */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ 
                  opacity: nameFocus ? 1 : 0.5, 
                  scale: nameFocus ? 1 : 0.98,
                  boxShadow: nameFocus 
                    ? "0 0 25px rgba(99, 102, 241, 0.3)" 
                    : "0 0 0px rgba(99, 102, 241, 0)"
                }}
                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-blue-500/30 blur-lg transition-all duration-300"
              />
              
              <div className="relative">
                <Hash className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-300 transition-all duration-300 group-hover/input:text-indigo-400" />
                
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: nameValid ? "100%" : "0%" }}
                  className="h-0.5 absolute -bottom-px left-0 right-0 bg-gradient-to-r from-blue-400 to-indigo-600 z-10 rounded-full"
                />
                
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
                  className="h-16 text-lg bg-black/40 border-2 border-indigo-500/20 focus:border-indigo-500/40 rounded-xl backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 pl-14 pr-14"
                  placeholder="Ex: Creatorii Digitali"
                />
                
                <AnimatePresence>
                  {name && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                      onClick={() => onNameChange("")}
                    >
                      <Zap className="h-5 w-5" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Name characters suggestion */}
            <div className="flex justify-between mt-3 px-3">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-white/40 italic"
              >
                Minim 3 caractere
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: name.length > 0 ? 1 : 0 }}
                className="text-xs text-white/40"
              >
                {name.length} caractere
              </motion.div>
            </div>
          </div>

          {/* Description Input Section */}
          <div className="relative group mt-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-end gap-3">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/5 shadow-lg shadow-purple-500/5"
                >
                  <BrainCircuit className="w-7 h-7 text-indigo-400" />
                </motion.div>
                
                <div className="space-y-1">
                  <Label
                    htmlFor="description"
                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-text-shine"
                  >
                    Descrierea comunității
                  </Label>
                  
                  <p className="text-white/60 text-sm">
                    Explică scopul și valorile care definesc comunitatea ta
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group/textarea overflow-hidden">
              {/* Background blur+glow effect */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ 
                  opacity: descFocus ? 1 : 0.5, 
                  scale: descFocus ? 1 : 0.98,
                  boxShadow: descFocus 
                    ? "0 0 25px rgba(139, 92, 246, 0.3)" 
                    : "0 0 0px rgba(139, 92, 246, 0)"
                }}
                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-indigo-500/30 blur-lg transition-all duration-300"
              />
              
              <div className="relative">
                <Textarea
                  ref={descTextareaRef}
                  id="description"
                  value={description}
                  onChange={(e) => onDescriptionChange(e.target.value)}
                  onFocus={() => setDescFocus(true)}
                  onBlur={() => setDescFocus(false)}
                  className="min-h-[180px] resize-none overflow-hidden text-lg bg-black/40 border-2 border-purple-500/20 focus:border-purple-500/40 rounded-xl backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 p-6"
                  placeholder="Descrie viziunea și scopul comunității tale..."
                />
                
                {/* Character count progress circle */}
                <div className="absolute bottom-4 right-4">
                  <div className="relative h-8 w-8">
                    <svg className="h-8 w-8" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(99, 102, 241, 0.8)"
                        strokeWidth="3"
                        strokeDasharray={`${descProgress * 100}, 100`}
                      />
                    </svg>
                    <div className={`absolute inset-0 flex items-center justify-center text-xs font-medium ${descCountColor}`}>
                      {descCharCount > maxDescChars ? `+${descCharCount - maxDescChars}` : Math.round(descProgress * 100) + "%"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Character count info */}
            <div className="flex justify-between mt-3 px-3">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-xs ${
                  descCharCount > maxDescChars 
                    ? "text-red-400" 
                    : "text-white/40"
                }`}
              >
                {descCharCount > maxDescChars 
                  ? `Ai depășit limita cu ${descCharCount - maxDescChars} caractere` 
                  : `${maxDescChars - descCharCount} caractere rămase`}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Tip Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative mt-10 group"
          whileHover={{ y: -5 }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-purple-500/30 rounded-2xl blur-lg opacity-30 group-hover:opacity-100 transition-all duration-700"></div>
          
          <div className="relative flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-blue-950/80 via-indigo-950/80 to-purple-950/80 border border-white/10 backdrop-blur-xl">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.7 }}
              className="p-3 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30"
            >
              <Lightbulb className="w-7 h-7 text-amber-400" />
            </motion.div>
            
            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-gradient-blue-purple">Sfat pentru succes</h4>
              <p className="text-white/70 leading-relaxed">
                O descriere autentică și detaliată ajută membrii potențiali să înțeleagă rapid dacă valorile 
                comunității tale se aliniază cu interesele lor, crescând astfel rata de conversie.
              </p>
              
              <div className="pt-3 flex flex-wrap gap-2">
                {['Autenticitate', 'Claritate', 'Valori', 'Scop'].map(tag => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* AI Assistant Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center"
        >
          <button
            type="button"
            onClick={() => {
              if (!description) {
                toast({
                  title: "AI Assistant",
                  description: "Generăm o descriere pentru comunitatea ta...",
                });
                
                setTimeout(() => {
                  onDescriptionChange("O comunitate dedicată profesioniștilor și pasionaților de creație digitală, unde împărtășim idei, resurse și experiențe pentru a ne dezvolta împreună. Un spațiu sigur și inspirațional pentru networking, învățare continuă și colaborare.");
                }, 1500);
              }
            }}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-indigo-300 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 border border-indigo-500/20 hover:border-indigo-500/30 transition-all duration-300"
          >
            <Wand2 className="w-4 h-4 text-indigo-400 group-hover:animate-pulse" />
            <span>Generează descriere cu AI Assistant</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BasicInfoStep;
