
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ImageIcon, FileVideo, FileUp, Download, ExternalLink, Eye } from 'lucide-react';
import FileViewerModal from '@/components/conversation/FileViewerModal';

interface Attachment {
  type: 'image' | 'video' | 'document';
  url: string;
  name?: string;
}

interface FeedAttachmentPreviewProps {
  attachments: Attachment[];
}

const FeedAttachmentPreview = ({ attachments }: FeedAttachmentPreviewProps) => {
  const [selectedFile, setSelectedFile] = useState<{
    type: 'image' | 'video' | 'document';
    preview?: string;
    file: File;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!attachments || attachments.length === 0) return null;

  const handleFileClick = async (attachment: Attachment) => {
    if (attachment.type === 'document') {
      // For documents, download directly
      const link = document.createElement('a');
      link.href = attachment.url;
      link.download = attachment.name || 'document';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // For images and videos, open in modal
    try {
      const response = await fetch(attachment.url);
      const blob = await response.blob();
      const file = new File([blob], attachment.name || 'file', { type: blob.type });
      
      setSelectedFile({
        type: attachment.type,
        preview: attachment.url,
        file
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error loading file:', error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-4 w-4 text-blue-400" />;
      case 'video':
        return <FileVideo className="h-4 w-4 text-purple-400" />;
      case 'document':
        return <FileUp className="h-4 w-4 text-green-400" />;
      default:
        return <FileUp className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {attachments.map((attachment, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {attachment.type === 'image' ? (
                <div 
                  className="relative aspect-video rounded-lg overflow-hidden bg-gray-800/50 border border-gray-700/50 cursor-pointer group-hover:border-gray-600 transition-all"
                  onClick={() => handleFileClick(attachment)}
                >
                  <img 
                    src={attachment.url} 
                    alt={attachment.name || 'Image'} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div 
                  className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 cursor-pointer group-hover:border-gray-600 transition-all"
                  onClick={() => handleFileClick(attachment)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                      {getIcon(attachment.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {attachment.name || `${attachment.type} file`}
                      </p>
                      <p className="text-xs text-gray-400 capitalize">
                        {attachment.type}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {attachment.type === 'document' ? (
                        <Download className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <FileViewerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFile(null);
        }}
        file={selectedFile}
      />
    </>
  );
};

export default FeedAttachmentPreview;
