import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Sparkles, MessageSquarePlus, PenLine, Send } from 'lucide-react';
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
    <div className="mb-16 mt-12">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="group relative w-full h-20 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="relative z-10 flex items-center justify-center space-x-3 text-xl font-medium"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquarePlus className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <span className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent font-bold">
                  Creează o discuție nouă
                </span>
                <Sparkles className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors animate-pulse" />
              </motion.div>
            </Button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative space-y-6 p-8 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-pink-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            onSubmit={handleSubmit}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"
            />

            <div className="relative z-10 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
              >
                <motion.h3 
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
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
                  <X className="h-5 w-5 text-gray-400" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <div className="relative group">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-1000"
                  />
                  <div className="relative flex items-center">
                    <PenLine className="absolute left-4 text-indigo-400 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <Input
                      placeholder="Titlul discuției tale..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full h-14 pl-12 text-lg bg-black/50 border-2 border-white/10 focus:border-white/20 rounded-xl backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-1000"
                  />
                  <Textarea
                    placeholder="Descrie despre ce vrei să discuți..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="relative min-h-[200px] text-lg bg-black/50 border-2 border-white/10 focus:border-white/20 rounded-xl backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 p-6"
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-end space-x-4"
              >
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
                    "relative group overflow-hidden px-6 h-12 rounded-xl",
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
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateDiscussion;