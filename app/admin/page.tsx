'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ROLES } from '@/lib/rbac';
import { Role } from '@/lib/types';

export default function AdminPage() {
  const { role, setRole, auditLogs, submissions } = useApp();

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="disp text-xs uppercase font-bold tracking-widest" style={{ color: 'var(--ochre)' }}>
            Supreme Secretariat General
          </span>
          <h1 className="disp text-4xl md:text-5xl font-bold mt-1">
            Central Secretariat Administration
          </h1>
          <p className="mt-2 max-w-2xl" style={{ color: 'var(--mute)' }}>
            Governing summits, multi-day registration quotas, proctored examinations,
            100-point rubric adjudications, and immutable audit telemetry.
          </p>
        </div>

        <div className="flex gap-2">
          <Link href="/admin/grading" className="btn text-xs">
            100-Pt Grading Portal →
          </Link>
          <Link href="/admin/forms/builder" className="btn2 text-xs">
            Visual Form Builder →
          </Link>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Link href="/admin/grading" className="card p-5 block hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs uppercase font-bold tracking-wider" style={{ color: 'var(--ochre)' }}>
              Judicial Adjudication
            </span>
            <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: 'var(--soft)' }}>
              {submissions.filter((s) => s.status === 'pending').length} Pending
            </span>
          </div>
          <h3 className="disp text-xl font-bold">100-Point Rubric Grading</h3>
          <p className="text-xs mt-1" style={{ color: 'var(--mute)' }}>
            Evaluate Quran audio waveforms, articulation, and review contestant appeals.
          </p>
        </Link>

        <Link href="/admin/forms/builder" className="card p-5 block hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs uppercase font-bold tracking-wider" style={{ color: 'var(--blue)' }}>
              Dynamic Form Engine
            </span>
            <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: 'var(--soft)' }}>
              v1 Live
            </span>
          </div>
          <h3 className="disp text-xl font-bold">Zero-Code Visual Form Builder</h3>
          <p className="text-xs mt-1" style={{ color: 'var(--mute)' }}>
            Configure 12 field types with conditional logic, digital signatures, and JSON exports.
          </p>
        </Link>

        <Link href="/staff/checkin" className="card p-5 block hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-green-600">
              Arrival Gate
            </span>
            <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: 'var(--soft)' }}>
              Live Synthesizer
            </span>
          </div>
          <h3 className="disp text-xl font-bold">Staff Check-in Terminal</h3>
          <p className="text-xs mt-1" style={{ color: 'var(--mute)' }}>
            Real-time barcode scanner with green harmonic chime and amber double-entry chord.
          </p>
        </Link>
      </div>

      {/* Role-Based Access Control Matrix */}
      <section className="card p-6 mb-8">
        <h2 className="disp text-2xl font-bold mb-1">
          Granular Role-Based Access Control (RBAC)
        </h2>
        <p className="text-xs mb-4" style={{ color: 'var(--mute)' }}>
          8 dedicated platform personas with 22 granular capability permissions. Switch personas to
          preview experience.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(Object.keys(ROLES) as Role[]).map((r) => {
            const cfg = ROLES[r];
            const isCurrent = r === role;
            return (
              <div
                key={r}
                onClick={() => setRole(r)}
                className="p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.01]"
                style={{
                  background: isCurrent ? 'var(--soft)' : 'var(--card)',
                  borderColor: isCurrent ? 'var(--ink)' : 'var(--line)',
                  borderWidth: isCurrent ? '2px' : '1px'
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">{cfg.name}</span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--ochre)' }}>
                    {cfg.nameAr}
                  </span>
                </div>
                <p className="text-xs line-clamp-2" style={{ color: 'var(--mute)' }}>
                  {cfg.description}
                </p>
                <div className="mt-3 text-[11px] font-semibold flex items-center justify-between">
                  <span style={{ color: cfg.badgeColor }}>
                    ● {cfg.permissions.length} Permissions
                  </span>
                  <span className="underline">
                    {isCurrent ? 'Active Persona' : 'Switch →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Immutable Audit Logs Trail */}
      <section className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="disp text-2xl font-bold">Immutable Secretariat Audit Trail</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--mute)' }}>
              Real-time audit log recording ticket issuances, score adjustments, and gate throughput
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded border" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
            {auditLogs.length} Events Logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead
              className="uppercase tracking-wider border-b font-mono"
              style={{ background: 'var(--soft)', borderColor: 'var(--line)', color: 'var(--mute)' }}
            >
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Persona / Actor</th>
                <th className="py-2.5 px-3">Event Action</th>
                <th className="py-2.5 px-3">Cryptographic Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y font-mono" style={{ borderColor: 'var(--line)' }}>
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-black/5 dark:hover:bg-white/5">
                  <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap font-semibold">
                    {log.actorName} ({log.actorRole})
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded font-bold" style={{ background: 'var(--soft)', color: 'var(--ink)' }}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
