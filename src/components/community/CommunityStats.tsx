
import { motion } from "framer-motion";
import { Users, MessageCircle, Tag, ChartBar } from "lucide-react";
import { type Community } from "@/db/database";

interface CommunityStatsProps {
  communities: Community[];
}

const CommunityStats = ({ communities }: CommunityStatsProps) => {
  const totalMembers = communities.reduce((acc, community) => acc + (community.memberCount || 0), 0);
  const totalConversations = communities.reduce((acc, community) => acc + (community.conversationCount || 0), 0);
  const totalInterests = communities.reduce((acc, community) => acc + (community.interests?.length || 0), 0);

  const stats = [
    {
      icon: ChartBar,
      value: communities.length,
      label: "Communities",
      color: "from-primary/10 to-primary/5",
      iconColor: "text-primary"
    },
    {
      icon: Users,
      value: totalMembers,
      label: "Total Members",
      color: "from-secondary/10 to-secondary/5",
      iconColor: "text-secondary"
    },
    {
      icon: MessageCircle,
      value: totalConversations,
      label: "Conversations",
      color: "from-accent/10 to-accent/5",
      iconColor: "text-accent"
    },
    {
      icon: Tag,
      value: totalInterests,
      label: "Interest Tags",
      color: "from-interactive/10 to-interactive/5",
      iconColor: "text-interactive"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-[#0F1117] to-[#0A0C10]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl p-8 text-center bg-white/[0.02] backdrop-blur-sm
                       border border-white/5 hover:border-primary/20 hover:bg-white/[0.05]
                       transition-all duration-500 group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 
                             group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <stat.icon className={`h-10 w-10 ${stat.iconColor} mx-auto mb-4 
                                     group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="text-3xl font-bold text-white mb-2">
                  {stat.value.toLocaleString()}
                </h3>
                <p className="text-white/60 text-sm font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityStats;
