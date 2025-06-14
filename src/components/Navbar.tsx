import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  Search,
  PlusCircle,
  Menu,
  X,
  Settings,
  HelpCircle,
  Moon,
  Sun
} from 'lucide-react';

interface NavbarProps {
  className?: string;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1c]/95 backdrop-blur-sm border-b border-gray-800/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold text-white">Lovable</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/feed" className="text-gray-300 hover:text-white transition-colors">
                Feed
              </Link>
              <Link to="/communities" className="text-gray-300 hover:text-white transition-colors">
                Communities
              </Link>
              <Link to="/discover-people" className="text-gray-300 hover:text-white transition-colors">
                Discover
              </Link>
              <Link to="/trending-topics" className="text-gray-300 hover:text-white transition-colors">
                Trending
              </Link>
            </div>
          </div>

          {/* Search, Notifications, and User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Input type="search" placeholder="Search..." className="bg-gray-800 border-gray-700 text-white rounded-lg" />
            </div>
            
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200 rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200 rounded-full relative">
              <Bell className="h-5 w-5" />
              <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border border-gray-900"></div>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleTheme}>
                  {isDarkTheme ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="text-gray-400 hover:text-gray-200 rounded-full">
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 py-2">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-4">
              <Input type="search" placeholder="Search..." className="bg-gray-800 border-gray-700 text-white rounded-lg" />
              <Link to="/feed" className="block text-gray-300 hover:text-white transition-colors py-2">
                Feed
              </Link>
              <Link to="/communities" className="block text-gray-300 hover:text-white transition-colors py-2">
                Communities
              </Link>
              <Link to="/discover-people" className="block text-gray-300 hover:text-white transition-colors py-2">
                Discover
              </Link>
              <Link to="/trending-topics" className="block text-gray-300 hover:text-white transition-colors py-2">
                Trending
              </Link>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200 rounded-full justify-start">
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200 rounded-full justify-start">
                <HelpCircle className="h-5 w-5 mr-2" />
                Support
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200 rounded-full justify-start" onClick={toggleTheme}>
                {isDarkTheme ? (
                  <>
                    <Sun className="h-5 w-5 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 mr-2" />
                    Dark Mode
                  </>
                )}
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200 rounded-full justify-start">
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
