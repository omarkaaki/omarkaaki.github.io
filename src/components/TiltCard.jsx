import React, { useRef, useCallback } from 'react';

/**
 * TiltCard: A card with subtle 3D perspective tilt that follows the cursor,
 * plus a soft glow that tracks the mouse position. Drop-in replacement for
 * the older CardGlow.
 */
export default function TiltCard({ children, className = '', intensity = 8, ...props }) {
  const ref = useRef(null);
  const rafRef = useRef(0);

  const handleMouse = useCallback(
    (e) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) {
          rafRef.current = 0;
          return;
        }
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -intensity;
        const rotY = ((x - cx) / cx) * intensity;
        el.style.setProperty('--mouse-x', x + 'px');
        el.style.setProperty('--mouse-y', y + 'px');
        el.style.setProperty('--tilt-x', rotX.toFixed(2) + 'deg');
        el.style.setProperty('--tilt-y', rotY.toFixed(2) + 'deg');
        rafRef.current = 0;
      });
    },
    [intensity]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  }, []);

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      {...props}
    >
      <div className="tilt-card-inner">{children}</div>
    </div>
  );
}
