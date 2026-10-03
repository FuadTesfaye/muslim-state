'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { RUBRIC_CRITERIA } from '@/lib/data';
import { SubmissionToGrade } from '@/lib/types';

export default function AdminGradingPage() {
  const { submissions, gradeSubmission } = useApp();

  const [selectedSub, setSelectedSub] = useState<SubmissionToGrade>(
    submissions[0] || null
  );

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>(() => {
    return (
      selectedSub?.rubricScores || {
        tajweed_accuracy: 28,
        makharij_sifat: 28,
        vocal_modulation: 18,
        waqf_ibtida: 18
      }
    );
  });
  const [feedback, setFeedback] = useState(selectedSub?.feedback || '');

  const handleSelectSub = (sub: SubmissionToGrade) => {
    setSelectedSub(sub);
    setScores(
      sub.rubricScores && Object.keys(sub.rubricScores).length > 0
        ? sub.rubricScores
        : {
            tajweed_accuracy: 26,
            makharij_sifat: 26,
            vocal_modulation: 16,
            waqf_ibtida: 16
          }
    );
    setFeedback(sub.feedback || '');
  };

  const handleScoreChange = (criteriaId: string, val: number) => {
    setScores((prev) => ({
      ...prev,
      [criteriaId]: val
    }));
  };

  const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);

  const handlePublishGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;
    gradeSubmission(selectedSub.id, scores, feedback);
  };

  return (
    <>
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Link href="/admin" className="text-xs font-semibold hover:underline" style={{ color: 'var(--ochre)' }}>
            ← Back to Secretariat Backoffice
          </Link>
          <h1 className="disp text-3xl sm:text-4xl md:text-5xl font-bold mt-1">
            Hybrid 100-Point Rubric Grading Portal
          </h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm max-w-3xl" style={{ color: 'var(--mute)' }}>
            Official judicial evaluation interface for Quran acoustic recitations,
            articulation inspections, scholarly essays, and contestant appeal rebuttals.
          </p>
        </div>
      </div>

      {/* Submissions Switcher Bar */}
      <div className="card p-3 mb-6 flex items-center gap-2 overflow-x-auto noscroll">
        <span className="text-xs font-semibold shrink-0" style={{ color: 'var(--mute)' }}>
          Queue Submissions:
        </span>
        {submissions.map((sub) => {
          const isSelected = selectedSub?.id === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => handleSelectSub(sub)}
              className="chip text-xs py-1 shrink-0"
              aria-pressed={isSelected}
            >
              {sub.participantName} ({sub.type.toUpperCase()}) —{' '}
              <span className={sub.status === 'graded' ? 'text-green-600 font-bold' : sub.status === 'appealed' ? 'text-amber-600 font-bold' : 'text-blue-600'}>
                {sub.status.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>

      {selectedSub && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Submission Inspection Panel (Audio Waveform or Essay) */}
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="disp font-bold uppercase tracking-wider" style={{ color: 'var(--ochre)' }}>
                  {selectedSub.competitionTitle}
                </span>
                <span className="font-mono text-xs font-bold">{selectedSub.id}</span>
              </div>
              <h2 className="disp text-2xl font-bold">{selectedSub.participantName}</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--mute)' }}>
                Item Title: <strong>{selectedSub.audioTitle || selectedSub.essayTitle}</strong>
              </p>

              {/* Audio Waveform Player */}
              {selectedSub.type === 'audio' && (
                <div className="mt-6 p-4 rounded-xl border space-y-4" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Studio Master Waveform Inspection
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="btn text-xs py-1 px-3"
                    >
                      {isPlayingAudio ? '⏸ Pause Waveform' : '▶ Play Studio Audio'}
                    </button>
                  </div>

                  <div className="h-24 p-2.5 sm:p-3 rounded-lg border bg-white dark:bg-slate-900 flex items-end justify-between gap-0.5 sm:gap-1 overflow-hidden" style={{ borderColor: 'var(--line)' }}>
                    {[
                      20, 45, 60, 80, 95, 70, 50, 85, 100, 75, 40, 65, 80, 90, 60, 35, 55,
                      80, 95, 75, 45, 60, 85, 90, 70, 40, 65, 85, 95, 60, 45, 70, 85, 100
                    ].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 min-w-[2px] max-w-[6px] rounded-full transition-all duration-200 ${
                          isPlayingAudio ? 'animate-pulse' : ''
                        }`}
                        style={{
                          height: `${h}%`,
                          background: i % 2 === 0 ? 'var(--blue)' : 'var(--ochre)'
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between text-xs font-mono" style={{ color: 'var(--mute)' }}>
                    <span>01:14 / {selectedSub.audioDuration || '04:12'}</span>
                    <span className="text-green-600 font-bold">24-Bit / 96kHz Lossless</span>
                  </div>
                </div>
              )}

              {/* Essay Content View */}
              {selectedSub.type === 'essay' && (
                <div className="mt-5 p-4 rounded-xl border font-serif text-sm leading-relaxed max-h-96 overflow-y-auto" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
                  {selectedSub.essayContent}
                </div>
              )}

              {/* Contestant Appeal Rebuttal Banner */}
              {selectedSub.appealRebuttal && (
                <div className="mt-6 p-4 rounded-xl border bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                  <div className="font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <span>⚠️</span> Official Contestant Appeal Lodged
                  </div>
                  <p className="italic font-medium">&ldquo;{selectedSub.appealRebuttal}&rdquo;</p>
                  <p className="text-[10px] opacity-75">
                    Judicial instructions: Re-inspect the waveform articulation points and adjust
                    the rubric criteria if justified.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 100-Point Rubric Grading Sliders */}
          <form onSubmit={handlePublishGrade} className="card p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
            <div className="flex justify-between items-end border-b pb-4" style={{ borderColor: 'var(--line)' }}>
              <div>
                <span className="disp text-xs uppercase font-bold tracking-widest" style={{ color: 'var(--ochre)' }}>
                  Judicial Scorecard
                </span>
                <h3 className="disp text-2xl font-bold mt-0.5">Rubric Criteria Tally</h3>
              </div>
              <div className="text-right">
                <span className="disp text-4xl font-bold" style={{ color: 'var(--ochre)' }}>
                  {totalPoints}
                </span>
                <span className="text-xs block" style={{ color: 'var(--mute)' }}>/ 100 Points</span>
              </div>
            </div>

            <div className="space-y-5">
              {RUBRIC_CRITERIA.map((crit) => {
                const currentVal = scores[crit.id] ?? Math.floor(crit.maxPoints * 0.85);
                return (
                  <div key={crit.id} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{crit.name}</span>
                      <strong className="text-sm font-mono" style={{ color: 'var(--ochre)' }}>
                        {currentVal} / {crit.maxPoints} Pts
                      </strong>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={crit.maxPoints}
                      step={1}
                      value={currentVal}
                      onChange={(e) => handleScoreChange(crit.id, parseInt(e.target.value))}
                      className="w-full accent-amber-700 cursor-pointer"
                    />
                    <p className="text-[11px]" style={{ color: 'var(--mute)' }}>
                      {crit.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <label className="text-xs font-semibold block mb-1">
                Official Judicial Feedback & Pronunciation Notes
              </label>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Detail specific observations regarding Makharij, Ghunnah timing, or doctrinal argumentation..."
                className="w-full px-3 py-2 text-xs rounded-lg border font-serif"
                style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
              />
            </div>

            <button type="submit" className="btn w-full justify-center">
              Publish Official Judicial Verdict ({totalPoints}/100) →
            </button>
          </form>
        </div>
      )}
    </>
  );
}
