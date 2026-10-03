'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { useApp } from '@/context/AppContext';
import { SEED_EVENTS, SEED_COMPETITIONS } from '@/lib/data';

export default function HomePage() {
  const { t } = useLanguage();
  const { tickets, certificates } = useApp();

  const checkedInCount = tickets.filter((t) => t.checkedIn).length;

  return (
    <>
      {/* Hero Banner with Geometric Tile Motif */}
      <section
        className="tiles rounded-2xl px-5 py-10 sm:px-8 sm:py-14 md:px-12 md:py-20 shadow-sm"
        style={{ background: 'var(--card)', border: '1px solid var(--line)' }}
      >
        <p
          className="disp text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3"
          lang="ar"
          dir="rtl"
          style={{ color: 'var(--ochre)' }}
        >
          منظومة إدارة المؤتمرات والمسابقات الإسلامية العالمية 🌙
        </p>
        <h1 className="disp text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] max-w-3xl">
          {t('h')}
        </h1>
        <p className="mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg leading-relaxed" style={{ color: 'var(--mute)' }}>
          {t('s')}
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link className="btn justify-center text-sm sm:text-base py-3 sm:py-2.5" href="/events">
            {t('registerNow')} →
          </Link>
          <Link className="btn2 justify-center text-sm sm:text-base py-3 sm:py-2.5" href="/competitions">
            {t('viewCompetitions')}
          </Link>
          <Link className="btn2 justify-center text-sm sm:text-base py-3 sm:py-2.5" href="/test">
            Take Proctored Exam
          </Link>
        </div>
      </section>

      {/* Live Telemetry KPI Metrics */}
      <section className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="card p-4 sm:p-5">
          <p className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold truncate" style={{ color: 'var(--mute)' }}>
            {t('totalAttendees')}
          </p>
          <p className="disp text-2xl sm:text-3xl font-bold mt-1" style={{ color: 'var(--blue)' }}>
            1,331
          </p>
          <p className="text-[11px] sm:text-xs mt-1 text-green-600 font-medium truncate">84% of Venue Quotas</p>
        </div>

        <div className="card p-4 sm:p-5">
          <p className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold truncate" style={{ color: 'var(--mute)' }}>
            {t('competitionsActive')}
          </p>
          <p className="disp text-2xl sm:text-3xl font-bold mt-1" style={{ color: 'var(--ochre)' }}>
            4 Active
          </p>
          <p className="text-[11px] sm:text-xs mt-1 truncate" style={{ color: 'var(--mute)' }}>
            $37,500 Prize Escrow
          </p>
        </div>

        <div className="card p-4 sm:p-5">
          <p className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold truncate" style={{ color: 'var(--mute)' }}>
            {t('diplomasAwarded')}
          </p>
          <p className="disp text-2xl sm:text-3xl font-bold mt-1" style={{ color: 'var(--ink)' }}>
            {certificates.length + 184}
          </p>
          <p className="text-[11px] sm:text-xs mt-1 text-green-600 font-medium truncate">SHA-256 Verified</p>
        </div>

        <div className="card p-4 sm:p-5">
          <p className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold truncate" style={{ color: 'var(--mute)' }}>
            Gate Admissions
          </p>
          <p className="disp text-2xl sm:text-3xl font-bold mt-1" style={{ color: 'var(--blue)' }}>
            {checkedInCount} / {tickets.length}
          </p>
          <p className="text-[11px] sm:text-xs mt-1 truncate" style={{ color: 'var(--mute)' }}>
            Live Synthesizer Telemetry
          </p>
        </div>
      </section>

      {/* Flagship Summits Section */}
      <section className="mt-10 sm:mt-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="disp text-2xl sm:text-3xl font-bold">{t('upcomingSummits')}</h2>
            <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--mute)' }}>
              Accredited international scholarly gatherings with tiered passes and multi-day discounts
            </p>
          </div>
          <Link href="/events" className="btn2 self-start sm:self-auto shrink-0 text-xs">
            {t('more')}
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {SEED_EVENTS.map((event) => {
            const percentage = Math.round((event.registeredCount / event.totalCapacity) * 100);
            return (
              <article key={event.id} className="card p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-semibold uppercase tracking-wider gap-1.5 mb-2">
                    <span style={{ color: 'var(--ochre)' }}>{event.dateRange}</span>
                    <span
                      className="px-2 py-0.5 rounded font-mono self-start sm:self-auto text-[11px]"
                      style={{ background: 'var(--soft)', color: 'var(--ink)' }}
                    >
                      {event.location}
                    </span>
                  </div>
                  <h3 className="disp text-xl sm:text-2xl font-bold">{event.title}</h3>
                  <p className="disp text-sm mt-1" lang="ar" dir="rtl" style={{ color: 'var(--ochre)' }}>
                    {event.titleAr}
                  </p>
                  <p className="text-xs sm:text-sm mt-3 leading-relaxed" style={{ color: 'var(--mute)' }}>
                    {event.description}
                  </p>

                  {/* Quota Progress */}
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--line)' }}>
                    <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--mute)' }}>
                      <span>Capacity: {event.registeredCount} / {event.totalCapacity} Seats</span>
                      <span className="font-semibold">{percentage}% Full</span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--soft)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${percentage}%`,
                          background: percentage > 90 ? 'var(--ochre)' : 'var(--blue)'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderColor: 'var(--line)' }}>
                  <div className="text-xs" style={{ color: 'var(--mute)' }}>
                    Passes from <strong className="text-sm font-bold" style={{ color: 'var(--ink)' }}>${event.tierPrices.youth}</strong> to <strong className="text-sm font-bold" style={{ color: 'var(--ink)' }}>${event.tierPrices.vip}</strong>
                  </div>
                  <Link href={`/events?id=${event.id}`} className="btn text-xs justify-center w-full sm:w-auto">
                    View Schedule & Register Pass →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Featured Competitions Section */}
      <section className="mt-10 sm:mt-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="disp text-2xl sm:text-3xl font-bold">{t('featuredCompetitions')}</h2>
            <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--mute)' }}>
              Proctored tournaments, recitation auditions, and accredited parchment diplomas
            </p>
          </div>
          <Link href="/competitions" className="btn2 self-start sm:self-auto shrink-0 text-xs">
            {t('more')}
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SEED_COMPETITIONS.map((comp) => (
            <article key={comp.id} className="card p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div
                  className="tiles h-24 sm:h-28 rounded-lg mb-3 sm:mb-4 grid place-items-center p-3 text-center"
                  style={{ background: 'var(--blue)', color: 'var(--on)' }}
                >
                  <span className="disp text-base sm:text-lg font-bold leading-tight">
                    {comp.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <span
                    className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--soft)', color: 'var(--ink)' }}
                  >
                    {comp.level}
                  </span>
                  <span
                    className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: comp.type === 'proctored_test' ? '#DCFCE7' : '#FEF3C7',
                      color: comp.type === 'proctored_test' ? '#166534' : '#92400E'
                    }}
                  >
                    {comp.type === 'proctored_test' ? 'Timed Test' : 'Audio / Essay'}
                  </span>
                </div>

                <h3 className="font-semibold text-sm sm:text-base leading-snug">{comp.title}</h3>
                <p className="text-xs mt-2 line-clamp-3 leading-relaxed" style={{ color: 'var(--mute)' }}>
                  {comp.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t flex flex-col gap-2" style={{ borderColor: 'var(--line)' }}>
                <p className="text-xs font-semibold" style={{ color: 'var(--ochre)' }}>
                  Prize: {comp.prizePool}
                </p>
                {comp.type === 'proctored_test' ? (
                  <Link href="/test" className="btn2 justify-center text-xs w-full">
                    Enter Proctored Exam →
                  </Link>
                ) : (
                  <Link href="/competitions/submit" className="btn2 justify-center text-xs w-full">
                    Submit Entry →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Quick Access Diplomas & Gate Verification */}
      <section
        className="mt-10 sm:mt-14 card p-5 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{ background: 'var(--soft)' }}
      >
        <div className="max-w-xl">
          <span className="disp text-xs uppercase font-bold tracking-widest" style={{ color: 'var(--ochre)' }}>
            Cryptographic Verification Portal
          </span>
          <h3 className="disp text-2xl sm:text-3xl font-bold mt-1">
            Authenticate Parchment Diplomas & Credentials
          </h3>
          <p className="text-xs sm:text-sm mt-2 leading-relaxed" style={{ color: 'var(--mute)' }}>
            Every tournament finalist, grand jurist attendee, and Qira’ah laureate receives an
            accredited parchment diploma sealed with a tamper-evident SHA-256 verification hash.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
          <Link href="/certificates" className="btn justify-center text-center text-xs sm:text-sm">
            Verify Certificate ID →
          </Link>
          <Link href="/dashboard" className="btn2 justify-center text-center text-xs sm:text-sm">
            My Delegate Cockpit
          </Link>
        </div>
      </section>
    </>
  );
}
