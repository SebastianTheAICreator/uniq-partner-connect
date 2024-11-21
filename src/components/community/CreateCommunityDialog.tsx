import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
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
  const [newCommunityData, setNewCommunityData] = useState({
    name: "",
    description: "",
    interests: [] as string[]
  });

  // Sample interests - you can expand this list
  const interests = [
    "Artă", "Muzică", "Gaming", "Sport", "Tehnologie",
    "Filme", "Cărți", "Călătorii", "Fotografie", "Modă",
    "Dans", "Gătit", "Fitness", "Yoga", "Meditație"
  ];

  const handleCreateCommunity = () => {
    if (newCommunityData.name && newCommunityData.description && newCommunityData.interests.length > 0) {
      onCommunityCreated(newCommunityData);
      toast({
        title: "Comunitate creată",
        description: `Comunitatea "${newCommunityData.name}" a fost creată cu succes!`,
      });
      setNewCommunityData({ name: "", description: "", interests: [] });
    } else {
      toast({
        title: "Eroare",
        description: "Te rugăm să completezi toate câmpurile necesare.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-center space-y-6 max-w-2xl mx-auto bg-gradient-to-br from-white/90 via-purple-50/30 to-blue-50/30 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20 cursor-pointer"
        >
          <h2 className="text-2xl font-semibold gradient-text">Nu găsești ce cauți?</h2>
          <p className="text-gray-600">
            Creează propria ta comunitate și conectează-te cu persoane care împărtășesc aceleași pasiuni ca tine.
          </p>
          <Button
            variant="secondary"
            className="group bg-gradient-to-r from-primary/80 via-secondary/80 to-accent/80 hover:from-primary hover:via-secondary hover:to-accent text-white"
          >
            Creează o Comunitate Nouă
            <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 backdrop-blur-lg border-white/20">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <DialogTitle className="text-2xl font-bold gradient-text">
              Creează o comunitate nouă
            </DialogTitle>
            <DialogDescription>
              Completează detaliile pentru noua ta comunitate. Fă-o unică și atractivă!
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6 py-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Numele comunității
            </Label>
            <Input
              id="name"
              value={newCommunityData.name}
              onChange={(e) => setNewCommunityData(prev => ({
                ...prev,
                name: e.target.value
              }))}
              className="bg-white/50 border-white/20 focus:border-primary/50"
              placeholder="Ex: Pasionații de artă"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Descriere
            </Label>
            <Textarea
              id="description"
              value={newCommunityData.description}
              onChange={(e) => setNewCommunityData(prev => ({
                ...prev,
                description: e.target.value
              }))}
              className="bg-white/50 border-white/20 focus:border-primary/50 min-h-[100px]"
              placeholder="Descrie scopul și viziunea comunității tale..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Interese (selectează minim unul)
            </Label>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto custom-scrollbar p-2">
              <AnimatePresence>
                {interests.map((interest) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={newCommunityData.interests.includes(interest) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setNewCommunityData(prev => ({
                          ...prev,
                          interests: prev.interests.includes(interest)
                            ? prev.interests.filter(i => i !== interest)
                            : [...prev.interests, interest]
                        }));
                      }}
                      className={cn(
                        "text-sm transition-all duration-300",
                        newCommunityData.interests.includes(interest)
                          ? "bg-gradient-to-r from-primary/80 via-secondary/80 to-accent/80 text-white"
                          : "hover:bg-gradient-to-r hover:from-primary/10 hover:via-secondary/10 hover:to-accent/10"
                      )}
                    >
                      {interest}
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-end"
        >
          <Button
            onClick={handleCreateCommunity}
            className="bg-gradient-to-r from-primary via-secondary to-accent text-white hover:opacity-90 transition-opacity"
          >
            Creează comunitatea
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityDialog;