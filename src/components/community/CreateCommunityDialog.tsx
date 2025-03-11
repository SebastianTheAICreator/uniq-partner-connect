
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Users, 
  Globe, 
  Rocket, 
  Shield, 
  Crown, 
  Lock, 
  Zap, 
  ArrowRight, 
  MessageCircle, 
  Hash, 
  Upload, 
  Award,
  Star,
  Check,
  BadgeCheck,
  Layers,
  Gem
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BasicInfoStep from './steps/BasicInfoStep';
import InterestsStep from './steps/InterestsStep';

interface CreateCommunityDialogProps {
  onCommunityCreated: (community: {
    name: string;
    description: string;
    interests: string[];
  }) => void;
}

const CreateCommunityDialog = ({ onCommunityCreated }: CreateCommunityDialogProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [newCommunityData, setNewCommunityData] = useState({
    name: "",
    description: "",
    interests: [] as string[],
    type: "social",
    privacy: "public",
    ageRestriction: "general",
    monetization: "free",
    contentFocus: "discussion"
  });

  const dynamicSubtitles = [
    "Construiește Un Univers Digital",
    "Dă Viață Viziunii Tale", 
    "Unește Pasionații Sub Un Singur Acoperiș",
    "De La Concept La Comunitate"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % dynamicSubtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateCommunity = () => {
    if (newCommunityData.name && newCommunityData.description && newCommunityData.interests.length > 0) {
      onCommunityCreated(newCommunityData);
      toast({
        title: "Comunitate creată cu succes! 🎉",
        description: `"${newCommunityData.name}" este acum live și gata să primească membri.`,
        className: "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-none"
      });
      setNewCommunityData({ 
        name: "", 
        description: "", 
        interests: [],
        type: "social",
        privacy: "public",
        ageRestriction: "general",
        monetization: "free",
        contentFocus: "discussion"
      });
      setStep(1);
    } else {
      toast({
        title: "Informații incomplete",
        description: "Te rugăm să completezi toate câmpurile necesare.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02, y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full overflow-hidden text-center space-y-8 max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 cursor-pointer bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(98,114,164,0.15)] hover:shadow-[0_16px_48px_rgba(129,140,248,0.25)] transition-all duration-500"
        >
          {/* Premium background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0.05 }}
              animate={{ 
                opacity: [0.02, 0.08, 0.02],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 60, 
                repeat: Infinity,
                ease: "linear" 
              }}
              className="absolute -top-[30%] -right-[30%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0.05 }}
              animate={{ 
                opacity: [0.03, 0.09, 0.03],
                rotate: [360, 0]
              }}
              transition={{ 
                duration: 50, 
                repeat: Infinity,
                ease: "linear" 
              }}
              className="absolute -bottom-[30%] -left-[30%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-indigo-500/10 blur-3xl"
            />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10" />
          </div>
          
          <motion.div 
            className="relative z-10 space-y-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col items-center space-y-6">
              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative p-4 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-lg shadow-lg shadow-indigo-500/10 group"
              >
                <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="p-2 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-xl">
                  <Crown className="w-12 h-12 text-white group-hover:text-purple-300 transition-colors duration-500" />
                </div>
              </motion.div>
              
              <div className="space-y-3 text-center max-w-xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-text-shine font-poppins tracking-tight">
                  Creează-ți Propriul Univers Digital
                </h2>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSubtitle}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xl sm:text-2xl text-white/70 font-inter"
                  >
                    {dynamicSubtitles[currentSubtitle]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-[#0F172A]/90 to-[#1E293B]/90 backdrop-blur-sm border border-white/10 shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-indigo-500/5">
                  <Shield className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Securitate Premium</h3>
                <p className="text-sm text-white/60 text-center">Control deplin asupra accesului și visibilității</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-[#0F172A]/90 to-[#1E293B]/90 backdrop-blur-sm border border-white/10 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-purple-500/5">
                  <Layers className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Instrumente Avansate</h3>
                <p className="text-sm text-white/60 text-center">Personalizează experiența membrilor tăi</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-[#0F172A]/90 to-[#1E293B]/90 backdrop-blur-sm border border-white/10 shadow-lg shadow-pink-500/5 hover:shadow-pink-500/10 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500/20 to-pink-500/5">
                  <Gem className="w-7 h-7 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Experiență Premium</h3>
                <p className="text-sm text-white/60 text-center">Design intuitiv cu funcții exclusive</p>
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-[#1A1F2C] backdrop-blur-sm border border-white/10 text-sm text-white/70 flex items-center gap-2"
              >
                <BadgeCheck className="w-4 h-4 text-indigo-400" />
                <span>Moderare Avansată</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-[#1A1F2C] backdrop-blur-sm border border-white/10 text-sm text-white/70 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-purple-400" />
                <span>Chat Dedicat</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-[#1A1F2C] backdrop-blur-sm border border-white/10 text-sm text-white/70 flex items-center gap-2"
              >
                <Upload className="w-4 h-4 text-pink-400" />
                <span>Upload Nelimitat</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-[#1A1F2C] backdrop-blur-sm border border-white/10 text-sm text-white/70 flex items-center gap-2"
              >
                <Star className="w-4 h-4 text-amber-400" />
                <span>Statistici Detaliate</span>
              </motion.div>
            </div>

            <Button
              variant="frost"
              size="2xl"
              rounded="2xl"
              className="relative group overflow-hidden w-full sm:w-auto px-10"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 flex items-center gap-3 justify-center font-medium"
              >
                <span className="text-lg">Lansează Comunitatea Ta</span>
                <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </motion.span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Button>
          </motion.div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(98,114,164,0.2)]">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-text-shine">
              {step === 1 ? 'Definește-ți comunitatea' : 'Personalizează experiența'}
            </DialogTitle>
            <DialogDescription className="text-lg text-white/70">
              {step === 1 ? 'Creează un spațiu unde ideile prind viață' : 'Conectează-te cu cei care împărtășesc aceleași pasiuni'}
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <BasicInfoStep
              name={newCommunityData.name}
              description={newCommunityData.description}
              onNameChange={(value) => setNewCommunityData(prev => ({ ...prev, name: value }))}
              onDescriptionChange={(value) => setNewCommunityData(prev => ({ ...prev, description: value }))}
            />
          ) : (
            <InterestsStep
              interests={[
                "Artă", "Muzică", "Gaming", "Sport", "Tehnologie",
                "Filme", "Cărți", "Călătorii", "Fotografie", "Modă",
                "Dans", "Gătit", "Fitness", "Yoga", "Meditație",
                "Crypto", "NFTs", "Metaverse", "Inteligență Artificială", "Realitate Virtuală",
                "Business", "Investiții", "Marketing", "Design", "Dezvoltare Personală"
              ]}
              selectedInterests={newCommunityData.interests}
              onInterestToggle={(interest) => {
                setNewCommunityData(prev => ({
                  ...prev,
                  interests: prev.interests.includes(interest)
                    ? prev.interests.filter(i => i !== interest)
                    : [...prev.interests, interest]
                }));
              }}
            />
          )}
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          {step === 2 && (
            <Button
              variant="frost"
              onClick={() => setStep(1)}
              className="order-2 sm:order-1 flex-1 h-14 text-lg rounded-xl"
            >
              Înapoi
            </Button>
          )}
          <Button
            variant="aurora"
            onClick={step === 1 ? () => setStep(2) : handleCreateCommunity}
            disabled={step === 1 ? !newCommunityData.name || !newCommunityData.description : newCommunityData.interests.length === 0}
            className={`order-1 sm:order-2 ${step === 1 ? 'w-full' : 'flex-1'} h-14 text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {step === 1 ? (
              <>
                Continuă
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                Lansează Comunitatea
                <Sparkles className="ml-2 h-5 w-5 animate-pulse" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityDialog;
