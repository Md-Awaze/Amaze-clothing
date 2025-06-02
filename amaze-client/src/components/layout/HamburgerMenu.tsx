import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { XMarkIcon, UserCircleIcon, ArrowRightOnRectangleIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useAuthContext } from '../../context/AuthContext';
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
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

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
        {isAuthenticated && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <UserCircleIcon className="h-10 w-10 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                to="/dashboard"
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                onClick={onClose}
              >
                <UserIcon className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                onClick={onClose}
              >
                <Cog6ToothIcon className="h-4 w-4 mr-2" />
                Profile Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1 mt-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path ||
              (link.path.startsWith('/products') &&
                location.pathname.startsWith('/products') &&
                location.search.includes(link.path.split('=')[1] || ''));
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={onClose}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {!isAuthenticated && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <Link
              to="/login"
              className="block w-full text-center px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 mb-3"
              onClick={onClose}
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="block w-full text-center px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
              onClick={onClose}
            >
              Create account
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default HamburgerMenu;