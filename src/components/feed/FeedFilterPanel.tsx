
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Calendar, 
  User, 
  Tag, 
  TrendingUp, 
  Eye, 
  MessageCircle, 
  X,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterState {
  timeRange: 'all' | 'today' | 'week' | 'month';
  authors: string[];
  tags: string[];
  minViews: number | null;
  minReplies: number | null;
  verified: boolean | null;
  pinned: boolean | null;
}

interface FeedFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

const timeRangeOptions = [
  { value: 'all', label: 'All time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' }
];

const popularTags = [
  'artificial-intelligence',
  'productivity', 
  'future-of-work',
  'market-analysis',
  'consumer-trends',
  'strategy',
  'funding',
  'startup',
  'venture-capital'
];

const viewsThresholds = [
  { value: 1000, label: '1K+ views' },
  { value: 5000, label: '5K+ views' },
  { value: 10000, label: '10K+ views' },
  { value: 25000, label: '25K+ views' }
];

const repliesThresholds = [
  { value: 10, label: '10+ replies' },
  { value: 50, label: '50+ replies' },
  { value: 100, label: '100+ replies' },
  { value: 250, label: '250+ replies' }
];

const FeedFilterPanel = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  className
}: FeedFilterPanelProps) => {
  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const toggleArrayFilter = (key: 'authors' | 'tags', value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      timeRange: 'all',
      authors: [],
      tags: [],
      minViews: null,
      minReplies: null,
      verified: null,
      pinned: null
    });
  };

  const hasActiveFilters = 
    filters.timeRange !== 'all' ||
    filters.authors.length > 0 ||
    filters.tags.length > 0 ||
    filters.minViews !== null ||
    filters.minReplies !== null ||
    filters.verified !== null ||
    filters.pinned !== null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute top-full left-0 right-0 z-50 mt-2",
            "bg-gray-900 border border-gray-700/50 rounded-xl shadow-2xl",
            "backdrop-blur-xl",
            className
          )}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-100">Filters</h3>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                    Active
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <Button
                    onClick={clearAllFilters}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-gray-200 text-xs"
                  >
                    Clear all
                  </Button>
                )}
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ScrollArea className="max-h-96">
              <div className="space-y-6">
                {/* Time Range */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <label className="text-sm font-medium text-gray-200">Time Range</label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {timeRangeOptions.map((option) => (
                      <Button
                        key={option.value}
                        onClick={() => updateFilter('timeRange', option.value as any)}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "rounded-lg text-xs",
                          filters.timeRange === option.value
                            ? "bg-blue-900/30 text-blue-300 border border-blue-500/30"
                            : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                        )}
                      >
                        {filters.timeRange === option.value && (
                          <Check className="h-3 w-3 mr-1" />
                        )}
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator className="bg-gray-800/50" />

                {/* Tags */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-purple-400" />
                    <label className="text-sm font-medium text-gray-200">Tags</label>
                    {filters.tags.length > 0 && (
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
                        {filters.tags.length}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Button
                        key={tag}
                        onClick={() => toggleArrayFilter('tags', tag)}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "rounded-lg text-xs",
                          filters.tags.includes(tag)
                            ? "bg-purple-900/30 text-purple-300 border border-purple-500/30"
                            : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                        )}
                      >
                        {filters.tags.includes(tag) && (
                          <Check className="h-3 w-3 mr-1" />
                        )}
                        #{tag}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator className="bg-gray-800/50" />

                {/* Engagement */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <label className="text-sm font-medium text-gray-200">Minimum Engagement</label>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Views */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="h-3.5 w-3.5 text-blue-400" />
                        <span className="text-xs text-gray-300">Views</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {viewsThresholds.map((threshold) => (
                          <Button
                            key={threshold.value}
                            onClick={() => updateFilter('minViews', 
                              filters.minViews === threshold.value ? null : threshold.value
                            )}
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "rounded-lg text-xs",
                              filters.minViews === threshold.value
                                ? "bg-blue-900/30 text-blue-300 border border-blue-500/30"
                                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                            )}
                          >
                            {filters.minViews === threshold.value && (
                              <Check className="h-3 w-3 mr-1" />
                            )}
                            {threshold.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Replies */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="h-3.5 w-3.5 text-purple-400" />
                        <span className="text-xs text-gray-300">Replies</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {repliesThresholds.map((threshold) => (
                          <Button
                            key={threshold.value}
                            onClick={() => updateFilter('minReplies', 
                              filters.minReplies === threshold.value ? null : threshold.value
                            )}
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "rounded-lg text-xs",
                              filters.minReplies === threshold.value
                                ? "bg-purple-900/30 text-purple-300 border border-purple-500/30"
                                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                            )}
                          >
                            {filters.minReplies === threshold.value && (
                              <Check className="h-3 w-3 mr-1" />
                            )}
                            {threshold.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-800/50" />

                {/* Post Type */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <User className="h-4 w-4 text-amber-400" />
                    <label className="text-sm font-medium text-gray-200">Post Type</label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => updateFilter('verified', 
                        filters.verified === true ? null : true
                      )}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "rounded-lg text-xs",
                        filters.verified === true
                          ? "bg-blue-900/30 text-blue-300 border border-blue-500/30"
                          : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                      )}
                    >
                      {filters.verified === true && (
                        <Check className="h-3 w-3 mr-1" />
                      )}
                      Verified authors only
                    </Button>
                    <Button
                      onClick={() => updateFilter('pinned', 
                        filters.pinned === true ? null : true
                      )}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "rounded-lg text-xs",
                        filters.pinned === true
                          ? "bg-purple-900/30 text-purple-300 border border-purple-500/30"
                          : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                      )}
                    >
                      {filters.pinned === true && (
                        <Check className="h-3 w-3 mr-1" />
                      )}
                      Featured posts only
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedFilterPanel;
