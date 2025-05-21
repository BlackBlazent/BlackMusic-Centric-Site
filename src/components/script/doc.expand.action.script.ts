// TypeScript implementation for expandable container toggle with SPA support - Fixed version

/**
 * Function to toggle the visibility of an expanded container
 * @param actionButton The button that triggers the toggle
 * @param container The container to show/hide
 * @param iconImg Optional icon element to rotate
 */
function toggleContainer(
  actionButton: HTMLElement,
  container: HTMLElement,
  iconImg?: HTMLImageElement
): void {
  // Check if the container is currently visible
  const isVisible = window.getComputedStyle(container).display !== 'none';
  
  // Set the display style based on current state
  container.style.display = isVisible ? 'none' : 'block';
  
  // Toggle active class on the button
  actionButton.classList.toggle('active', !isVisible);
  
  // Rotate the icon if it exists
  if (iconImg) {
    iconImg.style.transition = 'transform 0.3s ease';
    iconImg.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
  }
}

// Flag to prevent repeated initializations
let isInitializing = false;

/**
 * Function to attach event listeners to a single expand action button
 * @param actionButton The action button element
 * @param container The container element to expand/collapse
 */
function attachExpandListener(
  actionButton: HTMLElement,
  container: HTMLElement
): void {
  // Skip if already initialized
  if (actionButton.hasAttribute('data-expand-initialized')) {
    return;
  }
  
  // Mark as initialized
  actionButton.setAttribute('data-expand-initialized', 'true');
  
  // Find the icon inside the button
  const iconImg = actionButton.querySelector('.expand-action-icon-img') as HTMLImageElement;
  
  // Initially hide the container (unless it has a data attribute to stay open)
  if (!container.hasAttribute('data-stay-open')) {
    container.style.display = 'none';
  }
  
  // Make button appear clickable
  actionButton.style.cursor = 'pointer';
  
  // Add click event listener
  actionButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent event bubbling
    toggleContainer(actionButton, container, iconImg);
  });
}

/**
 * Function to find the corresponding container for an action button
 * @param button The action button element
 * @param index The index of the button in its collection
 * @returns The container element or null if not found
 */
function findContainer(button: Element, index: number): HTMLElement | null {
  // Strategy 1: Look for data-target attribute on the button
  const targetId = button.getAttribute('data-target');
  if (targetId) {
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) return targetContainer as HTMLElement;
  }
  
  // Strategy 2: Try to find the container that's a sibling or nearby element
  let container = button.closest('.section-container')?.querySelector('.expanded-container-doc') as HTMLElement;
  if (container) return container;
  
  // Strategy 3: If not found, try to find by index
  const containers = document.querySelectorAll('.expanded-container-doc');
  if (index < containers.length) {
    return containers[index] as HTMLElement;
  }
  
  // Strategy 4: Look for a container with a matching data-id
  const buttonId = button.getAttribute('data-section-id');
  if (buttonId) {
    container = document.querySelector(`.expanded-container-doc[data-section-id="${buttonId}"]`) as HTMLElement;
    if (container) return container;
  }
  
  // No container found
  return null;
}

/**
 * Function to initialize all expandable sections in the document
 * without causing infinite recursion
 */
function initAllExpandableSections(): void {
  // Prevent recursive initialization
  if (isInitializing) return;
  isInitializing = true;
  
  try {
    // Select all action buttons in the document
    const allActionButtons = document.querySelectorAll('.expand-action-wrapper');
    
    // Iterate through each button and set up its companion container
    allActionButtons.forEach((button, index) => {
      // Skip if already initialized
      if ((button as HTMLElement).hasAttribute('data-expand-initialized')) {
        return;
      }
      
      // Find the container for this button
      const container = findContainer(button, index);
      
      if (button && container) {
        attachExpandListener(button as HTMLElement, container);
      }
    });
  } catch (error) {
    console.error('Error initializing expandable sections:', error);
  } finally {
    // Reset flag
    isInitializing = false;
  }
}

// Create a debounced function to prevent too many calls
function debounce(func: Function, wait: number): (...args: any[]) => void {
  let timeout: number | null = null;
  
  return function(...args: any[]): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(later, wait);
  };
}

// Debounced version of initAllExpandableSections
const debouncedInit = debounce(initAllExpandableSections, 250);


// Handle specific page navigation events
const handleRouteChange = (): void => {
  // Use setTimeout to ensure DOM is updated after route change
  setTimeout(() => {
    debouncedInit();
  }, 100);
};

/**
 * Main initialization function with support for page navigation
 */
function initExpandableSections(): void {
  // Initialize all expandable sections
  initAllExpandableSections();
  
  // Set up mutation observer to handle dynamically added content
  
  // Listen for route changes in single-page applications
  
  // For applications using the History API
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(this, arguments as any);
    handleRouteChange();
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(this, arguments as any);
    handleRouteChange();
  };
  
  // For applications using hash-based routing
  window.addEventListener('hashchange', handleRouteChange);
  
  // For applications using the popstate event
  window.addEventListener('popstate', handleRouteChange);
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initExpandableSections);

// Create a function that can be called after page content changes
window.reinitExpandableSections = function(): void {
  debouncedInit();
};

// Type declaration for the window object extension
declare global {
  interface Window {
    reinitExpandableSections: () => void;
  }
}

// Export function for dynamically added elements

