import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { 
  Info, Calendar, MapPin, Users, Lightbulb, ArrowRight, Sparkles, Zap, Target, TrendingUp, 
  ShieldCheck, Upload, Clock, Phone, Mail, Instagram, MessageCircle, AlertTriangle, FileText, CheckCircle2, ChevronRight, Check, Trophy, Medal, Gift
} from 'lucide-react';
import { MarqueeAnimation } from '@/components/ui/marquee-effect';
import LightRays from '../../components/LightRays';

/* ──────────────────── Theme Elements ──────────────────── */
const FloatingParticle = ({ delay, size, x, duration }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      bottom: '-5%',
      background: `radial-gradient(circle, rgba(215,118,255,0.6) 0%, transparent 70%)`,
      animation: `floatUp ${duration}s ease-in-out ${delay}s infinite`,
    }}
  />
);

const PurpleCurtain = ({ left, opacity, width, delay, className }) => (
  <div
    className={cn("absolute top-0 h-full pointer-events-none", className)}
    style={{
      left: `${left}%`,
      width: `${width}px`,
      background: `linear-gradient(180deg, rgba(94,12,159,${opacity}) 0%, rgba(123,47,190,${opacity * 0.6}) 50%, transparent 100%)`,
      filter: 'blur(8px)',
      animation: `curtainPulse 4s ease-in-out ${delay}s infinite alternate`,
    }}
  />
);

