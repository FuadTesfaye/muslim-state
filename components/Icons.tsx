import React from 'react';

export function Icon({
  name,
  size = 18,
  className
}: {
  name: 'play' | 'book' | 'mic' | 'vid';
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {name === 'play' && <path d="M8 5v14l11-7z" />}
      {name === 'book' && <path d="M5 3h12a2 2 0 012 2v16H7a2 2 0 01-2-2zm2 14v2h10V5H7z" />}
      {name === 'mic' && (
        <path d="M12 3a4 4 0 00-4 4v5a4 4 0 008 0V7a4 4 0 00-4-4zM5 12a7 7 0 0014 0h-2a5 5 0 01-10 0z" />
      )}
      {name === 'vid' && (
        <path d="M4 6h11a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1zm13 4l4-2v8l-4-2z" />
      )}
    </svg>
  );
}

export function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ? `chev shrink-0 ${className}` : 'chev shrink-0'}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
