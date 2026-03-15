import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-row">
          <div>
            <p>&copy; 2026 Omar Kaaki.</p>
            <p className="footer-brand">
              <ShieldIcon style={{ width: 12, height: 12, display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
              DFIR &middot; SOC &middot; Pentesting
            </p>
          </div>
          <p>
            <Link to="/projects">Projects</Link> &middot;{' '}
            <Link to="/skills">Skills</Link> &middot;{' '}
            <Link to="/contact">Contact</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
