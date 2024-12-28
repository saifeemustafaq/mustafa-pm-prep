'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Progress from '@/components/ui/Progress';
import { CacheKeys, getFromCache, clearAllCache } from '@/lib/cache';
import { categoryConfig, CategoryId } from '@/lib/constants';
import { getQuestionCounts } from '@/lib/actions';

interface Category {
  name: string;
  href: string;
  id: CategoryId;
}

const categories: Category[] = [
  { name: 'Behavioral Questions', href: '/behavioral', id: 'behavioral' },
  { name: 'Product Design Questions', href: '/product-design', id: 'product-design' },
  { name: 'Strategy Questions', href: '/strategy', id: 'strategy' },
  { name: 'Execution Questions', href: '/execution', id: 'execution' },
  { name: 'Estimation Questions', href: '/estimation', id: 'estimation' },
];

const Sidebar: FC = () => {
  const pathname = usePathname();
  const [categoryProgress, setCategoryProgress] = useState<Record<CategoryId, number>>({} as Record<CategoryId, number>);
  const [questionCounts, setQuestionCounts] = useState<Record<CategoryId, number>>({} as Record<CategoryId, number>);
  const [isClearing, setIsClearing] = useState(false);

  const calculateProgress = (counts: Record<CategoryId, number>) => {
    return categories.reduce((acc, category) => {
      const categoryId = category.id;
      const saved = getFromCache(CacheKeys.progress(categoryId));
      const completed = saved ? JSON.parse(saved).length : 0;
      const total = counts[categoryId] || 0;
      acc[categoryId] = total ? Math.round((completed / total) * 100) : 0;
      return acc;
    }, {} as Record<CategoryId, number>);
  };

  useEffect(() => {
    const loadCounts = async () => {
      const counts = await getQuestionCounts();
      setQuestionCounts(counts);
      const progress = calculateProgress(counts);
      setCategoryProgress(progress);
    };
    loadCounts();
  }, []);

  useEffect(() => {
    const loadProgress = () => {
      const progress = calculateProgress(questionCounts);
      setCategoryProgress(progress);
    };

    window.addEventListener('storage', loadProgress);
    return () => window.removeEventListener('storage', loadProgress);
  }, [questionCounts]);

  const handleClearCache = async () => {
    setIsClearing(true);
    try {
      clearAllCache();
      const counts = await getQuestionCounts();
      setQuestionCounts(counts);
    } finally {
      setIsClearing(false);
    }
  };

  // Listen for progress updates
  useEffect(() => {
    const handleProgressUpdate = (event: CustomEvent<{ category: string; progress: number }>) => {
      const { category, progress } = event.detail;
      setCategoryProgress(prev => ({
        ...prev,
        [category]: progress
      }));
    };

    window.addEventListener('progressUpdate', handleProgressUpdate as EventListener);
    return () => {
      window.removeEventListener('progressUpdate', handleProgressUpdate as EventListener);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 w-64 h-full flex flex-col bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            PM Interview Prep
          </h1>
        </div>
        <button
          onClick={handleClearCache}
          disabled={isClearing}
          className={clsx(
            "w-full px-3 py-2 text-sm rounded-lg transition-all duration-200",
            "border border-red-200 text-red-600",
            "hover:bg-red-100 active:bg-red-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center justify-center gap-2"
          )}
        >
          {isClearing ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Clearing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Progress
            </>
          )}
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
        {categories.map((category, index) => {
          const config = categoryConfig[category.id];
          const count = questionCounts[category.id] || 0;
          const isActive = pathname === category.href;
          
          return (
            <div key={category.href}>
              {index > 0 && (
                <div className="my-4 border-t border-gray-200" />
              )}
              
              <div className="space-y-1">
                <Link
                  href={category.href}
                  className={clsx(
                    'block rounded-lg text-sm font-medium transition-all duration-200',
                    'group relative',
                    isActive
                      ? `bg-gradient-to-r from-${config.color}-500 to-${config.color}-600 text-gray-900`
                      : `hover:bg-gradient-to-r hover:from-${config.color}-500 hover:to-${config.color}-600 text-gray-800 hover:text-gray-900`
                  )}
                >
                  <div className="px-4 py-2.5">
                    <div className="flex justify-between items-center">
                      <span className="relative">
                        {category.name}
                        <span className={clsx(
                          'absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200',
                          'group-hover:w-full',
                          isActive
                            ? `bg-${config.color}-900`
                            : `bg-${config.color}-400`
                        )} />
                      </span>
                      <span className={clsx(
                        "text-xs font-normal",
                        isActive 
                          ? "text-gray-900"
                          : "text-gray-600 group-hover:text-gray-900"
                      )}>
                        {count} questions
                      </span>
                    </div>
                    
                    <div className={clsx(
                      'mt-2 transition-all duration-200',
                      'group-hover:translate-x-1'
                    )}>
                      <Progress
                        value={categoryProgress[category.id] || 0}
                        label="Progress"
                        size="sm"
                        color={isActive ? config.progressColor : config.progressColor}
                        className={clsx(
                          'opacity-90',
                          'group-hover:opacity-100'
                        )}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar; 