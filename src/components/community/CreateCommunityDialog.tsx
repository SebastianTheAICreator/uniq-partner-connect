import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Users, Globe, Rocket, Hash } from 'lucide-react';
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
  const [newCommunityData, setNewCommunityData] = useState({
    name: "",
    description: "",
    interests: [] as string[]
  });

  const interests = [
    "Artă", "Muzică", "Gaming", "Sport", "Tehnologie",
    "Filme", "Cărți", "Călătorii", "Fotografie", "Modă",
    "Dans", "Gătit", "Fitness", "Yoga", "Meditație"
  ];

  const handleCreateCommunity = () => {
    if (newCommunityData.name && newCommunityData.description && newCommunityData.interests.length > 0) {
      onCommunityCreated(newCommunityData);
      toast({
        title: "Comunitate creată cu succes! 🎉",
        description: `"${newCommunityData.name}" este acum live și gata să primească membri.`,
        className: "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-none"
      });
      setNewCommunityData({ name: "", description: "", interests: [] });
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
          className="relative overflow-hidden text-center space-y-6 max-w-2xl mx-auto rounded-2xl p-8 cursor-pointer bg-[#1a1a1a] bg-opacity-80 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(123,_97,_255,_0.15)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-indigo-500/5"
          />
          
          <motion.div className="relative z-10 space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <Rocket className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
                Creează-ți Propria Comunitate
              </h2>
            </div>
            
            <p className="text-gray-300 text-lg">
              Transformă-ți pasiunea într-o comunitate vibrantă și conectează-te cu persoane care împărtășesc aceleași interese.
            </p>

            <div className="flex justify-center space-x-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-purple-400"
              >
                <Users className="w-5 h-5" />
                <span>Comunitate Personalizată</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-pink-400"
              >
                <Globe className="w-5 h-5" />
                <span>Vizibilitate Globală</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-indigo-400"
              >
                <Hash className="w-5 h-5" />
                <span>Hashtag-uri Personalizate</span>
              </motion.div>
            </div>

            <Button
              variant="ghost"
              className="group relative overflow-hidden px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border-2 border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 text-white"
              >
                Începe Aventura
              </motion.span>
              <Sparkles className="ml-2 h-5 w-5 inline-block text-purple-400 group-hover:rotate-12 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-3xl bg-[#1a1a1a] bg-opacity-90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(123,_97,_255,_0.15)]">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
              {step === 1 ? 'Începe o nouă aventură' : 'Personalizează-ți comunitatea'}
            </DialogTitle>
            <DialogDescription className="text-lg text-gray-400">
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
              interests={interests}
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
              className="flex-1 h-14 text-lg rounded-xl bg-white/5 border-2 border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-all duration-300"
            >
              Înapoi
            </Button>
          )}
          <Button
            onClick={step === 1 ? () => setStep(2) : handleCreateCommunity}
            disabled={step === 1 ? !newCommunityData.name || !newCommunityData.description : newCommunityData.interests.length === 0}
            className="flex-1 h-14 text-lg rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-2 border-white/10 hover:border-white/20 transition-all duration-300"
          >
            {step === 1 ? (
              <>
                Continuă
                <Rocket className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                Creează Comunitatea
                <Sparkles className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityDialog;