import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './components/Authentication/Login.jsx';
import Signup from './components/Authentication/Signup.jsx';
import Dashboard from './CarDetail.jsx'; // This is your user account dashboard
import ProtectedRoute from './components/Authentication/ProtectedRoute.jsx';
import AboutUs from './components/AboutUs.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/aboutus' element={<AboutUs/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;