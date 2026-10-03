'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useApp } from '@/context/AppContext';
import { SEED_EVENTS } from '@/lib/data';
import { EventItem, TicketPass } from '@/lib/types';
import { QRModal } from '@/components/QRModal';

export default function EventsPage() {
  const { t } = useLanguage();
  const { registerTicket } = useApp();

  const [selectedEvent, setSelectedEvent] = useState<EventItem>(SEED_EVENTS[0]);
  const [activeDay, setActiveDay] = useState<number>(1);

  // Registration modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tier, setTier] = useState<'VIP' | 'General' | 'Academic' | 'Youth'>('General');
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [issuedTicket, setIssuedTicket] = useState<TicketPass | null>(null);

  const basePricePerDay =
    tier === 'VIP'
      ? selectedEvent.tierPrices.vip
      : tier === 'General'
      ? selectedEvent.tierPrices.general
      : tier === 'Academic'
      ? selectedEvent.tierPrices.academic
      : selectedEvent.tierPrices.youth;

  const rawTotal = basePricePerDay * selectedDays.length;

  // Bundling discount: 15% for all 3 days, 10% for 2 days
  let bundleDiscount = 0;
  if (selectedDays.length === 3) {
    bundleDiscount = rawTotal * 0.15;
  } else if (selectedDays.length === 2) {
    bundleDiscount = rawTotal * 0.1;
  }

  // Promo code discount: UMMAH2026 gives additional $15 off
  const promoDiscount = promoApplied ? 15 : 0;
  const totalDiscount = Math.min(rawTotal, bundleDiscount + promoDiscount);
  const finalPrice = Math.max(0, rawTotal - totalDiscount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'UMMAH2026' || promoCode.trim().toUpperCase() === 'ILMFLOW') {
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "UMMAH2026" or "ILMFLOW".');
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert('Please enter your full name and email.');
      return;
    }
    if (selectedDays.length === 0) {
      alert('Please select at least one attendance day.');
      return;
    }

    const tkt = registerTicket({
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      attendeeName: fullName,
      email,
      phone: phone || '+251 900 000 000',
      tier,
      selectedDays,
      basePrice: rawTotal,
      discountAmount: totalDiscount,
      finalPrice,
      qrCodeSvg: ''
    });

    setIsModalOpen(false);
    setIssuedTicket(tkt);
  };

  return (
    <>
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="disp text-3xl sm:text-4xl md:text-5xl font-bold">{t('events')}</h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm max-w-3xl" style={{ color: 'var(--mute)' }}>
            Experience multi-day international Islamic summits, academic keynote assemblies, and
            session agendas with real-time pass enrollment.
          </p>
        </div>

        {/* Event Selector Chips */}
        <div className="flex gap-2 overflow-x-auto noscroll pb-1">
          {SEED_EVENTS.map((evt) => (
            <button
              key={evt.id}
              onClick={() => {
                setSelectedEvent(evt);
                setActiveDay(1);
              }}
              className="chip text-xs py-1.5 whitespace-nowrap"
              aria-pressed={selectedEvent.id === evt.id}
            >
              {evt.title.split(' ')[0]} {evt.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Summit Banner */}
      <section
        className="card p-5 sm:p-8 md:p-10 mb-8 sm:mb-10 relative overflow-hidden"
        style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span
            className="text-[11px] sm:text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full self-start"
            style={{ background: 'var(--soft)', color: 'var(--ochre)' }}
          >
            {selectedEvent.dateRange}
          </span>
          <span className="text-xs font-mono font-semibold" style={{ color: 'var(--mute)' }}>
            Venue: {selectedEvent.location}
          </span>
        </div>

        <h2 className="disp text-2xl sm:text-3xl md:text-4xl font-bold max-w-4xl leading-snug">
          {selectedEvent.title}
        </h2>
        <p className="disp text-base sm:text-lg mt-1" lang="ar" dir="rtl" style={{ color: 'var(--ochre)' }}>
          {selectedEvent.titleAr}
        </p>
        <p className="mt-3 sm:mt-4 max-w-3xl leading-relaxed text-xs sm:text-sm md:text-base" style={{ color: 'var(--mute)' }}>
          {selectedEvent.description}
        </p>

        {/* Pricing Tiers Ribbon */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="p-3 rounded-lg border text-center" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
            <span className="text-[11px] sm:text-xs font-semibold block text-slate-500">VIP Pass</span>
            <span className="disp text-lg sm:text-xl font-bold" style={{ color: 'var(--ochre)' }}>
              ${selectedEvent.tierPrices.vip}
            </span>
            <span className="text-[10px] block text-slate-400">Front Seating</span>
          </div>
          <div className="p-3 rounded-lg border text-center" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
            <span className="text-[11px] sm:text-xs font-semibold block text-slate-500">General</span>
            <span className="disp text-lg sm:text-xl font-bold" style={{ color: 'var(--blue)' }}>
              ${selectedEvent.tierPrices.general}
            </span>
            <span className="text-[10px] block text-slate-400">Full Access</span>
          </div>
          <div className="p-3 rounded-lg border text-center" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
            <span className="text-[11px] sm:text-xs font-semibold block text-slate-500">Academic</span>
            <span className="disp text-lg sm:text-xl font-bold" style={{ color: 'var(--ink)' }}>
              ${selectedEvent.tierPrices.academic}
            </span>
            <span className="text-[10px] block text-slate-400">Students</span>
          </div>
          <div className="p-3 rounded-lg border text-center" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
            <span className="text-[11px] sm:text-xs font-semibold block text-slate-500">Youth (&lt;18)</span>
            <span className="disp text-lg sm:text-xl font-bold" style={{ color: 'var(--ink)' }}>
              ${selectedEvent.tierPrices.youth}
            </span>
            <span className="text-[10px] block text-slate-400">Supervised</span>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button onClick={() => setIsModalOpen(true)} className="btn justify-center text-sm py-2.5">
            Register for Pass & Digital Badge →
          </button>
          <span className="text-xs font-medium text-green-700 dark:text-green-400 text-center sm:text-left">
            ✓ Multi-day bundles apply up to 15% discount automatically!
          </span>
        </div>
      </section>

      {/* Agenda & Keynote Faculty */}
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        {/* Schedule by Day */}
        <div className="md:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h3 className="disp text-xl sm:text-2xl font-bold">Summit Agenda & Sessions</h3>
            <div className="flex gap-1.5 overflow-x-auto noscroll pb-1">
              {Array.from({ length: selectedEvent.totalDays }, (_, i) => i + 1).map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDay(d)}
                  className="chip text-xs py-1 px-3 whitespace-nowrap"
                  aria-pressed={activeDay === d}
                >
                  Day {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            {selectedEvent.sessions
              .filter((s) => s.day === activeDay)
              .map((session, idx) => (
                <div key={idx} className="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold" style={{ color: 'var(--ochre)' }}>
                      {session.time} • {session.hall}
                    </span>
                    <h4 className="font-semibold text-sm sm:text-base mt-0.5">{session.title}</h4>
                    <p className="text-xs mt-1" style={{ color: 'var(--mute)' }}>
                      Speaker: <strong>{session.speaker}</strong>
                    </p>
                  </div>
                  <span
                    className="text-[11px] px-2.5 py-1 rounded font-medium self-start sm:self-center border"
                    style={{ background: 'var(--soft)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                  >
                    Auditorium Reserved
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Keynote Faculty Lineup */}
        <div>
          <h3 className="disp text-xl sm:text-2xl font-bold mb-4">Scholarly Faculty</h3>
          <div className="grid gap-3">
            {selectedEvent.speakers.map((spk, idx) => (
              <div key={idx} className="card p-3.5 sm:p-4 flex items-center gap-3">
                <span
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg grid place-items-center font-bold text-sm shrink-0"
                  style={{ background: 'var(--soft)', color: 'var(--blue)' }}
                >
                  {spk.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm truncate">{spk.name}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--ochre)' }}>
                    {spk.title}
                  </p>
                  <p className="text-[11px] truncate" style={{ color: 'var(--mute)' }}>
                    {spk.institution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Modal - Fully Responsive on Mobile */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div
            className="card max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 my-auto relative shadow-2xl animate-in zoom-in-95 duration-150"
            style={{ background: 'var(--card)' }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-sm font-bold text-gray-400 hover:text-gray-600 dark:hover:text-white p-1"
            >
              ✕
            </button>

            <span className="disp text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--ochre)' }}>
              Flow State Multi-Day Registration
            </span>
            <h3 className="disp text-xl sm:text-2xl font-bold mt-1">Register Delegate Pass</h3>
            <p className="text-xs mt-1" style={{ color: 'var(--mute)' }}>
              {selectedEvent.title}
            </p>

            <form onSubmit={handleCheckout} className="mt-4 sm:mt-5 space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1">Select Admission Tier</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['VIP', 'General', 'Academic', 'Youth'] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTier(t)}
                      className="chip text-xs py-2 justify-center"
                      aria-pressed={tier === t}
                    >
                      {t} (${selectedEvent.tierPrices[t.toLowerCase() as keyof typeof selectedEvent.tierPrices]})
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Select Attendance Days</label>
                <div className="flex gap-2">
                  {Array.from({ length: selectedEvent.totalDays }, (_, i) => i + 1).map((d) => {
                    const isSelected = selectedDays.includes(d);
                    return (
                      <button
                        type="button"
                        key={d}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedDays(selectedDays.filter((x) => x !== d));
                          } else {
                            setSelectedDays([...selectedDays, d].sort());
                          }
                        }}
                        className="chip text-xs py-1.5 flex-1 justify-center"
                        aria-pressed={isSelected}
                      >
                        Day {d} {isSelected ? '✓' : ''}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ahmad Al-Mansoor"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border"
                    style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border"
                    style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Mobile Contact Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+251 900 000 000"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border"
                  style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                />
              </div>

              {/* Promo Code Entry */}
              <div>
                <label className="text-xs font-semibold block mb-1">Promotional Discount Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Try 'UMMAH2026' or 'ILMFLOW'"
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border uppercase"
                    style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                  />
                  <button type="button" onClick={handleApplyPromo} className="btn2 text-xs">
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[11px] text-green-600 font-semibold mt-1">
                    ✓ Promo Code Applied: $15 additional discount!
                  </p>
                )}
              </div>

              {/* Pricing Math Breakdown */}
              <div className="p-3.5 rounded-lg border text-xs space-y-1.5" style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--mute)' }}>Base Price ({selectedDays.length} days @ ${basePricePerDay}):</span>
                  <span className="font-semibold">${rawTotal}</span>
                </div>
                {bundleDiscount > 0 && (
                  <div className="flex justify-between text-green-700 dark:text-green-400">
                    <span>Multi-Day Bundle Savings:</span>
                    <span>-${bundleDiscount.toFixed(2)}</span>
                  </div>
                )}
                {promoApplied && (
                  <div className="flex justify-between text-green-700 dark:text-green-400">
                    <span>Promo Code Savings:</span>
                    <span>-$15.00</span>
                  </div>
                )}
                <div className="pt-2 border-t flex justify-between font-bold text-sm" style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}>
                  <span>Total Amount Due:</span>
                  <span className="disp text-base font-bold">${finalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn2 flex-1 justify-center py-2.5">
                  Cancel
                </button>
                <button type="submit" className="btn flex-1 justify-center py-2.5">
                  Complete Registration & Issue Badge →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Digital Lanyard Pass Modal */}
      {issuedTicket && (
        <QRModal ticket={issuedTicket} onClose={() => setIssuedTicket(null)} />
      )}
    </>
  );
}
