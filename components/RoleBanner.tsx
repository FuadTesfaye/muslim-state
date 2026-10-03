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
      className="border-b text-xs py-2 px-5"
      style={{
        background: 'var(--soft)',
        borderColor: 'var(--line)'
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block shrink-0 animate-pulse"
            style={{ background: currentRole.badgeColor }}
          />
          <span className="font-semibold" style={{ color: 'var(--ink)' }}>
            Active Persona:
          </span>
          <span
            className="px-2 py-0.5 rounded font-medium border"
            style={{
              background: 'var(--card)',
              borderColor: 'var(--line)',
              color: 'var(--ink)'
            }}
          >
            {currentRole.name} ({currentRole.nameAr})
          </span>
          <span className="hidden sm:inline" style={{ color: 'var(--mute)' }}>
            — {currentRole.description}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto noscroll">
          <span className="shrink-0 font-medium" style={{ color: 'var(--mute)' }}>
            Switch Role:
          </span>
          {(Object.keys(ROLES) as Role[]).map((r) => {
            const isCurrent = r === role;
            return (
              <button
                key={r}
                onClick={() => setRole(r)}
                aria-pressed={isCurrent}
                className="chip text-[11px] py-0.5 px-2"
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
  );
}
