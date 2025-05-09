import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './components/Authentication/ProtectedRoute';
import Home from './Home';
import Services from './components/Services';
import AboutUs from "./components/AboutUs"
<<<<<<< HEAD
import ContactUs from './components/ContactUs';
=======
import CarInventory from './CarInventory';
>>>>>>> 832ee2832326568c9307e7107831f1d38c4e00ca

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
<<<<<<< HEAD
          <Route path="/contact" element={<ContactUs/>}/>
=======
          <Route path="/CarInventory" element={<CarInventory/>}/>
          
>>>>>>> 832ee2832326568c9307e7107831f1d38c4e00ca
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