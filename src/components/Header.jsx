import React, { useState } from 'react';
import { Home, Search, User, ShoppingCart, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', icon: <Home size={20} /> },
    { name: 'Tutorials', icon: <Search size={20} /> },
    { name: 'Account', icon: <User size={20} /> },
    { name: 'Cart', icon: <ShoppingCart size={20} /> },
  ];

  return (
    <div className="relative">
      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600">Dev Crib</h1>
        </div>
        
        <nav className="flex space-x-8">
          {navItems.map((item, index) => (
            <a 
              key={index} 
              href="#" 
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-blue-600">BrandName</h1>
        <button 
          onClick={toggleMenu} 
          className="text-gray-700 focus:outline-none md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-10">
          <div className="flex flex-col py-2">
            {navItems.map((item, index) => (
              <a 
                key={index} 
                href="#" 
                className="flex items-center space-x-2 px-6 py-3 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <div className="flex justify-around items-center">
          {navItems.map((item, index) => (
            <a 
              key={index} 
              href="#" 
              className="flex flex-col items-center py-2 px-4 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}