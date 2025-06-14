
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { X, MessageCircle, Users, TrendingUp, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import FeedPost from './FeedPost';
import ThreadReply from './ThreadReply';
import ThreadReplyInput from './ThreadReplyInput';
import { Post } from './FeedPost';

export interface ThreadReply {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role?: string;
    verified?: boolean;
  };
  timestamp: string;
  likes: number;
  hasLiked?: boolean;
  parentId?: string;
  replies?: ThreadReply[];
}

export interface ThreadData {
  post: Post;
  replies: ThreadReply[];
  stats: {
    totalReplies: number;
    participants: number;
    engagementRate: number;
  };
}

interface ThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  threadData: ThreadData | null;
  onReply: (content: string, parentId?: string) => void;
  onLikeReply: (replyId: string) => void;
}

const ThreadModal = ({
  isOpen,
  onClose,
  threadData,
  onReply,
  onLikeReply
}: ThreadModalProps) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  if (!threadData) return null;

  const { post, replies, stats } = threadData;

  const handleReplySubmit = (content: string) => {
    onReply(content, replyingTo || undefined);
    setReplyingTo(null);
  };

  const handleReplyToReply = (replyId: string) => {
    setReplyingTo(replyId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 bg-gray-900 border-gray-700">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Thread Discussion
                </DialogTitle>
                <DialogDescription className="sr-only">
                  View and participate in the thread discussion for this post
                </DialogDescription>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-blue-900/20 text-blue-300 border-blue-500/30">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    {stats.totalReplies} replies
                  </Badge>
                  <Badge variant="outline" className="bg-purple-900/20 text-purple-300 border-purple-500/30">
                    <Users className="h-3 w-3 mr-1" />
                    {stats.participants} participants
                  </Badge>
                  <Badge variant="outline" className="bg-green-900/20 text-green-300 border-green-500/30">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stats.engagementRate}% engagement
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                <div className="relative">
                  <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                  <FeedPost post={post} className="ml-4 border-l-0" />
                </div>

                <Separator className="bg-gray-800" />

                <ThreadReplyInput
                  onSubmit={handleReplySubmit}
                  onCancel={() => setReplyingTo(null)}
                  placeholder={replyingTo ? "Write a reply..." : "Join the conversation..."}
                />

                {replies.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-px bg-gradient-to-r from-gray-700 to-transparent flex-1" />
                      <span className="text-sm text-gray-400 px-3">
                        {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
                      </span>
                      <div className="h-px bg-gradient-to-l from-gray-700 to-transparent flex-1" />
                    </div>

                    <AnimatePresence>
                      {replies.map((reply, index) => (
                        <motion.div
                          key={reply.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <ThreadReply
                            reply={reply}
                            onLike={() => onLikeReply(reply.id)}
                            onReply={() => handleReplyToReply(reply.id)}
                            isReplying={replyingTo === reply.id}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {replies.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
                      <MessageCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Start the conversation</h3>
                    <p className="text-gray-400">Be the first to reply to this post</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThreadModal;
