/**
 * Enhanced Glitch Effect with Visible Base Image
 */
interface GlitchOptions {
  interval?: number;      // Time between glitch effects in ms (default: 4000)
  duration?: number;      // Duration of each glitch effect in ms (default: 500)
  intensity?: number;     // Intensity of the glitch (1-10, default: 5)
  maxGlitches?: number;   // Maximum simultaneous glitches (default: 3)
}

class ImageGlitcher {
  private options: Required<GlitchOptions>;
  private image: HTMLImageElement;
  private container: HTMLElement;
  private glitchLayers: HTMLElement[] = [];
  private isGlitching = false;
  private intervalId: number | null = null;
  private resizeObserver: ResizeObserver;

  constructor(image: HTMLImageElement, options: GlitchOptions = {}) {
    this.image = image;
    this.options = {
      interval: options.interval ?? 4000,
      duration: options.duration ?? 500,
      intensity: Math.min(Math.max(options.intensity ?? 5, 1), 10),
      maxGlitches: options.maxGlitches ?? 3
    };

    this.container = this.createContainer();
    this.setupGlitchLayers();
    this.addStyles();
    this.startGlitchInterval();

    // Handle responsive sizing
    this.resizeObserver = new ResizeObserver(() => this.updateLayerSizes());
    this.resizeObserver.observe(this.container);
  }

  private createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'glitch-container';
    Object.assign(container.style, {
      position: 'relative',
      display: 'inline-block',
      overflow: 'hidden',
      width: '100%',
      height: '100%'
    });

    // Insert container and move image into it
    const parent = this.image.parentNode;
    if (!parent) throw new Error("Image must be in the DOM");
    
    parent.insertBefore(container, this.image);
    container.appendChild(this.image);

    // Ensure base image is always visible
    this.image.style.position = 'relative';
    this.image.style.zIndex = '1';

    return container;
  }

  private setupGlitchLayers(): void {
    for (let i = 0; i < this.options.maxGlitches; i++) {
      const layer = document.createElement('div');
      layer.className = `glitch-layer glitch-layer-${i}`;
      Object.assign(layer.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${this.image.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: '0',
        pointerEvents: 'none',
        zIndex: '2',
        willChange: 'transform, opacity, filter'
      });
      this.container.appendChild(layer);
      this.glitchLayers.push(layer);
    }
  }

  private updateLayerSizes(): void {
    const { width, height } = this.container.getBoundingClientRect();
    this.glitchLayers.forEach(layer => {
      layer.style.width = `${width}px`;
      layer.style.height = `${height}px`;
    });
  }

  private addStyles(): void {
    const styleId = 'glitch-effect-styles';
    if (document.getElementById(styleId)) return;

    const intensity = this.options.intensity;
    const duration = this.options.duration;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .glitch-container {
        display: inline-block;
        position: relative;
        overflow: hidden;
      }
      
      .glitch-layer {
        opacity: 0;
        transform: translate3d(0, 0, 0);
      }
      
      @keyframes glitch-anim-red {
        0% { opacity: 0.8; transform: translate3d(${intensity * 2}px, -${intensity}px, 0); filter: brightness(1.5) hue-rotate(10deg); }
        10% { transform: translate3d(-${intensity}px, ${intensity}px, 0); }
        20% { transform: translate3d(${intensity * 1.5}px, -${intensity * 0.5}px, 0); }
        30% { transform: translate3d(-${intensity * 0.5}px, ${intensity * 1.2}px, 0); }
        40% { opacity: 0; transform: translate3d(0, 0, 0); }
        100% { opacity: 0; }
      }
      
      @keyframes glitch-anim-blue {
        0% { opacity: 0.8; transform: translate3d(-${intensity * 1.5}px, ${intensity * 0.5}px, 0); filter: brightness(0.8) hue-rotate(-15deg); }
        15% { transform: translate3d(${intensity}px, -${intensity * 0.8}px, 0); }
        30% { transform: translate3d(-${intensity * 0.3}px, ${intensity}px, 0); }
        45% { opacity: 0; transform: translate3d(0, 0, 0); }
        100% { opacity: 0; }
      }
      
      @keyframes glitch-anim-green {
        0% { opacity: 0.6; transform: translate3d(${intensity}px, ${intensity * 0.7}px, 0); filter: brightness(1.2) hue-rotate(30deg); }
        20% { transform: translate3d(-${intensity * 0.4}px, -${intensity * 0.2}px, 0); }
        40% { transform: translate3d(${intensity * 0.3}px, ${intensity * 0.5}px, 0); }
        60% { opacity: 0; transform: translate3d(0, 0, 0); }
        100% { opacity: 0; }
      }
      
      .glitch-active .glitch-layer-0 {
        animation: glitch-anim-red ${duration}ms linear forwards;
      }
      
      .glitch-active .glitch-layer-1 {
        animation: glitch-anim-blue ${duration}ms linear forwards;
      }
      
      .glitch-active .glitch-layer-2 {
        animation: glitch-anim-green ${duration}ms linear forwards;
      }
    `;
    document.head.appendChild(style);
  }

  private startGlitchInterval(): void {
    this.intervalId = window.setInterval(() => {
      if (!this.isGlitching) {
        this.triggerGlitch();
      }
    }, this.options.interval);
  }

  public triggerGlitch(): void {
    if (this.isGlitching) return;
    
    this.isGlitching = true;
    this.container.classList.add('glitch-active');

    // Randomize some properties for variety
    this.glitchLayers.forEach(layer => {
      layer.style.mixBlendMode = ['screen', 'overlay', 'lighten'][Math.floor(Math.random() * 3)];
    });

    setTimeout(() => {
      this.container.classList.remove('glitch-active');
      this.isGlitching = false;
    }, this.options.duration);
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.resizeObserver.disconnect();
  }
}

// Initialize the effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const glitchImages = document.querySelectorAll<HTMLImageElement>('[data-glitch-effect]');
  
  glitchImages.forEach(img => {
    const options: GlitchOptions = {
      interval: parseInt(img.dataset.glitchInterval || '4000'),
      duration: parseInt(img.dataset.glitchDuration || '500'),
      intensity: parseInt(img.dataset.glitchIntensity || '5')
    };
    
    const glitcher = new ImageGlitcher(img, options);
    
    // Optional click trigger
    if (img.hasAttribute('data-glitch-on-click')) {
      img.addEventListener('click', () => glitcher.triggerGlitch());
    }
  });
});

export {}; // Make this file a module