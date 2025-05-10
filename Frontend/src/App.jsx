import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path="/carinventory" element={<CarInventory/>}/>
          <Route path="/cardetail/:carId" element={<CarDetail/>}/>
          <Route path="/settings" element={<AccountSettings/>}/>
          <Route path="/booking-history" element={<BookingHistory/>}/>
          <Route path="/booking/:carId" element={<BookingPage/>}/>

          
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
                <Dashboard />
              // </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;