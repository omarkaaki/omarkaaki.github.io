import React, { Suspense, lazy } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';

const HeroWidget = lazy(() => import('../components/HeroWidget'));
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
    title: 'Elegchos — Blockchain Chain of Custody',
    desc: 'Final year capstone. A permissioned blockchain system for digital chain of custody in forensic investigations, pairing a hot Hyperledger Fabric ledger for active custody tracking with a cold archival ledger backed by IPFS for long-term tamper-evident storage. Sits behind a hardened jump-server gateway with mutual TLS, MFA, and RBAC. Achieved 20+ TPS write throughput with zero failures.',
    tags: ['Hyperledger Fabric', 'IPFS', 'mTLS', 'MFA', 'RBAC', 'Jump Server'],
    status: 'Capstone',
    statusClass: 'featured',
    icon: ShieldIcon,
    iconClass: 'purple',
  },
  {
    title: 'Wazuh SIEM Lab — Custom Detection Engineering',
    desc: 'End-to-end SIEM deployment across a Wazuh Manager, Windows Server, Ubuntu, and Kali agent. Configured custom detection rules (IDs 100001–100008), Sysmon with the SwiftOnSecurity config, IIS web and FTP logging, and full Event ID coverage including 4625, 4624, 4720, 4732/4733, 4726, 7045, and Sysmon EID 1/11.',
    tags: ['Wazuh', 'Sysmon', 'Detection Rules', 'Windows Server', 'Kali', 'Ubuntu'],
    status: 'Completed',
    statusClass: '',
    icon: ActivityIcon,
    iconClass: '',
  },
  {
    title: 'DFIR Triage — Multi-Workstation Malware Investigation',
    desc: 'Forensic investigation of a malware campaign across nine Windows workstations. Identified patient zero (IT-01, user Lewis.Douglas), traced MSXSL.EXE execution and startup persistence, and produced a full report mapped to MITRE ATT&CK. Used Eric Zimmerman tools (KAPE, MFTECmd, PECmd, Registry Explorer, ShellBags Explorer, Timeline Explorer) for deep-dive Windows forensics.',
    tags: ['DFIR', 'KAPE', 'Eric Zimmerman Tools', 'MITRE ATT&CK', 'Windows Forensics'],
    status: 'University Case · Completed',
    statusClass: '',
    icon: SearchIcon,
    iconClass: 'purple',
  },
  {
    title: 'Network Penetration Testing Framework',
    desc: 'Structured workflow to automate reconnaissance and scanning, then guide exploitation and reporting. Focused on repeatability and clean outputs across engagements.',
    tags: ['Kali Linux', 'Nmap', 'Metasploit', 'Burp Suite'],
    status: 'Featured',
    statusClass: 'featured',
    icon: SkullIcon,
    iconClass: 'purple',
  },
  {
    title: 'Encrypted Semantic Communication Systems',
    desc: 'Research on enhancing the Luo et al. ESCS baseline with LAPI and InfoNCE-guided adaptive training. Co-authored with Maria Slim under Dr. Hadi Sarieddeen, with a publishability assessment targeting IEEE Communications Letters.',
    tags: ['Deep Learning', 'PyTorch', 'Semantic Comms', 'Research'],
    status: 'Active Research',
    statusClass: 'progress',
    icon: NetworkIcon,
    iconClass: 'blue',
  },
  {
    title: 'NIDS with LSTM Autoencoder + XGBoost',
    desc: 'Network intrusion detection system trained on CIC-IDS2017. Combined LSTM autoencoder reconstruction error with XGBoost classification for layered detection. Co-authored and converted to IEEE LaTeX format.',
    tags: ['LSTM', 'XGBoost', 'CIC-IDS2017', 'IEEE Format'],
    status: 'Completed',
    statusClass: '',
    icon: ActivityIcon,
    iconClass: 'blue',
  },
  {
    title: 'Linux Forensics Toolkit',
    desc: 'Comprehensive reference document and bash toolchain for Linux forensic analysis. Covers live system analysis, Volatility memory forensics, Sleuth Kit disk analysis, browser forensics (Dumpzilla, SQLite), and file recovery (ext4magic, extundelete, PhotoRec).',
    tags: ['Volatility', 'Sleuth Kit', 'ext4magic', 'PhotoRec'],
    status: 'Completed',
    statusClass: '',
    icon: BugIcon,
    iconClass: '',
  },
  {
    title: 'Gmail Security Monitor',
    desc: 'Automated monitoring pipeline for suspicious email activity using rule-based checks and AI-assisted triage. Built for fast alerting and quarantine-style response workflows.',
    tags: ['Gmail API', 'JavaScript', 'Automation'],
    status: 'Completed',
    statusClass: '',
    icon: LockIcon,
    iconClass: '',
  },
];

export default function Projects() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid hero-grid-widget">
            <TiltCard className="highlight" intensity={4}>
              <div className="kicker">
                <FingerprintIcon />
                Projects
              </div>
              <h1>
                <span className="glitch" data-text="Projects">Projects</span>
              </h1>
              <p className="lead">
                Cybersecurity projects I can confidently explain end-to-end: architecture decisions,
                tooling choices, implementation details, and measured outcomes.
              </p>
            </TiltCard>
            <div className="hero-widget-stage">
              <Suspense fallback={null}>
                <HeroWidget variant="crt" />
              </Suspense>
              <div className="widget-overlay">
                <span className="widget-label">/dfir_projects.log · 8 records</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">
            <ActivityIcon />
            All projects
          </h2>
          <ScrollReveal stagger>
            <div className="grid two">
              {projects.map((project, i) => {
                const Icon = project.icon;
                return (
                  <TiltCard key={i}>
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
                  </TiltCard>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
