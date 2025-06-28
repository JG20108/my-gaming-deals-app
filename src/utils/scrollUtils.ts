/**
 * Utility functions for scroll management
 * Follows Single Responsibility Principle - handles only scroll-related operations
 */

/**
 * Scrolls the page to the top with smooth animation
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

/**
 * Scrolls a specific container to the top with smooth animation
 * @param selector - CSS selector for the container to scroll
 */
export const scrollContainerToTop = (selector: string) => {
  const container = document.querySelector(selector);
  if (container) {
    container.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Optional: Check scroll position after animation
    setTimeout(() => {
      // Position check for debugging if needed
    }, 500);
  }
};

/**
 * Scrolls the deals grid container to the top
 * This is the main function used by the DealsGrid component
 */
export const scrollDealsGridToTop = () => {
  scrollContainerToTop('.deals-grid');
};

/**
 * Scrolls the page to the top instantly (no animation)
 * Used for immediate scroll needs
 */
export const scrollToTopInstant = () => {
  window.scrollTo({
    top: 0,
    behavior: 'auto',
  });
};
