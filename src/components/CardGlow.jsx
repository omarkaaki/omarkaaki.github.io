import React, { useEffect, useRef, useCallback } from 'react';

export default function CardGlow({ children, className = '', ...props }) {
  const ref = useRef(null);
  const rafRef = useRef(0);

  const handleMouse = useCallback((e) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const rect = ref.current.getBoundingClientRect();
      ref.current.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
      ref.current.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
      rafRef.current = 0;
    });
  }, []);

  return (
    <div ref={ref} className={`card ${className}`} onMouseMove={handleMouse} {...props}>
      {children}
    </div>
  );
}
