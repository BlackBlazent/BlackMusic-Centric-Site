class ZoomController {
    currentIndex: number;
    isZoomingIn: boolean;
    zoomLevel: number;
    isTransitioning: boolean;
    groups: { frontImage: string; frontCaption: string; backgroundImage: string; backgroundIcon: string; backgroundTitle: string; backgroundCaption: string; }[];
    config: { maxFrontSize: { width: number; height: number; }; minFrontSize: { width: number; height: number; }; transitionDuration: number; zoomStep: number; };
    elements: {};
    constructor(config = {}) {
        this.currentIndex = 0;
        this.isZoomingIn = false;
        this.zoomLevel = 0;
        this.isTransitioning = false;
        
        // Data for all 4 image sets
        this.groups = [
            {
                frontImage: "https://iili.io/3LMiYOB.png",
                frontCaption: "Fast",
                backgroundImage: "https://iili.io/3LMiYOB.png",
                backgroundIcon: "https://iili.io/3Pi1aGS.jpg",
                backgroundTitle: "Fast and lightweight",
                backgroundCaption: "Fast and lightweight comparable and compatible."
            },
            {
                frontImage: "https://picsum.photos/400/600?random=2",
                frontCaption: "Hybrid",
                backgroundImage: "https://picsum.photos/800/600?random=12",
                backgroundIcon: "https://picsum.photos/100/100?random=22",
                backgroundTitle: "Hybrid Architecture",
                backgroundCaption: "Combining the best of both worlds for optimal performance."
            },
            {
                frontImage: "https://picsum.photos/400/600?random=3",
                frontCaption: "Open Source",
                backgroundImage: "https://picsum.photos/800/600?random=13",
                backgroundIcon: "https://picsum.photos/100/100?random=23",
                backgroundTitle: "Open Source Foundation",
                backgroundCaption: "Community-driven development with transparent codebase."
            },
            {
                frontImage: "https://picsum.photos/400/600?random=4",
                frontCaption: "Streaming",
                backgroundImage: "https://picsum.photos/800/600?random=14",
                backgroundIcon: "https://picsum.photos/100/100?random=24",
                backgroundTitle: "Real-time Streaming",
                backgroundCaption: "Low-latency streaming capabilities for instant updates."
            }
        ];

        this.config = {
            maxFrontSize: { width: 500, height: 700 },
            minFrontSize: { width: 100, height: 140 },
            transitionDuration: 0.5,
            zoomStep: 0.03,
            ...config
        };

        // DOM element references
        this.elements = {};
        
        this.init();
    }

    init() {
        // Get all DOM elements
        this.elements = {
            container: document.querySelector('.homePageScrollPageThree'),
            
            // Background elements
            backgroundWrapper: document.querySelector('.pageThreeBackgroundWrapper'),
            backgroundImage: document.querySelector('.pageThreeBackgroundImage'),
            abilityIcon: document.querySelector('.abilityPageThreeIcon'),
            instanceTitle: document.querySelector('.instanceTitle'),
            instanceMention: document.querySelector('.instanceMention'),
            
            // Front elements
            frontScene: document.querySelector('.PageThreeFrontScene'),
            frontImage: document.querySelector('.sceneOverlayCinematicImage'),
            frontCaption: document.querySelector('.PageThreeFrontScene .instanceMention'),
            
            // Progress dots
            progressDots: Array.from(document.querySelectorAll('.progress-dot'))
        };

        // Set up wheel event listener
        this.elements.container.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });

        // Initialize with first group
        this.loadCurrentGroup();
        this.updateZoomState();
        this.updateProgress();
    }

    loadCurrentGroup() {
        const currentGroup = this.groups[this.currentIndex];
        
        // Update background elements
        this.elements.backgroundImage.src = currentGroup.backgroundImage;
        this.elements.abilityIcon.src = currentGroup.backgroundIcon;
        this.elements.instanceTitle.textContent = currentGroup.backgroundTitle;
        this.elements.instanceMention.textContent = currentGroup.backgroundCaption;
        
        // Update front elements
        this.elements.frontImage.src = currentGroup.frontImage;
        this.elements.frontCaption.textContent = currentGroup.frontCaption;
    }

    handleWheel(event) {
        event.preventDefault();
        
        if (this.isTransitioning) return;

        const delta = Math.sign(event.deltaY);
        delta > 0 ? this.zoomOut() : this.zoomIn();
    }

    zoomIn() {
        // If at max zoom and not last group, transition to next
        if (this.zoomLevel >= 1 && this.currentIndex < this.groups.length - 1) {
            this.transitionToNext();
            return;
        }

        this.isZoomingIn = true;
        this.zoomLevel = Math.min(this.zoomLevel + this.config.zoomStep, 1);
        this.updateZoomState();
    }

    zoomOut() {
        // If at min zoom and not first group, transition to previous
        if (this.zoomLevel <= 0 && this.currentIndex > 0) {
            this.transitionToPrevious();
            return;
        }

        this.isZoomingIn = false;
        this.zoomLevel = Math.max(this.zoomLevel - this.config.zoomStep, 0);
        this.updateZoomState();
    }

    transitionToNext() {
        this.isTransitioning = true;
        
        // Fade out current elements
        this.elements.frontScene.style.opacity = '0';
        this.elements.backgroundWrapper.style.opacity = '0';
        
        setTimeout(() => {
            // Update to next group
            this.currentIndex++;
            this.zoomLevel = 0;
            this.loadCurrentGroup();
            
            // Slide in front scene from bottom without affecting normal positioning
            this.elements.frontScene.style.transform = 'translateY(100vh)';
            this.elements.frontScene.style.opacity = '1';
            
            // Animate slide in
            setTimeout(() => {
                this.elements.frontScene.style.transition = 'transform 0.6s ease-out';
                this.elements.frontScene.style.transform = 'translateY(0px)';
                
                setTimeout(() => {
                    // Clear all transform and transition styles to restore normal positioning
                    this.elements.frontScene.style.transition = '';
                    this.elements.frontScene.style.transform = '';
                    this.isTransitioning = false;
                    this.updateZoomState();
                    this.updateProgress();
                }, 600);
            }, 50);
        }, this.config.transitionDuration * 1000 / 2);
    }

    transitionToPrevious() {
        this.isTransitioning = true;
        
        // Fade out background
        this.elements.backgroundWrapper.style.opacity = '0';
        
        setTimeout(() => {
            // Update to previous group
            this.currentIndex--;
            this.zoomLevel = 1;
            this.loadCurrentGroup();
            
            // Show front scene immediately and ensure transform is cleared
            this.elements.frontScene.style.opacity = '1';
            this.elements.frontScene.style.transform = '';
            
            setTimeout(() => {
                this.isTransitioning = false;
                this.updateZoomState();
                this.updateProgress();
            }, this.config.transitionDuration * 1000 / 2);
        }, this.config.transitionDuration * 1000 / 2);
    }

    updateZoomState() {
        const { minFrontSize, maxFrontSize } = this.config;
        
        // Calculate front image size based on zoom level
        const currentWidth = minFrontSize.width + (maxFrontSize.width - minFrontSize.width) * this.zoomLevel;
        const currentHeight = minFrontSize.height + (maxFrontSize.height - minFrontSize.height) * this.zoomLevel;

        // Update front image size
        this.elements.frontImage.style.width = `${currentWidth}px`;
        this.elements.frontImage.style.height = `${currentHeight}px`;
        this.elements.frontImage.style.transition = 'all 0.1s ease-out';

        // Handle visibility and animations based on zoom level
        if (this.zoomLevel >= 0.95) {
            // Hide front scene and show background at max zoom
            this.elements.frontScene.style.opacity = '0';
            this.elements.backgroundWrapper.style.opacity = '1';
            this.elements.backgroundWrapper.style.display = 'flex';
            
            // Scale background image for zoom effect
            const bgScale = 1 + (this.zoomLevel - 0.95) * 3;
            this.elements.backgroundImage.style.transform = `scale(${bgScale})`;
            this.elements.backgroundImage.style.transition = 'transform 0.1s ease-out';
            
        } else {
            // Show front scene and hide background - ensure no transform interference
            this.elements.frontScene.style.opacity = '1';
            if (!this.isTransitioning) {
                // Only clear transform when not in transition to preserve center positioning
                this.elements.frontScene.style.transform = '';
            }
            this.elements.backgroundWrapper.style.opacity = '0';
            
            // Reset background scale
            this.elements.backgroundImage.style.transform = 'scale(1)';
            
            // Hide background when not needed
            if (this.zoomLevel < 0.1) {
                this.elements.backgroundWrapper.style.display = 'none';
            }
        }

        // Handle front caption visibility with smooth fade
        if (this.zoomLevel > 0.7) {
            this.elements.frontCaption.style.opacity = '0';
            this.elements.frontCaption.style.transform = 'translateY(20px)';
        } else {
            this.elements.frontCaption.style.opacity = '1';
            this.elements.frontCaption.style.transform = 'translateY(0)';
        }
        
        // Add transition to caption
        this.elements.frontCaption.style.transition = 'all 0.3s ease-out';

        // Handle background details animation
        const instanceShowcase = document.querySelector('.instanceShowcaseAbiity');
        if (instanceShowcase) {
            if (this.zoomLevel >= 0.98) {
                instanceShowcase.style.opacity = '1';
                instanceShowcase.style.transform = 'translateY(0) scale(1)';
            } else if (this.zoomLevel >= 0.95) {
                instanceShowcase.style.opacity = '0.5';
                instanceShowcase.style.transform = 'translateY(30px) scale(0.9)';
            } else {
                instanceShowcase.style.opacity = '0';
                instanceShowcase.style.transform = 'translateY(50px) scale(0.8)';
            }
            instanceShowcase.style.transition = 'all 0.3s ease-out';
        }
    }

    updateProgress() {
        this.elements.progressDots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Public method to manually set group (optional)
    setGroup(index) {
        if (index >= 0 && index < this.groups.length && !this.isTransitioning) {
            this.currentIndex = index;
            this.zoomLevel = 0;
            this.loadCurrentGroup();
            this.updateZoomState();
            this.updateProgress();
        }
    }

    // Cleanup method
    destroy() {
        if (this.elements.container) {
            this.elements.container.removeEventListener('wheel', this.handleWheel.bind(this));
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create global instance
    window.zoomController = new ZoomController({
        maxFrontSize: { width: 500, height: 700 },
        minFrontSize: { width: 100, height: 140 },
        transitionDuration: 0.5,
        zoomStep: 0.03
    });
});

// Optional: Add click handlers to progress dots for direct navigation
document.addEventListener('DOMContentLoaded', () => {
    const progressDots = document.querySelectorAll('.progress-dot');
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (window.zoomController) {
                window.zoomController.setGroup(index);
            }
        });
        dot.style.cursor = 'pointer';
    });
});