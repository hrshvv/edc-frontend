import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Spotlight } from '@/components/ui/spotlight';
import RotatingText from '@/components/RotatingText';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Footer from '../components/Footer';
import TiltedCard from '@/components/TiltedCard';
import AestheticCard from '@/components/AestheticCard';
import ImageScroll from '@/components/ImageScroll';

import {
  FaCode,
  FaPalette,
  FaCalendarAlt,
  FaBullhorn,
  FaFileAlt,
  FaNetworkWired,
  FaArrowRight,
  FaLaptopCode,
  FaUsers,
  FaRocket,
  FaHandshake,
  FaGlobe,
  FaChevronDown,
  FaCrown,
  FaSearch,
  FaLink,
  FaLightbulb,
  FaChess,
  FaCogs,
} from 'react-icons/fa';
import { HiSparkles, HiLightBulb } from 'react-icons/hi';
import { MdDesignServices, MdEvent, MdCampaign } from 'react-icons/md';

const Main = () => {
  const [isShopPopupOpen, setIsShopPopupOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToTimeline = () => {
    const timelineSection = document.querySelector('#timeline-section');
    if (timelineSection) {
      const offset = 50; // Scroll 50px above the timeline section
      const elementPosition = timelineSection.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative flex min-h-screen w-full overflow-hidden bg-white dark:bg-black antialiased items-center justify-center px-4 sm:px-6">
        {/* Grid Background */}
        <div
          className={cn(
            'pointer-events-none absolute inset-0 [background-size:20px_20px] sm:[background-size:30px_30px] md:[background-size:40px_40px] select-none opacity-40',
            'dark:[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]',
            '[background-image:linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]'
          )}
        />

        {/* Floating Gradient Orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
          {/* Primary orb - top right */}
          <div className="animate-float-slow absolute -top-20 -right-20 sm:top-10 sm:right-10 md:top-20 md:right-20 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] pointer-events-none">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#05B1DE]/40 to-cyan-400/20 blur-[80px] animate-pulse-glow" />
          </div>
          {/* Secondary orb - bottom left */}
          <div className="animate-float-slow-reverse absolute -bottom-32 -left-32 sm:bottom-0 sm:left-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] pointer-events-none">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-500/30 to-[#05B1DE]/20 blur-[80px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
          </div>
          {/* Accent orb - center */}
          <div className="animate-float-diagonal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] pointer-events-none">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-[#05B1DE]/20 to-blue-600/10 blur-[80px] animate-pulse-glow" style={{ animationDelay: '4s' }} />
          </div>
        </div>

        {/* Spotlight */}
        <Spotlight
          className="top-0 left-1/2 -translate-x-1/2 md:-top-20 md:left-1/2 md:-translate-x-1/2"
          fill="#05B1DE"
        />

        {/* Radial vignette overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] select-none" />

        {/* Main Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="text-center flex flex-col items-center">



            {/* Badge Pill */}
            <div className="animate-fade-up-delay-1 mb-4 sm:mb-6 md:mb-8">
              <div className="hero-shimmer inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full border border-[#05B1DE]/30 bg-[#05B1DE]/5 backdrop-blur-sm max-w-[90vw] overflow-hidden">                <HiSparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#05B1DE]" />
                <span className="text-base sm:text-lg md:text-xl font-medium text-gray-400 tracking-wide uppercase">
                  JSS University's Entrepreneurship Club
                </span>
              </div>
            </div>

            {/* Main Heading — mobile: 3rem, sm: 3.75rem, md: 5rem, lg: 6.5rem, xl: 8rem */}
            <div className="animate-fade-up-delay-2 flex flex-col md:flex-row items-center justify-center gap-0 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4 text-center">
              <p className="text-gray-800 dark:text-neutral-200 text-[4rem] sm:text-[3.75rem] md:text-[5rem] lg:text-[6rem] xl:text-[6rem] font-bold tracking-tight leading-[1.05]">
                Build
              </p>
              <RotatingText
                texts={['Startups', 'Leaders', 'Vision', 'Networks', 'Future']}
                mainClassName="px-2 sm:px-2 md:px-3 text-[#05B1DE] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center text-[4rem] sm:text-[3.75rem] md:text-[5rem] lg:text-[6rem] xl:text-[6rem] font-bold tracking-tight leading-[1.05]"
                staggerFrom="last"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-120%', opacity: 0 }}
                staggerDuration={0.02}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: 'spring', damping: 30, stiffness: 450 }}
                rotationInterval={3000}
              />
            </div>

            {/* Subtitle — mobile: 0.75rem, sm: 0.875rem, md: 1rem, lg: 1.125rem, xl: 1.25rem */}
            <p className="animate-fade-up-delay-3 text-gray-600 dark:text-neutral-500 text-sm sm:text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] xl:text-[1.25rem] font-normal px-4 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-10">
              Think Big. Build Bigger.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-up-delay-3 flex flex-row items-center gap-2.5 sm:gap-4 mb-8 sm:mb-12 md:mb-14">
              <button
                onClick={() => navigate('/events')}
                className="group flex items-center gap-1.5 sm:gap-2 px-5 py-2.5 sm:px-8 sm:py-3.5 bg-[#05B1DE] text-white rounded-full font-semibold text-xs sm:text-sm md:text-base hover:bg-[#04a0c7] transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(5,177,222,0.3)] hover:shadow-[0_0_40px_rgba(5,177,222,0.5)]"
              >
                Explore Events
                <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => navigate('/team')}
                className="group flex items-center gap-1.5 sm:gap-2 px-5 py-2.5 sm:px-8 sm:py-3.5 bg-white/5 text-gray-300 rounded-full font-semibold text-xs sm:text-sm md:text-base border border-white/10 hover:border-[#05B1DE]/40 hover:bg-[#05B1DE]/10 hover:text-white transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                Meet Our Team
                <FaUsers className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>

            {/* Freshers WhatsApp Group CTA */}
            <div className="animate-fade-up-delay-3 w-full flex justify-center px-2 -mt-4 sm:-mt-6 mb-8 sm:mb-12 md:mb-14">
              <a
                href="https://chat.whatsapp.com/GSDFcDbB2ms6UYhkUsmeRv?s=cl&p=a&ilr=1"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 py-3 sm:px-8 sm:py-3.5 max-w-full bg-[#25D366] text-white rounded-full font-semibold text-xs sm:text-sm md:text-base hover:bg-[#1ebe5b] transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.5)]"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Join the Freshers' WhatsApp Group
                <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Stats Row */}
            <div className="animate-fade-up-delay-4 w-full max-w-3xl mx-auto">
              <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
                <div className="group text-center p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#05B1DE]/30 hover:bg-[#05B1DE]/5 transition-all duration-500 backdrop-blur-sm">
                  <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#05B1DE] mb-0.5 sm:mb-1 group-hover:scale-110 transition-transform duration-300">
                    8+
                  </p>
                  <p className="text-[0.5rem] sm:text-[0.65rem] md:text-xs lg:text-sm text-gray-500 dark:text-neutral-500 font-medium uppercase tracking-wider">
                    Events Hosted
                  </p>
                </div>
                <div className="group text-center p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#05B1DE]/30 hover:bg-[#05B1DE]/5 transition-all duration-500 backdrop-blur-sm">
                  <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#05B1DE] mb-0.5 sm:mb-1 group-hover:scale-110 transition-transform duration-300">
                    50+
                  </p>
                  <p className="text-[0.5rem] sm:text-[0.65rem] md:text-xs lg:text-sm text-gray-500 dark:text-neutral-500 font-medium uppercase tracking-wider">
                    Active Members
                  </p>
                </div>
                <div className="group text-center p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#05B1DE]/30 hover:bg-[#05B1DE]/5 transition-all duration-500 backdrop-blur-sm">
                  <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#05B1DE] mb-0.5 sm:mb-1 group-hover:scale-110 transition-transform duration-300">
                    1500+
                  </p>
                  <p className="text-[0.5rem] sm:text-[0.65rem] md:text-xs lg:text-sm text-gray-500 dark:text-neutral-500 font-medium uppercase tracking-wider">
                    Students Reached
                  </p>
                </div>
                <div className="group text-center p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#05B1DE]/30 hover:bg-[#05B1DE]/5 transition-all duration-500 backdrop-blur-sm">
                  <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#05B1DE] mb-0.5 sm:mb-1 group-hover:scale-110 transition-transform duration-300">
                    8
                  </p>
                  <p className="text-[0.5rem] sm:text-[0.65rem] md:text-xs lg:text-sm text-gray-500 dark:text-neutral-500 font-medium uppercase tracking-wider">
                    Departments
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Down Button */}
        <div className="swipe-down-button hidden md:block">
          <button
            onClick={scrollToTimeline}
            className="group flex flex-col items-center gap-2 p-4 rounded-full bg-[#05B1DE]/10 hover:bg-[#05B1DE]/20 backdrop-blur-md border border-[#05B1DE]/20 hover:border-[#05B1DE]/40 transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(5,177,222,0.15)]"
            aria-label="Scroll to timeline section"
          >
            <FaChevronDown className="w-5 h-5 text-[#05B1DE] group-hover:translate-y-1 transition-transform duration-300 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Image Scroll Section */}
      <ImageScroll
        images={[
          {
            src: '/images/1.jpg',
            alt: 'Image 1',
            caption: '',
          },
          {
            src: '/images/2.png',
            alt: 'Image 2',
            caption: '',
          },
        ]}
      />

      {/* Timeline Section */}
      <div
        id="timeline-section"
        className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-black dark:bg-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              What{' '}
              <span className="text-[#05B1DE] dark:text-[#05B1DE]">We Do?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From exploration to launch, discover how we transform ideas into
              reality
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#05B1DE] via-blue-400 to-cyan-400 transform -translate-y-1/2 rounded-full hidden lg:block"></div>

            {/* Mobile Timeline Line */}
            <div className="absolute left-6 sm:left-7 md:left-8 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-[#05B1DE] via-blue-400 to-cyan-400 rounded-full lg:hidden"></div>

            {/* Timeline Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-4 md:gap-6 lg:gap-4">
              {/* We Explore */}
              <div className="relative flex flex-col items-center group">
                <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 mb-3 sm:mb-4">
                  <FaSearch className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-purple-500 transition-colors duration-300">
                    We Explore
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                    Discover opportunities and market insights
                  </p>
                </div>
                {/* Connector for mobile */}
                <div className="absolute top-6 sm:top-7 md:top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-6 sm:h-7 md:h-8 bg-gradient-to-b from-purple-500 to-blue-500 lg:hidden"></div>
              </div>

              {/* We Connect */}
              <div className="relative flex flex-col items-center group">
                <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 mb-3 sm:mb-4">
                  <FaNetworkWired className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-blue-500 transition-colors duration-300">
                    We Connect
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                    Build relationships and partnerships
                  </p>
                </div>
                {/* Connector for mobile */}
                <div className="absolute top-6 sm:top-7 md:top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-6 sm:h-7 md:h-8 bg-gradient-to-b from-blue-500 to-green-500 lg:hidden"></div>
              </div>

              {/* We Create */}
              <div className="relative flex flex-col items-center group">
                <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 mb-3 sm:mb-4">
                  <FaLightbulb className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-green-500 transition-colors duration-300">
                    We Create
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                    Generate innovative solutions
                  </p>
                </div>
                {/* Connector for mobile */}
                <div className="absolute top-6 sm:top-7 md:top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-6 sm:h-7 md:h-8 bg-gradient-to-b from-green-500 to-orange-500 lg:hidden"></div>
              </div>

              {/* We Strategize */}
              <div className="relative flex flex-col items-center group">
                <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 mb-3 sm:mb-4">
                  <FaChess className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-orange-500 transition-colors duration-300">
                    We Strategize
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                    Plan and optimize our approach
                  </p>
                </div>
                {/* Connector for mobile */}
                <div className="absolute top-6 sm:top-7 md:top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-6 sm:h-7 md:h-8 bg-gradient-to-b from-orange-500 to-red-500 lg:hidden"></div>
              </div>

              {/* We Develop */}
              <div className="relative flex flex-col items-center group">
                <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 mb-3 sm:mb-4">
                  <FaCogs className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-red-500 transition-colors duration-300">
                    We Develop
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                    Build and refine our products
                  </p>
                </div>
                {/* Connector for mobile */}
                <div className="absolute top-6 sm:top-7 md:top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-6 sm:h-7 md:h-8 bg-gradient-to-b from-red-500 to-cyan-500 lg:hidden"></div>
              </div>

              {/* We Launch */}
              <div className="relative flex flex-col items-center group">
                <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 mb-3 sm:mb-4">
                  <FaRocket className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-cyan-500 transition-colors duration-300">
                    We Launch
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                    Bring solutions to the market
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="teams-section"
        className="pt-26 sm:pt-32 md:pt-34 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 bg-black dark:bg-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-3 sm:mb-4">
              Our{' '}
              <span className="text-[#05B1DE] dark: text-[#05B1DE]">
                Departments
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-4">
              Discover the diverse teams that drive innovation and excellence at
              EDC
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-10">
            {/* Core Team Card */}
            <div
              onClick={() => navigate('/team?filter=Core Team')}
              className="cursor-pointer group relative bg-gradient-to-br from-white to-amber-50 dark:from-neutral-900 dark:to-amber-950/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500 dark:hover:border-amber-500 overflow-hidden"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-2 sm:h-3 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-400 rounded-t-3xl"></div>

              {/* Floating sparkles */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-amber-500/20 group-hover:text-amber-500/40 transition-all duration-300">
                <HiSparkles className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl sm:rounded-3xl mb-4 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <FaCrown className="w-6 h-6 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-sm sm:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 sm:mb-6 group-hover:text-amber-500 transition-colors duration-300">
                  Core Team
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-8 leading-tight sm:leading-relaxed text-[10px] sm:text-base">
                  Leading EDC's strategic vision, making key decisions, and
                  guiding the organization towards excellence in
                  entrepreneurship and innovation.
                </p>
                <div className="flex items-center justify-center">
                  <div className="text-amber-500/30 group-hover:text-amber-500 transition-colors duration-300">
                    <FaCrown className="w-5 h-5 sm:w-8 sm:h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Team Card */}
            <div
              onClick={() => navigate('/team?filter=Technical Team')}
              className="cursor-pointer group relative bg-gradient-to-br from-white to-blue-50 dark:from-neutral-900 dark:to-blue-950/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-neutral-200 dark:border-neutral-800 hover:border-[#05B1DE] dark:hover:border-[#05B1DE] overflow-hidden"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#05B1DE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-2 sm:h-3 bg-gradient-to-r from-[#05B1DE] via-blue-500 to-cyan-400 rounded-t-3xl"></div>

              {/* Floating sparkles */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#05B1DE]/20 group-hover:text-[#05B1DE]/40 transition-all duration-300">
                <HiSparkles className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-[#05B1DE] to-blue-600 rounded-xl sm:rounded-3xl mb-4 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <FaLaptopCode className="w-6 h-6 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-sm sm:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 sm:mb-6 group-hover:text-[#05B1DE] transition-colors duration-300">
                  Technical Team
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-8 leading-tight sm:leading-relaxed text-[10px] sm:text-base">
                  Building cutting-edge solutions, developing websites, apps,
                  and managing technical infrastructure for all EDC initiatives.
                </p>
                <div className="flex items-center justify-center">
                  <div className="text-[#05B1DE]/30 group-hover:text-[#05B1DE] transition-colors duration-300">
                    <FaCode className="w-5 h-5 sm:w-8 sm:h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Design Team Card */}
            <div
              onClick={() => navigate('/team?filter=Design Team')}
              className="cursor-pointer group relative bg-gradient-to-br from-white to-purple-50 dark:from-neutral-900 dark:to-purple-950/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-neutral-200 dark:border-neutral-800 hover:border-purple-500 dark:hover:border-purple-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-2 sm:h-3 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 rounded-t-3xl"></div>

              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-purple-500/20 group-hover:text-purple-500/40 transition-all duration-300">
                <HiLightBulb className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-3xl mb-4 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <MdDesignServices className="w-6 h-6 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-sm sm:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 sm:mb-6 group-hover:text-purple-500 transition-colors duration-300">
                  Design Team
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-8 leading-tight sm:leading-relaxed text-[10px] sm:text-base">
                  Creating stunning visual experiences, brand identity, and user
                  interfaces that bring our vision to life with creativity.
                </p>
                <div className="flex items-center justify-center">
                  <div className="text-purple-500/30 group-hover:text-purple-500 transition-colors duration-300">
                    <FaPalette className="w-5 h-5 sm:w-8 sm:h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Events & Training Team Card */}
            <div
              onClick={() => navigate('/team?filter=Events and Training Team')}
              className="cursor-pointer group relative bg-gradient-to-br from-white to-orange-50 dark:from-neutral-900 dark:to-orange-950/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-neutral-200 dark:border-neutral-800 hover:border-orange-500 dark:hover:border-orange-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-2 sm:h-3 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 rounded-t-3xl"></div>

              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-orange-500/20 group-hover:text-orange-500/40 transition-all duration-300">
                <FaRocket className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl sm:rounded-3xl mb-4 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <MdEvent className="w-6 h-6 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-sm sm:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 sm:mb-6 group-hover:text-orange-500 transition-colors duration-300">
                  Events & Training
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-8 leading-tight sm:leading-relaxed text-[10px] sm:text-base">
                  Organizing workshops, hackathons, and training sessions to
                  foster learning and community growth through engagement.
                </p>
                <div className="flex items-center justify-center">
                  <div className="text-orange-500/30 group-hover:text-orange-500 transition-colors duration-300">
                    <FaCalendarAlt className="w-5 h-5 sm:w-8 sm:h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing Team Card */}
            <div
              onClick={() => navigate('/team?filter=Marketing Team')}
              className="cursor-pointer group relative bg-gradient-to-br from-white to-green-50 dark:from-neutral-900 dark:to-green-950/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-neutral-200 dark:border-neutral-800 hover:border-green-500 dark:hover:border-green-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-2 sm:h-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-400 rounded-t-3xl"></div>

              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-green-500/20 group-hover:text-green-500/40 transition-all duration-300">
                <HiSparkles className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-3xl mb-4 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <MdCampaign className="w-6 h-6 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-sm sm:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 sm:mb-6 group-hover:text-green-500 transition-colors duration-300">
                  Marketing Team
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-8 leading-tight sm:leading-relaxed text-[10px] sm:text-base">
                  Promoting EDC initiatives, building brand awareness, and
                  connecting with the entrepreneurial community strategically.
                </p>
                <div className="flex items-center justify-center">
                  <div className="text-green-500/30 group-hover:text-green-500 transition-colors duration-300">
                    <FaBullhorn className="w-5 h-5 sm:w-8 sm:h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content & Documentation Team Card */}
            <div
              onClick={() => navigate('/team?filter=Content and Documentation Team')}
              className="cursor-pointer group relative bg-gradient-to-br from-white to-blue-50 dark:from-neutral-900 dark:to-blue-950/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-2 sm:h-3 bg-[#05B1DE] rounded-t-3xl"></div>

              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-blue-500/20 group-hover:text-blue-500/40 transition-all duration-300">
                <HiLightBulb className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-3xl mb-4 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <FaFileAlt className="w-6 h-6 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-sm sm:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 sm:mb-6 group-hover:text-blue-500 transition-colors duration-300">
                  Content & Docs
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-8 leading-tight sm:leading-relaxed text-[10px] sm:text-base">
                  Creating compelling content, maintaining documentation, and
                  ensuring clear communication across all platforms.
                </p>
                <div className="flex items-center justify-center">
                  <div className="text-blue-500/30 group-hover:text-blue-500 transition-colors duration-300">
                    <FaFileAlt className="w-5 h-5 sm:w-8 sm:h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Media & Networking Team Card */}
            <div
              onClick={() => navigate('/team?filter=Media and Networking Team')}
              className="cursor-pointer group relative bg-gradient-to-br from-white to-pink-50 dark:from-neutral-900 dark:to-pink-950/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-neutral-200 dark:border-neutral-800 hover:border-pink-500 dark:hover:border-pink-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-2 sm:h-3 bg-gradient-to-r from-pink-500 via-rose-500 to-red-400 rounded-t-3xl"></div>

              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-pink-500/20 group-hover:text-pink-500/40 transition-all duration-300">
                <FaUsers className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl sm:rounded-3xl mb-4 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <FaNetworkWired className="w-6 h-6 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-sm sm:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 sm:mb-6 group-hover:text-pink-500 transition-colors duration-300">
                  Media & Networking
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-8 leading-tight sm:leading-relaxed text-[10px] sm:text-base">
                  Building connections, managing social media presence, and
                  fostering relationships within the startup ecosystem.
                </p>
                <div className="flex items-center justify-center">
                  <div className="text-pink-500/30 group-hover:text-pink-500 transition-colors duration-300">
                    <FaNetworkWired className="w-5 h-5 sm:w-8 sm:h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Outreach Team Card */}
            <div
              onClick={() => navigate('/team?filter=Outreach Team')}
              className="cursor-pointer group relative bg-gradient-to-br from-white to-teal-50 dark:from-neutral-900 dark:to-teal-950/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-neutral-200 dark:border-neutral-800 hover:border-teal-500 dark:hover:border-teal-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-2 sm:h-3 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-400 rounded-t-3xl"></div>

              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-teal-500/20 group-hover:text-teal-500/40 transition-all duration-300">
                <FaGlobe className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl sm:rounded-3xl mb-4 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <FaGlobe className="w-6 h-6 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-sm sm:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 sm:mb-6 group-hover:text-teal-500 transition-colors duration-300">
                  Outreach Team
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-8 leading-tight sm:leading-relaxed text-[10px] sm:text-base">
                  Expanding EDC's reach, building partnerships with external
                  organizations, and connecting with the broader entrepreneurial
                  ecosystem.
                </p>
                <div className="flex items-center justify-center">
                  <div className="text-teal-500/30 group-hover:text-teal-500 transition-colors duration-300">
                    <FaGlobe className="w-5 h-5 sm:w-8 sm:h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Liaisoning Team Card */}
            <div
              onClick={() => navigate('/team?filter=Liaisoning Team')}
              className="cursor-pointer group relative bg-gradient-to-br from-white to-indigo-50 dark:from-neutral-900 dark:to-indigo-950/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-neutral-200 dark:border-neutral-800 hover:border-indigo-500 dark:hover:border-indigo-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-2 sm:h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 rounded-t-3xl"></div>

              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-indigo-500/20 group-hover:text-indigo-500/40 transition-all duration-300">
                <FaHandshake className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-3xl mb-4 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <FaHandshake className="w-6 h-6 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-sm sm:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 sm:mb-6 group-hover:text-indigo-500 transition-colors duration-300">
                  Liaisoning Team
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-8 leading-tight sm:leading-relaxed text-[10px] sm:text-base">
                  Facilitating communication between teams, coordinating
                  internal processes, and ensuring smooth collaboration across
                  all departments.
                </p>
                <div className="flex items-center justify-center">
                  <div className="text-indigo-500/30 group-hover:text-indigo-500 transition-colors duration-300">
                    <FaHandshake className="w-5 h-5 sm:w-8 sm:h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Events Section */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-4xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6">
              Our{' '}
              <span className="text-[#05B1DE] dark:text-[#05B1DE]">Events</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 dark:text-gray-300 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-4">
              Join us for exciting workshops, competitions, and networking
              events designed to fuel your entrepreneurial journey
            </p>
          </div>

          {/* Events Cards */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-6 xl:gap-8 max-w-7xl mx-auto">
            {/* 1. Founders Pit */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[300px] xl:max-w-[280px]">
              <TiltedCard
                imageSrc="https://res.cloudinary.com/dh8cqlngr/image/upload/v1779975031/Untitled_design_20260408_000754_0000_w6hkgu.png"
                altText="Founder's Pit 2026"
                captionText="Founder's Pit 2026"
                containerHeight="400px"
                containerWidth="100%"
                imageHeight="400px"
                imageWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                onClick={() => navigate('/founders-pit-event')}
              />
            </div>

            {/* 2. Pixel X */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[300px] xl:max-w-[280px]">
              <TiltedCard
                imageSrc="https://res.cloudinary.com/dh8cqlngr/image/upload/v1774386653/pixelx_sfznix.png"
                altText="Pixel X"
                captionText="Pixel X"
                containerHeight="400px"
                containerWidth="100%"
                imageHeight="400px"
                imageWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                onClick={() => navigate('/events/pixel-x')}
              />
            </div>

            {/* 3. UI/UX Workshop */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[300px] xl:max-w-[280px]">
              <TiltedCard
                imageSrc="https://res.cloudinary.com/dh8cqlngr/image/upload/v1774387556/10160695-abfd-4065-b05f-04825a49a52e.png"
                altText="UI/UX Workshop"
                captionText="UI/UX Workshop"
                containerHeight="400px"
                containerWidth="100%"
                imageHeight="400px"
                imageWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                onClick={() => navigate('/events/ui-ux-workshop')}
              />
            </div>

            {/* 4. LinkedIn Workshop */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[300px] xl:max-w-[280px]">
              <TiltedCard
                imageSrc="https://res.cloudinary.com/dh8cqlngr/image/upload/v1765714638/Screenshot_2025-12-14_174705_rcvjzy.png"
                altText="LinkedIn Workshop"
                captionText="LinkedIn Workshop"
                containerHeight="400px"
                containerWidth="100%"
                imageHeight="400px"
                imageWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                onClick={() => navigate('/events/linkedin-workshop')}
              />
            </div>

            {/* 5. Expert Talk */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[300px] xl:max-w-[280px]">
              <TiltedCard
                imageSrc="https://res.cloudinary.com/dh8cqlngr/image/upload/v1765714147/Screenshot_2025-12-14_173753_fgjulh.png"
                altText="Expert Talk"
                captionText="Expert Talk"
                containerHeight="400px"
                containerWidth="100%"
                imageHeight="400px"
                imageWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                onClick={() => navigate('/events/expert-talk')}
              />
            </div>

            {/* 6. EDCxEureka! Road to Enterprise 2025 */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[300px] xl:max-w-[280px]">
              <TiltedCard
                imageSrc="https://res.cloudinary.com/dh8cqlngr/image/upload/v1759080883/WhatsApp_Image_2025-09-28_at_22.00.24_4f14c6fe_sazknc.jpg"
                altText="EDCxEureka"
                captionText="EDCxEureka"
                containerHeight="400px"
                containerWidth="100%"
                imageHeight="400px"
                imageWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                onClick={() => navigate('/events/eureka-road-to-enterprise-2025')}
              />
            </div>

            {/* 7. Orientation Programme 2025 */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[300px] xl:max-w-[280px]">
              <TiltedCard
                imageSrc="https://res.cloudinary.com/dh8cqlngr/image/upload/v1759080882/WhatsApp_Image_2025-09-28_at_22.01.37_a5399f7c_w0jn1f.jpg"
                altText="Orientation Program 2025"
                captionText="Orientation Program 2025"
                containerHeight="400px"
                containerWidth="100%"
                imageHeight="400px"
                imageWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                onClick={() => navigate('/events/orientation-programme-2025')}
              />
            </div>

            {/* 8. Group Discussion */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[300px] xl:max-w-[280px]">
              <TiltedCard
                imageSrc="https://res.cloudinary.com/dh8cqlngr/image/upload/v1759080881/EDC_JSS_UNI_nviwol.png"
                altText="Group Discussion"
                captionText="Group Discussion"
                containerHeight="400px"
                containerWidth="100%"
                imageHeight="400px"
                imageWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                onClick={() => navigate('/events/group-discussion')}
              />
            </div>

            {/* 9. Recruitment Drive */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[300px] xl:max-w-[280px]">
              <TiltedCard
                imageSrc="https://res.cloudinary.com/dh8cqlngr/image/upload/v1759080883/Recruitment_20250918_114625_0000_vaz5rz.png"
                altText="EDC Recruitment Drive 2025"
                captionText="EDC Recruitment Drive 2025"
                containerHeight="400px"
                containerWidth="100%"
                imageHeight="400px"
                imageWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Merchandise Section */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-black dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-4xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6">
              Our{' '}
              <span className="text-[#05B1DE] dark:text-[#05B1DE]">
                Merchandise
              </span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 dark:text-gray-300 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-4">
              Show your EDC pride with our exclusive collection of branded
              merchandise.
            </p>
          </div>

          {/* Merchandise Cards */}

          {/* Featured Merchandise Card */}
          <div className="mt-8 sm:mt-12 md:mt-16 max-w-6xl mx-auto flex justify-center">
            <AestheticCard
              imageSrc="https://res.cloudinary.com/dh8cqlngr/image/upload/v1760031621/Untitled-1_gioqwv.png"
              altText="Featured EDC Merchandise"
              className="w-full"
              onClick={() => console.log('Featured merchandise clicked')}
            />
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8 sm:mt-12 md:mt-16">
            <Popover open={isShopPopupOpen} onOpenChange={setIsShopPopupOpen}>
              <PopoverTrigger asChild>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#05B1DE] text-white rounded-full hover:bg-[#05B1DE]/90 transition-colors duration-300 cursor-pointer">
                  <span className="text-sm sm:text-base font-medium">
                    Shop Now
                  </span>
                  <FaArrowRight className="w-4 h-4" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 sm:w-96 p-0 border-0 bg-transparent shadow-none"
                side="top"
                align="center"
              >
                <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-neutral-700 overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#05B1DE]/5 to-transparent"></div>

                  {/* Header */}
                  <div className="relative p-6 sm:p-8 text-center border-b border-gray-200 dark:border-neutral-700">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#05B1DE] to-blue-600 rounded-full flex items-center justify-center">
                      <FaRocket className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Coming Soon!
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                      We're preparing something amazing for you
                    </p>
                  </div>

                  {/* Content */}
                  <div className="relative p-6 sm:p-8">
                    <div className="text-center mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        EDC Merchandise Store
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        Get ready to showcase your EDC pride! We're working hard
                        to bring you exclusive branded merchandise including
                        t-shirts, hoodies, stickers, and more.
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-[#05B1DE] rounded-full"></div>
                        <span>Premium quality materials</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-[#05B1DE] rounded-full"></div>
                        <span>Exclusive EDC designs</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-[#05B1DE] rounded-full"></div>
                        <span>Student-friendly pricing</span>
                      </div>
                    </div>

                    {/* Notification */}
                    <div className="bg-[#05B1DE]/10 border border-[#05B1DE]/20 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 text-[#05B1DE] text-sm font-medium">
                        <HiSparkles className="w-4 h-4" />
                        <span>Stay tuned for updates!</span>
                      </div>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => setIsShopPopupOpen(false)}
                      className="w-full py-3 px-4 bg-[#05B1DE] text-white rounded-lg hover:bg-[#05B1DE]/90 transition-colors duration-300 font-medium"
                    >
                      Got it!
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Main;
