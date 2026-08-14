import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import { getEventBySlug } from '../data/eventsData';
import {
  Rocket,
  Target,
  Users,
  Presentation,
  ArrowRight,
  Zap,
  Globe,
  Trophy,
  Medal,
  Award,
  Calendar,
  MapPin,
  Building2,
  CheckCircle2,
  Info,
  Lightbulb,
  TrendingUp,
  Star,
  Flame,
  ChevronDown,
  Sparkles,
  Crown,
  Eye,
  Mic2,
  GraduationCap,
  BarChart3
} from 'lucide-react';

/* ─── Animation Variants ─────────────────────────────────────── */
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
const staggerChildrenOnly = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

/* ─── Section Label ──────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 mb-4">
    <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#05B1DE]" />
    <span className="text-[#05B1DE] text-xs font-bold tracking-[0.25em] uppercase eureka-mono">{children}</span>
    <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#05B1DE]" />
  </motion.div>
);

/* ─── Glow Card ──────────────────────────────────────────────── */
const GlowCard = ({ children, className = '', glowColor = '#05B1DE' }) => (
  <div className={`relative group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/20 ${className}`}>
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
      style={{ boxShadow: `inset 0 0 60px 0 ${glowColor}18, 0 0 40px 0 ${glowColor}10` }}
    />
    <div className="relative z-10">{children}</div>
  </div>
);

/* ─── Stat Pill ──────────────────────────────────────────────── */
const StatPill = ({ val, label, color = '#05B1DE' }) => (
  <motion.div variants={scaleIn} className="flex flex-col items-center gap-1 px-5 py-5 rounded-xl bg-white/[0.03] border border-white/8 hover:border-white/20 transition-all duration-300 group">
    <span className="text-3xl font-black tracking-tight group-hover:scale-110 transition-transform duration-300" style={{ color }}>{val}</span>
    <span className="text-xs text-neutral-500 font-medium text-center leading-tight">{label}</span>
  </motion.div>
);

const eureka2025Event = getEventBySlug('eureka-road-to-enterprise-2025');

