'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { CategoryId } from '@/lib/constants';
import { CacheKeys, getFromCache, setInCache } from '@/lib/cache';

interface ProgressContextType {
  progress: Record<CategoryId, Set<string>>;
  updateProgress: (category: CategoryId, questionId: string, completed: boolean) => void;
  getProgress: (category: CategoryId) => Set<string>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Record<CategoryId, Set<string>>>({});

  // Load all progress on mount
  useEffect(() => {
    const loadAllProgress = () => {
      const categories = ['behavioral', 'product-design', 'strategy', 'execution', 'estimation'] as CategoryId[];
      const loadedProgress: Record<CategoryId, Set<string>> = {};

      categories.forEach(category => {
        const saved = getFromCache(CacheKeys.progress(category));
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            loadedProgress[category] = new Set(parsed);
          } catch (e) {
            console.error(`Error loading progress for ${category}:`, e);
            loadedProgress[category] = new Set();
          }
        } else {
          loadedProgress[category] = new Set();
        }
      });

      setProgress(loadedProgress);
    };

    loadAllProgress();

    // Listen for storage events from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.startsWith(`${CacheKeys.progress('')}`)) {
        loadAllProgress();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateProgress = (category: CategoryId, questionId: string, completed: boolean) => {
    setProgress(prev => {
      const categoryProgress = new Set(prev[category] || []);
      if (completed) {
        categoryProgress.add(questionId);
      } else {
        categoryProgress.delete(questionId);
      }

      // Save to localStorage
      setInCache(
        CacheKeys.progress(category),
        JSON.stringify(Array.from(categoryProgress))
      );

      return {
        ...prev,
        [category]: categoryProgress
      };
    });
  };

  const getProgress = (category: CategoryId) => {
    return progress[category] || new Set();
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress, getProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
} 