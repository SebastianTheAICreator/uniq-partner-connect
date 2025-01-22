import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Sparkles, MessageSquarePlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreateDiscussionProps {
  onDiscussionCreated: (discussion: { title: string; description: string }) => void;
}

const CreateDiscussion = ({ onDiscussionCreated }: CreateDiscussionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onDiscussionCreated({ title, description });
      setTitle('');
      setDescription('');
      setIsOpen(false);
      toast({
        title: "Discuție creată cu succes! 🎉",
        description: "Noua ta discuție este acum disponibilă pentru comunitate.",
      });
    }
  };

  return (
    <div className="mb-6">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="group relative w-full h-14 bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-pink-900/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-indigo-500/20 hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <motion.div
                className="relative z-10 flex items-center justify-center space-x-2 text-lg font-medium text-white"
                whileHover={{ scale: 1.02 }}
              >
                <MessageSquarePlus className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <span>Creează o discuție nouă</span>
                <Sparkles className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
              </motion.div>
            </Button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative space-y-6 p-8 bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-pink-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            onSubmit={handleSubmit}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"
            />

            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  Creează o discuție nouă
                </h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full hover:bg-white/5 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Titlul discuției"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full h-12 text-lg font-medium bg-white/5 border-white/10 focus:border-indigo-500/20 rounded-xl text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 hover:bg-white/10"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Descrie despre ce vrei să discuți..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full min-h-[150px] text-base bg-white/5 border-white/10 focus:border-indigo-500/20 rounded-xl text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 hover:bg-white/10"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="px-6 h-12 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 hover:text-white transition-all duration-300"
                >
                  Anulează
                </Button>
                <Button
                  type="submit"
                  className={cn(
                    "relative overflow-hidden px-6 h-12 rounded-xl",
                    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
                    "hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600",
                    "text-white font-medium",
                    "border border-white/10 hover:border-white/20",
                    "transition-all duration-300",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                  disabled={!title.trim() || !description.trim()}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-pink-400/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <span className="relative z-10 flex items-center">
                    Creează discuția
                    <Sparkles className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateDiscussion;