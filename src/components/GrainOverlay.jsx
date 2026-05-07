import React, { useEffect, useRef } from 'react';

/**
 * Animated film-grain overlay using a tiny canvas that re-renders noise on rAF.
 * Sits above everything at low opacity for a cinematic feel.
 */
export default function GrainOverlay({ opacity = 0.07, fps = 24 }) {
  const ref = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const size = 220;
    canvas.width = size;
    canvas.height = size;

    let raf = 0;
    let last = 0;
    const interval = 1000 / fps;

    const draw = (t) => {
      if (t - last >= interval) {
        last = t;
        const img = ctx.createImageData(size, size);
        const data = img.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = 255;
        }
        ctx.putImageData(img, 0, 0);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [fps]);

  return <canvas ref={ref} className="grain-overlay" style={{ opacity }} aria-hidden="true" />;
}
