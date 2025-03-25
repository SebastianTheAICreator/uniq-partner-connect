
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  PenLine, 
  Send, 
  X, 
  Plus, 
  MessageSquarePlus, 
  Wand2,
  Users,
  Images,
  UserCircle,
  AtSign,
  Hash
} from 'lucide-react';
import { cn } from '@/lib/utils';
import PremiumButton from './post/PremiumButton';

interface CreateDiscussionProps {
  onDiscussionCreated: (discussion: {
    title: string;
    description: string;
  }) => void;
}

const CreateDiscussion = ({ onDiscussionCreated }: CreateDiscussionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() && description.trim()) {
      onDiscussionCreated({
        title,
        description
      });
      
      setTitle('');
      setDescription('');
      setIsOpen(false);
      
      toast({
        title: "Discuție creată cu succes! 🎉",
        description: "Noua ta discuție este acum disponibilă pentru comunitate."
      });
    }
  };
  
  // Focus the title input when the form opens
  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  return (
    <div className="relative mb-16 mt-12" id="create-discussion">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className={cn(
                "w-full group relative overflow-hidden",
                "rounded-2xl h-24 sm:h-28 transition-all duration-500",
                "bg-gradient-to-br from-[#1E293B]/90 to-[#0F172A]/90",
                "hover:from-[#1E293B] hover:to-[#0F172A]",
                "border border-indigo-500/20 hover:border-indigo-400/40",
                "shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(79,70,229,0.15)]",
                "backdrop-blur-xl"
              )}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-[80px]"></div>
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-[80px]"></div>
              
              {/* Animated glow */}
              <motion.div 
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 70%)",
                    "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 70%)",
                    "radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 70%)",
                    "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 70%)",
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center px-4">
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div 
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <MessageSquarePlus className="w-5 h-5 text-indigo-300" />
                  </motion.div>
                  
                  <div className="flex flex-col gap-1">
                    <div className="text-2xl font-bold bg-gradient-to-r from-white/90 via-white/80 to-white/90 bg-clip-text text-transparent">
                      Creează o discuție nouă
                    </div>
                    <div className="text-sm text-white/50">
                      Împărtășește idei și conectează-te cu comunitatea
                    </div>
                  </div>
                  
                  <motion.div
                    className="ml-2"
                    animate={{ 
                      scale: [1, 1.15, 1],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-indigo-300" />
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Animated dots */}
              <div className="absolute bottom-3 right-4 flex space-x-1">
                {Array.from({ length: 3 }).map((_, index) => (
                  <motion.div 
                    key={index}
                    className="w-1.5 h-1.5 rounded-full bg-indigo-400/40"
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="relative overflow-hidden rounded-2xl"
            onSubmit={handleSubmit}
          >
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/95 via-[#1E293B]/95 to-[#0F172A]/95 backdrop-blur-xl border border-indigo-500/20 rounded-2xl"></div>
            
            {/* Decorative patterns */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay rounded-2xl"></div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]"></div>
            
            {/* Content */}
            <div className="relative z-10 p-8 sm:p-10">
              <div className="flex justify-between items-center mb-8">
                <motion.h3 
                  className="text-3xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Creează o discuție nouă
                </motion.h3>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full hover:bg-white/5 transition-colors"
                >
                  <X className="h-5 w-5 text-white/60" />
                </Button>
              </div>
              
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Title input */}
                <div className="relative">
                  <div 
                    className={cn(
                      "absolute -inset-0.5 rounded-xl blur-sm transition duration-500",
                      isTitleFocused 
                        ? "opacity-100 bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-indigo-500/50" 
                        : "opacity-0 bg-white/5"
                    )}
                  ></div>
                  
                  <div className="relative flex items-center glass-card rounded-xl overflow-hidden transition-all duration-300 bg-white/[0.03] border border-white/10">
                    <div className={cn(
                      "absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300",
                      isTitleFocused ? "bg-indigo-500" : "bg-transparent"
                    )}></div>
                    
                    <div className={cn(
                      "w-12 flex items-center justify-center transition-colors duration-300",
                      isTitleFocused ? "text-indigo-400" : "text-white/40"
                    )}>
                      <PenLine className="h-5 w-5" />
                    </div>
                    
                    <Input
                      ref={titleInputRef}
                      placeholder="Titlul discuției tale..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onFocus={() => setIsTitleFocused(true)}
                      onBlur={() => setIsTitleFocused(false)}
                      className="flex-1 h-14 text-lg bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/40"
                    />
                  </div>
                </div>
                
                {/* Description input */}
                <div className="relative mt-6">
                  <div 
                    className={cn(
                      "absolute -inset-0.5 rounded-xl blur-sm transition duration-500",
                      isDescriptionFocused 
                        ? "opacity-100 bg-gradient-to-r from-purple-500/50 via-indigo-500/50 to-purple-500/50" 
                        : "opacity-0 bg-white/5"
                    )}
                  ></div>
                  
                  <div className="relative glass-card rounded-xl overflow-hidden transition-all duration-300 bg-white/[0.03] border border-white/10">
                    <div className={cn(
                      "absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300",
                      isDescriptionFocused ? "bg-purple-500" : "bg-transparent"
                    )}></div>
                    
                    <Textarea
                      ref={descriptionRef}
                      placeholder="Descrie despre ce vrei să discuți..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      onFocus={() => setIsDescriptionFocused(true)}
                      onBlur={() => setIsDescriptionFocused(false)}
                      className="min-h-[200px] text-base bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/40 p-6"
                    />
                    
                    {/* Smart suggestions */}
                    {isDescriptionFocused && description.length > 10 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-6 py-3 border-t border-white/5 bg-white/[0.02]"
                      >
                        <div className="flex items-center gap-2 text-xs text-white/40">
                          <Wand2 className="h-3 w-3 text-indigo-400" />
                          <span>Sugestii inteligente:</span>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap gap-2">
                          {["@echipa", "#design", "#dezvoltare", "@alex.popescu"].map((tag, index) => (
                            <motion.button
                              key={tag}
                              type="button"
                              className="text-xs py-1 px-2 rounded-md bg-white/5 hover:bg-white/10 text-white/70 hover:text-white/90 flex items-center gap-1 transition-colors"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              onClick={() => {
                                setDescription(prev => `${prev} ${tag}`);
                                descriptionRef.current?.focus();
                              }}
                            >
                              {tag.startsWith('@') ? (
                                <AtSign className="h-3 w-3 text-indigo-400" />
                              ) : (
                                <Hash className="h-3 w-3 text-purple-400" />
                              )}
                              {tag}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Footer with controls */}
                <motion.div 
                  className="flex justify-between items-center mt-8 pt-4 border-t border-white/5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Left side - engagement tools */}
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-9 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/5"
                    >
                      <Images className="h-4 w-4 mr-2 text-indigo-400" />
                      <span className="text-xs">Atașează media</span>
                    </Button>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-9 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/5"
                    >
                      <Users className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="text-xs">Menționează</span>
                    </Button>
                  </div>
                  
                  {/* Right side - submit actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsOpen(false)}
                      className="h-10 px-5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                    >
                      Anulează
                    </Button>
                    
                    <PremiumButton
                      type="submit"
                      variant="primary"
                      className="h-10 px-6"
                      disabled={!title.trim() || !description.trim()}
                    >
                      <span className="flex items-center">
                        Creează discuția
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </PremiumButton>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateDiscussion;
