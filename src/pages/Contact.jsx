import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import CardGlow from '../components/CardGlow';
import {
  MailIcon,
  LinkedInIcon,
  MapPinIcon,
  FingerprintIcon,
} from '../components/Icons';

export default function Contact() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <CardGlow className="highlight">
            <div className="kicker">
              <FingerprintIcon />
              Contact
            </div>
            <h1>
              <span className="glitch" data-text="Contact">Contact</span>
            </h1>
            <p className="lead">Open to internships, security engineering opportunities, and research collaborations.</p>
          </CardGlow>
        </div>
      </section>

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <ScrollReveal stagger>
              <div className="grid three">
                <CardGlow>
                  <div className="card-icon">
                    <MailIcon />
                  </div>
                  <h3>Email</h3>
                  <p>Best channel for opportunities and project discussions.</p>
                  <div className="btn-row">
                    <a className="btn primary" href="mailto:omarkaaki2004@gmail.com">Send Email</a>
                  </div>
                  <div className="meta">omarkaaki2004@gmail.com</div>
                </CardGlow>

                <CardGlow>
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
                </CardGlow>

                <CardGlow>
                  <div className="card-icon blue">
                    <MapPinIcon />
                  </div>
                  <h3>Location</h3>
                  <p>Beirut, Lebanon. Available for remote opportunities.</p>
                  <div className="meta">Timezone: Asia/Beirut</div>
                </CardGlow>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
