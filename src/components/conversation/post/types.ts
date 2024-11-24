export interface FilePreview {
  id: string;
  file: File;
  type: 'image' | 'video' | 'document';
  preview?: string;
}

export interface CreatePostProps {
  topicId: string;
  onPostCreated: (post: { content: string; files: FilePreview[] }) => void;
}