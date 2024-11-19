import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold">Made with</span>
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <span className="text-lg font-semibold">by UniQ Team</span>
          </div>
          <div className="text-sm text-gray-500">
            © 2024 UniQ. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;