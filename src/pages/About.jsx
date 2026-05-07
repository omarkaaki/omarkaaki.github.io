import React, { Suspense, lazy } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import {
  ShieldIcon,
  GraduationIcon,
  BriefcaseIcon,
  FingerprintIcon,
  EyeIcon,
} from '../components/Icons';

const HeroWidget = lazy(() => import('../components/HeroWidget'));

export default function About() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid hero-grid-widget">
            <TiltCard className="highlight" intensity={4}>
              <div className="kicker">
                <FingerprintIcon />
                About
              </div>
              <h1>
                <span className="glitch" data-text="About me">About me</span>
              </h1>
              <p className="lead">
                I am a senior Computer &amp; Communications Engineering student at the American University of Beirut,
                focused on cybersecurity operations, incident response, and forensic-grade systems design.
              </p>
            </TiltCard>
            <div className="hero-widget-stage">
              <Suspense fallback={null}>
                <HeroWidget variant="biometric" />
              </Suspense>
              <div className="widget-overlay">
                <span className="widget-label">/biometric/scan · live</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <ScrollReveal stagger>
              <div className="grid two">
                <TiltCard>
                  <div className="card-icon">
                    <EyeIcon />
                  </div>
                  <h3>Professional summary</h3>
                  <p>
                    My work combines security operations thinking with practical engineering execution.
                    I enjoy building detection workflows, investigating real security signals, and designing
                    systems where forensic integrity is built into the architecture rather than bolted on.
                  </p>
                  <div className="tag-row" aria-label="Core areas">
                    <span className="tag">SOC</span>
                    <span className="tag">DFIR</span>
                    <span className="tag">Pentesting</span>
                    <span className="tag">Secure Systems</span>
                  </div>
                </TiltCard>

                <TiltCard>
                  <div className="card-icon purple">
                    <ShieldIcon />
                  </div>
                  <h3>What I bring</h3>
                  <ul className="list">
                    <li>Practical exposure to monitoring, investigation, and escalation workflows.</li>
                    <li>Capstone-level experience designing tamper-evident chain-of-custody systems.</li>
                    <li>Clean implementation habits with repeatable setups and clear documentation.</li>
                    <li>Strong learning velocity and confidence in unfamiliar technical environments.</li>
                  </ul>
                  <div className="meta">// Based in Beirut, Lebanon</div>
                </TiltCard>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <h2 className="section-title">
              <GraduationIcon />
              Education
            </h2>
            <TiltCard>
              <h3>BE, Computer &amp; Communications Engineering</h3>
              <p>American University of Beirut</p>
              <div className="meta">2022 – 2026 · Focus: Cybersecurity and Networking</div>
              <div className="meta">
                Capstone in blockchain-based forensic chain-of-custody systems · Advisor: Dr. Hussein Bakri
              </div>
            </TiltCard>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <h2 className="section-title">
              <BriefcaseIcon />
              Experience
            </h2>
            <TiltCard>
              <div className="timeline-item">
                <h4>SOC Analyst Intern — CNS</h4>
                <p>Threat detection, SIEM investigation workflows, and incident response support.</p>
                <div className="meta">Jun 2025 – Present</div>
              </div>
              <div className="timeline-item">
                <h4>Penetration Tester Intern — Procomix</h4>
                <p>Vulnerability assessments and practical penetration testing with structured reporting.</p>
                <div className="meta">Jun 2025</div>
              </div>
              <div className="timeline-item">
                <h4>Security Engineer Intern — Atria Solutions</h4>
                <p>Security engineering support, Linux tooling, and operational readiness improvements.</p>
                <div className="meta">2024 – 2025</div>
              </div>
            </TiltCard>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
