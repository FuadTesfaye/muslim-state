'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { useApp } from '@/context/AppContext';
import { TicketPass, SubmissionToGrade } from '@/lib/types';
import { QRModal } from '@/components/QRModal';

export default function DashboardPage() {
  const { t } = useLanguage();
  const { tickets, submissions, testResults, certificates, appealSubmission } = useApp();

  const [activeModalTicket, setActiveModalTicket] = useState<TicketPass | null>(null);
  const [appealSub, setAppealSub] = useState<SubmissionToGrade | null>(null);
  const [rebuttalText, setRebuttalText] = useState('');

  const handleLodgeAppeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appealSub || !rebuttalText.trim()) return;
    appealSubmission(appealSub.id, rebuttalText);
    setAppealSub(null);
    setRebuttalText('');
  };

  return (
    <>
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="disp text-3xl sm:text-4xl md:text-5xl font-bold">{t('dashboard')}</h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm max-w-3xl" style={{ color: 'var(--mute)' }}>
            Your delegate cockpit for active event passes, proctored tournament standings,
            rubric evaluations, and parchment diplomas.
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Link href="/events" className="btn text-xs flex-1 sm:flex-initial justify-center py-2 sm:py-2.5">
            + Register Pass
          </Link>
          <Link href="/test" className="btn2 text-xs flex-1 sm:flex-initial justify-center py-2 sm:py-2.5">
            Take Exam
          </Link>
        </div>
      </div>

      {/* Delegate Passes Grid */}
      <section className="mb-10">
        <h2 className="disp text-2xl font-bold mb-4">My Digital Delegate Passes</h2>
        {tickets.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tickets.map((tkt) => (
              <div key={tkt.id} className="card p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span
                      className="px-2 py-0.5 rounded font-bold uppercase tracking-wider"
                      style={{
                        background:
                          tkt.tier === 'VIP'
                            ? 'var(--ochre)'
                            : tkt.tier === 'Academic'
                            ? 'var(--blue)'
                            : 'var(--soft)',
                        color: tkt.tier === 'VIP' ? '#FFF' : 'var(--ink)'
                      }}
                    >
                      {tkt.tier} Pass
                    </span>
                    <span className="font-mono text-xs font-semibold" style={{ color: 'var(--mute)' }}>
                      {tkt.token}
                    </span>
                  </div>

                  <h3 className="font-bold text-base leading-snug">{tkt.eventTitle}</h3>
                  <p className="text-xs mt-1" style={{ color: 'var(--mute)' }}>
                    Attendee: <strong>{tkt.attendeeName}</strong>
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--mute)' }}>
                    Days: {tkt.selectedDays.map((d) => `Day ${d}`).join(', ')}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--line)' }}>
                  <span
                    className={`text-xs font-semibold ${
                      tkt.checkedIn ? 'text-green-600' : 'text-amber-600'
                    }`}
                  >
                    {tkt.checkedIn ? `✓ Checked In` : '⚪ Not Checked In'}
                  </span>
                  <button
                    onClick={() => setActiveModalTicket(tkt)}
                    className="btn2 text-xs"
                  >
                    View QR Badge →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-6 text-center text-sm" style={{ color: 'var(--mute)' }}>
            No registered event passes found. Browse the summit catalog to enroll.
          </div>
        )}
      </section>

      {/* Proctored Exam Scores */}
      <section className="mb-10">
        <h2 className="disp text-2xl font-bold mb-4">Proctored Examination Telemetry</h2>
        {testResults.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {testResults.map((res, idx) => (
              <div key={idx} className="card p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold uppercase tracking-wider" style={{ color: 'var(--ochre)' }}>
                      Hadith & Usul Tournament
                    </span>
                    <span className="text-xs font-mono">{res.submittedAt}</span>
                  </div>
                  <h3 className="font-semibold text-lg">{res.participantName}</h3>
                  <div className="mt-3 flex items-center gap-6">
                    <div>
                      <span className="disp text-3xl font-bold" style={{ color: 'var(--ochre)' }}>
                        {res.finalScore.toFixed(1)}
                      </span>
                      <span className="text-xs block" style={{ color: 'var(--mute)' }}>
                        Final Score / 100
                      </span>
                    </div>
                    <div className="text-xs space-y-1" style={{ color: 'var(--mute)' }}>
                      <p>Correct: <strong className="text-green-600">{res.correctCount}</strong></p>
                      <p>Wrong: <strong className="text-red-600">{res.wrongCount}</strong></p>
                      <p>Skipped: <strong>{res.skippedCount}</strong></p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t flex justify-between items-center text-xs" style={{ borderColor: 'var(--line)' }}>
                  <span className="text-green-600 font-semibold">✓ Verified by Proctoring Engine</span>
                  <Link href="/test" className="btn2 text-xs">
                    Retake / Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-6 text-center text-sm" style={{ color: 'var(--mute)' }}>
            No completed proctored tests yet. Jump into the examination engine to test your knowledge!
          </div>
        )}
      </section>

      {/* Recitation Submissions & Rubrics */}
      <section className="mb-10">
        <h2 className="disp text-2xl font-bold mb-4">Audition Submissions & Appeals</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {submissions.map((sub) => (
            <div key={sub.id} className="card p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span
                    className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider"
                    style={{
                      background:
                        sub.status === 'graded'
                          ? '#DCFCE7'
                          : sub.status === 'appealed'
                          ? '#FEF3C7'
                          : 'var(--soft)',
                      color:
                        sub.status === 'graded'
                          ? '#166534'
                          : sub.status === 'appealed'
                          ? '#92400E'
                          : 'var(--ink)'
                    }}
                  >
                    {sub.status === 'graded'
                      ? `Graded: ${sub.totalScore}/100`
                      : sub.status === 'appealed'
                      ? 'Appeal Under Review'
                      : 'Pending Evaluation'}
                  </span>
                  <span className="text-xs font-mono" style={{ color: 'var(--mute)' }}>
                    {sub.id}
                  </span>
                </div>

                <h3 className="font-semibold text-base">{sub.competitionTitle}</h3>
                <p className="text-xs mt-1" style={{ color: 'var(--mute)' }}>
                  Contestant: <strong>{sub.participantName}</strong> • {sub.audioTitle || sub.essayTitle}
                </p>

                {sub.feedback && (
                  <div className="mt-3 p-3 rounded-lg border text-xs italic" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
                    &ldquo;{sub.feedback}&rdquo; — <strong>{sub.judgeName}</strong>
                  </div>
                )}

                {sub.appealRebuttal && (
                  <div className="mt-3 p-3 rounded-lg border text-xs bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                    <strong>Contestant Rebuttal:</strong> {sub.appealRebuttal}
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t flex justify-end" style={{ borderColor: 'var(--line)' }}>
                {sub.status === 'graded' && !sub.appealRebuttal && (
                  <button
                    onClick={() => setAppealSub(sub)}
                    className="btn2 text-xs"
                  >
                    File Official Appeal Rebuttal
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accredited Diplomas Section */}
      <section className="mb-10">
        <h2 className="disp text-2xl font-bold mb-4">My Accredited Diplomas</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="card p-5 flex flex-col justify-between border" style={{ borderColor: 'var(--ochre)' }}>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--ochre)' }}>
                  {cert.id}
                </span>
                <h3 className="disp text-xl font-bold">{cert.holderName}</h3>
                <p className="text-xs font-semibold mt-1" style={{ color: 'var(--ochre)' }}>
                  {cert.rankOrHonor}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--mute)' }}>
                  {cert.competitionOrEventTitle}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t flex justify-between items-center text-xs" style={{ borderColor: 'var(--line)' }}>
                <span className="text-green-600 font-semibold">✓ SHA-256 Verified</span>
                <Link href="/certificates" className="btn2 text-xs">
                  View Diploma →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Appeal Rebuttal Modal */}
      {appealSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="card max-w-lg w-full p-5 sm:p-6 relative shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto" style={{ background: 'var(--card)' }}>
            <button
              onClick={() => setAppealSub(null)}
              className="absolute top-4 right-4 text-sm font-bold text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              ✕
            </button>
            <span className="disp text-xs uppercase font-bold tracking-widest" style={{ color: 'var(--ochre)' }}>
              Contestant Appeal Council
            </span>
            <h3 className="disp text-xl sm:text-2xl font-bold mt-1">Lodge Official Rebuttal</h3>
            <p className="text-xs mt-1" style={{ color: 'var(--mute)' }}>
              Submission: {appealSub.competitionTitle} ({appealSub.id})
            </p>

            <form onSubmit={handleLodgeAppeal} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1">
                  Rebuttal Justification & Audio Waveform Clarification
                </label>
                <textarea
                  rows={4}
                  required
                  value={rebuttalText}
                  onChange={(e) => setRebuttalText(e.target.value)}
                  placeholder="Detail the technical or theological basis for your appeal (e.g. mic recording delay, Riwayah difference, classical source citation)..."
                  className="w-full px-3 py-2 text-xs rounded-lg border font-serif"
                  style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button type="button" onClick={() => setAppealSub(null)} className="btn2 flex-1 justify-center text-xs py-2">
                  Cancel
                </button>
                <button type="submit" className="btn flex-1 justify-center text-xs py-2">
                  Lodge Official Appeal →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Digital QR Modal */}
      {activeModalTicket && (
        <QRModal ticket={activeModalTicket} onClose={() => setActiveModalTicket(null)} />
      )}
    </>
  );
}
