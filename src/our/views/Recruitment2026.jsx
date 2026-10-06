import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import { cn } from '@/lib/utils';
import LightRays from '../../components/LightRays';
import { HeroTextVisual } from '../../components/ui/hero';
import {
  Terminal, PenTool, Share2, Settings, Calendar, CheckCircle2, Target,
  Users, Clock, ChevronRight, ChevronDown, Zap, ArrowRight, Sparkles,
  Shield, Eye, Brain, MessageCircle, Award, FileText, Cpu, Palette,
  Video, Megaphone
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════════
   THEME CONSTANTS (Electric Blue & Neon Lime Scheme)
   ══════════════════════════════════════════════════════════════ */
const C = {
  royalBlue: '#0038FF',
  deepNavy: '#001A99',
  midnightNavy: '#00126B',
  lime: '#CCFF00',
  neonLime: '#D4FF26',
  white: '#FFFFFF',
  offWhite: '#F3F4F2',
};

/* ══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS (Framer Motion)
   ══════════════════════════════════════════════════════════════ */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};
const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

/* ══════════════════════════════════════════════════════════════
   DECORATIVE ELEMENTS
   ══════════════════════════════════════════════════════════════ */
const FloatingParticle = ({ delay, size, x, duration }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size, height: size,
      left: `${x}%`, bottom: '-5%',
      background: `radial-gradient(circle, rgba(204,255,0,0.6) 0%, transparent 70%)`,
      animation: `rct-floatUp ${duration}s ease-in-out ${delay}s infinite`,
    }}
  />
);

const LimeCurtain = ({ left, opacity, width, delay, className }) => (
  <div
    className={cn("absolute top-0 h-full pointer-events-none", className)}
    style={{
      left: `${left}%`, width: `${width}px`,
      background: `linear-gradient(180deg, rgba(204,255,0,${opacity}) 0%, rgba(255,255,255,${opacity * 0.4}) 50%, transparent 100%)`,
      filter: 'blur(10px)',
      animation: `rct-curtainPulse 4s ease-in-out ${delay}s infinite alternate`,
    }}
  />
);

const SectionLabel = ({ children }) => (
  <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
    <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#CCFF00]" />
    <span className="text-[#CCFF00] text-[11px] sm:text-xs font-black tracking-[0.25em] uppercase" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>{children}</span>
    <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#CCFF00]" />
  </motion.div>
);

/* ══════════════════════════════════════════════════════════════
   SCROLL-DRIVEN TIMELINE DATA & COMPONENT
   ══════════════════════════════════════════════════════════════ */
const TIMELINE_DATA = [
  { date: '7–12 Oct', activity: 'Registration', mode: 'Online', icon: FileText, desc: 'Sign up online, choose your preferred team and submit relevant details.' },
  { date: '13 Oct', activity: 'Aptitude / Resume Shortlisting', mode: 'Online', icon: Brain, desc: '1st Years: Aptitude test to screen volume. 2nd Years: Resume-based shortlisting.' },
  { date: '14–15 Oct', activity: 'Team-Specific Task Round', mode: 'Online', icon: Cpu, desc: 'Complete a task based on your preferred team — technical, design, social media, or operations.' },
  { date: '16–21 Oct', activity: 'Evaluation + College Break', mode: 'Internal', icon: Clock, desc: 'Internal evaluation of all task submissions during the college break period.' },
  { date: '22 Oct', activity: 'Final GD Shortlist Released', mode: 'Internal/Online', icon: CheckCircle2, desc: 'Shortlisted candidates are announced for the final offline rounds.' },
  { date: '23–26 Oct', activity: 'Candidate Coordination & Prep', mode: '—', icon: MessageCircle, desc: 'Shortlisted candidates coordinate timing and prepare for offline stage.' },
  { date: '27–28 Oct', activity: 'GD + PI (Final Stage)', mode: 'OFFLINE', icon: Target, desc: 'The final stage. GD and PI running in parallel on campus. This is where it all counts.' },
  { date: 'After 28 Oct', activity: 'Final Selection & Onboarding', mode: 'Internal', icon: Award, desc: 'Final results are out. Welcome to EDC — your journey begins.' },
];

const HugeTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="recruitment-timeline" ref={containerRef} className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#001D99] to-[#0025B8] border-t border-white/15">
      <div className="absolute inset-0 rct-grid-bg opacity-20 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="text-center mb-20">
          <SectionLabel>Battle Timeline</SectionLabel>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl font-black text-white mt-3">
            Register. Compete. <span className="rct-subtitle">Join.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-white/70 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
            Track every critical deadline. Every milestone is a step closer to becoming part of EDC.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Background static line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/20 rounded-full hidden md:block" />
          {/* Animated glowing line */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-[#CCFF00] via-white to-[#CCFF00] rounded-full hidden md:block"
            style={{ height, filter: 'drop-shadow(0 0 15px #CCFF00)' }}
          />

          <div className="space-y-20 sm:space-y-24">
            {TIMELINE_DATA.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-20 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <div className="rct-card p-7 sm:p-9 rounded-3xl w-full max-w-lg hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden text-left">
                    {/* Top gradient accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0038FF] via-[#CCFF00] to-transparent opacity-80" />
                    {/* Subtle ambient light reflection */}
                    <div className="absolute -top-10 -right-10 w-44 h-44 bg-[radial-gradient(circle,rgba(204,255,0,0.15)_0%,transparent_70%)] blur-2xl pointer-events-none" />
                    <div className="absolute -top-10 -right-10 p-3 opacity-5 group-hover:opacity-15 transition-opacity duration-700 blur-2xl pointer-events-none">
                      <item.icon className="h-64 w-64 text-[#0038FF]" />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#CCFF00] text-black font-black text-[10px] tracking-widest shadow-sm">
                        {item.date}
                      </div>
                      <span className={cn(
                        "text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold border",
                        item.mode === 'OFFLINE' ? 'bg-[#0038FF] text-white border-[#0038FF]' : 'bg-neutral-100 text-neutral-800 border-neutral-300'
                      )}>
                        {item.mode}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-3 relative z-10 group-hover:text-[#0038FF] transition-colors duration-300">{item.activity}</h3>
                    <p className="text-neutral-600 text-sm sm:text-base leading-relaxed relative z-10">{item.desc}</p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center size-16 sm:size-20 rounded-full border-4 border-[#0038FF] bg-[#001A99] shadow-[0_0_30px_rgba(204,255,0,0.4)] z-10 hidden md:flex transition-transform hover:scale-110 duration-300">
                  <item.icon className="size-7 sm:size-8 text-[#CCFF00]" />
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════
   TEAM CARDS SECTION
   ══════════════════════════════════════════════════════════════ */
const TEAMS = [
  {
    title: 'Technical',
    icon: Terminal,
    color: '#CCFF00',
    desc: 'Development, problem-solving, debugging, or technical execution task.',
  },
  {
    title: 'Design',
    icon: Palette,
    color: '#CCFF00',
    desc: 'Poster, social media creative, branding, or other visual design task.',
  },
  {
    title: 'Social Media / Video',
    icon: Video,
    color: '#CCFF00',
    desc: 'Content, campaign, video/reel, social media, or marketing task.',
  },
  {
    title: 'Operations',
    icon: Megaphone,
    color: '#CCFF00',
    desc: 'Liaisoning, Outreach, T&E, C&D & Marketing — event planning, logistics, coordination.',
  },
];

/* ══════════════════════════════════════════════════════════════
   PROCESS PIPELINE COMPONENT
   ══════════════════════════════════════════════════════════════ */
const PipelineStep = ({ number, title, content, isLast }) => (
  <div className="flex gap-4 sm:gap-5 items-start relative group">
    <div className="flex flex-col items-center">
      <div
        className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-[#0038FF] to-[#001D99] text-white font-black rounded-xl flex items-center justify-center shadow-[0_4px_14px_rgba(0,56,255,0.35)] text-sm group-hover:scale-105 transition-all border border-white/20"
        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
      >
        {number}
      </div>
      {!isLast && (
        <div className="w-0.5 h-full bg-gradient-to-b from-[#0038FF]/40 via-[#CCFF00]/60 to-neutral-200 mt-2.5 min-h-[45px]" />
      )}
    </div>
    <div className="pb-8 flex-1">
      <h4 className="text-xl font-black text-neutral-900 mb-1.5 group-hover:text-[#0038FF] transition-colors flex items-center gap-2">
        {title}
      </h4>
      <p className="text-neutral-600 text-sm leading-relaxed">{content}</p>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   FAQ ACCORDION DATA
   ══════════════════════════════════════════════════════════════ */
const FAQ_DATA = [
  { q: 'Is the recruitment process the same for 1st and 2nd year students?', a: 'No. 1st years go through an Aptitude round after registration, while 2nd years go through Resume Shortlisting. The rest of the pipeline is similar — Task Round → GD → PI → Final Selection.' },
  { q: 'Can I apply for more than one team?', a: 'You will indicate your team preference during registration. The task round will be based on your preferred team.' },
  { q: 'What does the Task Round assess?', a: 'Execution, creativity, role-specific skills, problem-solving, and attention to detail. Each team has a different task format.' },
  { q: 'When and where does the GD + PI happen?', a: 'The final stage is conducted offline on 27–28 October on campus, with GD and PI running in parallel.' },
  { q: 'How is the final selection decided?', a: 'For 1st Years: Aptitude + Task + GD + Team PI + HR/EDC PI. For 2nd Years: Resume + Task + GD + Team PI + HR/EDC PI. The recruitment committee consolidates performance across all rounds.' },
];

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function Recruitment2026() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('1st');
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');

        @keyframes rct-floatUp {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.2; }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }
        @keyframes rct-curtainPulse {
          0%   { opacity: 0.2; transform: scaleY(0.95); }
          100% { opacity: 0.5; transform: scaleY(1.05); }
        }
        @keyframes rct-borderGlow {
          0%, 100% { border-color: rgba(255, 255, 255, 0.2); }
          50%      { border-color: rgba(204, 255, 0, 0.4); }
        }
        @keyframes rct-textGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(204,255,0,0.3), 0 0 40px rgba(0,26,153,0.4); }
          50%      { text-shadow: 0 0 30px rgba(204,255,0,0.5), 0 0 60px rgba(0,26,153,0.6); }
        }
        @keyframes rct-gridMove {
          0%   { background-position: 0 0; }
          100% { background-position: 4rem 4rem; }
        }
        @keyframes rct-scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .rct-title {
          background: linear-gradient(135deg, #FFFFFF 0%, #CCFF00 45%, #FFFFFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: rct-textGlow 3s ease-in-out infinite;
        }
        .rct-subtitle {
          background: linear-gradient(90deg, #FFFFFF, #CCFF00, #FFFFFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .rct-card {
          background-color: #FFFFFF;
          background-image:
            radial-gradient(circle at 100% 0%, rgba(204, 255, 0, 0.12) 0%, transparent 42%),
            radial-gradient(circle at 0% 100%, rgba(0, 56, 255, 0.07) 0%, transparent 48%),
            linear-gradient(to right, rgba(0, 56, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 56, 255, 0.04) 1px, transparent 1px),
            linear-gradient(165deg, #FFFFFF 0%, #FAFCFF 45%, #F0F4FF 100%);
          background-size: 100% 100%, 100% 100%, 28px 28px, 28px 28px, 100% 100%;
          border: 1.5px solid rgba(255, 255, 255, 0.95);
          box-shadow: 
            0 2px 5px rgba(0, 18, 90, 0.06),
            0 12px 30px -6px rgba(0, 18, 90, 0.25),
            0 32px 64px -12px rgba(0, 15, 75, 0.38),
            inset 0 1px 2px rgba(255, 255, 255, 1),
            inset 0 0 0 1px rgba(255, 255, 255, 0.8),
            inset 0 -2px 6px rgba(0, 56, 255, 0.04);
          color: #0f172a;
          position: relative;
          backdrop-filter: blur(12px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .rct-card:hover {
          border-color: rgba(204, 255, 0, 0.95);
          transform: translateY(-5px);
          box-shadow: 
            0 4px 12px rgba(0, 18, 90, 0.08),
            0 24px 55px -10px rgba(0, 18, 90, 0.4),
            0 0 40px rgba(204, 255, 0, 0.45),
            inset 0 1px 2px rgba(255, 255, 255, 1),
            inset 0 0 0 1px rgba(204, 255, 0, 0.5);
        }
        .rct-btn-primary {
          background: #CCFF00;
          color: #000000;
          font-weight: 900;
          border: 1px solid #CCFF00;
          box-shadow: 0 4px 25px rgba(204, 255, 0, 0.4);
          transition: all 0.3s ease;
        }
        .rct-btn-primary:hover {
          background: #FFFFFF;
          border-color: #FFFFFF;
          color: #0038FF;
          box-shadow: 0 8px 35px rgba(255, 255, 255, 0.5), 0 0 25px rgba(204, 255, 0, 0.3);
          transform: scale(1.03);
        }
        .rct-grid-bg {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 4rem 4rem;
        }
        .rct-scanline::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(204,255,0,0.5), transparent);
          animation: rct-scanline 6s linear infinite;
          pointer-events: none;
        }
      `}</style>

      <div className="w-full min-h-screen bg-[#0038FF] text-white overflow-hidden pb-10 sm:pb-0 font-sans selection:bg-[#CCFF00] selection:text-black">

        {/* ════════════════════════════════════════════════════════
           1. HERO SECTION
           ════════════════════════════════════════════════════════ */}
        <div ref={heroRef} className="relative w-full min-h-screen bg-[#0038FF] flex flex-col items-center justify-center overflow-hidden py-16 sm:py-24 px-4">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

          {/* Mouse-following orb */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0"
            style={{
              left: `calc(${mousePos.x * 100}% - 300px)`,
              top: `calc(${mousePos.y * 100}% - 300px)`,
              background: 'radial-gradient(circle, rgba(204,255,0,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)',
              transition: 'left 0.8s ease-out, top 0.8s ease-out',
            }}
          />

          {/* Ambient Lighting */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
            <LightRays raysColor="#CCFF00" raysSpeed={0.5} lightSpread={0.5} rayLength={2.5} followMouse={true} mouseInfluence={0.08} />
          </div>

          <FloatingParticle delay={0} size={6} x={12} duration={9} />
          <FloatingParticle delay={2} size={4} x={28} duration={11} />
          <FloatingParticle delay={1} size={8} x={60} duration={7} />
          <FloatingParticle delay={3} size={5} x={80} duration={10} />

          {/* Hero Visual Element from hero.tsx */}
          <HeroTextVisual
            onScrollDown={() => {
              const el = document.getElementById('recruitment-overview');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>

        {/* ════════════════════════════════════════════════════════
           2. RECRUITMENT OVERVIEW (Two Pipelines)
           ════════════════════════════════════════════════════════ */}
        <section
          id="recruitment-overview"
          className="relative py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#0038FF] to-[#0026C8] border-t border-white/15"
        >
          <div className="absolute inset-0 rct-grid-bg opacity-20 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="text-center mb-16">
              <SectionLabel>Recruitment Process</SectionLabel>
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl font-black text-white mt-3">
                Two Parallel <span className="rct-subtitle">Pipelines</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-white/75 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
                Conducted separately for 1st-year and 2nd-year students. Same goal, tailored process.
              </motion.p>
            </motion.div>

            {/* Tab Switcher */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex rounded-full p-1.5 bg-white/10 border border-white/25 backdrop-blur-md shadow-xl">
                {['1st', '2nd'].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setActiveTab(yr)}
                    className={cn(
                      'px-7 sm:px-11 py-3 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer',
                      activeTab === yr
                        ? 'bg-[#CCFF00] text-black shadow-[0_0_25px_rgba(204,255,0,0.4)]'
                        : 'text-white/70 hover:text-white'
                    )}
                  >
                    {yr} Year
                  </button>
                ))}
              </div>
            </div>

            {/* Pipeline Steps */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl mx-auto"
              >
                {/* Flow Indicator */}
                <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap mb-12 px-2">
                  {(activeTab === '1st'
                    ? ['Registration', 'Aptitude', 'Task', 'GD', 'PI', 'Selection']
                    : ['Registration', 'Resume', 'Task', 'GD', 'PI', 'Selection']
                  ).map((step, i, arr) => (
                    <React.Fragment key={i}>
                      <span className="text-[10px] sm:text-xs font-black text-[#CCFF00] uppercase tracking-wider bg-white/15 px-3 py-1.5 rounded-full border border-white/25 whitespace-nowrap shadow-sm">{step}</span>
                      {i < arr.length - 1 && <ChevronRight className="size-3 sm:size-4 text-white/50 flex-shrink-0" />}
                    </React.Fragment>
                  ))}
                </div>

                <div className="rct-card rounded-3xl p-7 sm:p-11 relative overflow-hidden rct-scanline group">
                  {/* Top gradient accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0038FF] via-[#CCFF00] to-[#0038FF]" />
                  {/* Subtle ambient light reflections */}
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-[radial-gradient(circle,rgba(204,255,0,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[radial-gradient(circle,rgba(0,56,255,0.07)_0%,transparent_70%)] blur-2xl pointer-events-none" />
                  {activeTab === '1st' ? (
                    <>
                      <PipelineStep number="01" title="Registration" content="Online registration and team preference." />
                      <PipelineStep number="02" title="Aptitude" content="Screening round to manage high registration volume and shortlist active/interested candidates." />
                      <PipelineStep number="03" title="Task Round" content="Team-specific online task to evaluate domain skills." />
                      <PipelineStep number="04" title="Group Discussion" content="Offline group discussion to assess communication, teamwork, reasoning, and participation." />
                      <PipelineStep number="05" title="Personal Interview" content="Two components: Team-Specific PI and HR/EDC PI." />
                      <PipelineStep number="06" title="Final Selection" content="Based on overall performance: Aptitude + Task + GD + Team PI + HR/EDC PI." isLast />
                    </>
                  ) : (
                    <>
                      <PipelineStep number="01" title="Registration" content="Online registration with resume and relevant details." />
                      <PipelineStep number="02" title="Resume Shortlisting" content="Candidates shortlisted based on relevant skills, experience, projects, achievements, and involvement." />
                      <PipelineStep number="03" title="Task Round" content="Team-specific online task." />
                      <PipelineStep number="04" title="Group Discussion" content="Offline group discussion." />
                      <PipelineStep number="05" title="Personal Interview" content="Team-Specific PI + HR/EDC PI." />
                      <PipelineStep number="06" title="Final Selection" content="Based on overall performance: Resume + Task + GD + Team PI + HR/EDC PI." isLast />
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
           3. TARGET TEAMS
           ════════════════════════════════════════════════════════ */}
        <section id="recruitment-teams" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#0026C8] to-[#001D99] border-t border-white/15">
          <div className="absolute inset-0 rct-grid-bg opacity-15 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[260px] bg-[radial-gradient(circle,rgba(204,255,0,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="text-center mb-16">
              <SectionLabel>Select Your Domain</SectionLabel>
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl font-black text-white mt-3">
                Four Core <span className="rct-subtitle">Teams</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-white/75 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
                Each team drives a critical pillar of EDC. Choose where your skills fit best.
              </motion.p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-2 gap-6">
              {TEAMS.map((team, i) => (
                <motion.div key={i} variants={scaleIn}>
                  <div className="rct-card p-8 sm:p-9 rounded-3xl relative overflow-hidden group text-left h-full">
                    {/* Top gradient accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0038FF] via-[#CCFF00] to-[#0038FF] opacity-75 group-hover:opacity-100 transition-opacity" />
                    {/* Subtle ambient light reflection */}
                    <div className="absolute -top-10 -right-10 w-44 h-44 bg-[radial-gradient(circle,rgba(204,255,0,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                      <team.icon className="h-48 w-48 text-neutral-400" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-5">
                        <div className="size-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#0038FF] to-[#001D99] text-[#CCFF00] shadow-[0_4px_16px_rgba(0,56,255,0.35)] group-hover:scale-105 transition-transform">
                          <team.icon className="size-7 text-[#CCFF00]" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-[#0038FF] tracking-wider px-3 py-1 rounded-full bg-[#0038FF]/8 border border-[#0038FF]/15 uppercase">
                          Domain 0{i + 1}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-3 group-hover:text-[#0038FF] transition-colors uppercase tracking-wide">{team.title}</h3>
                      <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">{team.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
           4. SCROLL-DRIVEN TIMELINE
           ════════════════════════════════════════════════════════ */}
        <div id="recruitment-timeline">
          <HugeTimeline />
        </div>

        {/* ════════════════════════════════════════════════════════
           5. TASK ROUND + ASSESSMENT DETAILS
           ════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#0025B8] to-[#001A99] relative border-t border-white/15">
          <div className="absolute inset-0 rct-grid-bg opacity-15 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="text-center mb-16">
              <SectionLabel>Assessment Rounds</SectionLabel>
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl font-black text-white mt-3">
                How You Are <span className="rct-subtitle">Evaluated</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-white/75 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
                Every round tests a different dimension. A thorough process to find the best fit.
              </motion.p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
              {/* Card 1: Task Round */}
              <motion.div variants={fadeInUp} className="md:col-span-1">
                <div className="rct-card p-7 sm:p-8 rounded-3xl h-full flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0038FF] via-[#CCFF00] to-[#0038FF]" />
                  <div className="absolute -top-10 -right-10 w-44 h-44 bg-[radial-gradient(circle,rgba(204,255,0,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none" />

                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="size-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#0038FF] to-[#001D99] text-[#CCFF00] shadow-[0_4px_16px_rgba(0,56,255,0.35)] group-hover:scale-105 transition-transform">
                      <Zap className="size-7 text-[#CCFF00]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black text-[#0038FF] uppercase tracking-widest bg-[#0038FF]/10 px-2.5 py-1 rounded-md">Stage 01</span>
                      <span className="text-[10px] uppercase tracking-widest bg-[#CCFF00] text-black px-3 py-1 rounded-full font-black shadow-xs">Online</span>
                    </div>
                  </div>

                  {/* Title & Schedule */}
                  <h3 className="text-2xl font-black text-neutral-900 mb-2 uppercase group-hover:text-[#0038FF] transition-colors">Task Round</h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0038FF] bg-[#0038FF]/10 px-3 py-1 rounded-full mb-3 self-start">
                    <Calendar className="size-3.5 text-[#0038FF]" />
                    <span>14–15 October • 48h Window</span>
                  </div>

                  {/* Narrative Body */}
                  <p className="text-neutral-600 text-sm mb-6 leading-relaxed">
                    Practical, hands-on domain challenge tailored to your chosen wing. Demonstrates your real-world execution, craftsmanship, and problem-solving under realistic constraints.
                  </p>

                  {/* Structured Evaluation Criteria */}
                  <div className="space-y-2.5 mt-auto">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-white to-[#F4F7FF] border border-[#0038FF]/15 shadow-xs flex items-start gap-2.5">
                      <span className="size-2 rounded-full bg-[#CCFF00] border border-[#0038FF] mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="text-neutral-900 text-xs font-black uppercase tracking-wider">Execution Quality</p>
                        <p className="text-neutral-500 text-[11px] leading-snug mt-0.5">Deliverable polish, technical accuracy, and domain fundamentals</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-white to-[#F4F7FF] border border-[#0038FF]/15 shadow-xs flex items-start gap-2.5">
                      <span className="size-2 rounded-full bg-[#0038FF] mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="text-neutral-900 text-xs font-black uppercase tracking-wider">Creative Problem-Solving</p>
                        <p className="text-neutral-500 text-[11px] leading-snug mt-0.5">Originality in ideation and ability to handle edge cases</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: GD Round */}
              <motion.div variants={fadeInUp} className="md:col-span-1">
                <div className="rct-card p-7 sm:p-8 rounded-3xl h-full flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0038FF] via-[#CCFF00] to-[#0038FF]" />
                  <div className="absolute -top-10 -right-10 w-44 h-44 bg-[radial-gradient(circle,rgba(204,255,0,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none" />

                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="size-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#0038FF] to-[#001D99] text-[#CCFF00] shadow-[0_4px_16px_rgba(0,56,255,0.35)] group-hover:scale-105 transition-transform">
                      <Users className="size-7 text-[#CCFF00]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black text-[#0038FF] uppercase tracking-widest bg-[#0038FF]/10 px-2.5 py-1 rounded-md">Stage 02</span>
                      <span className="text-[10px] uppercase tracking-widest bg-[#0038FF] text-white px-3 py-1 rounded-full font-black shadow-xs">Offline</span>
                    </div>
                  </div>

                  {/* Title & Schedule */}
                  <h3 className="text-2xl font-black text-neutral-900 mb-2 uppercase group-hover:text-[#0038FF] transition-colors">GD Round</h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0038FF] bg-[#0038FF]/10 px-3 py-1 rounded-full mb-3 self-start">
                    <Calendar className="size-3.5 text-[#0038FF]" />
                    <span>27–28 October • Campus Panels</span>
                  </div>

                  {/* Narrative Body */}
                  <p className="text-neutral-600 text-sm mb-6 leading-relaxed">
                    Interactive group discourse on modern startup and tech trends. Evaluates your ability to articulate logical perspectives, listen attentively, and drive collaborative consensus.
                  </p>

                  {/* Structured Evaluation Criteria */}
                  <div className="space-y-2.5 mt-auto">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-white to-[#F4F7FF] border border-[#0038FF]/15 shadow-xs flex items-start gap-2.5">
                      <span className="size-2 rounded-full bg-[#CCFF00] border border-[#0038FF] mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="text-neutral-900 text-xs font-black uppercase tracking-wider">Articulation & Reasoning</p>
                        <p className="text-neutral-500 text-[11px] leading-snug mt-0.5">Expressing structured arguments with clarity and composure</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-white to-[#F4F7FF] border border-[#0038FF]/15 shadow-xs flex items-start gap-2.5">
                      <span className="size-2 rounded-full bg-[#0038FF] mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="text-neutral-900 text-xs font-black uppercase tracking-wider">Collaborative Leadership</p>
                        <p className="text-neutral-500 text-[11px] leading-snug mt-0.5">Active listening, respectful discourse, and synthesizing viewpoints</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: PI Round */}
              <motion.div variants={fadeInUp} className="md:col-span-1">
                <div className="rct-card p-7 sm:p-8 rounded-3xl h-full flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0038FF] via-[#CCFF00] to-[#0038FF]" />
                  <div className="absolute -top-10 -right-10 w-44 h-44 bg-[radial-gradient(circle,rgba(204,255,0,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none" />

                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="size-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#0038FF] to-[#001D99] text-[#CCFF00] shadow-[0_4px_16px_rgba(0,56,255,0.35)] group-hover:scale-105 transition-transform">
                      <Eye className="size-7 text-[#CCFF00]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black text-[#0038FF] uppercase tracking-widest bg-[#0038FF]/10 px-2.5 py-1 rounded-md">Stage 03</span>
                      <span className="text-[10px] uppercase tracking-widest bg-[#CCFF00] text-black px-3 py-1 rounded-full font-black shadow-xs">Offline</span>
                    </div>
                  </div>

                  {/* Title & Schedule */}
                  <h3 className="text-2xl font-black text-neutral-900 mb-2 uppercase group-hover:text-[#0038FF] transition-colors">PI Round</h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0038FF] bg-[#0038FF]/10 px-3 py-1 rounded-full mb-3 self-start">
                    <Calendar className="size-3.5 text-[#0038FF]" />
                    <span>27–28 October • Dual In-Person Panels</span>
                  </div>

                  {/* Narrative Body */}
                  <p className="text-neutral-600 text-sm mb-6 leading-relaxed">
                    Two focused interview panels conducted in parallel with GD. Evaluates deep technical competency alongside cultural fit, motivation, and entrepreneurial ownership.
                  </p>

                  {/* Structured Evaluation Criteria */}
                  <div className="space-y-2.5 mt-auto">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-white to-[#F4F7FF] border border-[#0038FF]/15 shadow-xs flex items-start gap-2.5">
                      <span className="size-2 rounded-full bg-[#CCFF00] border border-[#0038FF] mt-1.5 flex-shrink-0" />
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-neutral-900 text-xs font-black uppercase tracking-wider">01 • Team-Specific PI</p>
                        </div>
                        <p className="text-neutral-500 text-[11px] leading-snug mt-0.5">Portfolio review, domain depth, past projects & learning agility</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-white to-[#F4F7FF] border border-[#0038FF]/15 shadow-xs flex items-start gap-2.5">
                      <span className="size-2 rounded-full bg-[#0038FF] mt-1.5 flex-shrink-0" />
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-neutral-900 text-xs font-black uppercase tracking-wider">02 • HR & Leadership PI</p>
                        </div>
                        <p className="text-neutral-500 text-[11px] leading-snug mt-0.5">Commitment, dedication, team ethics & alignment with EDC</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
           6. FINAL SELECTION BREAKDOWN
           ════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#001A99] to-[#0022AA] border-t border-white/15 relative overflow-hidden">
          <div className="absolute inset-0 rct-grid-bg opacity-15 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(circle,rgba(204,255,0,0.1)_0%,transparent_70%)] blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
              <SectionLabel>Final Selection</SectionLabel>
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl font-black text-white mt-3 text-center mb-12">
                How Results Are <span className="rct-subtitle">Decided</span>
              </motion.h2>
              <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6">
                <div className="rct-card rounded-3xl p-7 sm:p-9 text-center shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0038FF] via-[#CCFF00] to-[#0038FF]" />
                  <div className="absolute -top-10 -right-10 w-44 h-44 bg-[radial-gradient(circle,rgba(204,255,0,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none" />
                  <span className="text-[#0038FF] text-xs font-black uppercase tracking-[0.25em] block mb-5" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>// 1st Year Formula</span>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {['Aptitude', 'Task', 'GD', 'Team PI', 'HR/EDC PI'].map((item, i, arr) => (
                      <React.Fragment key={i}>
                        <span className="text-neutral-900 font-bold text-sm sm:text-base bg-white shadow-xs px-3.5 py-2 rounded-xl border border-neutral-200/90 hover:border-[#0038FF]/40 transition-colors">{item}</span>
                        {i < arr.length - 1 && <span className="text-[#0038FF] font-black text-lg">+</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="rct-card rounded-3xl p-7 sm:p-9 text-center shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0038FF] via-[#CCFF00] to-[#0038FF]" />
                  <div className="absolute -top-10 -right-10 w-44 h-44 bg-[radial-gradient(circle,rgba(204,255,0,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none" />
                  <span className="text-[#0038FF] text-xs font-black uppercase tracking-[0.25em] block mb-5" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>// 2nd Year Formula</span>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {['Resume', 'Task', 'GD', 'Team PI', 'HR/EDC PI'].map((item, i, arr) => (
                      <React.Fragment key={i}>
                        <span className="text-neutral-900 font-bold text-sm sm:text-base bg-white shadow-xs px-3.5 py-2 rounded-xl border border-neutral-200/90 hover:border-[#0038FF]/40 transition-colors">{item}</span>
                        {i < arr.length - 1 && <span className="text-[#0038FF] font-black text-lg">+</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.p variants={fadeInUp} className="text-white/60 text-sm text-center mt-6 max-w-xl mx-auto">
                The recruitment committee will consolidate performance across the relevant rounds and prepare the final selection list.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
           7. FAQ ACCORDION
           ════════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-[#0022AA] to-[#002BBF] border-t border-white/15">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="text-center mb-12">
              <SectionLabel>Got Questions?</SectionLabel>
              <motion.h2 variants={fadeInUp} className="text-2xl sm:text-4xl font-black text-white">
                Frequently Asked <span className="rct-subtitle">Questions</span>
              </motion.h2>
            </motion.div>

            <div className="space-y-4">
              {FAQ_DATA.map((faq, i) => (
                <div
                  key={i}
                  className="rct-card rounded-2xl overflow-hidden cursor-pointer group transition-all"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <div className="p-5 sm:p-6 flex justify-between items-center gap-4">
                    <h4 className="font-bold text-neutral-900 text-sm sm:text-base group-hover:text-[#0038FF] transition-colors">{faq.q}</h4>
                    <div className={cn(
                      "size-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 border",
                      activeFaq === i
                        ? "bg-[#0038FF] text-[#CCFF00] border-[#0038FF] shadow-[0_0_15px_rgba(0,56,255,0.4)]"
                        : "bg-white text-[#0038FF] border-neutral-200 group-hover:border-[#0038FF]/40"
                    )}>
                      <ChevronRight className={`size-4 transition-transform duration-300 ${activeFaq === i ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 sm:px-6 pb-6 text-neutral-600 text-sm border-t border-neutral-100 pt-4 leading-relaxed bg-gradient-to-b from-[#F8FAFF]/60 to-transparent">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
           8. CTA SECTION
           ════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#002BBF] to-[#00147A] border-t border-white/15">
          <div className="absolute inset-0 rct-grid-bg opacity-20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(204,255,0,0.15)_0%,transparent_60%)] blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
              <div className="rct-card p-8 sm:p-14 rounded-[40px] relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0038FF] via-[#CCFF00] to-[#0038FF]" />
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-[radial-gradient(circle,rgba(204,255,0,0.2)_0%,transparent_70%)] blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[radial-gradient(circle,rgba(0,56,255,0.1)_0%,transparent_70%)] blur-3xl pointer-events-none" />

                <motion.div variants={fadeInUp}>
                  <div className="size-20 rounded-2xl bg-gradient-to-br from-[#0038FF] to-[#001D99] flex items-center justify-center mx-auto mb-6 border-2 border-[#CCFF00] shadow-[0_0_35px_rgba(204,255,0,0.4)]">
                    <Sparkles className="size-10 text-[#CCFF00]" />
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 mb-4 uppercase">
                    Ready to <span className="text-[#0038FF]">Begin?</span>
                  </h2>
                  <p className="text-neutral-600 mb-8 max-w-md mx-auto text-base sm:text-lg leading-relaxed">
                    Registration opens <span className="text-[#0038FF] font-black">7th October</span>. Prepare your best. The Cell awaits.
                  </p>
                  <button className="rct-btn-primary font-black py-4 sm:py-5 px-10 sm:px-12 rounded-full text-base sm:text-lg uppercase tracking-widest inline-flex items-center gap-3 cursor-pointer">
                    Apply Now
                    <ArrowRight className="size-5" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
