
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Image, Link, Smile, PlusCircle } from 'lucide-react';

interface PremiumFeedCreatorProps {
  onPostCreated: (content: string) => void;
}

const PremiumFeedCreator = ({ onPostCreated }: PremiumFeedCreatorProps) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleSubmit = () => {
    if (!content.trim()) return;
    
    onPostCreated(content);
    setContent('');
    setIsExpanded(false);
  };
  
  const expand = () => {
    setIsExpanded(true);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
            Y
          </div>
          
          <div className="flex-1">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onClick={expand}
              placeholder="Share your thoughts..."
              className="resize-none bg-gray-800/50 border-gray-700/50 focus:border-blue-500/50 rounded-xl placeholder:text-gray-500 min-h-[60px] transition-all duration-300"
              rows={isExpanded ? 4 : 2}
            />
            
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 px-3 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                    >
                      <Image className="h-4 w-4 mr-2" />
                      <span>Image</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 px-3 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-purple-500/10"
                    >
                      <Link className="h-4 w-4 mr-2" />
                      <span>Link</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 px-3 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-amber-500/10"
                    >
                      <Smile className="h-4 w-4 mr-2" />
                      <span>Emoji</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 px-3 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-500/10"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      <span>More</span>
                    </Button>
                  </div>
                  
                  <Button
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                    className="h-9 px-5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    <span>Post</span>
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumFeedCreator;
