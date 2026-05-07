import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// Disable browser scroll restoration so reloads / back-forward / bfcache
// always start at the top of the page. The inline script in index.html
// already does this before any bundle loads; we re-apply here defensively
// in case the page was opened from a hot-module reload context.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Hard-pin scroll to 0 for the first 1500ms after first paint. This absorbs
// late layout shifts (font swap, lazy-loaded chunks, fixed/sticky headers
// settling) that can otherwise leave the user mid-page on initial entry.
// User-initiated scrolling is allowed: we only pin while window.scrollY > 0
// AND the user hasn't actively interacted yet.
let userScrolled = false;
const onUserScroll = () => { userScrolled = true; };
window.addEventListener('wheel',     onUserScroll, { passive: true, once: true });
window.addEventListener('touchstart', onUserScroll, { passive: true, once: true });
window.addEventListener('keydown',    onUserScroll, { passive: true, once: true });

const pinUntil = performance.now() + 1500;
function pinTop(t) {
  if (userScrolled || t > pinUntil) return;
  if (window.scrollY !== 0) {
    window.scrollTo(0, 0);
  }
  requestAnimationFrame(pinTop);
}
window.scrollTo(0, 0);
requestAnimationFrame(pinTop);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
