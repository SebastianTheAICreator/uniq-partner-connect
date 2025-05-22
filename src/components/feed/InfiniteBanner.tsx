
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const bannerItems = [
  {
    text: "Artificial Intelligence",
    color: "from-blue-500 to-cyan-400"
  },
  {
    text: "Machine Learning",
    color: "from-purple-500 to-pink-400"
  },
  {
    text: "Blockchain",
    color: "from-green-500 to-emerald-400"
  },
  {
    text: "Web3",
    color: "from-yellow-500 to-orange-400"
  },
  {
    text: "Cloud Computing",
    color: "from-red-500 to-pink-400"
  },
  {
    text: "Cybersecurity",
    color: "from-indigo-500 to-blue-400"
  },
  {
    text: "Data Science",
    color: "from-teal-500 to-green-400"
  },
  {
    text: "IoT",
    color: "from-amber-500 to-yellow-400"
  }
];

const InfiniteBanner = () => {
  const [duplicatedItems, setDuplicatedItems] = useState<typeof bannerItems>([]);
  
  // Create a duplicate set of items to create the illusion of infinite scroll
  useEffect(() => {
    setDuplicatedItems([...bannerItems, ...bannerItems]);
  }, []);
  
  return (
    <div className="fixed bottom-0 left-0 w-full backdrop-blur-md bg-[#0d1117]/70 border-t border-[#30363d] py-3 overflow-hidden z-30">
      <div className="relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap"
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="mx-4 flex items-center"
            >
              <div 
                className={cn(
                  "text-xl font-bold px-4 py-2 rounded-lg bg-gradient-to-r",
                  item.color,
                  "bg-clip-text text-transparent"
                )}
              >
                {item.text}
              </div>
              <span className="mx-3 text-2xl text-gray-600">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteBanner;
