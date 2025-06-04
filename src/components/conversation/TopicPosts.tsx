
import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { ArrowLeft, Filter, Search, TrendingUp, Clock, MessageCircle, SlidersHorizontal, Sparkles, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { FilePreview } from './post/types';
import FileViewerModal from './FileViewerModal';
import PremiumPostCreator from './post/PremiumPostCreator';
import PremiumPost, { PostData } from './post/PremiumPost';
import PremiumReply, { ReplyData } from './post/PremiumReply';
import PremiumReplyInput from './post/PremiumReplyInput';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

interface TopicPostsProps {
  topicId: string;
  topic: {
    title: string;
    description: string;
  };
  onBack: () => void;
}

const mockPosts: PostData[] = [
  {
    id: '1',
    content: 'Aceasta este o postare de test în topic. În această postare voi discuta despre importanța designului în aplicațiile moderne și cum putem îmbunătăți experiența utilizatorilor folosind principii de UI/UX eficiente.\n\nCe părere aveți despre designul minimalist versus designul complex cu multe elemente grafice?',
    author: {
      id: 'user1',
      name: 'Alexandra Popescu',
      verified: true,
      role: 'Product Designer'
    },
    timestamp: '2 ore în urmă',
    stats: {
      likes: 24,
      dislikes: 2,
      replies: 5,
      shares: 3,
      views: 127
    },
    tags: ['design', 'ux', 'minimalism'],
    isPinned: true
  },
  {
    id: '2',
    content: 'Am câteva întrebări despre integrarea inteligenței artificiale în fluxurile de lucru existente. Care sunt cele mai bune practici pentru a implementa AI fără a perturba experiența utilizatorilor?',
    author: {
      id: 'user2',
      name: 'Mihai Ionescu',
      role: 'Developer'
    },
    timestamp: '5 ore în urmă',
    stats: {
      likes: 15,
      dislikes: 0,
      replies: 8,
      shares: 2,
      views: 94
    },
    tags: ['ai', 'development', 'ux']
  }
];

const mockReplies: Record<string, ReplyData[]> = {
  '1': [
    {
      id: 'reply1',
      content: 'Designul minimalist este mai eficient pentru platforma noastră deoarece pune accentul pe conținut și reduce încărcarea cognitivă a utilizatorilor.',
      author: {
        id: 'user3',
        name: 'Andreea Dumitrescu',
        verified: true
      },
      timestamp: '1 oră în urmă',
      parentId: '1',
      depth: 1,
      likes: 7
    },
    {
      id: 'reply2',
      content: 'Sunt de acord cu Andreea. În plus, designul minimalist se încarcă mai rapid și consumă mai puține resurse, ceea ce este important pentru dispozitivele mobile.',
      author: {
        id: 'user4',
        name: 'Dan Popescu'
      },
      timestamp: '45 min în urmă',
      parentId: '1',
      depth: 2,
      likes: 3
    }
  ],
  '2': [
    {
      id: 'reply3',
      content: 'Pentru integrarea AI, recomand să începi cu funcționalități mici și să oferi utilizatorilor posibilitatea de a opta pentru funcționalitățile avansate. Este important să păstrezi transparența cu privire la momentele când AI-ul este utilizat.',
      author: {
        id: 'user5',
        name: 'Laura Stanescu',
        verified: true,
        role: 'AI Engineer'
      },
      timestamp: '3 ore în urmă',
      parentId: '2',
      depth: 1,
      likes: 12
    }
  ]
};

const TopicPosts = ({ topicId, topic, onBack }: TopicPostsProps) => {
  const [posts, setPosts] = useState<PostData[]>(mockPosts);
  const [replies, setReplies] = useState<Record<string, ReplyData[]>>(mockReplies);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<{
    type: 'image' | 'video' | 'document';
    preview?: string;
    file: File;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [showFilters, setShowFilters] = useState(false);
  
  const replyContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (replyingTo && replyContainerRef.current) {
      replyContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [replyingTo]);

  const handlePostCreated = (post: { content: string; files: FilePreview[] }) => {
    const newPost: PostData = {
      id: Date.now().toString(),
      content: post.content,
      author: {
        id: 'currentUser',
        name: 'Tu',
        verified: true
      },
      timestamp: 'acum',
      stats: {
        likes: 0,
        dislikes: 0,
        replies: 0,
        shares: 0,
        views: 1
      },
      attachments: post.files
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    
    toast({
      title: "Postare publicată",
      description: "Postarea ta a fost publicată cu succes.",
    });
  };

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const hasLiked = post.hasLiked;
          return {
            ...post,
            stats: {
              ...post.stats,
              likes: hasLiked ? post.stats.likes - 1 : post.stats.likes + 1
            },
            hasLiked: !hasLiked,
            hasDisliked: false
          };
        }
        return post;
      })
    );
  };

  const handleDislike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const hasDisliked = post.hasDisliked;
          return {
            ...post,
            stats: {
              ...post.stats,
              dislikes: hasDisliked ? post.stats.dislikes - 1 : post.stats.dislikes + 1
            },
            hasDisliked: !hasDisliked,
            hasLiked: false
          };
        }
        return post;
      })
    );
  };

  const handleShare = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            stats: {
              ...post.stats,
              shares: post.stats.shares + 1
            }
          };
        }
        return post;
      })
    );
    
    toast({
      title: "Link copiat",
      description: "Linkul către postare a fost copiat în clipboard.",
    });
  };

  const handleReply = (postId: string, content: string, files: FilePreview[]) => {
    if (!content.trim() && files.length === 0) return;
    
    const newReply: ReplyData = {
      id: Date.now().toString(),
      content,
      author: {
        id: 'currentUser',
        name: 'Tu'
      },
      timestamp: 'acum',
      parentId: postId,
      depth: 1,
      likes: 0,
      attachments: files
    };
    
    setReplies(prev => {
      const updatedReplies = { ...prev };
      if (!updatedReplies[postId]) {
        updatedReplies[postId] = [];
      }
      updatedReplies[postId] = [...updatedReplies[postId], newReply];
      return updatedReplies;
    });
    
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            stats: {
              ...post.stats,
              replies: post.stats.replies + 1
            }
          };
        }
        return post;
      })
    );
    
    setReplyingTo(null);
    
    toast({
      title: "Răspuns adăugat",
      description: "Răspunsul tău a fost publicat cu succes.",
    });
  };

  const handleReplyToReply = (parentId: string, content: string, files: FilePreview[]) => {
    if (!content.trim() && files.length === 0) return;
    
    const postId = Object.keys(replies).find(postId => 
      replies[postId].some(reply => reply.id === parentId)
    );
    
    if (!postId) return;
    
    const parentReply = replies[postId].find(reply => reply.id === parentId);
    const depth = parentReply ? (parentReply.depth || 1) + 1 : 2;
    
    const newReply: ReplyData = {
      id: Date.now().toString(),
      content,
      author: {
        id: 'currentUser',
        name: 'Tu'
      },
      timestamp: 'acum',
      parentId,
      depth,
      likes: 0,
      attachments: files
    };
    
    setReplies(prev => {
      const updatedReplies = { ...prev };
      if (!updatedReplies[postId]) {
        updatedReplies[postId] = [];
      }
      
      const parentIndex = updatedReplies[postId].findIndex(r => r.id === parentId);
      if (parentIndex !== -1) {
        let insertIndex = parentIndex + 1;
        const parentDepth = updatedReplies[postId][parentIndex].depth || 1;
        
        while (
          insertIndex < updatedReplies[postId].length && 
          (updatedReplies[postId][insertIndex].depth || 1) > parentDepth
        ) {
          insertIndex++;
        }
        
        updatedReplies[postId] = [
          ...updatedReplies[postId].slice(0, insertIndex),
          newReply,
          ...updatedReplies[postId].slice(insertIndex)
        ];
      } else {
        updatedReplies[postId].push(newReply);
      }
      
      return updatedReplies;
    });
    
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            stats: {
              ...post.stats,
              replies: post.stats.replies + 1
            }
          };
        }
        return post;
      })
    );
    
    toast({
      title: "Răspuns adăugat",
      description: "Răspunsul tău a fost publicat cu succes.",
    });
  };

  const handleLikeReply = (replyId: string) => {
    setReplies(prev => {
      const newReplies = { ...prev };
      
      Object.keys(newReplies).forEach(postId => {
        newReplies[postId] = newReplies[postId].map(reply => {
          if (reply.id === replyId) {
            const hasLiked = reply.hasLiked;
            return {
              ...reply,
              likes: hasLiked ? reply.likes - 1 : reply.likes + 1,
              hasLiked: !hasLiked
            };
          }
          return reply;
        });
      });
      
      return newReplies;
    });
  };

  const filteredPosts = posts
    .filter(post => {
      if (!searchQuery) return true;
      return (
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return b.id.localeCompare(a.id);
      } else {
        const scoreA = a.stats.likes * 2 + a.stats.replies;
        const scoreB = b.stats.likes * 2 + b.stats.replies;
        return scoreB - scoreA;
      }
    });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 relative mt-16"
    >
      <div className="sticky top-16 left-0 right-0 z-20 backdrop-blur-xl bg-gradient-to-r from-[#1A1F2C]/95 to-[#1E293B]/95 border-b border-[#3A4366]/30 py-3 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="h-9 w-9 rounded-full text-white/70 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <div>
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  {topic.title}
                </h2>
                <p className="text-white/60 text-sm">{topic.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-9 rounded-lg gap-1.5 text-white/70 hover:text-white hover:bg-white/10",
                  sortBy === 'recent' && "bg-white/10 text-white"
                )}
                onClick={() => setSortBy('recent')}
              >
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Recente</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-9 rounded-lg gap-1.5 text-white/70 hover:text-white hover:bg-white/10",
                  sortBy === 'popular' && "bg-white/10 text-white"
                )}
                onClick={() => setSortBy('popular')}
              >
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Populare</span>
              </Button>
              
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
                
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-64 rounded-xl overflow-hidden 
                              bg-[#1A1F2C] border border-[#3A4366]/50 shadow-2xl z-50"
                    >
                      <div className="p-3">
                        <h3 className="text-sm font-medium text-white/90 mb-2">Filtrează după</h3>
                        
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1">
                            <Badge className="bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 cursor-pointer">
                              Design
                            </Badge>
                            <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 cursor-pointer">
                              AI
                            </Badge>
                            <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 cursor-pointer">
                              Technology
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Input 
                              placeholder="Caută cuvinte cheie..." 
                              className="h-8 text-sm bg-[#141625] border-[#3A4366]/50"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button size="icon" className="h-8 w-8 p-0" variant="ghost">
                              <Search className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-4">
        <PremiumPostCreator 
          topicId={topicId} 
          onPostCreated={handlePostCreated} 
          className="mb-8"
        />
        
        <ScrollArea className="h-[calc(100vh-17rem)]">
          <div className="space-y-6 pb-20">
            <AnimatePresence initial={false}>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <div key={post.id} className="space-y-4">
                    <PremiumPost
                      post={post}
                      onReplyClick={(postId) => setReplyingTo(postId === replyingTo ? null : postId)}
                      onLikeClick={handleLike}
                      onDislikeClick={handleDislike}
                      onShareClick={handleShare}
                    />
                    
                    <div className="ml-8 space-y-4">
                      <AnimatePresence>
                        {replyingTo === post.id && (
                          <motion.div
                            ref={replyContainerRef}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <PremiumReplyInput
                              postId={post.id}
                              onReply={handleReply}
                              onCancel={() => setReplyingTo(null)}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {replies[post.id]?.length > 0 && (
                        <div className="space-y-4 pt-2">
                          {replies[post.id].map((reply) => (
                            <PremiumReply
                              key={reply.id}
                              reply={reply}
                              onReplyToReply={handleReplyToReply}
                              onLike={handleLikeReply}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="mx-auto w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                    <MessageCircle className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white/90 mb-2">Nicio postare găsită</h3>
                  <p className="text-white/60 max-w-md mx-auto">
                    {searchQuery 
                      ? `Nu există postări care să conțină "${searchQuery}"`
                      : "Nu există postări în această conversație. Fii primul care postează!"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-[#1A1F2C]/90 backdrop-blur-xl border-t border-[#3A4366]/30 py-3 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 text-white/60 text-xs">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>{posts.length} postări</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-white/60 text-xs">
                <MessageCircle className="h-3.5 w-3.5 text-indigo-400" />
                <span>
                  {Object.values(replies).reduce((total, replyArr) => total + replyArr.length, 0)} răspunsuri
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-white/60 text-xs">
              <Shield className="h-3.5 w-3.5 text-green-400" />
              <span>Conversație moderată</span>
            </div>
          </div>
        </div>
      </div>
      
      <FileViewerModal
        isOpen={selectedFile !== null}
        onClose={() => setSelectedFile(null)}
        file={selectedFile}
      />
    </motion.div>
  );
};

export default TopicPosts;
