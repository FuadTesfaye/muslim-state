'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { QUESTION_BANK } from '@/lib/data';
import { CompetitionQuestion, TestResult } from '@/lib/types';

export default function TestPage() {
  const { saveTestResult } = useApp();

  const [contestantName, setContestantName] = useState('Abdullah Al-Ansari');
  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 10 questions selected for this exam
  const [questions, setQuestions] = useState<CompetitionQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});

  // Timer & Telemetry
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(600); // 10 minutes
  const [violationsCount, setViolationsCount] = useState(0);
  const [lastViolationMsg, setLastViolationMsg] = useState('');
  const [result, setResult] = useState<TestResult | null>(null);

  const handleSubmitExam = useCallback(() => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    questions.forEach((q, idx) => {
      const ans = selectedAnswers[idx];
      if (ans === undefined) {
        skipped++;
      } else if (ans === q.correctIndex) {
        correct++;
      } else {
        wrong++;
      }
    });

    // Scoring math: +10 pts per correct, -2.5 pts per incorrect (negative marking math), 0 for skip
    const rawScore = correct * 10;
    const penaltyDeduction = wrong * 2.5;
    const telemetryDeduction = violationsCount * 2.0;
    const finalScore = Math.max(0, rawScore - penaltyDeduction - telemetryDeduction);

    const testRes: TestResult = {
      competitionId: 'comp-bukhari-tournament',
      participantName: contestantName,
      totalQuestions: questions.length,
      answeredCount: correct + wrong,
      correctCount: correct,
      wrongCount: wrong,
      skippedCount: skipped,
      rawScore,
      telemetryPenalty: penaltyDeduction + telemetryDeduction,
      finalScore,
      passed: finalScore >= 60,
      submittedAt: new Date().toLocaleTimeString()
    };

    setResult(testRes);
    setIsSubmitted(true);
    saveTestResult(testRes);
  }, [questions, selectedAnswers, violationsCount, contestantName, saveTestResult]);

  // Anti-cheat window blur listener
  useEffect(() => {
    if (!isStarted || isSubmitted) return;

    const handleBlur = () => {
      setViolationsCount((v) => {
        const next = v + 1;
        setLastViolationMsg(`Warning #${next}: Tab switch or window blur detected at ${new Date().toLocaleTimeString()}!`);
        return next;
      });
    };

    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [isStarted, isSubmitted]);

  // Countdown timer
  useEffect(() => {
    if (!isStarted || isSubmitted) return;

    const interval = setInterval(() => {
      setTimeLeftSeconds((sec) => {
        if (sec <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return sec - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, isSubmitted, handleSubmitExam]);

  const handleStartExam = () => {
    if (!contestantName.trim()) {
      alert('Please enter your full contestant name to begin.');
      return;
    }
    // Take first 10 questions from the 20-question bank
    setQuestions(QUESTION_BANK.slice(0, 10));
    setIsStarted(true);
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const toggleFlag = (qIdx: number) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [qIdx]: !prev[qIdx]
    }));
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];

  // 1. Initial Start Screen
  if (!isStarted) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <span className="disp text-xs uppercase font-bold tracking-widest" style={{ color: 'var(--ochre)' }}>
            Proctored Testing Engine
          </span>
          <h1 className="disp text-3xl sm:text-4xl md:text-5xl font-bold mt-1">
            Sahih al-Bukhari & Islamic Sciences Tournament
          </h1>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--mute)' }}>
            Official proctored examination covering Hadith Sanad & Matn, Makharij & Tajweed rules,
            classical Fiqh rulings, and Seerah milestones.
          </p>
        </div>

        <div className="card p-5 sm:p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-base">Examination Rules & Protocol</h3>
            <ul className="text-xs sm:text-sm space-y-2 list-disc list-inside leading-relaxed" style={{ color: 'var(--mute)' }}>
              <li>
                <strong>Authoritative Timer:</strong> You have exactly <strong>10 minutes</strong> to complete 10 questions.
              </li>
              <li>
                <strong>Negative Marking Math:</strong> Correct answers yield <strong>+10 points</strong>. Incorrect attempts deduct <strong>-2.5 points</strong>. Skips have zero penalty.
              </li>
              <li>
                <strong>Anti-Cheat Telemetry:</strong> Leaving the tab or window loses focus will increment your violation counter and incur penalty deductions.
              </li>
              <li>
                <strong>Accreditation:</strong> Scoring <strong>75% or higher</strong> automatically issues an accredited Parchment Diploma.
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t" style={{ borderColor: 'var(--line)' }}>
            <label className="text-xs font-semibold block mb-1">Confirm Contestant Full Legal Name</label>
            <input
              type="text"
              value={contestantName}
              onChange={(e) => setContestantName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border max-w-md font-semibold"
              style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
            />
          </div>

          <div>
            <button onClick={handleStartExam} className="btn w-full sm:w-auto justify-center py-2.5">
              Authorize Proctoring & Begin Exam →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Exam Results Screen
  if (isSubmitted && result) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-200">
        <div className="card p-5 sm:p-8 text-center" style={{ background: 'var(--card)' }}>
          <span
            className="disp text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full"
            style={{
              background: result.finalScore >= 75 ? '#DCFCE7' : '#FEF3C7',
              color: result.finalScore >= 75 ? '#166534' : '#92400E'
            }}
          >
            {result.finalScore >= 75 ? '★ Distinction Honor Roll' : result.passed ? 'Passed' : 'Needs Review'}
          </span>

          <h2 className="disp text-2xl sm:text-3xl md:text-4xl font-bold mt-3">
            Exam Submission Telemetry
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--mute)' }}>
            Contestant: <strong>{result.participantName}</strong> • Submitted at {result.submittedAt}
          </p>

          <div className="mt-6 sm:mt-8 flex justify-center items-center gap-8">
            <div>
              <span className="disp text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: 'var(--ochre)' }}>
                {result.finalScore.toFixed(1)}
              </span>
              <span className="text-xs block mt-1" style={{ color: 'var(--mute)' }}>
                Final Score (out of 100)
              </span>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
            <div className="p-3 rounded-lg border" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
              <span className="block text-slate-500">Correct Answers</span>
              <strong className="text-base text-green-600">{result.correctCount} / 10</strong>
            </div>
            <div className="p-3 rounded-lg border" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
              <span className="block text-slate-500">Wrong Attempts</span>
              <strong className="text-base text-red-600">{result.wrongCount} (-{result.wrongCount * 2.5})</strong>
            </div>
            <div className="p-3 rounded-lg border" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
              <span className="block text-slate-500">Skipped (0 Pen)</span>
              <strong className="text-base" style={{ color: 'var(--ink)' }}>{result.skippedCount}</strong>
            </div>
            <div className="p-3 rounded-lg border" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
              <span className="block text-slate-500">Anti-Cheat Flags</span>
              <strong className="text-base" style={{ color: violationsCount > 0 ? '#DC2626' : '#166534' }}>
                {violationsCount} Flags
              </strong>
            </div>
          </div>

          {result.finalScore >= 75 && (
            <div className="mt-6 sm:mt-8 p-4 rounded-xl border bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
              🎉 <strong>Mabrouk!</strong> Your score qualified you for an official Accredited
              Parchment Diploma with a permanent cryptographic hash.
              <div className="mt-3">
                <Link href="/certificates" className="btn text-xs justify-center w-full sm:w-auto">
                  View Verifiable Diploma Portal →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Answer Key */}
        <div className="card p-5 sm:p-8">
          <h3 className="disp text-xl sm:text-2xl font-bold mb-4">Official Answer Key & Exegesis</h3>
          <div className="space-y-3 sm:space-y-4">
            {questions.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.correctIndex;
              return (
                <div key={q.id} className="p-3.5 sm:p-4 rounded-lg border text-xs sm:text-sm" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-xs uppercase" style={{ color: 'var(--ochre)' }}>
                      Question #{idx + 1} • {q.category}
                    </span>
                    <span className={`font-semibold text-xs ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {isCorrect ? '✓ Correct (+10)' : userAns === undefined ? '⚪ Skipped (0)' : '✕ Incorrect (-2.5)'}
                    </span>
                  </div>
                  <p className="font-semibold text-xs sm:text-sm mt-1">{q.question}</p>
                  <p className="mt-1 text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                    <strong>Correct Answer:</strong> {q.options[q.correctIndex]}
                  </p>
                  <p className="mt-1 text-xs italic" style={{ color: 'var(--mute)' }}>
                    {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. Active Proctored Exam View
  return (
    <div>
      {/* Top Telemetry & Timer Bar - Fully Responsive for Mobile */}
      <div className="card p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4 sticky top-14 sm:top-16 z-20 shadow-md">
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              Proctored Active
            </span>
          </div>
          <span className="text-xs truncate max-w-[150px] sm:max-w-none" style={{ color: 'var(--mute)' }}>
            Contestant: <strong>{contestantName}</strong>
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0" style={{ borderColor: 'var(--line)' }}>
          {/* Anti-cheat violation counter */}
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span style={{ color: violationsCount > 0 ? '#DC2626' : 'var(--mute)' }}>
              Flags: <strong>{violationsCount}</strong>
            </span>
          </div>

          {/* Countdown timer */}
          <div
            className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border font-mono font-bold text-xs sm:text-sm"
            style={{
              background: timeLeftSeconds < 120 ? '#FEE2E2' : 'var(--soft)',
              borderColor: timeLeftSeconds < 120 ? '#EF4444' : 'var(--line)',
              color: timeLeftSeconds < 120 ? '#B91C1C' : 'var(--ink)'
            }}
          >
            ⏱ {formatTimer(timeLeftSeconds)}
          </div>

          <button onClick={handleSubmitExam} className="btn text-xs py-1.5 px-3">
            Submit
          </button>
        </div>
      </div>

      {lastViolationMsg && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200 text-xs flex justify-between items-center animate-in fade-in">
          <span>⚠️ {lastViolationMsg}</span>
          <button onClick={() => setLastViolationMsg('')} className="font-bold ml-2 p-1">✕</button>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Question Display */}
        <div className="md:col-span-2 card p-5 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[420px]">
          {currentQ && (
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className="text-xs uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full"
                  style={{ background: 'var(--soft)', color: 'var(--ochre)' }}
                >
                  {currentQ.category}
                </span>
                <button
                  onClick={() => toggleFlag(currentIndex)}
                  className="text-xs font-semibold flex items-center gap-1"
                  style={{ color: flaggedQuestions[currentIndex] ? 'var(--ochre)' : 'var(--mute)' }}
                >
                  {flaggedQuestions[currentIndex] ? '★ Flagged' : '☆ Flag for Review'}
                </button>
              </div>

              <div className="text-xs font-semibold" style={{ color: 'var(--mute)' }}>
                Question {currentIndex + 1} of {questions.length}
              </div>

              <h2 className="disp text-lg sm:text-xl md:text-2xl font-bold mt-2 leading-snug">
                {currentQ.question}
              </h2>
              {currentQ.questionAr && (
                <p className="disp text-base sm:text-lg mt-1 font-semibold" lang="ar" dir="rtl" style={{ color: 'var(--ochre)' }}>
                  {currentQ.questionAr}
                </p>
              )}

              {/* Options with Generous Touch Targets */}
              <div className="mt-5 sm:mt-6 space-y-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  const isChecked = selectedAnswers[currentIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(currentIndex, optIdx)}
                      className="w-full text-left p-3 sm:p-3.5 rounded-lg border text-xs sm:text-sm flex items-center gap-3 transition-colors active:scale-[0.99]"
                      style={{
                        background: isChecked ? 'var(--ink)' : 'var(--card)',
                        borderColor: isChecked ? 'var(--ink)' : 'var(--line)',
                        color: isChecked ? 'var(--bg)' : 'var(--ink)'
                      }}
                    >
                      <span
                        className="w-6 h-6 rounded-full border grid place-items-center text-xs font-bold shrink-0"
                        style={{
                          borderColor: isChecked ? 'var(--bg)' : 'var(--line)',
                          background: isChecked ? 'var(--bg)' : 'var(--soft)',
                          color: isChecked ? 'var(--ink)' : 'var(--mute)'
                        }}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="font-medium leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Prev / Next */}
          <div className="mt-6 sm:mt-8 pt-4 border-t flex justify-between items-center gap-2" style={{ borderColor: 'var(--line)' }}>
            <button
              onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
              disabled={currentIndex === 0}
              className="btn2 text-xs disabled:opacity-40 py-2 px-3"
            >
              ← Prev
            </button>

            <span className="text-xs" style={{ color: 'var(--mute)' }}>
              {selectedAnswers[currentIndex] !== undefined ? '✓ Saved' : '⚪ Blank'}
            </span>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((idx) => Math.min(questions.length - 1, idx + 1))}
                className="btn text-xs py-2 px-3"
              >
                Next →
              </button>
            ) : (
              <button onClick={handleSubmitExam} className="btn text-xs py-2 px-3">
                Finish →
              </button>
            )}
          </div>
        </div>

        {/* Question Matrix Sidebar / Mobile Bottom Grid */}
        <div>
          <div className="card p-4 sm:p-5">
            <h3 className="font-bold text-sm mb-3">Question Matrix</h3>
            <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-5 gap-2">
              {questions.map((_, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isFlagged = flaggedQuestions[idx];
                const isCurrent = currentIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className="h-9 sm:h-10 rounded-lg text-xs font-bold border transition-all active:scale-95"
                    style={{
                      borderColor: isCurrent ? 'var(--ochre)' : 'var(--line)',
                      borderWidth: isCurrent ? '2px' : '1px',
                      background: isFlagged
                        ? 'var(--ochre)'
                        : isAnswered
                        ? '#10B981'
                        : 'var(--soft)',
                      color: isFlagged || isAnswered ? '#FFFFFF' : 'var(--mute)'
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t text-[11px] flex flex-wrap gap-3 sm:gap-4" style={{ borderColor: 'var(--line)', color: 'var(--mute)' }}>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded" style={{ background: 'var(--ochre)' }} />
                <span>Flagged</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded" style={{ background: 'var(--soft)' }} />
                <span>Unanswered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
