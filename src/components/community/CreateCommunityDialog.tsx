import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Users, Globe, Rocket, Hash, Wand2 } from 'lucide-react';
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
        className: "bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border-none"
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
          className="relative overflow-hidden text-center space-y-6 max-w-2xl mx-auto rounded-3xl p-8 cursor-pointer bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30 shadow-[0_8px_32px_rgba(74,144,226,0.1)] hover:shadow-[0_12px_36px_rgba(74,144,226,0.2)] transition-all duration-500"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 opacity-50"
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
                className="p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 backdrop-blur-lg shadow-lg"
              >
                <Wand2 className="w-8 h-8 text-blue-500" />
              </motion.div>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500 font-poppins">
                Creează-ți Propria Comunitate
              </h2>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto font-inter">
              Transformă-ți pasiunea într-o comunitate vibrantă și conectează-te cu persoane care împărtășesc aceleași interese.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center space-y-2 p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 via-white to-emerald-500/5 shadow-lg"
              >
                <Users className="w-6 h-6 text-blue-500" />
                <span className="text-gray-700 font-medium font-inter">Comunitate Personalizată</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center space-y-2 p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 via-white to-emerald-500/5 shadow-lg"
              >
                <Globe className="w-6 h-6 text-emerald-500" />
                <span className="text-gray-700 font-medium font-inter">Vizibilitate Globală</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center space-y-2 p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 via-white to-emerald-500/5 shadow-lg"
              >
                <Hash className="w-6 h-6 text-blue-500" />
                <span className="text-gray-700 font-medium font-inter">Hashtag-uri Personalizate</span>
              </motion.div>
            </div>

            <Button
              variant="ghost"
              className="group relative overflow-hidden px-8 py-6 text-lg font-medium rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-inter transition-all duration-500 hover:shadow-xl shadow-lg"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 flex items-center gap-2"
              >
                Începe Aventura
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </motion.span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Button>
          </motion.div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-3xl bg-gradient-to-br from-blue-500/5 via-white to-emerald-500/5 backdrop-blur-xl border border-blue-200/20 rounded-3xl shadow-[0_0_40px_rgba(74,144,226,0.2)]">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500">
              {step === 1 ? 'Începe o nouă aventură' : 'Personalizează-ți comunitatea'}
            </DialogTitle>
            <DialogDescription className="text-lg text-gray-600">
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
              className="flex-1 h-14 text-lg rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-gray-600 hover:text-gray-700 transition-all duration-300"
            >
              Înapoi
            </Button>
          )}
          <Button
            onClick={step === 1 ? () => setStep(2) : handleCreateCommunity}
            disabled={step === 1 ? !newCommunityData.name || !newCommunityData.description : newCommunityData.interests.length === 0}
            className="flex-1 h-14 text-lg rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 1 ? (
              <>
                Continuă
                <Rocket className="ml-2 h-5 w-5 animate-pulse" />
              </>
            ) : (
              <>
                Creează Comunitatea
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