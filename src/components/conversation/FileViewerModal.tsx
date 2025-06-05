
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Download, ExternalLink, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
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
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

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

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 300));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 25));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const resetView = () => {
    setZoom(100);
    setRotation(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black/95 border-white/10">
        <div className="relative w-full h-full min-h-[70vh]">
          {/* Header Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50">
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
              <span className="text-white text-sm font-medium">{file.file.name}</span>
              {file.type === 'image' && (
                <span className="text-white/60 text-xs">{zoom}%</span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {file.type === 'image' && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                    onClick={handleZoomOut}
                    disabled={zoom <= 25}
                  >
                    <ZoomOut className="h-4 w-4 text-white" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                    onClick={handleZoomIn}
                    disabled={zoom >= 300}
                  >
                    <ZoomIn className="h-4 w-4 text-white" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                    onClick={handleRotate}
                  >
                    <RotateCw className="h-4 w-4 text-white" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white"
                    onClick={resetView}
                  >
                    Reset
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                onClick={openInNewTab}
              >
                <ExternalLink className="h-4 w-4 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                onClick={onClose}
              >
                <X className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="w-full h-full flex items-center justify-center p-8 pt-20">
            {file.type === 'image' && (
              <div className="overflow-auto max-w-full max-h-full">
                <img
                  src={file.preview}
                  alt="Preview"
                  className="transition-all duration-300 ease-in-out"
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    maxWidth: zoom <= 100 ? '100%' : 'none',
                    maxHeight: zoom <= 100 ? '100%' : 'none',
                  }}
                />
              </div>
            )}
            {file.type === 'video' && (
              <video
                controls
                className="max-w-full max-h-[70vh] rounded-lg"
                src={file.preview || URL.createObjectURL(file.file)}
              >
                Your browser does not support the video tag.
              </video>
            )}
            {file.type === 'document' && (
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
                <div className="text-center">
                  <div className="h-16 w-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-indigo-400">📄</span>
                  </div>
                  <p className="text-lg font-medium text-white mb-2">{file.file.name}</p>
                  <p className="text-sm text-white/60 mb-4">
                    Faceți clic pe butonul de descărcare pentru a vizualiza acest document.
                  </p>
                  <Button onClick={handleDownload} className="bg-indigo-500 hover:bg-indigo-600">
                    <Download className="h-4 w-4 mr-2" />
                    Descarcă
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileViewerModal;
