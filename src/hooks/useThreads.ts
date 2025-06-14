
import { useState, useCallback } from 'react';
import { ThreadData, ThreadReply } from '@/components/feed/ThreadModal';
import { Post } from '@/components/feed/FeedPost';

// Mock reply data
const mockReplies: Record<string, ThreadReply[]> = {
  '1': [
    {
      id: 'reply1',
      content: 'This is absolutely revolutionary! The productivity gains we\'ve seen in our beta testing are incredible. Can\'t wait to see how this scales across different industries.',
      author: {
        id: 'user4',
        name: 'David Kim',
        role: 'Product Manager',
        verified: true
      },
      timestamp: '1h ago',
      likes: 24,
      hasLiked: false,
      replies: [
        {
          id: 'reply1-1',
          content: 'Totally agree! We\'ve been testing it internally and the results speak for themselves. The automation features alone save us 2-3 hours per day.',
          author: {
            id: 'user5',
            name: 'Sarah Wilson',
            role: 'Developer',
            verified: false
          },
          timestamp: '45m ago',
          likes: 8,
          hasLiked: true
        }
      ]
    },
    {
      id: 'reply2',
      content: 'Amazing work! The AI integration is seamless. Our team productivity has increased by over 250% since we started using the beta version.',
      author: {
        id: 'user6',
        name: 'Marcus Johnson',
        role: 'Engineering Lead',
        verified: true
      },
      timestamp: '2h ago',
      likes: 31,
      hasLiked: false
    }
  ],
  '2': [
    {
      id: 'reply3',
      content: 'Fascinating analysis! The shift towards mobile-first experiences is particularly interesting. How do you see this affecting B2B markets specifically?',
      author: {
        id: 'user7',
        name: 'Lisa Chen',
        role: 'Strategy Consultant',
        verified: true
      },
      timestamp: '3h ago',
      likes: 12,
      hasLiked: false
    }
  ],
  '3': [
    {
      id: 'reply4',
      content: 'Congratulations on the funding! This is exactly the kind of innovation we need in the data space. Looking forward to seeing your global expansion.',
      author: {
        id: 'user8',
        name: 'Alex Rodriguez',
        role: 'Investor',
        verified: true
      },
      timestamp: '12h ago',
      likes: 18,
      hasLiked: false
    }
  ]
};

export const useThreads = () => {
  const [threads, setThreads] = useState<Record<string, ThreadData>>({});
  const [openThreadId, setOpenThreadId] = useState<string | null>(null);

  const getThreadData = useCallback((post: Post): ThreadData => {
    const existingThread = threads[post.id];
    if (existingThread) {
      return existingThread;
    }

    const replies = mockReplies[post.id] || [];
    const participants = new Set();
    
    const countParticipantsRecursive = (replies: ThreadReply[]) => {
      replies.forEach(reply => {
        participants.add(reply.author.id);
        if (reply.replies) {
          countParticipantsRecursive(reply.replies);
        }
      });
    };
    
    countParticipantsRecursive(replies);
    
    const threadData: ThreadData = {
      post,
      replies,
      stats: {
        totalReplies: post.stats.replies,
        participants: participants.size,
        engagementRate: Math.round((post.stats.likes + post.stats.replies) / post.stats.views * 100)
      }
    };

    setThreads(prev => ({ ...prev, [post.id]: threadData }));
    return threadData;
  }, [threads]);

  const openThread = useCallback((postId: string) => {
    console.log('Opening thread for post:', postId);
    setOpenThreadId(postId);
  }, []);

  const closeThread = useCallback(() => {
    console.log('Closing thread');
    setOpenThreadId(null);
  }, []);

  const addReply = useCallback((postId: string, content: string, parentId?: string) => {
    console.log('Adding reply to post:', postId, 'content:', content, 'parentId:', parentId);
    
    const newReply: ThreadReply = {
      id: `reply-${Date.now()}`,
      content,
      author: {
        id: 'current-user',
        name: 'You',
        verified: false
      },
      timestamp: 'now',
      likes: 0,
      hasLiked: false,
      parentId
    };

    setThreads(prev => {
      const thread = prev[postId];
      if (!thread) return prev;

      let updatedReplies = [...thread.replies];
      
      if (parentId) {
        // Find parent and add nested reply
        const updateRepliesRecursive = (replies: ThreadReply[]): ThreadReply[] => {
          return replies.map(reply => {
            if (reply.id === parentId) {
              return {
                ...reply,
                replies: [...(reply.replies || []), newReply]
              };
            } else if (reply.replies) {
              return {
                ...reply,
                replies: updateRepliesRecursive(reply.replies)
              };
            }
            return reply;
          });
        };
        updatedReplies = updateRepliesRecursive(updatedReplies);
      } else {
        updatedReplies.push(newReply);
      }

      return {
        ...prev,
        [postId]: {
          ...thread,
          replies: updatedReplies,
          stats: {
            ...thread.stats,
            totalReplies: thread.stats.totalReplies + 1
          }
        }
      };
    });
  }, []);

  const likeReply = useCallback((postId: string, replyId: string) => {
    console.log('Liking reply:', replyId, 'in post:', postId);
    
    setThreads(prev => {
      const thread = prev[postId];
      if (!thread) return prev;

      const updateRepliesRecursive = (replies: ThreadReply[]): ThreadReply[] => {
        return replies.map(reply => {
          if (reply.id === replyId) {
            const wasLiked = reply.hasLiked;
            return {
              ...reply,
              hasLiked: !wasLiked,
              likes: wasLiked ? reply.likes - 1 : reply.likes + 1
            };
          } else if (reply.replies) {
            return {
              ...reply,
              replies: updateRepliesRecursive(reply.replies)
            };
          }
          return reply;
        });
      };

      return {
        ...prev,
        [postId]: {
          ...thread,
          replies: updateRepliesRecursive(thread.replies)
        }
      };
    });
  }, []);

  return {
    getThreadData,
    openThread,
    closeThread,
    addReply,
    likeReply,
    openThreadId,
    currentThread: openThreadId ? threads[openThreadId] : null
  };
};
