import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-row">
          <div>
            <p>&copy; {new Date().getFullYear()} Omar Kaaki.</p>
            <p className="footer-brand">
              <ShieldIcon
                style={{
                  width: 12,
                  height: 12,
                  display: 'inline',
                  verticalAlign: 'middle',
                  marginRight: 4,
                }}
              />
              DFIR · SOC · Secure Systems · Built with React + Three.js
            </p>
          </div>
          <p>
            <Link to="/projects">Projects</Link> ·{' '}
            <Link to="/skills">Skills</Link> ·{' '}
            <Link to="/contact">Contact</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
