import React, { useRef, useEffect } from 'react';

/**
 * Wraps any element so it gently magnetizes toward the cursor when nearby.
 * Used on hero CTAs.
 */
export default function MagneticButton({ children, strength = 0.35, radius = 120, className = '', ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let target = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        const f = (1 - dist / radius) * strength;
        target = { x: dx * f, y: dy * f };
      } else {
        target = { x: 0, y: 0 };
      }
    };

    const onLeave = () => {
      target = { x: 0, y: 0 };
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      el.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [strength, radius]);

  return (
    <span ref={ref} className={`magnetic ${className}`} {...props}>
      {children}
    </span>
  );
}
