import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Spotlight } from '@/components/ui/spotlight';
import {
  FaLightbulb,
  FaRocket,
  FaHandshake,
  FaUsers,
  FaChalkboardUser,
  FaMicrophoneLines,
  FaTrophy,
  FaMugSaucer,
  FaArrowRight,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaClipboardCheck,
  FaPeopleGroup,
  FaFlagCheckered,
  FaBolt,
  FaStar,
  FaCompass,
} from 'react-icons/fa6';

/* ---------- Small reusable hook: fires once an element scrolls into view ---------- */
function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* ---------- Animated count-up number, e.g. "57+" or "1000+" ---------- */
function AnimatedStat({ value, label }) {
  const [ref, inView] = useInView(0.5);
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/\D/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <div
      ref={ref}
      className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#05B1DE]/40 hover:bg-[#05B1DE]/5 transition-all duration-500"
    >
      <p className="text-2xl sm:text-3xl font-bold text-[#05B1DE] mb-1 tabular-nums">
        {count}
        {suffix}
      </p>
      <p className="text-[0.65rem] sm:text-xs text-neutral-500 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

const benefits = [
  {
    icon: FaLightbulb,
    title: 'Learn from Founders',
    desc: 'Direct sessions with founders and industry experts who\'ve built and scaled real ventures.',
    cardBg: 'from-white to-amber-50 dark:from-neutral-900 dark:to-amber-950/20',
    iconBg: 'from-amber-500 to-orange-600',
    border: 'hover:border-amber-500',
  },
  {
    icon: FaRocket,
    title: 'Build & Pitch',
    desc: 'Take an idea from a napkin sketch to a live pitch in front of investors and mentors.',
    cardBg: 'from-white to-blue-50 dark:from-neutral-900 dark:to-blue-950/20',
    iconBg: 'from-[#05B1DE] to-blue-600',
    border: 'hover:border-[#05B1DE]',
  },
  {
    icon: FaHandshake,
    title: 'Mentorship & Funding',
    desc: 'Get paired with mentors and exposure to funding pathways as you validate your idea.',
    cardBg: 'from-white to-purple-50 dark:from-neutral-900 dark:to-purple-950/20',
    iconBg: 'from-purple-500 to-pink-600',
    border: 'hover:border-purple-500',
  },
  {
    icon: FaUsers,
    title: 'Network with Peers',
    desc: 'Join 57+ active members across 8 departments building things together, not alone.',
    cardBg: 'from-white to-green-50 dark:from-neutral-900 dark:to-green-950/20',
    iconBg: 'from-green-500 to-emerald-600',
    border: 'hover:border-green-500',
  },
];

const activities = [
  { icon: FaChalkboardUser, title: 'Workshops', desc: 'Hands-on sessions on UI/UX, LinkedIn personal branding, and other practical, career-ready skills.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: FaMicrophoneLines, title: 'Founder Talks', desc: 'Real stories from founders and industry experts on stock markets, finance, leadership, and startup mindset.', color: 'text-[#05B1DE]', bg: 'bg-[#05B1DE]/10' },
  { icon: FaTrophy, title: 'Pitch Competitions', desc: 'Flagship simulations like Founder\'s Pit, where teams navigate the full startup lifecycle end to end.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: FaMugSaucer, title: 'Meetups', desc: 'Casual, low-pressure networking with peers and seniors across every department.', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: FaRocket, title: 'Bootcamps', desc: 'Intensive, department-wise induction programmes like KYDB that build real execution skills fast.', color: 'text-pink-400', bg: 'bg-pink-500/10' },
];

const journey = [
  { icon: FaHandshake, title: 'Join EDC', desc: 'Sign up and become part of a 57+ member community across 8 functional departments.', color: 'from-[#05B1DE] to-blue-600' },
  { icon: FaClipboardCheck, title: 'Onboarding', desc: 'Go through KYDB (Know Your Department Better) — hands-on assignments to prep you for your role.', color: 'from-purple-500 to-pink-600' },
  { icon: FaChalkboardUser, title: 'First Workshop', desc: 'Attend your first skill-building session — from UI/UX to LinkedIn branding to founder talks.', color: 'from-amber-500 to-orange-600' },
  { icon: FaPeopleGroup, title: 'First Event', desc: 'Get involved in organizing or participating in a live EDC event, workshop, or competition.', color: 'from-green-500 to-emerald-600' },
  { icon: FaFlagCheckered, title: 'Grow Into a Role', desc: 'Take on responsibility within your department and start shaping EDC\'s next flagship initiative.', color: 'from-pink-500 to-rose-600' },
];

const teamRingColors = ['border-[#05B1DE]', 'border-purple-500', 'border-amber-500', 'border-green-500', 'border-pink-500'];

const coreTeam = [
  { name: 'Sahal Parvez', role: 'President', img: 'https://res.cloudinary.com/dz5uesei3/image/upload/v1779958465/sahal1_-_Mohd_Sahal_zkqim4.jpg' },
  { name: 'Utkarsh Srivastava', role: 'Vice President', img: 'https://res.cloudinary.com/dpphtbawg/image/upload/v1770752268/utkarsh-srivastava_dh0rfz.jpg' },
  { name: 'Krish Choudhary', role: 'CTC', img: 'https://res.cloudinary.com/dz5uesei3/image/upload/v1779958744/DSC_0205_-_Krish_Choudhary_hh5cty.jpg' },
  { name: 'Aditya Agarwal', role: 'General Secretary', img: 'https://res.cloudinary.com/dz5uesei3/image/upload/v1779958734/WhatsApp_Image_2026-05-26_at_16.26.34_-_ADITYA_AGARWAL_ggrz09.jpg' },
  { name: 'Sameer Singla', role: 'Joint Secretary', img: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758553253/Sameer_singla_-min_tmbxss.jpg' },
];

const pastEvents = [
  {
    title: 'EDC × Eureka! – Road to Enterprise 2025',
    desc: 'Organized under the National Entrepreneurship Challenge by E-Cell IIT Bombay, this event gave aspiring entrepreneurs a platform to validate startup ideas, interact with mentors, and strengthen their entrepreneurial mindset. 80+ participants attended.',
    img: 'https://res.cloudinary.com/dh8cqlngr/image/upload/v1759080883/WhatsApp_Image_2025-09-28_at_22.00.24_4f14c6fe_sazknc.jpg',
    tag: 'National Challenge',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    title: "Founder's Pit 2026",
    desc: '"Enter as a mindset, Exit as a founder." EDC\'s flagship entrepreneurship simulation replicated the full startup lifecycle — ideation, team formation, resource bidding, crisis management, and investor pitching — across 8 hours, 5 rounds, 270+ participants and 70+ teams.',
    img: 'https://res.cloudinary.com/dftvt6ooo/image/upload/v1779895249/teamedc_compressed_pjduwe.jpg',
    tag: 'Flagship',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  {
    title: 'Orientation Programme 2025',
    desc: "EDC's welcome session for new students introduced the vision, objectives, leadership opportunities, workshops, competitions, and networking platforms EDC offers — reaching 1500+ students on 5 August 2025.",
    img: 'https://res.cloudinary.com/dh8cqlngr/image/upload/v1759080882/WhatsApp_Image_2025-09-28_at_22.01.37_a5399f7c_w0jn1f.jpg',
    tag: 'Welcome',
    tagColor: 'bg-green-500/20 text-green-300 border-green-500/30',
  },
];

const tickerItems = [
  'Learn from Founders', 'Build & Pitch', 'Mentorship & Funding', 'Network with Peers',
  'Workshops', 'Founder Talks', 'Pitch Competitions', 'Bootcamps',
];

const Orientation = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <div className="relative flex min-h-[80vh] w-full overflow-hidden bg-black items-center justify-center px-4 sm:px-6">
        <div className="pointer-events-none absolute inset-0 [background-size:30px_30px] opacity-40 [background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]" />
        <Spotlight className="top-0 left-1/2 -translate-x-1/2 md:-top-20" fill="#05B1DE" />

        {/* Continuously floating decorative icons */}
        <div className="animate-float-slow pointer-events-none absolute top-24 left-[8%] hidden sm:block">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center rotate-[-8deg]">
            <FaLightbulb className="w-6 h-6 text-purple-400" />
          </div>
        </div>
        <div className="animate-float-slow-reverse pointer-events-none absolute top-40 right-[10%] hidden sm:block" style={{ animationDelay: '1s' }}>
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center rotate-[10deg]">
            <FaRocket className="w-7 h-7 text-amber-400" />
          </div>
        </div>
        <div className="animate-float-diagonal pointer-events-none absolute bottom-32 left-[15%] hidden md:block">
          <div className="w-12 h-12 rounded-full bg-[#05B1DE]/10 border border-[#05B1DE]/20 flex items-center justify-center">
            <FaStar className="w-5 h-5 text-[#05B1DE]" />
          </div>
        </div>
        <div className="animate-float-slow pointer-events-none absolute bottom-40 right-[14%] hidden md:block" style={{ animationDelay: '2.5s' }}>
          <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center rotate-[6deg]">
            <FaCompass className="w-6 h-6 text-green-400" />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center">
          {/* Tilted sticker badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#05B1DE]/40 bg-[#05B1DE]/10 mb-6 -rotate-2 shadow-[0_0_20px_rgba(5,177,222,0.15)]">
            <FaStar className="w-3.5 h-3.5 text-[#05B1DE]" />
            <span className="text-xs font-bold text-[#05B1DE] uppercase tracking-widest">
              Freshers Special
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
            Welcome to <span className="text-[#05B1DE]">EDC</span>, Fresher!
          </h1>

          <p className="text-neutral-400 text-base sm:text-lg md:text-xl italic mb-4">
            Ideate, Innovate, Inspire.
          </p>

          <p className="inline-flex items-center gap-2 text-[#05B1DE] text-sm sm:text-base font-medium mb-8 px-4 py-2 rounded-full bg-[#05B1DE]/5 border border-[#05B1DE]/20">
            <FaBolt className="w-4 h-4 animate-pulse" />
            Stick around till the end — there's a quiz where the top 3 scorers get direct entry to the PI round.
          </p>

          <div>
            <a
              href="https://chat.whatsapp.com/GSDFcDbB2ms6UYhkUsmeRv?s=cl&p=a&ilr=1"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#05B1DE] text-white rounded-full font-semibold hover:bg-[#04a0c7] transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(5,177,222,0.3)]"
            >
              Join EDC
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Scrolling marquee ticker */}
      <div className="bg-[#05B1DE] py-3 overflow-hidden">
        <div
          className="flex gap-8 whitespace-nowrap animate-scroll"
          style={{ '--animation-duration': '25s' }}
        >
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-8 text-sm font-bold text-white uppercase tracking-wide">
              {item}
              <span className="text-white/50">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* What is EDC */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            About <span className="text-[#05B1DE]">EDC</span>
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-4">
            The Entrepreneurship Development Cell (EDC), JSS University, Noida,
            was established during the 2024–2025 academic session with the
            vision of fostering innovation, entrepreneurship, and leadership
            among students. Since its inception, EDC has emerged as a dynamic
            student-led organization committed to nurturing entrepreneurial
            thinking and creating opportunities for aspiring innovators.
          </p>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-4">
            Operating under the guidance of dedicated faculty coordinators —
            Dr. Nishi Sharma and Dr. Ashima Srivastava — EDC provides a
            collaborative platform where students transform ideas into
            impactful solutions through experiential learning, industry
            interactions, competitions, workshops, networking opportunities,
            and startup-oriented initiatives.
          </p>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-10">
            Within a short span of time, EDC has become one of the
            university's most active and professionally structured student
            organizations — ranking <span className="text-[#05B1DE] font-semibold">283 among 5000+ E-Cells</span>{' '}
            nationwide within just three months of establishment.
          </p>
          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-lg mx-auto">
            <AnimatedStat value="57+" label="Members" />
            <AnimatedStat value="10+" label="Events" />
            <AnimatedStat value="1000+" label="Students Reached" />
          </div>
        </div>
      </div>

      {/* Why Join */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Why Join <span className="text-[#05B1DE]">EDC</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, desc, cardBg, iconBg, border }) => (
              <div
                key={title}
                className={`group relative bg-gradient-to-br ${cardBg} rounded-3xl p-6 sm:p-8 border border-neutral-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${border}`}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 bg-gradient-to-br ${iconBg} rounded-2xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What We Do */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-4">
            What We Do
          </h2>
          <p className="text-center text-neutral-400 max-w-2xl mx-auto mb-12">
            From skill-building workshops to full-scale startup simulations,
            EDC runs a mix of initiatives designed to take you from curious
            fresher to confident builder.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {activities.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-full ${bg} mb-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
                <p className="text-xs text-neutral-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Journey After Joining */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Your Journey After Joining
          </h2>
          <p className="text-center text-neutral-400 mb-12">
            What actually happens once you're in
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {journey.map(({ icon: Icon, title, desc, color }, i) => (
              <div key={title} className="group relative flex flex-col items-center text-center">
                <div
                  className={`relative z-10 w-14 h-14 bg-gradient-to-br ${color} rounded-full flex items-center justify-center shadow-lg mb-4 group-hover:scale-125 transition-all duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
                <p className="text-xs text-neutral-400">{desc}</p>
                {i < journey.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-full w-full h-0.5 bg-gradient-to-r from-[#05B1DE]/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meet the Team */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Meet the Core Team
          </h2>
          <p className="text-center text-neutral-400 mb-12">
            The people steering EDC this year
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {coreTeam.map(({ name, role, img }, i) => (
              <div
                key={name}
                onClick={() => navigate('/team')}
                className="group cursor-pointer w-40 sm:w-48 text-center p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(5,177,222,0.15)] transition-all duration-300"
              >
                <img
                  src={img}
                  alt={name}
                  className={`w-16 h-16 mx-auto rounded-full object-cover border-2 ${teamRingColors[i % teamRingColors.length]} mb-3 group-hover:scale-110 transition-transform duration-300`}
                />
                <h3 className="text-sm font-semibold text-white">{name}</h3>
                <p className="text-xs text-[#05B1DE]">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Past Highlights */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Past Highlights
          </h2>
          <p className="text-center text-neutral-400 mb-12">
            A glimpse into what EDC has built so far
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {pastEvents.map(({ title, desc, img, tag, tagColor }) => (
              <div
                key={title}
                className="group rounded-2xl border border-neutral-800 bg-white/[0.03] overflow-hidden flex flex-col hover:border-white/20 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative overflow-hidden h-48 bg-neutral-900">
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 left-3 text-[0.65rem] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${tagColor}`}>
                    {tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA — Quiz */}
      <div className="relative py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-black via-[#05B1DE]/5 to-[#05B1DE]/10 overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#05B1DE]/10 blur-[100px] animate-pulse-glow" />

        {/* Floating decorative icons around the CTA */}
        <div className="animate-float-slow pointer-events-none absolute top-10 left-[10%] hidden md:block">
          <FaTrophy className="w-8 h-8 text-amber-400/40" />
        </div>
        <div className="animate-float-slow-reverse pointer-events-none absolute bottom-10 right-[12%] hidden md:block">
          <FaFlagCheckered className="w-8 h-8 text-[#05B1DE]/40" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#05B1DE]/30 bg-[#05B1DE]/10 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#05B1DE] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#05B1DE]" />
            </span>
            <span className="text-xs font-semibold text-[#05B1DE] uppercase tracking-wide">
              Top 3 skip straight to PI round
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Think you've got what it takes?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Take this quiz — the top 3 scorers get a direct entry to the PI
            round, skipping the earlier rounds entirely.
          </p>
          <a
            href="#" /* TODO: replace with actual quiz URL once ready */
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-[#05B1DE] text-white rounded-full font-bold text-base hover:bg-[#04a0c7] transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(5,177,222,0.4)] animate-pulse mb-8"
          >
            Take the Quiz
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <div className="flex justify-center gap-6 text-neutral-400">
            <a href="https://www.linkedin.com/company/edcjssun" target="_blank" rel="noopener noreferrer" className="hover:text-[#05B1DE] hover:scale-125 transition-all duration-300">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/edcjssun" target="_blank" rel="noopener noreferrer" className="hover:text-[#05B1DE] hover:scale-125 transition-all duration-300">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://x.com/jss_ecell" target="_blank" rel="noopener noreferrer" className="hover:text-[#05B1DE] hover:scale-125 transition-all duration-300">
              <FaXTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Orientation;
