document.addEventListener('DOMContentLoaded', () => {
    // Create and inject required CSS
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Hidden by default */
      .version-latest-tag {
        display: none;
        position: absolute;
        top: 5px;           /* Position closer to top edge */
        left: -30px;        /* Negative offset to position to the left */
        z-index: 10;
        transform: rotate(-8deg); /* Slight rotation for visual appeal */
        pointer-events: none; /* Allow clicks to pass through */
      }
      
      .latest-indicator {
        width: 70px; /* Slightly smaller for better fit */
        height: auto;
        filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.3)); /* Add shadow for better visibility */
      }
      
      /* Only show on mobile */
      @media only screen and (max-width: 600px) {
        .version-latest-tag {
          display: block;
        }
        
        /* Make sure parent elements have the proper position */
        .windowsCardWrapper, .iosCardWrapper, .macOSCardWrapper, .linuxCardWrapper, .androidCardWrapper {
          position: relative !important; /* Force relative positioning */
          overflow: visible !important; /* Ensure the indicator can overflow outside the card */
          padding-left: 10px; /* Padding instead of margin for better positioning */
        }
      }
    `;
    document.head.appendChild(styleElement);
    
    // Function to create and append latest indicator to a container
    function addLatestIndicator(containerSelector: string, index: number): void {
      const container = document.querySelector(containerSelector);
      
      if (!container) {
        console.error(`Container not found: ${containerSelector}`);
        return;
      }
      
      // Make sure container has position relative
      (container as HTMLElement).style.position = 'relative';
      
      // Create the latest indicator element
      const indicatorWrapper = document.createElement('div');
      indicatorWrapper.className = 'version-latest-tag';
      indicatorWrapper.id = `${containerSelector.replace(/[.#]/g, '')}-latestTag`;
      
      // Create the image element
      const indicatorImage = document.createElement('img');
      indicatorImage.className = 'latest-indicator';
      indicatorImage.src = './src/assets/latest.gif';
      indicatorImage.id = `${containerSelector.replace(/[.#]/g, '')}-latestImage`;
      indicatorImage.alt = 'LATEST';
      
      // Apply custom positioning based on which OS card it is
      // Each OS card gets slightly different positioning for a natural look
      switch(containerSelector) {
        case '.windowsCardWrapper':
          indicatorWrapper.style.top = '8px';
          indicatorWrapper.style.left = '-25px';
          break;
        case '.iosCardWrapper':
          indicatorWrapper.style.top = '12px';
          indicatorWrapper.style.left = '-28px';
          break;
        case '.macOSCardWrapper':
          indicatorWrapper.style.top = '10px';
          indicatorWrapper.style.left = '-27px';
          break;
        case '.linuxCardWrapper':
          indicatorWrapper.style.top = '7px';
          indicatorWrapper.style.left = '-26px';
          break;
        case '.androidCardWrapper':
          indicatorWrapper.style.top = '9px';
          indicatorWrapper.style.left = '-24px';
          break;
      }
      
      // Add slightly different shadows for visual distinction
      const shadowColors = [
        'rgba(0,0,255,0.4)',    // Blue (Windows)
        'rgba(255,0,0,0.4)',    // Red (iOS)
        'rgba(120,120,120,0.4)', // Gray (macOS)
        'rgba(255,140,0,0.4)',  // Orange (Linux)
        'rgba(0,200,0,0.4)'     // Green (Android)
      ];
      
      indicatorWrapper.style.filter = `drop-shadow(0px 2px 4px ${shadowColors[index % shadowColors.length]})`;
      
      // Append image to wrapper, and wrapper to container
      indicatorWrapper.appendChild(indicatorImage);
      container.appendChild(indicatorWrapper);
    }
    
    // Add latest indicator to ALL OS card containers
    addLatestIndicator('.windowsCardWrapper', 0);
    addLatestIndicator('.iosCardWrapper', 1);
    addLatestIndicator('.macOSCardWrapper', 2);
    addLatestIndicator('.linuxCardWrapper', 3);
    addLatestIndicator('.androidCardWrapper', 4);
    
    // Function to adjust position based on parent container dimensions
    function adjustIndicatorPositions(): void {
      const containerSelectors = [
        '.windowsCardWrapper', 
        '.iosCardWrapper',
        '.macOSCardWrapper',
        '.linuxCardWrapper',
        '.androidCardWrapper'
      ];
      
      containerSelectors.forEach((selector, index) => {
        const container = document.querySelector(selector);
        if (!container) return;
        
        const indicator = container.querySelector('.version-latest-tag') as HTMLElement;
        if (!indicator) return;
        
        // Display control based on screen size
        indicator.style.display = window.innerWidth <= 600 ? 'block' : 'none';
        
        // Ensure unique positions for each OS card
        switch(selector) {
          case '.windowsCardWrapper':
            indicator.style.top = '8px';
            indicator.style.left = '-25px';
            break;
          case '.iosCardWrapper':
            indicator.style.top = '12px';
            indicator.style.left = '-28px';
            break;
          case '.macOSCardWrapper':
            indicator.style.top = '10px';
            indicator.style.left = '-27px';
            break;
          case '.linuxCardWrapper':
            indicator.style.top = '7px';
            indicator.style.left = '-26px';
            break;
          case '.androidCardWrapper':
            indicator.style.top = '9px';
            indicator.style.left = '-24px';
            break;
        }
        
        // Shadow colors for visual distinction
        const shadowColors = [
          'rgba(0,0,255,0.4)',    // Blue (Windows)
          'rgba(255,0,0,0.4)',    // Red (iOS)
          'rgba(120,120,120,0.4)', // Gray (macOS)
          'rgba(255,140,0,0.4)',  // Orange (Linux)
          'rgba(0,200,0,0.4)'     // Green (Android)
        ];
        
        indicator.style.filter = `drop-shadow(0px 2px 4px ${shadowColors[index % shadowColors.length]})`;
      });
    }
    
    // Check positions on load and resize
    adjustIndicatorPositions();
    window.addEventListener('resize', adjustIndicatorPositions);
    
    // Optional: Animation for the latest indicator to make it more noticeable
    const animateIndicators = (): void => {
      const indicators = document.querySelectorAll('.latest-indicator');
      
      indicators.forEach((indicator) => {
        // Apply a subtle pulse effect
        (indicator as HTMLElement).animate(
          [
            { transform: 'scale(1) rotate(-5deg)' },
            { transform: 'scale(1.05) rotate(-5deg)' },
            { transform: 'scale(1) rotate(-5deg)' }
          ],
          {
            duration: 1500,
            iterations: Infinity
          }
        );
      });
    };
    
    // Apply animation if supported
    if ('animate' in HTMLElement.prototype) {
      animateIndicators();
    }
  });
  
  // Class-based implementation with improved positioning
  class LatestIndicatorManager {
    private containers: string[];
    
    constructor(containers: string[]) {
      this.containers = containers;
      this.injectStyles();
      this.initialize();
    }
    
    private injectStyles(): void {
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        .version-latest-tag {
          display: none;
          position: absolute;
          top: 10px;
          left: 0;
          z-index: 10;
          transform: translateX(-20px) rotate(-5deg);
          pointer-events: none;
        }
        
        .latest-indicator {
          width: 70px;
          height: auto;
          filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.3));
        }
        
        @media only screen and (max-width: 600px) {
          .version-latest-tag {
            display: block;
          }
          
          .windowsCardWrapper, .iosCardWrapper, .macOSCardWrapper, .linuxCardWrapper, .androidCardWrapper {
            position: relative !important;
            overflow: visible !important;
            padding-left: 10px;
          }
        }
      `;
      document.head.appendChild(styleElement);
    }
    
    private addLatestIndicator(containerSelector: string, index: number): void {
      const container = document.querySelector(containerSelector);
      
      if (!container) {
        console.error(`Container not found: ${containerSelector}`);
        return;
      }
      
      // Force position relative
      (container as HTMLElement).style.position = 'relative';
      
      const indicatorWrapper = document.createElement('div');
      indicatorWrapper.className = 'version-latest-tag';
      
      const indicatorImage = document.createElement('img');
      indicatorImage.className = 'latest-indicator';
      indicatorImage.src = './src/assets/latest.gif';
      indicatorImage.alt = 'LATEST';
      
      // Apply custom positioning based on which OS card it is
      if (containerSelector === '.windowsCardWrapper') {
        indicatorWrapper.style.top = '8px';
        indicatorWrapper.style.left = '-25px';
      } else if (containerSelector === '.iosCardWrapper') {
        indicatorWrapper.style.top = '12px';
        indicatorWrapper.style.left = '-28px';
      }
      
      // Add a custom shadow color for easier identification
      indicatorWrapper.style.filter = index === 0 ? 
        'drop-shadow(0px 2px 4px rgba(0,0,255,0.4))' : 
        'drop-shadow(0px 2px 4px rgba(255,0,0,0.4))';
      
      indicatorWrapper.appendChild(indicatorImage);
      container.appendChild(indicatorWrapper);
    }
    
    private adjustIndicatorPositions(): void {
      const isMobile = window.innerWidth <= 600;
      
      this.containers.forEach((selector, index) => {
        const container = document.querySelector(selector);
        if (!container) return;
        
        const indicator = container.querySelector('.version-latest-tag') as HTMLElement;
        if (!indicator) return;
        
        // Show/hide based on mobile breakpoint
        indicator.style.display = isMobile ? 'block' : 'none';
        
        // Set container to relative positioning to ensure proper indicator placement
        (container as HTMLElement).style.position = 'relative';
        
        // Apply unique positioning to each OS card indicator
        if (selector === '.windowsCardWrapper') {
          indicator.style.top = '8px';
          indicator.style.left = '-25px';
        } else if (selector === '.iosCardWrapper') {
          indicator.style.top = '12px';
          indicator.style.left = '-28px';
        }
        
        // Add a custom color identifier to make it easier to distinguish
        indicator.style.filter = index === 0 ? 
          'drop-shadow(0px 2px 4px rgba(0,0,255,0.4))' : 
          'drop-shadow(0px 2px 4px rgba(255,0,0,0.4))';
      });
    }
    
    private applyAnimations(): void {
      if (!('animate' in HTMLElement.prototype)) return;
      
      const indicators = document.querySelectorAll('.latest-indicator');
      
      indicators.forEach((indicator) => {
        (indicator as HTMLElement).animate(
          [
            { transform: 'scale(1) rotate(-5deg)' },
            { transform: 'scale(1.05) rotate(-5deg)' },
            { transform: 'scale(1) rotate(-5deg)' }
          ],
          {
            duration: 1500,
            iterations: Infinity
          }
        );
      });
    }
    
    private initialize(): void {
      // Add indicators to all specified containers with index for positioning
      this.containers.forEach((container, index) => {
        this.addLatestIndicator(container, index);
      });
      
      // Set up positioning and event listeners
      this.adjustIndicatorPositions();
      window.addEventListener('resize', () => this.adjustIndicatorPositions());
      
      // Apply animations
      this.applyAnimations();
    }
  }
  
  // To use the class-based implementation
  document.addEventListener('DOMContentLoaded', () => {
    new LatestIndicatorManager(['.windowsCardWrapper', '.iosCardWrapper']);
  });