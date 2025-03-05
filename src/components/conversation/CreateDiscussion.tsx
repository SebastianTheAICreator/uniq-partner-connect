import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Sparkles, MessageSquarePlus, PenLine, Send, Video, BarChart2, Calendar, HelpCircle, Trophy, Mic, Bot, Image, FileType, Star, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import PremiumButton from './post/PremiumButton';

interface CreateDiscussionProps {
  onDiscussionCreated: (discussion: {
    title: string;
    description: string;
  }) => void;
}
type PostType = 'text' | 'media' | 'poll' | 'event' | 'question' | 'challenge';

const CreateDiscussion = ({
  onDiscussionCreated
}: CreateDiscussionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [selectedType, setSelectedType] = useState<PostType>('text');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {
    toast
  } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onDiscussionCreated({
        title,
        description
      });
      setTitle('');
      setDescription('');
      setIsOpen(false);
      toast({
        title: "Discuție creată cu succes! 🎉",
        description: "Noua ta discuție este acum disponibilă pentru comunitate."
      });
    }
  };

  const postTypes = [{
    type: 'text',
    icon: PenLine,
    label: 'Text Post',
    description: 'Creează un post text cu editor rich'
  }, {
    type: 'media',
    icon: Video,
    label: 'Media Share',
    description: 'Împărtășește conținut media'
  }, {
    type: 'poll',
    icon: BarChart2,
    label: 'Poll/Survey',
    description: 'Creează un sondaj interactiv'
  }, {
    type: 'event',
    icon: Calendar,
    label: 'Event',
    description: 'Organizează un eveniment'
  }, {
    type: 'question',
    icon: HelpCircle,
    label: 'Question',
    description: 'Pune o întrebare comunității'
  }, {
    type: 'challenge',
    icon: Trophy,
    label: 'Challenge',
    description: 'Inițiază o provocare'
  }];

  const quickFeatures = [{
    icon: Image,
    label: 'Drag & Drop Media'
  }, {
    icon: FileType,
    label: 'Clipboard Integration'
  }, {
    icon: Mic,
    label: 'Voice Input'
  }, {
    icon: Bot,
    label: 'AI Assistant'
  }];

  return <div className="relative mb-16 mt-12">
      <AnimatePresence mode="wait">
        {!isOpen ? <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} transition={{
        duration: 0.3
      }} className="relative" onMouseEnter={() => setShowQuickMenu(true)} onMouseLeave={() => setShowQuickMenu(false)}>
            <Button onClick={() => setIsOpen(true)} className={cn(
              "group relative w-full h-28 rounded-2xl overflow-hidden transition-all duration-500", 
              "bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-fuchsia-900/80", 
              "hover:from-indigo-800/90 hover:via-purple-800/90 hover:to-fuchsia-800/90", 
              "border border-indigo-500/30 hover:border-indigo-400/50", 
              "shadow-[0_0_30px_rgba(124,58,237,0.2)] hover:shadow-[0_0_50px_rgba(124,58,237,0.4)]", 
              "backdrop-blur-xl"
            )}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 opacity-80"></div>
              
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064')] bg-cover bg-center mix-blend-overlay"></div>
                <div className="absolute -top-36 -right-36 w-64 h-64 bg-purple-500 rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500 rounded-full filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
              </div>
              
              <motion.div className="absolute inset-0" 
                animate={{
                  background: [
                    "radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.1) 0%, rgba(0,0,0,0) 50%)",
                    "radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.1) 0%, rgba(0,0,0,0) 50%)",
                    "radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.1) 0%, rgba(0,0,0,0) 50%)"
                  ]
                }} 
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }} 
              />
              
              <motion.div 
                className="relative z-10 flex items-center justify-center gap-4 text-xl font-medium" 
                whileHover={{ scale: 1.02 }}
              >
                <motion.span 
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-inner"
                  whileHover={{ 
                    rotate: 180,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "rgba(139, 92, 246, 0.5)" 
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <MessageSquarePlus className="w-6 h-6 text-purple-300" />
                </motion.span>
                
                <span className="bg-gradient-to-r from-white/90 via-purple-200 to-indigo-200 bg-clip-text font-bold text-transparent text-3xl">
                  Creează o discuție nouă
                </span>
                
                <motion.span
                  initial={{ opacity: 0.6 }}
                  animate={{ 
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Wand2 className="w-6 h-6 text-fuchsia-300" />
                </motion.span>
              </motion.div>
              
              <div className="absolute bottom-2 right-3 flex space-x-1">
                {[1,2,3].map(i => (
                  <motion.div 
                    key={i}
                    className="w-1 h-1 rounded-full bg-white/40"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      height: ["4px", "8px", "4px"]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </Button>

            <AnimatePresence>
              {showQuickMenu && <motion.div initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: 10
          }} className="absolute left-0 right-0 mt-3 p-5 rounded-xl backdrop-blur-xl bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border border-indigo-500/20 shadow-[0_10px_50px_rgba(124,58,237,0.3)] z-50">
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    {postTypes.map(({
                type,
                icon: Icon,
                label,
                description
              }) => <motion.button key={type} whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255,255,255,0.08)"
              }} className="flex items-center p-3 rounded-lg bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all backdrop-blur-sm" onClick={() => {
                setSelectedType(type as PostType);
                setIsOpen(true);
              }}>
                        <div className="p-2 mr-3 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-md">
                          <Icon className="w-5 h-5 text-indigo-300" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-white">{label}</div>
                          <div className="text-sm text-white/60">{description}</div>
                        </div>
                      </motion.button>)}
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-indigo-500/20">
                    {quickFeatures.map(({
                icon: Icon,
                label
              }) => <motion.button key={label} whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.05)"
              }} className="flex flex-col items-center p-2 rounded-lg">
                        <div className="p-1.5 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-2">
                          <Icon className="w-3.5 h-3.5 text-indigo-300" />
                        </div>
                        <span className="text-xs text-white/70">{label}</span>
                      </motion.button>)}
                  </div>
                </motion.div>}
            </AnimatePresence>
          </motion.div> : <motion.form initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1]
      }} className="relative space-y-6 p-8 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-pink-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]" onSubmit={handleSubmit}>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl" />

            <div className="relative z-10 space-y-8">
              <motion.div initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="flex justify-between items-center">
                <motion.h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400" initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }}>
                  Creează o discuție nouă
                </motion.h3>
                <Button type="button" variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-white/5 transition-colors">
                  <X className="h-5 w-5 text-gray-400" />
                </Button>
              </motion.div>

              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }} className="space-y-6">
                <div className="relative group">
                  <motion.div initial={{
                width: 0
              }} animate={{
                width: "100%"
              }} transition={{
                delay: 0.2,
                duration: 0.5
              }} className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-1000" />
                  <div className="relative flex items-center">
                    <PenLine className="absolute left-4 text-indigo-400 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <Input placeholder="Titlul discuției tale..." value={title} onChange={e => setTitle(e.target.value)} className="w-full h-14 pl-12 text-lg bg-black/50 border-2 border-white/10 focus:border-white/20 rounded-xl backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20" />
                  </div>
                </div>

                <div className="relative group">
                  <motion.div initial={{
                width: 0
              }} animate={{
                width: "100%"
              }} transition={{
                delay: 0.3,
                duration: 0.5
              }} className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-1000" />
                  <Textarea placeholder="Descrie despre ce vrei să discuți..." value={description} onChange={e => setDescription(e.target.value)} className="relative min-h-[200px] text-lg bg-black/50 border-2 border-white/10 focus:border-white/20 rounded-xl backdrop-blur-xl transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 p-6" />
                </div>
              </motion.div>

              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="flex justify-end space-x-4">
                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="px-6 h-12 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 hover:text-white transition-all duration-300">
                  Anulează
                </Button>
                <PremiumButton 
                  type="submit" 
                  variant="primary"
                  className="h-12 px-8"
                  disabled={!title.trim() || !description.trim()}
                >
                  <span className="flex items-center">
                    Creează discuția
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </PremiumButton>
              </motion.div>
            </div>
          </motion.form>}
      </AnimatePresence>
    </div>;
};
export default CreateDiscussion;
