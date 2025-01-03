'use client';

import { useAnalytics } from '@/hooks/useAnalytics';
import { ReactNode } from 'react';

interface AnalyticsWrapperProps {
  children: ReactNode;
}

export function AnalyticsWrapper({ children }: AnalyticsWrapperProps) {
  useAnalytics();
  return <>{children}</>;
} 