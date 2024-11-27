import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300">Page not found</p>
      <Link 
        to="/" 
        className="text-primary hover:text-primary-hover underline"
      >
        Return to home
      </Link>
    </div>
  );
};

export default NotFound;