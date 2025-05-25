
import { motion } from "framer-motion";
import { Search, Filter, Plus, Sparkles, Zap, Globe, Shield, ChartBar, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CreateCommunityDialog from "./CreateCommunityDialog";
import { cn } from "@/lib/utils";
import { type Community } from "@/db/database";

interface CommunityHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onCommunityCreated: (community: Omit<Community, 'id' | 'createdAt'>) => void;
}

const CommunityHeader = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedFilter,
  onFilterChange,
  onCommunityCreated
}: CommunityHeaderProps) => {
  const categories = [
    { name: "Technology", icon: Zap, color: "from-blue-500/20 to-cyan-500/20" },
    { name: "Business", icon: ChartBar, color: "from-green-500/20 to-emerald-500/20" },
    { name: "Creative", icon: Sparkles, color: "from-purple-500/20 to-pink-500/20" },
    { name: "Science", icon: Globe, color: "from-indigo-500/20 to-blue-500/20" },
    { name: "Education", icon: Shield, color: "from-amber-500/20 to-orange-500/20" },
    { name: "Lifestyle", icon: Heart, color: "from-rose-500/20 to-pink-500/20" }
  ];

  const filters = [
    { id: "all", label: "All Communities" },
    { id: "popular", label: "Most Popular" },
    { id: "newest", label: "Newest" },
    { id: "active", label: "Most Active" }
  ];

  return (
    <div className="py-8 bg-[#0F1117] border-b border-white/5">
      <div className="container mx-auto px-6">
        {/* Page Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Communities</span>
          </h1>
          <p className="text-white/70 text-lg">
            Connect with like-minded individuals and build meaningful relationships
          </p>
        </motion.div>

        {/* Search and Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8"
        >
          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
            <Input
              type="search"
              placeholder="Search communities by name or interests..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-white/5 border-white/10 rounded-xl pl-12 py-3 text-white placeholder:text-white/40
                       focus:border-primary/50 focus:bg-white/10 transition-all duration-300"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              className="bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-white rounded-xl"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            
            <CreateCommunityDialog onCommunityCreated={onCommunityCreated} />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-white/90 font-medium mb-4">Browse by Category</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="ghost"
              onClick={() => onCategoryChange(null)}
              className={cn(
                "rounded-xl px-4 py-2 transition-all duration-300",
                !selectedCategory 
                  ? "bg-primary/20 text-primary border border-primary/30" 
                  : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10"
              )}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="ghost"
                onClick={() => onCategoryChange(category.name)}
                className={cn(
                  "rounded-xl px-4 py-2 transition-all duration-300 group",
                  selectedCategory === category.name
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10"
                )}
              >
                <category.icon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                {category.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Badge
                key={filter.id}
                variant="outline"
                className={cn(
                  "px-3 py-1.5 cursor-pointer transition-all duration-300 text-sm",
                  selectedFilter === filter.id
                    ? "bg-secondary/20 text-secondary border-secondary/30"
                    : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-white/10"
                )}
                onClick={() => onFilterChange(filter.id)}
              >
                {filter.label}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityHeader;
