import React, { useEffect, useState, useRef } from 'react';
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
  Info,
  Calendar,
  MapPin,
  Users,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Code,
  Smartphone,
  Database,
  Bitcoin,
  Building2,
  HeartPulse,
  Shield,
  Leaf,
} from 'lucide-react';
import { MarqueeAnimation } from '@/components/ui/marquee-effect';
import LightRays from '../../components/LightRays';

/* ──────────────────── Animated Floating Particle ──────────────────── */
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

/* ──────────────────── Glowing Vertical Stripe ──────────────────── */
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

/* ──────────────────── Main Component ──────────────────── */
const FoundersPit = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAgendaOpen, setIsAgendaOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

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

  const eventDetails = {
    title: "FOUNDER'S PIT",
    tagline: 'ENTER WITH A MINDSET, EXIT AS A FOUNDER',
    date: 'Coming Soon',
    time: 'TBD',
    location: 'JSS University, Noida',
    registrationLink: '#register',
  };

  const highlights = [
    {
      icon: Lightbulb,
      title: 'Ideate',
      description: 'Transform your raw ideas into viable business concepts with expert mentorship.',
    },
    {
      icon: Zap,
      title: 'Build',
      description: 'Rapid prototyping workshops to bring your vision to life in record time.',
    },
    {
      icon: Target,
      title: 'Pitch',
      description: 'Present your startup to industry leaders and secure real-world opportunities.',
    },
    {
      icon: TrendingUp,
      title: 'Scale',
      description: 'Learn growth strategies from founders who have built successful ventures.',
    },
  ];

  const softwareThemes = [
    { title: 'Web Development Track', icon: Code },
    { title: 'Mobile App Development Track', icon: Smartphone },
    { title: 'Data Science & Machine Learning', icon: Database },
    { title: 'Blockchain & Cryptography Track', icon: Bitcoin },
    { title: 'Open Innovation Track', icon: Lightbulb },
  ];

  const hardwareThemes = [
    { title: 'Smart Cities and IoT Solutions', icon: Building2 },
    { title: 'IoT-Enabled Healthcare & Assistive Technologies', icon: HeartPulse },
    { title: 'Smart Wearables for Safety', icon: Shield },
    { title: 'Disaster Management & Emergency Response', icon: Zap },
    { title: 'Agritech and Rural Innovation', icon: Leaf },
  ];

  return (
    <>
      {/* ══════════ Global Animations ══════════ */}
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
          0%, 100% { border-color: rgba(123,47,190,0.3); }
          50%      { border-color: rgba(215,118,255,0.6); }
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
        .theme-card-hover:hover {
          background: linear-gradient(135deg, rgba(94,12,159,0.25) 0%, rgba(123,47,190,0.15) 100%) !important;
          border-color: rgba(215,118,255,0.5) !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(94,12,159,0.22), 0 0 16px rgba(215,118,255,0.07);
        }

        /* FIX: Remove the automatic fade mask from the Drawer */
        [data-vaul-drawer-content] {
          mask-image: none !important;
          -webkit-mask-image: none !important;
        }
      `}</style>

      <div className="w-full min-h-screen bg-[#000000] text-white overflow-hidden pb-24 sm:pb-0">

        {/* ══════════ HERO SECTION ══════════ */}
        <div
          ref={heroRef}
          className="relative w-full min-h-[90vh] sm:min-h-[95vh] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 fp-grid-bg pointer-events-none" />

          <PurpleCurtain left={8} opacity={0.15} width={3} delay={0} className="hidden lg:block" />
          <PurpleCurtain left={18} opacity={0.1} width={2} delay={0.5} className="hidden sm:block" />
          <PurpleCurtain left={32} opacity={0.2} width={4} delay={1} />
          <PurpleCurtain left={50} opacity={0.12} width={3} delay={1.5} className="hidden md:block" />
          <PurpleCurtain left={68} opacity={0.18} width={3} delay={0.8} />
          <PurpleCurtain left={82} opacity={0.1} width={2} delay={1.2} className="hidden sm:block" />
          <PurpleCurtain left={92} opacity={0.15} width={3} delay={0.3} className="hidden lg:block" />

          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60">
            <LightRays
              raysOrigin="top-center"
              raysColor="#7B2FBE"
              raysSpeed={0.6}
              lightSpread={0.6}
              rayLength={3}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
              pulsating={false}
              fadeDistance={1}
              saturation={1.2}
            />
          </div>

          <FloatingParticle delay={0} size={6} x={15} duration={8} />
          <FloatingParticle delay={1.5} size={4} x={30} duration={10} />
          <FloatingParticle delay={3} size={8} x={55} duration={7} />
          <FloatingParticle delay={0.5} size={5} x={70} duration={9} />
          <FloatingParticle delay={2} size={3} x={85} duration={11} />
          <FloatingParticle delay={4} size={6} x={40} duration={8.5} />

          <div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0"
            style={{
              left: `calc(${mousePos.x * 100}% - 300px)`,
              top: `calc(${mousePos.y * 100}% - 300px)`,
              background: 'radial-gradient(circle, rgba(94,12,159,0.15) 0%, rgba(123,47,190,0.05) 40%, transparent 70%)',
              transition: 'left 0.8s ease-out, top 0.8s ease-out',
            }}
          />

          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse, rgba(94,12,159,0.2) 0%, rgba(27,0,43,0.1) 50%, transparent 80%)',
              animation: 'glowPulse 5s ease-in-out infinite',
            }}
          />

          <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto pt-10 sm:pt-35 pb-10">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7B2FBE]/20 bg-[#1B002B]/40 backdrop-blur-md mb-4 sm:mb-6"
              style={{ animation: 'fadeSlideUp 0.6s ease-out both' }}
            >
              <Sparkles className="size-3 text-[#D776FF]" />
              <span className="text-[9px] sm:text-xs tracking-[0.3em] text-[#D776FF]/90 font-semibold uppercase">
                EDC JSS University Noida
              </span>
              <Sparkles className="size-3 text-[#D776FF]" />
            </div>

            <div
              className="flex flex-col items-center mb-4 sm:mb-6"
              style={{ animation: 'fadeSlideUp 0.8s ease-out 0.1s both' }}
            >
              <div className="relative mb-2">
                <div className="absolute inset-0 blur-2xl bg-[#7B2FBE]/30 rounded-full" />
                <img
                  src="https://res.cloudinary.com/dh8cqlngr/image/upload/v1774820657/Founder_s_Pit_kvfeqt.png"
                  alt="Logo Icon"
                  className="relative w-40 sm:w-64 md:w-80 h-auto drop-shadow-[0_10px_30px_rgba(215,118,255,0.4)] hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              <h1 className="fp-title font-black text-6xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.85] text-center filter drop-shadow-[0_10px_30px_rgba(94,12,159,0.3)]">
                FOUNDER'S
                <br />
                <span className="text-white/90">PIT</span>
              </h1>
            </div>

            <div
              className="mb-6 sm:mb-10"
              style={{ animation: 'fadeSlideUp 0.8s ease-out 0.2s both' }}
            >
              <p className="fp-subtitle text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.4em] font-bold uppercase opacity-80 max-w-2xl mx-auto leading-relaxed">
                {eventDetails.tagline}
              </p>
            </div>

            <div
              className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-3 sm:gap-8 mb-8"
              style={{ animation: 'fadeSlideUp 0.8s ease-out 0.3s both' }}
            >
              <div className="flex items-center gap-3 px-4 sm:px-5 py-3 rounded-2xl bg-[#1B002B]/30 border border-[#7B2FBE]/10 backdrop-blur-sm group hover:border-[#7B2FBE]/40 transition-all duration-300">
                <Calendar className="size-4 text-[#D776FF]" />
                <div className="text-left">
                  <span className="block text-[8px] uppercase tracking-wider text-white/30">Date</span>
                  <span className="text-[10px] sm:text-sm font-bold text-white/90">{eventDetails.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 sm:px-5 py-3 rounded-2xl bg-[#1B002B]/30 border border-[#7B2FBE]/10 backdrop-blur-sm group hover:border-[#7B2FBE]/40 transition-all duration-300">
                <MapPin className="size-4 text-[#D776FF]" />
                <div className="text-left">
                  <span className="block text-[8px] uppercase tracking-wider text-white/30">Location</span>
                  <span className="text-[10px] sm:text-sm font-bold text-white/90">{eventDetails.location}</span>
                </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-[#7B2FBE]/20" />

              <div className="col-span-2 flex justify-center md:col-auto md:flex items-center gap-3 px-4 sm:px-5 py-3 rounded-2xl bg-[#1B002B]/30 border border-[#7B2FBE]/10 backdrop-blur-sm group hover:border-[#7B2FBE]/40 transition-all duration-300">
                <Users className="size-4 text-[#D776FF]" />
                <div className="text-left">
                  <span className="block text-[8px] uppercase tracking-wider text-white/30">Format</span>
                  <span className="text-[10px] sm:text-sm font-bold text-white/90">In-Person</span>
                </div>
              </div>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              style={{ animation: 'fadeSlideUp 0.8s ease-out 0.4s both' }}
            >
              <Button
                size="lg"
                className="fp-btn-primary w-full sm:w-auto text-white font-bold text-sm sm:text-base px-10 py-5 sm:py-7 rounded-full border-0 group"
                onClick={() => setIsPopupOpen(true)}
              >
                Register For Season 2026
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-[#7B2FBE]/30 text-[#D776FF] hover:bg-[#7B2FBE]/10 hover:border-[#D776FF]/60 font-semibold text-sm sm:text-base px-10 py-5 sm:py-7 rounded-full transition-all duration-300 bg-transparent"
                onClick={() => setIsAgendaOpen(true)}
              >
                View Agenda
              </Button>
            </div>
          </div>
        </div>

        {/* ══════════ MARQUEE SECTION ══════════ */}
        <div className="py-6 sm:py-10 bg-gradient-to-r from-[#1B002B]/60 via-[#240040]/40 to-[#1B002B]/60 backdrop-blur-sm border-y border-[#7B2FBE]/15 select-none pointer-events-none mb-0">
          <MarqueeAnimation
            baseVelocity={-1.5}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#D776FF]/70 font-bold"
          >
            FOUNDER'S PIT • ENTER WITH A MINDSET • EXIT AS A FOUNDER •
          </MarqueeAnimation>
          <MarqueeAnimation
            baseVelocity={1.5}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#904EB0]/50 font-medium"
          >
            EDC JSSUN • IDEATE • BUILD • PITCH • SCALE •
          </MarqueeAnimation>
        </div>

        {/* ══════════ WHAT IS FOUNDERS PIT SECTION ══════════ */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 fp-grid-bg pointer-events-none opacity-50" />

          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(94,12,159,0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7B2FBE]/20 bg-[#1B002B]/30 mb-4">
                <span className="text-[10px] tracking-[0.2em] text-[#D776FF]/60 font-medium uppercase">What Awaits You</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
                More Than Just An{' '}
                <span className="fp-subtitle">Event</span>
              </h2>
              <p className="text-sm sm:text-base text-white/40 max-w-2xl mx-auto leading-relaxed">
                Founder's Pit is the ultimate arena where aspiring entrepreneurs are forged.
                It's not a hackathon, it's not a workshop — it's a transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="fp-card group rounded-2xl p-6 sm:p-8 cursor-default"
                  style={{ animation: `fadeSlideUp 0.6s ease-out ${0.1 * index}s both` }}
                >
                  <div className="flex items-center justify-center size-12 sm:size-14 rounded-2xl bg-gradient-to-br from-[#5E0C9F]/40 to-[#7B2FBE]/20 text-[#D776FF] mb-5 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="size-6 sm:size-7" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#D776FF] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ THEMES SECTION ══════════ */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 fp-grid-bg pointer-events-none opacity-50" />

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(94,12,159,0.12) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7B2FBE]/20 bg-[#1B002B]/30 mb-4">
                <span className="text-[10px] tracking-[0.2em] text-[#D776FF]/60 font-medium uppercase">What You'll Compete On</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
                Explore The{' '}
                <span className="fp-subtitle">Themes</span>
              </h2>
              <p className="text-sm sm:text-base text-white/40 max-w-2xl mx-auto leading-relaxed">
                Choose your battleground. Each theme is a real-world problem space — your team picks one and builds from the ground up.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

              {/* LEFT — Software Track */}
              <div>
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[#7B9FFF] mb-3 pb-3 border-b border-[#7B2FBE]/20">
                  Software Track
                </p>
                <div className="flex flex-col gap-3">
                  {softwareThemes.map((item, i) => (
                    <div
                      key={i}
                      className="group fp-card theme-card-hover rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-default transition-all duration-300"
                      style={{ animation: 'none' }}
                    >
                      <div className="shrink-0 size-9 rounded-xl bg-[#7B9FFF]/10 flex items-center justify-center">
                        <item.icon className="size-4 text-[#7B9FFF]" />
                      </div>
                      <p className="text-sm font-bold text-white leading-snug group-hover:text-[#E0A6FF] transition-colors duration-300">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — Software + Hardware Track */}
              <div>
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[#D776FF] mb-3 pb-3 border-b border-[#7B2FBE]/20">
                  Software + Hardware Track
                </p>
                <div className="flex flex-col gap-3">
                  {hardwareThemes.map((item, i) => (
                    <div
                      key={i}
                      className="group fp-card theme-card-hover rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-default transition-all duration-300"
                      style={{ animation: 'none' }}
                    >
                      <div className="shrink-0 size-9 rounded-xl bg-[#D776FF]/10 flex items-center justify-center">
                        <item.icon className="size-4 text-[#D776FF]" />
                      </div>
                      <p className="text-sm font-bold text-white leading-snug group-hover:text-[#E0A6FF] transition-colors duration-300">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════ WHO SHOULD ATTEND SECTION ══════════ */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[600px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at left center, rgba(94,12,159,0.1) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7B2FBE]/20 bg-[#1B002B]/30 mb-4">
                  <Users className="size-3 text-[#D776FF]/60" />
                  <span className="text-[10px] tracking-[0.2em] text-[#D776FF]/60 font-medium uppercase">Who Should Attend</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                  Built For{' '}
                  <span className="fp-subtitle">Dreamers &amp; Doers</span>
                </h2>
                <div className="space-y-4">
                  {[
                    'Students with startup ideas looking for validation',
                    'Aspiring entrepreneurs who want real mentorship',
                    'Tech enthusiasts eager to build and prototype',
                    'Anyone ready to transform their mindset',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="mt-1.5 shrink-0 size-2 rounded-full bg-[#D776FF]/60 group-hover:bg-[#D776FF] group-hover:shadow-[0_0_10px_rgba(215,118,255,0.5)] transition-all duration-300" />
                      <p className="text-sm sm:text-base text-white/50 group-hover:text-white/80 transition-colors duration-300">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="fp-card rounded-3xl p-8 sm:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#7B2FBE]/30 rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#7B2FBE]/30 rounded-br-3xl" />

                <div className="text-center relative z-10">
                  <div className="mx-auto size-20 sm:size-24 rounded-3xl bg-gradient-to-br from-[#5E0C9F] to-[#3A036E] flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(94,12,159,0.4)]">
                    <span className="text-4xl sm:text-5xl font-black text-white/90">F</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Founder's Pit</h3>
                  <p className="text-xs sm:text-sm text-[#D776FF]/60 tracking-[0.15em] uppercase mb-6">Season 2026</p>
                  <div className="flex items-center justify-center gap-4 sm:gap-6">
                    <div className="text-center">
                      <p className="text-xl sm:text-3xl font-black fp-subtitle">10+</p>
                      <p className="text-[9px] text-white/30 uppercase tracking-wider">Hours</p>
                    </div>
                    <div className="w-px h-6 sm:h-8 bg-[#7B2FBE]/30" />
                    <div className="text-center">
                      <p className="text-xl sm:text-3xl font-black fp-subtitle">10+</p>
                      <p className="text-[9px] text-white/30 uppercase tracking-wider">Mentors</p>
                    </div>
                    <div className="w-px h-6 sm:h-8 bg-[#7B2FBE]/30" />
                    <div className="text-center">
                      <p className="text-xl sm:text-3xl font-black fp-subtitle">∞</p>
                      <p className="text-[9px] text-white/30 uppercase tracking-wider">Ideas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ CTA SECTION ══════════ */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at center, rgba(94,12,159,0.15) 0%, transparent 60%)',
          }} />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Ready to Enter{' '}
              <span className="fp-subtitle">The Pit?</span>
            </h2>
            <p className="text-sm sm:text-base text-white/40 mb-8 max-w-xl mx-auto">
              Registration details will be announced soon. Stay connected with EDC for all updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="fp-btn-primary text-white font-bold text-sm sm:text-base px-8 sm:px-14 py-4 sm:py-7 rounded-full border-0"
                onClick={() => setIsPopupOpen(true)}
              >
                <Sparkles className="mr-2 size-4" />
                Get Notified
              </Button>
            </div>
          </div>
        </section>

        {/* ══════════ SECOND MARQUEE ══════════ */}
        <div className="py-4 sm:py-6 bg-gradient-to-r from-[#1B002B]/40 via-[#240040]/30 to-[#1B002B]/40 border-y border-[#7B2FBE]/10 select-none pointer-events-none">
          <MarqueeAnimation
            baseVelocity={-2}
            className="text-lg sm:text-xl md:text-2xl tracking-tight text-[#7B2FBE]/40 font-bold"
          >
            IDEATE • BUILD • PITCH • SCALE • FOUNDER'S PIT 2026 •
          </MarqueeAnimation>
        </div>

        {/* ══════════ REGISTER DRAWER ══════════ */}
        <Drawer open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <DrawerContent className="bg-[#0A0014]/95 backdrop-blur-xl border-t border-[#7B2FBE]/20 pb-12">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5E0C9F] to-[#7B2FBE] flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(94,12,159,0.4)]">
                  <Info className="w-7 h-7 text-white/90" />
                </div>
                <DrawerTitle className="text-2xl font-bold text-white">Stay Tuned!</DrawerTitle>
                <DrawerDescription className="text-center text-white/50 mt-2 text-base">
                  Registration details and event information will be shared with you soon by{' '}
                  <span className="text-[#D776FF] font-semibold">Team EDC</span>.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 mt-6">
                <Button
                  onClick={() => setIsPopupOpen(false)}
                  className="w-full fp-btn-primary text-white font-bold py-6 rounded-xl border-0"
                >
                  Got it!
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        {/* ══════════ AGENDA DRAWER ══════════ */}
        <Drawer open={isAgendaOpen} onOpenChange={setIsAgendaOpen}>
          {/* FIX: Set a explicit height and use flex column layout */}
          <DrawerContent className="bg-[#0A0014]/95 backdrop-blur-xl border-t border-[#7B2FBE]/20 h-[90vh] flex flex-col">
            
            {/* Header: Fixed at top */}
            <div className="mx-auto w-full max-w-lg px-4 pt-6">
              <DrawerHeader className="flex flex-col items-start p-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7B2FBE]/20 bg-[#1B002B]/30 mb-3">
                  <Sparkles className="size-3 text-[#D776FF]" />
                  <span className="text-[10px] tracking-[0.25em] text-[#D776FF]/80 font-semibold uppercase">
                    Founder's Pit · Season 2026
                  </span>
                </div>
                <DrawerTitle className="text-4xl font-black fp-title tracking-tighter leading-none mb-2">
                  AGENDA
                </DrawerTitle>
                <p className="text-[10px] tracking-[0.25em] text-[#D776FF]/70 font-bold uppercase mb-4">
                  Enter with a mindset · Exit as a founder
                </p>
              </DrawerHeader>
            </div>

            {/* Scrollable Area: Fills available space */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              <div className="mx-auto w-full max-w-lg">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mb-4">
                  THE MOST INTENSE{' '}
                  <span className="fp-subtitle">STARTUP EXPERIENCE</span>{' '}
                  ON CAMPUS!
                </h2>

                <p className="text-sm sm:text-base text-white/80 font-semibold leading-relaxed mb-3 text-center">
                  It is a{' '}
                  <span className="text-[#D776FF]">startup simulation</span>{' '}
                  where you don't just think like a{' '}
                  <span className="text-[#D776FF]">founder</span>{' '}
                  you become{' '}
                  <span className="text-[#D776FF]">one.</span>
                </p>

                <p className="text-center text-sm sm:text-base tracking-[0.3em] font-black text-white/90 uppercase mb-5">
                  BID . BUILD . BATTLE
                </p>

                <p className="text-xs sm:text-sm text-white/45 leading-relaxed mb-4 text-center">
                  Founder's Pit is not a typical college competition. It is a fully structured,{' '}
                  <span className="text-white/70">gamified simulation</span> of what it actually feels like
                  to build a startup — from identifying a problem, to building a product, surviving a business
                  crisis, and pitching to investors — all within a single day.
                </p>

                <p className="text-xs sm:text-sm text-white/45 leading-relaxed mb-4 text-center">
                  <span className="text-white/70">24 teams</span> of 1st and 2nd year students compete across{' '}
                  <span className="text-white/70">5 high-pressure rounds</span>, making real decisions with
                  virtual capital, adapting to live crises, and presenting their complete startup to a jury of
                  industry professionals. No pre-built ideas. No shortcuts.{' '}
                  <span className="text-white/70">Just raw thinking, real pressure, and one day to prove it.</span>
                </p>

                <p className="text-xs sm:text-sm text-white/45 leading-relaxed mb-6 text-center">
                  It's not about the "perfect" idea — it's about the grit to adapt and the hustle to turn a
                  raw concept into a powerhouse.
                </p>

                <div className="h-px bg-[#7B2FBE]/15 mb-6" />

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7B2FBE]/20 bg-[#1B002B]/30 mb-4">
                  <span className="text-[10px] tracking-[0.2em] text-[#D776FF]/60 font-medium uppercase">
                    3-Phase Adrenaline Rush
                  </span>
                </div>

                <h3 className="text-xl font-black text-white tracking-tight mb-1">
                  WHAT PARTICIPANTS{' '}
                  <span className="fp-subtitle">WILL DO</span>
                </h3>
                <p className="text-[10px] tracking-[0.2em] text-[#D776FF]/60 font-bold uppercase mb-5">
                  Inside the Pit
                </p>

                <div className="flex flex-col gap-3 mb-8">
                  {[
                    {
                      phase: 'The Bid',
                      desc: 'Strategically compete to claim the problem statement you want to solve.',
                    },
                    {
                      phase: 'The Build',
                      desc: 'Design your product, build a revenue model, and survive unexpected crisis scenarios.',
                    },
                    {
                      phase: 'The Pitch',
                      desc: 'Present your battle-tested startup to a panel of expert judges.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="fp-card rounded-2xl px-5 py-4 flex items-start gap-4" style={{ animation: 'none' }}>
                      <div className="shrink-0 size-8 rounded-xl bg-gradient-to-br from-[#5E0C9F]/50 to-[#7B2FBE]/30 flex items-center justify-center">
                        <span className="text-[10px] font-black text-[#D776FF]">0{i + 1}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] tracking-[0.2em] text-[#D776FF] font-bold uppercase">
                          {item.phase}
                        </span>
                        <span className="text-xs text-white/50 leading-relaxed">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Button: Fixed at bottom */}
            <div className="mx-auto w-full max-w-lg px-4 pb-8 pt-4">
              <Button
                onClick={() => setIsAgendaOpen(false)}
                className="w-full fp-btn-primary text-white font-bold py-6 rounded-xl border-0"
              >
                Got it!
              </Button>
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