import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import {
  SERIES_NAME,
  SERIES_TITLE,
  blogPosts,
  getReadingMinutes,
} from '../data/blogData';

const Blog = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Blog | EDC JSSUN';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const posts = [...blogPosts].sort((a, b) => a.part - b.part);

  return (
    <div className="min-h-screen bg-black">
      {/* Top spacer for fixed navbar */}
      <div className="pt-24 sm:pt-28" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* ────────── Header ────────── */}
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-14 text-center"
          >
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#05B1DE] mb-4">
              {SERIES_NAME}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
              {SERIES_TITLE}
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Weekly articles from EDC JSSUN on taking a student idea from a
              campus problem to a first venture.
            </p>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto mt-3">
              The campus textbook exchange used throughout the series is a
              hypothetical example.
            </p>
          </motion.header>

          {/* ────────── Post list ────────── */}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-14 sm:pb-20">
            {posts.map((post, idx) => (
              <motion.li
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col w-full p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span
                    className="self-start px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-4"
                    style={{
                      background: 'rgba(5, 177, 222, 0.12)',
                      color: '#05B1DE',
                      border: '1px solid rgba(5, 177, 222, 0.3)',
                    }}
                  >
                    Part {post.part} of {post.totalParts}
                  </span>
                  <h2 className="text-xl font-bold text-white leading-snug mb-3 group-hover:text-[#05B1DE] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 mb-5">
                    {post.intro[0]}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-gray-500">
                    <span>
                      Weekly edition:{' '}
                      <time dateTime={post.editionDate}>
                        {post.editionLabel}
                      </time>
                    </span>
                    <span>{getReadingMinutes(post)} min read</span>
                  </div>
                  <span className="mt-4 text-sm font-semibold text-[#05B1DE] inline-flex items-center gap-1.5">
                    Read article
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
