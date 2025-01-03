'use client';

import { Suspense } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

function AnalyticsComponent() {
  useAnalytics();
  return null;
}

export function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsComponent />
      </Suspense>
      {children}
    </>
  );
} 