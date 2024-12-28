'use client';

import { FC, useEffect, useState } from 'react';
import { CacheKeys, getFromCache } from '@/lib/cache';

const CacheControl: FC = () => {
  const [lastUpdated, setLastUpdated] = useState<string>('Never');

  useEffect(() => {
    const timestamp = getFromCache(CacheKeys.timestamp());
    if (timestamp) {
      setLastUpdated(new Date(timestamp).toLocaleString());
    }
  }, []);

  return (
    <div className="text-sm text-gray-500">
      Last updated: {lastUpdated}
    </div>
  );
};

export default CacheControl; 