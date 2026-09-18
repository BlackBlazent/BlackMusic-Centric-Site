// carousel.ts
class InteractiveCarousel {
    private carousel: HTMLElement;
    private items: NodeListOf<HTMLElement>;
    private activeIndex: number = 0;
    private transitionDuration: number = 300;
  
    constructor(selector: string = '.homeParallaxCarousel') {
      this.carousel = document.querySelector(selector) as HTMLElement;
      if (!this.carousel) {
        throw new Error(`Carousel element with selector '${selector}' not found`);
      }
  
      this.items = this.carousel.querySelectorAll('.carouselGalleryItem');
      this.init();
    }
  
    private init(): void {
      if (this.items.length === 0) return;
  
      // Set initial active state
      this.setActiveItem(this.activeIndex);
  
      // Add hover events
      this.items.forEach((item, index) => {
        item.addEventListener('mouseenter', () => this.handleItemHover(index));
        item.addEventListener('mouseleave', () => this.resetActiveState());
      });
  
      // Add keyboard navigation
      document.addEventListener('keydown', (e) => this.handleKeyNavigation(e));
    }
  
    private handleItemHover(index: number): void {
      if (index === this.activeIndex) return;
      this.setActiveItem(index);
    }
  
    private resetActiveState(): void {
      this.setActiveItem(this.activeIndex);
    }
  
    private setActiveItem(index: number): void {
      // Update active index
      this.activeIndex = index;
  
      // Apply styles to all items
      this.items.forEach((item, i) => {
        const isActive = i === index;
        const imageWrapper = item.querySelector('.carouselImageWrapper') as HTMLElement;
  
        // Transition properties
        item.style.transition = `all ${this.transitionDuration}ms ease`;
        imageWrapper.style.transition = `all ${this.transitionDuration}ms ease`;
  
        if (isActive) {
          // Active item styles
          item.style.flex = '1 0 40%';
          item.style.opacity = '1';
          imageWrapper.style.transform = 'scale(1.1)';
          imageWrapper.style.filter = 'brightness(1)';
          imageWrapper.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        } else {
          // Inactive item styles
          item.style.flex = '1 0 15%';
          item.style.opacity = '0.7';
          imageWrapper.style.transform = 'scale(0.85)';
          imageWrapper.style.filter = 'brightness(0.7)';
          imageWrapper.style.boxShadow = 'none';
        }
      });
    }
  
    private handleKeyNavigation(e: KeyboardEvent): void {
      if (e.key === 'ArrowRight') {
        const nextIndex = (this.activeIndex + 1) % this.items.length;
        this.setActiveItem(nextIndex);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (this.activeIndex - 1 + this.items.length) % this.items.length;
        this.setActiveItem(prevIndex);
      }
    }
  
    // Public method to navigate programmatically
    public goTo(index: number): void {
      if (index >= 0 && index < this.items.length) {
        this.setActiveItem(index);
      }
    }
  }
  
  // Initialize the carousel when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new InteractiveCarousel();
  });