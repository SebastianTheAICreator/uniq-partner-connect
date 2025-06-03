
import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, TrendingUp, Activity } from 'lucide-react';

interface ConversationStatsProps {
  totalTopics: number;
  activeUsers: number;
  onlineNow: number;
}

const ConversationStats = ({ totalTopics, activeUsers, onlineNow }: ConversationStatsProps) => {
  const stats = [
    {
      icon: MessageCircle,
      label: 'Conversații Active',
      value: totalTopics,
      color: 'text-blue-400'
    },
    {
      icon: Users,
      label: 'Membri Activi',
      value: activeUsers,
      color: 'text-green-400'
    },
    {
      icon: Activity,
      label: 'Online Acum',
      value: onlineNow,
      color: 'text-purple-400'
    },
    {
      icon: TrendingUp,
      label: 'În Trending',
      value: Math.floor(totalTopics * 0.2) || 1,
      color: 'text-amber-400'
    }
  ];

  return (
    <section className="px-6 py-6 border-b border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 mb-2 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-sm text-white/60">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConversationStats;
