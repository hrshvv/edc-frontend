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
  const primaryColor = isFoundersPit ? '#7B2FBE' : '#05B1DE';
  const primaryGradient = isFoundersPit ? 'from-[#7B2FBE] to-[#5E0C9F]' : 'from-[#05B1DE] to-[#04a0c7]';
  const textClass = isFoundersPit ? 'text-[#7B2FBE]' : 'text-[#05B1DE]';
  const hoverBgClass = isFoundersPit ? 'hover:bg-[#7B2FBE]' : 'hover:bg-[#05B1DE]';
  const hoverTextClass = isFoundersPit ? 'hover:text-[#7B2FBE]' : 'hover:text-[#05B1DE]';
  const bgGradientClass = isFoundersPit ? 'bg-gradient-to-r from-[#7B2FBE] to-[#5E0C9F]' : 'bg-gradient-to-r from-[#05B1DE] to-[#04a0c7]';
  return (
    <footer
      id="footer"
      className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 text-gray-900 dark:text-white border-t border-gray-200 dark:border-neutral-700"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${primaryGradient} rounded-xl flex items-center justify-center`}>
                  <FaRocket className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-3xl font-bold ${textClass}`}>EDC JSSUN</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6 max-w-md">
                Building startups, leaders, communities, and innovations at JSS
                University. Shaping the future of entrepreneurship and
                technology through collaborative learning and innovation.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4 uppercase tracking-wide">
                Connect With Us
              </h5>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/edcjssun/posts/?feedView=all"
                  className={`social-link group w-12 h-12 bg-white dark:bg-neutral-800 ${hoverBgClass} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border border-gray-200 dark:border-neutral-700`}
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href="https://x.com/jss_ecell"
                  className={`social-link group w-12 h-12 bg-white dark:bg-neutral-800 ${hoverBgClass} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border border-gray-200 dark:border-neutral-700`}
                  aria-label="X (formerly Twitter)"
                >
                  <XLogo className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300" />
                </a>
                <a
                  href="https://www.instagram.com/edcjssun/"
                  className={`social-link group w-12 h-12 bg-white dark:bg-neutral-800 ${hoverBgClass} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border border-gray-200 dark:border-neutral-700`}
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 relative">
              <span className={`${bgGradientClass} bg-clip-text text-transparent`}>
                Quick Links
              </span>
              <div className={`absolute -bottom-2 left-0 w-12 h-0.5 ${bgGradientClass} rounded-full`}></div>
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className={`text-gray-600 dark:text-gray-300 ${hoverTextClass} transition-all duration-300 text-base block py-2 hover:translate-x-2 group`}
                >
                  <span className="group-hover:font-medium">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className={`text-gray-600 dark:text-gray-300 ${hoverTextClass} transition-all duration-300 text-base block py-2 hover:translate-x-2 group`}
                >
                  <span className="group-hover:font-medium">Our Team</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className={`text-gray-600 dark:text-gray-300 ${hoverTextClass} transition-all duration-300 text-base block py-2 hover:translate-x-2 group`}
                >
                  <span className="group-hover:font-medium">Our Events</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`text-gray-600 dark:text-gray-300 ${hoverTextClass} transition-all duration-300 text-base block py-2 hover:translate-x-2 group`}
                >
                  <span className="group-hover:font-medium">About Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 relative">
              <span className={`${bgGradientClass} bg-clip-text text-transparent`}>
                Get in Touch
              </span>
              <div className={`absolute -bottom-2 left-0 w-12 h-0.5 ${bgGradientClass} rounded-full`}></div>
            </h4>
            <div className="space-y-5">
              <div className="flex items-start space-x-4 group">
                <div className={`w-10 h-10 bg-gradient-to-br ${primaryGradient} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <FaMapMarkerAlt className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Location
                  </h5>
                  <a
                    href="https://maps.app.goo.gl/bQ9MzqBMEJxxiwff9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-600 dark:text-gray-300 ${hoverTextClass} transition-colors duration-300 text-sm block`}
                  >
                    JSS University, Noida
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className={`w-10 h-10 bg-gradient-to-br ${primaryGradient} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <FaEnvelope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Email
                  </h5>
                  <a
                    href="mailto:edcjssun@gmail.com"
                    className={`text-gray-600 dark:text-gray-300 ${hoverTextClass} transition-colors duration-300 text-sm`}
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
      <div className="border-t border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
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
