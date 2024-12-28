export const CACHE_PREFIX = 'pm-interview-prep';
export const CACHE_VERSION = 'v1';

export const CacheKeys = {
  progress: (category: string) => `${CACHE_PREFIX}:${CACHE_VERSION}:progress:${category}`,
  timestamp: () => `${CACHE_PREFIX}:${CACHE_VERSION}:timestamp`,
};

export const isBrowser = typeof window !== 'undefined';

export const getFromCache = (key: string): string | null => {
  if (!isBrowser) return null;
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.error('Error reading from cache:', e);
    return null;
  }
};

export const setInCache = (key: string, value: string): void => {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, value);
    updateCacheTimestamp();
  } catch (e) {
    console.error('Error writing to cache:', e);
  }
};

export const updateCacheTimestamp = (): void => {
  if (!isBrowser) return;
  try {
    localStorage.setItem(CacheKeys.timestamp(), new Date().toISOString());
  } catch (e) {
    console.error('Error updating cache timestamp:', e);
  }
};

export const clearAllCache = (): void => {
  if (!isBrowser) return;
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    window.location.reload(); // Force reload to reset all states
  } catch (e) {
    console.error('Error clearing cache:', e);
  }
}; 