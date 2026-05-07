import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveTerminal from '../components/InteractiveTerminal';
import ScrambleText from '../components/ScrambleText';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';
import {
  ShieldIcon,
  SearchIcon,
  LockIcon,
  RadarIcon,
  FingerprintIcon,
  ActivityIcon,
  DatabaseIcon,
  SkullIcon,
} from '../components/Icons';

const Scene3D = lazy(() => import('../components/Scene3D'));

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      <section className="hero-cinema" aria-label="Intro">
        <div className="hero-cinema-grid container">
          <motion.div
            className="hero-kicker"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.05}
          >
            <span className="hero-kicker-dot" />
            <FingerprintIcon />
            CYBERSECURITY · DFIR · 2026
          </motion.div>

          <h1 className="hero-display" aria-label="Omar Kaaki">
            <span className="hero-display-line">
              <ScrambleText text="OMAR" delay={150} duration={1100} />
            </span>
            <span className="hero-display-line hero-display-line--shift">
              <ScrambleText text="KAAKI" delay={520} duration={1300} />
            </span>
          </h1>

          <motion.p
            className="hero-tagline"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1.0}
          >
            Building security systems that hold up under scrutiny —
            <span className="text-accent"> detection engineering, incident response, and forensic-grade systems</span>{' '}
            for the moments where evidence matters.
          </motion.p>

          <motion.div
            className="hero-cta-row"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1.2}
          >
            <MagneticButton>
              <Link className="btn primary" to="/projects" data-cursor>
                <span>Explore Projects</span>
                <span className="btn-arrow" aria-hidden>→</span>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link className="btn secondary" to="/contact" data-cursor>
                <span>Get in Touch</span>
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.div
            className="hero-meta-row"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1.4}
          >
            <div className="hero-meta">
              <span className="meta-num">03+</span>
              <span className="meta-label">Cybersecurity internships</span>
            </div>
            <div className="hero-meta">
              <span className="meta-num">10+</span>
              <span className="meta-label">Projects shipped</span>
            </div>
            <div className="hero-meta">
              <span className="meta-num">2026</span>
              <span className="meta-label">Graduating class</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            aria-hidden
          >
            <span>SCROLL</span>
            <span className="scroll-line" />
          </motion.div>
        </div>
      </section>

      <ScrollReveal>
        <section className="section section-cinema">
          <div className="container">
            <header className="section-head">
              <span className="section-num">01</span>
              <h2 className="section-display">
                <RadarIcon /> What I focus on.
              </h2>
              <p className="section-lead">
                Hands-on cybersecurity work supported by solid systems engineering fundamentals.
              </p>
            </header>
            <ScrollReveal stagger>
              <div className="grid three">
                <TiltCard intensity={10}>
                  <div className="card-icon">
                    <ShieldIcon />
                  </div>
                  <h3>Security Operations</h3>
                  <p>Alert triage, investigation, and incident response workflows using SIEM and monitoring pipelines.</p>
                  <div className="tag-row">
                    <span className="tag">Splunk</span>
                    <span className="tag">Wazuh</span>
                    <span className="tag">ELK</span>
                  </div>
                </TiltCard>
                <TiltCard intensity={10}>
                  <div className="card-icon purple">
                    <SearchIcon />
                  </div>
                  <h3>DFIR &amp; Forensics</h3>
                  <p>Evidence acquisition, timeline reconstruction, and Windows/Linux forensic analysis with industry tooling.</p>
                  <div className="tag-row">
                    <span className="tag">KAPE</span>
                    <span className="tag">Volatility</span>
                    <span className="tag">Sleuth Kit</span>
                  </div>
                </TiltCard>
                <TiltCard intensity={10}>
                  <div className="card-icon blue">
                    <LockIcon />
                  </div>
                  <h3>Secure Systems</h3>
                  <p>Designing systems with hardened gateways, mTLS, and tamper-evident storage built into the architecture.</p>
                  <div className="tag-row">
                    <span className="tag">mTLS</span>
                    <span className="tag">Hyperledger</span>
                    <span className="tag">IPFS</span>
                  </div>
                </TiltCard>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section section-cinema">
          <div className="container">
            <header className="section-head">
              <span className="section-num">02</span>
              <h2 className="section-display">
                <ActivityIcon /> Live workspace.
              </h2>
              <p className="section-lead">
                Try a few commands — type <code>help</code> to see the kit.
              </p>
            </header>
            <InteractiveTerminal />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section section-cinema">
          <div className="container">
            <header className="section-head">
              <span className="section-num">03</span>
              <h2 className="section-display">
                <ActivityIcon /> Other featured projects.
              </h2>
            </header>
            <ScrollReveal stagger>
              <div className="grid two">
                <TiltCard intensity={10}>
                  <div className="card-icon purple">
                    <SkullIcon />
                  </div>
                  <h3>Network Pentest Framework</h3>
                  <p>Structured workflow to automate reconnaissance, scanning, and exploitation guidance with clean reporting.</p>
                  <div className="tag-row">
                    <span className="tag">Kali</span>
                    <span className="tag">Nmap</span>
                    <span className="tag">Metasploit</span>
                  </div>
                  <div className="status-badge featured">Featured</div>
                </TiltCard>
                <TiltCard intensity={10}>
                  <div className="card-icon">
                    <DatabaseIcon />
                  </div>
                  <h3>Wazuh SIEM Lab</h3>
                  <p>End-to-end SIEM deployment with custom detection rules across Windows Server, Kali, and Ubuntu agents.</p>
                  <div className="tag-row">
                    <span className="tag">Wazuh</span>
                    <span className="tag">Sysmon</span>
                    <span className="tag">Custom Rules</span>
                  </div>
                  <div className="status-badge">Completed</div>
                </TiltCard>
              </div>
            </ScrollReveal>
            <div className="btn-row">
              <MagneticButton>
                <Link className="btn secondary" to="/projects" data-cursor>
                  <span>View all projects</span>
                  <span className="btn-arrow" aria-hidden>→</span>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
