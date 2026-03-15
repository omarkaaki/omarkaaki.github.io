import React, { useState, useEffect, useRef } from 'react';

export default function TypingEffect({ text, speed = 50, delay = 400, className = '' }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const idx = useRef(0);

  useEffect(() => {
    idx.current = 0;
    setDisplayed('');
    setShowCursor(true);

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (idx.current < text.length) {
          setDisplayed(text.slice(0, idx.current + 1));
          idx.current++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && <span className="typing-cursor" />}
    </span>
  );
}
