'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { SEED_COMPETITIONS, RUBRIC_CRITERIA } from '@/lib/data';

export default function SubmitCompetitionPage() {
  const router = useRouter();
  const { submitNewRecitationOrEssay } = useApp();

  const [competitionId, setCompetitionId] = useState(
    'comp-quran-championship'
  );
  const [participantName, setParticipantName] = useState('');
  const [email, setEmail] = useState('');
  const [submissionType, setSubmissionType] = useState<'audio' | 'essay'>('audio');

  // Audio state
  const [audioTitle, setAudioTitle] = useState('Surah Maryam (Verses 1 - 25)');

  // Essay state
  const [essayTitle, setEssayTitle] = useState('');
  const [essayContent, setEssayContent] = useState('');

  const selectedComp =
    SEED_COMPETITIONS.find((c) => c.id === competitionId) ||
    SEED_COMPETITIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!participantName) {
      alert('Please enter your full contestant name.');
      return;
    }

    submitNewRecitationOrEssay({
      competitionId: selectedComp.id,
      competitionTitle: selectedComp.title,
      participantName,
      type: submissionType,
      audioTitle: submissionType === 'audio' ? audioTitle : undefined,
      audioDuration: submissionType === 'audio' ? '3 min 50 sec' : undefined,
      essayTitle: submissionType === 'essay' ? essayTitle : undefined,
      essayContent: submissionType === 'essay' ? essayContent : undefined
    });

    router.push('/dashboard');
  };

  return (
    <>
      <div className="mb-8">
        <Link href="/competitions" className="text-xs font-semibold hover:underline" style={{ color: 'var(--ochre)' }}>
          ← Back to Competitions
        </Link>
        <h1 className="disp text-4xl md:text-5xl font-bold mt-2">
          Manual Submission Portal
        </h1>
        <p className="mt-2 max-w-2xl" style={{ color: 'var(--mute)' }}>
          Upload high-fidelity acoustic Quran recitations or scholarly ethical treatises for
          official 100-point rubric adjudication by the Secretariat Judicial Council.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="md:col-span-2 card p-6 md:p-8 space-y-5">
          <div>
            <label className="text-xs font-semibold block mb-1">Select Tournament</label>
            <select
              value={competitionId}
              onChange={(e) => {
                const val = e.target.value;
                setCompetitionId(val);
                if (val === 'comp-scholarly-essay') {
                  setSubmissionType('essay');
                } else {
                  setSubmissionType('audio');
                }
              }}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border"
              style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
            >
              <option value="comp-quran-championship">
                International Holy Quran Recitation Championship (Audio Waveform)
              </option>
              <option value="comp-scholarly-essay">
                Scholarly Treatise on Contemporary Islamic Ethics (Essay)
              </option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold block mb-1">Contestant Full Legal Name</label>
              <input
                type="text"
                required
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="e.g. Bilal Al-Habashi"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border"
                style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">Contact Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contestant@example.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border"
                style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
              />
            </div>
          </div>

          {/* Audio Recitation Specific Fields */}
          {submissionType === 'audio' && (
            <div className="p-4 rounded-xl border space-y-4" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
              <div>
                <label className="text-xs font-semibold block mb-1">Recitation Surah & Verses</label>
                <input
                  type="text"
                  value={audioTitle}
                  onChange={(e) => setAudioTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border"
                  style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                />
              </div>

              {/* Simulated Waveform Visualizer */}
              <div>
                <label className="text-xs font-semibold block mb-2">
                  Acoustic Studio Waveform Preview
                </label>
                <div
                  className="h-20 rounded-lg p-3 border flex items-end justify-between gap-1 overflow-hidden"
                  style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
                >
                  {[
                    15, 30, 45, 60, 80, 55, 90, 75, 40, 25, 70, 85, 95, 65, 35, 50, 75,
                    90, 40, 20, 60, 85, 100, 70, 45, 30, 55, 80, 65, 40, 25, 50, 70, 85
                  ].map((height, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full transition-all duration-300"
                      style={{
                        height: `${height}%`,
                        background: i % 2 === 0 ? 'var(--blue)' : 'var(--ochre)'
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[11px] mt-1.5" style={{ color: 'var(--mute)' }}>
                  <span>Waveform Duration: 03:50</span>
                  <span className="text-green-600 font-semibold">✓ Lossless 24-bit PCM WAV</span>
                </div>
              </div>
            </div>
          )}

          {/* Scholarly Essay Specific Fields */}
          {submissionType === 'essay' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1">Treatise Title</label>
                <input
                  type="text"
                  required
                  value={essayTitle}
                  onChange={(e) => setEssayTitle(e.target.value)}
                  placeholder="e.g. Algorithmic Agency & Fiqhi Liability"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border"
                  style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1">Scholarly Abstract & Text Body</label>
                <textarea
                  rows={6}
                  required
                  value={essayContent}
                  onChange={(e) => setEssayContent(e.target.value)}
                  placeholder="Paste complete treatise or executive research synopsis with citations from the classical authorities..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border font-serif"
                  style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <button type="submit" className="btn w-full justify-center">
              Submit Entry for Official Adjudication →
            </button>
          </div>
        </form>

        {/* 100-Point Rubric Guide */}
        <div>
          <div className="card p-5">
            <span className="disp text-xs uppercase font-bold tracking-widest" style={{ color: 'var(--ochre)' }}>
              Evaluation Matrix
            </span>
            <h3 className="disp text-xl font-bold mt-1">100-Point Adjudication Rubric</h3>
            <p className="text-xs mt-1" style={{ color: 'var(--mute)' }}>
              Entries are blindly evaluated by senior accredited jurists and Qura’a.
            </p>

            <div className="mt-4 space-y-3">
              {RUBRIC_CRITERIA.map((crit) => (
                <div key={crit.id} className="p-3 rounded-lg border text-xs" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
                  <div className="flex justify-between font-semibold">
                    <span>{crit.name}</span>
                    <strong style={{ color: 'var(--ochre)' }}>{crit.maxPoints} Pts</strong>
                  </div>
                  <p className="mt-1" style={{ color: 'var(--mute)' }}>
                    {crit.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3 rounded-lg border text-xs bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200">
              <strong>Contestant Protection:</strong> After initial score release, contestants
              retain the right to file an official appeal with the Secretariat Board.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
