import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import {
  formatLongDate,
  getAdjacentPosts,
  getPostBySlug,
  getReadingMinutes,
} from '../data/blogData';

const ArrowLeft = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ArrowRight = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  // Give each post its own browser-tab title, then restore the site title.
  useEffect(() => {
    if (!post) return undefined;
    const previousTitle = document.title;
    document.title = `${post.title} | EDC JSSUN`;
    return () => {
      document.title = previousTitle;
    };
  }, [post]);

  // 404
  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400 mb-8">Blog post not found</p>
          <Link
            to="/blog"
            className="inline-block px-6 py-3 rounded-xl text-white font-medium"
            style={{
              background: 'linear-gradient(135deg, #05B1DE 0%, #0490b5 100%)',
              boxShadow: '0 4px 20px -4px rgba(5, 177, 222, 0.4)',
            }}
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const { prev, next } = getAdjacentPosts(post.slug);
  const minutes = getReadingMinutes(post);
  const lastIndex = post.sections.length - 1;

  return (
    <div className="min-h-screen bg-black">
      {/* Top spacer for fixed navbar */}
      <div className="pt-24 sm:pt-28" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              <ArrowLeft />
              <span className="text-sm font-medium">All Posts</span>
            </Link>
          </motion.div>

          <article>
            {/* ────────── Header ────────── */}
            <motion.header
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10 sm:mb-12"
            >
              <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#05B1DE] mb-4">
                {post.eyebrow}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
                {post.title}
              </h1>
              <div className="space-y-1.5 text-sm text-gray-400">
                <p>
                  By {post.author} | Weekly edition:{' '}
                  <time dateTime={post.editionDate}>{post.editionLabel}</time>
                </p>
                <p className="text-gray-500">
                  Published on website:{' '}
                  <time dateTime={post.publishedOn}>
                    {formatLongDate(post.publishedOn)}
                  </time>
                  {' · '}
                  {minutes} min read
                </p>
              </div>
              <div
                className="h-px w-full mt-8"
                style={{
                  background:
                    'linear-gradient(to right, rgba(5,177,222,0.5), rgba(255,255,255,0.08), transparent)',
                }}
              />
            </motion.header>

            {/* ────────── Intro ────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12 space-y-5"
            >
              {post.intro.map((text, i) => (
                <p
                  key={i}
                  className="text-gray-200 text-lg sm:text-xl leading-relaxed"
                >
                  {text}
                </p>
              ))}
            </motion.div>

            {/* ────────── Sections ────────── */}
            {post.sections.map((section, idx) => {
              const isChallenge = idx === lastIndex;
              return (
                <motion.section
                  key={section.heading}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-12"
                  aria-labelledby={`section-${idx}`}
                >
                  <h2
                    id={`section-${idx}`}
                    className="text-2xl sm:text-3xl font-bold text-white mb-5 flex items-center gap-3"
                  >
                    <span
                      className="w-1 h-8 rounded-full flex-shrink-0"
                      style={{
                        background: isChallenge
                          ? 'linear-gradient(to bottom, #EAB308, rgba(234, 179, 8, 0.3))'
                          : 'linear-gradient(to bottom, #05B1DE, rgba(5, 177, 222, 0.3))',
                      }}
                    />
                    {section.heading}
                  </h2>

                  {isChallenge ? (
                    <div
                      className="p-5 sm:p-7 rounded-2xl space-y-4"
                      style={{
                        background:
                          'linear-gradient(145deg, rgba(234, 179, 8, 0.08) 0%, rgba(234, 179, 8, 0.02) 100%)',
                        border: '1px solid rgba(234, 179, 8, 0.2)',
                      }}
                    >
                      {section.paragraphs.map((text, i) => (
                        <p
                          key={i}
                          className="text-gray-200 text-base sm:text-lg leading-relaxed"
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {section.paragraphs.map((text, i) => (
                        <p
                          key={i}
                          className="text-gray-300 text-base sm:text-lg leading-relaxed"
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                  )}
                </motion.section>
              );
            })}

            {/* ────────── Closing note (optional) ────────── */}
            {post.closing && post.closing.length > 0 && (
              <div className="mb-12 space-y-5">
                {post.closing.map((text, i) => (
                  <p
                    key={i}
                    className="text-gray-300 text-base sm:text-lg leading-relaxed"
                  >
                    {text}
                  </p>
                ))}
              </div>
            )}
          </article>

          {/* ────────── Previous / Next ────────── */}
          <nav aria-label="Series navigation" className="pt-4 pb-14 sm:pb-16">
            <div
              className="h-px w-full mb-8"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
              }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <Link
                  to={`/blog/${prev.slug}`}
                  rel="prev"
                  className="group p-4 sm:p-5 rounded-xl transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    <ArrowLeft /> Previous
                  </span>
                  <span className="block text-sm sm:text-base font-bold text-white leading-snug group-hover:text-[#05B1DE] transition-colors">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
              {next && (
                <Link
                  to={`/blog/${next.slug}`}
                  rel="next"
                  className="group p-4 sm:p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 sm:text-right"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span className="flex items-center sm:justify-end gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    Next <ArrowRight />
                  </span>
                  <span className="block text-sm sm:text-base font-bold text-white leading-snug group-hover:text-[#05B1DE] transition-colors">
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
