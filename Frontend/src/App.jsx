import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './components/Authentication/ProtectedRoute';
import Home from './Home';
import Services from './components/Services';
import AboutUs from "./components/AboutUs"
import CarInventory from './CarInventory';
import AccountSettings from './components/AccountSettings';
import BookingHistory from './components/BookingHistory';
import BookingPage from './components/BookingPage';
import CarDetail from './CarDetail';
import ContactUs from './components/ContactUs';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { hideNotification } from './redux/uiSlice';
import { fetchCurrentUser } from './redux/authSlice';



function App() {

  const dispatch = useDispatch();
  const { notification } = useSelector(state => state.ui);

  useEffect(() => {
  if (localStorage.getItem('token')) {
    dispatch(fetchCurrentUser());
  }
}, [dispatch]);
  
  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  return (
    <AuthProvider>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path="/carinventory" element={<CarInventory/>}/>
          <Route path="/cardetail/:carId" element={<CarDetail/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          
          {/* Protected Routes */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <AccountSettings/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-history"
            element={
              <ProtectedRoute>
                <BookingHistory/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:carId"
            element={
              <ProtectedRoute>
                <BookingPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* Global notification */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseNotification} 
            severity={notification.type} 
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </>
    </AuthProvider>
  );
}

export default App;