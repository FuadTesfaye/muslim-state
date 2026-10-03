'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function HashRouteHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash) {
        router.replace(`/${hash}`);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [router]);

  return null;
}
