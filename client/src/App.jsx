import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Authenticate';
import VerifyEmail from './pages/VerifyEmail';
import ResetPass from './pages/ResetPass';
import NotFound from './pages/NotFound';
import Intake from './pages/Intake';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Authenticate" element={<Login />} />
        <Route path="/intake" element={<Intake />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-pass" element={<ResetPass />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
