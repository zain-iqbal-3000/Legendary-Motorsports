import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      loadUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Load user data
  const loadUser = async (token) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      const res = await axios.get('http://localhost:5000/api/auth/user', config);
      setUser(res.data);
      setError(null);
    } catch (err) {
      localStorage.removeItem('token');
      setError(err.response?.data?.msg || 'Authentication failed');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid credentials');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);