'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export function ToastContainer() {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="card p-3 shadow-lg pointer-events-auto flex items-center gap-3 text-sm animate-in slide-in-from-bottom-2 fade-in duration-150"
          style={{
            background: 'var(--card)',
            borderColor:
              toast.type === 'success'
                ? '#10B981'
                : toast.type === 'warning'
                ? '#F59E0B'
                : toast.type === 'error'
                ? '#EF4444'
                : 'var(--blue)'
          }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{
              background:
                toast.type === 'success'
                  ? '#10B981'
                  : toast.type === 'warning'
                  ? '#F59E0B'
                  : toast.type === 'error'
                  ? '#EF4444'
                  : 'var(--blue)'
            }}
          />
          <span className="flex-1 font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
