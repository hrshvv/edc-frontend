import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PurpleCurtain = ({ left, opacity, width, delay, className = '' }) => (
  <div
    className={`absolute top-0 h-full pointer-events-none ${className}`}
    style={{
      left: `${left}%`, width: `${width}px`,
      background: `linear-gradient(180deg,rgba(94,12,159,${opacity}) 0%,rgba(123,47,190,${opacity * .6}) 50%,transparent 100%)`,
      filter: 'blur(8px)',
      animation: `curtainPulse 4s ease-in-out ${delay}s infinite alternate`,
    }}
  />
);

const FloatingParticle = ({ delay, size, x, duration }) => (
  <div className="absolute rounded-full pointer-events-none"
    style={{
      width: size, height: size, left: `${x}%`, bottom: '-5%',
      background: 'radial-gradient(circle,rgba(215,118,255,.6) 0%,transparent 70%)',
      animation: `floatUp ${duration}s ease-in-out ${delay}s infinite`,
    }} />
);

/* ── 1. HERO ──────────────────────────────────────── */
const Hero = () => {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: .5, y: .5 });

  useEffect(() => {
    const fn = (e) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      setMousePos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  return (
    <section ref={heroRef} className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#000000]">
      <div className="absolute inset-0 fp-grid-bg pointer-events-none" />
      <PurpleCurtain left={8} opacity={.15} width={3} delay={0} className="hidden lg:block" />
      <PurpleCurtain left={32} opacity={.2} width={4} delay={1} />
      <PurpleCurtain left={68} opacity={.18} width={3} delay={.8} />

      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          left: `calc(${mousePos.x * 100}% - 300px)`,
          top: `calc(${mousePos.y * 100}% - 300px)`,
          background: 'radial-gradient(circle,rgba(94,12,159,.18) 0%,rgba(123,47,190,.07) 40%,transparent 70%)',
          transition: 'left .8s ease-out,top .8s ease-out',
        }} />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center,rgba(123,47,190,.22) 0%,transparent 65%)', filter: 'blur(40px)' }} />

      <FloatingParticle delay={0} size={6} x={15} duration={8} />
      <FloatingParticle delay={1.5} size={4} x={38} duration={10} />
      <FloatingParticle delay={3} size={8} x={62} duration={7} />
      <FloatingParticle delay={2} size={5} x={82} duration={9} />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7B2FBE]/30 bg-[#1B002B]/40 backdrop-blur-md mb-8"
          style={{ animation: 'fadeSlideUp .6s ease-out both' }}>
          <span className="w-2 h-2 rounded-full bg-[#D776FF] animate-pulse" />
          <span className="text-[10px] sm:text-xs tracking-[.22em] text-[#D776FF]/90 font-bold uppercase">
            Post-Event Recap · Founders Pit 2026
          </span>
        </div>

        <div style={{ animation: 'fadeSlideUp .8s ease-out .1s both' }}>
          <img
            src="https://res.cloudinary.com/dh8cqlngr/image/upload/q_auto/f_auto/v1774820657/Founder_s_Pit_kvfeqt.png"
            alt="Founder's Pit"
            className="mx-auto w-[85%] max-w-[620px] drop-shadow-[0_0_40px_rgba(123,47,190,.55)] object-contain pointer-events-none select-none"
          />
        </div>

        <p className="text-white/55 text-base sm:text-lg max-w-xl mx-auto mt-6 leading-relaxed"
          style={{ animation: 'fadeSlideUp .8s ease-out .2s both' }}>
          A high-intensity startup simulation where ideas are tested, built, and battle-proven.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-8"
          style={{ animation: 'fadeSlideUp .8s ease-out .3s both' }}>
          {[
            { icon: '📅', text: '18 April 2026' },
            { icon: '📍', text: 'AB3, Campus' },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B002B]/70 border border-[#7B2FBE]/40 backdrop-blur-md">
              <span>{m.icon}</span>
              <span className="text-white/80 text-sm font-semibold">{m.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-10" style={{ animation: 'fadeSlideUp .8s ease-out .45s both' }}>
          <button
            onClick={() => document.getElementById('about-fp')?.scrollIntoView({ behavior: 'smooth' })}
            className="group fp-btn-primary text-white font-bold text-base px-10 py-4 rounded-full inline-flex items-center gap-2">
            Explore
            <svg className="size-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full py-4 bg-[#1B002B]/80 backdrop-blur-xl border-t border-[#7B2FBE]/40 overflow-hidden flex flex-wrap justify-center gap-x-6 gap-y-2 px-4 z-20 shadow-[0_-15px_40px_rgba(123,47,190,.15)]">
        {['Live Startup Simulation', 'Strategic Bidding Portal', 'Real-Time Mentorship', 'Pitch to Experts', '5 Intense Rounds'].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <svg className="size-3.5 text-[#D776FF] fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            <span className="text-white/75 text-[10px] sm:text-xs font-bold tracking-widest uppercase">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ── 2. ABOUT ─────────────────────────────────────── */
const About = () => (
  <section id="about-fp" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#05000A] border-t border-[#7B2FBE]/20 overflow-hidden">
    <div className="absolute inset-0 fp-grid-bg opacity-20 pointer-events-none" />
    <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
      style={{ background: 'radial-gradient(circle,rgba(94,12,159,.18) 0%,transparent 70%)', filter: 'blur(80px)' }} />

    <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <span className="text-[#D776FF] font-bold tracking-[.22em] uppercase text-xs">About</span>
        <h2 className="text-4xl sm:text-6xl font-black text-white mt-4 leading-[1.05]">
          Where Ideas Get<br /><span className="fp-subtitle">Battle-Tested</span>
        </h2>
        <p className="text-white/60 text-base sm:text-lg leading-relaxed mt-6">
          Founder's Pit 2026 was successfully conducted as a <span className="text-white/90 font-semibold">high-intensity live startup simulation</span> event on <span className="text-white/90 font-semibold">18 April 2026</span> at <span className="text-white/90 font-semibold">AB3 Campus, JSS University Noida</span>.
        </p>
        <p className="text-white/60 text-base sm:text-lg leading-relaxed mt-4">
          Designed to provide participants with a real startup ecosystem experience, the event challenged teams to navigate the complete journey of building a startup — through gamified challenges, strategic decision-making, crisis-solving, teamwork, and final pitching.
        </p>
        <p className="text-white/60 text-base sm:text-lg leading-relaxed mt-4">
          A standout feature was the <span className="text-[#D776FF] font-semibold">strategic bidding portal</span> developed by the organising team, which added a dynamic, realistic layer to the entrepreneurial simulation — creating an immersive, competitive environment for aspiring innovators and future founders.
        </p>

        <div className="flex flex-col gap-3 mt-8">
          {[
            { label: 'THE BID', desc: 'Live auction using virtual capital to secure your chosen problem statement.' },
            { label: 'THE BUILD', desc: 'Design products, craft business models, navigate unexpected crises.' },
            { label: 'THE PITCH', desc: 'Present your battle-tested startup to industry judges under intense Q&A.' },
          ].map((p, i) => (
            <div key={i} className="fp-card p-4 rounded-2xl flex items-center gap-4">
              <div className="size-10 rounded-xl bg-[#5E0C9F]/40 flex items-center justify-center shrink-0 text-[#D776FF] font-black text-xs">0{i + 1}</div>
              <div>
                <h4 className="font-black text-white text-sm tracking-wider">{p.label}</h4>
                <p className="text-white/50 text-xs mt-0.5">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual card stack */}
      <div className="relative h-[420px] sm:h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B002B] to-[#3A036E] rounded-3xl fp-card overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#D776FF 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(215,118,255,.15)_0%,transparent_50%)] animate-pulse" />

          <div className="absolute top-8 left-8 right-8 bottom-8">
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="absolute right-0 top-0 w-[62%] bg-[#0A0014]/70 backdrop-blur-xl rounded-2xl border border-[#7B2FBE]/50 p-5 shadow-xl rotate-2">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[#D776FF]/80 text-xs font-bold uppercase tracking-wider">270+ Participants</span>
                <svg className="size-4 text-[#D776FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M23 6l-9.5 9.5-5-5L1 18" /></svg>
              </div>
              <div className="flex items-end gap-1.5 h-16 w-full">
                {[30, 50, 40, 70, 60, 90, 80].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-[#7B2FBE] to-[#D776FF] rounded-sm opacity-80" style={{ height: `${h}%` }} />
                ))}
              </div>
            </motion.div>

            <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
              className="absolute left-0 top-[22%] w-[60%] bg-gradient-to-br from-[#2D004F] to-[#120021] rounded-2xl border border-[#D776FF]/40 shadow-[0_0_40px_rgba(123,47,190,.4)] p-6 -rotate-3">
              <div className="h-3 w-1/2 bg-white/90 rounded-full mb-3" />
              <div className="h-2 w-3/4 bg-white/30 rounded-full mb-2" />
              <div className="h-2 w-5/6 bg-white/30 rounded-full mb-2" />
              <div className="h-2 w-2/3 bg-white/30 rounded-full mb-4" />
              <div className="flex justify-between items-center">
                <span className="text-[#D776FF] text-xs font-bold">Bidding Portal</span>
                <img src="https://res.cloudinary.com/dh8cqlngr/image/upload/q_auto/f_auto/v1774820657/Founder_s_Pit_kvfeqt.png" alt="FP" className="h-6 object-contain opacity-80" />
              </div>
            </motion.div>

            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 2 }}
              className="absolute right-2 bottom-0 w-[55%] bg-[#05000A]/80 backdrop-blur-md rounded-2xl border border-white/10 p-4 shadow-2xl rotate-1">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full border-2 border-dashed border-[#D776FF] flex items-center justify-center shrink-0">
                  <svg className="size-5 text-[#D776FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                </div>
                <div className="space-y-2 w-full">
                  <div className="text-white/70 text-xs font-bold">70+ Teams</div>
                  <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute -top-5 -right-5 fp-card p-3.5 rounded-xl backdrop-blur-xl z-40 shadow-[0_0_30px_rgba(215,118,255,.3)] border border-[#D776FF]/30">
          <svg className="size-7 text-[#D776FF]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" /></svg>
        </div>
      </div>
    </div>
  </section>
);

/* ── 3. THE EDGE ──────────────────────────────────── */
const TheEdge = () => {
  const edges = [
    {
      num: '01', title: 'Live Startup Simulation',
      desc: 'Not a theoretical exercise. Teams navigated every phase a real startup faces — problem identification, product building, business modelling, crisis response, and investor pitching.',
      icon: (<svg className="size-7 text-[#D776FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>),
    },
    {
      num: '02', title: 'Strategic Bidding Portal',
      desc: "A custom-built bidding portal unique to Founder's Pit. Teams used virtual capital to compete in a live auction for their preferred problem statement — strategy and economics from minute one.",
      icon: (<svg className="size-7 text-[#D776FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>),
    },
    {
      num: '03', title: 'Real-Time Mentorship',
      desc: 'Each team was paired with an industry mentor who provided live feedback, asked probing strategic questions, and guided teams on the viability of their startup models in the moment.',
      icon: (<svg className="size-7 text-[#D776FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>),
    },
    {
      num: '04', title: 'Crisis Simulation',
      desc: 'Mid-event, teams faced unexpected disruptions — economic shocks, competitor threats, operational failures. Adapt your strategy in real time or watch your startup crumble.',
      icon: (<svg className="size-7 text-[#D776FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" /></svg>),
    },
    {
      num: '05', title: 'Startup Ecosystem Experience',
      desc: 'From ideation to pitching, participants lived the full lifecycle of a startup in a single day — gaining firsthand exposure to the pressures, decisions, and pivots real founders face.',
      icon: (<svg className="size-7 text-[#D776FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" /></svg>),
    },
    {
      num: '06', title: 'Nurturing Future Founders',
      desc: 'Gamification, mentorship, and a competitive environment designed to unlock the entrepreneurial potential of first and second-year students — the next generation of innovators.',
      icon: (<svg className="size-7 text-[#D776FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" /></svg>),
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-[#000000] border-t border-[#7B2FBE]/15 relative overflow-hidden">
      <div className="absolute inset-0 fp-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(94,12,159,.2) 0%,transparent 65%)', filter: 'blur(60px)' }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#D776FF] font-bold tracking-[.22em] uppercase text-xs">What Sets It Apart</span>
          <h2 className="text-4xl sm:text-6xl font-black text-white mt-4">The <span className="fp-subtitle">Edge</span></h2>
          <p className="text-white/50 text-lg mt-4 max-w-2xl mx-auto">Six reasons Founder's Pit is unlike any other campus competition.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {edges.map((e, i) => (
            <div key={i} className="fp-card p-7 rounded-3xl group hover:-translate-y-1.5 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-[4rem] font-black text-[#D776FF]/5 group-hover:text-[#D776FF]/10 leading-none transition-colors select-none">{e.num}</div>
              <div className="size-12 rounded-xl bg-[#1B002B] border border-[#7B2FBE]/40 flex items-center justify-center mb-5 group-hover:border-[#D776FF]/50 transition-colors">{e.icon}</div>
              <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#D776FF] transition-colors">{e.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── 4. PARTICIPATION & REACH ─────────────────────── */
const ParticipationReach = () => {
  const stats = [
    { value: '70+', label: 'Teams Registered', sub: 'Teams registered for Round 1' },
    { value: '270+', label: 'Participants', sub: 'Students competed across all rounds' },
    { value: '100K+', label: 'Social Impressions', sub: 'Social media reach across platforms' },
    { value: '4000+', label: 'Page Views', sub: 'Views on the event page' },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-[#05000A] border-t border-[#7B2FBE]/20 relative overflow-hidden">
      <div className="absolute inset-0 fp-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(123,47,190,.12) 0%,transparent 65%)', filter: 'blur(80px)' }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#D776FF] font-bold tracking-[.22em] uppercase text-xs">Participation & Reach</span>
          <h2 className="text-4xl sm:text-6xl font-black text-white mt-4">The <span className="fp-subtitle">Numbers</span></h2>
          <p className="text-white/50 text-lg mt-4 max-w-2xl mx-auto">Founder's Pit 2026 brought together the brightest student founders under one roof.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <div key={i} className="fp-card p-6 sm:p-8 rounded-3xl text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#D776FF] to-[#7B2FBE] mb-1 leading-none">{s.value}</div>
              <div className="text-white font-bold text-sm sm:text-base mt-2 group-hover:text-[#D776FF] transition-colors">{s.label}</div>
              <div className="text-white/40 text-xs mt-1 leading-snug">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="fp-card rounded-3xl p-8 sm:p-10 border border-[#D776FF]/25">
          <h3 className="text-2xl font-black text-white mb-6 text-center">Who Could Enter <span className="fp-subtitle">The Pit</span></h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Campus Only', desc: 'Exclusively for JSS University & JSSATEN students.' },
              { num: '02', title: '1st & 2nd Year', desc: 'Freshers with ideas and sophomores ready to execute.' },
              { num: '03', title: 'Team of 2–4', desc: 'No solo warriors. Collaboration is mandatory in the Pit.' },
            ].map((e, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto size-14 bg-[#1B002B] rounded-full flex items-center justify-center border border-[#7B2FBE]/40 mb-3 text-[#D776FF] font-black text-sm">{e.num}</div>
                <h4 className="font-black text-white text-lg mb-1">{e.title}</h4>
                <p className="text-white/50 text-sm">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── 5. JUDGES & MENTORS ──────────────────────────── */
const JudgesMentors = () => {
  const judges = [
    {
      name: 'Mr. Manish Srivastava',
      title: 'CEO — Aurika Renewal Energy',
      subtitle: 'Founder & Principal Consultant — Shefcon Strategic Consulting',
      initials: 'MS',
      color: 'from-[#5E0C9F] to-[#7B2FBE]',
      // ↓ Replace this src with the actual image URL when ready
      photo: null,
    },
    {
      name: 'Mr. Sachin Jha',
      title: 'Co-founder',
      subtitle: 'Starkseek',
      initials: 'SJ',
      color: 'from-[#7B2FBE] to-[#904EB0]',
      photo: null,
    },
    {
      name: 'Mr. Vikas Saroj',
      title: 'Co-Founder & COO — Shyphan AI',
      subtitle: 'Zoho Certified Developer · Ex. President EDC JSS',
      initials: 'VS',
      color: 'from-[#3D006B] to-[#5E0C9F]',
      photo: null,
    },
  ];

  const mentors = [
    {
      name: 'Mr. Mukul Prajapati',
      title: 'Product Manager',
      subtitle: 'Octro Inc.',
      initials: 'MP',
      color: 'from-[#5E0C9F] to-[#8B3CBF]',
      photo: null,
    },
    {
      name: 'Mr. Moksha Kohli',
      title: 'Co-founder',
      subtitle: 'Genesis',
      initials: 'MK',
      color: 'from-[#6A0FAD] to-[#9B4EC8]',
      photo: null,
    },
    {
      name: 'Ms. Tanisha Bansal',
      title: 'Software Engineer',
      subtitle: '@SITA',
      initials: 'TB',
      color: 'from-[#4A0080] to-[#7B2FBE]',
      photo: null,
    },
  ];

  const PersonCard = ({ person, role }) => (
    <div className="fp-card rounded-3xl p-7 group hover:-translate-y-2 transition-transform duration-400 relative overflow-hidden">
      <div className="absolute top-5 right-5">
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${role === 'Judge' ? 'bg-[#D776FF]/10 text-[#D776FF] border-[#D776FF]/25' : 'bg-[#7B2FBE]/15 text-[#C9A3EF] border-[#7B2FBE]/30'}`}>
          {role}
        </span>
      </div>

      {/* Profile photo / placeholder */}
      <div className="mb-5 relative">
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="w-20 h-20 rounded-2xl object-cover object-top shadow-[0_0_25px_rgba(123,47,190,.4)]"
          />
        ) : (
          <div
            className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${person.color} flex flex-col items-center justify-center shadow-[0_0_25px_rgba(123,47,190,.4)] border-2 border-dashed border-white/20 relative overflow-hidden group-hover:border-[#D776FF]/50 transition-colors`}
            title="Replace person.photo with an image URL to show the photo here"
          >
            {/* Camera icon hint */}
            <svg className="size-6 text-white/30 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
            <span className="text-white/25 text-[9px] font-bold tracking-wider uppercase leading-none">Photo</span>
            {/* Initials watermark */}
            <span className="absolute bottom-1.5 right-2 text-white/20 font-black text-lg leading-none select-none">{person.initials}</span>
          </div>
        )}
      </div>

      <h3 className="text-xl font-black text-white group-hover:text-[#D776FF] transition-colors">{person.name}</h3>
      <p className="text-[#D776FF]/80 text-xs font-semibold mt-1 mb-1 tracking-wide">{person.title}</p>
      <p className="text-white/40 text-xs">{person.subtitle}</p>
    </div>
  );

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-[#05000A] border-t border-[#7B2FBE]/20 relative overflow-hidden">
      <div className="absolute inset-0 fp-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[480px] h-[480px] pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(94,12,159,.18) 0%,transparent 68%)', filter: 'blur(80px)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#D776FF] font-bold tracking-[.22em] uppercase text-xs">The Panel</span>
          <h2 className="text-4xl sm:text-6xl font-black text-white mt-4">Judges & <span className="fp-subtitle">Mentors</span></h2>
          <p className="text-white/50 text-lg mt-4 max-w-2xl mx-auto">Industry leaders who evaluated, challenged, and guided our founders through the Pit.</p>
        </div>

        <div className="mb-10">
          <h3 className="text-sm font-black text-white/50 uppercase tracking-[.3em] text-center mb-8">Our Judges</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {judges.map((j, i) => <PersonCard key={i} person={j} role="Judge" />)}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black text-white/50 uppercase tracking-[.3em] text-center mb-8">Our Mentors</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mentors.map((m, i) => <PersonCard key={i} person={m} role="Mentor" />)}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── 6. EVENT FLOW ────────────────────────────────── */
const TheGauntlet = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const rounds = [
    {
      label: 'ROUND 1',
      title: 'The Qualifier',
      format: 'Online · Pitch Deck Submission',
      stats: ['70+ registrations (270+ participants)', '27 shortlisted teams (100+ participants)'],
      desc: 'Teams submitted a structured deck identifying a real problem, proposed a solution, and demonstrated impact. The first chance to prove your worth and enter the Pit.',
      icon: (<svg className="size-8 text-[#D776FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>),
    },
    {
      label: 'ROUND 2',
      title: 'Strategic Bidding',
      format: 'Offline · Live Auction',
      stats: ['9 problem statements auctioned', '24 teams competed in the bidding war'],
      desc: 'Teams engaged in a live auction using virtual capital to select their desired problem statements from a curated list spanning diverse domains. Strategy and economics from the very first minute.',
      icon: (<svg className="size-8 text-[#D776FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>),
    },
    {
      label: 'ROUND 3',
      title: 'Build the Startup',
      format: 'Offline · Core Build Phase',
      stats: ['Each team paired with a dedicated mentor', 'Real-time feedback and strategic guidance'],
      desc: 'Teams developed a tangible product prototype, established a viable business model, and mapped out market strategy from scratch under an immense time crunch. Each team received real-time mentorship on the viability of their startup models.',
      icon: (<svg className="size-8 text-[#D776FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>),
    },
    {
      label: 'ROUND 4',
      title: 'Crisis Simulation',
      format: 'Offline · Real-Time Disruption',
      stats: ['Unexpected economic & operational crises', 'Entire strategy pivoted on the fly'],
      desc: 'Just when teams found their footing, real-time disruptions hit — economic shocks, sudden competitor moves, or operational crises. Teams had to rapidly pivot their entire strategy on the fly. Adaptability was the only currency.',
      icon: (<svg className="size-8 text-[#D776FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" /></svg>),
    },
    {
      label: 'ROUND 5',
      title: 'The Final Pitch',
      format: 'Offline · Investor-Style Pitch',
      stats: ['Elite panel of industry judges', 'Rigorous Q&A testing robustness of solutions'],
      desc: 'Teams presented their battle-tested startups to an elite panel of industry judges in a high-pressure investor-style format. Every decision, every pivot, every number — defended under intense scrutiny and a rigorous Q&A session.',
      icon: (<svg className="size-8 text-[#D776FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" /></svg>),
    },
  ];

  return (
    <section ref={containerRef} id="event-flow" className="py-32 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#000000] to-[#05000A] border-t border-[#7B2FBE]/20">
      <div className="absolute inset-0 fp-grid-bg opacity-20 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="text-[#D776FF] font-bold tracking-[.22em] uppercase text-xs">The Gauntlet</span>
          <h2 className="text-5xl sm:text-7xl font-black text-white mt-4">Event <span className="fp-subtitle">Flow</span></h2>
          <p className="text-white/50 text-xl mt-6 max-w-2xl mx-auto">Five rounds. Each testing a different dimension of entrepreneurial ability.</p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-[#1B002B] rounded-full hidden md:block" />
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-[#7B2FBE] via-[#D776FF] to-[#7B2FBE] rounded-full hidden md:block"
            style={{ height, filter: 'drop-shadow(0 0 15px #D776FF)' }}
          />

          <div className="space-y-24">
            {rounds.map((round, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-20 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <div className="fp-card p-8 sm:p-10 rounded-3xl w-full max-w-lg hover:-translate-y-2 transition-transform duration-500 border border-[#7B2FBE]/30 hover:border-[#D776FF]/70 group relative overflow-hidden bg-[#0A0014]/80 text-left">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D776FF]/10 text-[#D776FF] font-black text-xs tracking-widest border border-[#D776FF]/20">
                        {round.label}
                      </div>
                      <span className="text-white/35 text-xs">{round.format}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 group-hover:text-[#D776FF] transition-colors">{round.title}</h3>
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-5">{round.desc}</p>
                    <div className="space-y-2">
                      {round.stats.map((s, si) => (
                        <div key={si} className="flex items-center gap-2">
                          <div className="size-1.5 rounded-full bg-[#D776FF]" />
                          <span className="text-[#D776FF]/70 text-xs font-semibold">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex size-20 rounded-full border-4 border-[#05000A] bg-[#1B002B] shadow-[0_0_30px_rgba(123,47,190,.5)] z-10 items-center justify-center hover:scale-110 transition-transform duration-300">
                  {round.icon}
                </div>

                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── PHOTO HIGHLIGHTS ───────────────────────────── */
const PhotoHighlights = () => (
  <section className="py-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#05000A] to-[#000000]">
    <div className="absolute inset-0 fp-grid-bg opacity-10 pointer-events-none" />
    <div className="max-w-5xl mx-auto relative z-10">
      <div className="text-center mb-14">
        <span className="text-[#D776FF] font-bold tracking-[0.2em] uppercase text-xs">The Pit in Action</span>
        <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
          Event <span className="fp-subtitle">Highlights</span>
        </h2>
        <p className="text-white/40 mt-4 max-w-xl mx-auto text-base">
          A glimpse into the chaos, strategy, and energy of Founder's Pit 2026.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { src: '/images/Founder_s%20Pit.jpeg', alt: "Founder's Pit 2026" },
          { src: '/images/Founder_s%20Pit%20image%202.jpeg', alt: "Founder's Pit 2026 — pitching round" },
          { src: '/images/Founder_s%20Pit%20image%203.png', alt: "Founder's Pit 2026 — UI/UX workshop" },
        ].map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-2xl overflow-hidden border border-[#7B2FBE]/20 hover:border-[#D776FF]/40 transition-all duration-500 aspect-[4/3]"
            style={{ boxShadow: '0 0 0 1px rgba(123,47,190,0.1)' }}
          >
            <img src={img.src} alt="" aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover scale-110"
              style={{ filter: 'blur(20px) brightness(0.3) saturate(1.4)' }}
            />
            <img src={img.src} alt={img.alt}
              className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0A0014]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{ boxShadow: 'inset 0 0 60px 0 rgba(215,118,255,0.12)' }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── FOOTER ───────────────────────────────────────── */
const Footer = () => (
  <footer className="py-10 px-4 bg-[#000000] border-t border-[#7B2FBE]/20 text-center">
    <img
      src="https://res.cloudinary.com/dh8cqlngr/image/upload/q_auto/f_auto/v1774820657/Founder_s_Pit_kvfeqt.png"
      alt="Founder's Pit"
      className="h-8 object-contain mx-auto mb-4 opacity-60"
    />
    <p className="text-white/30 text-xs">© 2026 EDC, JSS University Noida · Founder's Pit · All rights reserved.</p>
  </footer>
);

/* ── ROOT ─────────────────────────────────────────── */
export default function FP_EventPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          10%  { opacity: .8; }
          90%  { opacity: .2; }
          100% { transform: translateY(-100vh) scale(.3); opacity: 0; }
        }
        @keyframes curtainPulse {
          0%   { opacity: .3; transform: scaleY(.95); }
          100% { opacity: .7; transform: scaleY(1.05); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gridMove {
          0%   { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .fp-subtitle {
          background: linear-gradient(90deg, #904EB0, #D776FF, #904EB0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .fp-card {
          background: linear-gradient(135deg, rgba(27,0,43,.8) 0%, rgba(36,0,64,.6) 100%);
          border: 1px solid rgba(123,47,190,.2);
          backdrop-filter: blur(20px);
          animation: borderGlow 4s ease-in-out infinite;
          transition: all .4s cubic-bezier(.4,0,.2,1);
        }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(123,47,190,.2); }
          50%      { border-color: rgba(215,118,255,.35); }
        }
        .fp-card:hover {
          border-color: rgba(215,118,255,.5);
          box-shadow: 0 20px 40px rgba(94,12,159,.25), 0 0 30px rgba(215,118,255,.08);
        }
        .fp-btn-primary {
          background: linear-gradient(135deg, #5E0C9F 0%, #7B2FBE 50%, #904EB0 100%);
          box-shadow: 0 4px 20px rgba(94,12,159,.4);
          transition: all .3s ease;
          border: none;
          cursor: pointer;
        }
        .fp-btn-primary:hover {
          box-shadow: 0 8px 30px rgba(123,47,190,.6), 0 0 20px rgba(215,118,255,.3);
          transform: scale(1.04);
        }
        .fp-grid-bg {
          background-image:
            linear-gradient(rgba(123,47,190,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123,47,190,.05) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridMove 20s linear infinite;
        }
      `}</style>

      <div className="w-full min-h-screen bg-[#000000] text-white overflow-hidden font-sans">
        <Hero />
        <About />
        <TheEdge />
        <ParticipationReach />
        <JudgesMentors />
        <TheGauntlet />
        <PhotoHighlights />
        <Footer />
      </div>
    </>
  );
}