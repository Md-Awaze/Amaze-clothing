import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/customer/Home';
import Products from './pages/customer/Products';
import ProductDetails from './pages/customer/ProductDetails';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import Login from './pages/customer/Login';
import Register from './pages/customer/Register';
import ForgotPassword from './pages/customer/ForgotPassword';
import ResetPassword from './pages/customer/ResetPassword';
import Profile from './pages/customer/Profile';
import Dashboard from './pages/customer/Dashboard';
import NotFound from './pages/customer/NotFound';
import AboutUs from './pages/customer/AboutUs';
import Contact from './pages/customer/Contact';
import ProtectedRoute from './components/auth/ProtectedRoute';

const AppRoutes = () => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to intended page after login
  React.useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;