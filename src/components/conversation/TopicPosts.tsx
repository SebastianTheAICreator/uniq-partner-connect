import React, { useState, useRef } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { ArrowLeft, MessageCircle, Heart, Share2, ThumbsUp, ThumbsDown, FileVideo, Paperclip, X, ImageIcon } from 'lucide-react';
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
  attachments?: FilePreview[];
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
  const [replyFiles, setReplyFiles] = useState<FilePreview[]>([]);
  const replyFileInputRef = useRef<HTMLInputElement>(null);

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
    if (replyContent.trim() || replyFiles.length > 0) {
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
                likes: 0,
                attachments: replyFiles
              }]
            };
          }
          return post;
        })
      );
      setReplyContent('');
      setReplyFiles([]);
      setReplyingTo(null);
      toast({
        title: "Răspuns adăugat!",
        description: "Răspunsul tău a fost publicat cu succes.",
      });
    }
  };

  const handleReplyFileSelect = (type: 'image' | 'video' | 'document') => {
    if (replyFileInputRef.current) {
      replyFileInputRef.current.accept = {
        image: 'image/*',
        video: 'video/*',
        document: '.pdf,.doc,.docx,.txt'
      }[type];
      replyFileInputRef.current.click();
    }
  };

  const handleReplyFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach(file => {
      const fileType = file.type.startsWith('image/') 
        ? 'image' 
        : file.type.startsWith('video/') 
          ? 'video' 
          : 'document';

      const preview = fileType === 'image' ? URL.createObjectURL(file) : undefined;

      setReplyFiles(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        file,
        type: fileType,
        preview
      }]);
    });

    if (files.length > 0) {
      toast({
        title: "Fișiere atașate",
        description: `${files.length} fișier${files.length > 1 ? 'e' : ''} ${files.length > 1 ? 'au' : 'a'} fost atașat${files.length > 1 ? 'e' : ''} cu succes!`,
      });
    }
  };

  const removeReplyFile = (id: string) => {
    setReplyFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  // Add the missing handlePostCreated function
  const handlePostCreated = ({ content, files }: { content: string; files: FilePreview[] }) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      author: 'CurrentUser',
      timestamp: 'acum',
      likes: 0,
      dislikes: 0,
      replies: [],
      attachments: files
    };
    
    setPosts(prev => [newPost, ...prev]);
    toast({
      title: "Postare creată!",
      description: "Postarea ta a fost publicată cu succes.",
    });
  };

  // Add the missing handleFileClick function
  const handleFileClick = (file: FilePreview) => {
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
                    <div className="relative">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Scrie un răspuns..."
                        className="w-full p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 
                                 backdrop-blur-lg border border-white/10 
                                 focus:border-primary/30 focus:ring-2 focus:ring-primary/20 
                                 transition-all duration-300 
                                 text-white/90 placeholder:text-white/40
                                 shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                                 hover:border-primary/20 hover:shadow-primary/5"
                        rows={3}
                      />
                      
                      {replyFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {replyFiles.map((file) => (
                            <div key={file.id} className="relative group">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm 
                                           flex items-center justify-center border border-white/10">
                                {file.preview ? (
                                  <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="text-white/60">
                                    {file.type === 'video' && <FileVideo className="w-6 h-6" />}
                                    {file.type === 'document' && <Paperclip className="w-6 h-6" />}
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => removeReplyFile(file.id)}
                                className="absolute -top-1 -right-1 bg-black/50 backdrop-blur-sm rounded-full p-1
                                         opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              >
                                <X className="w-3 h-3 text-white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReplyFileSelect('image')}
                          className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                          <ImageIcon className="w-4 h-4 mr-1" />
                          Imagine
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReplyFileSelect('video')}
                          className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                          <FileVideo className="w-4 h-4 mr-1" />
                          Video
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReplyFileSelect('document')}
                          className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                          <Paperclip className="w-4 h-4 mr-1" />
                          Document
                        </Button>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => setReplyingTo(null)}
                          className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                          Anulează
                        </Button>
                        <Button
                          onClick={() => handleReply(post.id)}
                          className="bg-gradient-to-r from-primary via-secondary to-accent 
                                   hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90
                                   text-white shadow-lg hover:shadow-xl transition-all duration-300"
                          disabled={!replyContent.trim() && replyFiles.length === 0}
                        >
                          Răspunde
                        </Button>
                      </div>
                    </div>

                    <input
                      type="file"
                      ref={replyFileInputRef}
                      onChange={handleReplyFileChange}
                      className="hidden"
                      multiple
                    />
                  </motion.div>
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
