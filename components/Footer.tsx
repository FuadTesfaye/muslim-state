import React from 'react';

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--line)' }}>
      <div
        className="max-w-6xl mx-auto px-5 py-7 text-sm flex flex-wrap justify-between items-center gap-3"
        style={{ color: 'var(--mute)' }}
      >
        <span className="disp text-lg" lang="ar" dir="rtl">
          وما توفيقي إلا بالله عليه توكلت وإليه أنيب
        </span>
        <span id="foot">
          IlmFlow State 🌙 — Enterprise Islamic Event & Competition Operating System.
        </span>
      </div>
    </footer>
  );
}
