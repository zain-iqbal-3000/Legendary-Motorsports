import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
  const { currentUser, loading } = useAuth();

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

  // Store the intended URL before redirecting
  if (!currentUser) {
    const currentPath = window.location.pathname;
    sessionStorage.setItem('intendedPath', currentPath);
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;