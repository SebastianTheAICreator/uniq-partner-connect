
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isLoading: boolean;
  threshold?: number;
}

export const useInfiniteScroll = ({
  hasNextPage,
  isLoading,
  threshold = 100
}: UseInfiniteScrollOptions) => {
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasNextPage && !isFetching) {
      setIsFetching(true);
    }
  }, [isLoading, hasNextPage, isFetching]);

  useEffect(() => {
    if (loadMoreRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const target = entries[0];
          if (target.isIntersecting) {
            handleLoadMore();
          }
        },
        {
          rootMargin: `${threshold}px`,
        }
      );

      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleLoadMore, threshold]);

  useEffect(() => {
    if (isFetching) {
      // Reset the fetching state after a short delay
      const timer = setTimeout(() => {
        setIsFetching(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isFetching]);

  return { isFetching, loadMoreRef };
};
