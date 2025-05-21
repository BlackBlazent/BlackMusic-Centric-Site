import { useEffect } from 'react';
import '../../styles/home.css';

const Home = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 900); // 0.9s interval
    });
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Background */}
        <div className="home-background-container">
          <div id="topBgContainer" className="top-background">
            <div className="top-bg-wrapper">
              <img id="topBg" src="./src/assets/full-sky-mount.png" alt="Full Sky Mount"/>
            </div>
          </div>
          <div id="homeModelBack" className="home-model-back">
            <div className="back-model-wrapper">
              <img id="homeModelBackImg" src="./src/assets/back.model.png" alt="Back Model"/>
            </div>
          </div>
          
          <div id="upperBg" className="upper-background">
            <div className="upper-bg-wrapper">
              <img id="upperBgImg" src="./src/assets/full-upper-mount.png" alt="Upper Mount"/>
            </div>
          </div>
          
          <div id="appNameHeader" className="app-name-header">
            <div className="app-name-wrapper">
              <h1 id="appNameText">BlackMusic</h1>
            </div>
          </div>
          
          <div id="lowerBg" className="lower-background">
            <div className="lower-bg-wrapper">
              <img id="lowerBgImg" src="./src/assets/full-lower-mount.png" alt="Lower Mount"/>
            </div>
          </div>
          <div id="codenameHeader" className="codename-header-container">
            <div className="codename-wrapper">
            <h3 id="codenameText">Raven<br/>SYNTHA</h3>
            </div>
          </div>
          <div id="homeModel" className="home-model-container">
            <div id="model3D" className="home-model-wrapper">
            <img id="homeModelImg" className="model-3D" src="./src/assets/home.model.png" alt="Home Model" data-glitch-effect data-glitch-interval="3000" data-glitch-duration="600" data-glitch-intensity="7"/>
            </div>
          </div>
          <div id="appCapabilitiesIcon" className="app-capabilities-icon-container">
            <div id="capabilitiesStrength" className="capabilities-strength-wrapper">
            <img id="capabilitiesStrengthIcon" className="capabilities-strength-icon" src="https://cdn-icons-png.freepik.com/256/10311/10311915.png?uid=R54802347&ga=GA1.1.1324284911.1721478908&semt=ais_hybrid" alt="Home Model"/>
            </div>
            <div id="capabilitiesStrength" className="capabilities-strength-wrapper">
            <img id="capabilitiesStrengthIcon" className="capabilities-strength-icon" src="https://cdn-icons-png.freepik.com/256/5241/5241466.png?uid=R54802347&ga=GA1.1.1324284911.1721478908&semt=ais_hybrid" alt="Home Model"/>
            </div>
            <div id="capabilitiesStrength" className="capabilities-strength-wrapper">
            <img id="capabilitiesStrengthIcon" className="capabilities-strength-icon" src="https://cdn-icons-png.freepik.com/256/6526/6526287.png?uid=R54802347&ga=GA1.1.1324284911.1721478908&semt=ais_hybrid" alt="Home Model"/>
            </div>
            <div id="capabilitiesStrength" className="capabilities-strength-wrapper">
            <img id="capabilitiesStrengthIcon" className="capabilities-strength-icon" src="https://cdn-icons-png.freepik.com/256/6714/6714412.png?uid=R54802347&ga=GA1.1.1324284911.1721478908&semt=ais_hybrid" alt="Home Model"/>
            </div>
          </div>
          {/**/}
        </div>
      </div>
    </div>
  );
};

export default Home;