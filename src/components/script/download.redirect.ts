// Define OS types
type OperatingSystem = 'macOS' | 'windows' | 'linux' | 'android' | 'ios';

// Define download links for each OS
const DOWNLOAD_LINKS: Record<OperatingSystem, string> = {
  'macOS': 'https://example.com/download/mac',
  'windows': 'https://example.com/download/windows',
  'linux': 'https://example.com/download/linux',
  'android': 'https://example.com/download/android',
  'ios': 'https://example.com/download/ios'
};

// Store references to cleanup later
let currentShineElements: HTMLElement[] = [];
let currentEventListeners: { element: EventTarget; type: string; listener: EventListener }[] = [];

// Function to detect user's OS
function detectOS(): OperatingSystem | null {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  
  if (/Android/i.test(userAgent)) return 'android';
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios';
  if (/Mac/i.test(platform)) return 'macOS';
  if (/Win/i.test(platform)) return 'windows';
  if (/Linux/i.test(platform)) return 'linux';
  
  return null;
}

// Function to clean up previous effects and listeners
function cleanupPreviousEffects(): void {
  // Remove shine elements
  currentShineElements.forEach(shine => {
    if (shine.parentNode) {
      shine.parentNode.removeChild(shine);
    }
  });
  currentShineElements = [];
  
  // Remove event listeners
  currentEventListeners.forEach(({ element, type, listener }) => {
    element.removeEventListener(type, listener);
  });
  currentEventListeners = [];
  
  // Remove any added styles
  const addedStyles = document.querySelectorAll('style[data-os-banner]');
  addedStyles.forEach(style => style.remove());
}

// Function to add shine effect to an element
function addShineEffect(element: HTMLElement): void {
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  
  const shine = document.createElement('div');
  shine.style.position = 'absolute';
  shine.style.top = '0';
  shine.style.left = '-100%';
  shine.style.width = '100%';
  shine.style.height = '100%';
  shine.style.background = 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)';
  shine.style.transform = 'skewX(-25deg)';
  shine.style.transition = 'left 0.5s ease-in-out';
  
  element.appendChild(shine);
  currentShineElements.push(shine);
  
  // Create hover effect function
  const hoverEffect = () => {
    shine.style.left = '100%';
    setTimeout(() => {
      shine.style.transition = 'none';
      shine.style.left = '-100%';
      setTimeout(() => {
        shine.style.transition = 'left 0.5s ease-in-out';
      }, 50);
    }, 500);
  };
  
  // Add hover event
  element.addEventListener('mouseenter', hoverEffect);
  currentEventListeners.push({
    element: element,
    type: 'mouseenter',
    listener: hoverEffect
  });
  
  // Initial animation
  setTimeout(() => {
    shine.style.left = '100%';
    setTimeout(() => {
      shine.style.transition = 'none';
      shine.style.left = '-100%';
      setTimeout(() => {
        shine.style.transition = 'left 0.5s ease-in-out';
      }, 50);
    }, 500);
  }, 1000);
}

// Function to highlight the current OS banner
function highlightCurrentOS(os: OperatingSystem | null): void {
  if (!os) return;
  
  const wrapperClass = `${os.toLowerCase()}CardWrapper`;
  const wrapper = document.querySelector(`.${wrapperClass}`) as HTMLElement;
  
  if (wrapper) {
    // Add border and shadow
    wrapper.style.border = '2px solidrgba(255, 255, 255, 0)';
    wrapper.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0)';
    wrapper.style.transition = 'all 0.3s ease';
    
    // Add shine effect
    addShineEffect(wrapper);
    
    // Add pulsing animation
    wrapper.style.animation = 'pulse 2s infinite';
    
    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.setAttribute('data-os-banner', 'true');
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
}

// Function to initialize OS banners
function initializeOSBanners(): void {
  // Clean up any previous effects first
  cleanupPreviousEffects();
  
  // Add click event listeners to all banners
  const banners = [
    { class: 'macOSCardWrapper', os: 'macOS' },
    { class: 'windowsCardWrapper', os: 'windows' },
    { class: 'linuxCardWrapper', os: 'linux' },
    { class: 'androidCardWrapper', os: 'android' },
    { class: 'iosCardWrapper', os: 'ios' }
  ];
  
  banners.forEach(({ class: wrapperClass, os }) => {
    const wrapper = document.querySelector(`.${wrapperClass}`);
    if (wrapper) {
      // Create click handler
      const clickHandler = () => {
        window.location.href = DOWNLOAD_LINKS[os as OperatingSystem];
      };
      
      wrapper.addEventListener('click', clickHandler);
      currentEventListeners.push({
        element: wrapper,
        type: 'click',
        listener: clickHandler
      });
      
      // Create hover handlers
      const mouseEnterHandler = () => {
        (wrapper as HTMLElement).style.transform = 'translateY(-5px)';
        (wrapper as HTMLElement).style.transition = 'transform 0.2s ease';
      };
      
      const mouseLeaveHandler = () => {
        (wrapper as HTMLElement).style.transform = 'translateY(0)';
      };
      
      wrapper.addEventListener('mouseenter', mouseEnterHandler);
      wrapper.addEventListener('mouseleave', mouseLeaveHandler);
      
      currentEventListeners.push(
        { element: wrapper, type: 'mouseenter', listener: mouseEnterHandler },
        { element: wrapper, type: 'mouseleave', listener: mouseLeaveHandler }
      );
    }
  });
  
  // Detect and highlight current OS
  const currentOS = detectOS();
  highlightCurrentOS(currentOS);
}

// Initialize when DOM is loaded or page is shown (for back/forward navigation)
function init() {
  initializeOSBanners();
}

// Add multiple event listeners to ensure it works in all cases
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('pageshow', init);

// Also initialize if the script loads after DOMContentLoaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(init, 0);
} else {
  document.addEventListener('DOMContentLoaded', init);
}