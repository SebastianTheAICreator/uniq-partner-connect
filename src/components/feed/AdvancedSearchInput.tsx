
import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  X, 
  Clock, 
  Hash, 
  User, 
  FileText,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchSuggestion } from '@/services/aiService';

interface AdvancedSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  suggestions: SearchSuggestion[];
  isSearching: boolean;
  searchHistory: string[];
  selectedSuggestion: number;
  onKeyDown: (event: React.KeyboardEvent) => void;
  className?: string;
  placeholder?: string;
}

const getSuggestionIcon = (type: SearchSuggestion['type']) => {
  switch (type) {
    case 'user': return User;
    case 'topic': return FileText;
    case 'hashtag': return Hash;
    case 'content': return Search;
    default: return Search;
  }
};

const AdvancedSearchInput = ({
  value,
  onChange,
  onSearch,
  suggestions,
  isSearching,
  searchHistory,
  selectedSuggestion,
  onKeyDown,
  className,
  placeholder = "Search posts, users, topics, or hashtags..."
}: AdvancedSearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (inputRef.current === document.activeElement) {
        onKeyDown(event as any);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onKeyDown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onSearch(suggestion.query);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    onChange('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value);
      setShowSuggestions(false);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            ref={inputRef}
            value={value}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder={placeholder}
            className={cn(
              "pl-10 pr-20 bg-gray-800/50 border-gray-700/50 text-gray-100",
              "placeholder:text-gray-400 focus:bg-gray-800/70 focus:border-blue-500/50",
              "h-12 rounded-xl transition-all duration-200"
            )}
          />
          
          <div className="absolute right-2 flex items-center gap-1">
            {isSearching && (
              <div className="w-4 h-4 border-2 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent rounded-full animate-spin" />
            )}
            
            {value && (
              <Button
                type="button"
                onClick={handleClear}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-md"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
            
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-md"
            >
              <Search className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </form>

      {/* AI-Powered Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (suggestions.length > 0 || searchHistory.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700/50 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* AI Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
                  <Sparkles className="h-3 w-3 text-blue-400" />
                  AI Suggestions
                </div>
                
                <div className="space-y-1">
                  {suggestions.map((suggestion, index) => {
                    const Icon = getSuggestionIcon(suggestion.type);
                    return (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                          "hover:bg-gray-800/50 text-gray-200",
                          selectedSuggestion === index && "bg-blue-500/20 text-blue-300"
                        )}
                      >
                        <Icon className="h-4 w-4 text-gray-400" />
                        <span className="flex-1">{suggestion.query}</span>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className="text-xs bg-gray-800/50 border-gray-600/50"
                          >
                            {suggestion.type}
                          </Badge>
                          {suggestion.relevance > 0.8 && (
                            <TrendingUp className="h-3 w-3 text-green-400" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Search History */}
            {searchHistory.length > 0 && suggestions.length > 0 && (
              <div className="border-t border-gray-700/50" />
            )}
            
            {searchHistory.length > 0 && (
              <div className="p-2">
                <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
                  <Clock className="h-3 w-3" />
                  Recent Searches
                </div>
                
                <div className="space-y-1">
                  {searchHistory.slice(0, 3).map((query, index) => (
                    <button
                      key={index}
                      onClick={() => onSearch(query)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-800/50 text-gray-300 transition-colors"
                    >
                      <Clock className="h-3.5 w-3.5 text-gray-500" />
                      <span>{query}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearchInput;
