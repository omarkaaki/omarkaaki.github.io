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

    // Force to top once Lenis owns scrolling so a cached browser scroll
    // position doesn't leave us mid-page on first paint.
    lenis.scrollTo(0, { immediate: true, force: true });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
