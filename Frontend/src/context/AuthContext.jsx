import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

axios.defaults.baseURL = 'http://localhost:5000'; // Ensure this matches your backend URL

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading as true
  const [error, setError] = useState(null);

  // Fetch user data from the backend
  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false); // Stop loading if no token is found
      return;
    }

    try {
      // Set the token in Axios headers
      axios.defaults.headers.common['x-auth-token'] = token;

      const res = await axios.get('/api/auth/user');
      setUser(res.data);
    } catch (err) {
      console.error('Error fetching user:', err);
      localStorage.removeItem('token'); // Remove invalid token
      setUser(null);
    } finally {
      setLoading(false); // Stop loading after fetching user
    }
  };

  // Register a new user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      await fetchUser();
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Log in an existing user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      await fetchUser();
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Log out the user
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token']; // Remove token from Axios headers
    setUser(null);
  };

  // Fetch user data on app initialization
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};