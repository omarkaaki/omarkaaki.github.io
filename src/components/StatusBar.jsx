import React, { useEffect, useState } from 'react';

/**
 * Top-of-page status overlay: live timestamp, scroll progress,
 * and a "secure channel" indicator. Cyber-ops feel.
 */
export default function StatusBar() {
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="status-bar" aria-hidden="true">
      <div className="status-bar-progress" style={{ width: `${progress * 100}%` }} />
      <div className="status-bar-row">
        <span className="status-cell">
          <span className="status-dot" />
          SECURE CHANNEL · ACTIVE
        </span>
        <span className="status-cell">UTC {time}</span>
        <span className="status-cell">SCROLL {(progress * 100).toFixed(0).padStart(2, '0')}%</span>
      </div>
    </div>
  );
}

function formatTime(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
}
