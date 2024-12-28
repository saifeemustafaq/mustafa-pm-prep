// Create a new file for custom events
export const createProgressUpdateEvent = (category: string, progress: number) => {
  const event = new CustomEvent('progressUpdate', {
    detail: { category, progress }
  });
  window.dispatchEvent(event);
}; 