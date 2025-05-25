
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus } from "lucide-react";
import CommunityCard from "./CommunityCard";
import CreateCommunityDialog from "./CreateCommunityDialog";
import { type Community } from "@/db/database";

interface CommunityGridProps {
  communities: Community[];
  onJoinCommunity: (id: number, name: string) => void;
  searchTerm: string;
  onCommunityCreated: (community: Omit<Community, 'id' | 'createdAt'>) => void;
}

const CommunityGrid = ({ 
  communities, 
  onJoinCommunity, 
  searchTerm, 
  onCommunityCreated 
}: CommunityGridProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (communities.length === 0) {
    return (
      <div className="py-24 bg-[#0A0C10]">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-20 bg-white/[0.02] rounded-2xl border border-white/5"
          >
            <Search className="h-16 w-16 text-white/20 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-white/80 mb-3">No communities found</h3>
            <p className="text-white/50 max-w-md mx-auto mb-8 text-lg">
              {searchTerm 
                ? `No communities match "${searchTerm}". Try different keywords or create a new community.`
                : "No communities available. Be the first to create one!"}
            </p>
            
            <CreateCommunityDialog onCommunityCreated={onCommunityCreated} />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-[#0A0C10]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            {searchTerm ? `Search Results (${communities.length})` : `All Communities (${communities.length})`}
          </h2>
          <p className="text-white/60 text-lg">
            Discover and join communities that match your interests
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {communities.map((community) => (
              <motion.div
                key={community.id}
                variants={itemVariants}
                layout
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <CommunityCard 
                  community={community} 
                  onJoin={onJoinCommunity} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityGrid;
