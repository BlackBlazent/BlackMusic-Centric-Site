import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Documentation from './components/pages/documentation'
import Features from './components/pages/feature'
import Home from './components/pages/home'
import Pricing from './components/pages/pricing'
import VersionHistory from './components/pages/version.history'
import { Download } from './components/pages/download'
import BlackMusicExtensionStore from './components/pages/extensions';
import { FaHeadphones } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import FooterBehavior from '../app/global/footer.script';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the footer behavior
  const footerBehavior = new FooterBehavior('.footer-app');
  
  // Optional: You can customize some settings if needed
  footerBehavior.updateConfig({
  hitboxHeight: 15,  // Increase the hover detection area
  hideDelay: 500     // Make it stay visible longer after moving away
  });
  
  // You can also show/hide the footer programmatically if needed
  // For example, show the footer when a specific action happens:
  document.getElementById('showFooterBtn')?.addEventListener('click', () => {
  footerBehavior.show();
   });
});



function App() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/'); // Navigate to home page
  };
  return (
    <>
      <nav id="navigation-bar" className="navigation">
        <div className="nav-content">
        <img alt="BLACK MUSIC" className="site-logo" src="./src/assets/bmusic.png" onClick={handleLogoClick} />
          <div className="nav-links">
            <NavLink to="/documentation">Documentation</NavLink>
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/version-history">Versions History</NavLink>
            <NavLink to="/extensions">Extensions</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
          </div>
        </div>
        <Link to="/download">DOWNLOAD</Link>
      </nav>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/features" element={<Features />} />
          <Route path="/version-history" element={<VersionHistory />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/extensions" element={<BlackMusicExtensionStore />} />
          <Route path="/download" element={<Download />} />
        </Routes>
      </main>

      <footer className="footer-app">
        <div className="footer-content-left">
        <FaHeadphones className="text-xl" />
        <span className="version-number">1.1.01.001.0001</span>
        </div>
        <div className="footer-content-right">
          <p>© 2025 <a href="https://www-blackblazent-com.vercel.app/">BlackBlazent</a> / BlackMusic. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default App
