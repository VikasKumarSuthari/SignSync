import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="./src/assets/LogoT.png" 
              alt="MechAI Logo" 
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-gray-900">SignSync</span>
          </Link>
          
          {/* Navigation */}
          <Navbar />
          
          {/* Auth Buttons */}
          
        </div>
      </div>
    </header>
  );
};

export default Header;