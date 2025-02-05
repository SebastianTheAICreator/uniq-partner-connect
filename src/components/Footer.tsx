import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="glass-gradient border-t border-primary/10 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2"
          >
            <span className="text-lg font-semibold text-gray-700 font-poppins">Creat cu</span>
            <Heart className="w-5 h-5 text-interactive fill-current animate-float" />
            <span className="text-lg font-semibold text-gray-700 font-poppins">de Echipa UniQ</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm text-gray-500 font-inter"
          >
            © 2025 UniQ. Toate drepturile rezervate.
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;