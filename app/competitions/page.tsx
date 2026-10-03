'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { SEED_COMPETITIONS } from '@/lib/data';

export default function CompetitionsPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Quran & Tajweed',
    'Hadith Sciences',
    'Fiqh & Usul',
    'Research & Treatise'
  ];

  const filtered = SEED_COMPETITIONS.filter(
    (c) => selectedCategory === 'All' || c.category === selectedCategory
  );

  return (
    <>
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="disp text-3xl sm:text-4xl md:text-5xl font-bold">{t('competitions')}</h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm max-w-2xl" style={{ color: 'var(--mute)' }}>
            Authoritative international Islamic championships, proctored Hadith exams, and
            100-point rubric audio recitation tournaments.
          </p>
        </div>

        <Link href="/competitions/submit" className="btn text-xs justify-center py-2 sm:py-2.5">
          Submit Audio Recitation / Essay →
        </Link>
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto noscroll pb-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="chip text-[11px] sm:text-xs py-1 sm:py-1.5 whitespace-nowrap shrink-0"
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Competition Cards Grid */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {filtered.map((comp) => (
          <article key={comp.id} className="card p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full"
                  style={{ background: 'var(--soft)', color: 'var(--ochre)' }}
                >
                  {comp.category}
                </span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: comp.type === 'proctored_test' ? '#DCFCE7' : '#FEF3C7',
                    color: comp.type === 'proctored_test' ? '#166534' : '#92400E'
                  }}
                >
                  {comp.type === 'proctored_test'
                    ? `Timed Test (${comp.durationMinutes} mins)`
                    : comp.type === 'audio_recitation'
                    ? 'Audio Submission'
                    : 'Scholarly Essay'}
                </span>
              </div>

              <h2 className="disp text-2xl font-bold">{comp.title}</h2>
              <p className="disp text-sm mt-0.5" lang="ar" dir="rtl" style={{ color: 'var(--ochre)' }}>
                {comp.titleAr}
              </p>
              <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--mute)' }}>
                {comp.description}
              </p>

              {/* Tournament Specs */}
              <div
                className="mt-5 p-3 rounded-lg border text-xs grid grid-cols-2 gap-2"
                style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}
              >
                <div>
                  <span className="block text-slate-500">Prize Honor:</span>
                  <strong className="font-bold text-sm" style={{ color: 'var(--ochre)' }}>
                    {comp.prizePool}
                  </strong>
                </div>
                <div>
                  <span className="block text-slate-500">Enrolled Contestants:</span>
                  <strong className="font-bold text-sm" style={{ color: 'var(--ink)' }}>
                    {comp.enrolledCount} / {comp.maxParticipants} Seats
                  </strong>
                </div>
              </div>
            </div>

            <div
              className="mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-3"
              style={{ borderColor: 'var(--line)' }}
            >
              <span className="text-xs" style={{ color: 'var(--mute)' }}>
                Eligibility: <strong>{comp.level}</strong>
              </span>

              {comp.type === 'proctored_test' ? (
                <Link href="/test" className="btn text-xs">
                  Take Proctored Exam Now →
                </Link>
              ) : (
                <Link href="/competitions/submit" className="btn text-xs">
                  Upload Audition Audio / Essay →
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
