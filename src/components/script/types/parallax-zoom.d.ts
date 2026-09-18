export interface ShapeData {
    name: string;
    overlayImage: string;
    backgroundImage: string;
    initialScale: number;
    maxScale: number;
    rotationSpeed: number;
    glowIntensity: number;
    element?: HTMLElement | null;
  }
  
  export interface ParallaxZoomConfig {
    containerSelector: string;
    shapes: Omit<ShapeData, 'element'>[];
    transitionDuration?: number;
  }
  
  export interface ParallaxZoomInstance {
    init: () => void;
    destroy: () => void;
    nextShape: () => void;
    prevShape: () => void;
    getCurrentShape: () => ShapeData | null;
  }