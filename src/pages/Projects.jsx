import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import CardGlow from '../components/CardGlow';
import {
  ShieldIcon,
  SearchIcon,
  DatabaseIcon,
  LockIcon,
  NetworkIcon,
  FingerprintIcon,
  BugIcon,
  SkullIcon,
  ActivityIcon,
} from '../components/Icons';

const projects = [
  {
    title: 'Gmail Security Monitor & Automated Threat Response',
    desc: 'Automated monitoring pipeline for suspicious email activity using rule-based checks and AI-assisted triage. Built for fast alerting and quarantine-style response workflows.',
    tags: ['Gmail API', 'JavaScript', 'Automation'],
    status: 'Completed',
    statusClass: '',
    icon: ShieldIcon,
    iconClass: '',
  },
  {
    title: 'Network Penetration Testing Framework',
    desc: 'Structured workflow to automate reconnaissance and scanning, then guide exploitation and reporting. Focused on repeatability and clean outputs.',
    tags: ['Kali Linux', 'Nmap', 'Metasploit'],
    status: 'Featured',
    statusClass: 'featured',
    icon: SkullIcon,
    iconClass: 'purple',
  },
  {
    title: 'Threat Detection Pipeline',
    desc: 'Scalable log ingestion and detection concept integrating multiple sources into a centralized workflow, supporting search, alerting, and downstream storage.',
    tags: ['ELK', 'Kafka', 'MongoDB'],
    status: 'In Progress',
    statusClass: 'progress',
    icon: ActivityIcon,
    iconClass: 'blue',
  },
  {
    title: 'Cryptographic Security Suite',
    desc: 'Implementations of common crypto primitives for learning and controlled demos: symmetric encryption and hashing with attention to correctness and testing.',
    tags: ['Python', 'AES', 'SHA-256'],
    status: 'Completed',
    statusClass: '',
    icon: LockIcon,
    iconClass: '',
  },
  {
    title: 'IoT Sensor Data Analysis',
    desc: 'Analysis pipeline for sensor datasets; useful groundwork for anomaly detection and security monitoring in IoT contexts.',
    tags: ['Python', 'IoT', 'Data Analysis'],
    status: 'Completed',
    statusClass: '',
    icon: NetworkIcon,
    iconClass: 'blue',
  },
  {
    title: 'DFIR & Triage — University Case Scenario',
    desc: 'Conducted digital forensics and incident response on a real-world scenario case. Performed evidence acquisition, triage, timeline reconstruction, and artifact analysis across Windows systems. Leveraged Eric Zimmerman\'s forensic tools (KAPE, MFTECmd, PECmd, Registry Explorer, ShellBags Explorer, Timeline Explorer) for deep-dive Windows forensics.',
    tags: ['DFIR', 'Windows Forensics', 'Eric Zimmerman Tools', 'KAPE', 'Triage', 'Timeline Analysis'],
    status: 'Completed — University Project',
    statusClass: '',
    icon: SearchIcon,
    iconClass: 'purple',
  },
];

export default function Projects() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <CardGlow className="highlight">
            <div className="kicker">
              <FingerprintIcon />
              Projects
            </div>
            <h1>
              <span className="glitch" data-text="Projects">Projects</span>
            </h1>
            <p className="lead">
              Selected cybersecurity projects I can confidently explain end-to-end: architecture, tooling choices,
              implementation details, and testing outcomes.
            </p>
          </CardGlow>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal stagger>
            <div className="grid two">
              {projects.map((project, i) => {
                const Icon = project.icon;
                return (
                  <CardGlow key={i}>
                    <div className={`card-icon ${project.iconClass}`}>
                      <Icon />
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div className="tag-row">
                      {project.tags.map((tag) => (
                        <span className="tag" key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className={`status-badge ${project.statusClass}`}>{project.status}</div>
                  </CardGlow>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
