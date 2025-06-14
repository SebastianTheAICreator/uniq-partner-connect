
import { useState, useCallback } from 'react';
import { Post } from '@/components/feed/FeedPost';
import { FilePreview } from '@/components/conversation/post/types';

export interface NewPost {
  content: string;
  files: FilePreview[];
}

export const useFeedPosts = (initialPosts: Post[]) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

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
      attachments: newPost.files.map(file => ({
        type: file.type,
        url: file.preview || URL.createObjectURL(file.file),
        name: file.file.name
      })),
      comments: []
    };

    setPosts(prevPosts => [post, ...prevPosts]);
    return post;
  }, []);

  const updatePost = useCallback((postId: string, updates: Partial<Post>) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId ? { ...post, ...updates } : post
      )
    );
  }, []);

  const deletePost = useCallback((postId: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  }, []);

  return {
    posts,
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
