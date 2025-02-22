
import React, { useState, useContext } from 'react';
import { 
  Home, 
  Search, 
  ShoppingCart, 
  User, 
  Bell, 
  Menu, 
  Sun, 
  Moon 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
//import { AuthContext } from '../context/AuthContext';
//import { ThemeContext } from '../context/ThemeContext';
//import { NotificationContext } from '../context/NotificationContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { notifications } = useContext(NotificationContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to search results with query
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const navigationLinks = [
    { 
      icon: <Home />, 
      label: 'Home', 
      path: '/',
      requireAuth: false
    },
    { 
      icon: <ShoppingCart />, 
      label: 'Products', 
      path: '/products',
      requireAuth: false
    },
    { 
      icon: <User />, 
      label: 'Profile', 
      path: '/profile',
      requireAuth: true
    }
  ];

  return (
    <header className={`
      fixed top-0 left-0 w-full z-50 
      ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}
      shadow-md transition-all duration-300
    `}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className="text-2xl font-bold flex items-center space-x-2"
          >
            <img 
              src="/logo.png" 
              alt="RetailGenie Logo" 
              className="h-10 w-10"
            />
            <span>RetailGenie</span>
          </Link>
        </div>

        {/* Search Bar */}
        <form 
          onSubmit={handleSearch} 
          className="flex-grow mx-4 max-w-xl relative"
        >
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search products, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`
                w-full pl-10 pr-4 py-2 rounded-full 
                ${theme === 'dark' 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-gray-100 text-gray-900'}
                focus:outline-none focus:ring-2 
                transition-all duration-300
              `}
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 
              text-gray-400" 
            />
          </div>
        </form>

        {/* Navigation and Interaction Icons */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <div className="relative">
            <Bell 
              className={`
                cursor-pointer 
                ${notifications.length > 0 
                  ? 'text-blue-500 animate-pulse' 
                  : 'text-gray-500'}
              `}
              onClick={() => navigate('/notifications')}
            />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 
                bg-red-500 text-white rounded-full 
                w-5 h-5 flex items-center justify-center 
                text-xs">
                {notifications.length}
              </span>
            )}
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="focus:outline-none"
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>

          {/* User Authentication Section */}
          {user ? (
            <div className="flex items-center space-x-2">
              <img 
                src={user.avatar || '/default-avatar.png'} 
                alt="User Avatar" 
                className="w-8 h-8 rounded-full"
              />
              <button 
                onClick={() => navigate('/profile')}
                className="hover:underline"
              >
                {user.name}
              </button>
              <button 
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Login
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div 
          className={`
            md:hidden absolute top-full left-0 w-full 
            ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
            shadow-lg
          `}
        >
          {navigationLinks
            .filter(link => !link.requireAuth || user)
            .map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center space-x-2 p-4 
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
                `}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))
          }
        </div>
      )}
    </header>
  );
};

export default Header;
