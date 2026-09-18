class TerminalAnimationController {
    private terminalWrapper: HTMLElement;
    private terminalContent: HTMLElement;
    private greenIndicator: HTMLElement;
    private redIndicator: HTMLElement;
    private commandTexts: NodeListOf<HTMLParagraphElement>;
    private currentIndex: number = 0;
    private isAnimating: boolean = false;
  
    constructor() {
      this.initializeElements();
      this.setupInitialState();
    }
  
    private initializeElements(): void {
      this.terminalWrapper = document.querySelector('.TerminalPageWrapperCard') as HTMLElement;
      this.terminalContent = document.querySelector('.terminalContent') as HTMLElement;
      this.greenIndicator = document.querySelector('.minimizeWindow') as HTMLElement;
      this.redIndicator = document.querySelector('.closeWindow') as HTMLElement;
      this.commandTexts = document.querySelectorAll('.terminalCommandText p');
  
      if (!this.terminalWrapper || !this.terminalContent || !this.greenIndicator || !this.redIndicator) {
        throw new Error('Required DOM elements not found');
      }
    }
  
    private setupInitialState(): void {
      // Hide all p tags initially
      this.commandTexts.forEach(p => {
        p.style.display = 'none';
      });
  
      // Set initial position for entrance animation
      this.terminalWrapper.style.transform = 'translateX(100%) rotateY(-30deg) rotateX(10deg)';
      this.terminalWrapper.style.opacity = '0';
      this.terminalWrapper.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  
      // Setup indicators
      this.greenIndicator.style.transition = 'all 0.3s ease-in-out';
      this.redIndicator.style.transition = 'all 0.3s ease-in-out';
      this.stopIndicator(this.greenIndicator);
      this.stopIndicator(this.redIndicator);
    }
  
    public async startAnimation(): Promise<void> {
      if (this.isAnimating) return;
      this.isAnimating = true;
  
      // Process each p tag with complete terminal container cycle
      for (let i = 0; i < this.commandTexts.length; i++) {
        this.currentIndex = i;
        await this.processTerminalWindow(this.commandTexts[i]);
      }
  
      this.isAnimating = false;
    }
  
    private async terminalEntranceAnimation(): Promise<void> {
      return new Promise(resolve => {
        // Reset and animate entire terminal container entrance
        this.terminalWrapper.style.transform = 'translateX(100%) rotateY(-30deg) rotateX(10deg)';
        this.terminalWrapper.style.opacity = '0';
        
        // Force reflow
        this.terminalWrapper.offsetHeight;
        
        // Animate to normal position
        setTimeout(() => {
          this.terminalWrapper.style.transform = 'translateX(0) rotateY(0deg) rotateX(0deg)';
          this.terminalWrapper.style.opacity = '1';
        }, 50);
        
        setTimeout(resolve, 800);
      });
    }
  
    private async silverShineEffect(): Promise<void> {
      return new Promise(resolve => {
        const shine = document.createElement('div');
        shine.className = 'silver-shine-overlay';
        shine.style.cssText = `
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(192, 192, 192, 0.8), transparent);
          animation: silverShine 1s ease-out forwards;
          pointer-events: none;
          z-index: 10;
        `;
  
        this.terminalWrapper.style.position = 'relative';
        this.terminalWrapper.appendChild(shine);
  
        setTimeout(() => {
          shine.remove();
          resolve();
        }, 1000);
      });
    }
  
    private async processTerminalWindow(pElement: HTMLParagraphElement): Promise<void> {
      // Terminal entrance animation (each container gets its own entrance)
      await this.terminalEntranceAnimation();
  
      // Silver shine effect for this terminal container
      await this.silverShineEffect();
  
      // Show current p element
      pElement.style.display = 'block';
      pElement.innerHTML = ''; // Clear content for typing
  
      // Start green indicator
      this.startIndicator(this.greenIndicator, '#00ff00');
  
      // Typing animation with letter drop effect
      await this.typeWithDropEffect(pElement);
  
      // Stop green, start red indicator
      this.stopIndicator(this.greenIndicator);
      this.startIndicator(this.redIndicator, '#ff0000');
  
      // Brief pause before exit
      await this.delay(500);
  
      // Stop red indicator
      this.stopIndicator(this.redIndicator);
  
      // Genie exit effect for entire terminal container
      await this.genieExitEffect();
  
      // Hide current p element
      pElement.style.display = 'none';
  
      // Brief pause before next window
      await this.delay(300);
    }
  
    private async typeWithDropEffect(pElement: HTMLParagraphElement): Promise<void> {
      const originalText = this.getOriginalText(this.currentIndex);
      const chars = originalText.split('');
      
      return new Promise(resolve => {
        let charIndex = 0;
        
        const typeChar = () => {
          if (charIndex >= chars.length) {
            resolve();
            return;
          }
  
          const char = chars[charIndex];
          this.createDroppingChar(char, pElement, charIndex);
          charIndex++;
          
          setTimeout(typeChar, 100); // Typing speed
        };
  
        typeChar();
      });
    }
  
    private createDroppingChar(char: string, container: HTMLParagraphElement, _index: number): void {
      const charSpan = document.createElement('span');
      charSpan.textContent = char;
      charSpan.style.cssText = `
        display: inline-block;
        transform: translateY(-50px) scale(2);
        opacity: 0;
        animation: dropChar 0.5s ease-out forwards;
        animation-delay: 0.1s;
      `;
  
      container.appendChild(charSpan);
    }
  
    private async genieExitEffect(): Promise<void> {
      return new Promise(resolve => {
        // Apply genie effect to entire terminal wrapper, not just content
        this.terminalWrapper.style.cssText += `
          animation: genieExit 0.8s ease-in-out forwards;
          transform-origin: bottom left;
        `;
  
        setTimeout(() => {
          // Reset terminal wrapper for next iteration
          this.terminalWrapper.style.animation = '';
          this.terminalWrapper.style.transform = '';
          this.terminalWrapper.style.transformOrigin = '';
          resolve();
        }, 800);
      });
    }
  
    private startIndicator(indicator: HTMLElement, color: string): void {
      indicator.style.backgroundColor = color;
      indicator.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
      indicator.style.animation = 'pulse 1s ease-in-out infinite';
    }
  
    private stopIndicator(indicator: HTMLElement): void {
      indicator.style.backgroundColor = '#666';
      indicator.style.boxShadow = 'none';
      indicator.style.animation = 'none';
    }
  
    private getOriginalText(index: number): string {
      const texts = [
        'Built-in Terminal -R launch',
        '📁 Command Line: Music Playback',
        '🧠 Smart Features',
        '🎹 Command Line: Access tools',
        '🔧 Custom Scripts',
        '💾 Library Management',
        '🌐 Online Integration',
        '🛠 Terminal UI Features'
      ];
      return texts[index] || '';
    }
  
    private delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
  
  // CSS Animations - Add this to your stylesheet
  const animationCSS = `
  @keyframes silverShine {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  @keyframes dropChar {
    0% {
      transform: translateY(-50px) scale(2);
      opacity: 0;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
  
  @keyframes genieExit {
    0% {
      transform: scaleX(1) scaleY(1) rotateY(0deg);
      opacity: 1;
    }
    30% {
      transform: scaleX(0.9) scaleY(0.8) rotateY(-5deg);
      opacity: 0.9;
    }
    70% {
      transform: scaleX(0.3) scaleY(0.2) rotateY(-25deg);
      opacity: 0.5;
    }
    100% {
      transform: scaleX(0.05) scaleY(0.05) rotateY(-45deg) translateX(-50px);
      opacity: 0;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.1);
    }
  }
  
  .silver-shine-overlay {
    position: absolute !important;
  }
  `;
  
  // Initialize and start animation when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Inject CSS
    const style = document.createElement('style');
    style.textContent = animationCSS;
    document.head.appendChild(style);
  
    // Create and start terminal animation
    const terminal = new TerminalAnimationController();
    
    // Start animation after a brief delay
    setTimeout(() => {
      terminal.startAnimation();
    }, 500);
  });
  
  // Export for external use
  export { TerminalAnimationController };