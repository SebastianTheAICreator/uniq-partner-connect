import { Link } from 'react-router-dom';
import { Heart, Users, Bell } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              UniQ
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link 
              to="/matches" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Matches"
            >
              <Heart className="w-6 h-6 text-primary" />
            </Link>
            <Link 
              to="/community" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Community"
            >
              <Users className="w-6 h-6 text-secondary" />
            </Link>
            <Link 
              to="/notifications" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-6 h-6 text-accent" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;