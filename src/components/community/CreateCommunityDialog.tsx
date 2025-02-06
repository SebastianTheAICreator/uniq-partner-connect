
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Users, Globe, Rocket, Hash, Wand2, Shield, Brain, Video, Heart, Settings, Tag, Tags, Lock, UserPlus } from 'lucide-react';
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
          className="relative overflow-hidden text-center space-y-8 max-w-4xl mx-auto rounded-[32px] p-12 cursor-pointer bg-gradient-to-br from-[#4A90E2]/10 via-[#42E695]/10 to-[#4A90E2]/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(74,144,226,0.2)] hover:shadow-[0_16px_48px_rgba(74,144,226,0.3)] transition-all duration-500"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/5 via-[#42E695]/5 to-[#4A90E2]/5 opacity-50"
          />
          
          <motion.div 
            className="relative z-10 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-full bg-gradient-to-r from-[#4A90E2]/10 to-[#42E695]/10 backdrop-blur-lg group"
              >
                <Wand2 className="w-12 h-12 text-[#4A90E2] group-hover:text-[#42E695] transition-colors duration-300" />
              </motion.div>
              <div className="space-y-2 text-center">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4A90E2] to-[#42E695] font-poppins">
                  Creează-ți Propria Comunitate
                </h2>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSubtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-xl text-gray-400 font-inter"
                  >
                    {dynamicSubtitles[currentSubtitle]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-[#4A90E2]/5 via-white/5 to-[#42E695]/5 backdrop-blur-sm border border-white/10 shadow-lg"
              >
                <Settings className="w-8 h-8 text-[#4A90E2]" />
                <h3 className="text-lg font-semibold text-white">Community Type</h3>
                <p className="text-sm text-gray-400 text-center">Business, Social, Creative & Gaming</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-[#4A90E2]/5 via-white/5 to-[#42E695]/5 backdrop-blur-sm border border-white/10 shadow-lg"
              >
                <Lock className="w-8 h-8 text-[#42E695]" />
                <h3 className="text-lg font-semibold text-white">Privacy Settings</h3>
                <p className="text-sm text-gray-400 text-center">Public, Private & Invite-only</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-[#4A90E2]/5 via-white/5 to-[#42E695]/5 backdrop-blur-sm border border-white/10 shadow-lg"
              >
                <Shield className="w-8 h-8 text-[#4A90E2]" />
                <h3 className="text-lg font-semibold text-white">Age Restriction</h3>
                <p className="text-sm text-gray-400 text-center">General, 16+ & 18+</p>
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300"
              >
                <Tags className="w-4 h-4 inline-block mr-2" />
                UniBanking Integration
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300"
              >
                <Video className="w-4 h-4 inline-block mr-2" />
                UniVideo Connect
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300"
              >
                <Brain className="w-4 h-4 inline-block mr-2" />
                Ol-y AI Support
              </motion.div>
            </div>

            <Button
              variant="ghost"
              className="group relative overflow-hidden px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-[#4A90E2] to-[#42E695] hover:from-[#4A90E2]/90 hover:to-[#42E695]/90 text-white shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 flex items-center gap-2"
              >
                Lansează Comunitatea
                <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </motion.span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Button>
          </motion.div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl bg-gradient-to-br from-[#4A90E2]/5 via-white/5 to-[#42E695]/5 backdrop-blur-xl border border-[#4A90E2]/20 rounded-[24px] shadow-[0_8px_32px_rgba(74,144,226,0.1)]">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <DialogTitle className="text-3xl font-bold text-[#4A90E2]">
              {step === 1 ? 'Începe o nouă aventură' : 'Personalizează-ți comunitatea'}
            </DialogTitle>
            <DialogDescription className="text-lg text-[#4A5568]">
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
                "Dans", "Gătit", "Fitness", "Yoga", "Meditație"
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

        <div className="flex justify-between gap-4 mt-6">
          {step === 2 && (
            <Button
              variant="ghost"
              onClick={() => setStep(1)}
              className="flex-1 h-14 text-lg rounded-xl bg-white/50 backdrop-blur-sm border border-[#4A90E2]/20 hover:bg-white/60 hover:border-[#4A90E2]/30 text-[#4A5568] hover:text-[#4A90E2] transition-all duration-300"
            >
              Înapoi
            </Button>
          )}
          <Button
            onClick={step === 1 ? () => setStep(2) : handleCreateCommunity}
            disabled={step === 1 ? !newCommunityData.name || !newCommunityData.description : newCommunityData.interests.length === 0}
            className="flex-1 h-14 text-lg rounded-xl bg-gradient-to-r from-[#4A90E2] to-[#42E695] hover:from-[#4A90E2]/90 hover:to-[#42E695]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 1 ? (
              <>
                Continuă
                <Rocket className="ml-2 h-5 w-5 animate-pulse" />
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
