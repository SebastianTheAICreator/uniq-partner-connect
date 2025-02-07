
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const sections = [
    {
      title: "Funcționalități",
      links: ["Feed", "UniVideo", "UniBanking", "Ol-yAIChat", "Matches 16+"]
    },
    {
      title: "Dezvoltatori",
      links: ["API", "Documentație", "SDK", "Status"]
    },
    {
      title: "Enterprise",
      links: ["Soluții", "Prețuri", "Contact", "Case Studies"]
    },
    {
      title: "Resurse",
      links: ["Blog", "Noutăți", "Ajutor", "Comunitate"]
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-white/5 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {sections.map((section) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-white font-semibold font-poppins mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link 
                      to="#" 
                      className="text-gray-400 hover:text-white transition-colors duration-200 font-inter text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-4 pt-8 border-t border-white/5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2"
          >
            <span className="text-lg font-semibold text-gray-300 font-poppins">Dezvoltat cu</span>
            <Heart className="w-5 h-5 text-pink-500 fill-current animate-pulse" />
            <span className="text-lg font-semibold text-gray-300 font-poppins">de Echipa UniQ</span>
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
