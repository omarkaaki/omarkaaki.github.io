import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveTerminal from '../components/InteractiveTerminal';
import TypingEffect from '../components/TypingEffect';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
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

// Code-split the heavy 3D scene so the page boots fast
const Scene3D = lazy(() => import('../components/Scene3D'));

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

export default function Home() {
  return (
    <>
      <section className="hero hero-3d">
        <div className="container">
          <div className="hero-grid hero-grid-3d">
            <motion.div
              initial="hidden"
              animate="show"
              variants={heroVariants}
            >
              <TiltCard className="highlight" intensity={4}>
                <div className="kicker">
                  <FingerprintIcon />
                  Cybersecurity Portfolio · 2026
                </div>
                <h1 className="hero-title">
                  <TypingEffect
                    text="Building security systems that hold up under scrutiny."
                    speed={45}
                  />
                </h1>
                <p className="lead">
                  I am Omar Kaaki, a senior Computer &amp; Communications Engineering student at AUB
                  focused on DFIR, SOC operations, and forensic-grade systems design — comfortable
                  moving between detection engineering, incident investigation, and the systems thinking
                  behind both.
                </p>
                <div className="btn-row">
                  <Link className="btn primary" to="/projects">Explore Projects</Link>
                  <Link className="btn secondary" to="/contact">Get in Touch</Link>
                </div>

                <div className="hero-stats">
                  <div className="hero-stat">
                    <strong>3+</strong>
                    <span>Cybersecurity internships</span>
                  </div>
                  <div className="hero-stat">
                    <strong>10+</strong>
                    <span>Cybersecurity projects shipped</span>
                  </div>
                  <div className="hero-stat">
                    <strong>2026</strong>
                    <span>Graduating class</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            <motion.div
              className="scene-stage"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <Suspense fallback={<div className="scene-loading">Initializing kernel…</div>}>
                <Scene3D />
              </Suspense>
              <div className="scene-overlay">
                <div className="scene-label">
                  <span className="dot" />
                  /core/security/runtime · stable
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="terminal-row"
          >
            <InteractiveTerminal />
          </motion.div>
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
                <TiltCard>
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
                <TiltCard>
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
                <TiltCard>
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
        <section className="section">
          <div className="container">
            <h2 className="section-title">
              <ActivityIcon />
              Other featured projects
            </h2>
            <ScrollReveal stagger>
              <div className="grid two">
                <TiltCard>
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
                <TiltCard>
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
              <Link className="btn secondary" to="/projects">View all projects →</Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
