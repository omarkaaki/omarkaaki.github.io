import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Mounts a Lenis smooth-scroll instance for the whole page.
 * Skipped automatically when the user prefers reduced motion.
 * Exposes the instance on window.__lenis so route changes can force scroll-to-top.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Defer scroll-to-top to next frame so the rAF loop is running when
    // Lenis applies it. Then re-fire once more after a short delay in case
    // any layout shift (font loads, lazy modules) nudges the page.
    const settle = () => lenis.scrollTo(0, { immediate: true, force: true });
    requestAnimationFrame(settle);
    const t1 = setTimeout(settle, 80);
    const t2 = setTimeout(settle, 250);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
