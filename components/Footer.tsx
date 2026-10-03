import React from 'react';

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--line)' }}>
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-7 text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left"
        style={{ color: 'var(--mute)' }}
      >
        <span className="disp text-base sm:text-lg" lang="ar" dir="rtl">
          وما توفيقي إلا بالله عليه توكلت وإليه أنيب
        </span>
        <span id="foot" className="text-center sm:text-right">
          IlmFlow State 🌙 — Enterprise Islamic Event & Competition Operating System.
        </span>
      </div>
    </footer>
  );
}
