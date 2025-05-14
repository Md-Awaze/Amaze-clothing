import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  TagIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const AdminLayout = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBagIcon },
    { name: 'Products', href: '/admin/products', icon: TagIcon },
    { name: 'Users', href: '/admin/users', icon: UsersIcon },
    { name: 'Coupons', href: '/admin/coupons', icon: TagIcon },
    { name: 'Reports', href: '/admin/reports', icon: ChartBarIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b">
            <Link to="/admin" className="text-xl font-bold text-primary-600">
              Amaze Admin
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={() => {
                // Handle logout
              }}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 