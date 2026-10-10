import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import {
  Radio,
  ArrowRight,
  Sparkles,
  Zap,
  Users,
  Compass,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';

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
──────────────────────────────────────────────────────────────────── */

const highlights = [
  {
    icon: Layers,
    title: 'Multiple Domains',
    desc: 'Technical, UI/UX & Graphics, Video Production, Content & PR, Corporate Relations, and Event Management.',
    tag: 'Domains Open',
  },
  {
    icon: Zap,
    title: 'Multi-Stage Process',
    desc: 'Structured domain task assignments followed by personal interviews and direct mentorship.',
    tag: 'Rounds Live',
  },
  {
    icon: Users,
    title: 'Join The Core Network',
    desc: 'Work alongside ambitious creators, founders, and leaders building high-impact collegiate events.',
    tag: 'EDC Community',
  },
];

export default function Live() {
  useEffect(() => {
    document.title = 'Live Portal | EDC JSS Recruitments 2026';
  }, []);

  return (
    <div className="eureka-page min-h-screen bg-[#020008] text-white selection:bg-[#CCFF00] selection:text-black">
      <section className="relative overflow-hidden px-4 pb-20 pt-28 md:px-6 md:pt-36">
        {/* Dynamic Background Gradients */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(204,255,0,0.14),transparent_45%),radial-gradient(circle_at_80%_25%,rgba(5,177,222,0.12),transparent_35%),radial-gradient(circle_at_20%_40%,rgba(0,56,255,0.18),transparent_40%),linear-gradient(to_bottom,rgba(2,0,8,0.92),rgba(1,1,2,1))]" />
          <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(204,255,0,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(5,177,222,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />
          {/* Subtle Ambient Glow Orbs */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-[42rem] rounded-full bg-[#CCFF00]/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Live Status Indicator Bar */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#CCFF00]/25 bg-black/40 px-4 py-3 shadow-[0_0_25px_rgba(204,255,0,0.1)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#CCFF00] eureka-mono">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CCFF00] opacity-80" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#CCFF00]" />
              </span>
              <span>Live System Active</span>
            </div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-zinc-400 eureka-mono">
              <Sparkles className="h-3.5 w-3.5 text-[#CCFF00]" />
              <span>Recruitments 2026 Portal</span>
            </div>
          </motion.div>

          {/* Hero Live Announcement Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-[#CCFF00]/30 bg-gradient-to-b from-[#CCFF00]/[0.08] via-white/[0.02] to-black/60 p-6 text-center shadow-[0_0_60px_rgba(204,255,0,0.12)] backdrop-blur-2xl sm:p-10 md:p-14"
          >
            {/* Live Beacon Tag */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#CCFF00]/40 bg-[#CCFF00]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#CCFF00] shadow-[0_0_20px_rgba(204,255,0,0.25)]">
              <Radio className="h-3.5 w-3.5 animate-pulse text-[#CCFF00]" />
              <span>Applications Are Now Live</span>
            </div>

            {/* Main Title */}
            <h1 className="mb-4 text-3xl font-black uppercase leading-[1.08] tracking-tight sm:text-5xl md:text-6xl eureka-heading">
              <span className="text-white">Recruitments Are </span>
              <span className="bg-gradient-to-r from-[#CCFF00] via-[#99ff00] to-[#05B1DE] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(204,255,0,0.4)]">
                Live Now
              </span>
            </h1>

            {/* Subtext */}
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base md:text-lg">
              The official portal for <strong className="text-white font-semibold">EDC JSS Recruitments 2026</strong> is now open! 
              Step into the heartbeat of campus entrepreneurship, showcase your skills across diverse domains, and launch your journey with us.
            </p>

            {/* Main Redirection CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/recruitment-2026"
                className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#CCFF00] px-8 py-4 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_35px_rgba(204,255,0,0.45)] transition-all duration-300 hover:bg-[#d8ff33] hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(204,255,0,0.6)] active:scale-[0.98] sm:w-auto"
              >
                <span>Go to Recruitments Page</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>

              <Link
                to="/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold tracking-wide text-zinc-200 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <span>Explore Home</span>
              </Link>
            </div>

            {/* Live Ticker Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-6 text-xs text-zinc-400 eureka-mono">
              <div className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-[#CCFF00]" />
                <span>Open for 1st & 2nd Year Students</span>
              </div>
              <span className="hidden text-zinc-600 sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Clock className="h-4 w-4 text-[#05B1DE]" />
                <span>Round Submissions Underway</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Domain & Info Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-300 hover:border-[#CCFF00]/40 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(204,255,0,0.08)]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#CCFF00]/30 bg-[#CCFF00]/10 text-[#CCFF00] transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 eureka-mono">
                    {item.tag}
                  </span>
                </div>
                <h3 className="mb-1 text-base font-bold text-white transition-colors group-hover:text-[#CCFF00]">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-zinc-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Direct Link Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6"
          >
            <Link
              to="/recruitment-2026"
              className="group flex items-center justify-between rounded-2xl border border-[#05B1DE]/30 bg-gradient-to-r from-[#05B1DE]/10 via-[#0038FF]/10 to-transparent p-4 px-6 backdrop-blur-md transition-all duration-300 hover:border-[#CCFF00]/50 hover:bg-[#CCFF00]/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFF00]/20 text-[#CCFF00]">
                  <Compass className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                    Check Domain Guidelines, Tasks & Details
                  </div>
                  <div className="text-xs text-zinc-400">
                    Visit the recruitments hub to view requirements for each domain
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#CCFF00] eureka-mono">
                <span>View Now</span>
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}