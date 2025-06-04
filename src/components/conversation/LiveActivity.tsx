
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, MessageCircle, TrendingUp } from 'lucide-react';

interface LiveActivityProps {
  activeUsers: number;
  totalViews: number;
  recentActivity: string[];
}

const LiveActivity = ({ activeUsers, totalViews, recentActivity }: LiveActivityProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1A1F2C]/60 backdrop-blur-xl rounded-xl border border-[#3A4366]/30 p-4"
    >
      <h3 className="text-sm font-medium text-white/90 mb-3 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-indigo-400" />
        Activitate Live
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Users className="h-3.5 w-3.5 text-green-400" />
            <span>Utilizatori activi</span>
          </div>
          <span className="text-green-400 font-medium">{activeUsers}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Eye className="h-3.5 w-3.5 text-blue-400" />
            <span>Vizualizări totale</span>
          </div>
          <span className="text-blue-400 font-medium">{totalViews}</span>
        </div>
        
        <div className="pt-2 border-t border-[#3A4366]/30">
          <div className="flex items-center gap-2 text-white/60 text-xs mb-2">
            <MessageCircle className="h-3 w-3" />
            <span>Activitate recentă</span>
          </div>
          
          <div className="space-y-1">
            {recentActivity.slice(0, 3).map((activity, index) => (
              <div key={index} className="text-xs text-white/50">
                {activity}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveActivity;