/* ──────────────────── Huge Timeline Component ──────────────────── */
const HugeTimeline = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const rounds = [
        { title: "The Qualifier (ONLINE)", label: "ROUND 1", desc: "Short deck submission identifying a real problem. Ensure zero plagiarism. This is your first chance to prove your worth and enter the Pit.", icon: Target },
        { title: "Strategic Bidding (OFFLINE)", label: "ROUND 2", desc: "Teams engage in a live auction using virtual capital to select their desired problem statements from a curated list. Resources are scarce, strategy is key.", icon: Zap },
        { title: "Build the Startup (OFFLINE)", label: "ROUND 3", desc: "The core challenge. Develop a tangible product prototype, establish a viable business model, and map out your market strategy from scratch within an immense time crunch.", icon: TrendingUp },
        { title: "Crisis Simulation (OFFLINE)", label: "ROUND 4", desc: "Just when you think you're settled, real-time disruptions hit. Teams must rapidly respond to unforeseen economic or operational crises and pivot their entire strategy on the fly.", icon: AlertTriangle },
        { title: "The Final Pitch (OFFLINE)", label: "ROUND 5", desc: "Survive the gauntlet to reach the finale. Present your newly battle-tested startup and defend your decisions to an elite panel of industry judges.", icon: MessageCircle }
    ];

    return (
        <section ref={containerRef} className="py-32 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#000000] to-[#05000A]">
            <div className="absolute inset-0 fp-grid-bg opacity-20 pointer-events-none"></div>
            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-24">
                    <span className="text-[#D776FF] font-bold tracking-[0.2em] uppercase text-xs">The Gauntlet</span>
                    <h2 className="text-5xl sm:text-7xl font-black text-white mt-4">The <span className="fp-subtitle">Five Rounds</span></h2>
                    <p className="text-white/50 text-xl mt-6 max-w-2xl mx-auto">Every round tests a different dimension of entrepreneurial ability. A true test of execution down to the wire.</p>
                </div>
                
                <div className="relative">
                    {/* Background static line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-[#1B002B] rounded-full hidden md:block"></div>
                    
                    {/* Animated glowing line */}
                    <motion.div 
                        className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-[#7B2FBE] via-[#D776FF] to-[#7B2FBE] rounded-full hidden md:block"
                        style={{ height, filter: 'drop-shadow(0 0 15px #D776FF)' }}
                    ></motion.div>

                    <div className="space-y-24">
                        {rounds.map((round, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-20 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                
                                {/* Content Card */}
                                <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                    <div className="fp-card p-8 sm:p-10 rounded-3xl w-full max-w-lg hover:-translate-y-2 transition-transform duration-500 border border-[#7B2FBE]/30 hover:border-[#D776FF]/70 group relative overflow-hidden bg-[#0A0014]/80 text-left">
                                        <div className="absolute -top-10 -right-10 p-3 opacity-5 group-hover:opacity-20 transition-opacity duration-700 blur-2xl pointer-events-none">
                                           <round.icon className="h-64 w-64 text-[#D776FF]" />
                                        </div>
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D776FF]/10 text-[#D776FF] font-black text-xs tracking-widest mb-6 border border-[#D776FF]/20">
                                            {round.label}
                                        </div>
                                        <h3 className="text-3xl font-black text-white mb-4 relative z-10 group-hover:text-[#D776FF] transition-colors">{round.title}</h3>
                                        <p className="text-white/60 text-base sm:text-lg leading-relaxed relative z-10">{round.desc}</p>
                                    </div>
                                </div>

                                {/* Center Node */}
                                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center size-20 rounded-full border-4 border-[#05000A] bg-[#1B002B] shadow-[0_0_30px_rgba(123,47,190,0.4)] z-10 hidden md:flex transition-transform hover:scale-110 duration-300">
                                    <round.icon className="size-8 text-[#D776FF]" />
                                </div>

                                {/* Empty space for alternating layout */}
                                <div className="hidden md:block w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const REG_OPEN_AT = new Date('2026-04-06T00:00:00+05:30');
const REG_CLOSE_AT = new Date('2026-04-13T23:59:59+05:30');
const ROUND1_DEADLINE_AT = new Date('2026-04-13T23:59:59+05:30');
const EVALUATION_START_AT = new Date('2026-04-13T00:00:00+05:30');
const RESULTS_AT = null;

const FP_TIMELINE = [
  { title: 'Registration Opens', dateLabel: '06/04/2026', at: REG_OPEN_AT },
  { title: 'Registration Closes', dateLabel: '13/04/2026', at: REG_CLOSE_AT },
  { title: 'Round 1 Submission Deadline', dateLabel: '13/04/2026', at: ROUND1_DEADLINE_AT },
  { title: 'Evaluation Period', dateLabel: 'Starts from 13/04/2026', at: EVALUATION_START_AT },
  { title: 'Results Announcement', dateLabel: 'TBD', at: RESULTS_AT },
  { title: 'Event Date', dateLabel: 'TBD', at: null },
];

const getEventPhase = (now) => {
  if (now < REG_OPEN_AT) return 'pre_launch';
  if (now <= REG_CLOSE_AT) return 'registration_open';
  if (!RESULTS_AT) return 'evaluation';
  if (now < RESULTS_AT) return 'evaluation';
  return 'results';
};

const getCountdownTarget = (now) => {
  if (now < REG_OPEN_AT) {
    return { label: 'Registration Opens In', target: REG_OPEN_AT };
  }
  if (now <= REG_CLOSE_AT) {
    return { label: 'Registration Closes In', target: REG_CLOSE_AT };
  }
  return null;
};

const formatCountdown = (diffMs) => {
  const total = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { days, hours, minutes, seconds };
};

/* ──────────────────── Main Component ──────────────────── */
const FoundersPit = () => {
  // Date-driven phases: "pre_launch", "registration_open", "evaluation", "results"
  const [now, setNow] = useState(() => new Date());
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFaq, setActiveFaq] = useState(null);
  const heroRef = useRef(null);

  const eventPhase = getEventPhase(now);
  const countdownConfig = getCountdownTarget(now);
  const countdown = countdownConfig
    ? formatCountdown(countdownConfig.target.getTime() - now.getTime())
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('founders-pit-theme');
    return () => {
      document.documentElement.classList.remove('founders-pit-theme');
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const executeScroll = (id) => {
    const el = document.getElementById(id);
    if(el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroCta = () => {
    if (eventPhase === "registration_open") {
      window.open('https://events.edcjssun.com/events/founders-pit-2026', '_blank');
      return;
    }
    executeScroll("battle-timeline");
  };

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.2; }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }
        @keyframes curtainPulse {
          0%   { opacity: 0.3; transform: scaleY(0.95); }
          100% { opacity: 0.7; transform: scaleY(1.05); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; filter: blur(60px); }
          50%      { opacity: 0.7; filter: blur(80px); }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(123,47,190,0.2); }
          50%      { border-color: rgba(215,118,255,0.4); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(215,118,255,0.3), 0 0 40px rgba(94,12,159,0.2); }
          50%      { text-shadow: 0 0 30px rgba(215,118,255,0.5), 0 0 60px rgba(94,12,159,0.3); }
        }
        @keyframes gridMove {
          0%   { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .fp-title {
          background: linear-gradient(135deg, #FFFFFF 0%, #D776FF 40%, #E0A6FF 60%, #FFFFFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: textGlow 3s ease-in-out infinite;
        }
        .fp-subtitle {
          background: linear-gradient(90deg, #904EB0, #D776FF, #904EB0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .fp-card {
          background: linear-gradient(135deg, rgba(27,0,43,0.8) 0%, rgba(36,0,64,0.6) 100%);
          border: 1px solid rgba(123,47,190,0.2);
          backdrop-filter: blur(20px);
          animation: borderGlow 4s ease-in-out infinite;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .fp-card:hover {
          border-color: rgba(215,118,255,0.5);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(94,12,159,0.3), 0 0 30px rgba(215,118,255,0.1);
        }
        .fp-btn-primary {
          background: linear-gradient(135deg, #5E0C9F 0%, #7B2FBE 50%, #904EB0 100%);
          box-shadow: 0 4px 20px rgba(94,12,159,0.4);
          transition: all 0.3s ease;
        }
        .fp-btn-primary:hover {
          box-shadow: 0 8px 30px rgba(123,47,190,0.6), 0 0 20px rgba(215,118,255,0.3);
          transform: scale(1.05);
        }
        .fp-grid-bg {
          background-image: 
            linear-gradient(rgba(123,47,190,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123,47,190,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridMove 20s linear infinite;
        }
        .timeline-bullet {
          box-shadow: 0 0 15px rgba(215,118,255,0.5);
        }
      `}</style>

      <div className="w-full min-h-screen bg-[#000000] text-white overflow-hidden pb-10 sm:pb-0 font-sans">

        {/* 1. HERO SECTION ══════════ */}
        <div ref={heroRef} className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
          <div className="absolute inset-0 fp-grid-bg pointer-events-none" />
          <PurpleCurtain left={8} opacity={0.15} width={3} delay={0} className="hidden lg:block" />
          <PurpleCurtain left={32} opacity={0.2} width={4} delay={1} />
          <PurpleCurtain left={68} opacity={0.18} width={3} delay={0.8} />

          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60">
            <LightRays raysColor="#7B2FBE" raysSpeed={0.6} lightSpread={0.6} rayLength={3} followMouse={true} mouseInfluence={0.1} />
          </div>

          <FloatingParticle delay={0} size={6} x={15} duration={8} />
          <FloatingParticle delay={1.5} size={4} x={30} duration={10} />
          <FloatingParticle delay={3} size={8} x={55} duration={7} />

          <div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0"
            style={{
              left: `calc(${mousePos.x * 100}% - 300px)`,
              top: `calc(${mousePos.y * 100}% - 300px)`,
              background: 'radial-gradient(circle, rgba(94,12,159,0.15) 0%, rgba(123,47,190,0.05) 40%, transparent 70%)',
              transition: 'left 0.8s ease-out, top 0.8s ease-out',
            }}
          />

          <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto pt-24 pb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7B2FBE]/30 bg-[#1B002B]/40 backdrop-blur-md mb-6" style={{ animation: 'fadeSlideUp 0.6s ease-out both' }}>
              <ShieldCheck className="size-3 text-[#D776FF]" />
              <span className="text-[10px] sm:text-xs tracking-[0.2em] text-[#D776FF]/90 font-semibold uppercase">
                Pitch To Solve • Campus Edition
              </span>
              <ShieldCheck className="size-3 text-[#D776FF]" />
            </div>

            <div className="flex flex-col items-center mb-6" style={{ animation: 'fadeSlideUp 0.8s ease-out 0.1s both' }}>
              <img 
                src="https://res.cloudinary.com/dh8cqlngr/image/upload/q_auto/f_auto/v1774820657/Founder_s_Pit_kvfeqt.png" 
                alt="Founder's Pit" 
                className="w-[85%] max-w-[650px] drop-shadow-[0_0_30px_rgba(123,47,190,0.5)] object-contain pointer-events-none select-none"
              />
              <h1 className="sr-only">Founder's Pit</h1>
            </div>

            <div className="mb-10" style={{ animation: 'fadeSlideUp 0.8s ease-out 0.2s both' }}>

              <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto">
                A high-intensity startup simulation where ideas are tested, built, and battle-proven.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ animation: 'fadeSlideUp 0.8s ease-out 0.4s both' }}>
              <Button size="lg" onClick={handleHeroCta} className="fp-btn-primary w-full sm:w-auto text-white font-bold text-base px-10 py-7 rounded-full group">
                Register Now
                <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" onClick={() => executeScroll("what-is-fp")} variant="outline" className="w-full sm:w-auto border-2 border-[#7B2FBE]/30 text-[#D776FF] hover:bg-[#7B2FBE]/10 hover:border-[#D776FF]/60 font-semibold text-base px-10 py-7 rounded-full bg-transparent">
                View Details
              </Button>
            </div>

            <div className="mt-6 pb-16" style={{ animation: 'fadeSlideUp 0.8s ease-out 0.5s both' }}>
               {eventPhase === "registration_open" && <p className="text-[#D776FF]/70 text-xs font-semibold uppercase tracking-wider animate-pulse">Registrations open for Round 1</p>}
               {eventPhase === "pre_launch" && <p className="text-[#D776FF]/70 text-xs font-semibold uppercase tracking-wider animate-pulse">Registrations Opening Soon</p>}
              {eventPhase === "evaluation" && <p className="text-[#D776FF]/70 text-xs font-semibold uppercase tracking-wider">Registration closed - evaluation in progress</p>}
              {eventPhase === "results" && <p className="text-[#D776FF]/70 text-xs font-semibold uppercase tracking-wider">Round 1 results announced</p>}
            </div>
          </div>

          {/* 2. SOCIAL PROOF / QUICK HYPE STRIP (ANCHORED TO BOTTOM) ══════════ */}
          <div className="absolute bottom-0 left-0 w-full py-4 sm:py-5 bg-[#1B002B]/80 backdrop-blur-xl border-t border-[#7B2FBE]/40 overflow-hidden flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-10 px-4 z-20 shadow-[0_-15px_40px_rgba(123,47,190,0.15)]">
              {[ "Startup Simulation Experience", "Multi-Round Competition", "Real-World Problem Solving", "Pitch to Experts" ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 group">
                      <Sparkles className="size-4 text-[#D776FF] group-hover:scale-125 transition-transform" />
                      <span className="text-white/80 text-[10px] sm:text-xs font-bold tracking-widest uppercase">{item}</span>
                  </div>
              ))}
          </div>
        </div>

        {/* 2.5 TIMELINE + COUNTDOWN ══════════ */}
        <section id="battle-timeline" className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#05000A] border-t border-[#7B2FBE]/20">
          <div className="absolute inset-0 fp-grid-bg opacity-20 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <span className="text-[#D776FF] font-bold tracking-[0.2em] uppercase text-xs">Battle Timeline</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-3">Plan. Build. <span className="fp-subtitle">Execute.</span></h2>
              <p className="text-white/55 mt-4 max-w-2xl mx-auto">Track every critical deadline and stay ahead of the competition clock.</p>
            </div>

            <div className="fp-card rounded-3xl p-6 sm:p-8 mb-8 border border-[#D776FF]/30 bg-[#120021]/70">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <div>
                  <p className="text-[#D776FF] text-xs uppercase tracking-[0.2em] font-bold">Live Countdown</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                    {countdownConfig ? countdownConfig.label : 'Registration Window Closed'}
                  </h3>
                </div>
                <div className="flex items-stretch gap-2 sm:gap-3">
                  {countdown ? (
                    [
                      { key: 'days', value: countdown.days, label: 'Days' },
                      { key: 'hours', value: countdown.hours, label: 'Hours' },
                      { key: 'minutes', value: countdown.minutes, label: 'Minutes' },
                      { key: 'seconds', value: countdown.seconds, label: 'Seconds' },
                    ].map((unit) => (
                      <div key={unit.key} className="min-w-[72px] sm:min-w-[82px] px-3 py-3 rounded-2xl bg-[#1B002B]/70 border border-[#7B2FBE]/40 text-center">
                        <p className="text-2xl sm:text-3xl font-black text-white tabular-nums">{String(unit.value).padStart(2, '0')}</p>
                        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-[#D776FF]/80 font-semibold">{unit.label}</p>
                      </div>
                    ))
                  ) : (
                    <div className="px-5 py-4 rounded-2xl bg-[#1B002B]/70 border border-[#7B2FBE]/40 text-white/70 font-semibold text-sm">
                      Countdown completed. Evaluation and results updates are now active.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
              {FP_TIMELINE.map((item, index) => {
                const isCompleted = item.at ? now >= item.at : false;
                const isActive = item.at && countdownConfig && item.at.getTime() === countdownConfig.target.getTime();

                return (
                  <div
                    key={item.title}
                    className={cn(
                      'relative rounded-2xl p-5 sm:p-6 border transition-all duration-300 overflow-hidden',
                      isActive
                        ? 'bg-[#2A0043]/80 border-[#D776FF]/70 shadow-[0_0_30px_rgba(215,118,255,0.2)]'
                        : isCompleted
                        ? 'bg-[#130022]/70 border-[#7B2FBE]/40'
                        : 'bg-[#0D0017]/70 border-[#7B2FBE]/25'
                    )}
                  >
                    <div className="absolute right-4 top-4">
                      {isActive ? (
                        <span className="text-[10px] uppercase tracking-widest bg-[#D776FF]/20 text-[#D776FF] px-2 py-1 rounded-full font-bold">Live</span>
                      ) : isCompleted ? (
                        <span className="text-[10px] uppercase tracking-widest bg-[#5E0C9F]/30 text-[#D8B6FF] px-2 py-1 rounded-full font-bold">Completed</span>
                      ) : (
                        <span className="text-[10px] uppercase tracking-widest bg-[#1B002B] text-white/50 px-2 py-1 rounded-full font-bold">Upcoming</span>
                      )}
                    </div>

                    <div className="flex items-start gap-4 pr-16">
                      <div className={cn(
                        'size-11 rounded-xl flex items-center justify-center border shrink-0',
                        isActive
                          ? 'bg-[#D776FF]/20 border-[#D776FF]/70 text-[#EAC7FF]'
                          : isCompleted
                          ? 'bg-[#5E0C9F]/25 border-[#7B2FBE]/50 text-[#D8B6FF]'
                          : 'bg-[#1B002B]/50 border-[#7B2FBE]/30 text-[#B988DE]'
                      )}>
                        <Calendar className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#D776FF]/80 font-bold">Milestone {String(index + 1).padStart(2, '0')}</p>
                        <h3 className="text-lg sm:text-xl font-bold text-white mt-1">{item.title}</h3>
                        <p className="text-white/65 mt-2 text-sm sm:text-base">{item.dateLabel}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. WHAT IS FOUNDER’S PIT ══════════ */}
        <section id="what-is-fp" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(94,12,159,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div>
                   <h2 className="text-2xl sm:text-5xl font-black text-white mb-6 leading-tight">
                        Experience the Journey.<br/>
                        <span className="fp-subtitle">Build a Startup.</span>
                   </h2>
                   <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8">
                       Founder’s Pit 2026 is a high-energy, one-day startup simulation by the Entrepreneurship Development Cell (EDC), JSS University Noida. Participants step into the role of founders identifying real-world problems, building viable solutions, adapting to dynamic challenges, and pitching their ideas to a panel of judges in a fast-paced, competitive environment.
                   </p>
                   <div className="flex flex-col gap-4">
                       <div className="fp-card p-3 sm:p-4 rounded-2xl flex items-center gap-3 sm:gap-4">
                           <div className="size-9 sm:size-10 rounded-xl bg-[#5E0C9F]/40 flex items-center justify-center shrink-0"><Target className="size-4 sm:size-5 text-[#D776FF]"/></div>
                           <div><h4 className="font-bold text-white text-base sm:text-lg">THE BID</h4><p className="text-sm text-white/50">Strategically compete using virtual currency to win the problem statement you want to solve.</p></div>
                       </div>
                       <div className="fp-card p-3 sm:p-4 rounded-2xl flex items-center gap-3 sm:gap-4">
                           <div className="size-9 sm:size-10 rounded-xl bg-[#5E0C9F]/40 flex items-center justify-center shrink-0"><Lightbulb className="size-4 sm:size-5 text-[#D776FF]"/></div>
                           <div><h4 className="font-bold text-white text-base sm:text-lg">THE BUILD</h4><p className="text-sm text-white/50">Design your product, craft a revenue model, and navigate unexpected challenges thrown your way.</p></div>
                       </div>
                       <div className="fp-card p-3 sm:p-4 rounded-2xl flex items-center gap-3 sm:gap-4">
                           <div className="size-9 sm:size-10 rounded-xl bg-[#5E0C9F]/40 flex items-center justify-center shrink-0"><MessageCircle className="size-4 sm:size-5 text-[#D776FF]"/></div>
                           <div><h4 className="font-bold text-white text-base sm:text-lg">THE PITCH</h4><p className="text-sm text-white/50">Present your battle-tested startup to a panel of expert judges.</p></div>
                       </div>
                   </div>
                </div>
                <div className="relative w-full aspect-square md:aspect-auto md:h-full min-h-[300px] md:min-h-[400px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1B002B] to-[#3A036E] rounded-3xl fp-card overflow-hidden">
                        
                        {/* Background Grid & Glow */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#D776FF 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(215,118,255,0.15)_0%,transparent_50%)] animate-pulse"></div>

                        {/* Floating elements simulating a startup Pitch Deck/Dashboard */}
                        <div className="absolute top-8 left-8 right-8 bottom-8 perspective-1000">
                            
                            {/* Card 1: Revenue / Growth */}
                            <motion.div 
                                animate={{ y: [0, -15, 0] }} 
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="absolute right-0 top-0 w-[65%] h-[45%] bg-[#0A0014]/60 backdrop-blur-xl rounded-2xl border border-[#7B2FBE]/50 p-5 shadow-[0_0_30px_rgba(0,0,0,0.5)] z-20 flex flex-col justify-between transform rotate-2"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <div className="h-2 w-16 bg-[#D776FF]/40 rounded-full"></div>
                                    <TrendingUp className="size-5 text-[#D776FF]" />
                                </div>
                                <div className="flex items-end gap-2 h-20 w-full">
                                    {[30, 50, 40, 70, 60, 90, 80].map((h, i) => (
                                        <div key={i} className="flex-1 bg-gradient-to-t from-[#7B2FBE] to-[#D776FF] rounded-sm opacity-80" style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Card 2: The Pitch Deck */}
                            <motion.div 
                                animate={{ y: [0, 15, 0] }} 
                                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                                className="absolute left-0 top-[25%] w-[60%] h-[55%] bg-gradient-to-br from-[#2D004F] to-[#120021] rounded-2xl border border-[#D776FF]/40 shadow-[0_0_40px_rgba(123,47,190,0.4)] p-6 z-30 flex flex-col justify-between -rotate-3"
                            >
                                <div>
                                    <div className="h-4 w-1/2 bg-white/90 rounded-full mb-4"></div>
                                    <div className="h-2 w-3/4 bg-white/40 rounded-full mb-3"></div>
                                    <div className="h-2 w-5/6 bg-white/40 rounded-full mb-3"></div>
                                    <div className="h-2 w-2/3 bg-white/40 rounded-full"></div>
                                </div>
                                <div className="flex justify-between items-end mt-4">
                                    <div className="size-10 rounded-full bg-[#D776FF]/20 flex items-center justify-center shrink-0">
                                        <Lightbulb className="size-5 text-[#D776FF]"/>
                                    </div>
                                    <img 
                                        src="https://res.cloudinary.com/dh8cqlngr/image/upload/q_auto/f_auto/v1774820657/Founder_s_Pit_kvfeqt.png" 
                                        alt="Founder's Pit Logo"
                                        className="h-7 sm:h-8 object-contain drop-shadow-[0_0_15px_rgba(215,118,255,0.6)] object-right" 
                                    />
                                </div>
                            </motion.div>

                            {/* Card 3: The Target Metric */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }} 
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
                                className="absolute right-4 bottom-0 w-[55%] h-[35%] bg-[#05000A]/80 backdrop-blur-md rounded-2xl border border-white/10 p-5 shadow-2xl z-10 rotate-1"
                            >
                                <div className="flex items-center gap-4 h-full">
                                    <div className="size-12 rounded-full border-2 border-dashed border-[#D776FF] flex items-center justify-center shrink-0">
                                        <Target className="size-6 text-[#D776FF]" />
                                    </div>
                                    <div className="space-y-3 w-full">
                                        <div className="h-3 w-full bg-white/20 rounded-full"></div>
                                        <div className="h-3 w-2/3 bg-white/10 rounded-full"></div>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                    {/* Decorative floating elements */}
                    <div className="absolute -top-6 -right-6 fp-card p-4 rounded-2xl backdrop-blur-xl animate-float-slow z-40 shadow-[0_0_30px_rgba(215,118,255,0.3)] border border-[#D776FF]/30">
                        <Sparkles className="text-[#D776FF] size-8" />
                    </div>
                </div>
            </div>
        </section>


        {/* 4. WHO SHOULD ENTER ══════════ */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 bg-[#0B0014] border-t border-[#7B2FBE]/10">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <span className="text-[#D776FF] font-bold tracking-[0.2em] uppercase text-xs">Eligibility Criteria</span>
                <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">Who belongs in <span className="fp-subtitle">The Pit?</span></h2>
            </div>
            <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6">
                <div className="fp-card p-8 rounded-3xl text-center">
                    <div className="mx-auto size-14 bg-[#1B002B] rounded-full flex items-center justify-center border border-[#7B2FBE]/30 mb-4 tracking-widest text-[#D776FF] font-bold">01</div>
                    <h3 className="font-bold text-xl mb-2">Campus Only</h3>
                    <p className="text-sm text-white/50">Exclusively for JSS University & JSSATEN students.</p>
                </div>
                <div className="fp-card p-8 rounded-3xl text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5E0C9F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="mx-auto size-14 bg-[#1B002B] rounded-full flex items-center justify-center border border-[#7B2FBE]/30 mb-4 tracking-widest text-[#D776FF] font-bold">02</div>
                    <h3 className="font-bold text-xl mb-2">1st and 2nd year</h3>
                    <p className="text-sm text-white/50">Freshers with ideas & sophomores ready to execute.</p>
                </div>
                <div className="fp-card p-8 rounded-3xl text-center border-[#D776FF]/30">
                    <div className="mx-auto size-14 bg-[#1B002B] rounded-full flex items-center justify-center border border-[#7B2FBE]/30 mb-4 tracking-widest text-[#D776FF] font-bold">03</div>
                    <h3 className="font-bold text-xl mb-2">Team Up</h3>
                    <p className="text-sm text-white/50">Teams of 2–4 members. No solo warriors allowed in the pit.</p>
                </div>
            </div>
        </section>

        {/* 5. EXPERIENCE FLOW ══════════ */}
        <section className="py-24 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center">
            <div className="absolute inset-0 fp-grid-bg opacity-30"></div>
            <div className="max-w-6xl mx-auto w-full relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-2xl sm:text-5xl font-black text-white">The <span className="fp-subtitle">Experience Flow</span></h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 relative">
                    <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#7B2FBE]/10 via-[#D776FF]/50 to-[#7B2FBE]/10 z-0 border-t border-dashed border-[#D776FF]/30"></div>
                    
                    {[
                        { title: "THE BID", desc: "Choose your battlefield. Compete aggressively for the best problem statements.", icon: Target },
                        { title: "THE BUILD", desc: "Design a solution. Build a robust business model. Handle unexpected twists.", icon: Zap },
                        { title: "THE PITCH", desc: "Present to industry judges. Defend your idea under intense questioning.", icon: MessageCircle }
                    ].map((step, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center">
                            <div className="timeline-bullet size-[90px] rounded-full bg-[#0B0014] border-2 border-[#D776FF] flex items-center justify-center mb-6 text-[#D776FF]">
                                <step.icon className="size-8"/>
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3 tracking-wide">{step.title}</h3>
                            <p className="text-white/60 leading-relaxed max-w-[280px]">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <HugeTimeline />

        {/* 6. ROUND 1 BREAKDOWN ══════════ */}
        <section id="round-details" className="py-24 px-4 sm:px-6 bg-[#0B0014] relative border-t border-[#7B2FBE]/10">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#D776FF]/10 text-[#D776FF] font-bold text-sm tracking-widest mb-6 border border-[#D776FF]/20">ROUND 1 ZOOM-IN</div>
                    <h2 className="text-2xl sm:text-5xl font-black text-white mb-4">The Screening Stage</h2>
                    <p className="text-white/60 text-lg">Format: <b>Online</b> Pitch Deck Submission <br/> Theme: Solving Everyday Campus Problems</p>
                    <p className="text-[#D776FF]/80 text-sm mt-4 font-bold tracking-wide uppercase bg-[#D776FF]/5 inline-block px-4 py-1 rounded-full border border-[#D776FF]/20">
                        Remaining rounds will be OFFLINE for qualified teams
                    </p>
                </div>
                
                <div className="fp-card rounded-3xl p-8 sm:p-12 mb-10 border-l-4 border-l-[#D776FF] bg-[#1B002B]/30">
                    <h3 className="text-2xl font-bold flex items-center gap-3 mb-8"><FileText className="text-[#D776FF] size-8"/> Submission Requirements (STRICT)</h3>
                  <p className="text-white/80 font-semibold mb-6 text-lg">Your deck must follow this exact 6-slide structure:</p>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="size-8 shrink-0 rounded-full bg-[#1B002B] text-[#D776FF] font-bold text-sm flex items-center justify-center border border-[#7B2FBE]">1</div>
                      <div><h4 className="font-bold text-white text-lg">Introduction</h4><p className="text-white/50 text-sm mt-1">Introduce your team and set context for the pitch.</p></div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="size-8 shrink-0 rounded-full bg-[#1B002B] text-[#D776FF] font-bold text-sm flex items-center justify-center border border-[#7B2FBE]">2</div>
                      <div><h4 className="font-bold text-white text-lg">Problem Statement</h4><p className="text-white/50 text-sm mt-1">Clearly define the core problem you are solving.</p></div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="size-8 shrink-0 rounded-full bg-[#1B002B] text-[#D776FF] font-bold text-sm flex items-center justify-center border border-[#7B2FBE]">3</div>
                      <div><h4 className="font-bold text-white text-lg">Proposed Solution</h4><p className="text-white/50 text-sm mt-1">Explain your product, service, or strategic approach.</p></div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="size-8 shrink-0 rounded-full bg-[#1B002B] text-[#D776FF] font-bold text-sm flex items-center justify-center border border-[#7B2FBE]">4</div>
                      <div><h4 className="font-bold text-white text-lg">Implementation / Impact</h4><p className="text-white/50 text-sm mt-1">Show execution plan and expected impact.</p></div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="size-8 shrink-0 rounded-full bg-[#1B002B] text-[#D776FF] font-bold text-sm flex items-center justify-center border border-[#7B2FBE]">5</div>
                      <div><h4 className="font-bold text-white text-lg">Business Model</h4><p className="text-white/50 text-sm mt-1">Summarize how your idea sustains and scales.</p></div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="size-8 shrink-0 rounded-full bg-[#1B002B] text-[#D776FF] font-bold text-sm flex items-center justify-center border border-[#7B2FBE]">6</div>
                      <div><h4 className="font-bold text-white text-lg">Thank You</h4><p className="text-white/50 text-sm mt-1">Close your presentation clearly and professionally.</p></div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-[#1B002B]/40 border border-[#7B2FBE]/30 rounded-3xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="size-16 rounded-full bg-[#5E0C9F]/20 flex items-center justify-center shrink-0">
                        <FileText className="text-[#D776FF] size-8"/>
                    </div>
                    <div>
                        <h4 className="text-[#D776FF] font-bold mb-3 text-xl">Submission Guidelines</h4>
                        <ul className="text-white/70 text-base list-disc pl-5 space-y-2">
                            <li>Please use PDF/PPT/PPTX formats only (Max 10MB limit).</li>
                            <li>
                              Use this official pitch template:{' '}
                              <a
                                href="https://pub-2bfd788961cf4002b07405b50ea33378.r2.dev/Founder's%20Pit%20Round%20-%201%20Template.pptx"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#D776FF] underline underline-offset-4 hover:text-[#EAC7FF]"
                              >
                                Download Template
                              </a>
                            </li>
                            <li>Avoid embedding videos or external links as core presentation content.</li>
                            <li>All submissions should be presented in English.</li>
                            <li>Ensure all work is original (purely AI-generated plans are not permitted).</li>
                            <li>Please designate team lead to upload the final submission.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* 8. JUDGING CRITERIA ══════════ */}
        <section className="py-20 px-4 sm:px-6 relative">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-4xl font-black text-white">How You Are <span className="fp-subtitle">Evaluated</span></h2>
                    <p className="text-white/50 mt-2 text-sm sm:text-base">Each team is evaluated by a panel of multiple industry judges.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { title: "Problem Clarity", val: "25%" },
                        { title: "Innovation", val: "25%" },
                        { title: "Feasibility", val: "25%" },
                        { title: "Impact", val: "25%" }
                    ].map((item, i) => (
                        <div key={i} className="fp-card text-center p-6 sm:p-8 rounded-3xl flex flex-col justify-center items-center">
                            <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#D776FF] to-[#7B2FBE] mb-2">{item.val}</span>
                            <span className="text-white/80 font-bold text-sm uppercase tracking-wide">{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* 9. REWARDS & GOODIES ══════════ */}
        <section className="py-20 px-4 sm:px-6 bg-[#080010] border-y border-[#7B2FBE]/15 relative overflow-hidden">
          <div className="absolute inset-0 fp-grid-bg opacity-20 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[240px] bg-[radial-gradient(circle,rgba(215,118,255,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <span className="text-[#D776FF] font-bold tracking-[0.2em] uppercase text-xs">Rewards & Recognition</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-3">Win More Than Just <span className="fp-subtitle">Bragging Rights</span></h2>
              <p className="text-white/60 mt-4 max-w-3xl mx-auto text-sm sm:text-base">Top teams walk away with tangible rewards, official recognition, and exciting perks from Founder&apos;s Pit.</p>
            </div>

            <div className="mb-10 fp-card rounded-3xl border border-[#D776FF]/45 p-6 sm:p-8 text-center bg-[#140024]/80 shadow-[0_0_45px_rgba(215,118,255,0.22)]">
              <p className="text-[#D776FF]/90 text-xs sm:text-sm uppercase tracking-[0.28em] font-bold">Mega Prize Pool</p>
              <p className="mt-2 text-5xl sm:text-7xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#EED6FF] via-[#D776FF] to-[#B45CFF] drop-shadow-[0_0_20px_rgba(215,118,255,0.45)]">
                Rs. 10000+
              </p>
              <p className="mt-3 text-white/70 text-sm sm:text-base">In cash rewards for top-performing teams</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  title: 'Prize Pool',
                  desc: 'Compete for a major cash prize across top-performing teams.',
                  icon: Trophy,
                  highlight: true,
                },
                {
                  title: 'Certificates',
                  desc: 'Get official participation and merit certificates to strengthen your profile.',
                  icon: CheckCircle2,
                },
                {
                  title: 'Trophies',
                  desc: 'Winners and standout teams will receive trophies for their exceptional performance.',
                  icon: Medal,
                },
                {
                  title: 'Many More Goodies',
                  desc: 'Exclusive goodies and surprise rewards await teams that rise through the rounds.',
                  icon: Gift,
                },
              ].map((reward, index) => (
                <div
                  key={index}
                  className={cn(
                    'fp-card p-6 rounded-3xl border border-[#7B2FBE]/30 hover:border-[#D776FF]/60',
                    reward.highlight && 'bg-[#1A0030]/85 border-[#D776FF]/55 shadow-[0_0_30px_rgba(215,118,255,0.2)]'
                  )}
                >
                  <div className="size-12 rounded-xl bg-[#1B002B] border border-[#7B2FBE]/40 flex items-center justify-center mb-4">
                    <reward.icon className="size-6 text-[#D776FF]" />
                  </div>
                  <h3 className={cn('font-black text-white mb-2', reward.highlight ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl')}>
                    {reward.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">{reward.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10, 11, 14. DYNAMIC STATE PORTAL (REGISTRATION / SUBMISSION) ══════════ */}
        <section id="registration-portal" className="py-20 px-4 sm:px-6 relative">
            <div className="max-w-3xl mx-auto">
                <div className="fp-card p-6 sm:p-10 rounded-[40px] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E0C9F] via-[#D776FF] to-[#5E0C9F]"></div>
                    
                    {eventPhase === "pre_launch" && (
                        <div className="text-center py-20">
                            <Clock className="mx-auto size-16 text-[#7B2FBE] mb-6"/>
                            <h2 className="text-3xl font-black text-white mb-2">Portal <span className="fp-subtitle">Opening Soon</span></h2>
                            <p className="text-white/50">Gather your team and refine your ideas. The battlefield is being prepared.</p>
                        </div>
                    )}

                    {eventPhase === "registration_open" && (
                        <div className="text-center py-10">
                            <div className="size-20 rounded-full bg-[#1B002B] flex items-center justify-center mx-auto mb-6 border border-[#7B2FBE]/40 shadow-[0_0_30px_rgba(123,47,190,0.3)] hover:scale-110 transition-transform">
                                <Users className="size-10 text-[#D776FF]" />
                            </div>
                            <h2 className="text-3xl font-black text-white mb-4">Team <span className="fp-subtitle">Registration</span></h2>
                            <p className="text-white/60 mb-8 max-w-md mx-auto text-lg">Assemble your squad of 2-4 members. The battlefield awaits.</p>
                            <Button onClick={() => window.open('https://events.edcjssun.com/events/founders-pit-2026', '_blank')} className="fp-btn-primary px-10 py-7 text-lg font-black rounded-full w-full sm:w-auto">
                                Proceed to Register
                                <ArrowRight className="ml-2 size-5 inline-block" />
                            </Button>
                        </div>
                    )}

                    {eventPhase === "evaluation" && (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 border-4 border-[#1B002B] border-t-[#D776FF] rounded-full animate-spin mx-auto mb-6"></div>
                            <h2 className="text-2xl font-black text-white mb-2">Evaluating Operations</h2>
                            <p className="text-white/50">Judges are currently reviewing the pitch decks. Results will be out soon.</p>
                        </div>
                    )}

                    {eventPhase === "results" && (
                        <div className="text-center py-10">
                            <span className="text-6xl mb-4 block">🏆</span>
                            <h2 className="text-3xl font-black text-white mb-2">Round 1 <span className="fp-subtitle">Results Are Out</span></h2>
                            <p className="text-white/50 mb-8">Check if you survived The Pit to enter Round 2.</p>
                            <Button className="fp-btn-primary px-10 py-6 text-lg font-bold rounded-xl">View Shortlist</Button>
                        </div>
                    )}

                </div>
            </div>
        </section>

        {/* 12. FAQ ══════════ */}
        <section className="py-20 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-black text-white">Frequently Asked <span className="fp-subtitle">Questions</span></h2>
                </div>
                <div className="space-y-4">
                    {[
                        { q: "Can I participate individually?", a: "No. Founder's Pit requires teamwork. You must form a team of 2 to 4 members." },
                    { q: "What happens if we don't follow the required 6-slide template?", a: "Your team may be disqualified. Following the prescribed slide structure is mandatory." },
                        { q: "Can we submit multiple times?", a: "If you submit multiple times, only the latest submission before the deadline will be considered." },
                        { q: "What happens after Round 1?", a: "Shortlisted teams who survive the online screening will be invited to the campus for the remaining offline rounds, including the bidding, building, and final pitch. Only qualified teams will participate in the offline event day." }
                    ].map((faq, i) => (
                        <div key={i} className="fp-card rounded-2xl overflow-hidden cursor-pointer" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                            <div className="p-5 flex justify-between items-center">
                                <h4 className="font-bold text-white/90">{faq.q}</h4>
                                <ChevronRight className={`text-[#7B2FBE] transition-transform ${activeFaq === i ? 'rotate-90' : ''}`} />
                            </div>
                            {activeFaq === i && (
                                <div className="px-5 pb-5 text-white/60 text-sm border-t border-[#7B2FBE]/10 pt-4">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ══════════ POPUP / DRAWER ══════════ */}
        <Drawer open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <DrawerContent className="bg-[#0B0014]/95 backdrop-blur-xl border-t border-[#7B2FBE]/30 pb-28 sm:pb-12">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="flex flex-col items-center">
                <div className="size-16 rounded-2xl bg-gradient-to-br from-[#5E0C9F] to-[#7B2FBE] flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(123,47,190,0.6)]">
                  <Check className="size-8 text-white stroke-[3px]" />
                </div>
                <DrawerTitle className="text-2xl font-black text-white mb-2">Portal Action</DrawerTitle>
                <DrawerDescription className="text-center text-white/60 text-base leading-relaxed">
                  The action was registered successfully.
                  Stay tuned for further updates from <span className="text-[#D776FF] font-bold">Team EDC</span>.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 mt-4">
                <Button onClick={() => setIsPopupOpen(false)} className="w-full fp-btn-primary hover:scale-100 text-white font-bold py-6 rounded-xl border-0">
                  Acknowledge
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        {/* ══════════ FOOTER ══════════ */}
        <Footer />
      </div>
    </>
  );
};

export default FoundersPit;
