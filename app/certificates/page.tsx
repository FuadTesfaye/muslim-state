'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useApp } from '@/context/AppContext';
import { CertificateItem } from '@/lib/types';

export default function CertificatesPage() {
  const { t } = useLanguage();
  const { certificates } = useApp();

  const [query, setQuery] = useState('ILM-2026-QRN-789');
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(
    certificates[0] || null
  );

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toUpperCase();
    const found = certificates.find(
      (c) =>
        c.id.toUpperCase() === clean ||
        c.verificationHash.toLowerCase().includes(query.trim().toLowerCase())
    );

    if (found) {
      setActiveCert(found);
    } else {
      alert(`Certificate with ID or Hash "${query}" could not be verified in the public registry.`);
    }
  };

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h1 className="disp text-3xl sm:text-4xl md:text-5xl font-bold">{t('certificates')}</h1>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm max-w-3xl" style={{ color: 'var(--mute)' }}>
          Public cryptographic verification portal for accredited parchment diplomas,
          tournament honors, and Sanad credentials.
        </p>
      </div>

      {/* Verification Search Bar */}
      <form onSubmit={handleVerify} className="card p-3 sm:p-5 mb-6 sm:mb-8 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Certificate ID (e.g. ILM-2026-QRN-789) or SHA-256 Hash..."
          className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border font-mono"
          style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
        />
        <button type="submit" className="btn justify-center text-xs sm:text-sm py-2 sm:py-2.5">
          Verify Credential Authenticity →
        </button>
      </form>

      {/* Sample Badges to Click */}
      <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-1.5 sm:gap-2">
        <span className="text-xs font-semibold" style={{ color: 'var(--mute)' }}>
          Verify Sample Diplomas:
        </span>
        {certificates.map((cert) => (
          <button
            key={cert.id}
            onClick={() => {
              setQuery(cert.id);
              setActiveCert(cert);
            }}
            className="chip text-[11px] sm:text-xs py-1"
            aria-pressed={activeCert?.id === cert.id}
          >
            {cert.id} ({cert.holderName})
          </button>
        ))}
      </div>

      {/* Parchment Diploma Visualizer */}
      {activeCert && (
        <div
          className="card p-4 sm:p-8 md:p-12 border-2 sm:border-4 rounded-2xl relative shadow-xl overflow-hidden max-w-5xl mx-auto"
          style={{
            background: 'var(--card)',
            borderColor: 'var(--ochre)'
          }}
        >
          {/* Inner Golden Border */}
          <div
            className="border sm:border-2 rounded-xl p-4 sm:p-6 md:p-10 text-center relative"
            style={{ borderColor: 'rgba(154, 106, 28, 0.35)' }}
          >
            {/* Illuminated Header Calligraphy */}
            <div className="mb-3 sm:mb-4">
              <span className="disp text-xl sm:text-2xl md:text-3xl block" lang="ar" dir="rtl" style={{ color: 'var(--ochre)' }}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-semibold mt-2 block" style={{ color: 'var(--mute)' }}>
                IlmFlow Secretariat Academic Council • Official Parchment Diploma
              </span>
            </div>

            <p className="disp text-xs sm:text-sm md:text-base italic max-w-xl mx-auto mt-4 sm:mt-6" style={{ color: 'var(--mute)' }}>
              This formal diploma is hereby conferred with highest scholarly accreditation upon
            </p>

            {/* Recipient Name */}
            <h2 className="disp text-2xl sm:text-3xl md:text-5xl font-bold mt-3 sm:mt-4" style={{ color: 'var(--ink)' }}>
              {activeCert.holderName}
            </h2>

            <div className="w-16 sm:w-24 h-0.5 mx-auto my-3 sm:my-4" style={{ background: 'var(--ochre)' }} />

            {/* Recognition Honor */}
            <h3 className="disp text-lg sm:text-xl md:text-2xl font-semibold max-w-2xl mx-auto" style={{ color: 'var(--ochre)' }}>
              {activeCert.rankOrHonor}
            </h3>

            <p className="text-xs sm:text-sm mt-2 sm:mt-3 font-medium" style={{ color: 'var(--mute)' }}>
              In Recognition of Exemplary Mastery in the{' '}
              <strong style={{ color: 'var(--ink)' }}>{activeCert.competitionOrEventTitle}</strong>
            </p>

            {/* Signatures & Tamper Seal */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t grid grid-cols-1 sm:grid-cols-3 items-center gap-5 sm:gap-6 text-xs" style={{ borderColor: 'var(--line)' }}>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-xs sm:text-sm">{activeCert.authorizedSignatory}</p>
                <p style={{ color: 'var(--mute)' }}>Academic Examining Board</p>
              </div>

              {/* Cryptographic Seal Badge */}
              <div className="flex flex-col items-center">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 grid place-items-center mb-1"
                  style={{ borderColor: 'var(--ochre)', color: 'var(--ochre)' }}
                >
                  <span className="disp font-bold text-[11px] sm:text-xs uppercase text-center leading-none">
                    SEAL<br />VERIFIED
                  </span>
                </div>
                <span className="text-[10px] font-mono text-green-700 dark:text-green-400 font-bold">
                  ✓ Cryptographically Sealed
                </span>
              </div>

              <div className="text-center sm:text-right">
                <p className="font-semibold text-xs sm:text-sm">{activeCert.issueDate}</p>
                <p style={{ color: 'var(--mute)' }}>Official Date of Conferral</p>
              </div>
            </div>

            {/* Hash Footprint */}
            <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t text-[10px] sm:text-[11px] font-mono text-center sm:text-left break-all sm:truncate" style={{ borderColor: 'var(--line)', color: 'var(--mute)' }}>
              <span>Verification Hash: </span>
              <span className="select-all" style={{ color: 'var(--ink)' }}>
                {activeCert.verificationHash}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
