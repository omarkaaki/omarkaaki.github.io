import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import CardGlow from '../components/CardGlow';
import {
  ShieldIcon,
  WrenchIcon,
  CodeIcon,
  CpuIcon,
  FingerprintIcon,
} from '../components/Icons';

const skillCategories = [
  {
    title: 'Security Operations',
    icon: ShieldIcon,
    iconClass: '',
    items: [
      'SOC workflows: alert triage, investigation, and escalation.',
      'Incident response fundamentals and reporting discipline.',
      'Digital forensics basics: artifacts, logs, and timeline analysis.',
      'Penetration testing foundations: recon, scan, assess, report.',
    ],
  },
  {
    title: 'Tools',
    icon: WrenchIcon,
    iconClass: 'purple',
    items: [
      'Splunk and ELK stack (Elasticsearch, Logstash, Kibana).',
      'Wireshark, Nmap, and Metasploit for security assessments.',
      'Linux and Kali Linux for everyday technical workflows.',
      'Git-based development and structured collaboration.',
    ],
  },
  {
    title: 'Programming',
    icon: CodeIcon,
    iconClass: 'blue',
    items: [
      'Python for automation, parsing, and data-handling tasks.',
      'Bash scripting for Linux operations and tooling.',
      'JavaScript for integrations and lightweight automation.',
      'Comfortable reading and extending unfamiliar codebases.',
    ],
  },
  {
    title: 'Engineering Strengths',
    icon: CpuIcon,
    iconClass: '',
    items: [
      'Structured thinking and clear technical communication.',
      'Reproducible workflows and clean implementation style.',
      'Root-cause oriented debugging and problem solving.',
      'Strong fundamentals in networking and systems.',
    ],
  },
];

export default function Skills() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <CardGlow className="highlight">
            <div className="kicker">
              <FingerprintIcon />
              Skills
            </div>
            <h1>
              <span className="glitch" data-text="Skills">Skills</span>
            </h1>
            <p className="lead">
              A concise overview of my cybersecurity and engineering toolkit.
            </p>
          </CardGlow>
        </div>
      </section>

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <ScrollReveal stagger>
              <div className="grid two">
                {skillCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <CardGlow key={cat.title}>
                      <div className={`card-icon ${cat.iconClass}`}>
                        <Icon />
                      </div>
                      <h3>{cat.title}</h3>
                      <ul className="list">
                        {cat.items.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    </CardGlow>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
