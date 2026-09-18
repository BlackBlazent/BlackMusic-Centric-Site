class EnhancedZoomEffect {
  private pageTwo: HTMLElement;
  private leftGroup: HTMLElement;
  private rightGroup: HTMLElement;
  private centerImage: HTMLElement;
  private leftImages: HTMLImageElement[];
  private rightImages: HTMLImageElement[];
  private scale: number = 0;
  private targetScale: number = 0;
  private zoomSpeed: number = 0.1;
  private animationId: number | null = null;
  private activeHoverIndex: number | null = null;

  constructor() {
    this.pageTwo = document.getElementById('pageTwo')!;
    this.leftGroup = document.getElementById('leftGroup')!;
    this.rightGroup = document.getElementById('rightGroup')!;
    this.centerImage = document.querySelector('.home-scroll-page-two-content-wrapper-card img')!;
    this.leftImages = Array.from(this.leftGroup.querySelectorAll('img'));
    this.rightImages = Array.from(this.rightGroup.querySelectorAll('img'));

    this.init();
  }

  private init(): void {
    // Set initial hidden state
    this.resetGroups();
    
    // Wheel event for zoom
    this.pageTwo.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    
    // Hover effects
    this.setupHoverEffects();
    
    // Start animation loop
    this.animate();
  }

  private handleWheel(e: WheelEvent): void {
    e.preventDefault();
    
    // Update target scale based on scroll direction (inverted)
    const delta = -Math.sign(e.deltaY) * 0.1;
    this.targetScale = Math.min(1, Math.max(0, this.targetScale + delta));
    
    // Restart animation if not running
    if (!this.animationId) {
      this.animate();
    }
  }

  private animate(): void {
    // Smooth interpolation
    this.scale += (this.targetScale - this.scale) * this.zoomSpeed;
    
    // Continue animating if not at target
    if (Math.abs(this.scale - this.targetScale) > 0.001) {
      this.updateGroups();
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.animationId = null;
    }
  }

  private updateGroups(): void {
    // Apply scale and position transformations
    const leftTransform = `translateX(-${50 * (1 - this.scale)}%) scale(${this.scale})`;
    const rightTransform = `translateX(${50 * (1 - this.scale)}%) scale(${this.scale})`;
    
    this.leftGroup.style.transform = leftTransform;
    this.rightGroup.style.transform = rightTransform;
    
    // Opacity and z-index
    this.leftGroup.style.opacity = this.scale.toString();
    this.rightGroup.style.opacity = this.scale.toString();
    
    // Center image remains stable
    this.centerImage.style.transform = `scale(${1 + (0.2 * this.scale)})`;
  }

  private resetGroups(): void {
    // Start completely hidden
    this.scale = 0;
    this.targetScale = 0;
    this.leftGroup.style.transform = 'translateX(-50%) scale(0)';
    this.rightGroup.style.transform = 'translateX(50%) scale(0)';
    this.leftGroup.style.opacity = '0';
    this.rightGroup.style.opacity = '0';
  }

  private setupHoverEffects(): void {
    // Left group hover
    this.leftImages.forEach((img, index) => {
      img.addEventListener('mouseenter', () => this.handleHover('left', index));
      img.addEventListener('mouseleave', () => this.resetHover());
    });
    
    // Right group hover
    this.rightImages.forEach((img, index) => {
      img.addEventListener('mouseenter', () => this.handleHover('right', index));
      img.addEventListener('mouseleave', () => this.resetHover());
    });
  }

  private handleHover(side: 'left' | 'right', index: number): void {
    this.activeHoverIndex = index;
    
    const images = side === 'left' ? this.leftImages : this.rightImages;
    
    // Highlight the hovered image
    images.forEach((img, i) => {
      if (i === index) {
        img.style.transform = 'scale(2)';
        img.style.zIndex = '10';
        img.style.transition = 'transform 0.3s ease-out';
      } else {
        img.style.transform = 'scale(1)';
        img.style.zIndex = '1';
      }
    });
  }

  private resetHover(): void {
    if (this.activeHoverIndex === null) return;
    
    // Reset all images
    [...this.leftImages, ...this.rightImages].forEach(img => {
      img.style.transform = 'scale(1)';
      img.style.zIndex = '1';
    });
    
    this.activeHoverIndex = null;
  }

  public destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.pageTwo.removeEventListener('wheel', this.handleWheel);
    this.leftImages.forEach(img => {
      img.removeEventListener('mouseenter', () => this.handleHover('left', 0));
      img.removeEventListener('mouseleave', this.resetHover);
    });
    this.rightImages.forEach(img => {
      img.removeEventListener('mouseenter', () => this.handleHover('right', 0));
      img.removeEventListener('mouseleave', this.resetHover);
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new EnhancedZoomEffect();
});