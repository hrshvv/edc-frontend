import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import { Radio } from 'lucide-react';

/* ─── ARCHIVED — Eureka! 2026 live-tracking logic ─────────────────────
   This entire block (milestones, notices, countdown/timeline logic) was
   built specifically for tracking Eureka! 2026 in real time. The event
   has concluded. Restore this if a future event needs the same live
   countdown + timeline + notices treatment.

const milestones = [
  { title: 'Registration Opens', date: '2026-08-14T00:00:00', displayDate: '14 Aug 2026', note: 'Portal open for submissions' },
  { title: 'Registration Deadline', date: '2026-08-20T23:59:59', displayDate: '20 Aug 2026', note: 'Last day to register' },
  { title: 'Round 1 — Online Pitch', date: '2026-08-21T09:00:00', displayDate: '21–23 Aug 2026', note: 'Round 1: Pre-qualifier pitch' },
  { title: 'Round 1 Results', date: '2026-08-24T18:00:00', displayDate: '24 Aug 2026', note: 'Round 1 results announced' },
  { title: 'Grand Finale — Offline Round', date: '2026-08-25T09:00:00', displayDate: '25 Aug 2026', note: 'JSS University, Noida' },
];

const notices = [
  { level: 'priority', text: 'Registration deadline is strict. Make sure to complete your team registration before August 20th.' },
  { level: 'info', text: 'Institutional Round winners will advance to the Zonal Round under NEC (IIT Bombay).' },
  { level: 'update', text: 'Offline Round 2: Institutional round will be hosted at JSS University, Noida on August 25, 2026.' },
];

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  return `${hours}:${minutes}:${seconds}`;
}

function phaseTone(status) {
  if (status === 'live') {
    return 'text-[#E0F7FC] border-[#05B1DE]/40 bg-[#05B1DE]/20';
  }

  if (status === 'done') {
    return 'text-zinc-400 border-zinc-800 bg-zinc-900/40';
  }

  return 'text-zinc-200 border-zinc-800/80 bg-zinc-900/60';
}

function noticeTone(level) {
  if (level === 'priority') {
    return 'border-[#05B1DE]/35 bg-[#05B1DE]/20 text-[#E0F7FC]';
  }

  if (level === 'update') {
    return 'border-[#04a0c7]/35 bg-[#04a0c7]/20 text-[#E0F7FC]';
  }

  return 'border-[#05B1DE]/20 bg-[#05B1DE]/10 text-zinc-300';
}

──────────────────────────────────────────────────────────────────── */

export default function Live() {
  useEffect(() => {
    document.title = 'Live – EDC JSSUN';
  }, []);

  return (
    <div className="eureka-page min-h-screen bg-[#020008] text-white">
      <section className="relative overflow-hidden px-4 pb-20 pt-32 md:px-6 md:pt-36">
        {/* Background Gradients */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(5,177,222,0.15),transparent_35%),radial-gradient(circle_at_80%_8%,rgba(4,160,199,0.2),transparent_30%),linear-gradient(to_bottom,rgba(2,0,8,0.95),rgba(1,1,2,1))]" />
          <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(5,177,222,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(5,177,222,0.1)_1px,transparent_1px)] [background-size:34px_34px]" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Status Indicator */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-zinc-400 eureka-mono">
              <span className="h-2 w-2 rounded-full bg-zinc-500" />
              Live System Idle
            </div>
            <div className="text-xs uppercase tracking-[0.15em] text-zinc-500 eureka-mono">Live Portal</div>
          </div>

          {/* Heading */}
          <h1 className="mb-8 text-3xl font-black uppercase leading-tight tracking-[0.05em] text-transparent md:text-6xl md:leading-[1.05] bg-gradient-to-r from-white via-[#05B1DE] to-[#67e8f9] bg-clip-text eureka-heading">
            Live Portal
          </h1>

          {/* Empty State Card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.01] p-10 text-center shadow-[0_0_50px_rgba(5,177,222,0.05)] backdrop-blur-md md:p-16">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <Radio className="h-7 w-7 text-zinc-500" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-[0.04em] md:text-3xl text-white eureka-heading">
              No Events Are Live Now
            </h2>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
              Check back here during our next event for live updates, countdowns, and announcements.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}