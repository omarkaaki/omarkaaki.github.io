import React, { useEffect, useRef, useState } from 'react';

const GLYPHS = '!<>-_\\/[]{}=+*^?#01ΞΨΔΦΩ░▒▓█';

/**
 * Scramble text effect — characters cycle through random glyphs
 * before resolving to the target text, one column at a time.
 * Used on the hero title for that "decrypt" feel.
 */
export default function ScrambleText({
  text,
  duration = 1500,
  delay = 200,
  className = '',
  stay = true,
  onComplete,
}) {
  const [displayed, setDisplayed] = useState(stay ? '' : text);
  const rafRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplayed(text);
      onComplete?.();
      return;
    }

    let cancelled = false;
    const start = performance.now() + delay;

    // Per-char "reveal time" — spread reveals across duration
    const reveals = Array.from({ length: text.length }, (_, i) =>
      (i / text.length) * duration * 0.7 + Math.random() * (duration * 0.3)
    );

    const tick = (now) => {
      if (cancelled) return;
      const elapsed = now - start;
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      let allDone = true;
      const out = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ' || ch === '\n') return ch;
          if (elapsed > reveals[i]) return ch;
          allDone = false;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');
      setDisplayed(out);
      if (allDone) {
        onComplete?.();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, duration, delay, onComplete]);

  return <span className={`scramble ${className}`}>{displayed || ' '}</span>;
}
