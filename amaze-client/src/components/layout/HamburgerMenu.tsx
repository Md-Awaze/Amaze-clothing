import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/amaze-logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'T-Shirts', path: '/products?category=tshirts' },
  { name: 'Shirts', path: '/products?category=shirts' },
  { name: 'Hoodies', path: '/products?category=hoodies' },
  { name: 'Jeans', path: '/products?category=jeans' },
  { name: 'Traditional', path: '/products?category=traditional' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

interface HamburgerMenuProps {
  open: boolean;
  onClose: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ open, onClose }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* Side Panel */}
      <nav
        className={`absolute left-0 top-0 h-full w-72 max-w-full bg-white shadow-md p-6 flex flex-col gap-6 transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ fontFamily: 'Quicksand, Arial, sans-serif' }}
      >
        <button className="self-end mb-4 p-2 rounded-full hover:bg-gray-100" onClick={onClose}>
          <XMarkIcon className="h-7 w-7 text-gray-700" />
        </button>
        {/* Logo at the top */}
        <div className="flex flex-col items-center mb-2">
          <img src={logo} alt="Amaze Logo" className="h-14 w-14 object-contain mb-2" />
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {navLinks.map((link, idx) => {
            const isActive = location.pathname === link.path || (link.path.startsWith('/products') && location.pathname.startsWith('/products') && location.search.includes(link.path.split('=')[1] || ''));
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={onClose}
                className={`text-lg font-semibold px-2 py-1 rounded transition-all duration-300 transform
                  ${isActive ? 'border-b-2 border-black text-black' : 'text-gray-700 hover:text-black hover:bg-gray-100'}
                  ${open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                `}
                style={{ transitionDelay: open ? `${idx * 60 + 100}ms` : '0ms' }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default HamburgerMenu; 