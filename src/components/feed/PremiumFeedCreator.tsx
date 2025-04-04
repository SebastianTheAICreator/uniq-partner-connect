
import { useState, useRef, useEffect } from 'react';
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
  ChevronUp, 
  Sparkles,
  UserCircle,
  Mic,
  FileText,
  Hash
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
      className={cn(
        "w-full backdrop-blur-lg rounded-xl",
        className
      )}
    >
      <motion.div
        initial="initial"
        animate={isExpanded ? "expanded" : "initial"}
        variants={{
          initial: { boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" },
          expanded: { boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)" }
        }}
        className={cn(
          "relative overflow-hidden rounded-xl border transition-all duration-300",
          "bg-gradient-to-b from-[#1c1f2e]/80 to-[#141625]/90",
          "border-[#2a2f45]/50 hover:border-[#2a3154]",
          isExpanded ? "shadow-2xl" : "shadow-xl"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!isExpanded ? handleExpand : undefined}
      >
        {/* Glow effect at top edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        
        {/* Glow effect at bottom edge */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        
        <div className={cn(
          "p-5 transition-all duration-300",
          isExpanded ? "p-6" : "p-4"
        )}>
          {isExpanded && (
            <div className="flex justify-between items-center mb-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                  <UserCircle className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90">Create a post</p>
                  <p className="text-xs text-white/50">Visible to everyone in your network</p>
                </div>
              </motion.div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-8 w-8 p-0 rounded-full text-white/70 hover:text-white hover:bg-white/10"
              >
                <ChevronUp className="h-4 w-4" />
                <span className="sr-only">Minimize</span>
              </Button>
            </div>
          )}

          <div className={cn(
            "w-full transition-all duration-300 relative rounded-lg overflow-hidden",
            isDragging && "ring-2 ring-blue-500/30"
          )}>
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={isExpanded ? "What's on your mind?" : "Share something with your network..."}
              className={cn(
                "w-full resize-none transition-all duration-300 border-0",
                "bg-[#1E2235]/80 text-white/90 placeholder:text-white/40",
                "focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/40",
                isExpanded ? "min-h-[120px] py-4 px-5 text-base" : "min-h-[56px] py-4 px-4 text-sm"
              )}
            />

            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg">
                <div className="bg-[#141625]/90 px-4 py-2 rounded-full border border-blue-500/30">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-300 font-medium text-sm">Drop files here</span>
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
                          className="h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs font-medium"
                        >
                          <ImageIcon className="h-3.5 w-3.5 mr-2 text-blue-400" />
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
                          className="h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs font-medium"
                        >
                          <FileVideo className="h-3.5 w-3.5 mr-2 text-purple-400" />
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
                          className="h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs font-medium"
                        >
                          <FileText className="h-3.5 w-3.5 mr-2 text-pink-400" />
                          Document
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add a document</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost"
                          className="h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs font-medium"
                        >
                          <Smile className="h-3.5 w-3.5 mr-2 text-amber-400" />
                          Emoji
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add emoji</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost"
                          className="h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-xs font-medium"
                        >
                          <Hash className="h-3.5 w-3.5 mr-2 text-green-400" />
                          Tag
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add topic tag</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Button 
                  onClick={handlePostSubmit}
                  disabled={!content.trim()}
                  className={cn(
                    "h-9 px-4 rounded-lg gap-2 text-white font-medium text-sm",
                    "bg-gradient-to-r from-blue-500 to-purple-500",
                    "hover:from-blue-600 hover:to-purple-600",
                    "shadow-lg shadow-blue-500/20",
                    "border border-white/10",
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
