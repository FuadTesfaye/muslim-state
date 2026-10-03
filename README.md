# IlmFlow State — Islamic Event & Competition Operating System 🌙

> **Enterprise-grade, data-driven Islamic Event OS inspired by the Flow State registration experience.**
> Built for international Islamic summits, Holy Quran recitation championships, Hadith mastery tournaments, accredited parchment diplomas, and real-time secretariat administration.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Ready-blueviolet)](https://turbo.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.4.2-fbf0df?logo=bun)](https://bun.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🏛️ System Architecture

IlmFlow State is designed as a modular, data-driven Event OS where all events, registration fields, question banks, rubrics, and schedules are dynamically configured without modifying source code.

```text
                           ISLAMIC EVENT PLATFORM
                                     │
                 ┌───────────────────┼───────────────────┐
                 │                   │                   │
             EVENT CMS          REGISTRATION        USER SYSTEM
                 │                   │                   │
             Schedule             Forms               8 Roles
             Speakers             Fields              22 Granular
             Sessions             Pricing Math        Permissions
                                  Waitlists & QR
                                     │
                             COMPETITION ENGINE
                                     │
                     ┌───────────────┴───────────────┐
                     │                               │
               PROCTORED TESTS              MANUAL SUBMISSIONS
               Authoritative Timers         Quran Audio Recitation
               Anti-Cheat Telemetry         Scholarly Essays
               Negative Marking Math        100-pt Rubric & Appeals
                                     │
                             ADMIN SECRETARIAT
                                     │
                     ┌───────────────┴───────────────┐
                     │                               │
                 ANALYTICS & AUDIT            ARRIVAL GATE
                 Question Discrimination      Mobile Audio Chime
                 Velocity & Logs              QR Scanner Terminal
```

---

## 💎 Design Philosophy & Aesthetic System

IlmFlow State preserves the exact visual styling, fonts, and CSS variables of the platform:
- **Alabaster Ivory Limestone (`#EEF1F5`)**: Warm natural canvas (`--bg`).
- **Clean Card Surface (`#FFFFFF` / `#121C30`)**: Elevated readability (`--card`).
- **Deep Sanctuary Slate (`#0F1A2E` / `#E7ECF5`)**: High-contrast, crystal-clear typography (`--ink`).
- **Academic Ocean Indigo (`#1D4E89` / `#6FA3E0`)**: Scholarly dignity and institutional authority (`--blue`).
- **Burnished Antique Gold / Ochre (`#9A6A1C` / `#D9A94F`)**: Illuminated manuscripts, diploma borders, and decorative gilding (`--ochre`).
- **Typography Pairing**:
  - **Hanken Grotesk & Noto Sans Ethiopic**: Ultra-clean geometric enterprise UI.
  - **Amiri**: Traditional Naskh Arabic script for Quranic verses, Hadith citations, and parchment diplomas (`.disp`).
  - **Geometric Tile Accents**: Islamic geometric pattern overlays (`.tiles`).

---

## ✨ Key Platform Features

### 1. Flow State Multi-Day Registration Engine (`/events`)
- **Capacity Management**: Atomic per-day quotas with live capacity tracking.
- **Tiered Passes**: VIP, General, Academic, and Youth admissions.
- **Discount & Promo Matrix**: Multi-day bundling math (15% off 3 days, 10% off 2 days) and promotional codes (`UMMAH2026`).
- **Digital Lanyard Pass**: Live SVG QR codes with unique tokens for instantaneous gate check-in.

### 2. Zero-Code Visual Form Builder (`/admin/forms/builder`)
- **12 Dynamic Field Types**: Text, Textarea, Email, Phone, Number, Date, Dropdown, Radio, Checkboxes, File Upload, Gender Selection, and Digital Signature Canvas.
- **Conditional Visibility**: Show/hide questions based on previous answers (e.g., Parent Consent shown only if Age < 18).
- **Immutable Versioning**: Publishing creates incremental versions (`v1`, `v2`, `v3`) ensuring historical applicant records are never corrupted.
- **Live Canvas & Schema Exporter**: Instant split-screen preview and one-click JSON schema export.

### 3. Proctored Competition Engine (`/test`)
- **Islamic Question Bank**: Seeded with 20+ verified questions spanning Tajweed, Sahih al-Bukhari, Islamic jurisprudence, and Seerah.
- **Anti-Cheat Telemetry**: Authoritative server timer synchronization, blur/tab-switch detection, and violation counters.
- **Negative Marking Math**: Configurable deduction for incorrect attempts (-2.5 pts), zero-penalty skips, and 0-score flooring.
- **Interactive Exam Matrix**: Jump to questions, review flagged bookmarks, and view instant feedback on submission.

### 4. Hybrid 100-Point Rubric Grading & Appeals (`/admin/grading`)
- **Dual Review Workflows**: Automatic grading for objective quizzes; 100-pt rubric scoring for Quran audio recordings and scholarly essays.
- **Audio Waveform Player**: Integrated audio inspection for Tajweed accuracy, Makharij articulation, and vocal modulation.
- **Contestant Appeals**: Official rebuttal submission with audit trail review.

### 5. Staff Arrival Gate (`/staff/checkin`)
- **Barcode & Manual Entry**: Fast lookup by ticket number or barcode token.
- **Web Audio Chimes**: Dual audio synthesizers (pleasant green harmonic chime for valid admission, low amber chord for double-entry or duplicate scans).
- **Real-Time Attendance Counter**: Live gate throughput velocity with timestamped records.

### 6. Central Secretariat Admin & RBAC (`/admin`)
- **8 Dedicated Personas**: Visitor, Participant, Parent/Guardian, Judge/Grader, Event Staff, Content Manager, Administrator, Super Admin.
- **Interactive Role Switcher**: Instant persona switching toolbar with contextual banner notification and permission guards.
- **Audit Logs**: Immutable event trail recording all ticket issues, grade modifications, and role updates.

### 7. Public Cryptographic Diploma Verification (`/certificates`)
- **Tamper-Evident Credentials**: Search by Certificate ID or SHA-256 verification hash.
- **Illuminated Parchment Diploma**: Royal diploma canvas with Bismillah calligraphy, honor titles, and examining board seals.

### 8. Participant Cockpit Dashboard (`/dashboard`)
- Delegate badges, registered multi-day passes with QR modals, active test results, audition submission statuses, and official appeal rebuttals.

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- [Bun](https://bun.sh/) (v1.2+) or Node.js (v20+)

### 1. Install Dependencies
```bash
bun install
```

### 2. Run Quality Checks
```bash
bun run lint
```
*Expected: 0 errors, 0 warnings.*

### 3. Start Development Server
```bash
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Execution
```bash
bun run build
bun run start
```

---

## 📁 Repository Structure

```text
├── app/
│   ├── admin/
│   │   ├── forms/builder/      # Zero-Code Visual Form Builder with 12 field types
│   │   ├── grading/            # 100-point rubric grading portal & audio waveform player
│   │   └── page.tsx            # Central Secretariat cockpit & immutable audit trail
│   ├── certificates/           # Public cryptographic certificate verification portal
│   ├── competitions/
│   │   ├── submit/             # Recitation audio & scholarly essay manual submission
│   │   └── page.tsx            # Active tournament and championship catalog
│   ├── dashboard/              # Participant cockpit (passes, active tests, diplomas)
│   ├── events/                 # Summit showcase & multi-day ticket checkout modal
│   ├── leaderboard/            # Global leaderboard with tie-breaking honor badges
│   ├── staff/checkin/          # Arrival gate terminal with Web Audio synthesizer chimes
│   ├── test/                   # Proctored exam engine with anti-cheat telemetry
│   ├── layout.tsx              # Root layout with RoleBanner, LanguageProvider, and AppProvider
│   └── page.tsx                # Platform showcase & live secretariat telemetry
├── components/                 # Reusable UI componentry (Header, Footer, RoleBanner, QRModal, Toast)
├── context/
│   └── AppContext.tsx          # State engine with local persistence & toast bus
├── lib/
│   ├── audio.ts                # Web Audio API synthesizers (green chime & amber warning chord)
│   ├── data.ts                 # Seed fixtures, 20+ Islamic questions, translations (EN, AR, AM)
│   ├── rbac.ts                 # 8 Roles and 22 granular permissions
│   └── types.ts                # End-to-end TypeScript interfaces
└── public/                     # Static assets
```

---

## 📜 License
Distributed under the MIT License. Built with devotion and precision.
