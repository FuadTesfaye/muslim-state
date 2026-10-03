'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ROLES } from '@/lib/rbac';
import { Role } from '@/lib/types';

export function RoleBanner() {
  const { role, setRole } = useApp();
  const currentRole = ROLES[role];

  return (
    <div
      className="border-b text-xs py-2 px-4 sm:px-5 transition-colors"
      style={{
        background: 'var(--soft)',
        borderColor: 'var(--line)'
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
        {/* Left: Active Persona Display */}
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block shrink-0 animate-pulse"
            style={{ background: currentRole.badgeColor }}
          />
          <span className="font-semibold shrink-0" style={{ color: 'var(--ink)' }}>
            Persona:
          </span>
          <span
            className="px-2 py-0.5 rounded font-medium border text-xs truncate max-w-[200px] sm:max-w-none"
            style={{
              background: 'var(--card)',
              borderColor: 'var(--line)',
              color: 'var(--ink)'
            }}
          >
            {currentRole.name} ({currentRole.nameAr})
          </span>
          <span className="hidden lg:inline truncate text-[11px]" style={{ color: 'var(--mute)' }}>
            — {currentRole.description}
          </span>
        </div>

        {/* Right: Switch Role (Native Select on Mobile, Horizontal Scroll Chips on Desktop) */}
        <div className="flex items-center gap-2 self-start sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
          <span className="shrink-0 font-medium text-[11px] sm:text-xs" style={{ color: 'var(--mute)' }}>
            Switch:
          </span>

          {/* Mobile compact select (sm:hidden) */}
          <div className="sm:hidden flex-1 max-w-[220px]">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full px-2 py-1 text-xs rounded border font-medium"
              style={{
                background: 'var(--card)',
                borderColor: 'var(--line)',
                color: 'var(--ink)'
              }}
            >
              {(Object.keys(ROLES) as Role[]).map((r) => (
                <option key={r} value={r}>
                  {ROLES[r].name} ({ROLES[r].nameAr})
                </option>
              ))}
            </select>
          </div>

          {/* Desktop & Tablet scrollable chip row (hidden sm:flex) */}
          <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto noscroll">
            {(Object.keys(ROLES) as Role[]).map((r) => {
              const isCurrent = r === role;
              return (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  aria-pressed={isCurrent}
                  className="chip text-[11px] py-0.5 px-2 whitespace-nowrap"
                  style={{
                    fontWeight: isCurrent ? 700 : 500,
                    borderColor: isCurrent ? 'var(--ink)' : 'var(--line)'
                  }}
                >
                  {ROLES[r].name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
