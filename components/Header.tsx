'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { Language } from '@/lib/data';

const NAV_ITEMS = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'events', label: 'Events & Summits', href: '/events' },
  { key: 'competitions', label: 'Competitions', href: '/competitions' },
  { key: 'test', label: 'Proctored Exam', href: '/test' },
  { key: 'leaderboard', label: 'Leaderboard', href: '/leaderboard' },
  { key: 'certificates', label: 'Diplomas', href: '/certificates' },
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { key: 'staff', label: 'Arrival Gate', href: '/staff/checkin' },
  { key: 'admin', label: 'Secretariat Admin', href: '/admin' }
] as const;

const LANG_OPTIONS: [Language, string][] = [
  ['en', 'EN'],
  ['ar', 'ع'],
  ['am', 'አማ']
];

export function Header() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  return (
    <header
      className="sticky top-0 z-30 border-b"
      style={{
        background: 'var(--card)',
        borderColor: 'var(--line)',
        paddingTop: 'env(safe-area-inset-top, 0px)'
      }}
    >
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="disp text-xl font-bold flex items-center gap-2" id="brand">
          <span style={{ color: 'var(--ochre)' }}>🌙</span>
          <span>IlmFlow State</span>
        </Link>
        <div
          className="flex items-center gap-1"
          role="group"
          aria-label="Language"
          id="langs"
        >
          {LANG_OPTIONS.map(([c, label]) => (
            <button
              key={c}
              className="chip"
              data-l={c}
              aria-pressed={c === lang}
              onClick={() => setLang(c)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <nav
        id="nav"
        className="max-w-6xl mx-auto px-5 flex gap-6 overflow-x-auto noscroll"
        aria-label="Main"
      >
        {NAV_ITEMS.map((item) => {
          const isCurrent =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.key}
              className="navlink"
              href={item.href}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {t(item.key as Parameters<typeof t>[0]) || item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
