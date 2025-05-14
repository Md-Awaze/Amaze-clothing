import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';
import HamburgerMenu from './HamburgerMenu';
import NavIcons from './NavIcons';
import logo from '../../assets/amaze-logo.png';

const Navbar: React.FC = () => {
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

            {/* Right: Nav Icons */}
            <NavIcons />
          </div>
        </div>
      </nav>
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar; 