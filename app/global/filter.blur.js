/*/ Check if backdrop-filter is supported
function isBackdropFilterSupported() {
    const el = document.createElement('div');
    el.style.backdropFilter = 'blur(2px)';
    return el.style.backdropFilter.length > 0;
  }
  
  // Apply fallback if needed
  function applyBlurFallback() {
    if (!isBackdropFilterSupported()) {
      const iconCols = document.querySelectorAll('.icon-col');
      
      iconCols.forEach(col => {
        // Create a blurred background div
        const bgDiv = document.createElement('div');
        bgDiv.className = 'blur-background';
        
        // Style the background div
        bgDiv.style.position = 'absolute';
        bgDiv.style.top = '0';
        bgDiv.style.left = '0';
        bgDiv.style.width = '100%';
        bgDiv.style.height = '100%';
        bgDiv.style.filter = 'blur(5px)';
        bgDiv.style.background = getComputedStyle(col).background;
        bgDiv.style.zIndex = '0';
        
        // Make sure the child spans stay above the blur
        const spans = col.querySelectorAll('span');
        spans.forEach(span => {
          span.style.position = 'relative';
          span.style.zIndex = '1';
        });
        
        // Insert the blurred div as the first child
        col.style.position = 'relative';
        col.style.background = 'transparent';
        col.insertBefore(bgDiv, col.firstChild);
      });
    }
  }
  
  // Run when the DOM is loaded
  document.addEventListener('DOMContentLoaded', applyBlurFallback);





  // Version col

  // Check if backdrop-filter is supported
function isBackdropFilterSupported() {
    const el = document.createElement('div');
    el.style.backdropFilter = 'blur(2px)';
    return el.style.backdropFilter.length > 0;
  }
  
  // Apply fallback if needed
  function applyBlurFallback() {
    if (!isBackdropFilterSupported()) {
      const iconCols = document.querySelectorAll('.version-col');
      
      iconCols.forEach(col => {
        // Create a blurred background div
        const bgDiv = document.createElement('div');
        bgDiv.className = 'blur-background';
        
        // Style the background div
        bgDiv.style.position = 'absolute';
        bgDiv.style.top = '0';
        bgDiv.style.left = '0';
        bgDiv.style.width = '100%';
        bgDiv.style.height = '100%';
        bgDiv.style.filter = 'blur(5px)';
        bgDiv.style.background = getComputedStyle(col).background;
        bgDiv.style.zIndex = '0';
        
        // Make sure the child spans stay above the blur
        const spans = col.querySelectorAll('span');
        spans.forEach(span => {
          span.style.position = 'relative';
          span.style.zIndex = '1';
        });
        
        // Insert the blurred div as the first child
        col.style.position = 'relative';
        col.style.background = 'transparent';
        col.insertBefore(bgDiv, col.firstChild);
      });
    }
  }
  
  // Run when the DOM is loaded
  document.addEventListener('DOMContentLoaded', applyBlurFallback);




  // Date col

  // Check if backdrop-filter is supported
function isBackdropFilterSupported() {
    const el = document.createElement('div');
    el.style.backdropFilter = 'blur(2px)';
    return el.style.backdropFilter.length > 0;
  }
  
  // Apply fallback if needed
  function applyBlurFallback() {
    if (!isBackdropFilterSupported()) {
      const iconCols = document.querySelectorAll('.date-col');
      
      iconCols.forEach(col => {
        // Create a blurred background div
        const bgDiv = document.createElement('div');
        bgDiv.className = 'blur-background';
        
        // Style the background div
        bgDiv.style.position = 'absolute';
        bgDiv.style.top = '0';
        bgDiv.style.left = '0';
        bgDiv.style.width = '100%';
        bgDiv.style.height = '100%';
        bgDiv.style.filter = 'blur(5px)';
        bgDiv.style.background = getComputedStyle(col).background;
        bgDiv.style.zIndex = '0';
        
        // Make sure the child spans stay above the blur
        const spans = col.querySelectorAll('span');
        spans.forEach(span => {
          span.style.position = 'relative';
          span.style.zIndex = '1';
        });
        
        // Insert the blurred div as the first child
        col.style.position = 'relative';
        col.style.background = 'transparent';
        col.insertBefore(bgDiv, col.firstChild);
      });
    }
  }
  
  // Run when the DOM is loaded
  document.addEventListener('DOMContentLoaded', applyBlurFallback);
  */

  // Check if backdrop-filter is supported
function isBackdropFilterSupported() {
  const el = document.createElement('div');
  el.style.backdropFilter = 'blur(2px)';
  return el.style.backdropFilter.length > 0;
}

// Generalized function to apply fallback to any given selector
function applyBlurFallback(selector) {
  if (!isBackdropFilterSupported()) {
    const cols = document.querySelectorAll(selector);

    cols.forEach(col => {
      // Create a blurred background div
      const bgDiv = document.createElement('div');
      bgDiv.className = 'blur-background';

      // Style the background div
      bgDiv.style.position = 'absolute';
      bgDiv.style.top = '0';
      bgDiv.style.left = '0';
      bgDiv.style.width = '100%';
      bgDiv.style.height = '100%';
      bgDiv.style.filter = 'blur(5px)';
      bgDiv.style.background = getComputedStyle(col).background;
      bgDiv.style.zIndex = '0';

      // Make sure the child spans stay above the blur
      const spans = col.querySelectorAll('span');
      spans.forEach(span => {
        span.style.position = 'relative';
        span.style.zIndex = '1';
      });

      // Insert the blurred div as the first child
      col.style.position = 'relative';
      col.style.background = 'transparent';
      col.insertBefore(bgDiv, col.firstChild);
    });
  }
}

// Run when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  applyBlurFallback('.icon-col');
  applyBlurFallback('.version-col');
  applyBlurFallback('.date-col');
});
