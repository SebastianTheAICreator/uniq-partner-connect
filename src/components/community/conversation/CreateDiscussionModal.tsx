
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Type, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface CreateDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string }) => void;
}

const CreateDiscussionModal = ({ isOpen, onClose, onSubmit }: CreateDiscussionModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating discussion:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-gradient-to-br from-[#1A1F2C] to-[#252736] border border-white/10 rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Conversație Nouă</h2>
                <p className="text-white/60 text-sm">Începe o discuție interesantă</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                disabled={isSubmitting}
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <Type className="h-4 w-4" />
                  Titlu Conversație
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Introdu un titlu captivant..."
                  className="bg-white/5 border-white/10 focus:border-purple-500/30 text-white placeholder:text-white/40"
                  maxLength={100}
                  required
                />
                <div className="flex justify-between text-xs text-white/50">
                  <span>Minim 5 caractere</span>
                  <span>{title.length}/100</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <FileText className="h-4 w-4" />
                  Descriere
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descrie pe scurt despre ce vrei să discuți..."
                  className="bg-white/5 border-white/10 focus:border-purple-500/30 text-white placeholder:text-white/40 min-h-[100px] resize-none"
                  maxLength={500}
                  required
                />
                <div className="flex justify-between text-xs text-white/50">
                  <span>Minim 10 caractere</span>
                  <span>{description.length}/500</span>
                </div>
              </div>

              {/* Quick Tags */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90">
                  Tag-uri Sugerate
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Design', 'Technology', 'AI', 'Business', 'Gaming'].map(tag => (
                    <Badge
                      key={tag}
                      className="bg-white/5 text-white/60 border-white/10 hover:bg-purple-500/20 hover:text-purple-300 cursor-pointer transition-all"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4">
                <div className="text-xs text-white/50">
                  Conversația va fi publică pentru toți membrii
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="text-white/60 hover:text-white"
                  >
                    Anulează
                  </Button>
                  <Button
                    type="submit"
                    disabled={!title.trim() || !description.trim() || title.length < 5 || description.length < 10 || isSubmitting}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Creez...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Publică
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateDiscussionModal;
