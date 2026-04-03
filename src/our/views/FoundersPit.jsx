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
import { Info, Calendar, MapPin, Users, Lightbulb, ArrowRight, Sparkles, Zap, Target, TrendingUp } from 'lucide-react';
import { MarqueeAnimation } from '@/components/ui/marquee-effect';
import LightRays from '../../components/LightRays';

/* ──────────────────── Floating Particle ──────────────────── */
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

/* ──────────────────── Purple Curtain ──────────────────── */
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

/* ──────────────────── Countdown Timer ──────────────────── */
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date('2026-04-20T09:00:00');
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) return setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  const units = [
    { label: 'DAYS',    value: timeLeft.d },
    { label: 'HOURS',   value: timeLeft.h },
    { label: 'MINUTES', value: timeLeft.m },
    { label: 'SECONDS', value: timeLeft.s },
  ];

  return (
    <div
      className="flex flex-col items-center gap-4 mt-8 mb-2"
      style={{ animation: 'fadeSlideUp 0.8s ease-out 0.35s both' }}
    >
      <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#D776FF]/50 font-semibold font-sans">
        Event Starts In
      </p>
      <div className="flex items-start gap-2 sm:gap-3 flex-wrap justify-center">
        {units.map((unit, i) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-[72px] h-[68px] sm:w-[96px] sm:h-[88px] rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(10,0,20,0.85)',
                  border: '1.5px solid rgba(123,47,190,0.5)',
                  boxShadow: '0 0 12px rgba(123,47,190,0.4), 0 0 28px rgba(94,12,159,0.2), inset 0 0 18px rgba(94,12,159,0.08)',
                  animation: 'neonPulse 3s ease-in-out infinite',
                }}
              >
                <span
                  className="font-black text-white leading-none"
                  style={{
                    fontFamily: "'SF Mono','Fira Mono',monospace",
                    fontSize: 'clamp(28px, 5vw, 44px)',
                    letterSpacing: '-1px',
                    textShadow: '0 0 10px rgba(215,118,255,0.6), 0 0 30px rgba(123,47,190,0.4)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {pad(unit.value)}
                </span>
              </div>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] font-bold text-[#904EB0]/75 font-sans uppercase">
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span
                className="text-3xl sm:text-4xl font-black text-[#7B2FBE]/60 pt-3 sm:pt-5 font-mono"
                style={{ animation: 'colonBlink 1s step-start infinite' }}
              >
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

/* ──────────────────── Prize Podium ──────────────────── */
const PrizePodium = () => {
  const [visible, setVisible] = useState([false, false, false]);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible([true, false, false]);
          setTimeout(() => setVisible([true, true, false]), 800);
          setTimeout(() => setVisible([true, true, true]), 1500);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const GoldTrophy = () => (
    <svg width="88" height="98" viewBox="0 0 22 26" style={{ imageRendering: 'pixelated', overflow: 'visible' }}>
      <defs>
        <linearGradient id="gd1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE566" /><stop offset="45%" stopColor="#FFB300" /><stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <filter id="gd-glow">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g filter="url(#gd-glow)">
        <rect x="4" y="0" width="14" height="2" fill="url(#gd1)" />
        <rect x="1" y="2" width="2" height="1" fill="#DAA520" /><rect x="0" y="3" width="2" height="3" fill="#C8860A" /><rect x="1" y="6" width="2" height="1" fill="#DAA520" />
        <rect x="19" y="2" width="2" height="1" fill="#DAA520" /><rect x="20" y="3" width="2" height="3" fill="#C8860A" /><rect x="19" y="6" width="2" height="1" fill="#DAA520" />
        <rect x="3" y="2" width="16" height="1" fill="#FFE566" />
        <rect x="3" y="3" width="16" height="5" fill="url(#gd1)" />
        <rect x="6" y="3" width="2" height="4" fill="rgba(255,255,200,0.6)" />
        <rect x="4" y="8" width="14" height="1" fill="#D4940A" />
        <rect x="5" y="9" width="12" height="1" fill="#C07A00" />
        <rect x="6" y="10" width="10" height="1" fill="#A86400" />
        <rect x="9" y="11" width="4" height="4" fill="#DAA520" />
        <rect x="6" y="15" width="10" height="2" fill="#C89010" />
        <rect x="5" y="17" width="12" height="2" fill="url(#gd1)" />
      </g>
    </svg>
  );

  const SilverTrophy = () => (
    <svg width="72" height="80" viewBox="0 0 22 26" style={{ imageRendering: 'pixelated', overflow: 'visible' }}>
      <defs>
        <linearGradient id="sv1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4F4F4" /><stop offset="50%" stopColor="#B0B0B0" /><stop offset="100%" stopColor="#888" />
        </linearGradient>
        <filter id="sv-glow">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g filter="url(#sv-glow)">
        <rect x="4" y="0" width="14" height="2" fill="url(#sv1)" />
        <rect x="1" y="2" width="2" height="1" fill="#C0C0C0" /><rect x="0" y="3" width="2" height="3" fill="#A8A8A8" /><rect x="1" y="6" width="2" height="1" fill="#C0C0C0" />
        <rect x="19" y="2" width="2" height="1" fill="#C0C0C0" /><rect x="20" y="3" width="2" height="3" fill="#A8A8A8" /><rect x="19" y="6" width="2" height="1" fill="#C0C0C0" />
        <rect x="3" y="2" width="16" height="1" fill="#E0E0E0" />
        <rect x="3" y="3" width="16" height="5" fill="url(#sv1)" />
        <rect x="6" y="3" width="2" height="4" fill="rgba(255,255,255,0.5)" />
        <rect x="4" y="8" width="14" height="1" fill="#B8B8B8" />
        <rect x="5" y="9" width="12" height="1" fill="#A8A8A8" />
        <rect x="6" y="10" width="10" height="1" fill="#989898" />
        <rect x="9" y="11" width="4" height="4" fill="#B0B0B0" />
        <rect x="6" y="15" width="10" height="2" fill="#C0C0C0" />
        <rect x="5" y="17" width="12" height="2" fill="url(#sv1)" />
      </g>
    </svg>
  );

  const BronzeTrophy = () => (
    <svg width="64" height="72" viewBox="0 0 22 26" style={{ imageRendering: 'pixelated', overflow: 'visible' }}>
      <defs>
        <linearGradient id="br1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8935A" /><stop offset="50%" stopColor="#CD7F32" /><stop offset="100%" stopColor="#7B3A1A" />
        </linearGradient>
        <filter id="br-glow">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g filter="url(#br-glow)">
        <rect x="4" y="0" width="14" height="2" fill="url(#br1)" />
        <rect x="1" y="2" width="2" height="1" fill="#CD7F32" /><rect x="0" y="3" width="2" height="3" fill="#A0522D" /><rect x="1" y="6" width="2" height="1" fill="#CD7F32" />
        <rect x="19" y="2" width="2" height="1" fill="#CD7F32" /><rect x="20" y="3" width="2" height="3" fill="#A0522D" /><rect x="19" y="6" width="2" height="1" fill="#CD7F32" />
        <rect x="3" y="2" width="16" height="1" fill="#E8935A" />
        <rect x="3" y="3" width="16" height="5" fill="url(#br1)" />
        <rect x="6" y="3" width="2" height="4" fill="rgba(255,200,150,0.45)" />
        <rect x="4" y="8" width="14" height="1" fill="#B06830" />
        <rect x="5" y="9" width="12" height="1" fill="#9A5520" />
        <rect x="6" y="10" width="10" height="1" fill="#844418" />
        <rect x="9" y="11" width="4" height="4" fill="#B06830" />
        <rect x="6" y="15" width="10" height="2" fill="#9A5520" />
        <rect x="5" y="17" width="12" height="2" fill="url(#br1)" />
      </g>
    </svg>
  );

  const prizeAmountStyle = {
    fontSize: 'clamp(26px, 5vw, 38px)',
    fontWeight: 900,
    letterSpacing: '-0.5px',
    lineHeight: 1,
    marginTop: 10,
    marginBottom: 3,
    fontFamily: "'Montserrat', sans-serif",
    background: 'linear-gradient(135deg, #D776FF, #904EB0, #D776FF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 0 12px rgba(215,118,255,0.45))',
  };

  const podiumBlockBase = {
    width: '100%',
    borderRadius: '10px 10px 0 0',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 12,
    background: 'linear-gradient(180deg, rgba(27,0,43,0.8), rgba(10,0,20,0.6))',
    border: '1px solid rgba(123,47,190,0.3)',
    borderBottom: 'none',
    animation: 'neonPulse 3s ease-in-out infinite',
  };

  const places = [
    {
      id: 'p2', order: 'order-1', visibleIdx: 1,
      rankColor: 'rgba(192,192,192,0.85)', rank: '2ND PLACE',
      Trophy: SilverTrophy, amount: '₹30,000', label: 'Runner Up',
      podiumH: 78,
      transition: 'opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)',
    },
    {
      id: 'p1', order: 'order-2', visibleIdx: 0,
      rankColor: 'rgba(255,215,0,0.85)', rank: '1ST PLACE',
      Trophy: GoldTrophy, amount: '₹50,000', label: 'Winner',
      podiumH: 110,
      transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
    },
    {
      id: 'p3', order: 'order-3', visibleIdx: 2,
      rankColor: 'rgba(205,127,50,0.85)', rank: '3RD PLACE',
      Trophy: BronzeTrophy, amount: '₹20,000', label: '2nd Runner Up',
      podiumH: 56,
      transition: 'opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)',
    },
  ];

  return (
    <div className="flex items-end justify-center gap-2 max-w-[680px] mx-auto" ref={ref}>
      {places.map((p) => (
        <div
          key={p.id}
          className={`flex flex-col items-center flex-1 max-w-[200px] ${p.order}`}
          style={{
            opacity: visible[p.visibleIdx] ? 1 : 0,
            transform: visible[p.visibleIdx] ? 'translateY(0)' : 'translateY(70px)',
            transition: p.transition,
          }}
        >
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3"
            style={{ color: p.rankColor }}>
            {p.rank}
          </p>
          <p.Trophy />
          <p style={prizeAmountStyle}>{p.amount}</p>
          <p className="text-[10px] text-white/30 tracking-widest mb-3">{p.label}</p>
          <div style={{ ...podiumBlockBase, height: p.podiumH }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1.5,
              background: 'linear-gradient(90deg, transparent, rgba(215,118,255,0.8), transparent)',
            }} />
            <span className="text-2xl font-black font-mono" style={{ color: 'rgba(255,255,255,0.05)', position: 'relative', zIndex: 1 }}>
              {p.rank[0]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ──────────────────── Main Component ──────────────────── */
const FoundersPit = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
    date: '20 April 2026',
    time: '9:00 AM',
    location: 'JSS University, Noida',
    registrationLink: '#register',
  };

  const highlights = [
    { icon: Lightbulb, title: 'Ideate', description: 'Transform your raw ideas into viable business concepts with expert mentorship.' },
    { icon: Zap,       title: 'Build',  description: 'Rapid prototyping workshops to bring your vision to life in record time.' },
    { icon: Target,    title: 'Pitch',  description: 'Present your startup to industry leaders and secure real-world opportunities.' },
    { icon: TrendingUp,title: 'Scale',  description: 'Learn growth strategies from founders who have built successful ventures.' },
  ];

  return (
    <>
      {/* ══════════ Global Animations ══════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');

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
        @keyframes neonPulse {
          0%, 100% {
            box-shadow: 0 0 12px rgba(123,47,190,0.4), 0 0 28px rgba(94,12,159,0.2), inset 0 0 18px rgba(94,12,159,0.08);
            border-color: rgba(123,47,190,0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(215,118,255,0.5), 0 0 40px rgba(94,12,159,0.35), inset 0 0 22px rgba(123,47,190,0.12);
            border-color: rgba(215,118,255,0.65);
          }
        }
        @keyframes colonBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.15; }
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
      `}</style>

      <div className="w-full min-h-screen bg-[#000000] text-white overflow-hidden pb-24 sm:pb-0">

        {/* ══════════ HERO SECTION ══════════ */}
        <div
          ref={heroRef}
          className="relative w-full min-h-[90vh] sm:min-h-[95vh] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 fp-grid-bg pointer-events-none" />

          <PurpleCurtain left={8}  opacity={0.15} width={3} delay={0}   className="hidden lg:block" />
          <PurpleCurtain left={18} opacity={0.1}  width={2} delay={0.5} className="hidden sm:block" />
          <PurpleCurtain left={32} opacity={0.2}  width={4} delay={1}   />
          <PurpleCurtain left={50} opacity={0.12} width={3} delay={1.5} className="hidden md:block" />
          <PurpleCurtain left={68} opacity={0.18} width={3} delay={0.8} />
          <PurpleCurtain left={82} opacity={0.1}  width={2} delay={1.2} className="hidden sm:block" />
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

          <FloatingParticle delay={0}   size={6} x={15} duration={8}   />
          <FloatingParticle delay={1.5} size={4} x={30} duration={10}  />
          <FloatingParticle delay={3}   size={8} x={55} duration={7}   />
          <FloatingParticle delay={0.5} size={5} x={70} duration={9}   />
          <FloatingParticle delay={2}   size={3} x={85} duration={11}  />
          <FloatingParticle delay={4}   size={6} x={40} duration={8.5} />

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

          {/* Hero Content */}
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

            {/* Info Strip */}
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

            {/* ── COUNTDOWN TIMER ── */}
            <CountdownTimer />

            {/* Action Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
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
                onClick={() => setIsPopupOpen(true)}
              >
                View Agenda
              </Button>
            </div>
          </div>
        </div>

        {/* ══════════ MARQUEE ══════════ */}
        <div className="py-6 sm:py-10 bg-gradient-to-r from-[#1B002B]/60 via-[#240040]/40 to-[#1B002B]/60 backdrop-blur-sm border-y border-[#7B2FBE]/15 select-none pointer-events-none mb-0">
          <MarqueeAnimation baseVelocity={-1.5} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#D776FF]/70 font-bold">
            FOUNDER'S PIT • ENTER WITH A MINDSET • EXIT AS A FOUNDER •
          </MarqueeAnimation>
          <MarqueeAnimation baseVelocity={1.5} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#904EB0]/50 font-medium">
            EDC JSSUN • IDEATE • BUILD • PITCH • SCALE •
          </MarqueeAnimation>
        </div>

        {/* ══════════ WHAT IS FOUNDERS PIT ══════════ */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 fp-grid-bg pointer-events-none opacity-50" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(94,12,159,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7B2FBE]/20 bg-[#1B002B]/30 mb-4">
                <span className="text-[10px] tracking-[0.2em] text-[#D776FF]/60 font-medium uppercase">What Awaits You</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
                More Than Just An <span className="fp-subtitle">Event</span>
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

        {/* ══════════ PRIZE POOL ══════════ */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 fp-grid-bg pointer-events-none opacity-50" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(94,12,159,0.2) 0%, rgba(27,0,43,0.08) 50%, transparent 80%)' }}
          />

          {/* Floating ₹ coins */}
          {[
            { left: 5,  size: 24, delay: 0,   dur: 9  },
            { left: 14, size: 18, delay: 1.4, dur: 11 },
            { left: 26, size: 28, delay: 2.8, dur: 8  },
            { left: 38, size: 16, delay: 0.7, dur: 12 },
            { left: 50, size: 22, delay: 2,   dur: 10 },
            { left: 62, size: 26, delay: 3.8, dur: 9  },
            { left: 72, size: 20, delay: 0.9, dur: 11 },
            { left: 83, size: 24, delay: 3.2, dur: 8  },
            { left: 91, size: 16, delay: 0.2, dur: 13 },
            { left: 44, size: 18, delay: 5,   dur: 10 },
          ].map((c, i) => (
            <div
              key={i}
              className="absolute rounded-full flex items-center justify-center font-black pointer-events-none"
              style={{
                left: `${c.left}%`, bottom: '-50px',
                width: c.size, height: c.size,
                fontSize: Math.round(c.size * 0.42),
                color: 'rgba(215,118,255,0.6)',
                border: '1.5px solid rgba(123,47,190,0.35)',
                background: 'rgba(94,12,159,0.06)',
                animation: `floatUp ${c.dur}s ease-in-out ${c.delay}s infinite`,
              }}
            >
              ₹
            </div>
          ))}

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7B2FBE]/20 bg-[#1B002B]/30 mb-4">
                <span className="text-[10px] tracking-[0.2em] text-[#D776FF]/60 font-medium uppercase">Rewards</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                Prize <span className="fp-subtitle">Pool</span>
              </h2>
            </div>

            {/* Total amount */}
            <div className="flex flex-col items-center mb-14 gap-1">
              <p
                className="font-black leading-none tracking-tight"
                style={{
                  fontSize: 'clamp(38px, 8vw, 58px)',
                  fontFamily: "'Montserrat', sans-serif",
                  background: 'linear-gradient(135deg, #D776FF 0%, #904EB0 50%, #D776FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 18px rgba(215,118,255,0.45))',
                }}
              >
                ₹1,00,000
              </p>
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white">
                Total Prize Pool
              </p>
            </div>

            <PrizePodium />
          </div>
        </section>

        {/* ══════════ WHO SHOULD ATTEND ══════════ */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[600px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at left center, rgba(94,12,159,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }}
          />
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7B2FBE]/20 bg-[#1B002B]/30 mb-4">
                  <Users className="size-3 text-[#D776FF]/60" />
                  <span className="text-[10px] tracking-[0.2em] text-[#D776FF]/60 font-medium uppercase">Who Should Attend</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                  Built For <span className="fp-subtitle">Dreamers &amp; Doers</span>
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
                      <p className="text-sm sm:text-base text-white/50 group-hover:text-white/80 transition-colors duration-300">{item}</p>
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

        {/* ══════════ CTA ══════════ */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(94,12,159,0.15) 0%, transparent 60%)' }}
          />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Ready to Enter <span className="fp-subtitle">The Pit?</span>
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
          <MarqueeAnimation baseVelocity={-2} className="text-lg sm:text-xl md:text-2xl tracking-tight text-[#7B2FBE]/40 font-bold">
            IDEATE • BUILD • PITCH • SCALE • FOUNDER'S PIT 2026 •
          </MarqueeAnimation>
        </div>

        {/* ══════════ DRAWER ══════════ */}
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

        <Footer />
      </div>
    </>
  );
};

export default FoundersPit;