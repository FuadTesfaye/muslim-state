'use client';

import React from 'react';
import { TicketPass } from '@/lib/types';
import Link from 'next/link';

export function QRModal({
  ticket,
  onClose
}: {
  ticket: TicketPass | null;
  onClose: () => void;
}) {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="card max-w-sm w-full p-6 text-center relative shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        style={{ background: 'var(--card)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sm font-bold text-gray-400 hover:text-gray-600 dark:hover:text-white"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="mb-4">
          <span
            className="disp text-xs uppercase tracking-widest px-2.5 py-1 rounded-full font-bold"
            style={{
              background:
                ticket.tier === 'VIP'
                  ? 'var(--ochre)'
                  : ticket.tier === 'Academic'
                  ? 'var(--blue)'
                  : 'var(--soft)',
              color: ticket.tier === 'VIP' ? '#FFF' : 'var(--ink)'
            }}
          >
            {ticket.tier} Delegate Pass
          </span>
          <h3 className="disp text-2xl font-bold mt-2">{ticket.attendeeName}</h3>
          <p className="text-xs mt-1" style={{ color: 'var(--mute)' }}>
            {ticket.eventTitle}
          </p>
        </div>

        {/* Live SVG QR Code Graphic */}
        <div
          className="w-48 h-48 mx-auto p-3 rounded-xl border flex items-center justify-center"
          style={{ background: '#FFFFFF', borderColor: 'var(--line)' }}
        >
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full text-slate-900"
            fill="currentColor"
          >
            {/* Standard QR Framing Squares */}
            {/* Top-Left */}
            <rect x="10" y="10" width="30" height="30" fill="#0F1A2E" />
            <rect x="16" y="16" width="18" height="18" fill="#FFFFFF" />
            <rect x="20" y="20" width="10" height="10" fill="#0F1A2E" />

            {/* Top-Right */}
            <rect x="80" y="10" width="30" height="30" fill="#0F1A2E" />
            <rect x="86" y="16" width="18" height="18" fill="#FFFFFF" />
            <rect x="90" y="20" width="10" height="10" fill="#0F1A2E" />

            {/* Bottom-Left */}
            <rect x="10" y="80" width="30" height="30" fill="#0F1A2E" />
            <rect x="16" y="86" width="18" height="18" fill="#FFFFFF" />
            <rect x="20" y="90" width="10" height="10" fill="#0F1A2E" />

            {/* Matrix Data Bits Simulated */}
            <rect x="46" y="14" width="6" height="6" fill="#0F1A2E" />
            <rect x="58" y="14" width="6" height="6" fill="#0F1A2E" />
            <rect x="66" y="22" width="6" height="6" fill="#0F1A2E" />
            <rect x="46" y="32" width="6" height="6" fill="#0F1A2E" />
            <rect x="54" y="44" width="6" height="6" fill="#0F1A2E" />
            <rect x="66" y="44" width="6" height="6" fill="#0F1A2E" />
            <rect x="20" y="54" width="6" height="6" fill="#0F1A2E" />
            <rect x="36" y="54" width="6" height="6" fill="#0F1A2E" />
            <rect x="54" y="60" width="6" height="6" fill="#0F1A2E" />
            <rect x="74" y="60" width="6" height="6" fill="#0F1A2E" />
            <rect x="90" y="54" width="6" height="6" fill="#0F1A2E" />
            <rect x="46" y="74" width="6" height="6" fill="#0F1A2E" />
            <rect x="60" y="74" width="6" height="6" fill="#0F1A2E" />
            <rect x="74" y="84" width="6" height="6" fill="#0F1A2E" />
            <rect x="90" y="84" width="6" height="6" fill="#0F1A2E" />
            <rect x="54" y="96" width="6" height="6" fill="#0F1A2E" />
            <rect x="68" y="100" width="6" height="6" fill="#0F1A2E" />
            <rect x="84" y="100" width="6" height="6" fill="#0F1A2E" />
          </svg>
        </div>

        <div className="mt-4 p-2.5 rounded-lg border text-sm font-mono tracking-wider font-bold" style={{ background: 'var(--soft)', borderColor: 'var(--line)', color: 'var(--ink)' }}>
          {ticket.token}
        </div>

        <div className="mt-3 text-xs flex items-center justify-center gap-2" style={{ color: 'var(--mute)' }}>
          <span>Days: {ticket.selectedDays.map((d) => `Day ${d}`).join(', ')}</span>
          <span>•</span>
          <span className={ticket.checkedIn ? 'text-green-600 font-bold' : 'text-amber-600 font-bold'}>
            {ticket.checkedIn ? `✓ Checked In (${ticket.checkedInAt})` : '⚪ Not Checked In'}
          </span>
        </div>

        <div className="mt-5 flex gap-2">
          <Link
            href={`/staff/checkin?token=${ticket.token}`}
            onClick={onClose}
            className="btn2 flex-1 justify-center text-xs"
          >
            Test at Gate Terminal →
          </Link>
          <button onClick={onClose} className="btn text-xs justify-center">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
