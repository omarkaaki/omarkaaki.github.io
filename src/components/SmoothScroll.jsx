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

    // Force the document to the top BEFORE Lenis instantiates, so Lenis
    // reads scrollY=0 and uses 0 as its initial targetScroll.
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

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

    // Re-pin to 0 at multiple delays to absorb font / lazy-module layout shifts.
    const settle = () => lenis.scrollTo(0, { immediate: true, force: true });
    requestAnimationFrame(settle);
    const t1 = setTimeout(settle, 80);
    const t2 = setTimeout(settle, 250);
    const t3 = setTimeout(settle, 600);
    const t4 = setTimeout(settle, 1200);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
