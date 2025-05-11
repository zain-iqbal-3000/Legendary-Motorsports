import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../redux/authSlice';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token && !isAuthenticated) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, isAuthenticated]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  if (!token || !isAuthenticated) {
    // Store the intended URL before redirecting
    const currentPath = window.location.pathname;
    sessionStorage.setItem('intendedPath', currentPath);
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;