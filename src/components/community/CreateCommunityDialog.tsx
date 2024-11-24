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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

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
        className: "bg-gradient-to-r from-primary/10 to-accent/10 border-none"
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
          className="relative overflow-hidden text-center space-y-6 max-w-2xl mx-auto bg-gradient-to-br from-white/90 via-purple-50/30 to-blue-50/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 cursor-pointer"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"
          />
          
          <motion.div className="relative z-10 space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <Rocket className="w-8 h-8 text-primary animate-pulse" />
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                Creează-ți Propria Comunitate
              </h2>
            </div>
            
            <p className="text-gray-600 text-lg">
              Transformă-ți pasiunea într-o comunitate vibrantă și conectează-te cu persoane care împărtășesc aceleași interese.
            </p>

            <div className="flex justify-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-primary/80"
              >
                <Users className="w-5 h-5" />
                <span>Comunitate Personalizată</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-secondary/80"
              >
                <Globe className="w-5 h-5" />
                <span>Vizibilitate Globală</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-accent/80"
              >
                <Hash className="w-5 h-5" />
                <span>Hashtag-uri Personalizate</span>
              </motion.div>
            </div>

            <Button
              variant="secondary"
              className="group relative overflow-hidden bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-white px-8 py-6 text-lg"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-10"
              >
                Începe Aventura
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <Sparkles className="ml-2 h-5 w-5 inline-block group-hover:rotate-12 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 backdrop-blur-lg border-white/20">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              {step === 1 ? 'Începe o nouă aventură' : 'Personalizează-ți comunitatea'}
            </DialogTitle>
            <DialogDescription className="text-lg text-gray-600">
              {step === 1 ? 'Hai să-ți dăm viață comunității!' : 'Alege interesele care definesc comunitatea ta'}
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid gap-6 py-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg font-medium">
                  Numele comunității
                </Label>
                <Input
                  id="name"
                  value={newCommunityData.name}
                  onChange={(e) => setNewCommunityData(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                  className="bg-white/50 border-white/20 focus:border-primary/50 text-lg py-6"
                  placeholder="Ex: Pasionații de artă digitală"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-lg font-medium">
                  Descriere
                </Label>
                <Textarea
                  id="description"
                  value={newCommunityData.description}
                  onChange={(e) => setNewCommunityData(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                  className="bg-white/50 border-white/20 focus:border-primary/50 min-h-[120px] text-lg"
                  placeholder="Descrie viziunea și scopul comunității tale..."
                />
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-white py-6 text-lg"
                disabled={!newCommunityData.name || !newCommunityData.description}
              >
                Continuă
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 py-4"
            >
              <div className="space-y-4">
                <Label className="text-lg font-medium">
                  Interese (minim unul)
                </Label>
                <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar p-2">
                  {interests.map((interest) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={newCommunityData.interests.includes(interest) ? "default" : "outline"}
                        size="lg"
                        onClick={() => {
                          setNewCommunityData(prev => ({
                            ...prev,
                            interests: prev.interests.includes(interest)
                              ? prev.interests.filter(i => i !== interest)
                              : [...prev.interests, interest]
                          }));
                        }}
                        className={cn(
                          "w-full transition-all duration-300",
                          newCommunityData.interests.includes(interest)
                            ? "bg-gradient-to-r from-primary/80 via-secondary/80 to-accent/80 text-white"
                            : "hover:bg-gradient-to-r hover:from-primary/10 hover:via-secondary/10 hover:to-accent/10"
                        )}
                      >
                        {interest}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 py-6 text-lg"
                >
                  Înapoi
                </Button>
                <Button
                  onClick={handleCreateCommunity}
                  disabled={newCommunityData.interests.length === 0}
                  className="flex-1 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-white py-6 text-lg"
                >
                  Creează Comunitatea
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityDialog;