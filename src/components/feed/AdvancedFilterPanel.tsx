
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  X, 
  Calendar, 
  Users, 
  Hash, 
  TrendingUp, 
  Eye, 
  MessageCircle,
  Verified,
  Image,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AdvancedSearchFilters } from '@/hooks/useAdvancedSearch';

interface AdvancedFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: AdvancedSearchFilters;
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
  onReset: () => void;
  className?: string;
}

const AdvancedFilterPanel = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onReset,
  className
}: AdvancedFilterPanelProps) => {
  const updateFilter = <K extends keyof AdvancedSearchFilters>(
    key: K,
    value: AdvancedSearchFilters[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const addTag = (tag: string) => {
    if (tag && !filters.tags.includes(tag)) {
      updateFilter('tags', [...filters.tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    updateFilter('tags', filters.tags.filter(t => t !== tag));
  };

  const addAuthor = (author: string) => {
    if (author && !filters.authors.includes(author)) {
      updateFilter('authors', [...filters.authors, author]);
    }
  };

  const removeAuthor = (author: string) => {
    updateFilter('authors', filters.authors.filter(a => a !== author));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Filter Panel */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={cn(
              "fixed right-0 top-0 h-full w-96 bg-gray-900 border-l border-gray-700/50 z-50 overflow-y-auto",
              className
            )}
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={onReset}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-gray-200"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-gray-200"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator className="bg-gray-700/50" />

              {/* Date Range */}
              <div className="space-y-3">
                <Label className="text-white flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Time Range
                </Label>
                <Select value={filters.dateRange} onValueChange={(value: any) => updateFilter('dateRange', value)}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700/50">
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This week</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                    <SelectItem value="year">This year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div className="space-y-3">
                <Label className="text-white flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Sort By
                </Label>
                <Select value={filters.sortBy} onValueChange={(value: any) => updateFilter('sortBy', value)}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700/50">
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Content Type */}
              <div className="space-y-3">
                <Label className="text-white">Content Type</Label>
                <Select value={filters.contentType} onValueChange={(value: any) => updateFilter('contentType', value)}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700/50">
                    <SelectItem value="all">All Content</SelectItem>
                    <SelectItem value="posts">Posts Only</SelectItem>
                    <SelectItem value="comments">Comments Only</SelectItem>
                    <SelectItem value="users">Users Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-gray-700/50" />

              {/* Boolean Filters */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-white flex items-center gap-2">
                    <Verified className="h-4 w-4" />
                    Verified Authors Only
                  </Label>
                  <Switch
                    checked={filters.verified === true}
                    onCheckedChange={(checked) => updateFilter('verified', checked ? true : null)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-white flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Has Media
                  </Label>
                  <Switch
                    checked={filters.hasMedia === true}
                    onCheckedChange={(checked) => updateFilter('hasMedia', checked ? true : null)}
                  />
                </div>
              </div>

              <Separator className="bg-gray-700/50" />

              {/* Engagement Filter */}
              <div className="space-y-3">
                <Label className="text-white flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Minimum Engagement
                </Label>
                <div className="px-3">
                  <Slider
                    value={[filters.minEngagement || 0]}
                    onValueChange={([value]) => updateFilter('minEngagement', value > 0 ? value : null)}
                    max={1000}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>0</span>
                    <span className="text-white">{filters.minEngagement || 0}+ likes/replies</span>
                    <span>1000+</span>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-700/50" />

              {/* Tags Filter */}
              <div className="space-y-3">
                <Label className="text-white flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Tags
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag..."
                    className="bg-gray-800/50 border-gray-700/50 text-white"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addTag(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
                {filters.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {filters.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                      >
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-blue-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Authors Filter */}
              <div className="space-y-3">
                <Label className="text-white flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Authors
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add author..."
                    className="bg-gray-800/50 border-gray-700/50 text-white"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addAuthor(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
                {filters.authors.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {filters.authors.map((author) => (
                      <Badge
                        key={author}
                        variant="secondary"
                        className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                      >
                        @{author}
                        <button
                          onClick={() => removeAuthor(author)}
                          className="ml-1 hover:text-purple-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Separator className="bg-gray-700/50" />

              {/* Apply Button */}
              <Button
                onClick={onClose}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdvancedFilterPanel;
