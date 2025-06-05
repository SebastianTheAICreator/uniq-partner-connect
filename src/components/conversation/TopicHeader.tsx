
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Users, MessageCircle, Clock, Shield, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopicHeaderProps {
  topic: {
    title: string;
    description: string;
  };
  onBack: () => void;
  stats: {
    totalPosts: number;
    totalReplies: number;
  };
}

const TopicHeader = ({ topic, onBack, stats }: TopicHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-4"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
        <Globe className="h-4 w-4" />
        <span>Comunitate</span>
        <span>/</span>
        <span className="text-white/80">Conversații</span>
        <span>/</span>
        <span className="text-indigo-400">{topic.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-10 w-10 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
                {topic.title}
              </h1>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-2 py-1 text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Moderată
              </Badge>
            </div>
            
            <p className="text-white/70 text-sm lg:text-base mb-3 leading-relaxed max-w-2xl">
              {topic.description}
            </p>
            
            {/* Enhanced Stats */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.div 
                className="flex items-center gap-2 text-white/60"
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <span className="text-base font-semibold text-white/90">{stats.totalPosts}</span>
                  <p className="text-xs text-white/60">postări</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-2 text-white/60"
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Users className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <span className="text-base font-semibold text-white/90">{stats.totalReplies}</span>
                  <p className="text-xs text-white/60">răspunsuri</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-2 text-white/60"
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-amber-400">Activă</span>
                  <p className="text-xs text-white/60">acum</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicHeader;
