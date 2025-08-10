// React
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// Bootstrap Styling
import 'bootstrap/dist/css/bootstrap.min.css';

// React Toast for toast messages
import { ToastContainer } from 'react-toastify';

// Pages
import Home from './pages/Home';
import Login from './pages/Authenticate';
import VerifyEmail from './pages/VerifyEmail';
import ResetPass from './pages/ResetPass';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import AdminDashboard from './pages/AdminDashboard';
import CV from './pages/CV';

// Cookie banner for Navbar
import CookieBanner from './components/CookieBanner';


const App = () => {


  // UseEffect, display react-scan information in development environment
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/react-scan/dist/auto.global.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Authenticate" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-pass" element={<ResetPass />} />
        <Route path="/account" element={<Settings />} />
        <Route path="/account" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cv/:username" element={<CV />} /> 
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin-dash" element={<AdminDashboard />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieBanner />
    </div>
  );
};

export default App;
