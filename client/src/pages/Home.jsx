// React
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Pricing from '../components/Pricing';
import ThreePointJumbo from '../components/3Points-Jumbo';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import PhoneCarouselContainer from '../components/PhoneCarouselContainer'; // Carousel component
import NavBanner from '../components/NavBanner'; // Promotion banner component - not used if no promotion

// React Bits
import Dock from '../assets/react-bits/Dock';

// Icons
import { VscHome } from "react-icons/vsc";
import { VscArchive } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";
import { CiLogin } from "react-icons/ci";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { GoQuestion } from "react-icons/go";

import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();

  const { userData, getUserData } = useContext(AppContext); // Access context values

  const authDock = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => navigate('/') },
    { icon: <VscArchive size={18} />, label: 'Dashboard', onClick: () => navigate('/dashboard') },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => navigate('/account') },
    ...(userData?.subscriptionType === "Free"
      ? [{ icon: <MdOutlineWorkspacePremium size={18} />, label: 'Premium', onClick: () => navigate('/payment')}]
      : []),
  ];

  const userDock = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => navigate('/') },
    { icon: <CiLogin size={18} />, label: 'Login', onClick: () => navigate('/Authenticate') },
    { icon: <GoQuestion  size={18} />, label: 'How it works', onClick: () => navigate('/#howitworks') },
  ];


  
  const [showBanner, setShowBanner] = useState(true); // Promotion banner - not used if no promotion

  // Get current page location
  const location = useLocation();

  // For navigating Navbar elements when on different pages (e.g.  from login to Homepage>#features)
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);


  return (
    <div className='ocean-background '>
      <div className='fluid'>
        {/* Navbar top of webpage */}
        <Navbar />

        <div id="dock" className="d-block d-md-none position-fixed bottom-0 start-0 end-0 zindex-sticky">
          <Dock 
            items={userData ? authDock : userDock}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />
         </div>

        
        {showBanner && (<NavBanner onClose={() => setShowBanner(false)} />)} 

        {/* Hero top of Homepage, Title & CTA */}
        <Hero />

        <ThreePointJumbo />

        <HowItWorks />

        <PhoneCarouselContainer />

        <Features />

        <Testimonials />

        {/* Pricing & Subscription section */}
        <Pricing />
        


        {/* Footer at bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
