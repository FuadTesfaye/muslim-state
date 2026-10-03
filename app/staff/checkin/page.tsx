'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { playSuccessChime, playWarningChime } from '@/lib/audio';

function StaffCheckinContent() {
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get('token') || '';

  const { tickets, checkInTicket, auditLogs } = useApp();

  const [inputToken, setInputToken] = useState(tokenParam);
  const [scanResult, setScanResult] = useState<{
    status: 'idle' | 'valid' | 'duplicate' | 'invalid';
    message: string;
    details?: string;
  }>({
    status: 'idle',
    message: 'Awaiting barcode or digital lanyard token scan...'
  });

  const totalRegistered = tickets.length;
  const checkedInCount = tickets.filter((t) => t.checkedIn).length;
  const checkinRate = totalRegistered > 0 ? Math.round((checkedInCount / totalRegistered) * 100) : 0;

  const handleProcessScan = React.useCallback(
    (tokenToTest: string) => {
      if (!tokenToTest.trim()) return;

      const res = checkInTicket(tokenToTest);

      if (res.status === 'valid') {
        setScanResult({
          status: 'valid',
          message: 'ADMITTED: PASS VALID & CLEARED',
          details: `${res.ticket?.attendeeName} (${res.ticket?.tier} Pass, ${res.ticket?.eventTitle})`
        });
      } else if (res.status === 'duplicate') {
        setScanResult({
          status: 'duplicate',
          message: 'DUPLICATE BADGE DETECTED: ALREADY CHECKED IN',
          details: `${res.ticket?.attendeeName} was already checked in at ${res.ticket?.checkedInAt}`
        });
      } else {
        setScanResult({
          status: 'invalid',
          message: 'INVALID BARCODE: TOKEN NOT FOUND',
          details: `Barcode token "${tokenToTest}" does not exist in secretariat database.`
        });
      }
      setInputToken('');
    },
    [checkInTicket]
  );

  useEffect(() => {
    if (tokenParam) {
      const timer = setTimeout(() => {
        handleProcessScan(tokenParam);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [tokenParam, handleProcessScan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleProcessScan(inputToken);
  };

  return (
    <>
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="disp text-xs uppercase font-bold tracking-widest" style={{ color: 'var(--ochre)' }}>
            Secretariat Logistics & Security
          </span>
          <h1 className="disp text-3xl sm:text-4xl md:text-5xl font-bold mt-1">
            Staff Arrival Gate Terminal
          </h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm max-w-2xl" style={{ color: 'var(--mute)' }}>
            Instantaneous barcode & digital lanyard verification terminal equipped with
            synthesizer dual audio chimes and real-time gate velocity telemetry.
          </p>
        </div>

        {/* Audio Synthesizer Manual Test Controls */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => playSuccessChime()}
            className="btn2 text-xs flex items-center justify-center gap-1.5 flex-1 sm:flex-initial py-2"
            title="Preview green harmonic chime"
          >
            <span>🔊</span> Test Valid Chime
          </button>
          <button
            type="button"
            onClick={() => playWarningChime()}
            className="btn2 text-xs flex items-center justify-center gap-1.5 flex-1 sm:flex-initial py-2"
            title="Preview low amber chord"
          >
            <span>⚠️</span> Test Warning Chord
          </button>
        </div>
      </div>

      {/* Real-Time Gate Velocity Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="card p-3 sm:p-4">
          <span className="text-[11px] sm:text-xs uppercase font-semibold block" style={{ color: 'var(--mute)' }}>
            Total Registered
          </span>
          <span className="disp text-xl sm:text-2xl font-bold mt-1 block" style={{ color: 'var(--ink)' }}>
            {totalRegistered}
          </span>
        </div>
        <div className="card p-3 sm:p-4">
          <span className="text-[11px] sm:text-xs uppercase font-semibold block" style={{ color: 'var(--mute)' }}>
            Admitted Through Gate
          </span>
          <span className="disp text-xl sm:text-2xl font-bold mt-1 block text-green-600">
            {checkedInCount}
          </span>
        </div>
        <div className="card p-3 sm:p-4">
          <span className="text-[11px] sm:text-xs uppercase font-semibold block" style={{ color: 'var(--mute)' }}>
            Remaining in Queue
          </span>
          <span className="disp text-xl sm:text-2xl font-bold mt-1 block" style={{ color: 'var(--ochre)' }}>
            {totalRegistered - checkedInCount}
          </span>
        </div>
        <div className="card p-3 sm:p-4">
          <span className="text-[11px] sm:text-xs uppercase font-semibold block" style={{ color: 'var(--mute)' }}>
            Throughput Velocity
          </span>
          <span className="disp text-xl sm:text-2xl font-bold mt-1 block" style={{ color: 'var(--blue)' }}>
            {checkinRate}% Cleared
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        {/* Scanner Terminal Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="card p-5 sm:p-6 md:p-8">
            <h3 className="disp text-xl sm:text-2xl font-bold mb-1">Gate Scanner Input</h3>
            <p className="text-xs mb-4 sm:mb-5" style={{ color: 'var(--mute)' }}>
              Scan delegate lanyard QR code with terminal handheld scanner or enter token manually.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                autoFocus
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                placeholder="Scan or enter token (e.g. ILM-PASS-901)..."
                className="flex-1 px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border font-mono uppercase tracking-wider font-semibold"
                style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
              />
              <button type="submit" className="btn px-6 text-sm justify-center py-2.5 sm:py-3">
                Process Scan →
              </button>
            </form>

            {/* Quick Test Token Buttons */}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--line)' }}>
              <span className="text-xs font-semibold block mb-2" style={{ color: 'var(--mute)' }}>
                Test Sample Barcode Badges:
              </span>
              <div className="flex flex-wrap gap-2">
                {tickets.map((tkt) => (
                  <button
                    key={tkt.id}
                    onClick={() => handleProcessScan(tkt.token)}
                    className="chip text-[11px] sm:text-xs py-1"
                  >
                    {tkt.token} ({tkt.attendeeName} — {tkt.checkedIn ? 'Already In' : 'Ready'})
                  </button>
                ))}
                <button
                  onClick={() => handleProcessScan('INVALID-TOKEN-999')}
                  className="chip text-[11px] sm:text-xs py-1 text-red-600 border-red-300"
                >
                  INVALID-TOKEN-999 (Test Invalid)
                </button>
              </div>
            </div>
          </div>

          {/* Visual Scan Result Terminal Banner */}
          <div
            className={`card p-5 sm:p-6 md:p-8 border-2 transition-all duration-200 text-center ${
              scanResult.status === 'valid'
                ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-900 dark:text-emerald-100'
                : scanResult.status === 'duplicate'
                ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-500 text-amber-900 dark:text-amber-100'
                : scanResult.status === 'invalid'
                ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-500 text-rose-900 dark:text-rose-100'
                : 'border-dashed'
            }`}
          >
            <div className="text-2xl sm:text-3xl mb-2">
              {scanResult.status === 'valid'
                ? '🟢'
                : scanResult.status === 'duplicate'
                ? '🟡'
                : scanResult.status === 'invalid'
                ? '🔴'
                : '⚪'}
            </div>
            <h4 className="disp text-xl sm:text-2xl font-bold">{scanResult.message}</h4>
            {scanResult.details && (
              <p className="mt-2 text-sm font-medium">{scanResult.details}</p>
            )}
            <p className="text-[11px] mt-4 opacity-75">
              Audio feedback: Harmonic green chord on admission, low amber chord on duplication or rejection.
            </p>
          </div>
        </div>

        {/* Live Gate Checkin Feed */}
        <div>
          <div className="card p-5">
            <h3 className="font-bold text-sm mb-3">Recent Gate Admissions</h3>
            <div className="space-y-3">
              {auditLogs
                .filter((l) => l.action.startsWith('GATE_') || l.action === 'CHECKIN_VERIFIED')
                .slice(0, 7)
                .map((log) => (
                  <div key={log.id} className="p-3 rounded-lg border text-xs" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
                    <div className="flex justify-between font-mono text-[10px]" style={{ color: 'var(--mute)' }}>
                      <span>{log.timestamp}</span>
                      <span className="font-bold">{log.action}</span>
                    </div>
                    <p className="mt-1 font-medium">{log.details}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function StaffCheckinPage() {
  return (
    <Suspense fallback={<div className="card p-8 text-center text-sm">Loading Arrival Gate Terminal...</div>}>
      <StaffCheckinContent />
    </Suspense>
  );
}
