/**
 * Ultra-Fast Parallax Drop Animation Sequence
 * Optimized version with fixed capability icons visibility
 */
class ParallaxAnimator {
  private elements: {
    topBg: HTMLElement | null;
    backModel: HTMLElement | null;
    upperBg: HTMLElement | null;
    lowerBg: HTMLElement | null;
    homeModel: HTMLElement | null;
    codenameText: HTMLElement | null;
    appNameText: HTMLElement | null;
    capabilitiesContainer: HTMLElement | null;
    capabilityIcons: HTMLElement[];
  } = {
    topBg: null,
    backModel: null,
    upperBg: null,
    lowerBg: null,
    homeModel: null,
    codenameText: null,
    appNameText: null,
    capabilitiesContainer: null,
    capabilityIcons: []
  };

  constructor() {
    this.cacheElements();
    this.initializeElements();
  }

  // Cache all elements we'll be animating
  private cacheElements(): void {
    this.elements = {
      topBg: document.getElementById('topBg'),
      backModel: document.getElementById('homeModelBackImg'),
      upperBg: document.getElementById('upperBgImg'),
      lowerBg: document.getElementById('lowerBgImg'),
      homeModel: document.getElementById('homeModelImg'),
      codenameText: document.getElementById('codenameText'),
      appNameText: document.getElementById('appNameText'),
      capabilitiesContainer: document.getElementById('appCapabilitiesIcon'),
      capabilityIcons: Array.from(document.querySelectorAll('.capabilities-strength-wrapper')) as HTMLElement[]
    };
  }

  // Set initial positions for all elements
  private initializeElements(): void {
    // Top background - starts above viewport
    if (this.elements.topBg) {
      this.elements.topBg.style.transform = 'translateY(-100%)';
      this.elements.topBg.style.willChange = 'transform';
    }

    // Back model - starts below viewport
    if (this.elements.backModel) {
      this.elements.backModel.style.transform = 'translateY(100%)';
      this.elements.backModel.style.willChange = 'transform';
    }

    // Upper and lower backgrounds - start below viewport
    if (this.elements.upperBg) {
      this.elements.upperBg.style.transform = 'translateY(100%)';
      this.elements.upperBg.style.willChange = 'transform';
    }
    if (this.elements.lowerBg) {
      this.elements.lowerBg.style.transform = 'translateY(100%)';
      this.elements.lowerBg.style.willChange = 'transform';
    }

    // Home model - starts to the right
    if (this.elements.homeModel) {
      this.elements.homeModel.style.transform = 'translateX(100%)';
      this.elements.homeModel.style.willChange = 'transform';
    }

    // Text elements - start to the left and transparent
    if (this.elements.codenameText) {
      this.elements.codenameText.style.transform = 'translateX(-50px)';
      this.elements.codenameText.style.opacity = '0';
      this.elements.codenameText.style.willChange = 'transform, opacity';
    }
    if (this.elements.appNameText) {
      this.elements.appNameText.style.transform = 'translateX(-50px)';
      this.elements.appNameText.style.opacity = '0';
      this.elements.appNameText.style.willChange = 'transform, opacity';
    }

    // Capabilities icons - start to the left and transparent
    if (this.elements.capabilitiesContainer) {
      this.elements.capabilitiesContainer.style.transform = 'translateX(-50px)';
      this.elements.capabilitiesContainer.style.opacity = '0';
      this.elements.capabilitiesContainer.style.willChange = 'transform, opacity';
    }
    
    if (this.elements.capabilityIcons && this.elements.capabilityIcons.length > 0) {
      this.elements.capabilityIcons.forEach((icon: HTMLElement) => {
        icon.style.transform = 'translateX(-20px)';
        icon.style.opacity = '0';
        icon.style.willChange = 'transform, opacity';
      });
    }
  }

  // Animate an element with transform and opacity (optimized version)
  private animateElement(
    element: HTMLElement,
    finalTransform: string,
    duration: number = 400, // Reduced from 1000ms to 400ms
    easing: string = 'cubic-bezier(0.2, 0.8, 0.4, 1)' // Snappier easing
  ): Promise<void> {
    return new Promise(resolve => {
      element.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`;
      
      // Force reflow to ensure transition starts
      void element.offsetHeight;
      
      element.style.transform = finalTransform;
      element.style.opacity = '1';

      setTimeout(resolve, duration);
    });
  }

  // Run all animations in parallel with proper sequencing
  public async playEntranceSequence(): Promise<void> {
    // Start all animations with appropriate delays
    const animations: Promise<void>[] = [];
    
    // 1. Top background drops down immediately (0ms delay)
    if (this.elements.topBg) {
      animations.push(this.animateElement(this.elements.topBg, 'translateY(0)', 400));
    }

    // 2. Back model rises up after 100ms delay
    if (this.elements.backModel) {
      animations.push(new Promise(resolve => {
        setTimeout(() => this.animateElement(this.elements.backModel!, 'translateY(0)', 400).then(resolve), 100);
      }));
    }

    // 3. Upper and lower backgrounds rise up after 200ms delay
    if (this.elements.upperBg) {
      animations.push(new Promise(resolve => {
        setTimeout(() => this.animateElement(this.elements.upperBg!, 'translateY(0)', 400).then(resolve), 200);
      }));
    }
    if (this.elements.lowerBg) {
      animations.push(new Promise(resolve => {
        setTimeout(() => this.animateElement(this.elements.lowerBg!, 'translateY(0)', 400).then(resolve), 200);
      }));
    }

    // 4. Home model slides in from right after 300ms delay
    if (this.elements.homeModel) {
      animations.push(new Promise(resolve => {
        setTimeout(() => this.animateElement(this.elements.homeModel!, 'translateX(0)', 400).then(resolve), 300);
      }));
    }

    // 5. Codename text slides in from left after 400ms delay
    if (this.elements.codenameText) {
      animations.push(new Promise(resolve => {
        setTimeout(() => this.animateElement(this.elements.codenameText!, 'translateX(0)', 400).then(resolve), 400);
      }));
    }

    // 6. App name slides in from left after 500ms delay
    if (this.elements.appNameText) {
      animations.push(new Promise(resolve => {
        setTimeout(() => this.animateElement(this.elements.appNameText!, 'translateX(0)', 400).then(resolve), 500);
      }));
    }

    // 7. Capabilities container slides in from left after 600ms delay
    if (this.elements.capabilitiesContainer) {
      animations.push(new Promise(resolve => {
        setTimeout(() => {
          this.animateElement(this.elements.capabilitiesContainer!, 'translateX(0)', 400).then(() => {
            // 8. Individual capability icons stagger in after container
            if (this.elements.capabilityIcons && this.elements.capabilityIcons.length > 0) {
              const iconPromises = this.elements.capabilityIcons.map((icon: HTMLElement, i: number) => {
                return new Promise<void>(iconResolve => {
                  setTimeout(() => {
                    this.animateElement(icon, 'translateX(0)', 300).then(() => {
                      iconResolve();
                    });
                  }, i * 80); // Reduced stagger delay from 150ms to 80ms
                });
              });
              Promise.all(iconPromises).then(() => {
                resolve();
              });
            } else {
              resolve();
            }
          });
        }, 600);
      }));
    }

    await Promise.all(animations);
  }
}

// Initialize and play animation when page loads
document.addEventListener('DOMContentLoaded', () => {
  const animator = new ParallaxAnimator();
  animator.playEntranceSequence();
});

// Also handle pageshow event for back/forward navigation
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    const animator = new ParallaxAnimator();
    animator.playEntranceSequence();
  }
});