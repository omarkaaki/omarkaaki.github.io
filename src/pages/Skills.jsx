import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
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
      'SIEM engineering: Wazuh, Splunk, and ELK stack deployments.',
      'Custom detection rule development and tuning.',
      'Incident response fundamentals and reporting discipline.',
    ],
  },
  {
    title: 'DFIR & Forensics',
    icon: WrenchIcon,
    iconClass: 'purple',
    items: [
      'Windows forensics with Eric Zimmerman tools (KAPE, MFTECmd, PECmd).',
      'Memory forensics with Volatility 2 and 3.',
      'Linux forensics: Sleuth Kit, ext4magic, PhotoRec, Dumpzilla.',
      'Timeline reconstruction and MITRE ATT&CK mapping.',
    ],
  },
  {
    title: 'Programming & Systems',
    icon: CodeIcon,
    iconClass: 'blue',
    items: [
      'Python for automation, parsing, and data-handling tasks.',
      'Bash scripting for Linux operations and tooling.',
      'JavaScript / React for security tooling and dashboards.',
      'Comfortable reading and extending unfamiliar codebases.',
    ],
  },
  {
    title: 'Secure Systems Engineering',
    icon: CpuIcon,
    iconClass: '',
    items: [
      'Permissioned blockchain: Hyperledger Fabric chaincode + IPFS.',
      'Hardened gateway design: jump server, mTLS, MFA, RBAC.',
      'Network security: OPNsense firewall rules, PF debugging.',
      'Reproducible lab environments with VMware Workstation.',
    ],
  },
];

export default function Skills() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <TiltCard className="highlight" intensity={4}>
            <div className="kicker">
              <FingerprintIcon />
              Skills
            </div>
            <h1>
              <span className="glitch" data-text="Skills">Skills</span>
            </h1>
            <p className="lead">
              Cybersecurity, forensics, and engineering — everything I can confidently put my hands on.
            </p>
          </TiltCard>
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
                    <TiltCard key={cat.title}>
                      <div className={`card-icon ${cat.iconClass}`}>
                        <Icon />
                      </div>
                      <h3>{cat.title}</h3>
                      <ul className="list">
                        {cat.items.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    </TiltCard>
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
