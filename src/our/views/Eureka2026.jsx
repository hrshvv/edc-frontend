import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
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
  TrendingUp
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const Eureka2026 = () => {
  useEffect(() => {
    document.title = 'Eureka! 2026 – Road to Enterprise | EDC JSSUN';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Eureka! 2026 is a two-round startup ideation and pitching competition organized by EDC JSS University Noida in association with E-Cell IIT Bombay.';
    }
  }, []);

  return (
    <div className="bg-[#030008] min-h-screen text-neutral-200 selection:bg-purple-500/30 font-sans overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dftvt6ooo/image/upload/v1779895249/teamedc_compressed_pjduwe.jpg')] bg-cover bg-center opacity-[0.03] mix-blend-screen" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#805ad51a_1px,transparent_1px),linear-gradient(to_bottom,#805ad51a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-purple-200 tracking-wider uppercase">
              NEC Partnered Event
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-purple-400 mb-4 tracking-tight"
          >
            EUREKA! <span className="font-light">2026</span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-300 mb-6 tracking-wide"
          >
            ROAD TO ENTERPRISE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl sm:text-2xl font-semibold text-white mb-6"
          >
            Turn Your Idea Into Your Next Big Opportunity 🚀
          </motion.p>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="text-base sm:text-lg text-neutral-400 max-w-3xl mx-auto mb-10 space-y-4"
          >
            <p>
              Eureka! 2026 is a two-round startup ideation and pitching competition organized by the Entrepreneurship Development Cell (EDC), JSS University Noida, in association with E-Cell IIT Bombay, under the National Entrepreneurship Challenge 2026.
            </p>
            <p>
              It gives aspiring student entrepreneurs a platform to present ideas, validate their thinking, interact with industry professionals, and take their first step toward building a venture.
            </p>
            <p className="text-purple-200 font-medium">
              Whether you're at the idea stage or already building a prototype, this is your opportunity to pitch it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a href="https://linktr.ee/edcjssun" target="_blank" rel="noreferrer" className="inline-flex px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105 items-center justify-center gap-2">
              REGISTER NOW <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* WHAT IS EUREKA! 2026? */}
      <section className="py-24 px-4 sm:px-6 relative border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp} className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3">
              <Rocket className="text-purple-500" /> WHAT IS EUREKA! 2026?
            </h2>
            <p className="text-lg text-neutral-300">
              Eureka! brings together aspiring student founders from JSS University, Noida for a structured startup pitching experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {/* Round 1 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative p-8 rounded-3xl bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400 font-bold text-xl">R1</div>
              <h3 className="text-xl font-bold text-white mb-4">ROUND 1 — ONLINE IDEA SUBMISSION & PITCHING</h3>
              <p className="text-neutral-400 mb-4">Participants submit their startup idea and pitch deck online.</p>
              <p className="text-neutral-300 font-semibold mb-2">Teams are evaluated on:</p>
              <ul className="space-y-2 mb-6">
                {['Problem Statement', 'Proposed Solution', 'Innovation', 'Market Potential', 'Business Model', 'Feasibility & Scalability'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-neutral-400">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> {item}
                  </li>
                ))}
              </ul>
              <p className="text-neutral-400 mb-4">Shortlisted teams then participate in an online pitching round before the screening panel.</p>
              <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-200 font-bold text-center">
                Top 20 teams advance to the final round.
              </div>
            </motion.div>

            {/* Round 2 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative p-8 rounded-3xl bg-gradient-to-br from-violet-900/20 to-black border border-violet-500/20">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-6 text-violet-400 font-bold text-xl">R2</div>
              <h3 className="text-xl font-bold text-white mb-4">ROUND 2 — FINAL OFFLINE PITCHING</h3>
              <p className="text-neutral-400 mb-4">
                The shortlisted teams pitch at JSS University, Noida before <strong className="text-white">4 invited industry experts</strong>.
              </p>
              <p className="text-neutral-400 mb-4">
                Each team gets <strong className="text-white">5–7 minutes</strong> to pitch, followed by a Q&A session with the jury.
              </p>
              <p className="text-neutral-400">
                This stage evaluates ideas from a real-world business perspective.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT CAN YOU WIN? */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Trophy className="text-yellow-500" /> WHAT CAN YOU WIN?
            </h2>
            <p className="text-neutral-400 text-lg">
              Eureka! offers more than prizes: it provides a pathway for promising ideas to progress further.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { title: "WINNER", icon: Trophy, color: "text-yellow-400", bg: "from-yellow-900/20", border: "border-yellow-500/30", prize: "₹3,000", extra: "+ Trophy + Certificate", detail: "Opportunity to progress toward the Eureka! Zonal Round, subject to applicable guidelines." },
              { title: "RUNNER-UP", icon: Medal, color: "text-gray-300", bg: "from-gray-800/40", border: "border-gray-500/30", prize: "₹2,000", extra: "+ Trophy + Certificate", detail: "Opportunity for further Eureka! consideration." },
              { title: "SECOND RUNNER-UP", icon: Medal, color: "text-amber-600", bg: "from-amber-900/20", border: "border-amber-700/30", prize: "₹1,000", extra: "+ Trophy + Certificate", detail: "Opportunity for further Eureka! consideration." }
            ].map((prize, i) => (
              <motion.div key={i} variants={fadeInUp} className={`p-8 rounded-3xl bg-gradient-to-b ${prize.bg} to-black border ${prize.border} text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300`}>
                <div className={`w-16 h-16 mx-auto rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 shadow-xl`}>
                  <prize.icon className={`w-8 h-8 ${prize.color}`} />
                </div>
                <h3 className={`text-lg font-bold ${prize.color} mb-2 tracking-widest`}>{prize.title}</h3>
                <div className="text-4xl font-black text-white mb-2">{prize.prize}</div>
                <p className="text-sm font-semibold text-neutral-300 mb-6">{prize.extra}</p>
                <p className="text-sm text-neutral-400">{prize.detail}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center">
            <div className="inline-block px-8 py-4 rounded-2xl bg-purple-900/30 border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
              <span className="text-lg text-purple-200 font-bold uppercase tracking-widest">TOTAL PRIZE POOL: <span className="text-white text-2xl ml-2">₹6,000</span></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY PARTICIPATE? */}
      <section className="py-24 px-4 sm:px-6 relative bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Lightbulb className="text-purple-400" /> WHY PARTICIPATE?
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { title: "PITCH YOUR IDEA", desc: "Turn your idea into a structured business pitch and present it to an evaluation panel.", icon: Presentation },
              { title: "MEET INDUSTRY EXPERTS", desc: "Interact with 4 industry professionals and receive feedback.", icon: Users },
              { title: "TAKE YOUR STARTUP FURTHER", desc: "Promising ideas get an opportunity to progress toward the Eureka! Zonal Round.", icon: TrendingUp },
              { title: "BUILD YOUR NETWORK", desc: "Connect with student entrepreneurs, mentors, jurors and the wider startup ecosystem.", icon: Globe },
              { title: "REPRESENT JSS UNIVERSITY", desc: "Compete on a larger entrepreneurship platform and contribute to JSS University's growing startup ecosystem.", icon: Building2 },
            ].map((card, i) => (
              <motion.div key={i} variants={fadeInUp} className="group p-8 rounded-3xl bg-black border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <card.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* EDC JSSUN TRACK RECORD */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Target className="text-purple-400" /> EDC JSSUN TRACK RECORD
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Box 1 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="p-8 rounded-3xl bg-white/[0.02] border border-white/10">
              <h3 className="text-xl font-bold text-purple-300 mb-6">Eureka! Road to Enterprise 2025</h3>
              <ul className="space-y-4">
                {[
                  { val: "350+", label: "Online Registrations" },
                  { val: "25+", label: "Selected Teams" },
                  { val: "80+", label: "Offline Participants" },
                  { val: "4+", label: "Industry Experts" }
                ].map((stat, i) => (
                  <li key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-neutral-400">{stat.label}</span>
                    <span className="font-bold text-white">{stat.val}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Box 2 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="p-8 rounded-3xl bg-white/[0.02] border border-white/10">
              <h3 className="text-xl font-bold text-purple-300 mb-6">Founder's Pit 2026</h3>
              <ul className="space-y-4">
                {[
                  { val: "100+", label: "Teams" },
                  { val: "500+", label: "Participants" },
                  { val: "6+", label: "Industry Experts" }
                ].map((stat, i) => (
                  <li key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-neutral-400">{stat.label}</span>
                    <span className="font-bold text-white">{stat.val}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Box 3 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="p-8 rounded-3xl bg-white/[0.02] border border-white/10">
              <h3 className="text-xl font-bold text-purple-300 mb-6">EDC JSSUN</h3>
              <ul className="space-y-4">
                {[
                  { val: "10+", label: "Entrepreneurship Events" },
                  { val: "1,000+", label: "Student Participants" },
                  { val: "15+", label: "Industry Experts & Speakers" },
                  { val: "1.5L+", label: "Social Media Impressions" }
                ].map((stat, i) => (
                  <li key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-neutral-400">{stat.label}</span>
                    <span className="font-bold text-white">{stat.val}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-4xl mx-auto text-center p-6 rounded-2xl bg-gradient-to-r from-purple-900/20 via-violet-900/20 to-purple-900/20 border border-purple-500/20">
            <p className="text-lg sm:text-xl font-medium text-purple-100">
              EDC JSSUN represented JSS University in the National Entrepreneurship Challenge and secured <strong className="text-white font-bold">Rank 283</strong> among 5,000+ E-Cells across Asia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* EVENT DETAILS */}
      <section className="py-24 px-4 sm:px-6 relative bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Calendar className="text-purple-400" /> EVENT DETAILS
            </h2>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-black border border-white/10 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Event</p>
                  <p className="text-lg font-semibold text-white">Eureka! 2026 – Road to Enterprise</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Organised By</p>
                  <p className="text-lg font-semibold text-white">EDC JSS University Noida</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">In Association With</p>
                  <p className="text-lg font-semibold text-white">E-Cell IIT Bombay</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Format</p>
                  <p className="text-lg font-semibold text-white">Online Preliminary + Offline Final</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Eligibility</p>
                  <p className="text-lg font-semibold text-white">JSS University, Noida Students</p>
                </div>
              </div>
              <div className="p-6 md:p-8 space-y-6 bg-white/[0.01]">
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1 flex items-center gap-2"><Calendar className="w-4 h-4"/> Final Date</p>
                  <p className="text-lg font-semibold text-white">22 August 2026</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1 flex items-center gap-2"><MapPin className="w-4 h-4"/> Venue</p>
                  <p className="text-lg font-semibold text-white">Room 113, AB-3, JSS University Noida</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Finalists</p>
                  <p className="text-lg font-semibold text-white">20 Teams</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Industry Jury</p>
                  <p className="text-lg font-semibold text-white">4 Experts</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1 flex items-center gap-2"><Award className="w-4 h-4"/> Prize Pool</p>
                  <p className="text-lg font-bold text-purple-400">₹6,000</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHO SHOULD PARTICIPATE? */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">WHO SHOULD PARTICIPATE?</h2>
            <p className="text-neutral-400 text-lg">Eureka! is for students who:</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              "Have a startup or business idea",
              "Have identified a real-world problem worth solving",
              "Are building a prototype or MVP",
              "Want to explore entrepreneurship",
              "Want feedback from industry professionals",
              "Have an idea they believe deserves to be heard"
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="mt-1 bg-purple-500/20 p-1.5 rounded-full"><CheckCircle2 className="w-4 h-4 text-purple-400" /></div>
                <p className="text-neutral-300 font-medium">{item}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-3xl mx-auto text-center p-10 rounded-3xl bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 relative overflow-hidden">
            <Info className="w-24 h-24 text-purple-500/10 absolute -top-4 -right-4 rotate-12" />
            <p className="text-xl sm:text-2xl font-semibold text-white relative z-10 italic">
              "You don't need a perfect startup. You need a problem worth solving and the courage to pitch it."
            </p>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-purple-600/30 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight uppercase">
              READY TO <span className="text-purple-400">PITCH?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white font-medium mb-4">
              Your idea could be the next big thing.
            </p>
            <p className="text-lg text-neutral-400 mb-12 font-light">
              Register for Eureka! 2026 – Road to Enterprise and take your first step from idea → pitch → enterprise.
            </p>
            
            <a 
              href="https://linktr.ee/edcjssun" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex px-10 py-5 bg-purple-600 hover:bg-purple-500 text-white text-lg rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] hover:scale-105 items-center justify-center gap-3"
            >
              REGISTER NOW <ArrowRight className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Eureka2026;
