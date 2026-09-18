import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom'
import Documentation from './components/pages/documentation'
import Features from './components/pages/feature'
import Home from './components/pages/home'
import VersionHistory from './components/pages/version.history'
import { Download } from './components/pages/download'
import { FaHeadphones } from 'react-icons/fa'

function App() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      <nav id="navigation-bar" className="navigation">
        <div className="nav-content">
          <div className="appLogoInsite">
            <img alt="BlackMusic" className="site-logo" src="/assets/bmusic.png" onClick={handleLogoClick} />
          </div>
          <div className="nav-links">
            <NavLink to="/documentation">Documentation</NavLink>
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/version-history">Versions</NavLink>
          </div>
          <div className="download-action-tag-button">
            <Link to="/download">Download</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/features" element={<Features />} />
          <Route path="/version-history" element={<VersionHistory />} />
          <Route path="/download" element={<Download />} />
        </Routes>
      </main>

      <footer className="footer-app">
        <div className="footer-content-left">
          <FaHeadphones className="text-xl" />
          <span className="version-number">v2.0.0</span>
        </div>
        <div className="footer-content-right">
          <p>© 2026 <a href="https://www-blackblazent-com.vercel.app/">BlackBlazent</a> / BlackMusic. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default App
