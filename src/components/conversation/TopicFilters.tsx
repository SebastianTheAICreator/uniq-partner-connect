
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  SlidersHorizontal,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopicFiltersProps {
  searchQuery: string;
  sortBy: 'recent' | 'popular';
  onSearchChange: (query: string) => void;
  onSortChange: (sort: 'recent' | 'popular') => void;
}

const TopicFilters = ({ searchQuery, sortBy, onSearchChange, onSortChange }: TopicFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = ['design', 'ai', 'technology', 'ux', 'development'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="sticky top-32 z-10 bg-[#1A1F2C]/90 backdrop-blur-xl border-b border-[#3A4366]/30 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="Caută în conversație..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-[#141625] border-[#3A4366]/50 text-white placeholder:text-white/50 focus:ring-indigo-500/30"
            />
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-9 rounded-lg gap-2 text-white/70 hover:text-white hover:bg-white/10",
                sortBy === 'recent' && "bg-white/10 text-white"
              )}
              onClick={() => onSortChange('recent')}
            >
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Recente</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-9 rounded-lg gap-2 text-white/70 hover:text-white hover:bg-white/10",
                sortBy === 'popular' && "bg-white/10 text-white"
              )}
              onClick={() => onSortChange('popular')}
            >
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Populare</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-9 w-9 p-0 rounded-full text-white/70 hover:text-white hover:bg-white/10",
                showFilters && "bg-white/10 text-white"
              )}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-[#3A4366]/30"
            >
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-white/60 mr-2">Filtrează după:</span>
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer transition-all duration-200 capitalize",
                      selectedTags.includes(tag)
                        ? "bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30"
                        : "border-[#3A4366]/50 text-white/70 hover:bg-white/5"
                    )}
                    onClick={() => toggleTag(tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
                
                {selectedTags.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTags([])}
                    className="h-6 px-2 text-white/50 hover:text-white text-xs"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Șterge toate
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TopicFilters;
