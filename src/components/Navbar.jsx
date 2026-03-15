import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldIcon } from './Icons';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="hud-corner hud-corner--tl" />
      <div className="hud-corner hud-corner--tr" />
      <div className="hud-corner hud-corner--bl" />
      <div className="hud-corner hud-corner--br" />
      <nav className="navbar" ref={navRef}>
        <div className="nav-container container">
          <Link className="brand" to="/">
            <span className="brand-dot" />
            Omar Kaaki
          </Link>
          <ul className={`nav-menu ${open ? 'open' : ''}`}>
            {links.map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <Link
                  to={to}
                  className={`nav-link ${pathname === to ? 'active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            className="hamburger"
            aria-label="Open menu"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((p) => !p);
            }}
          >
            <span className="bar" />
          </button>
        </div>
      </nav>
    </>
  );
}
