import { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login as reduxLogin, register, logout as reduxLogout, getCurrentUser } from '../redux/authSlice';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  
  // Get auth state from Redux
  const { user, isAuthenticated, loading } = useSelector(state => state.auth);

  // Configure axios base URL
  axios.defaults.baseURL = 'http://localhost:5000';

  // Set up token on axios when app loads
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  // Login function - delegates to Redux
  const login = async (email, password) => {
    try {
      setError(null);
      await dispatch(reduxLogin({ email, password })).unwrap();
      return true;
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      return false;
    }
  };

  // Signup function - delegates to Redux
  const signup = async (userData) => {
    try {
      console.log("AuthContext - Signup data being sent:", userData);
      await dispatch(register({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phoneNumber || ''
      })).unwrap();
      
      return true;
    } catch (error) {
      console.error('Signup error details:', error);
      throw error;
    }
  };

  // Logout function - delegates to Redux
  const logout = () => {
    dispatch(reduxLogout());
  };

  const clearError = () => {
    setError(null);
  };

  // Create the auth context value
  const value = {
    currentUser: user,
    loading,
    isAuthenticated,
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