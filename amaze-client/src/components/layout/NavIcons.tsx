import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartIcon, UserIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useAuthContext } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const NavIcons: React.FC = () => {
  // Use real cart and wishlist state
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  // Search overlay state
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Auth state (replace with real context as needed)
  let user, isAuthenticated;
  try {
    ({ user, isAuthenticated } = useAuthContext());
  } catch {
    user = null;
    isAuthenticated = false;
  }

  // Focus input when overlay opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close overlay on outside click or Esc
  useEffect(() => {
    if (!searchOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    const handleClick = (e: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [searchOpen]);

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearchOpen(false);
      setSearch('');
    }
  };

  return (
    <>
      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 backdrop-blur-sm transition-opacity animate-fade-in">
          <form
            onSubmit={handleSearch}
            className="mt-8 w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg flex items-center px-4 py-2 gap-2 animate-slide-down"
            style={{ fontFamily: 'Quicksand, Arial, sans-serif' }}
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-black/70" />
            <input
              ref={searchInputRef}
              type="text"
              className="flex-1 outline-none bg-transparent text-lg px-2"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search products"
            />
            <button type="submit" className="text-sm font-semibold text-black/80 px-3 py-1 rounded hover:bg-gray-100 transition">Search</button>
          </form>
        </div>
      )}
      {/* Icons */}
      <div className="flex items-center gap-2">
        {/* Search Icon */}
        <button
          className="px-2 flex items-center"
          aria-label="Search"
          onClick={() => setSearchOpen(true)}
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-black/70 hover:text-black transition duration-200" />
        </button>
        {/* Wishlist Icon */}
        <Link
          to="/wishlist"
          className="relative px-2 flex items-center"
          aria-label="Wishlist"
        >
          <HeartIcon
            className={`w-5 h-5 transition duration-200 ${wishlistCount > 0 ? 'text-pink-500' : 'text-black/70 hover:text-black'}`}
          />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full px-1.5 py-0.5 font-semibold shadow">{wishlistCount}</span>
          )}
        </Link>
        {/* Account Icon */}
        <Link
          to={isAuthenticated ? '/profile' : '/login'}
          className="px-2 flex items-center"
          aria-label={isAuthenticated ? 'Profile' : 'Login'}
        >
          <UserIcon className="w-5 h-5 text-black/70 hover:text-black transition duration-200" />
        </Link>
        {/* Cart Icon */}
        <Link
          to="/cart"
          className="relative px-2 flex items-center"
          aria-label="Cart"
        >
          <ShoppingCartIcon
            className={`w-5 h-5 transition duration-200 ${cartCount > 0 ? 'text-green-600' : 'text-black/70 hover:text-black'}`}
          />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full px-1.5 py-0.5 font-semibold shadow">{cartCount}</span>
          )}
        </Link>
      </div>
    </>
  );
};

export default NavIcons; 