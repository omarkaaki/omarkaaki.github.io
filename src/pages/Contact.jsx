import React, { Suspense, lazy } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import {
  MailIcon,
  LinkedInIcon,
  MapPinIcon,
  FingerprintIcon,
} from '../components/Icons';

const HeroWidget = lazy(() => import('../components/HeroWidget'));

export default function Contact() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid hero-grid-widget">
            <TiltCard className="highlight" intensity={4}>
              <div className="kicker">
                <FingerprintIcon />
                Contact
              </div>
              <h1>
                <span className="glitch" data-text="Contact">Contact</span>
              </h1>
              <p className="lead">
                Open to entry-level cybersecurity roles, internships, security engineering opportunities,
                and research collaborations.
              </p>
            </TiltCard>
            <div className="hero-widget-stage">
              <Suspense fallback={null}>
                <HeroWidget variant="handshake" />
              </Suspense>
              <div className="widget-overlay">
                <span className="widget-label">/handshake/tls1.3 · authenticated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <ScrollReveal stagger>
              <div className="grid three">
                <TiltCard>
                  <div className="card-icon">
                    <MailIcon />
                  </div>
                  <h3>Email</h3>
                  <p>Best channel for opportunities and project discussions.</p>
                  <div className="btn-row">
                    <a className="btn primary" href="mailto:omarkaaki2004@gmail.com">Send Email</a>
                  </div>
                  <div className="meta">omarkaaki2004@gmail.com</div>
                </TiltCard>

                <TiltCard>
                  <div className="card-icon purple">
                    <LinkedInIcon />
                  </div>
                  <h3>LinkedIn</h3>
                  <p>Professional profile and updates.</p>
                  <div className="btn-row">
                    <a
                      className="btn secondary"
                      href="https://www.linkedin.com/in/omar-kaaki-393880312/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open LinkedIn
                    </a>
                  </div>
                  <div className="meta">linkedin.com/in/omar-kaaki-393880312</div>
                </TiltCard>

                <TiltCard>
                  <div className="card-icon blue">
                    <MapPinIcon />
                  </div>
                  <h3>Location</h3>
                  <p>Beirut, Lebanon.</p>
                  <div className="meta">Timezone: Asia/Beirut · UTC+2</div>
                </TiltCard>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
