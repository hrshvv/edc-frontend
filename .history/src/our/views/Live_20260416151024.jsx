import React, { useEffect, useMemo, useState } from 'react';
import Footer from '../components/Footer';

const EVENT_DATE = '2026-04-18';

const schedule = [
  { title: 'Registration', start: '08:30', end: '09:00', phase: 'Round 1' },
  { title: 'Inauguration and Briefing', start: '09:00', end: '10:15', phase: 'Round 1' },
  { title: 'Strategic Bidding', start: '10:15', end: '11:15', phase: 'Round 2' },
  { title: 'Building Phase I', start: '11:30', end: '13:00', phase: 'Round 3' },
  { title: 'Mentoring Round', start: '13:00', end: '14:00', phase: 'Round 3' },
  { title: 'Lunch Break', start: '14:00', end: '14:30', phase: 'Break' },
  { title: 'Crisis Round and Building Phase 2', start: '14:30', end: '16:00', phase: 'Round 4' },
  { title: 'Final Judging and Pitching', start: '16:00', end: '17:30', phase: 'Round 5' },
  { title: 'Awards Ceremony', start: '17:30', end: '18:00', phase: 'Closing' },
];

const notices = [
  { level: 'priority', text: 'Code freeze applies when final judging starts. Keep your final build ready.' },
  { level: 'info', text: 'Teams should remain available near the pitching area during Round 5.' },
  { level: 'update', text: 'This board updates every second and highlights the active phase live.' },
];

