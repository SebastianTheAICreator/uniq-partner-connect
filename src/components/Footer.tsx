import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-gradient border-t border-white/10 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-white/90">Made with</span>
            <Heart className="w-5 h-5 text-red-500 fill-current animate-float" />
            <span className="text-lg font-semibold text-white/90">by UniQ Team</span>
          </div>
          <div className="text-sm text-white/60">
            © 2025 UniQ. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;