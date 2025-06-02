import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, UserCircleIcon, ArrowRightOnRectangleIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useAuthContext } from '../../context/AuthContext';
import HamburgerMenu from './HamburgerMenu';
import NavIcons from './NavIcons';
import logo from '../../assets/amaze-logo.png';

const Navbar: React.FC = () => {
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isProfileOpen && !target.closest('.profile-menu')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-white/80 backdrop-blur-sm shadow-md
          ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
        `}
        style={{ fontFamily: 'Quicksand, Arial, sans-serif' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Hamburger */}
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            {/* Center: Logo/Text */}
            <Link to="/" className="flex items-center select-none gap-2">
              <img src={logo} alt="Amaze Logo" className="h-8 w-8 object-contain" />
              <span
                className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#FFB6A3] via-[#FFD966] via-[#6EE7B7] to-[#6EC1E4] bg-clip-text text-transparent"
                style={{
                  fontFamily: 'Fredoka, Quicksand, Arial, sans-serif',
                  letterSpacing: '0.04em',
                }}
              >
                AMAZE
              </span>
              <span className="ml-2 text-xs font-semibold text-gray-700 tracking-widest">CLOTHING</span>
            </Link>

            {/* Right: Icons and User Menu */}
            <div className="flex items-center gap-4">
              <NavIcons />
              
              {isAuthenticated ? (
                <div className="relative profile-menu">
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
                    aria-label="User menu"
                  >
                    <UserCircleIcon className="h-7 w-7" />
                    <span className="hidden md:inline font-medium">
                      {user?.name?.split(' ')[0] || 'Account'}
                    </span>
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <UserIcon className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Cog6ToothIcon className="h-4 w-4 mr-2" />
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors font-medium"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar; 