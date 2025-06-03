
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, LayoutGrid, LayoutList, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilterState } from '../CommunityConversations';
import { cn } from '@/lib/utils';

interface ConversationFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
}

const availableTags = [
  'Design', 'Technology', 'AI', 'Business', 'Education', 'Gaming', 'Health', 'Travel'
];

const ConversationFilters = ({ filters, onFiltersChange }: ConversationFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleTagToggle = (tag: string) => {
    const newTags = filters.selectedTags.includes(tag)
      ? filters.selectedTags.filter(t => t !== tag)
      : [...filters.selectedTags, tag];
    
    onFiltersChange({ selectedTags: newTags });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      searchQuery: '',
      selectedTags: [],
      sortBy: 'recent'
    });
    setShowAdvanced(false);
  };

  const hasActiveFilters = filters.searchQuery || filters.selectedTags.length > 0;

  return (
    <section className="sticky top-16 z-20 bg-[#0F1117]/95 backdrop-blur-xl border-b border-white/5 py-6 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              type="search"
              placeholder="Caută conversații..."
              value={filters.searchQuery}
              onChange={(e) => onFiltersChange({ searchQuery: e.target.value })}
              className="pl-10 bg-white/5 border-white/10 focus:border-purple-500/30 text-white placeholder:text-white/40"
            />
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
            {(['recent', 'popular', 'trending'] as const).map((sort) => (
              <Button
                key={sort}
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 px-3 rounded-md text-sm transition-all",
                  filters.sortBy === sort
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
                onClick={() => onFiltersChange({ sortBy: sort })}
              >
                {sort === 'recent' && 'Recente'}
                {sort === 'popular' && 'Populare'}
                {sort === 'trending' && 'Trending'}
              </Button>
            ))}
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 w-8 p-0",
                filters.viewMode === 'grid'
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white"
              )}
              onClick={() => onFiltersChange({ viewMode: 'grid' })}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 w-8 p-0",
                filters.viewMode === 'list'
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white"
              )}
              onClick={() => onFiltersChange({ viewMode: 'list' })}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>

          {/* Advanced Filters Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 px-3 gap-2",
              showAdvanced || hasActiveFilters
                ? "bg-purple-500/20 text-purple-300"
                : "text-white/60 hover:text-white"
            )}
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtre
            {hasActiveFilters && (
              <Badge className="bg-purple-500 text-white text-xs h-5 w-5 p-0 flex items-center justify-center">
                {filters.selectedTags.length + (filters.searchQuery ? 1 : 0)}
              </Badge>
            )}
          </Button>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-white/90">Filtrează după tag-uri</h3>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs text-white/60 hover:text-white"
                    onClick={clearAllFilters}
                  >
                    Resetează toate
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <Badge
                    key={tag}
                    className={cn(
                      "cursor-pointer transition-all",
                      filters.selectedTags.includes(tag)
                        ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                        : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
                    )}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                    {filters.selectedTags.includes(tag) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ConversationFilters;
