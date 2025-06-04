
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Users, MessageCircle, Clock, Shield } from 'lucide-react';
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
    <div className="sticky top-16 left-0 right-0 z-20 backdrop-blur-xl bg-gradient-to-r from-[#1A1F2C]/95 to-[#1E293B]/95 border-b border-[#3A4366]/30 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
          <span>Comunitate</span>
          <span>/</span>
          <span className="text-white/80">Conversații</span>
          <span>/</span>
          <span className="text-indigo-400">{topic.title}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-10 w-10 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  {topic.title}
                </h1>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Shield className="h-3 w-3 mr-1" />
                  Moderată
                </Badge>
              </div>
              <p className="text-white/70 text-sm mb-3">{topic.description}</p>
              
              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <MessageCircle className="h-4 w-4 text-indigo-400" />
                  <span>{stats.totalPosts} postări</span>
                </div>
                
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Users className="h-4 w-4 text-purple-400" />
                  <span>{stats.totalReplies} răspunsuri</span>
                </div>
                
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Clock className="h-4 w-4 text-amber-400" />
                  <span>Activă acum</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicHeader;
