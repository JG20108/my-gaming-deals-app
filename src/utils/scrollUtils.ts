/**
 * Scrolls smoothly to the top of the page
 * Follows Single Responsibility Principle by handling only scroll behavior
 */
export const scrollToTop = (): void => {
  console.log('📜 [ScrollUtils] scrollToTop function called');
  console.log('📜 [ScrollUtils] Current scroll position:', window.scrollY);

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

  console.log('📜 [ScrollUtils] window.scrollTo called with smooth behavior');

  // Check scroll position after a short delay
  setTimeout(() => {
    console.log(
      '📜 [ScrollUtils] Scroll position after 500ms:',
      window.scrollY
    );
  }, 500);
};

/**
 * Scrolls a specific container element to the top
 * Perfect for scrollable grid containers with overflow-y: auto
 */
export const scrollContainerToTop = (containerSelector: string): void => {
  console.log(
    '📜 [ScrollUtils] scrollContainerToTop function called for:',
    containerSelector
  );

  const container = document.querySelector(containerSelector) as HTMLElement;

  if (!container) {
    console.error('📜 [ScrollUtils] Container not found:', containerSelector);
    return;
  }

  console.log(
    '📜 [ScrollUtils] Container found, current scrollTop:',
    container.scrollTop
  );

  container.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

  console.log(
    '📜 [ScrollUtils] container.scrollTo called with smooth behavior'
  );

  // Check scroll position after a short delay
  setTimeout(() => {
    console.log(
      '📜 [ScrollUtils] Container scrollTop after 500ms:',
      container.scrollTop
    );
  }, 500);
};

/**
 * Scrolls the deals grid container to the top
 * Specifically targets the .deals-grid element
 */
export const scrollDealsGridToTop = (): void => {
  console.log('📜 [ScrollUtils] scrollDealsGridToTop function called');
  scrollContainerToTop('.deals-grid');
};

/**
 * Scrolls to the top of the page instantly (no animation)
 * Useful for cases where immediate positioning is needed
 */
export const scrollToTopInstant = (): void => {
  console.log('📜 [ScrollUtils] scrollToTopInstant function called');
  console.log('📜 [ScrollUtils] Current scroll position:', window.scrollY);

  window.scrollTo(0, 0);

  console.log('📜 [ScrollUtils] window.scrollTo called instantly');
  console.log('📜 [ScrollUtils] New scroll position:', window.scrollY);
};
