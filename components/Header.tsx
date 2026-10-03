'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { Language } from '@/lib/data';

const NAV_ITEMS = [
  { key: 'home', label: 'Home', href: '/', icon: '🏛️' },
  { key: 'events', label: 'Events & Summits', href: '/events', icon: '📅' },
  { key: 'competitions', label: 'Competitions', href: '/competitions', icon: '🏆' },
  { key: 'test', label: 'Proctored Exam', href: '/test', icon: '⏱️' },
  { key: 'leaderboard', label: 'Leaderboard', href: '/leaderboard', icon: '🎖️' },
  { key: 'certificates', label: 'Diplomas', href: '/certificates', icon: '📜' },
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: '👤' },
  { key: 'staff', label: 'Arrival Gate', href: '/staff/checkin', icon: '🚪' },
  { key: 'admin', label: 'Secretariat Admin', href: '/admin', icon: '⚙️' }
] as const;

const LANG_OPTIONS: [Language, string][] = [
  ['en', 'EN'],
  ['ar', 'ع'],
  ['am', 'አማ']
];

export function Header() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile menu on route change
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur-md"
      style={{
        background: 'var(--card)',
        borderColor: 'var(--line)',
        paddingTop: 'env(safe-area-inset-top, 0px)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-5 h-14 flex items-center justify-between gap-3">
        {/* Brand */}
        <Link
          href="/"
          className="disp text-lg sm:text-xl font-bold flex items-center gap-1.5 sm:gap-2 shrink-0 truncate"
          id="brand"
        >
          <span style={{ color: 'var(--ochre)' }}>🌙</span>
          <span className="truncate">IlmFlow State</span>
        </Link>

        {/* Right side controls: Language Switcher + Mobile Menu Button */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className="flex items-center gap-1"
            role="group"
            aria-label="Language"
            id="langs"
          >
            {LANG_OPTIONS.map(([c, label]) => (
              <button
                key={c}
                className="chip text-[11px] sm:text-xs px-2 py-1 min-w-[32px] sm:min-w-[36px] text-center"
                data-l={c}
                aria-pressed={c === lang}
                onClick={() => setLang(c)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border text-sm flex items-center justify-center min-w-[38px] min-h-[38px]"
            style={{
              background: mobileMenuOpen ? 'var(--ink)' : 'var(--soft)',
              color: mobileMenuOpen ? 'var(--bg)' : 'var(--ink)',
              borderColor: 'var(--line)'
            }}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Horizontal Nav for Tablet & Desktop, plus Touch-Scroll on Mobile */}
      <nav
        id="nav"
        className="max-w-6xl mx-auto px-4 sm:px-5 flex gap-4 sm:gap-6 overflow-x-auto noscroll py-1 border-t md:border-t-0"
        style={{ borderColor: 'var(--line)' }}
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
              className="navlink text-xs sm:text-sm py-1.5 whitespace-nowrap transition-colors"
              href={item.href}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {t(item.key as Parameters<typeof t>[0]) || item.label}
            </Link>
          );
        })}
      </nav>

      {/* Full-Screen Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-[calc(3.5rem+env(safe-area-inset-top,0px))] bottom-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-full max-h-[85vh] overflow-y-auto p-5 border-b shadow-2xl space-y-2 animate-in slide-in-from-top-3 duration-200"
            style={{
              background: 'var(--card)',
              borderColor: 'var(--line)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b text-xs font-semibold" style={{ borderColor: 'var(--line)', color: 'var(--mute)' }}>
              <span>SELECT PLATFORM MODULE</span>
              <span>9 MODULES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {NAV_ITEMS.map((item) => {
                const isCurrent =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl border flex items-center justify-between text-sm font-semibold transition-all active:scale-[0.98]"
                    style={{
                      background: isCurrent ? 'var(--soft)' : 'var(--card)',
                      borderColor: isCurrent ? 'var(--ochre)' : 'var(--line)',
                      borderWidth: isCurrent ? '2px' : '1px',
                      color: isCurrent ? 'var(--ink)' : 'var(--mute)'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span>{t(item.key as Parameters<typeof t>[0]) || item.label}</span>
                    </div>
                    {isCurrent && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--ochre)', color: '#FFF' }}
                      >
                        Active
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
