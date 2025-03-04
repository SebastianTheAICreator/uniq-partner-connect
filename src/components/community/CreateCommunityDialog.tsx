
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Users, Globe, Rocket, Hash, Wand2, Shield, Brain, Video, Heart, Settings, Tag, Tags, Lock, UserPlus, Crown, Lightbulb, Zap, Award } from 'lucide-react';
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

const dynamicSubtitles = [
  "Hub pentru Pasiunile Tale",
  "Spațiu pentru Ideile Tale", 
  "Locul Tău în UniQ",
  "Comunitatea Ta, Regulile Tale"
];

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
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full overflow-hidden text-center space-y-8 max-w-4xl mx-auto rounded-[24px] p-8 sm:p-12 cursor-pointer bg-gradient-to-br from-[#1A1F2C] via-[#222232] to-[#1A1F2C] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(74,144,226,0.15)] hover:shadow-[0_16px_48px_rgba(74,144,226,0.25)] transition-all duration-500"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0.1 }}
              animate={{ 
                opacity: [0.05, 0.1, 0.05],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 60, 
                repeat: Infinity,
                ease: "linear" 
              }}
              className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-primary/20 via-interactive/10 to-accent/20 blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0.1 }}
              animate={{ 
                opacity: [0.05, 0.15, 0.05],
                rotate: [360, 0]
              }}
              transition={{ 
                duration: 50, 
                repeat: Infinity,
                ease: "linear" 
              }}
              className="absolute -bottom-[40%] -left-[40%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-accent/20 via-secondary/10 to-primary/20 blur-3xl"
            />
          </div>
          
          <motion.div 
            className="relative z-10 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col items-center space-y-6">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="relative p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-lg group"
              >
                <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Crown className="w-12 h-12 text-primary group-hover:text-accent transition-colors duration-500" />
              </motion.div>
              
              <div className="space-y-3 text-center max-w-xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-text-shine font-poppins">
                  Creează-ți Propria Comunitate
                </h2>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSubtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-lg sm:text-xl text-white/70 font-inter"
                  >
                    {dynamicSubtitles[currentSubtitle]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-[#1A1F2C]/90 to-[#222232]/90 backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white">Community Type</h3>
                <p className="text-sm text-white/60 text-center">Business, Social, Gaming & Creative</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-[#1A1F2C]/90 to-[#222232]/90 backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-accent/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
                  <Lock className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-white">Privacy Settings</h3>
                <p className="text-sm text-white/60 text-center">Public, Private & Invite-only</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-[#1A1F2C]/90 to-[#222232]/90 backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-secondary/10 transition-all duration-300 sm:col-span-2 lg:col-span-1"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-secondary/20 to-secondary/5">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-white">Content Controls</h3>
                <p className="text-sm text-white/60 text-center">General, 16+ & 18+ Age Restrictions</p>
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-[#1A1F2C] backdrop-blur-sm border border-white/10 text-sm text-white/70 flex items-center gap-2"
              >
                <Tags className="w-4 h-4 text-primary/80" />
                <span>Premium Features</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-[#1A1F2C] backdrop-blur-sm border border-white/10 text-sm text-white/70 flex items-center gap-2"
              >
                <Video className="w-4 h-4 text-secondary/80" />
                <span>Video Integration</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-[#1A1F2C] backdrop-blur-sm border border-white/10 text-sm text-white/70 flex items-center gap-2"
              >
                <Brain className="w-4 h-4 text-accent/80" />
                <span>AI Support</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-[#1A1F2C] backdrop-blur-sm border border-white/10 text-sm text-white/70 flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-interactive/80" />
                <span>Rewards System</span>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block mt-2"
            >
              <Button
                variant="ghost"
                className="group relative overflow-hidden px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-500 w-full sm:w-auto"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative z-10 flex items-center gap-2 justify-center"
                >
                  <span>Lansează Comunitatea</span>
                  <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </motion.span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl bg-gradient-to-br from-[#1A1F2C] via-[#222232] to-[#1A1F2C] backdrop-blur-xl border border-white/10 rounded-[24px] shadow-[0_8px_32px_rgba(74,144,226,0.15)]">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-text-shine">
              {step === 1 ? 'Începe o nouă aventură' : 'Personalizează-ți comunitatea'}
            </DialogTitle>
            <DialogDescription className="text-lg text-white/70">
              {step === 1 ? 'Hai să-ți dăm viață comunității!' : 'Alege interesele care definesc comunitatea ta'}
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
              variant="ghost"
              onClick={() => setStep(1)}
              className="order-2 sm:order-1 flex-1 h-14 text-lg rounded-xl bg-[#1A1F2C]/80 backdrop-blur-sm border border-white/10 hover:bg-[#222232]/80 hover:border-primary/20 text-white/70 hover:text-white transition-all duration-300"
            >
              Înapoi
            </Button>
          )}
          <Button
            onClick={step === 1 ? () => setStep(2) : handleCreateCommunity}
            disabled={step === 1 ? !newCommunityData.name || !newCommunityData.description : newCommunityData.interests.length === 0}
            className={`order-1 sm:order-2 ${step === 1 ? 'w-full' : 'flex-1'} h-14 text-lg rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {step === 1 ? (
              <>
                Continuă
                <Zap className="ml-2 h-5 w-5 animate-pulse" />
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
