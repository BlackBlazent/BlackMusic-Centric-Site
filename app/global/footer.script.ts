// footer.behave.ts

/**
 * Controls the behavior of the footer to make it hidden by default and show on hover
 */
class FooterBehavior {
    private footer: HTMLElement | null;
    private hitboxHeight: number = 12; // Height of the invisible hover detection area in pixels
    private hideDelay: number = 300; // Delay in ms before hiding the footer after mouse leaves
    private hideTimeoutId: number | null = null;
    
    constructor(footerSelector: string = '.footer-app') {
      this.footer = document.querySelector(footerSelector);
      this.initialize();
    }
    
    /**
     * Initialize the footer behavior
     */
    private initialize(): void {
      if (!this.footer) {
        console.error('Footer element not found with the specified selector');
        return;
      }
      
      // Apply initial styles to hide the footer
      this.applyStyles();
      
      // Create hitbox element for hover detection
      this.createHitbox();
      
      // Initial state - hidden
      this.hideFooter();
    }
    
    /**
     * Apply necessary styles to the footer element
     */
    private applyStyles(): void {
      if (!this.footer) return;
      
      // Add styles to the footer element
      Object.assign(this.footer.style, {
        position: 'fixed',
        bottom: '0',
        left: '0',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        zIndex: '1000'
      });
      
      // Create a stylesheet for the hitbox
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        .footer-hitbox {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: ${this.hitboxHeight}px;
          z-index: 999;
        }
        
        .footer-hidden {
          transform: translateY(100%);
          opacity: 0;
        }
        
        .footer-visible {
          transform: translateY(0);
          opacity: 1;
        }
      `;
      document.head.appendChild(styleSheet);
    }
    
    /**
     * Create an invisible hitbox at the bottom of the screen to detect hover
     */
    private createHitbox(): void {
      const hitbox = document.createElement('div');
      hitbox.className = 'footer-hitbox';
      
      // Add event listeners to the hitbox
      hitbox.addEventListener('mouseenter', () => this.showFooter());
      hitbox.addEventListener('touchstart', () => this.showFooter());
      
      // Add event listeners to the footer itself
      if (this.footer) {
        this.footer.addEventListener('mouseenter', () => this.showFooter());
        this.footer.addEventListener('mouseleave', () => this.scheduleHide());
        this.footer.addEventListener('touchstart', () => this.showFooter());
        this.footer.addEventListener('touchend', () => this.scheduleHide());
      }
      
      document.body.appendChild(hitbox);
    }
    
    /**
     * Show the footer
     */
    private showFooter(): void {
      if (!this.footer) return;
      
      // Clear any pending hide timeout
      if (this.hideTimeoutId !== null) {
        window.clearTimeout(this.hideTimeoutId);
        this.hideTimeoutId = null;
      }
      
      this.footer.classList.remove('footer-hidden');
      this.footer.classList.add('footer-visible');
    }
    
    /**
     * Schedule hiding the footer with a delay
     */
    private scheduleHide(): void {
      // Set a timeout to hide the footer
      this.hideTimeoutId = window.setTimeout(() => {
        this.hideFooter();
        this.hideTimeoutId = null;
      }, this.hideDelay);
    }
    
    /**
     * Hide the footer
     */
    private hideFooter(): void {
      if (!this.footer) return;
      
      this.footer.classList.add('footer-hidden');
      this.footer.classList.remove('footer-visible');
    }
    
    /**
     * Public method to manually show the footer
     */
    public show(): void {
      this.showFooter();
    }
    
    /**
     * Public method to manually hide the footer
     */
    public hide(): void {
      this.hideFooter();
    }
    
    /**
     * Update configuration options
     */
    public updateConfig(options: {
      hitboxHeight?: number;
      hideDelay?: number;
    }): void {
      if (options.hitboxHeight !== undefined) {
        this.hitboxHeight = options.hitboxHeight;
        const hitbox = document.querySelector('.footer-hitbox');
        if (hitbox) {
          (hitbox as HTMLElement).style.height = `${this.hitboxHeight}px`;
        }
      }
      
      if (options.hideDelay !== undefined) {
        this.hideDelay = options.hideDelay;
      }
    }
  }
  
  // Export the class for importing elsewhere
  export default FooterBehavior;
  
  // Example usage:
  // const footerBehavior = new FooterBehavior('.footer-app');