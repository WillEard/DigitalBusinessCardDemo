import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Authenticate';
import VerifyEmail from './pages/VerifyEmail';
import ResetPass from './pages/ResetPass';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import CV from './pages/CV';
import { useEffect } from 'react';

const App = () => {

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
