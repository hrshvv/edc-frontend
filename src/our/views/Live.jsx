import React, { useEffect, useMemo, useState } from 'react';
import Footer from '../components/Footer';
import { Calendar, Info, Clock, Rocket, AlertCircle } from 'lucide-react';

const milestones = [
  { title: 'Registration Opens', date: '2026-08-14T00:00:00', displayDate: '14 Aug 2026', note: 'Portal open for submissions' },
  { title: 'Registration Deadline', date: '2026-08-18T23:59:59', displayDate: '18 Aug 2026', note: 'Last day to register' },
  { title: 'Round 1 — Online Pitch', date: '2026-08-20T09:00:00', displayDate: '20–22 Aug 2026', note: 'Pre-qualifier pitch' },
  { title: 'Round 1 Results', date: '2026-08-23T18:00:00', displayDate: '23 Aug 2026', note: 'Shortlist announced' },
  { title: 'Grand Finale — Offline Round', date: '2026-08-24T09:00:00', displayDate: '24 Aug 2026', note: 'JSS University, Noida' },
];

const notices = [
  { level: 'priority', text: 'Registration deadline is strict. Make sure to complete your team registration before August 18.' },
  { level: 'info', text: 'Institutional Round winners will advance to the Zonal Round under NEC (IIT Bombay).' },
  { level: 'update', text: 'Offline Grand Finale will be hosted at JSS University, Noida on August 24, 2026.' },
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

export default function Live() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    document.title = 'Eureka! 2026 Live – Road to Enterprise | EDC JSSUN';
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Find the next upcoming milestone
  const nextMilestone = useMemo(() => {
    return milestones.find(m => new Date(m.date) > now) || null;
  }, [now]);

  // Find the index of the next milestone
  const nextMilestoneIndex = useMemo(() => {
    if (!nextMilestone) return milestones.length;
    return milestones.findIndex(m => m.title === nextMilestone.title);
  }, [nextMilestone]);

  const countdownMs = useMemo(() => {
    if (!nextMilestone) return 0;
    return new Date(nextMilestone.date).getTime() - now.getTime();
  }, [nextMilestone, now]);

  const phaseHeader = nextMilestone 
    ? `Upcoming: ${nextMilestone.title}` 
    : 'Event concluded';

  const mainHeadline = nextMilestone 
    ? nextMilestone.title.toUpperCase() 
    : 'CONCLUDED';

  const subHeadline = nextMilestone 
    ? `Scheduled for ${nextMilestone.displayDate}.` 
    : 'All milestones for Eureka! 2026 are completed.';

  return (
    <div className="eureka-page min-h-screen bg-[#020008] text-white">
      <section className="relative overflow-hidden px-4 pb-20 pt-32 md:px-6 md:pt-36">
        {/* Background Gradients */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(5,177,222,0.15),transparent_35%),radial-gradient(circle_at_80%_8%,rgba(4,160,199,0.2),transparent_30%),linear-gradient(to_bottom,rgba(2,0,8,0.95),rgba(1,1,2,1))]" />
          <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(5,177,222,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(5,177,222,0.1)_1px,transparent_1px)] [background-size:34px_34px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Synced Indicator */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#05B1DE]/30 bg-white/[0.02] px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-zinc-400 eureka-mono">
              <span className="h-2 w-2 rounded-full bg-[#05B1DE] shadow-[0_0_10px_rgba(5,177,222,0.95)] animate-pulse" />
              Live System Synced
            </div>
            <div className="text-xs uppercase tracking-[0.15em] text-[#05B1DE] eureka-mono">Eureka! 2026</div>
          </div>

          {/* Heading */}
          <h1 className="mb-8 text-3xl font-black uppercase leading-tight tracking-[0.05em] text-transparent md:text-6xl md:leading-[1.05] bg-gradient-to-r from-white via-[#05B1DE] to-[#67e8f9] bg-clip-text eureka-heading">
            Eureka! 2026 Live Portal
          </h1>

          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            {/* Main Countdown & Info Card */}
            <div className="rounded-3xl border border-[#05B1DE]/30 bg-white/[0.01] p-5 shadow-[0_0_50px_rgba(5,177,222,0.05)] backdrop-blur-md md:p-8">
              <div className="rounded-full border border-[#05B1DE]/40 bg-[#05B1DE]/10 px-4 py-1.5 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#05B1DE] md:inline-flex eureka-mono">
                {nextMilestone ? 'Event Status: Active' : 'Event Status: Concluded'}
              </div>

              {/* Display Current Milestone Card */}
              <div className="mt-8 rounded-2xl border border-[#05B1DE]/20 bg-white/[0.02] px-4 py-10 text-center md:px-10 md:py-14">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 eureka-mono">Next Milestone</p>
                <h2 className="mt-3 text-3xl font-black uppercase tracking-[0.04em] md:text-5xl text-[#05B1DE] eureka-heading">
                  {mainHeadline}
                </h2>
                <p className="mt-4 text-sm uppercase tracking-[0.15em] text-zinc-300 eureka-mono">
                  {subHeadline}
                </p>
              </div>

              {/* Countdown & Status Pill */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-neutral-400 eureka-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#05B1DE]" /> Countdown
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-[#05B1DE] eureka-mono">
                    {nextMilestone ? formatDuration(countdownMs) : '00:00:00'}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-neutral-400 eureka-mono flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#05B1DE]" /> Portal Status
                  </p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-zinc-200 eureka-mono leading-relaxed">
                    {phaseHeader}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar Column: Timeline & Notices */}
            <div className="space-y-6">
              {/* Timeline (Schedule) Section */}
              <div className="rounded-3xl border border-[#05B1DE]/20 bg-white/[0.01] p-6 backdrop-blur-md">
                <div className="mb-5 flex items-center justify-between border-b border-white/5 pb-4">
                  <h4 className="text-sm font-black uppercase tracking-[0.18em] text-white eureka-heading">Event Timeline</h4>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#05B1DE] eureka-mono">Milestones</span>
                </div>
                <div className="space-y-4">
                  {milestones.map((item, idx) => {
                    const isLive = nextMilestone && item.title === nextMilestone.title;
                    const isDone = new Date(item.date) <= now;
                    const status = isLive ? 'live' : isDone ? 'done' : 'upcoming';

                    return (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="relative flex items-center justify-center mt-1">
                          <div className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                            isLive 
                              ? 'border-[#05B1DE] bg-[#020008] shadow-[0_0_12px_#05B1DE]' 
                              : isDone 
                                ? 'border-[#05B1DE]/50 bg-[#05B1DE]' 
                                : 'border-zinc-800 bg-transparent'
                          }`}>
                            {isLive && <div className="h-1.5 w-1.5 rounded-full bg-[#05B1DE] animate-ping" />}
                          </div>
                        </div>
                        <div className={`w-full rounded-2xl border p-4 transition-all duration-300 ${phaseTone(status)}`}>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-bold uppercase tracking-[0.1em] eureka-heading">{item.title}</p>
                            <span className="text-[9px] uppercase tracking-[0.15em] font-semibold eureka-mono">{status}</span>
                          </div>
                          <p className="mt-1.5 text-[10px] text-zinc-500 eureka-mono">{item.displayDate} • {item.note}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Important Notices Section */}
              <div className="rounded-3xl border border-[#05B1DE]/20 bg-white/[0.01] p-6 backdrop-blur-md">
                <div className="mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#05B1DE]" />
                  <h4 className="text-sm font-black uppercase tracking-[0.18em] text-white eureka-heading">Important Notices</h4>
                </div>
                <div className="space-y-3">
                  {notices.map((notice, i) => (
                    <div key={i} className={`rounded-2xl border p-4 text-xs leading-relaxed eureka-mono ${noticeTone(notice.level)}`}>
                      {notice.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}