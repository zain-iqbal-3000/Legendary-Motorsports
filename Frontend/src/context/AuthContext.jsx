import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  axios.defaults.baseURL = 'http://localhost:5000';

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Set axios default headers for all requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Fetch user data with the token
          const res = await axios.get('/api/users/me');
          setCurrentUser(res.data);
        }
      } catch (err) {
        console.error("Error checking authentication:", err);
        // If token is invalid or expired, clear it
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await axios.post('/api/users/login', { email, password });
      
      // Store token in localStorage
      localStorage.setItem('authToken', res.data.token);
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      // Set user data
      setCurrentUser(res.data.user);
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      // The issue is here: userData has firstName and lastName fields
      // but the server expects 'name' instead
      console.log("AuthContext - Signup data being sent:", userData);
      
      // Add explicit mapping to match backend expectations
      const response = await axios.post('/api/users/register', {
        firstName: userData.firstName,  
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phoneNumber || ''
      });

      // Store the token
      localStorage.setItem('authToken', response.data.token);
      
      // Set the auth headers for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      // Update currentUser state
      if (response.data.user) {
        setCurrentUser(response.data.user);
      } else {
        // If user data not returned with token, fetch it
        const userResponse = await axios.get('/api/users/me');
        setCurrentUser(userResponse.data);
      }
      
      return true;
    } catch (error) {
      console.error('Signup error details:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem('authToken');
    
    // Remove axios default header
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear user data
    setCurrentUser(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;