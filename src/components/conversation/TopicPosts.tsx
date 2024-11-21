import React from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { ArrowLeft, MessageCircle, Heart, Share2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CreatePost from './CreatePost';
import CreateDiscussion from './CreateDiscussion';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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
    ]
  },
  {
    id: '2',
    content: 'O altă postare interesantă despre acest subiect.',
    author: 'User2',
    timestamp: '5 min ago',
    likes: 8,
    dislikes: 1,
    replies: []
  }
];

const TopicPosts = ({ topicId, topic, onBack }: TopicPostsProps) => {
  const [posts, setPosts] = React.useState<Post[]>(mockPosts);
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
  const [replyContent, setReplyContent] = React.useState('');
  const { toast } = useToast();

  const handleNewDiscussion = (discussion: { title: string; description: string }) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content: discussion.description,
      author: 'CurrentUser',
      timestamp: 'acum',
      likes: 0,
      dislikes: 0,
      replies: [],
    };
    setPosts([newPost, ...posts]);
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

      <CreateDiscussion onDiscussionCreated={handleNewDiscussion} />
      <CreatePost topicId={topicId} onPostCreated={() => console.log('Post created')} />

      <ScrollArea className="h-[calc(100vh-24rem)]">
        <div className="space-y-6">
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {post.author[0]}
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">{post.author}</span>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-lg">{post.content}</p>

                <div className="flex items-center space-x-6 pt-4 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={cn(
                      "flex items-center space-x-2",
                      post.hasLiked && "text-primary"
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
                      "flex items-center space-x-2",
                      post.hasDisliked && "text-red-500"
                    )}
                  >
                    <ThumbsDown className="h-5 w-5" />
                    <span>{post.dislikes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(post.id)}
                    className="flex items-center space-x-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.replies.length}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(post.id)}
                    className="flex items-center space-x-2"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-primary"
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
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      rows={3}
                    />
                    <div className="flex justify-end space-x-3">
                      <Button
                        variant="ghost"
                        onClick={() => setReplyingTo(null)}
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
                  <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-100">
                    {post.replies.map((reply) => (
                      <motion.div
                        key={reply.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                              {reply.author[0]}
                            </div>
                            <span className="font-medium text-gray-800">{reply.author}</span>
                          </div>
                          <span className="text-sm text-gray-500">{reply.timestamp}</span>
                        </div>
                        <p className="text-gray-700">{reply.content}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center space-x-1 text-sm"
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{reply.likes}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center space-x-1 text-sm"
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
    </motion.div>
  );
};

export default TopicPosts;
