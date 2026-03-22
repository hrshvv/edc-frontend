'use client';

import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  triggerOnHover?: boolean;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+{}|:"<>?';

export const ScrambleText = ({
  text,
  className,
  scrambleSpeed = 40,
  triggerOnHover = true,
}: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (char === ' ') return ' ';
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [text, scrambleSpeed]);

  useEffect(() => {
    if (!triggerOnHover) {
      scramble();
    }
  }, [scramble, triggerOnHover]);

  return (
    <div
      className={cn('font-mono tracking-tighter cursor-default', className)}
      onMouseEnter={() => {
        scramble();
      }}
      onMouseLeave={() => {}}
    >
      {displayText}
    </div>
  );
};
