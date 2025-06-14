
import { useState, useCallback } from 'react';
import { Post } from '@/components/feed/FeedPost';
import { FilePreview } from '@/components/conversation/post/types';

export interface NewPost {
  content: string;
  files: FilePreview[];
}

interface PaginationState {
  currentPage: number;
  hasNextPage: boolean;
  isLoading: boolean;
  postsPerPage: number;
}

export const useFeedPosts = (initialPosts: Post[]) => {
  const [allPosts, setAllPosts] = useState<Post[]>(initialPosts);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>(initialPosts.slice(0, 5));
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    hasNextPage: initialPosts.length > 5,
    isLoading: false,
    postsPerPage: 5
  });

  const loadMorePosts = useCallback(() => {
    if (pagination.isLoading || !pagination.hasNextPage) return;

    setPagination(prev => ({ ...prev, isLoading: true }));

    // Simulate loading delay
    setTimeout(() => {
      const nextPage = pagination.currentPage + 1;
      const startIndex = (nextPage - 1) * pagination.postsPerPage;
      const endIndex = startIndex + pagination.postsPerPage;
      const newPosts = allPosts.slice(startIndex, endIndex);

      if (newPosts.length > 0) {
        setDisplayedPosts(prev => [...prev, ...newPosts]);
        setPagination(prev => ({
          ...prev,
          currentPage: nextPage,
          hasNextPage: endIndex < allPosts.length,
          isLoading: false
        }));
      } else {
        setPagination(prev => ({
          ...prev,
          hasNextPage: false,
          isLoading: false
        }));
      }
    }, 1000);
  }, [allPosts, pagination]);

  const createPost = useCallback((newPost: NewPost) => {
    const post: Post = {
      id: Math.random().toString(36).substr(2, 9),
      content: newPost.content,
      author: {
        id: 'current-user',
        name: 'You',
        role: 'User',
        avatar: '',
        verified: false
      },
      timestamp: 'now',
      stats: {
        likes: 0,
        dislikes: 0,
        replies: 0,
        shares: 0,
        views: 1
      },
      tags: extractTags(newPost.content),
      isPinned: false,
      attachments: newPost.files.map(file => ({
        type: file.type,
        url: file.preview || URL.createObjectURL(file.file),
        name: file.file.name
      })),
      comments: []
    };

    setAllPosts(prevPosts => [post, ...prevPosts]);
    setDisplayedPosts(prevPosts => [post, ...prevPosts]);
    
    // Update pagination
    setPagination(prev => ({
      ...prev,
      hasNextPage: allPosts.length + 1 > displayedPosts.length + 1
    }));

    return post;
  }, [allPosts.length, displayedPosts.length]);

  const updatePost = useCallback((postId: string, updates: Partial<Post>) => {
    setAllPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId ? { ...post, ...updates } : post
      )
    );
    setDisplayedPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId ? { ...post, ...updates } : post
      )
    );
  }, []);

  const deletePost = useCallback((postId: string) => {
    setAllPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    setDisplayedPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  }, []);

  return {
    posts: displayedPosts,
    allPosts,
    pagination,
    loadMorePosts,
    createPost,
    updatePost,
    deletePost
  };
};

// Helper function to extract hashtags from content
const extractTags = (content: string): string[] => {
  const hashtags = content.match(/#\w+/g);
  return hashtags ? hashtags.map(tag => tag.slice(1)) : [];
};
