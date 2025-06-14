
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PostData } from './post/PremiumPost';
import { ReplyData } from './post/PremiumReply';
import { FilePreview } from './post/types';
import PremiumPost from './post/PremiumPost';
import PremiumReply from './post/PremiumReply';
import PremiumReplyInput from './post/PremiumReplyInput';
import FileViewerModal from './FileViewerModal';
import { useAttachmentViewer } from '@/hooks/useAttachmentViewer';

interface PostThreadProps {
  post: PostData;
  replies: ReplyData[];
  replyingTo: string | null;
  onReplyClick: (postId: string) => void;
  onLikeClick: (postId: string) => void;
  onDislikeClick: (postId: string) => void;
  onShareClick: (postId: string) => void;
  onReply: (postId: string, content: string, files: FilePreview[]) => void;
  onReplyToReply: (parentId: string, content: string, files: FilePreview[]) => void;
  onLikeReply: (replyId: string) => void;
  onCancelReply: () => void;
  onImageClick?: (file: FilePreview) => void;
}

const PostThread = ({
  post,
  replies,
  replyingTo,
  onReplyClick,
  onLikeClick,
  onDislikeClick,
  onShareClick,
  onReply,
  onReplyToReply,
  onLikeReply,
  onCancelReply,
  onImageClick
}: PostThreadProps) => {
  const { isOpen: viewerOpen, currentFile, openViewer, closeViewer } = useAttachmentViewer();

  const handleImageClick = (file: FilePreview) => {
    if (onImageClick) {
      onImageClick(file);
    } else {
      openViewer(file);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Main Post */}
        <PremiumPost
          post={post}
          onReplyClick={onReplyClick}
          onLikeClick={onLikeClick}
          onDislikeClick={onDislikeClick}
          onShareClick={onShareClick}
          onImageClick={handleImageClick}
        />
        
        {/* Reply Input */}
        <div className="ml-8">
          <AnimatePresence>
            {replyingTo === post.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <PremiumReplyInput
                  postId={post.id}
                  onReply={onReply}
                  onCancel={onCancelReply}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Replies */}
          {replies.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px bg-gradient-to-r from-indigo-500/30 to-transparent flex-1" />
                <span className="text-xs text-white/50 px-2">
                  {replies.length} {replies.length === 1 ? 'răspuns' : 'răspunsuri'}
                </span>
                <div className="h-px bg-gradient-to-l from-indigo-500/30 to-transparent flex-1" />
              </div>
              
              {replies.map((reply) => (
                <PremiumReply
                  key={reply.id}
                  reply={reply}
                  onReplyToReply={onReplyToReply}
                  onLike={onLikeReply}
                  onImageClick={handleImageClick}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <FileViewerModal
        isOpen={viewerOpen}
        onClose={closeViewer}
        file={currentFile}
      />
    </>
  );
};

export default PostThread;