/* ─── Eureka 2025 Poster & Gallery ───────────────────────────── */
const Eureka2025Media = ({ poster, gallery }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!poster && (!gallery || gallery.length === 0)) return null;

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const goNext = () => setActiveIndex((prev) => (prev + 1) % gallery.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3 items-start"
      >
        {poster && (
          <motion.div variants={fadeInLeft}>
            <GlowCard className="p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#05B1DE] mb-4 eureka-mono">Event Poster</p>
              <div className="relative rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={poster}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover scale-110"
                  style={{ filter: 'blur(30px) brightness(0.35) saturate(1.3)' }}
                />
                <div className="absolute inset-0 bg-black/25" />
                <img
                  src={poster}
                  alt="Eureka! Road to Enterprise 2025 poster"
                  className="relative z-10 max-w-full max-h-[280px] sm:max-h-[340px] object-contain rounded-lg"
                />
              </div>
            </GlowCard>
          </motion.div>
        )}

        {gallery?.length > 0 && (
          <motion.div variants={fadeInRight} className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#05B1DE] eureka-mono">Event Photos</p>
            <GlowCard className="p-3 sm:p-4">
              <button
                type="button"
                onClick={() => openLightbox(activeIndex)}
                className="relative w-full overflow-hidden rounded-xl cursor-pointer group min-h-[180px] sm:min-h-[220px]"
              >
                <img
                  src={gallery[activeIndex].image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover scale-110"
                  style={{ filter: 'blur(30px) brightness(0.35) saturate(1.3)' }}
                />
                <div className="absolute inset-0 bg-black/20" />
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                    src={gallery[activeIndex].image}
                    alt={`Eureka 2025 event photo ${activeIndex + 1}`}
                    className="relative z-10 w-full h-auto max-h-[200px] sm:max-h-[260px] object-contain mx-auto"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 pointer-events-none">
                  <span className="text-xs font-semibold text-white px-3 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm">
                    View full size
                  </span>
                </div>
                <span className="absolute bottom-3 right-3 text-[10px] font-medium text-white px-2 py-1 rounded-full bg-black/60 border border-white/10 eureka-mono">
                  {activeIndex + 1} / {gallery.length}
                </span>
              </button>
            </GlowCard>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {gallery.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all duration-300"
                  style={{
                    border: activeIndex === idx ? '2px solid #05B1DE' : '2px solid rgba(255,255,255,0.08)',
                    opacity: activeIndex === idx ? 1 : 0.55,
                    transform: activeIndex === idx ? 'scale(1)' : 'scale(0.96)',
                  }}
                >
                  <img src={img.image} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {lightboxOpen && gallery?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white text-xl leading-none"
              aria-label="Close gallery"
            >
              ×
            </button>
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-4 sm:left-8 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white"
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-4 sm:right-8 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white"
                  aria-label="Next photo"
                >
                  ›
                </button>
              </>
            )}
            <motion.img
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={gallery[activeIndex].image}
              alt={`Eureka 2025 event photo ${activeIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ─── Main Component ─────────────────────────────────────────── */
const Eureka2026 = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    document.title = 'Eureka! 2026 – Road to Enterprise | EDC JSSUN';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Eureka! 2026 is a two-round startup ideation and pitching competition organized by EDC JSS University Noida in association with E-Cell IIT Bombay.';
    }
    // Inject Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const scrollToAbout = (e) => {
    e.preventDefault();
    const about = document.getElementById('about');
    if (!about) return;
    const offset = window.innerWidth >= 768 ? 100 : 72;
    const top = about.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="eureka-page bg-[#020008] min-h-screen text-neutral-200 selection:bg-[#05B1DE]/30 overflow-hidden">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-30 pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Layered background glows */}
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dftvt6ooo/image/upload/v1779895249/teamedc_compressed_pjduwe.jpg')] bg-cover bg-center opacity-[0.025] mix-blend-screen" />
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#05B1DE]/15 rounded-full blur-[160px]" />
          <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-blue-800/8 rounded-full blur-[100px]" />
        </motion.div>
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#05B1DE08_1px,transparent_1px),linear-gradient(to_bottom,#05B1DE08_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#05B1DE]/30 bg-[#05B1DE]/5 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#05B1DE]" />
            <span className="text-[#05B1DE] text-xs font-bold tracking-[0.2em] uppercase eureka-mono">E-Cell IIT Bombay × EDC JSSUN</span>
            <Sparkles className="w-3.5 h-3.5 text-[#05B1DE]" />
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="https://res.cloudinary.com/dh8cqlngr/image/upload/v1786714728/Gemini_Generated_Image_ebw319ebw319ebw3_1_npzxi9.png"
              alt="Eureka! 2026 - Road to Enterprise"
              className="mx-auto w-[85%] max-w-[600px] drop-shadow-[0_0_60px_rgba(5,177,222,.5)] object-contain pointer-events-none select-none"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-12 text-l sm:text-xl font-semibold text-white mb-5 tracking-tight eureka-heading"
          >
            A two-round startup ideation and pitching competition by EDC JSS University Noida,
            in association with E-Cell IIT Bombay under NEC 2026.
          </motion.p>


          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://events.edcjssun.com/events/eureka-2026"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 eureka-heading"
              style={{ background: 'linear-gradient(135deg, #05B1DE, #0284c7)' }}
            >
              <span className="relative flex items-center gap-2">
                REGISTER NOW
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </a>
            <a
              href="#about"
              onClick={scrollToAbout}
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-300 font-medium text-sm group"
            >
              Learn more
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="group-hover:translate-y-0.5 transition-transform duration-300"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </a>
          </motion.div>

          {/* Collaboration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 sm:mt-24 flex items-center justify-center w-full max-w-3xl mx-auto px-2"
          >
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-white/20" />

            <div className="flex items-center gap-3 sm:gap-5 px-3 sm:px-5">
              <span className="text-neutral-400 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs eureka-mono whitespace-nowrap">
                In Collaboration With
              </span>
              <div className="bg-[#f8fafc] rounded-xl p-2 sm:p-2.5 flex items-center justify-center h-10 sm:h-12 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <img
                  src="https://res.cloudinary.com/dh8cqlngr/image/upload/v1786716299/su6p2yy67fgbvajqwk3e_q9ncp3.png"
                  alt="Partner Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>

            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-2 rounded-full bg-[#05B1DE]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── WHAT IS EUREKA! 2026? ──────────────────────────────── */}
      <section id="about" className="py-28 px-4 sm:px-6 relative scroll-mt-20 md:scroll-mt-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05B1DE]/3 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer} className="text-center mb-16"
          >
            <SectionLabel>About the Event</SectionLabel>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 eureka-heading">
              What is <span className="text-[#05B1DE]">Eureka! 2026?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
              Eureka! brings together aspiring student founders from JSS University, Noida
              for a structured, high-impact startup pitching experience.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Round 1 */}
            <motion.div variants={fadeInLeft}>
              <GlowCard glowColor="#05B1DE" className="p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#05B1DE]/15 border border-[#05B1DE]/30 flex items-center justify-center">
                    <span className="text-[#05B1DE] font-black text-sm eureka-mono">01</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#05B1DE]/40 to-transparent" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight eureka-heading">ONLINE IDEA SUBMISSION</h3>
                <p className="text-sm text-neutral-500 mb-5 font-light eureka-mono">Round One — Virtual Screening</p>
                <p className="text-neutral-400 mb-5 text-sm leading-relaxed">
                  Submit your startup idea and pitch deck online. Teams are evaluated on:
                </p>
                <ul className="space-y-2.5 mb-6">
                  {['Problem Statement', 'Proposed Solution', 'Innovation', 'Market Potential', 'Business Model', 'Feasibility & Scalability'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#05B1DE] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="p-3.5 rounded-xl bg-[#05B1DE]/8 border border-[#05B1DE]/20 text-center">
                  <p className="text-[#05B1DE] font-bold text-sm">🏆 Top 20 teams advance to the final</p>
                </div>
              </GlowCard>
            </motion.div>

            {/* Round 2 */}
            <motion.div variants={fadeInRight}>
              <GlowCard glowColor="#06b6d4" className="p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-black text-sm eureka-mono">02</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight eureka-heading">FINAL OFFLINE PITCHING</h3>
                <p className="text-sm text-neutral-500 mb-5 font-light eureka-mono">Round Two — Live at JSS University</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <p className="text-neutral-400 text-sm leading-relaxed">Pitch before <strong className="text-white font-semibold">4 invited industry experts</strong> at JSS University, Noida.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mic2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <p className="text-neutral-400 text-sm leading-relaxed">Each team gets <strong className="text-white font-semibold">5–7 minutes</strong> to pitch, followed by a live Q&A with the jury.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Eye className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <p className="text-neutral-400 text-sm leading-relaxed">Evaluated from a <strong className="text-white font-semibold">real-world business perspective</strong>.</p>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PRIZES ─────────────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#05B1DE0a_0%,_transparent_70%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer} className="text-center mb-16"
          >
            <SectionLabel>Rewards</SectionLabel>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 eureka-heading">
              What Can You <span className="text-yellow-400">Win?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-neutral-400 text-lg font-light max-w-xl mx-auto">
              Beyond prizes — a pathway for promising ideas to progress further.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {[
              { title: 'Winner', icon: Crown, color: 'text-yellow-400', glow: '#eab308', gradient: 'from-yellow-900/25 via-yellow-900/10 to-transparent', border: 'border-yellow-500/25', prize: '₹3,000', extra: 'Trophy + Certificate', detail: 'Opportunity to progress toward the Eureka! Zonal Round.' },
              { title: 'Runner-Up', icon: Medal, color: 'text-neutral-300', glow: '#94a3b8', gradient: 'from-neutral-800/30 via-neutral-800/10 to-transparent', border: 'border-neutral-500/25', prize: '₹2,000', extra: 'Trophy + Certificate', detail: 'Opportunity for further Eureka! consideration.' },
              { title: 'Second Runner-Up', icon: Medal, color: 'text-amber-600', glow: '#d97706', gradient: 'from-amber-900/20 via-amber-900/8 to-transparent', border: 'border-amber-700/25', prize: '₹1,000', extra: 'Trophy + Certificate', detail: 'Opportunity for further Eureka! consideration.' }
            ].map((prize, i) => (
              <motion.div key={i} variants={scaleIn}>
                <div className={`relative p-8 rounded-2xl bg-gradient-to-b ${prize.gradient} border ${prize.border} text-center overflow-hidden group cursor-default transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full`}>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <span className={`text-xs font-black ${prize.color} eureka-mono`}>#{i + 1}</span>
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ boxShadow: `inset 0 0 80px 0 ${prize.glow}15` }}
                  />
                  <div className={`w-16 h-16 mx-auto rounded-2xl border ${prize.border} bg-black/30 flex items-center justify-center mb-5`}>
                    <prize.icon className={`w-8 h-8 ${prize.color}`} />
                  </div>
                  <h3 className={`text-sm font-bold ${prize.color} mb-3 tracking-widest uppercase eureka-mono`}>{prize.title}</h3>
                  <div className="text-5xl font-black text-white mb-2 tracking-tight eureka-heading">{prize.prize}</div>
                  <p className="text-xs font-semibold text-neutral-400 mb-5 uppercase tracking-widest eureka-mono">{prize.extra}</p>
                  <div className="h-px bg-white/5 mb-5" />
                  <p className="text-sm text-neutral-500 leading-relaxed">{prize.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {[
              { label: '6k+ Prize Pool', icon: Award, color: '#eab308' },
              { label: 'Goodies', icon: Sparkles, color: '#05B1DE' },
              { label: 'Certificates for all participants', icon: Medal, color: '#22d3ee' },
              { label: 'Trophies for winning teams', icon: Trophy, color: '#eab308' },
              { label: 'Post Event Mentorship Support via JSS STEP', icon: Lightbulb, color: '#05B1DE' }
            ].map((perk, i) => (
              <motion.div key={i} variants={fadeInUp} className={`${i === 4 ? 'col-span-2 md:col-span-1' : 'col-span-1'}`}>
                <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300 h-full text-center group">
                  <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${perk.color}15`, color: perk.color }}>
                    <perk.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-neutral-300 group-hover:text-white transition-colors">{perk.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EUREKA! 2025 HIGHLIGHTS ────────────────────────────── */}
      <section className="pt-24 pb-10 px-4 sm:px-6 relative border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#05B1DE]/5 via-transparent to-cyan-900/5 pointer-events-none" />
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#05B1DE]/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer} className="text-center mb-16"
          >
            <SectionLabel>Previous Edition</SectionLabel>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 eureka-heading">
              Eureka! <span className="text-[#05B1DE]">2025</span> — Highlights
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-neutral-400 text-lg font-light max-w-2xl mx-auto">
              Last year's Eureka! was a landmark edition — here's a snapshot of the impact.
            </motion.p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
          >
            {[
              { val: '350+', label: 'Online Registrations', color: '#05B1DE' },
              { val: '20+', label: 'Selected Teams', color: '#22d3ee' },
              { val: '80+', label: 'Offline Participants', color: '#05B1DE' },
              { val: '4+', label: 'Industry Experts', color: '#22d3ee' },
            ].map((s, i) => <StatPill key={i} {...s} />)}
          </motion.div>

          <Eureka2025Media poster={eureka2025Event?.poster} gallery={eureka2025Event?.gallery} />

          {/* NEC Ranking Banner */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="relative p-6 sm:p-8 rounded-2xl border border-[#05B1DE]/25 overflow-hidden mb-5"
            style={{ background: 'linear-gradient(135deg, rgba(5,177,222,0.08) 0%, rgba(6,182,212,0.04) 50%, rgba(5,177,222,0.08) 100%)' }}
          >
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-[#05B1DE]/15 border border-[#05B1DE]/30 flex items-center justify-center flex-shrink-0">
                <Star className="w-7 h-7 text-[#05B1DE]" />
              </div>
              <div>
                <p className="text-white font-bold text-lg sm:text-xl leading-tight mb-1 eureka-heading">
                  EDC JSSUN secured <span className="text-[#05B1DE] font-black">Rank #283</span> in the National Entrepreneurship Challenge
                </p>
                <p className="text-neutral-400 text-sm font-light">Among 5,000+ E-Cells across Asia — representing JSS University on a national platform.</p>
              </div>
            </div>
          </motion.div>

          {/* Highlight Cards */}
          <motion.div
            initial="visible"
            animate="visible"
            variants={staggerChildrenOnly}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {[
              { icon: Mic2, title: 'Live Pitching Round', desc: 'Shortlisted teams pitched live before a panel of industry professionals — ideas spanning FinTech, EdTech, HealthTech, and more.', tag: 'Round 2 — Offline', color: '#05B1DE' },
              { icon: Crown, title: 'Winners Recognised', desc: 'The top 3 teams were awarded trophies, certificates, and cash prizes — with winners advancing to the Zonal Round under NEC.', tag: 'Grand Finale', color: '#eab308' },
              { icon: TrendingUp, title: 'Pathways Created', desc: 'High-performing teams received mentorship guidance and were considered for the national Eureka! Zonal Round under NEC.', tag: 'Beyond Prizes', color: '#22d3ee' }
            ].map((card, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <GlowCard glowColor={card.color} className="p-7 h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <card.icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-widest eureka-mono" style={{ color: card.color, borderColor: `${card.color}30`, background: `${card.color}10` }}>{card.tag}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-3 tracking-tight eureka-heading">{card.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-light">{card.desc}</p>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY PARTICIPATE? ───────────────────────────────────── */}
      <section className="pt-10 pb-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer} className="text-center mb-16"
          >
            <SectionLabel>Reasons to Join</SectionLabel>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 eureka-heading">
              Why <span className="text-[#05B1DE]">Participate?</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[
              { title: 'Pitch Your Idea', desc: 'Turn your idea into a structured business pitch and present it to a real evaluation panel.', icon: Presentation, color: '#05B1DE' },
              { title: 'Meet Industry Experts', desc: 'Interact with 4 industry professionals and receive direct, actionable feedback on your startup.', icon: Users, color: '#22d3ee' },
              { title: 'Take Your Startup Further', desc: 'Promising ideas get an opportunity to progress toward the Eureka! Zonal Round under NEC.', icon: TrendingUp, color: '#05B1DE' },
              { title: 'Build Your Network', desc: 'Connect with student entrepreneurs, mentors, jurors and the wider startup ecosystem.', icon: Globe, color: '#22d3ee' },
              { title: 'Represent JSS University', desc: 'Compete on a larger platform and help grow the JSSUN startup ecosystem.', icon: Building2, color: '#05B1DE' },
              { title: 'Grow as a Founder', desc: "Whether you win or not, you'll walk away with clarity, feedback, and a sharper vision.", icon: GraduationCap, color: '#22d3ee' },
            ].map((card, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <div className="group relative p-7 rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden cursor-default h-full transition-all duration-500 hover:border-white/15 hover:-translate-y-1">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 20% 20%, ${card.color}08 0%, transparent 60%)` }} />
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}>
                    <card.icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-3 tracking-tight eureka-heading">{card.title}</h3>
                  <p className="text-neutral-400 leading-relaxed text-sm font-light">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TRACK RECORD ───────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 relative border-y border-white/5">
        <div className="absolute inset-0 bg-white/[0.015] pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer} className="text-center mb-16"
          >
            <SectionLabel>Our Impact</SectionLabel>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 eureka-heading">
              EDC JSSUN <span className="text-[#05B1DE]">Track Record</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {[
              { title: 'Eureka! 2025', subtitle: 'Road to Enterprise', icon: Rocket, color: '#05B1DE', stats: [{ val: '350+', label: 'Online Registrations' }, { val: '25+', label: 'Selected Teams' }, { val: '80+', label: 'Offline Participants' }, { val: '4+', label: 'Industry Experts' }] },
              { title: "Founder's Pit 2026", subtitle: 'Annual Pitch Competition', icon: Flame, color: '#f97316', stats: [{ val: '100+', label: 'Teams' }, { val: '500+', label: 'Participants' }, { val: '6+', label: 'Industry Experts' }] },
              { title: 'EDC JSSUN', subtitle: 'Entrepreneurship Cell', icon: Zap, color: '#a855f7', stats: [{ val: '10+', label: 'Entrepreneurship Events' }, { val: '1,000+', label: 'Student Participants' }, { val: '15+', label: 'Industry Experts & Speakers' }, { val: '1.5L+', label: 'Social Media Impressions' }] }
            ].map((box, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <GlowCard glowColor={box.color} className="p-7 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${box.color}15`, border: `1px solid ${box.color}30` }}>
                      <box.icon className="w-5 h-5" style={{ color: box.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight eureka-heading">{box.title}</h3>
                      <p className="text-xs text-neutral-500">{box.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {box.stats.map((stat, j) => (
                      <li key={j} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                        <span className="text-neutral-400 text-sm font-light">{stat.label}</span>
                        <span className="font-black text-sm" style={{ color: box.color }}>{stat.val}</span>
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EVENT DETAILS ──────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer} className="text-center mb-14"
          >
            <SectionLabel>Event Details</SectionLabel>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl font-black text-white tracking-tight eureka-heading">
              Mark Your <span className="text-[#05B1DE]">Calendar</span>
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <GlowCard glowColor="#05B1DE" className="overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/8">
                <div className="p-8 space-y-7">
                  {[
                    { label: 'Event', value: 'Eureka! 2026 – Road to Enterprise' },
                    { label: 'Organised By', value: 'EDC JSS University Noida' },
                    { label: 'In Association With', value: 'E-Cell IIT Bombay' },
                    { label: 'Format', value: 'Online Preliminary + Offline Final' },
                    { label: 'Eligibility', value: 'JSS University, Noida Students' },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-[10px] text-neutral-600 uppercase tracking-[0.2em] mb-1 font-bold eureka-mono">{item.label}</p>
                      <p className="text-base font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-8 space-y-7 bg-white/[0.02]">
                  {[
                    { label: 'Final Date', value: '24 August 2026', icon: Calendar, highlight: false },
                    { label: 'Venue', value: 'Room 113, AB-3, JSS University Noida', icon: MapPin, highlight: false },
                    { label: 'Finalists', value: '20 Teams', icon: Users, highlight: false },
                    { label: 'Industry Jury', value: '4 Experts', icon: Star, highlight: false },
                    { label: 'Prize Pool', value: '₹6,000', icon: Award, highlight: true },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-[10px] text-neutral-600 uppercase tracking-[0.2em] mb-1 font-bold flex items-center gap-1.5 eureka-mono">
                        <item.icon className="w-3.5 h-3.5" /> {item.label}
                      </p>
                      <p className={`text-base font-semibold ${item.highlight ? 'text-[#05B1DE]' : 'text-white'}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* Additional Section Graphic */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            className="mt-12 sm:mt-16 flex justify-center"
          >
            <img
              src="https://res.cloudinary.com/dh8cqlngr/image/upload/v1786716136/Group_369_pgo8fu.png"
              alt="Eureka 2026 Partners & Sponsors"
              className="w-full max-w-4xl object-contain rounded-xl opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </motion.div>
        </div>
      </section>

      {/* ── WHO SHOULD PARTICIPATE? ────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 relative border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer} className="text-center mb-14"
          >
            <SectionLabel>Who Should Join</SectionLabel>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 eureka-heading">
              Is This <span className="text-[#05B1DE]">For You?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-neutral-400 text-lg font-light">Eureka! is for students who:</motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14"
          >
            {[
              'Have a startup or business idea',
              'Have identified a real-world problem worth solving',
              'Are building a prototype or MVP',
              'Want to explore entrepreneurship',
              'Want feedback from industry professionals',
              'Have an idea they believe deserves to be heard',
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="group flex items-center gap-4 p-5 rounded-xl border border-white/6 bg-white/[0.02] hover:border-[#05B1DE]/25 hover:bg-[#05B1DE]/4 transition-all duration-300 cursor-default">
                <div className="w-8 h-8 rounded-full bg-[#05B1DE]/15 border border-[#05B1DE]/25 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-4 h-4 text-[#05B1DE]" />
                </div>
                <p className="text-neutral-300 font-medium text-sm">{item}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Quote Block */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={scaleIn}
            className="relative p-10 rounded-2xl border border-[#05B1DE]/20 overflow-hidden text-center"
            style={{ background: 'linear-gradient(135deg, rgba(5,177,222,0.06) 0%, rgba(2,132,199,0.04) 100%)' }}
          >
            <div className="absolute top-4 left-6 text-8xl text-[#05B1DE]/10 font-black leading-none select-none" style={{ fontFamily: 'Georgia, serif' }}>"</div>
            <Info className="w-16 h-16 text-[#05B1DE]/8 absolute -bottom-3 -right-3 rotate-12" />
            <p className="relative text-xl sm:text-2xl font-semibold text-white italic leading-relaxed">
              "You don't need a perfect startup. You need a problem worth solving and the courage to pitch it."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────── */}
      <section className="relative py-36 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-[#05B1DE]/20 rounded-full blur-[160px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[200px] bg-[#05B1DE]/8 rounded-full blur-[80px]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#05B1DE08_1px,transparent_1px),linear-gradient(to_bottom,#05B1DE08_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_100%,#000_50%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}>
            <SectionLabel>Don't Wait</SectionLabel>
            <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight eureka-heading">
              READY TO <br /><span className="text-[#05B1DE]">PITCH?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-neutral-300 font-light mb-3">
              Your idea could be the next big thing.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-base text-neutral-500 mb-12 font-light">
              Register for Eureka! 2026 and take your first step from idea → pitch → enterprise.
            </motion.p>
            <motion.div variants={scaleIn}>
              <a
                href="https://events.edcjssun.com/events/eureka-2026"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full font-bold text-white text-lg overflow-hidden transition-all duration-300 hover:scale-105 eureka-heading"
                style={{ background: 'linear-gradient(135deg, #05B1DE 0%, #0284c7 100%)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" style={{ boxShadow: '0 0 60px 0 rgba(5,177,222,0.5)' }} />
                <span className="relative">REGISTER NOW</span>
                <ArrowRight className="w-6 h-6 relative group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Eureka2026;
