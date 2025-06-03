
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickActionsProps {
  onCreateClick: () => void;
}

const QuickActions = ({ onCreateClick }: QuickActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4"
    >
      <Button
        onClick={onCreateClick}
        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 text-lg"
      >
        <Plus className="h-5 w-5 mr-2" />
        Începe o Conversație
      </Button>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Explorează Trending
        </Button>
        
        <Button
          variant="ghost"
          className="text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
        >
          <Zap className="h-4 w-4 mr-2" />
          Quick Chat
        </Button>
      </div>
    </motion.div>
  );
};

export default QuickActions;
