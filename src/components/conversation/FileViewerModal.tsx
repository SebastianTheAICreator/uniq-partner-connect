import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Download, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface FileViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    type: 'image' | 'video' | 'document';
    preview?: string;
    file: File;
  } | null;
}

const FileViewerModal = ({ isOpen, onClose, file }: FileViewerModalProps) => {
  if (!file) return null;

  const handleDownload = () => {
    const url = file.preview || URL.createObjectURL(file.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    if (!file.preview) URL.revokeObjectURL(url);
  };

  const openInNewTab = () => {
    const url = file.preview || URL.createObjectURL(file.file);
    window.open(url, '_blank');
    if (!file.preview) URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-[80vw] max-h-[80vh] p-0 bg-black/95 border-none">
        <div className="relative w-full h-full min-h-[60vh]">
          <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/10 hover:bg-white/20"
              onClick={handleDownload}
            >
              <Download className="h-5 w-5 text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/10 hover:bg-white/20"
              onClick={openInNewTab}
            >
              <ExternalLink className="h-5 w-5 text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/10 hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-5 w-5 text-white" />
            </Button>
          </div>

          <div className="w-full h-full flex items-center justify-center p-8">
            {file.type === 'image' && (
              <img
                src={file.preview}
                alt="Preview"
                className="max-w-full max-h-[70vh] object-contain"
              />
            )}
            {file.type === 'video' && (
              <video
                controls
                className="max-w-full max-h-[70vh]"
                src={file.preview || URL.createObjectURL(file.file)}
              >
                Your browser does not support the video tag.
              </video>
            )}
            {file.type === 'document' && (
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg font-medium">{file.file.name}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Click the download button above to view this document.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileViewerModal;