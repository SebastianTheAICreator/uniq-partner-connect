
import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle } from 'lucide-react';
import { FilePreview } from './post/types';
import FileViewerModal from './FileViewerModal';
import PremiumPostCreator from './post/PremiumPostCreator';
import PostThread from './PostThread';
import TopicHeader from './TopicHeader';
import TopicFilters from './TopicFilters';
import LiveActivity from './LiveActivity';
import { PostData } from './post/PremiumPost';
import { ReplyData } from './post/PremiumReply';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [selectedFile, setSelectedFile] = useState<{
    type: 'image' | 'video' | 'document';
    preview?: string;
    file: File;
  } | null>(null);
  
  const { toast } = useToast();
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

  const totalReplies = Object.values(replies).reduce((total, replyArr) => total + replyArr.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#0A0C10] via-[#0F1117] to-[#0A0C10]"
    >
      <TopicHeader 
        topic={topic}
        onBack={onBack}
        stats={{
          totalPosts: posts.length,
          totalReplies: totalReplies
        }}
      />
      
      <TopicFilters 
        searchQuery={searchQuery}
        sortBy={sortBy}
        onSearchChange={setSearchQuery}
        onSortChange={setSortBy}
      />
      
      <div className="container mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <PremiumPostCreator 
              topicId={topicId} 
              onPostCreated={handlePostCreated} 
            />
            
            <ScrollArea className="h-[calc(100vh-24rem)]">
              <div className="space-y-6 pb-20">
                <AnimatePresence initial={false}>
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <div key={post.id} ref={replyingTo === post.id ? replyContainerRef : undefined}>
                        <PostThread
                          post={post}
                          replies={replies[post.id] || []}
                          replyingTo={replyingTo}
                          onReplyClick={(postId) => setReplyingTo(postId === replyingTo ? null : postId)}
                          onLikeClick={handleLike}
                          onDislikeClick={handleDislike}
                          onShareClick={handleShare}
                          onReply={handleReply}
                          onReplyToReply={handleReplyToReply}
                          onLikeReply={handleLikeReply}
                          onCancelReply={() => setReplyingTo(null)}
                        />
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
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <LiveActivity 
              activeUsers={12}
              totalViews={847}
              recentActivity={[
                "Alexandra a adăugat un răspuns",
                "Mihai a apreciat o postare", 
                "3 utilizatori noi s-au alăturat"
              ]}
            />
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
