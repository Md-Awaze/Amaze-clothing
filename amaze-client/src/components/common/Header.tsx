import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Amaze
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-primary-600">
              Products
            </Link>
            <Link to="/categories" className="text-gray-600 hover:text-primary-600">
              Categories
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-600 hover:text-primary-600">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-primary-600">
              <UserIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 