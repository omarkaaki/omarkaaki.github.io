import React from 'react';
import { Link } from 'react-router-dom';
import InteractiveTerminal from '../components/InteractiveTerminal';
import TypingEffect from '../components/TypingEffect';
import ScrollReveal from '../components/ScrollReveal';
import CardGlow from '../components/CardGlow';
import {
  ShieldIcon,
  SearchIcon,
  LockIcon,
  RadarIcon,
  FingerprintIcon,
  ActivityIcon,
  DatabaseIcon,
} from '../components/Icons';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <CardGlow className="highlight">
              <div className="kicker">
                <FingerprintIcon />
                Cybersecurity Portfolio
              </div>
              <h1>
                <TypingEffect text="Building practical security solutions with engineering discipline." />
              </h1>
              <p className="lead">
                I am Omar Kaaki, a senior Computer &amp; Communications Engineering student at AUB focused on SOC operations,
                DFIR workflows, and secure systems design. I build projects that are clean, measurable, and production-minded.
              </p>
              <div className="btn-row">
                <Link className="btn primary" to="/projects">Explore Projects</Link>
                <Link className="btn secondary" to="/contact">Get in Touch</Link>
              </div>
            </CardGlow>
            <InteractiveTerminal />
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <h2 className="section-title">
              <RadarIcon />
              What I focus on
            </h2>
            <p className="section-lead">Hands-on cybersecurity work supported by solid systems engineering fundamentals.</p>
            <ScrollReveal stagger>
              <div className="grid three">
                <CardGlow>
                  <div className="card-icon">
                    <ShieldIcon />
                  </div>
                  <h3>Security Operations</h3>
                  <p>Alert triage, investigation, and incident response workflows using SIEM and monitoring pipelines.</p>
                </CardGlow>
                <CardGlow>
                  <div className="card-icon purple">
                    <SearchIcon />
                  </div>
                  <h3>Penetration Testing</h3>
                  <p>Structured recon and vulnerability assessment with repeatable methods and clear reporting.</p>
                </CardGlow>
                <CardGlow>
                  <div className="card-icon blue">
                    <LockIcon />
                  </div>
                  <h3>Secure Systems</h3>
                  <p>Designing systems with reliability, observability, and security built into the implementation.</p>
                </CardGlow>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <h2 className="section-title">
              <ActivityIcon />
              Featured projects
            </h2>
            <ScrollReveal stagger>
              <div className="grid two">
                <CardGlow>
                  <div className="card-icon">
                    <DatabaseIcon />
                  </div>
                  <h3>Gmail Security Monitor &amp; Automated Threat Response</h3>
                  <p>A workflow for detecting suspicious email activity and triggering rapid triage actions.</p>
                  <div className="tag-row">
                    <span className="tag">Gmail API</span>
                    <span className="tag">JavaScript</span>
                    <span className="tag">Automation</span>
                  </div>
                  <div className="status-badge">Completed</div>
                </CardGlow>
                <CardGlow>
                  <div className="card-icon blue">
                    <ActivityIcon />
                  </div>
                  <h3>Threat Detection Pipeline</h3>
                  <p>A scalable log-ingestion and analysis concept integrating ELK and messaging infrastructure.</p>
                  <div className="tag-row">
                    <span className="tag">ELK</span>
                    <span className="tag">Kafka</span>
                    <span className="tag">Security Infrastructure</span>
                  </div>
                  <div className="status-badge progress">In Progress</div>
                </CardGlow>
              </div>
            </ScrollReveal>
            <div className="btn-row">
              <Link className="btn secondary" to="/projects">View all projects →</Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
