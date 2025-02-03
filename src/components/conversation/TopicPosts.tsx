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
  parentId?: string;
  depth?: number;
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
        likes: 3,
        parentId: '1',
        depth: 1,
        attachments: []
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

  const handlePostCreated = (post: { content: string; files: FilePreview[] }) => {
    console.log('Creating new post:', post);
    const newPost: Post = {
      id: Date.now().toString(),
      content: post.content,
      author: 'CurrentUser',
      timestamp: 'acum',
      likes: 0,
      dislikes: 0,
      replies: [],
      attachments: post.files
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    toast({
      title: "Postare creată!",
      description: "Postarea ta a fost publicată cu succes.",
    });
  };

  const handleFileClick = (file: FilePreview) => {
    console.log('Opening file preview:', file);
    setSelectedFile({
      type: file.type,
      preview: file.preview,
      file: file.file
    });
  };

  const handleReplyFileSelect = (type: 'image' | 'video' | 'document') => {
    console.log('Selecting file of type:', type);
    if (replyFileInputRef.current) {
      replyFileInputRef.current.accept = type === 'image' 
        ? 'image/*' 
        : type === 'video' 
          ? 'video/*' 
          : '.pdf,.doc,.docx,.txt';
      replyFileInputRef.current.click();
    }
  };

  const handleReplyFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const fileType = file.type.startsWith('image/') 
        ? 'image' 
        : file.type.startsWith('video/') 
          ? 'video' 
          : 'document';

      const filePreview: FilePreview = {
        id: Date.now().toString(),
        file,
        type: fileType,
      };

      if (fileType === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setReplyFiles(prev => [...prev, {
            ...filePreview,
            preview: reader.result as string
          }]);
        };
        reader.readAsDataURL(file);
      } else {
        setReplyFiles(prev => [...prev, filePreview]);
      }
    });

    // Reset input
    if (event.target) {
      event.target.value = '';
    }
  };

  const removeReplyFile = (fileId: string) => {
    console.log('Removing file:', fileId);
    setReplyFiles(prev => prev.filter(file => file.id !== fileId));
  };

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
                parentId: postId,
                depth: 1,
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

  const renderReplies = (replies: Reply[], postId: string) => {
    return replies.map((reply) => (
      <motion.div
        key={reply.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`ml-8 mt-4 relative ${reply.depth && reply.depth > 0 ? 'pl-4' : ''}`}
      >
        <div 
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-secondary/20 to-accent/20"
          style={{
            left: '0.5rem',
            top: '2rem',
            bottom: '0.5rem'
          }}
        />
        
        <div 
          className="absolute w-4 h-0.5 bg-gradient-to-r from-primary/20 to-secondary/20"
          style={{
            left: '0.5rem',
            top: '2rem'
          }}
        />

        <div className="glass-card rounded-xl p-4 space-y-3 hover:shadow-[0_8px_32px_rgba(139,92,246,0.1)] transition-all duration-300 border-glow">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 via-secondary/80 to-accent/80 flex items-center justify-center text-white font-bold text-sm">
              {reply.author[0]}
            </div>
            <div>
              <span className="font-medium text-white/90">{reply.author}</span>
              <p className="text-sm text-white/60">{reply.timestamp}</p>
            </div>
          </div>

          <p className="text-white/80">{reply.content}</p>

          {reply.attachments && reply.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {reply.attachments.map((file, index) => (
                <div 
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => handleFileClick(file)}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden glass-gradient flex items-center justify-center border border-white/10">
                    {file.preview ? (
                      <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-white/60">
                        {file.type === 'video' && <FileVideo className="w-6 h-6" />}
                        {file.type === 'document' && <Paperclip className="w-6 h-6" />}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-4 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyingTo(reply.id)}
              className="text-white/70 hover:text-white hover:bg-white/10 text-xs"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Răspunde
            </Button>
          </div>
        </div>

        {replyingTo === reply.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-4 ml-8"
          >
            <div className="relative">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Scrie un răspuns..."
                className="w-full p-4 rounded-xl 
                          bg-gradient-to-br from-[#1a1a2e]/50 to-[#16213e]/50
                          backdrop-blur-lg border border-primary/20
                          focus:border-primary/40 focus:ring-2 focus:ring-primary/30
                          transition-all duration-300
                          text-white/90 placeholder:text-white/40
                          shadow-[0_8px_32px_rgba(124,58,237,0.15)]
                          hover:border-primary/30 hover:shadow-primary/10"
                rows={3}
              />
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
                  onClick={() => handleReply(postId)}
                  className="bg-gradient-to-r from-primary via-secondary to-accent 
                           hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90
                           text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={!replyContent.trim()}
                >
                  Răspunde
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    ));
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

      <ScrollArea className="h-[calc(100vh-12rem)]">
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-white font-bold">
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

                {post.replies.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {renderReplies(post.replies, post.id)}
                  </div>
                )}

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
                        className="w-full p-4 rounded-xl 
                                  bg-gradient-to-br from-[#1a1a2e]/50 to-[#16213e]/50
                                  backdrop-blur-lg border border-primary/20
                                  focus:border-primary/40 focus:ring-2 focus:ring-primary/30
                                  transition-all duration-300
                                  text-white/90 placeholder:text-white/40
                                  shadow-[0_8px_32px_rgba(124,58,237,0.15)]
                                  hover:border-primary/30 hover:shadow-primary/10"
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