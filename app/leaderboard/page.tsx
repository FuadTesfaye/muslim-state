'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

interface LeaderboardEntry {
  rank: number;
  name: string;
  country: string;
  category: string;
  score: number;
  badge: string;
  timeTaken: string;
}

const SEED_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Bilal Al-Habashi',
    country: 'Ethiopia / Medina',
    category: 'Quran Recitation',
    score: 94.0,
    badge: 'Master of Ten Qira’at',
    timeTaken: '03:50'
  },
  {
    rank: 2,
    name: 'Abdullah Ibn Mas’ud',
    country: 'Makkah',
    category: 'Hadith Sciences',
    score: 92.5,
    badge: 'Flawless Sanad & Matn',
    timeTaken: '05:14'
  },
  {
    rank: 3,
    name: 'Fatima Az-Zahra',
    country: 'Egypt',
    category: 'Research & Treatise',
    score: 91.0,
    badge: 'First Class Academic Jurisprudence',
    timeTaken: 'N/A'
  },
  {
    rank: 4,
    name: 'Zayd Ibn Harithah',
    country: 'Jordan',
    category: 'Hadith Sciences',
    score: 87.5,
    badge: 'Zero Telemetry Violations',
    timeTaken: '06:40'
  },
  {
    rank: 5,
    name: 'Ahmad Al-Mansoor',
    country: 'Morocco',
    category: 'Fiqh & Usul',
    score: 85.0,
    badge: 'Rapid Usul Solver',
    timeTaken: '07:12'
  },
  {
    rank: 6,
    name: 'Sumayyah Bint Habib',
    country: 'United Kingdom',
    category: 'Quran Recitation',
    score: 83.0,
    badge: 'Exquisite Makharij Articulation',
    timeTaken: '04:10'
  }
];

export default function LeaderboardPage() {
  const { t } = useLanguage();
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');

  const categories = [
    'All',
    'Quran Recitation',
    'Hadith Sciences',
    'Fiqh & Usul',
    'Research & Treatise'
  ];

  const filtered = SEED_LEADERBOARD.filter((entry) => {
    const matchCat = selectedCat === 'All' || entry.category === selectedCat;
    const matchSearch =
      !search ||
      entry.name.toLowerCase().includes(search.toLowerCase()) ||
      entry.country.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="disp text-3xl sm:text-4xl md:text-5xl font-bold">{t('leaderboard')}</h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm max-w-3xl" style={{ color: 'var(--mute)' }}>
            Official global tournament standings, verified scores, and tie-breaking honor badges
            certified by the Secretariat Board.
          </p>
        </div>

        <Link href="/test" className="btn text-xs justify-center py-2 sm:py-2.5">
          Take Exam to Enter Standings →
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-3 sm:p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto noscroll pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className="chip text-[11px] sm:text-xs py-1 whitespace-nowrap shrink-0"
              aria-pressed={selectedCat === c}
            >
              {c}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search contestant or country..."
          className="w-full sm:w-64 px-3 py-1.5 text-xs rounded-lg border"
          style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
        />
      </div>

      {/* Leaderboard Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[580px] text-left text-sm">
            <thead
              className="text-xs uppercase tracking-wider border-b"
              style={{ background: 'var(--soft)', borderColor: 'var(--line)', color: 'var(--mute)' }}
            >
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Contestant</th>
                <th className="py-3 px-4">Tournament</th>
                <th className="py-3 px-4">Official Score</th>
                <th className="py-3 px-4">Tie-Breaking Badge</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--line)' }}>
              {filtered.map((item) => (
                <tr
                  key={item.rank}
                  className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4 font-bold">
                    <span
                      className="w-7 h-7 rounded-full inline-grid place-items-center text-xs"
                      style={{
                        background:
                          item.rank === 1
                            ? 'var(--ochre)'
                            : item.rank === 2
                            ? '#94A3B8'
                            : item.rank === 3
                            ? '#B45309'
                            : 'var(--soft)',
                        color: item.rank <= 3 ? '#FFFFFF' : 'var(--ink)'
                      }}
                    >
                      {item.rank}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold">
                    <div>{item.name}</div>
                    <div className="text-xs font-normal" style={{ color: 'var(--mute)' }}>
                      {item.country}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs font-medium">
                    {item.category}
                  </td>
                  <td className="py-4 px-4">
                    <span className="disp text-lg font-bold" style={{ color: 'var(--ochre)' }}>
                      {item.score.toFixed(1)}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--mute)' }}> / 100</span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium inline-block border"
                      style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
                    >
                      ★ {item.badge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
