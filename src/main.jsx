import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// Disable browser scroll restoration so reloads/back-nav always start at top.
// Lenis owns scrolling once it mounts; this avoids races where the browser
// restores a mid-page scroll before Lenis takes over.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
