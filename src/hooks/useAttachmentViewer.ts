
import { useState } from 'react';
import { CommentAttachment } from '@/types/comment';
import { FilePreview } from '@/components/conversation/post/types';

export interface AttachmentViewerFile {
  type: 'image' | 'video' | 'document';
  preview?: string;
  file: File;
}

export const useAttachmentViewer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<AttachmentViewerFile | null>(null);

  const openViewer = (attachment: CommentAttachment | FilePreview) => {
    // Convert CommentAttachment to AttachmentViewerFile format
    if ('url' in attachment) {
      // CommentAttachment case
      const file = new File([''], attachment.name || 'file', { 
        type: attachment.type === 'image' ? 'image/jpeg' : 'application/octet-stream' 
      });
      
      setCurrentFile({
        type: attachment.type === 'document' ? 'document' : attachment.type as 'image' | 'video',
        preview: attachment.previewUrl || attachment.url,
        file
      });
    } else {
      // FilePreview case
      setCurrentFile({
        type: attachment.type,
        preview: attachment.preview,
        file: attachment.file
      });
    }
    setIsOpen(true);
  };

  const closeViewer = () => {
    setIsOpen(false);
    setCurrentFile(null);
  };

  return {
    isOpen,
    currentFile,
    openViewer,
    closeViewer
  };
};
