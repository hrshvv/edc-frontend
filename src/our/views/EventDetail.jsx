import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import {
  eventsData,
  getEventBySlug,
  formatDate,
  getCategoryColor,
} from '../data/eventsData';

// ─── Lightbox ────────────────────────────────────────────────────────
const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.96)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-50 transition-all duration-300 hover:bg-white/20"
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 sm:left-8 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer z-50 transition-all duration-300 hover:bg-white/20 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={e => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 sm:right-8 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer z-50 transition-all duration-300 hover:bg-white/20 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.3 }}
        className="max-w-[90vw] max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={images[currentIndex].image}
          alt={`Gallery ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />
      </motion.div>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm text-white"
        style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}
      >
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
};

// ─── Interactive Gallery ─────────────────────────────────────────────
const InteractiveGallery = ({ gallery, onOpenLightbox }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [featuredLoaded, setFeaturedLoaded] = useState(false);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Featured / active image */}
      <motion.div
        className="relative w-full overflow-hidden rounded-2xl cursor-pointer group"
        style={{
          border: '1px solid rgba(255,255,255,0.08)',
          minHeight: '300px',
        }}
        onClick={() => onOpenLightbox(activeIndex)}
        layoutId="featured-gallery"
      >
        {/* Blurred background fill */}
        <img
          src={gallery[activeIndex].image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{ filter: 'blur(30px) brightness(0.35) saturate(1.3)' }}
        />
        <div className="absolute inset-0 bg-black/20" />

        {!featuredLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse rounded-2xl" />
        )}
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            src={gallery[activeIndex].image}
            alt={`Gallery ${activeIndex + 1}`}
            className="relative z-10 w-full h-auto max-h-[450px] sm:max-h-[500px] object-contain mx-auto"
            style={{ opacity: featuredLoaded ? 1 : 0 }}
            onLoad={() => setFeaturedLoaded(true)}
          />
        </AnimatePresence>

        {/* Expand hint overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'rgba(0,0,0,0.3)' }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>

        {/* Image counter */}
        <div
          className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium text-white"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {activeIndex + 1} / {gallery.length}
        </div>
      </motion.div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {gallery.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => { setActiveIndex(idx); setFeaturedLoaded(false); }}
            className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
            style={{
              border: activeIndex === idx
                ? '2px solid #05B1DE'
                : '2px solid rgba(255,255,255,0.08)',
              opacity: activeIndex === idx ? 1 : 0.5,
              transform: activeIndex === idx ? 'scale(1)' : 'scale(0.95)',
              boxShadow: activeIndex === idx
                ? '0 0 20px rgba(5, 177, 222, 0.3)'
                : 'none',
            }}
          >
            <img
              src={img.image}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {activeIndex === idx && (
              <motion.div
                layoutId="thumb-indicator"
                className="absolute inset-0 rounded-xl"
                style={{ border: '2px solid #05B1DE', boxShadow: 'inset 0 0 15px rgba(5, 177, 222, 0.15)' }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────
const EventDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = getEventBySlug(slug);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback(index => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const nextImage = useCallback(() => {
    if (event?.gallery) {
      setLightboxIndex(prev => (prev + 1) % event.gallery.length);
    }
  }, [event]);

  const prevImage = useCallback(() => {
    if (event?.gallery) {
      setLightboxIndex(prev => (prev - 1 + event.gallery.length) % event.gallery.length);
    }
  }, [event]);

  // 404
  if (!event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400 mb-8">Event not found</p>
          <button
            onClick={() => navigate('/events')}
            className="px-6 py-3 rounded-xl text-white font-medium cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #05B1DE 0%, #0490b5 100%)',
              boxShadow: '0 4px 20px -4px rgba(5, 177, 222, 0.4)',
            }}
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const colors = getCategoryColor(event.category);

  return (
    <div className="min-h-screen bg-black">
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && event.gallery && event.gallery.length > 0 && (
          <Lightbox
            images={event.gallery}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>

      {/* Top spacer for fixed navbar */}
      <div className="pt-24 sm:pt-28" />

      {/* Back button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/events')}
          className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">All Events</span>
        </motion.button>
      </div>

      {/* ────────── Hero: Poster + Info Side by Side ────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left — Poster Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Blurred background fill */}
              <img
                src={event.poster}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-110"
                style={{ filter: 'blur(30px) brightness(0.35) saturate(1.4)' }}
              />
              <div className="absolute inset-0 bg-black/25" />
              {/* Contained poster */}
              <div className="relative flex items-center justify-center p-4 sm:p-5 z-10 min-h-[350px] sm:min-h-[420px]">
                <img
                  src={event.poster}
                  alt={event.title}
                  className="max-w-full max-h-[400px] sm:max-h-[450px] rounded-xl"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </motion.div>

            {/* Right — Event Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col"
            >
              {/* Category + Date */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                  style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                >
                  {event.category}
                </span>
                <span className="text-gray-500 text-sm flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(event.date)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
                {event.title}
              </h1>

              {/* Description */}
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                {event.description}
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: 'linear-gradient(145deg, rgba(5, 177, 222, 0.08) 0%, rgba(5, 177, 222, 0.02) 100%)',
                    border: '1px solid rgba(5, 177, 222, 0.15)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(5, 177, 222, 0.15)' }}>
                      <svg className="w-4.5 h-4.5 text-[#05B1DE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white">{event.attendees}</div>
                      <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Attendees</div>
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: 'linear-gradient(145deg, rgba(34, 197, 94, 0.08) 0%, rgba(34, 197, 94, 0.02) 100%)',
                    border: '1px solid rgba(34, 197, 94, 0.15)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34, 197, 94, 0.15)' }}>
                      <svg className="w-4.5 h-4.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-base font-bold text-white truncate">{event.location}</div>
                      <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Location</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ────────── Content Sections ────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #22C55E, rgba(34, 197, 94, 0.3))' }} />
              Event Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {event.highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(34, 197, 94, 0.15)' }}>
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm sm:text-base">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Winner Section */}
          {event.winner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #EAB308, rgba(234, 179, 8, 0.3))' }} />
                Competition Winners
              </h2>
              <div
                className="relative p-6 sm:p-8 rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, rgba(234, 179, 8, 0.08) 0%, rgba(234, 179, 8, 0.02) 100%)',
                  border: '1px solid rgba(234, 179, 8, 0.2)',
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(234, 179, 8, 0.15)' }}>
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold text-yellow-300">Winning Teams</span>
                </div>
                <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span
                    className="text-lg sm:text-xl font-semibold text-white leading-relaxed block text-center whitespace-pre-line"
                  >
                    {event.winner.replace(/<br\s*\/?>/gi, '\n')}
                  </span>
                </div>
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(234, 179, 8, 0.1) 0%, transparent 70%)' }} />
              </div>
            </motion.div>
          )}

          {/* ──── Interactive Photo Gallery ──── */}
          {event.gallery && event.gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #A855F7, rgba(168, 85, 247, 0.3))' }} />
                Photo Gallery
              </h2>
              <InteractiveGallery
                gallery={event.gallery}
                onOpenLightbox={openLightbox}
              />
            </motion.div>
          )}

          {/* ──── More Events ──── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="pt-4 pb-12"
          >
            <div className="h-px w-full mb-10" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)' }} />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #05B1DE, rgba(5, 177, 222, 0.3))' }} />
              More Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {eventsData
                .filter(e => e.id !== event.id)
                .slice(0, 3)
                .map((otherEvent, idx) => {
                  const otherColors = getCategoryColor(otherEvent.category);
                  return (
                    <motion.div
                      key={otherEvent.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      onClick={() => {
                        navigate(`/events/${otherEvent.slug}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <div className="flex items-center justify-center p-3" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #111118 100%)' }}>
                        <img
                          src={otherEvent.poster}
                          alt={otherEvent.title}
                          className="w-full h-auto max-h-[160px] rounded-lg transition-transform duration-500 group-hover:scale-105"
                          style={{ objectFit: 'contain' }}
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3">
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-1.5"
                          style={{ background: otherColors.bg, color: otherColors.text, border: `1px solid ${otherColors.border}` }}
                        >
                          {otherEvent.category}
                        </span>
                        <h3 className="text-sm font-bold text-white leading-snug">{otherEvent.title}</h3>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetail;
