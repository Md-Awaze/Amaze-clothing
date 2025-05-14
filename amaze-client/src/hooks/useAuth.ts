import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../context/AuthContext';
import {
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
} from '../utils/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    const userData = getUser();

    if (token && userData) {
      setUserState(userData);
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Implement login logic here
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      setUserState(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Implement registration logic here
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      setUserState(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    removeUser();
    setUserState(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  };
}; 