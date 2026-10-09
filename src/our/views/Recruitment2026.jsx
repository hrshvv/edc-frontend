import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import { cn } from '@/lib/utils';
import LightRays from '../../components/LightRays';
import { HeroTextVisual } from '../../components/ui/hero';
import {
  Terminal, PenTool, Share2, Settings, Calendar, CheckCircle2, Target,
  Users, Clock, ChevronRight, ChevronLeft, ChevronDown, Zap, ArrowRight, Sparkles,
  Shield, Eye, Brain, MessageCircle, Award, FileText, Cpu, Palette,
  Video, Megaphone, Camera, X, Maximize2, Heart
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
    className="absolute rounded-full pointer-events-none will-change-transform"
    style={{
      width: size, height: size,
      left: `${x}%`, bottom: '-5%',
      background: `radial-gradient(circle, rgba(204,255,0,0.6) 0%, transparent 70%)`,
      animation: `rct-floatUp ${duration}s ease-in-out ${delay}s infinite`,
    }}
  />
);

const HeroMouseOrb = ({ containerRef }) => {
  const orbRef = useRef(null);

  useEffect(() => {
    let animationFrameId = null;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let rect = null;

    const updateRect = () => {
      if (containerRef.current) {
        rect = containerRef.current.getBoundingClientRect();
      }
    };
    updateRect();

    const handleMouseMove = (e) => {
      if (!rect) updateRect();
      if (!rect) return;
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (currentX === -1000) {
        currentX = targetX;
        currentY = targetY;
      }
    };

    const updateLoop = () => {
      if (currentX !== -1000) {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        if (orbRef.current) {
          orbRef.current.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
        }
      }
      animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [containerRef]);

  return (
    <div
      ref={orbRef}
      className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0 will-change-transform"
      style={{
        background: 'radial-gradient(circle, rgba(204,255,0,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)',
      }}
    />
  );
};

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
const TIMELINE_DATA_1ST = [
  {
    stage: 'Application Stage',
    date: '7–12 Oct',
    activity: 'REGISTRATION (Application Stage)',
    mode: 'Online',
    icon: FileText,
    desc: 'Fill out the registration form.',
  },
  {
    stage: 'Round 1',
    date: 'TBA',
    activity: 'ROUND 1 — APTITUDE',
    mode: 'Online',
    icon: Brain,
    desc: 'Basic assessment of logical thinking and problem-solving.',
  },
  {
    stage: 'Round 2',
    date: 'TBA',
    activity: 'ROUND 2 — TASK',
    mode: 'Online',
    icon: Cpu,
    desc: 'Complete a team-specific task to showcase creativity, initiative, and practical thinking.',
  },
  {
    stage: 'Round 3',
    date: 'TBA',
    activity: 'ROUND 3 — GD + PI',
    mode: 'OFFLINE',
    icon: Target,
    desc: 'Demonstrate communication, confidence, teamwork, and willingness to contribute.',
  },
  {
    stage: 'Final Stage',
    date: 'TBA',
    activity: 'FINAL SELECTION & ONBOARDING',
    mode: 'Internal',
    icon: Award,
    desc: 'Consolidated performance results announced. Welcome to EDC — your journey begins.',
  },
];

const TIMELINE_DATA_2ND = [
  {
    stage: 'Application Stage',
    date: '7–12 Oct',
    activity: 'REGISTRATION (Application Stage)',
    mode: 'Online',
    icon: FileText,
    desc: 'Submit the registration form and required details.',
  },
  {
    stage: 'Round 1',
    date: 'TBA',
    activity: 'ROUND 1 — RESUME SHORTLISTING',
    mode: 'Online',
    icon: Brain,
    desc: 'Applications reviewed based on experience, projects, interests, and potential.',
  },
  {
    stage: 'Round 2',
    date: 'TBA',
    activity: 'ROUND 2 — TASK',
    mode: 'Online',
    icon: Cpu,
    desc: 'Showcase your skills, creativity, and ability to turn ideas into action.',
  },
  {
    stage: 'Round 3',
    date: 'TBA',
    activity: 'ROUND 3 — GD + PI',
    mode: 'OFFLINE',
    icon: Target,
    desc: 'Demonstrate communication, role suitability, teamwork, and commitment.',
  },
  {
    stage: 'Final Stage',
    date: 'TBA',
    activity: 'FINAL SELECTION & ONBOARDING',
    mode: 'Internal',
    icon: Award,
    desc: 'Consolidated performance results announced. Welcome to EDC — your journey begins.',
  },
];

const HugeTimeline = ({ activeTab = '1st', setActiveTab }) => {
  const containerRef = useRef(null);
  const [localTab, setLocalTab] = useState('1st');
  const currentTab = setActiveTab ? activeTab : localTab;
  const handleTabChange = setActiveTab ? setActiveTab : setLocalTab;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const timelineData = currentTab === '1st' ? TIMELINE_DATA_1ST : TIMELINE_DATA_2ND;

  return (
    <section id="recruitment-timeline" ref={containerRef} className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#001D99] to-[#0025B8] border-t border-white/15">
      <div className="absolute inset-0 rct-grid-bg opacity-20 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="text-center mb-16">
          <SectionLabel>Battle Timeline</SectionLabel>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl font-black text-white mt-3">
            Register. Compete. <span className="rct-subtitle">Join.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-white/70 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
            Track every critical deadline. Every milestone is a step closer to becoming part of EDC.
          </motion.p>

          {/* Tab Switcher inside Timeline */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex rounded-full p-1.5 bg-white/10 border border-white/25 backdrop-blur-md shadow-xl">
              {['1st', '2nd'].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => handleTabChange(yr)}
                  className={cn(
                    'px-6 sm:px-10 py-2.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer',
                    currentTab === yr
                      ? 'bg-[#CCFF00] text-black shadow-[0_0_25px_rgba(204,255,0,0.4)]'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  {yr === '1st' ? 'First Year' : 'Second Year'}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="relative">
          {/* Background static line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/20 rounded-full hidden md:block" />
          {/* Animated glowing line */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#CCFF00] via-white to-[#CCFF00] rounded-full hidden md:block origin-top will-change-transform"
            style={{ scaleY, filter: 'drop-shadow(0 0 15px #CCFF00)' }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-20 sm:space-y-24"
            >
              {timelineData.map((item, index) => (
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
                      <div className="flex items-center gap-2.5 mb-4 flex-wrap">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#CCFF00] text-black font-black text-[10px] tracking-widest shadow-sm">
                          {item.date}
                        </div>
                        <span className={cn(
                          "text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold border",
                          item.mode === 'OFFLINE' ? 'bg-[#0038FF] text-white border-[#0038FF]' : 'bg-neutral-100 text-neutral-800 border-neutral-300'
                        )}>
                          {item.mode}
                        </span>
                        {item.stage && (
                          <span className="text-[10px] uppercase tracking-wider font-mono font-bold px-2.5 py-1 rounded-full bg-[#0038FF]/10 text-[#0038FF] border border-[#0038FF]/20">
                            {item.stage}
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-3 relative z-10 group-hover:text-[#0038FF] transition-colors duration-300">
                        {item.activity}
                      </h3>
                      <p className="text-neutral-600 text-sm sm:text-base leading-relaxed relative z-10">
                        {item.desc}
                      </p>
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
            </motion.div>
          </AnimatePresence>
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
const PipelineStep = ({ number, stageBadge, title, content, isLast }) => (
  <div className="flex gap-4 sm:gap-6 items-start relative group">
    <div className="flex flex-col items-center">
      <div
        className="flex-shrink-0 size-11 sm:size-12 bg-gradient-to-br from-[#0038FF] to-[#001D99] text-[#CCFF00] font-black rounded-2xl flex items-center justify-center shadow-[0_4px_16px_rgba(0,56,255,0.35)] text-xs sm:text-sm group-hover:scale-105 group-hover:border-[#CCFF00] transition-all border border-white/20"
        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
      >
        {number}
      </div>
      {!isLast && (
        <div className="w-0.5 h-full bg-gradient-to-b from-[#0038FF]/40 via-[#CCFF00]/60 to-neutral-200 mt-2.5 min-h-[50px]" />
      )}
    </div>
    <div className={cn("flex-1", !isLast ? "pb-8 sm:pb-9" : "pb-2")}>
      <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
        <h4 className="text-lg sm:text-2xl font-black text-neutral-900 group-hover:text-[#0038FF] transition-colors tracking-wide">
          {title}
        </h4>
        {stageBadge && (
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0038FF]/10 text-[#0038FF] border border-[#0038FF]/20">
            {stageBadge}
          </span>
        )}
      </div>
      <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">{content}</p>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   FAQ ACCORDION DATA
   ══════════════════════════════════════════════════════════════ */
const FAQ_DATA = [
  { q: 'Is the recruitment process the same for 1st and 2nd year students?', a: 'No. 1st years go through Round 1 (Aptitude test), while 2nd years go through Round 1 (Resume Shortlisting). Both cohorts then advance to Round 2 (Team Task) and Round 3 (Offline GD + PI).' },
  { q: 'Can I apply for more than one team?', a: 'You will indicate your team preference during registration. The task round will be based on your preferred team.' },
  { q: 'What does the Task Round assess?', a: 'Execution, creativity, role-specific skills, problem-solving, and attention to detail. Each team has a different task format.' },
  { q: 'When and where does the GD + PI happen?', a: 'Round 3 (GD + PI) is conducted offline (Dates TBA) on campus, with GD and PI running in parallel.' },
  { q: 'How is the final selection decided?', a: 'For 1st Years: Round 1 (Aptitude) + Round 2 (Task) + Round 3 (GD + PI). For 2nd Years: Round 1 (Resume Shortlisting) + Round 2 (Task) + Round 3 (GD + PI). The recruitment committee consolidates performance across all rounds.' },
];

/* ══════════════════════════════════════════════════════════════
   PEOPLE MEMORIES OF EDC DATA
   ══════════════════════════════════════════════════════════════ */
const MEMORY_CATEGORIES = ['All', 'Team', 'Events', 'Culture', 'Workshops'];

const EDC_MEMORIES = [
  {
    id: 1,
    title: 'The Official EDC Family Cohort',
    subtitle: '50+ Innovators, Mentors & Faculty Coordinators',
    category: 'Team',
    tag: 'Annual Portrait',
    image: '/images/1.jpg',
    caption: 'Faculty coordinators, student leads, and members gathered for the annual university portrait outside campus.',
  },
  {
    id: 2,
    title: "Founder's Pit '26 Finale",
    subtitle: 'Flagship Startup Simulation',
    category: 'Events',
    tag: 'Flagship Finale',
    image: "/images/Founder_s%20Pit.jpeg",
    caption: 'Post-event euphoria: orchestrating a campus-wide startup simulation across 5 high-stakes rounds with 100+ students.',
  },
  {
    id: 3,
    title: 'The Blue Brigade',
    subtitle: 'Campus Steps Gathering',
    category: 'Culture',
    tag: 'Squad Spirit',
    image: '/images/2.png',
    caption: 'Squad on the campus steps in iconic navy EDC polos, gearing up for recruitment season.',
  },
  {
    id: 4,
    title: 'UI/UX Design Studio',
    subtitle: 'Hands-on Skill Sprint',
    category: 'Workshops',
    tag: 'Design Lab',
    image: '/images/UI-UX_workshop.jpg',
    caption: 'Hands-on design sprints where aspiring builders master user experience, wireframing, and product craft.',
  },
  {
    id: 5,
    title: 'Auditorium Keynote Energy',
    subtitle: 'National Entrepreneurship Challenge',
    category: 'Events',
    tag: 'Eureka! Stage',
    image: '/images/eureka%20(2).jpeg',
    caption: 'A packed lecture hall hanging onto every word during keynote sessions and collegiate startup pitches.',
  },
  {
    id: 6,
    title: 'Distinguished Dignitaries & Mentors',
    subtitle: 'Inaugural Summit Ceremony',
    category: 'Team',
    tag: 'Leadership',
    image: "/images/Founder_s%20Pit%20image%202.jpeg",
    caption: 'Academic deans, faculty advisors, and keynote guests inaugurating the flagship cell summit.',
  },
];

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function Recruitment2026() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('1st');
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [activeMemoryFilter, setActiveMemoryFilter] = useState('All');
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrevMemory = (e) => {
    e?.stopPropagation?.();
    if (!selectedMemory) return;
    const currentIndex = EDC_MEMORIES.findIndex((m) => m.id === selectedMemory.id);
    const prevIndex = (currentIndex - 1 + EDC_MEMORIES.length) % EDC_MEMORIES.length;
    setSelectedMemory(EDC_MEMORIES[prevIndex]);
  };

  const handleNextMemory = (e) => {
    e?.stopPropagation?.();
    if (!selectedMemory) return;
    const currentIndex = EDC_MEMORIES.findIndex((m) => m.id === selectedMemory.id);
    const nextIndex = (currentIndex + 1) % EDC_MEMORIES.length;
    setSelectedMemory(EDC_MEMORIES[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedMemory(null);
      if (e.key === 'ArrowLeft') handlePrevMemory();
      if (e.key === 'ArrowRight') handleNextMemory();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMemory]);

  const filteredMemories = activeMemoryFilter === 'All'
    ? EDC_MEMORIES
    : EDC_MEMORIES.filter((m) => m.category === activeMemoryFilter);

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
          0%, 100% { filter: drop-shadow(0 0 10px rgba(204,255,0,0.3)); }
          50%      { filter: drop-shadow(0 0 20px rgba(204,255,0,0.5)); }
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
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
          will-change: transform;
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
          text-decoration: none;
        }
        .rct-btn-primary:hover {
          background: #FFFFFF;
          border-color: #FFFFFF;
          color: #0038FF;
          box-shadow: 0 8px 35px rgba(255, 255, 255, 0.5), 0 0 25px rgba(204, 255, 0, 0.3);
          transform: scale(1.03);
          text-decoration: none;
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
          <HeroMouseOrb containerRef={heroRef} />

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
              const el = document.getElementById('who-can-join') || document.getElementById('recruitment-overview');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative z-50 mt-10 sm:mt-14 pointer-events-auto flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="https://events.edcjssun.com/events/edc-recruitment-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="rct-btn-primary font-black py-3.5 sm:py-4 px-8 sm:px-10 rounded-full text-sm sm:text-base uppercase tracking-widest inline-flex items-center gap-2.5 cursor-pointer select-none no-underline shadow-[0_0_35px_rgba(204,255,0,0.4)] hover:scale-105 transition-all"
            >
              Apply Now
              <ArrowRight className="size-4 sm:size-5" />
            </a>
            <a
              href="https://chat.whatsapp.com/GSDFcDbB2ms6UYhkUsmeRv?s=cl&p=a&ilr=1"
              target="_blank"
              rel="noopener noreferrer"
              className="rct-btn-primary font-black py-3.5 sm:py-4 px-8 sm:px-10 rounded-full text-sm sm:text-base uppercase tracking-widest inline-flex items-center gap-2.5 cursor-pointer select-none no-underline shadow-[0_0_35px_rgba(204,255,0,0.4)] hover:scale-105 transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Join WhatsApp
            </a>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════
           1.5 WHO CAN JOIN EDC
           ════════════════════════════════════════════════════════ */}
        <section
          id="who-can-join"
          className="relative py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#0038FF] via-[#002FB8] to-[#0038FF] border-t border-white/15 overflow-hidden"
        >
          <div className="absolute inset-0 rct-grid-bg opacity-15 pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="text-center mb-10 sm:mb-12"
            >
              <SectionLabel>Eligibility & Fit</SectionLabel>
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl font-black text-white mt-2">
                Who Can Join <span className="rct-subtitle">EDC?</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-white/75 mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                If you have the curiosity to learn, the drive to create, and the hunger to make things happen — you belong here.
              </motion.p>
            </motion.div>

            {/* Quick Criteria Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="grid sm:grid-cols-3 gap-5"
            >
              {[
                {
                  icon: Users,
                  tag: 'Eligibility',
                  title: '1st & 2nd Year Students',
                  desc: 'Open to all 1st and 2nd year students from any branch or course. No branch restrictions.',
                },
                {
                  icon: Target,
                  tag: 'Skillsets',
                  title: 'Builders, Creators & Leads',
                  desc: 'Whether you write code, design visuals, produce videos, write copy, or manage events — there is a place for you.',
                },
                {
                  icon: Sparkles,
                  tag: 'Mindset',
                  title: 'Passion Over Prior Skills',
                  desc: 'You do not need heavy prior skills. Eagerness to learn, initiative, and problem-solving matter far more.',
                },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <div className="rct-card p-6 sm:p-7 rounded-3xl h-full flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0038FF] via-[#CCFF00] to-transparent opacity-80" />
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="size-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#0038FF] to-[#001D99] text-[#CCFF00] shadow-[0_4px_14px_rgba(0,56,255,0.3)] group-hover:scale-105 transition-transform">
                          <item.icon className="size-5 text-[#CCFF00]" />
                        </div>
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#0038FF]/10 text-[#0038FF] border border-[#0038FF]/15">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-neutral-900 mb-2 group-hover:text-[#0038FF] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Misconception Buster Callout */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="mt-6 sm:mt-7"
            >
              <div className="relative rounded-3xl p-6 sm:p-8 bg-white/10 backdrop-blur-xl border border-white/25 overflow-hidden shadow-2xl">
                {/* Glow accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CCFF00] via-white to-[#CCFF00]" />
                <div className="absolute -top-12 -right-12 w-44 h-44 bg-[radial-gradient(circle,rgba(204,255,0,0.2)_0%,transparent_70%)] blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
                  <div className="flex items-start gap-4">
                    <div className="size-11 sm:size-12 rounded-2xl bg-[#CCFF00] text-black font-black flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(204,255,0,0.4)] mt-0.5">
                      <Sparkles className="size-6 text-black" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-white/15 text-[#CCFF00] border border-[#CCFF00]/30">
                          // Common Misconception Busted
                        </span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-white">
                        "Do I already need very high or expert skills to join EDC?"
                      </h4>
                      <p className="text-white/80 text-xs sm:text-sm mt-1.5 leading-relaxed max-w-2xl">
                        <span className="text-[#CCFF00] font-bold">Not at all!</span> A huge misconception is that only experts can apply. You do <span className="underline decoration-[#CCFF00] font-bold">not</span> need advanced prior skills or pre-existing projects to join. EDC is where you <span className="text-white font-bold">learn by doing</span> — working on real initiatives, high-impact events, and real-world products together with seniors and mentors.
                      </p>
                    </div>
                  </div>

                  <div className="flex-shrink-0 self-stretch md:self-auto flex items-center">
                    <div className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-center w-full md:w-auto">
                      <p className="text-[#CCFF00] text-[10px] font-mono font-bold uppercase tracking-wider">What We Value Most</p>
                      <p className="text-white text-xs sm:text-sm font-black mt-0.5">Curiosity • Willingness to Learn • Drive</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
           2. ROUND STRUCTURE & GUIDELINES
           ════════════════════════════════════════════════════════ */}
        <section
          id="recruitment-overview"
          className="relative py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#0038FF] to-[#0026C8] border-t border-white/15"
        >
          <div className="absolute inset-0 rct-grid-bg opacity-20 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="text-center mb-16">
              <SectionLabel>Round Structure & Guidelines</SectionLabel>
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl font-black text-white mt-3">
                Round Structure & <span className="rct-subtitle">Guidelines</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-white/75 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
                Structured process conducted separately for 1st-year and 2nd-year applicants.
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
                    {yr === '1st' ? 'First Year' : 'Second Year'}
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
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-12 px-2">
                  {(activeTab === '1st'
                    ? ['Registration', 'Round 1: Aptitude', 'Round 2: Task', 'Round 3: GD + PI']
                    : ['Registration', 'Round 1: Resume Shortlisting', 'Round 2: Task', 'Round 3: GD + PI']
                  ).map((step, i, arr) => (
                    <React.Fragment key={i}>
                      <span className="text-[10px] sm:text-xs font-black text-[#CCFF00] uppercase tracking-wider bg-white/15 px-3.5 py-1.5 rounded-full border border-white/25 whitespace-nowrap shadow-sm">
                        {step}
                      </span>
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
                      <PipelineStep
                        number="00"
                        stageBadge="Application Stage"
                        title="REGISTRATION"
                        content="Fill out the registration form."
                      />
                      <PipelineStep
                        number="01"
                        stageBadge="Round 1"
                        title="ROUND 1 — APTITUDE"
                        content="Basic assessment of logical thinking and problem-solving."
                      />
                      <PipelineStep
                        number="02"
                        stageBadge="Round 2"
                        title="ROUND 2 — TASK"
                        content="Complete a team-specific task to showcase creativity, initiative, and practical thinking."
                      />
                      <PipelineStep
                        number="03"
                        stageBadge="Round 3"
                        title="ROUND 3 — GD + PI"
                        content="Demonstrate communication, confidence, teamwork, and willingness to contribute."
                        isLast
                      />
                    </>
                  ) : (
                    <>
                      <PipelineStep
                        number="00"
                        stageBadge="Application Stage"
                        title="REGISTRATION"
                        content="Submit the registration form and required details."
                      />
                      <PipelineStep
                        number="01"
                        stageBadge="Round 1"
                        title="ROUND 1 — RESUME SHORTLISTING"
                        content="Applications reviewed based on experience, projects, interests, and potential."
                      />
                      <PipelineStep
                        number="02"
                        stageBadge="Round 2"
                        title="ROUND 2 — TASK"
                        content="Showcase your skills, creativity, and ability to turn ideas into action."
                      />
                      <PipelineStep
                        number="03"
                        stageBadge="Round 3"
                        title="ROUND 3 — GD + PI"
                        content="Demonstrate communication, role suitability, teamwork, and commitment."
                        isLast
                      />
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
          <HugeTimeline activeTab={activeTab} setActiveTab={setActiveTab} />
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
                      <span className="text-[10px] font-mono font-black text-[#0038FF] uppercase tracking-widest bg-[#0038FF]/10 px-2.5 py-1 rounded-md">Round 02</span>
                      <span className="text-[10px] uppercase tracking-widest bg-[#CCFF00] text-black px-3 py-1 rounded-full font-black shadow-xs">Online</span>
                    </div>
                  </div>

                  {/* Title & Schedule */}
                  <h3 className="text-2xl font-black text-neutral-900 mb-2 uppercase group-hover:text-[#0038FF] transition-colors">Task Round</h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0038FF] bg-[#0038FF]/10 px-3 py-1 rounded-full mb-3 self-start">
                    <Calendar className="size-3.5 text-[#0038FF]" />
                    <span>TBA • 48h Window</span>
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
                      <span className="text-[10px] font-mono font-black text-[#0038FF] uppercase tracking-widest bg-[#0038FF]/10 px-2.5 py-1 rounded-md">Round 03</span>
                      <span className="text-[10px] uppercase tracking-widest bg-[#0038FF] text-white px-3 py-1 rounded-full font-black shadow-xs">Offline</span>
                    </div>
                  </div>

                  {/* Title & Schedule */}
                  <h3 className="text-2xl font-black text-neutral-900 mb-2 uppercase group-hover:text-[#0038FF] transition-colors">GD Round</h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0038FF] bg-[#0038FF]/10 px-3 py-1 rounded-full mb-3 self-start">
                    <Calendar className="size-3.5 text-[#0038FF]" />
                    <span>TBA • Campus Panels</span>
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
                      <span className="text-[10px] font-mono font-black text-[#0038FF] uppercase tracking-widest bg-[#0038FF]/10 px-2.5 py-1 rounded-md">Round 03</span>
                      <span className="text-[10px] uppercase tracking-widest bg-[#CCFF00] text-black px-3 py-1 rounded-full font-black shadow-xs">Offline</span>
                    </div>
                  </div>

                  {/* Title & Schedule */}
                  <h3 className="text-2xl font-black text-neutral-900 mb-2 uppercase group-hover:text-[#0038FF] transition-colors">PI Round</h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0038FF] bg-[#0038FF]/10 px-3 py-1 rounded-full mb-3 self-start">
                    <Calendar className="size-3.5 text-[#0038FF]" />
                    <span>TBA • Dual In-Person Panels</span>
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
                  <span className="text-[#0038FF] text-xs font-black uppercase tracking-[0.25em] block mb-5" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>// 1st Year Evaluation</span>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {['R1: Aptitude', 'R2: Task', 'R3: GD + PI'].map((item, i, arr) => (
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
                  <span className="text-[#0038FF] text-xs font-black uppercase tracking-[0.25em] block mb-5" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>// 2nd Year Evaluation</span>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {['R1: Resume', 'R2: Task', 'R3: GD + PI'].map((item, i, arr) => (
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
           7. PEOPLE MEMORIES OF EDC
           ════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#0022AA] to-[#00188C] border-t border-white/15 relative overflow-hidden">
          <div className="absolute inset-0 rct-grid-bg opacity-15 pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(circle,rgba(204,255,0,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={staggerContainer}>
              <div className="text-center mb-10">
                <SectionLabel>Life Inside The Cell</SectionLabel>
                <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl font-black text-white mt-3">
                  The People. The <span className="rct-subtitle">Memories.</span>
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-white/70 max-w-2xl mx-auto mt-4 text-base sm:text-lg leading-relaxed">
                  Beyond tasks and rounds — it’s the late nights, high-stakes pitches, auditorium cheers, and a family that builds together.
                </motion.p>

                {/* Cultural Highlights Ticker */}
                <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-3 mt-6">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-[#CCFF00] border border-[#CCFF00]/30 backdrop-blur-md flex items-center gap-2">
                    <Users className="size-3.5" /> 50+ Passionate Members
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20 backdrop-blur-md flex items-center gap-2">
                    <Sparkles className="size-3.5 text-[#CCFF00]" /> 10+ Flagship Initiatives
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20 backdrop-blur-md flex items-center gap-2">
                    <Camera className="size-3.5 text-[#CCFF00]" /> Countless Moments
                  </span>
                </motion.div>

                {/* Category Filter Pills */}
                <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-2 mt-8">
                  {MEMORY_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveMemoryFilter(cat)}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer select-none",
                        activeMemoryFilter === cat
                          ? "bg-[#CCFF00] text-black shadow-[0_0_20px_rgba(204,255,0,0.4)] scale-105"
                          : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/15"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              </div>

              {/* Editorial Memories Layout */}
              {activeMemoryFilter === 'All' ? (
                <div className="space-y-6">
                  {/* 1. HERO PANORAMIC CARD (Full Widescreen View for Annual Group Photo) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setSelectedMemory(EDC_MEMORIES[0])}
                    className="group relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.6/1] min-h-[260px] sm:min-h-[360px] rounded-3xl overflow-hidden cursor-pointer border border-white/25 shadow-2xl hover:shadow-[0_25px_60px_rgba(0,56,255,0.45)] hover:border-[#CCFF00]/80 transition-all duration-500 bg-black/40"
                  >
                    <img
                      src={EDC_MEMORIES[0].image}
                      alt={EDC_MEMORIES[0].title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Top Floating Badge */}
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-20 pointer-events-none">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-black/75 backdrop-blur-md text-[#CCFF00] border border-[#CCFF00]/50 flex items-center gap-2 shadow-lg">
                        <Sparkles className="size-3.5 text-[#CCFF00]" />
                        Featured Cohort • 2025–2026
                      </span>
                      <div className="size-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-lg">
                        <Maximize2 className="size-5" />
                      </div>
                    </div>

                    {/* Glass Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                    {/* Bottom Caption Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <span className="text-[#CCFF00] text-xs font-mono font-bold tracking-widest uppercase block mb-1">
                          // {EDC_MEMORIES[0].category} • Annual University Portrait
                        </span>
                        <h3 className="text-xl sm:text-3xl font-black text-white group-hover:text-[#CCFF00] transition-colors">
                          {EDC_MEMORIES[0].title}
                        </h3>
                        <p className="text-white/80 text-xs sm:text-base mt-1.5 max-w-2xl leading-relaxed">
                          {EDC_MEMORIES[0].caption}
                        </p>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black bg-[#CCFF00] px-4 py-2 rounded-full shadow-[0_0_15px_rgba(204,255,0,0.4)] group-hover:scale-105 transition-transform flex-shrink-0 select-none">
                        Expand Photo <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </motion.div>

                  {/* 2. THE MOMENTS TRIPLE (3 Symmetrical Cards) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[EDC_MEMORIES[1], EDC_MEMORIES[2], EDC_MEMORIES[3]].map((mem) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        key={mem.id}
                        onClick={() => setSelectedMemory(mem)}
                        className="group relative rounded-3xl overflow-hidden cursor-pointer border border-white/20 shadow-xl hover:shadow-[0_20px_50px_rgba(0,56,255,0.4)] hover:border-[#CCFF00]/70 transition-all duration-500 bg-black/40 aspect-[4/3]"
                      >
                        <img
                          src={mem.image}
                          alt={mem.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#CCFF00] border border-[#CCFF00]/40 flex items-center gap-1.5 shadow-md">
                            <Sparkles className="size-3 text-[#CCFF00]" />
                            {mem.tag}
                          </span>
                          <div className="size-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 shadow-md">
                            <Maximize2 className="size-4" />
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-20 transform group-hover:translate-y-[-2px] transition-transform duration-300">
                          <span className="text-[#CCFF00] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase block mb-1">
                            // {mem.category}
                          </span>
                          <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-[#CCFF00] transition-colors">
                            {mem.title}
                          </h3>
                          <p className="text-white/80 text-xs sm:text-sm mt-1 line-clamp-2 leading-relaxed">
                            {mem.caption}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* 3. THE AUDITORIUM DUAL (2 Symmetrical Wide Cards) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[EDC_MEMORIES[4], EDC_MEMORIES[5]].map((mem) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        key={mem.id}
                        onClick={() => setSelectedMemory(mem)}
                        className="group relative rounded-3xl overflow-hidden cursor-pointer border border-white/20 shadow-xl hover:shadow-[0_20px_50px_rgba(0,56,255,0.4)] hover:border-[#CCFF00]/70 transition-all duration-500 bg-black/40 aspect-[16/9]"
                      >
                        <img
                          src={mem.image}
                          alt={mem.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#CCFF00] border border-[#CCFF00]/40 flex items-center gap-1.5 shadow-md">
                            <Sparkles className="size-3 text-[#CCFF00]" />
                            {mem.tag}
                          </span>
                          <div className="size-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 shadow-md">
                            <Maximize2 className="size-4" />
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-20 transform group-hover:translate-y-[-2px] transition-transform duration-300">
                          <span className="text-[#CCFF00] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase block mb-1">
                            // {mem.category}
                          </span>
                          <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-[#CCFF00] transition-colors">
                            {mem.title}
                          </h3>
                          <p className="text-white/80 text-xs sm:text-sm mt-1 line-clamp-2 leading-relaxed">
                            {mem.caption}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Filtered Uniform Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredMemories.map((mem) => (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35 }}
                        key={mem.id}
                        onClick={() => setSelectedMemory(mem)}
                        className="group relative rounded-3xl overflow-hidden cursor-pointer border border-white/20 shadow-xl hover:shadow-[0_20px_50px_rgba(0,56,255,0.4)] hover:border-[#CCFF00]/70 transition-all duration-500 bg-black/40 aspect-[4/3]"
                      >
                        <img
                          src={mem.image}
                          alt={mem.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#CCFF00] border border-[#CCFF00]/40 flex items-center gap-1.5 shadow-md">
                            <Sparkles className="size-3 text-[#CCFF00]" />
                            {mem.tag}
                          </span>
                          <div className="size-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 shadow-md">
                            <Maximize2 className="size-4" />
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-20 transform group-hover:translate-y-[-2px] transition-transform duration-300">
                          <span className="text-[#CCFF00] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase block mb-1">
                            // {mem.category}
                          </span>
                          <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-[#CCFF00] transition-colors">
                            {mem.title}
                          </h3>
                          <p className="text-white/80 text-xs sm:text-sm mt-1 line-clamp-2 leading-relaxed">
                            {mem.caption}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
           8. FAQ ACCORDION
           ════════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-[#00188C] to-[#0025B5] border-t border-white/15">
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
                  <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
                    <a
                      href="https://events.edcjssun.com/events/edc-recruitment-2026"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rct-btn-primary font-black py-3.5 sm:py-4 px-8 sm:px-10 rounded-full text-sm sm:text-base uppercase tracking-widest inline-flex items-center gap-2.5 cursor-pointer select-none no-underline shadow-[0_0_25px_rgba(204,255,0,0.35)] hover:scale-105 transition-all"
                    >
                      Apply Now
                      <ArrowRight className="size-4 sm:size-5" />
                    </a>
                    <a
                      href="https://chat.whatsapp.com/GSDFcDbB2ms6UYhkUsmeRv?s=cl&p=a&ilr=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rct-btn-primary font-black py-3.5 sm:py-4 px-8 sm:px-10 rounded-full text-sm sm:text-base uppercase tracking-widest inline-flex items-center gap-2.5 cursor-pointer select-none no-underline shadow-[0_0_25px_rgba(204,255,0,0.35)] hover:scale-105 transition-all"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                      </svg>
                      Join WhatsApp
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>



        <Footer />
      </div>

      {/* LIGHTBOX MODAL WITH CAROUSEL CONTROLS */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 md:p-8 cursor-pointer select-none"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#00147A] border border-white/25 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] cursor-default flex flex-col"
            >
              {/* Header Bar with Counter & Close */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#00188C] to-[#00105C] border-b border-white/15 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#CCFF00] text-black shadow-sm">
                    {selectedMemory.tag}
                  </span>
                  <span className="text-white/60 text-xs font-mono hidden sm:inline">
                    // {selectedMemory.category}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-white/70 text-xs font-mono tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/15">
                    {EDC_MEMORIES.findIndex((m) => m.id === selectedMemory.id) + 1} / {EDC_MEMORIES.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedMemory(null)}
                    className="size-9 rounded-full bg-white/10 hover:bg-[#CCFF00] text-white hover:text-black border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                    aria-label="Close photo preview"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              {/* Main Image Viewport with Carousel Navigation */}
              <div className="relative w-full max-h-[65vh] bg-black/60 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  className="w-full h-auto max-h-[65vh] object-contain transition-all duration-300"
                />

                {/* Left Arrow Button */}
                <button
                  type="button"
                  onClick={handlePrevMemory}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 size-11 sm:size-12 rounded-full bg-black/65 hover:bg-[#CCFF00] text-white hover:text-black border border-white/30 flex items-center justify-center transition-all cursor-pointer shadow-2xl hover:scale-110 active:scale-95"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="size-6" />
                </button>

                {/* Right Arrow Button */}
                <button
                  type="button"
                  onClick={handleNextMemory}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 size-11 sm:size-12 rounded-full bg-black/65 hover:bg-[#CCFF00] text-white hover:text-black border border-white/30 flex items-center justify-center transition-all cursor-pointer shadow-2xl hover:scale-110 active:scale-95"
                  aria-label="Next photo"
                >
                  <ChevronRight className="size-6" />
                </button>
              </div>

              {/* Footer Details */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-[#001A99] to-[#00126B] border-t border-white/15">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {selectedMemory.title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                  {selectedMemory.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
