import React from 'react';
import { Rss, TrendingUp, Video, Newspaper, Users, Banknote, Heart, MessageSquare, MessageCircle, Building, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const menuItems = [
    { icon: Rss, label: 'Feed', badge: '3' },
    { icon: TrendingUp, label: 'Trending', badge: '5' },
    { icon: Video, label: 'UniVideo', badge: '12' },
    { icon: Newspaper, label: 'UniNews', badge: '8' },
    { icon: Users, label: 'Comuniti', badge: '24' },
    { icon: Banknote, label: 'UniBanking', badge: '4' },
    { icon: Heart, label: 'Matches', badge: '7' },
    { icon: MessageSquare, label: 'Friends', badge: '9' },
    { icon: MessageSquare, label: 'Messages', badge: '2' },
    { icon: MessageCircle, label: 'Ol-yAIChat', badge: '1' },
    { 
      icon: Building, 
      label: 'UniQ Enterprise', 
      badge: 'PRO',
      className: 'bg-gradient-to-r from-blue-400 to-emerald-400 hover:from-blue-500 hover:to-emerald-500'
    },
  ];

  const conversations = [
    { id: '1', title: 'AI' },
    { id: '2', title: 'AGI' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="w-64 min-h-screen bg-[#1a1b1e] border-r border-white/5">
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-16 px-6 flex items-center border-b border-white/5"
      >
        <h1 className="text-xl font-bold text-blue-400">
          UniQ
        </h1>
      </motion.div>

      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-1"
            >
              <h2 className="text-sm font-medium text-gray-400 mb-3">
                Meniu Principal
              </h2>
              
              {menuItems.map((Item) => (
                <motion.div key={Item.label} variants={itemVariants}>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-between h-10 px-3 hover:bg-blue-500/10 transition-colors ${Item.className || ''}`}
                  >
                    <span className="flex items-center gap-3">
                      <Item.icon className={`h-4 w-4 text-blue-400 ${
                        Item.label === 'UniQ Enterprise' ? 'text-white animate-pulse' : ''
                      }`} />
                      <span className={`text-sm text-gray-300 ${
                        Item.label === 'UniQ Enterprise' ? 'text-white font-medium' : ''
                      }`}>
                        {Item.label}
                      </span>
                    </span>
                    {Item.badge && (
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        Item.label === 'UniQ Enterprise'
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {Item.badge}
                      </span>
                    )}
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            <Separator className="bg-white/5" />

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <h2 className="text-sm font-medium text-gray-400">
                Conversații Recente
              </h2>
              <div className="space-y-1">
                {conversations.map((conv, index) => (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-10 px-3 hover:bg-blue-500/10"
                    >
                      <MessageSquare className="h-4 w-4 text-blue-400 mr-3" />
                      <span className="text-sm text-gray-300">
                        {conv.title}
                      </span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </ScrollArea>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-6 border-t border-white/5"
        >
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start h-10 px-3 hover:bg-blue-500/10"
            >
              <Users className="h-4 w-4 text-blue-400 mr-3" />
              <span className="text-sm text-gray-300">Profil</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start h-10 px-3 hover:bg-blue-500/10 text-red-400 hover:text-red-400"
            >
              <LogOut className="h-4 w-4 mr-3" />
              <span className="text-sm">Deconectare</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;