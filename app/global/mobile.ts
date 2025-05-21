// Improved TypeScript implementation for responsive navigation with burger menu
document.addEventListener('DOMContentLoaded', () => {
    // 1. First, manually apply the CSS we need
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .burger-menu {
        display: none;
        cursor: pointer;
        width: 30px;
        height: 25px;
        position: relative;
        margin: 10px;
      }
  
      .burger-icon {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
  
      .burger-icon span {
        display: block;
        height: 3px;
        width: 100%;
        background-color: #333;
        border-radius: 3px;
      }
  
      .nav-popup {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
  
      .nav-popup.active {
        display: flex;
      }
  
      /* Important: Create separate popup links class to avoid conflict */
      .popup-links {
        display: flex !important; /* Always display in popup */
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
  
      .popup-links a {
        color: white;
        font-size: 1.5rem;
        margin: 15px 0;
        text-decoration: none;
        display: block !important; /* Ensure links are always visible */
      }
  
      .close-menu {
        position: absolute;
        top: 20px;
        right: 20px;
        color: white;
        font-size: 2rem;
        cursor: pointer;
      }
  
      @media only screen and (max-width: 600px) {
        .nav-links {
          display: none !important;
        }
        
        .burger-menu {
          display: block;
        }
      }
    `;
    document.head.appendChild(styleElement);
  
    // 2. Get the navigation element
    const navLinks = document.querySelector('.nav-links');
    
    if (!navLinks) {
      console.error('Navigation links element not found');
      return;
    }
    
    // 3. Create burger menu element with visible styles
    const burgerMenu = document.createElement('div');
    burgerMenu.className = 'burger-menu';
    burgerMenu.innerHTML = `
      <div class="burger-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    
    // 4. Find the parent container and add the burger menu
    const navContainer = navLinks.parentNode;
    if (navContainer) {
      navContainer.insertBefore(burgerMenu, navLinks.nextSibling);
    } else {
      document.body.appendChild(burgerMenu); // Fallback
    }
    
    // 5. Create popup navigation
    const navPopup = document.createElement('div');
    navPopup.className = 'nav-popup';
    
    // 6. Create a new popup links container instead of cloning
    const popupLinks = document.createElement('div');
    popupLinks.className = 'popup-links'; // Important: Different class name
    
    // 7. Copy the links rather than cloning the entire nav-links
    const originalLinks = navLinks.querySelectorAll('a');
    originalLinks.forEach(link => {
      const newLink = link.cloneNode(true) as HTMLElement;
      popupLinks.appendChild(newLink);
    });
    
    // 8. Create close button
    const closeButton = document.createElement('div');
    closeButton.className = 'close-menu';
    closeButton.innerHTML = '&times;';
    
    // 9. Add elements to popup
    navPopup.appendChild(closeButton);
    navPopup.appendChild(popupLinks);
    
    // 10. Add popup to body
    document.body.appendChild(navPopup);
    
    // 11. Toggle popup visibility when burger menu is clicked
    burgerMenu.addEventListener('click', () => {
      navPopup.classList.add('active');
    });
    
    // 12. Close popup when close button is clicked
    closeButton.addEventListener('click', () => {
      navPopup.classList.remove('active');
    });
    
    // 13. Close popup when a navigation link is clicked
    const popupLinkElements = popupLinks.querySelectorAll('a');
    popupLinkElements.forEach(link => {
      link.addEventListener('click', () => {
        navPopup.classList.remove('active');
      });
    });
    
    // 14. Apply initial state based on window size
    function applyResponsiveState() {
      if (window.innerWidth <= 600) {
        (navLinks as HTMLElement).style.display = 'none';
        burgerMenu.style.display = 'block';
      } else {
        (navLinks as HTMLElement).style.display = '';
        burgerMenu.style.display = 'none';
        navPopup.classList.remove('active');
      }
    }
    
    // 15. Apply initial state and add resize listener
    applyResponsiveState();
    window.addEventListener('resize', applyResponsiveState);
  });