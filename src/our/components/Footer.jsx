import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaRocket,
} from 'react-icons/fa';

// Custom X (formerly Twitter) logo component
const XLogo = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const location = useLocation();
  const isFoundersPit = location.pathname.startsWith('/founders-pit-event');
  const isRecruitment = location.pathname.startsWith('/recruitment-2026');

  const primaryColor = isRecruitment ? '#CCFF00' : isFoundersPit ? '#7B2FBE' : '#05B1DE';
  const primaryGradient = isRecruitment
    ? 'from-[#CCFF00] to-[#A3E600]'
    : isFoundersPit
    ? 'from-[#7B2FBE] to-[#5E0C9F]'
    : 'from-[#05B1DE] to-[#04a0c7]';
  const textClass = isRecruitment ? 'text-[#CCFF00]' : isFoundersPit ? 'text-[#7B2FBE]' : 'text-[#05B1DE]';
  const hoverBgClass = isRecruitment ? 'hover:bg-[#CCFF00]' : isFoundersPit ? 'hover:bg-[#7B2FBE]' : 'hover:bg-[#05B1DE]';
  const hoverTextClass = isRecruitment ? 'hover:text-[#CCFF00]' : isFoundersPit ? 'hover:text-[#7B2FBE]' : 'hover:text-[#05B1DE]';
  const bgGradientClass = isRecruitment
    ? 'bg-gradient-to-r from-[#CCFF00] to-[#D4FF26]'
    : isFoundersPit
    ? 'bg-gradient-to-r from-[#7B2FBE] to-[#5E0C9F]'
    : 'bg-gradient-to-r from-[#05B1DE] to-[#04a0c7]';

  const footerContainerClass = isRecruitment
    ? 'bg-gradient-to-b from-[#00147A] via-[#000E52] to-[#000626] text-white border-t border-[#CCFF00]/25 relative overflow-hidden'
    : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 text-gray-900 dark:text-white border-t border-gray-200 dark:border-neutral-700';

  const bottomBarClass = isRecruitment
    ? 'border-t border-white/10 bg-[#00041C]/90'
    : 'border-t border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900';

  const bodyTextClass = isRecruitment ? 'text-white/75' : 'text-gray-600 dark:text-gray-300';
  const headingTextClass = isRecruitment ? 'text-white' : 'text-gray-900 dark:text-white';
  const subHeadingTextClass = isRecruitment ? 'text-white/80' : 'text-gray-700 dark:text-gray-200';

  const socialLinkClass = isRecruitment
    ? 'social-link group w-12 h-12 bg-white/10 hover:bg-[#CCFF00] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border border-white/20 hover:border-[#CCFF00]'
    : `social-link group w-12 h-12 bg-white dark:bg-neutral-800 ${hoverBgClass} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border border-gray-200 dark:border-neutral-700`;

  const socialIconClass = isRecruitment
    ? 'w-5 h-5 text-white group-hover:text-black transition-colors duration-300'
    : 'w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300';

  const rocketBoxClass = isRecruitment
    ? 'w-12 h-12 bg-gradient-to-br from-[#CCFF00] to-[#A3E600] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.35)] border border-[#CCFF00]'
    : `w-12 h-12 bg-gradient-to-br ${primaryGradient} rounded-xl flex items-center justify-center`;

  const rocketIconClass = isRecruitment ? 'w-6 h-6 text-black' : 'w-6 h-6 text-white';

  const contactBoxClass = isRecruitment
    ? 'w-10 h-10 bg-gradient-to-br from-[#0038FF] to-[#001D99] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-[#CCFF00]/40 shadow-[0_0_15px_rgba(0,56,255,0.4)]'
    : `w-10 h-10 bg-gradient-to-br ${primaryGradient} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`;

  const contactIconClass = isRecruitment ? 'w-5 h-5 text-[#CCFF00]' : 'w-5 h-5 text-white';

  return (
    <footer id="footer" className={footerContainerClass}>
      {/* Background ambient accents for recruitment theme */}
      {isRecruitment && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(204,255,0,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(0,56,255,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />
        </>
      )}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className={rocketBoxClass}>
                  <FaRocket className={rocketIconClass} />
                </div>
                <h3 className={`text-3xl font-black ${isRecruitment ? 'text-white' : textClass}`}>
                  EDC <span className={textClass}>JSSUN</span>
                </h3>
              </div>
              <p className={`${bodyTextClass} text-base leading-relaxed mb-6 max-w-md`}>
                Building startups, leaders, communities, and innovations at JSS
                University. Shaping the future of entrepreneurship and
                technology through collaborative learning and innovation.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h5 className={`text-sm font-bold ${subHeadingTextClass} mb-4 uppercase tracking-wider`}>
                Connect With Us
              </h5>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/edcjssun/posts/?feedView=all"
                  className={socialLinkClass}
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className={socialIconClass} />
                </a>
                <a
                  href="https://x.com/jss_ecell"
                  className={socialLinkClass}
                  aria-label="X (formerly Twitter)"
                >
                  <XLogo className={socialIconClass} />
                </a>
                <a
                  href="https://www.instagram.com/edcjssun/"
                  className={socialLinkClass}
                  aria-label="Instagram"
                >
                  <FaInstagram className={socialIconClass} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className={`text-xl font-black ${headingTextClass} mb-6 relative`}>
              <span className={`${bgGradientClass} bg-clip-text text-transparent`}>
                Quick Links
              </span>
              <div className={`absolute -bottom-2 left-0 w-12 h-0.5 ${bgGradientClass} rounded-full`}></div>
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className={`${bodyTextClass} ${hoverTextClass} transition-all duration-300 text-base block py-2 hover:translate-x-2 group`}
                >
                  <span className="group-hover:font-medium">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className={`${bodyTextClass} ${hoverTextClass} transition-all duration-300 text-base block py-2 hover:translate-x-2 group`}
                >
                  <span className="group-hover:font-medium">Our Team</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className={`${bodyTextClass} ${hoverTextClass} transition-all duration-300 text-base block py-2 hover:translate-x-2 group`}
                >
                  <span className="group-hover:font-medium">Our Events</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`${bodyTextClass} ${hoverTextClass} transition-all duration-300 text-base block py-2 hover:translate-x-2 group`}
                >
                  <span className="group-hover:font-medium">About Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className={`text-xl font-black ${headingTextClass} mb-6 relative`}>
              <span className={`${bgGradientClass} bg-clip-text text-transparent`}>
                Get in Touch
              </span>
              <div className={`absolute -bottom-2 left-0 w-12 h-0.5 ${bgGradientClass} rounded-full`}></div>
            </h4>
            <div className="space-y-5">
              <div className="flex items-start space-x-4 group">
                <div className={contactBoxClass}>
                  <FaMapMarkerAlt className={contactIconClass} />
                </div>
                <div>
                  <h5 className={`font-semibold ${headingTextClass} mb-1`}>
                    Location
                  </h5>
                  <a
                    href="https://maps.app.goo.gl/bQ9MzqBMEJxxiwff9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${bodyTextClass} ${hoverTextClass} transition-colors duration-300 text-sm block`}
                  >
                    JSS University, Noida
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className={contactBoxClass}>
                  <FaEnvelope className={contactIconClass} />
                </div>
                <div>
                  <h5 className={`font-semibold ${headingTextClass} mb-1`}>
                    Email
                  </h5>
                  <a
                    href="mailto:edcjssun@gmail.com"
                    className={`${bodyTextClass} ${hoverTextClass} transition-colors duration-300 text-sm`}
                  >
                    edcjssun@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={bottomBarClass}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          <div className="text-center">
            <p className={`${isRecruitment ? 'text-white/60' : 'text-gray-600 dark:text-gray-400'} text-sm`}>
              Designed and developed by{' '}
              <span className={`font-semibold ${textClass}`}>Team EDC JSSUN</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
