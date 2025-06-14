
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface FeedSkeletonLoaderProps {
  count?: number;
  className?: string;
}

const PostSkeleton = ({ index = 0 }: { index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6"
  >
    {/* Header */}
    <div className="flex items-center gap-3 mb-4">
      <Skeleton className="h-12 w-12 rounded-full bg-white/5" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32 bg-white/5" />
        <Skeleton className="h-3 w-24 bg-white/5" />
      </div>
      <Skeleton className="h-8 w-8 rounded-full bg-white/5" />
    </div>

    {/* Content */}
    <div className="space-y-3 mb-6">
      <Skeleton className="h-4 w-full bg-white/5" />
      <Skeleton className="h-4 w-4/5 bg-white/5" />
      <Skeleton className="h-4 w-3/5 bg-white/5" />
    </div>

    {/* Tags */}
    <div className="flex gap-2 mb-6">
      <Skeleton className="h-6 w-16 rounded-full bg-white/5" />
      <Skeleton className="h-6 w-20 rounded-full bg-white/5" />
      <Skeleton className="h-6 w-14 rounded-full bg-white/5" />
    </div>

    {/* Actions */}
    <div className="flex items-center justify-between pt-4 border-t border-white/10">
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-10 w-16 rounded-lg bg-white/5" />
        ))}
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 w-10 rounded-lg bg-white/5" />
        <Skeleton className="h-10 w-10 rounded-lg bg-white/5" />
      </div>
    </div>
  </motion.div>
);

const FeedSkeletonLoader = ({ count = 3, className }: FeedSkeletonLoaderProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      {Array.from({ length: count }, (_, i) => (
        <PostSkeleton key={i} index={i} />
      ))}
    </div>
  );
};

export default FeedSkeletonLoader;
