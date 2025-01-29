import React, { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { ArrowLeft, MessageCircle, Heart, Share2, ThumbsUp, ThumbsDown, FileVideo, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CreatePost from './CreatePost';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import FileViewerModal from './FileViewerModal';

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  replies: Reply[];
  hasLiked?: boolean;
  hasDisliked?: boolean;
  attachments?: FilePreview[];
}

interface Reply {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
}

interface TopicPostsProps {
  topicId: string;
  topic: {
    title: string;
    description: string;
  };
  onBack: () => void;
}

interface FilePreview {
  id: string;
  file: File;
  type: 'image' | 'video' | 'document';
  preview?: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Aceasta este o postare de test în topic.',
    author: 'User1',
    timestamp: '2 min ago',
    likes: 12,
    dislikes: 2,
    replies: [
      {
        id: '1',
        content: 'Un răspuns la postare',
        author: 'User2',
        timestamp: '1 min ago',
        likes: 3
      }
    ],
    attachments: []
  },
  {
    id: '2',
    content: 'O altă postare interesantă despre acest subiect.',
    author: 'User2',
    timestamp: '5 min ago',
    likes: 8,
    dislikes: 1,
    replies: [],
    attachments: []
  }
];

const TopicPosts = ({ topicId, topic, onBack }: TopicPostsProps) => {
  const [posts, setPosts] = React.useState<Post[]>(mockPosts);
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
  const [replyContent, setReplyContent] = React.useState('');
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<{
    type: 'image' | 'video' | 'document';
    preview?: string;
    file: File;
  } | null>(null);

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const hasLiked = post.hasLiked;
          return {
            ...post,
            likes: hasLiked ? post.likes - 1 : post.likes + 1,
            hasLiked: !hasLiked,
            hasDisliked: false
          };
        }
        return post;
      })
    );
    toast({
      title: "Mulțumim pentru feedback!",
      description: "Aprecierea ta a fost înregistrată.",
    });
  };

  const handleDislike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const hasDisliked = post.hasDisliked;
          return {
            ...post,
            dislikes: hasDisliked ? post.dislikes - 1 : post.dislikes + 1,
            hasDisliked: !hasDisliked,
            hasLiked: false
          };
        }
        return post;
      })
    );
  };

  const handleShare = (postId: string) => {
    toast({
      title: "Link copiat!",
      description: "Linkul către postare a fost copiat în clipboard.",
    });
  };

  const handleReply = (postId: string) => {
    if (replyContent.trim()) {
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              replies: [...post.replies, {
                id: Date.now().toString(),
                content: replyContent,
                author: 'CurrentUser',
                timestamp: 'acum',
                likes: 0
              }]
            };
          }
          return post;
        })
      );
      setReplyContent('');
      setReplyingTo(null);
      toast({
        title: "Răspuns adăugat!",
        description: "Răspunsul tău a fost publicat cu succes.",
      });
    }
  };

  const handlePostCreated = (newPost: { content: string, files: FilePreview[] }) => {
    console.log('New post created:', newPost);
    const post: Post = {
      id: Date.now().toString(),
      content: newPost.content,
      author: 'CurrentUser',
      timestamp: 'acum',
      likes: 0,
      dislikes: 0,
      replies: [],
      attachments: newPost.files
    };

    setPosts(prevPosts => [post, ...prevPosts]);
    
    toast({
      title: "Postare adăugată cu succes! 🎉",
      description: `Mesajul tău ${newPost.files.length > 0 ? 'și atașamentele' : ''} au fost publicate.`,
    });
  };

  const handleFileClick = (file: FilePreview) => {
    console.log('Opening file:', file);
    setSelectedFile({
      type: file.type,
      preview: file.preview,
      file: file.file
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold gradient-text">{topic.title}</h2>
          <p className="text-gray-600">{topic.description}</p>
        </div>
      </div>

      <CreatePost topicId={topicId} onPostCreated={handlePostCreated} />

      <ScrollArea className="h-[calc(100vh-24rem)]">
        <div className="space-y-6">
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card rounded-xl p-6 space-y-4 hover:shadow-[0_8px_32px_rgba(139,92,246,0.15)] transition-all duration-300 border-glow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-white font-bold shadow-lg">
                      {post.author[0]}
                    </div>
                    <div>
                      <span className="font-medium text-white/90">{post.author}</span>
                      <p className="text-sm text-white/60">{post.timestamp}</p>
                    </div>
                  </div>
                </div>

                <p className="text-white/80 text-lg leading-relaxed">{post.content}</p>

                {post.attachments && post.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-4">
                    {post.attachments.map((file, index) => (
                      <div 
                        key={index} 
                        className="relative group cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => handleFileClick(file)}
                      >
                        <div className="w-24 h-24 rounded-lg overflow-hidden glass-gradient flex items-center justify-center border border-white/10 hover:border-white/20 transition-colors">
                          {file.preview ? (
                            <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-white/60">
                              {file.type === 'video' && <FileVideo className="w-8 h-8" />}
                              {file.type === 'document' && <Paperclip className="w-8 h-8" />}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-6 pt-4 border-t border-white/10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={cn(
                      "flex items-center space-x-2 text-white/70 hover:text-white hover:bg-white/10",
                      post.hasLiked && "text-primary hover:text-primary/90"
                    )}
                  >
                    <ThumbsUp className="h-5 w-5" />
                    <span>{post.likes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDislike(post.id)}
                    className={cn(
                      "flex items-center space-x-2 text-white/70 hover:text-white hover:bg-white/10",
                      post.hasDisliked && "text-red-500 hover:text-red-400"
                    )}
                  >
                    <ThumbsDown className="h-5 w-5" />
                    <span>{post.dislikes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(post.id)}
                    className="flex items-center space-x-2 text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.replies.length}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(post.id)}
                    className="flex items-center space-x-2 text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-primary hover:text-primary/90 hover:bg-white/10"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>

                {replyingTo === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-4"
                  >
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Scrie un răspuns..."
                      className="w-full p-3 rounded-lg glass-gradient border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-primary/20 transition-colors text-white/90 placeholder:text-white/50"
                      rows={3}
                    />
                    <div className="flex justify-end space-x-3">
                      <Button
                        variant="ghost"
                        onClick={() => setReplyingTo(null)}
                        className="text-white/70 hover:text-white hover:bg-white/10"
                      >
                        Anulează
                      </Button>
                      <Button
                        onClick={() => handleReply(post.id)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Răspunde
                      </Button>
                    </div>
                  </motion.div>
                )}

                {post.replies.length > 0 && (
                  <div className="mt-4 space-y-4 pl-6 border-l border-white/10">
                    {post.replies.map((reply) => (
                      <motion.div
                        key={reply.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-gradient rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent via-primary to-secondary flex items-center justify-center text-white text-sm font-bold shadow-lg">
                              {reply.author[0]}
                            </div>
                            <span className="font-medium text-white/90">{reply.author}</span>
                          </div>
                          <span className="text-sm text-white/60">{reply.timestamp}</span>
                        </div>
                        <p className="text-white/80">{reply.content}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center space-x-1 text-sm text-white/70 hover:text-white hover:bg-white/10"
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{reply.likes}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center space-x-1 text-sm text-white/70 hover:text-white hover:bg-white/10"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>Răspunde</span>
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <FileViewerModal
        isOpen={selectedFile !== null}
        onClose={() => setSelectedFile(null)}
        file={selectedFile}
      />
    </motion.div>
  );
};

export default TopicPosts;