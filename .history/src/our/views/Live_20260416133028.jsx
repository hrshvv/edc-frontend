import React, { useEffect, useMemo, useState } from 'react';
import Footer from '../components/Footer';

const EVENT_DATE = '2026-04-16';

const schedule = [
  {
    title: 'Registration',
    start: '08:30',
    end: '09:00',
    round: null,
  },
  {
    title: 'Inauguration and Briefing',
    start: '09:00',
    end: '10:15',
    round: null,
  },
  {
    title: 'Strategic Bidding',
    start: '10:15',
    end: '11:15',
    round: 'Round 2',
  },
  {
    title: 'Building Phase I',
    start: '11:30',
    end: '13:00',
    round: 'Round 3',
  },
  {
    title: 'Mentoring Round',
    start: '13:00',
    end: '14:00',
    round: null,
  },
  {
    title: 'Lunch Break',
    start: '14:00',
    end: '14:30',
    round: null,
  },
  {
    title: 'Crisis Round and Building Phase 2',
    start: '14:30',
    end: '16:00',
    round: 'Round 4',
  },
  {
    title: 'Final Judging and Pitching',
    start: '16:00',
    end: '17:30',
    round: 'Round 5',
  },
  {
    title: 'Awards Ceremony',
    start: '17:30',
    end: '18:00',
    round: null,
  },
];

const notices = [
  {
    type: 'info',
    text: 'Please report 10 minutes before your next round starts.',
  },
  {
    type: 'alert',
    text: 'Judging windows are strict. Late entries may not be considered.',
  },
  {
    type: 'update',
    text: 'Live board refreshes every second. Keep this page open during the event.',
  },
];

function timeToDate(baseDate, time) {
  const [hours, minutes] = time.split(':').map(Number);
  const d = new Date(baseDate);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, '0');
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

function getNoticeStyles(type) {
  if (type === 'alert') {
    return {
      pill: 'bg-red-500/20 text-red-200 border border-red-400/40',
      card: 'border-red-400/25 bg-red-500/10',
      label: 'Alert',
    };
  }

  if (type === 'update') {
    return {
      pill: 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/40',
      card: 'border-emerald-400/25 bg-emerald-500/10',
      label: 'Update',
    };
  }

  return {
    pill: 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40',
    card: 'border-cyan-400/25 bg-cyan-500/10',
    label: 'Info',
  };
}

export default function Live() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const eventDate = useMemo(() => {
    const parsed = new Date(`${EVENT_DATE}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }, []);

  const timeline = useMemo(() => {
    return schedule.map((item) => ({
      ...item,
      startAt: timeToDate(eventDate, item.start),
      endAt: timeToDate(eventDate, item.end),
    }));
  }, [eventDate]);

  const dayStart = timeline[0]?.startAt;
  const dayEnd = timeline[timeline.length - 1]?.endAt;

  const currentItem =
    timeline.find((item) => now >= item.startAt && now < item.endAt) || null;
  const nextItem = timeline.find((item) => now < item.startAt) || null;
  const eventStarted = dayStart ? now >= dayStart : false;
  const eventFinished = dayEnd ? now >= dayEnd : false;

  const countdownTarget = currentItem?.endAt || nextItem?.startAt || dayEnd;
  const countdownLabel = currentItem
    ? 'Time left in current slot'
    : !eventStarted
      ? 'Time until event starts'
      : eventFinished
        ? 'Event day completed'
        : 'Time until next slot';

  const countdownMs = countdownTarget ? countdownTarget - now : 0;

  const totalMs = dayStart && dayEnd ? dayEnd - dayStart : 0;
  const elapsedMs = dayStart && dayEnd ? Math.min(Math.max(now - dayStart, 0), totalMs) : 0;
  const eventProgress = totalMs > 0 ? (elapsedMs / totalMs) * 100 : 0;

  const statusText = currentItem
    ? `${currentItem.title}${currentItem.round ? ` (${currentItem.round})` : ''}`
    : !eventStarted
      ? 'Event has not started yet'
      : eventFinished
        ? 'All rounds completed'
        : 'Waiting for next round';

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-4 pb-14 pt-24 md:px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-[-120px] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute bottom-[-140px] left-[-120px] h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl space-y-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
            <p className="mb-3 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Live Control Room
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              Event Day Live Timeline
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-zinc-300 md:text-base">
              Track the full event flow in real-time, check which round is active,
              and stay updated with important notices.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Current Time</p>
                <p className="mt-2 text-2xl font-semibold text-cyan-300">{formatClock(now)}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 md:col-span-2">
                <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Current Status</p>
                <p className="mt-2 text-lg font-semibold text-white md:text-xl">{statusText}</p>
                {nextItem && !currentItem ? (
                  <p className="mt-1 text-sm text-zinc-400">
                    Next: {nextItem.start} - {nextItem.end} | {nextItem.title}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">{countdownLabel}</p>
              <p className="mt-2 text-4xl font-bold text-cyan-300 md:text-5xl">
                {eventFinished ? '00:00:00' : formatDuration(countdownMs)}
              </p>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
                  <span>Event Day Progress</span>
                  <span>{Math.round(eventProgress)}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                    style={{ width: `${eventProgress}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-zinc-500">
                  <span>{timeline[0]?.start || '--:--'}</span>
                  <span>{timeline[timeline.length - 1]?.end || '--:--'}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Important Notices</p>
              <div className="mt-4 space-y-3">
                {notices.map((notice, idx) => {
                  const styles = getNoticeStyles(notice.type);

                  return (
                    <div key={`${notice.type}-${idx}`} className={`rounded-xl border p-3 ${styles.card}`}>
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${styles.pill}`}>
                        {styles.label}
                      </span>
                      <p className="mt-2 text-sm text-zinc-100">{notice.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold">Full Day Timeline</h2>
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">
                Date: {new Date(`${EVENT_DATE}T00:00:00`).toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-3">
              {timeline.map((item, idx) => {
                const isLive = now >= item.startAt && now < item.endAt;
                const isDone = now >= item.endAt;
                const isUpcoming = now < item.startAt;

                return (
                  <div
                    key={`${item.title}-${item.start}`}
                    className={`rounded-2xl border p-4 transition-all ${
                      isLive
                        ? 'border-cyan-300/60 bg-cyan-500/10'
                        : isDone
                          ? 'border-emerald-300/25 bg-emerald-500/10'
                          : 'border-white/10 bg-black/25'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm text-zinc-400">
                          {item.start} - {item.end}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.round ? (
                          <span className="rounded-full border border-cyan-300/40 bg-cyan-500/20 px-2.5 py-1 text-xs font-semibold text-cyan-200">
                            {item.round}
                          </span>
                        ) : null}

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            isLive
                              ? 'bg-cyan-400/25 text-cyan-100'
                              : isDone
                                ? 'bg-emerald-400/20 text-emerald-100'
                                : isUpcoming
                                  ? 'bg-zinc-500/25 text-zinc-200'
                                  : 'bg-zinc-500/25 text-zinc-200'
                          }`}
                        >
                          {isLive ? 'Live Now' : isDone ? 'Completed' : 'Upcoming'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
