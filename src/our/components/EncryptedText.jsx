import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>?/\\|{}[]~^';

const EncryptedText = ({ text = '', className = '' }) => {
  const [displayChars, setDisplayChars] = useState([]);
  const [scanPosition, setScanPosition] = useState(0);
  const frameRef = useRef(null);
  const timeRef = useRef(0);

  const chars = text.split('');

  // Scramble characters continuously
  useEffect(() => {
    let animationId;
    const animate = (timestamp) => {
      if (timestamp - timeRef.current > 80) {
        timeRef.current = timestamp;
        setDisplayChars(
          chars.map((char) => {
            if (char === ' ') return ' ';
            // Always show a random character — never the real one
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
        );
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [text]);

  // Scan line animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanPosition((prev) => (prev + 1) % (chars.length + 6));
    }, 120);
    return () => clearInterval(interval);
  }, [chars.length]);

  return (
    <div className="select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
      {/* Container with cyber border */}
      <div className="relative inline-block max-w-full">
        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-cyan-400/60" />
        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-cyan-400/60" />
        <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-cyan-400/60" />
        <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-cyan-400/60" />

        {/* Top label */}
        <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.4em] text-cyan-500/50 font-mono uppercase whitespace-nowrap">
          ◆ classified ◆
        </div>

        {/* Character cells */}
        <div className="flex flex-wrap justify-center gap-[2px] sm:gap-[3px] md:gap-1 px-1 sm:px-4 py-2 sm:py-3">
          {chars.map((char, i) => {
            const isScanHit = i >= scanPosition - 1 && i <= scanPosition + 1;
            const isSpace = char === ' ';

            if (isSpace) {
              return (
                <div key={i} className="w-2 sm:w-3 md:w-5" />
              );
            }

            return (
              <div
                key={i}
                className={cn(
                  'relative flex items-center justify-center',
                  'w-7 h-9 sm:w-8 sm:h-10 md:w-10 md:h-13 lg:w-12 lg:h-16',
                  'rounded-sm transition-all duration-150',
                  isScanHit
                    ? 'bg-cyan-400/20 shadow-[0_0_15px_rgba(5,177,222,0.4)]'
                    : 'bg-white/[0.03]',
                  'border',
                  isScanHit
                    ? 'border-cyan-400/50'
                    : 'border-white/[0.06]'
                )}
              >
                {/* Random character */}
                <span
                  className={cn(
                    'font-mono font-bold text-base sm:text-lg md:text-2xl lg:text-3xl transition-all duration-100',
                    isScanHit
                      ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(5,177,222,0.8)]'
                      : 'text-cyan-500/40'
                  )}
                >
                  {displayChars[i] || CHARS[0]}
                </span>

                {/* Subtle top highlight on scan */}
                {isScanHit && (
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-2 sm:px-4 mt-1 sm:mt-2">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[8px] sm:text-[10px] font-mono text-cyan-500/60 tracking-wider">
              DECRYPTING
            </span>
          </div>
          <div className="text-[8px] sm:text-[10px] font-mono text-cyan-500/40 tracking-wider">
            {Math.floor(Math.random() * 30 + 10)}% COMPLETE
          </div>
        </div>

        {/* Scan line glow effect */}
        <div
          className="absolute top-0 bottom-0 w-8 pointer-events-none transition-all duration-100"
          style={{
            left: `${(scanPosition / (chars.length + 6)) * 100}%`,
            background: 'linear-gradient(90deg, transparent, rgba(5,177,222,0.08), transparent)',
          }}
        />
      </div>
    </div>
  );
};

export { EncryptedText };
