
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Image as ImageIcon, 
  FileVideo, 
  Link2, 
  Smile, 
  Send, 
  ChevronDown,
  Hash,
  UserCircle,
  X,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PremiumFeedCreatorProps {
  onPostCreated: (content: string) => void;
  className?: string;
}

const PremiumFeedCreator = ({ onPostCreated, className }: PremiumFeedCreatorProps) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePostSubmit = () => {
    if (content.trim()) {
      onPostCreated(content);
      setContent('');
      setIsExpanded(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setIsExpanded(true);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full", className)}
    >
      <motion.div
        initial="initial"
        animate={isExpanded ? "expanded" : "initial"}
        variants={{
          initial: { boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" },
          expanded: { boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.15)" }
        }}
        className={cn(
          "relative rounded-2xl transition-all duration-300",
          "bg-gray-900 border border-gray-800",
          isExpanded ? "shadow-xl" : "shadow-md hover:shadow-lg"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!isExpanded ? handleExpand : undefined}
      >
        <div className={cn(
          "p-5 transition-all duration-300",
          isExpanded ? "p-6" : "p-4"
        )}>
          {isExpanded ? (
            <div className="flex justify-between items-center mb-5">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center ring-2 ring-gray-700 ring-offset-2 ring-offset-gray-900">
                  <UserCircle className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">Create a post</p>
                  <p className="text-xs text-gray-500">Share your thoughts with your network</p>
                </div>
              </motion.div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center">
                <UserCircle className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-400">What's on your mind?</p>
            </div>
          )}

          <div className={cn(
            "w-full transition-all duration-300 relative rounded-xl overflow-hidden",
            isDragging && "ring-2 ring-gray-700",
            !isExpanded && "bg-gray-800"
          )}>
            {isExpanded ? (
              <Textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts..."
                className={cn(
                  "w-full resize-none transition-all duration-300 border-0",
                  "bg-gray-800 text-gray-200 placeholder:text-gray-500",
                  "focus:ring-1 focus:ring-gray-700 focus:border-gray-700",
                  "min-h-[120px] py-4 px-5 text-base rounded-xl"
                )}
              />
            ) : (
              <div className="h-10 px-4 flex items-center text-gray-500 text-sm cursor-text">
                Write a post...
              </div>
            )}

            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm rounded-xl">
                <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4 text-gray-300" />
                    <span className="text-gray-300 font-medium text-sm">Drop files here</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mt-5 flex flex-wrap gap-2 items-center justify-between"
              >
                <div className="flex flex-wrap gap-2 items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost"
                          className="h-9 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800 text-xs font-medium"
                        >
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Image
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add an image</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost"
                          className="h-9 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800 text-xs font-medium"
                        >
                          <FileVideo className="h-4 w-4 mr-2" />
                          Video
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add a video</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost"
                          className="h-9 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800 text-xs font-medium"
                        >
                          <Hash className="h-4 w-4 mr-2" />
                          Tag
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add topic tag</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost"
                          className="h-9 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800 text-xs font-medium"
                        >
                          <Smile className="h-4 w-4 mr-2" />
                          Emoji
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add emoji</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Button 
                  onClick={handlePostSubmit}
                  disabled={!content.trim()}
                  className={cn(
                    "h-9 px-4 rounded-lg gap-2 text-gray-100",
                    "bg-gray-700 hover:bg-gray-600",
                    "border border-gray-600",
                    "transition-all duration-300",
                    (!content.trim()) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span>Publish</span>
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PremiumFeedCreator;
