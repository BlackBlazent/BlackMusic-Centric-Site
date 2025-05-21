// logo-navigate.js

import { useNavigate } from 'react-router-dom';

const useLogoNavigation = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/'); // Navigate to home page
  };

  return { handleLogoClick };
};

// Use this hook in your component
// Example:
// const { handleLogoClick } = useLogoNavigation();
// <img alt="BLACK MUSIC" className="site-logo" src="./src/assets/bmusic.png" onClick={handleLogoClick} />

export default useLogoNavigation;