function timeToDate(baseDate, time) {
  const [hours, minutes] = time.split(':').map(Number);
  const d = new Date(baseDate);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function formatClock(date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function phaseTone(status) {
  if (status === 'live') {
    return 'text-[#E0A6FF] border-[#D776FF]/40 bg-[#7B2FBE]/20';
  }

  if (status === 'done') {
    return 'text-zinc-400 border-[#3B1657]/70 bg-[#130321]/45';
  }

  return 'text-zinc-200 border-[#4C1C73]/70 bg-[#160628]/55';
}

function noticeTone(level) {
  if (level === 'priority') {
    return 'border-[#D776FF]/35 bg-[#7B2FBE]/20 text-[#F3DEFF]';
  }

  if (level === 'update') {
    return 'border-[#904EB0]/35 bg-[#5E0C9F]/20 text-[#EACBFF]';
  }

  return 'border-[#7B2FBE]/40 bg-[#3B1657]/25 text-[#E8D3FF]';
}

export default function Live() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    document.documentElement.classList.add('founders-pit-theme');
    return () => {
      document.documentElement.classList.remove('founders-pit-theme');
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const eventDate = useMemo(() => {
    const parsed = new Date(`${EVENT_DATE}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }, []);

  const liveWindowEnd = useMemo(() => {
    const next = new Date(eventDate);
    next.setDate(next.getDate() + 1);
    return next;
  }, [eventDate]);

  const isBeforeLiveDay = now < eventDate;
  const isAfterLiveDay = now >= liveWindowEnd;
  const isLiveDay = !isBeforeLiveDay && !isAfterLiveDay;

  const timeline = useMemo(
    () =>
      schedule.map((item) => ({
        ...item,
        startAt: timeToDate(eventDate, item.start),
        endAt: timeToDate(eventDate, item.end),
      })),
    [eventDate]
  );

  const dayStart = timeline[0]?.startAt;
  const dayEnd = timeline[timeline.length - 1]?.endAt;
  const currentItem =
    isLiveDay
      ? timeline.find((item) => now >= item.startAt && now < item.endAt) || null
      : null;
  const nextItem =
    isLiveDay
      ? timeline.find((item) => now < item.startAt) || null
      : timeline[0] || null;
  const eventStarted = isLiveDay && dayStart ? now >= dayStart : false;
  const eventFinished = isLiveDay && dayEnd ? now >= dayEnd : false;

  const countdownTarget = isBeforeLiveDay
    ? eventDate
    : isAfterLiveDay
      ? null
      : currentItem?.endAt || nextItem?.startAt || dayEnd;
  const countdownMs = countdownTarget ? countdownTarget - now : 0;

  const totalMs = dayStart && dayEnd ? dayEnd - dayStart : 0;
  const elapsedMs = dayStart && dayEnd ? Math.min(Math.max(now - dayStart, 0), totalMs) : 0;
  const progress = isBeforeLiveDay ? 0 : isAfterLiveDay ? 100 : totalMs > 0 ? (elapsedMs / totalMs) * 100 : 0;

  const phaseHeader = isBeforeLiveDay
    ? 'Live unlocks on 18 April'
    : isAfterLiveDay
      ? 'Live closed for the day'
      : currentItem
        ? `${currentItem.phase} in progress`
        : !eventStarted
          ? 'Event not started'
          : eventFinished
            ? 'Event concluded'
            : 'Waiting for next phase';

  const mainHeadline = isBeforeLiveDay
    ? 'LIVE LOCKED'
    : isAfterLiveDay
      ? 'LIVE CLOSED'
      : eventFinished
        ? 'TIME IS UP'
        : currentItem
          ? currentItem.phase.toUpperCase()
          : !eventStarted
            ? 'STANDBY'
            : 'NEXT PHASE INCOMING';

  const subHeadline = isBeforeLiveDay
    ? 'This portal activates only on 18 April 2026.'
    : isAfterLiveDay
      ? 'The live window has ended for this event day.'
      : eventFinished
        ? 'Code freeze activated. Prepare for demo.'
        : currentItem
          ? `${currentItem.title} is live now.`
          : !eventStarted
            ? 'Live system armed. Waiting for opening bell.'
            : `Next: ${nextItem?.title || 'Upcoming phase'}`;

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <section className="relative overflow-hidden px-4 pb-14 pt-22 md:px-6 md:pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(215,118,255,0.2),transparent_34%),radial-gradient(circle_at_80%_8%,rgba(94,12,159,0.26),transparent_30%),linear-gradient(to_bottom,rgba(0,0,0,0.95),rgba(5,0,10,1))]" />
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(123,47,190,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(123,47,190,0.13)_1px,transparent_1px)] [background-size:34px_34px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#7B2FBE]/35 bg-[#0A0014]/80 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-[#D776FF] shadow-[0_0_10px_rgba(215,118,255,0.95)]" />
              Live system synced
            </div>
            <div className="text-xs uppercase tracking-[0.15em] text-[#D776FF]">Main portal</div>
          </div>

          <h1 className="mb-6 text-3xl font-black uppercase leading-tight tracking-[0.05em] text-transparent md:text-6xl md:leading-[1.05] bg-gradient-to-r from-white via-[#D776FF] to-[#E0A6FF] bg-clip-text">
            Founders Pit Live 2026
          </h1>

          <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
            <div className="rounded-3xl border border-[#7B2FBE]/60 bg-[#060012]/90 p-4 shadow-[0_0_0_1px_rgba(123,47,190,0.2),0_24px_80px_rgba(0,0,0,0.7)] md:p-6">
              <div className="rounded-full border border-[#D776FF]/40 bg-[#7B2FBE]/20 px-4 py-1 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-[#EACBFF] md:inline-flex">
                {isBeforeLiveDay
                  ? 'Mission locked'
                  : isAfterLiveDay
                    ? 'Mission archived'
                    : eventFinished
                      ? 'Mission concluded'
                      : 'Mission in progress'}
              </div>

              <div className="mt-8 rounded-2xl border border-[#904EB0]/30 bg-[#0B0318] px-4 py-8 text-center md:px-10 md:py-14">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Current phase</p>
                <h2 className={`mt-3 text-4xl font-black uppercase tracking-[0.04em] md:text-7xl ${eventFinished ? 'text-[#E0A6FF]' : 'text-[#D776FF]'}`}>
                  {mainHeadline}
                </h2>
                <p className="mt-4 text-sm uppercase tracking-[0.2em] text-zinc-300 md:text-base">
                  {subHeadline}
                </p>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-[#7B2FBE]/25 bg-[#0A0218] p-3">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-zinc-500">Live clock</p>
                  <p className="mt-1 text-xl font-semibold text-[#D776FF]">{formatClock(now)}</p>
                </div>
                <div className="rounded-xl border border-[#7B2FBE]/25 bg-[#0A0218] p-3">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-zinc-500">Countdown</p>
                  <p className={`mt-1 text-xl font-semibold ${eventFinished ? 'text-[#E0A6FF]' : 'text-[#EACBFF]'}`}>
                    {isAfterLiveDay || countdownTarget === null ? '00:00:00' : formatDuration(countdownMs)}
                  </p>
                </div>
                <div className="rounded-xl border border-[#7B2FBE]/25 bg-[#0A0218] p-3">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-zinc-500">Phase status</p>
                  <p className={`mt-1 text-sm font-semibold uppercase tracking-[0.15em] ${eventFinished ? 'text-[#E0A6FF]' : 'text-[#D776FF]'}`}>
                    {phaseHeader}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-zinc-500">
                  <span>Whole day progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#5E0C9F] via-[#7B2FBE] to-[#D776FF] transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl border border-[#7B2FBE]/30 bg-[#0A0014]/85 p-5 backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">Current phase</p>
                <h3 className={`mt-2 text-3xl font-black uppercase leading-tight ${eventFinished || isAfterLiveDay ? 'text-[#E0A6FF]' : 'text-[#D776FF]'}`}>
                  {isBeforeLiveDay
                    ? 'Live locked'
                    : isAfterLiveDay
                      ? 'Live closed'
                      : eventFinished
                        ? 'Event concluded'
                        : currentItem
                          ? currentItem.title
                          : 'Awaiting launch'}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  {isBeforeLiveDay
                    ? 'Live tracking opens on 18 April 2026.'
                    : isAfterLiveDay
                      ? 'Live tracking is available only on 18 April 2026.'
                      : eventFinished
                        ? 'The event has ended. Results will be announced soon.'
                        : currentItem
                          ? `${currentItem.start} - ${currentItem.end}`
                          : nextItem
                            ? `Next slot starts at ${nextItem.start}`
                            : 'No more slots remaining.'}
                </p>
              </div>

              <div className="rounded-3xl border border-[#7B2FBE]/30 bg-[#0A0014]/85 p-5 backdrop-blur-md">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-200">Event flow</h4>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-zinc-500">Schedule</span>
                </div>

                <div className="space-y-3">
                  {timeline.map((item) => {
                    const isLive = isLiveDay && now >= item.startAt && now < item.endAt;
                    const isDone = (isLiveDay && now >= item.endAt) || isAfterLiveDay;
                    const status = isLive ? 'live' : isDone ? 'done' : 'upcoming';

                    return (
                      <div key={`${item.title}-${item.start}`} className="flex items-start gap-3">
                        <div className={`mt-1 h-3 w-3 rounded-full border ${isLive ? 'border-[#D776FF] bg-[#D776FF] shadow-[0_0_8px_rgba(215,118,255,0.95)]' : isDone ? 'border-[#3B1657] bg-[#3B1657]' : 'border-[#7B2FBE] bg-transparent'}`} />
                        <div className={`w-full rounded-xl border px-3 py-2 ${phaseTone(status)}`}>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em]">{item.title}</p>
                            <span className="text-[10px] uppercase tracking-[0.14em]">{status}</span>
                          </div>
                          <p className="mt-1 text-[11px] text-zinc-400">{item.start} - {item.end}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl border border-[#7B2FBE]/30 bg-[#0A0014]/85 p-5 backdrop-blur-md">
                <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-200">Important notices</h4>
                <div className="mt-3 space-y-2.5">
                  {notices.map((notice, i) => (
                    <div key={`${notice.level}-${i}`} className={`rounded-xl border p-3 text-xs leading-relaxed ${noticeTone(notice.level)}`}>
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
