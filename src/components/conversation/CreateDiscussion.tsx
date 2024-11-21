import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

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
        title: "Discuție creată",
        description: "Noua discuție a fost creată cu succes!",
      });
    }
  };

  return (
    <div className="mb-6">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="mr-2 h-4 w-4" />
          Creează o discuție nouă
        </Button>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4 p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
          onSubmit={handleSubmit}
        >
          <h3 className="text-xl font-semibold gradient-text">Creează o discuție nouă</h3>
          <div className="space-y-2">
            <Input
              placeholder="Titlul discuției"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
            <Textarea
              placeholder="Descrierea discuției..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px]"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Anulează
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white"
            >
              Creează discuția
            </Button>
          </div>
        </motion.form>
      )}
    </div>
  );
};

export default CreateDiscussion;