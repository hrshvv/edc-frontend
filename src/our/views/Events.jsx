import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import { eventsData, formatDate, getCategoryColor } from '../data/eventsData';

// Event Card Component
const EventCard = ({ event, index }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const colors = getCategoryColor(event.category);

  const handleClick = () => {
    navigate(`/events/${event.slug}`);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: isHovered
            ? '0 25px 60px -12px rgba(5, 177, 222, 0.25), 0 0 40px -10px rgba(5, 177, 222, 0.15)'
            : '0 4px 24px -4px rgba(0, 0, 0, 0.3)',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        }}
      >
        {/* Poster Image with blurred background fill */}
        <div className="relative overflow-hidden aspect-[4/3]">
          {/* Blurred background fill — scaled up poster to fill gaps */}
          <img
            src={event.poster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110"
            style={{ filter: 'blur(25px) brightness(0.4) saturate(1.3)', opacity: imageLoaded ? 1 : 0 }}
          />
          {/* Dark overlay on blurred bg */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
          )}

          {/* Actual poster — contained, centered */}
          <div className="relative flex items-center justify-center w-full h-full p-3 z-10">
            <img
              src={event.poster}
              alt={event.title}
              className="max-w-full max-h-full rounded-lg transition-transform duration-700 ease-out"
              style={{
                objectFit: 'contain',
                transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                opacity: imageLoaded ? 1 : 0,
              }}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          </div>

          {/* Category badge */}
          <div
            className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-semibold tracking-wide backdrop-blur-md transition-all duration-300"
            style={{
              background: colors.bg,
              color: colors.text,
              border: `1px solid ${colors.border}`,
              backdropFilter: 'blur(12px)',
            }}
          >
            {event.category}
          </div>

          {/* Gallery indicator */}
          {event.gallery && event.gallery.length > 0 && (
            <div
              className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {event.gallery.length}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 pt-4">
          {/* Title + date */}
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-3.5 h-3.5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs text-gray-500 font-medium">
              {formatDate(event.date)}
            </span>
          </div>
          <h3
            className="text-lg sm:text-xl font-bold text-white leading-tight mb-2 transition-colors duration-300"
            style={{
              color: isHovered ? '#05B1DE' : '#fff',
            }}
          >
            {event.title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
            {event.shortDescription}
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Attendees */}
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#05B1DE]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-xs text-gray-400 font-medium">
                  {event.attendees}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#05B1DE]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-xs text-gray-400 font-medium">
                  {event.location}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300"
              style={{
                background: isHovered
                  ? 'rgba(5, 177, 222, 0.2)'
                  : 'rgba(255,255,255,0.05)',
                border: isHovered
                  ? '1px solid rgba(5, 177, 222, 0.4)'
                  : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <svg
                className="w-4 h-4 transition-all duration-300"
                style={{
                  color: isHovered ? '#05B1DE' : 'rgba(255,255,255,0.4)',
                  transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Hover glow border effect */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            border: '1px solid rgba(5, 177, 222, 0.3)',
            boxShadow: 'inset 0 0 30px rgba(5, 177, 222, 0.05)',
          }}
        />
      </div>
    </motion.div>
  );
};

// Category Filter Pill
const FilterPill = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
    style={{
      background: active
        ? 'linear-gradient(135deg, #05B1DE 0%, #0490b5 100%)'
        : 'rgba(255,255,255,0.05)',
      color: active ? '#fff' : 'rgba(255,255,255,0.5)',
      border: active
        ? '1px solid rgba(5, 177, 222, 0.5)'
        : '1px solid rgba(255,255,255,0.1)',
      boxShadow: active
        ? '0 4px 20px -4px rgba(5, 177, 222, 0.4)'
        : 'none',
    }}
  >
    {label}
  </button>
);

const categories = ['All', ...new Set(eventsData.map(e => e.category))];

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredEvents =
    activeFilter === 'All'
      ? eventsData
      : eventsData.filter(e => e.category === activeFilter);

  return (
    <div className="min-h-screen bg-black pt-16 sm:pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(5, 177, 222, 0.08) 0%, transparent 70%)',
          }}
        />

        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-5 tracking-tight">
              Our{' '}
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #05B1DE 0%, #06d6ff 50%, #05B1DE 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Events
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Explore our workshops, competitions, and networking sessions
              crafted to fuel your entrepreneurial journey
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {categories.map(cat => (
              <FilterPill
                key={cat}
                label={cat}
                active={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Subtle divider */}
      <div className="flex justify-center py-4">
        <div
          className="w-48 h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(5, 177, 222, 0.3), transparent)',
          }}
        />
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No events found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Events;
