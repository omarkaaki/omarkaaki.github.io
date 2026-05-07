import React, { useState, useRef, useEffect, useCallback } from 'react';

const BANNER = [
  '  ╔═══════════════════════════════════════════════╗',
  '  ║   ██████╗ ███╗   ███╗ █████╗ ██████╗         ║',
  '  ║  ██╔═══██╗████╗ ████║██╔══██╗██╔══██╗        ║',
  '  ║  ██║   ██║██╔████╔██║███████║██████╔╝        ║',
  '  ║  ██║   ██║██║╚██╔╝██║██╔══██║██╔══██╗        ║',
  '  ║  ╚██████╔╝██║ ╚═╝ ██║██║  ██║██║  ██║        ║',
  '  ║   ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝        ║',
  '  ║                                               ║',
  '  ║   DFIR Analyst / Security Engineer            ║',
  '  ║   Type "help" for available commands           ║',
  '  ╚═══════════════════════════════════════════════╝',
];

const FILE_SYSTEM = {
  'skills.txt': [
    '[+] SOC Operations & Incident Response',
    '[+] Digital Forensics & Triage',
    '[+] Penetration Testing',
    '[+] Windows & Linux Forensics',
    '[+] SIEM (Wazuh, Splunk, ELK Stack)',
    '[+] Hyperledger Fabric & IPFS',
    '[+] Network Traffic Analysis',
  ],
  'about.txt': [
    '╔══════════════════════════════════════╗',
    '║  Omar Kaaki                          ║',
    '║  DFIR Analyst / Security Engineer    ║',
    '║  AUB - Computer & Comms Engineering  ║',
    '║  Beirut, Lebanon                     ║',
    '╚══════════════════════════════════════╝',
    '',
    'Senior CCE student focused on SOC operations,',
    'DFIR workflows, and forensic-grade systems design.',
    'Capstone: Elegchos blockchain chain-of-custody.',
  ],
  'projects.txt': [
    '┌─────────────────────────────────────────────┐',
    '│ [01] Elegchos Blockchain CoC      [CAPSTONE]│',
    '│ [02] Wazuh SIEM Lab                  [DONE] │',
    '│ [03] DFIR Triage Investigation       [DONE] │',
    '│ [04] Network Pentest Framework   [FEATURED] │',
    '│ [05] ESCS Research Paper          [ACTIVE] │',
    '│ [06] LSTM/XGBoost NIDS               [DONE] │',
    '│ [07] Linux Forensics Toolkit         [DONE] │',
    '│ [08] Gmail Security Monitor          [DONE] │',
    '└─────────────────────────────────────────────┘',
  ],
  'fyp.txt': [
    '┌── Elegchos · Capstone ──────────────────────┐',
    '│  Permissioned blockchain for digital chain  │',
    '│  of custody in forensic investigations.     │',
    '│                                             │',
    '│  [+] Hyperledger Fabric (hot ledger)        │',
    '│  [+] IPFS-backed cold archival              │',
    '│  [+] Jump-server gateway · mTLS · MFA · RBAC│',
    '│  [+] 20+ TPS · 0 failures · byte integrity  │',
    '│                                             │',
    '│  Team: Omar, Rami, Mostafa, Jad             │',
    '│  Advisor: Dr. Hussein Bakri                 │',
    '└─────────────────────────────────────────────┘',
  ],
  'status.sh': [
    '[*] Location   : Beirut, Lebanon',
    '[*] Status     : Open to opportunities',
    '[*] Graduation : 2026',
    '[*] Capstone   : Elegchos · Hyperledger Fabric',
    '[*] Uptime     : 21 years',
  ],
  'tools.txt': [
    '┌── Analysis ─────────────────────────────┐',
    '│  Splunk, Wazuh, ELK, Wireshark, Volatility│',
    '├── Offensive ─────────────────────────────┤',
    '│  Nmap, Metasploit, Burp Suite, sqlmap   │',
    '├── Forensics ─────────────────────────────┤',
    '│  KAPE, Autopsy, FTK, Eric Zimmerman     │',
    '├── Blockchain ────────────────────────────┤',
    '│  Hyperledger Fabric, IPFS, Chaincode    │',
    '├── Development ───────────────────────────┤',
    '│  Python, Bash, JavaScript, Go, Git      │',
    '└─────────────────────────────────────────┘',
  ],
  'contact.txt': [
    '┌── Secure Channels ──────────────────────┐',
    '│  Email    : omarkaaki2004@gmail.com     │',
    '│  LinkedIn : /in/omar-kaaki-393880312    │',
    '│  Location : Beirut, Lebanon             │',
    '│  Timezone : Asia/Beirut (UTC+2)         │',
    '└─────────────────────────────────────────┘',
  ],
};

const COMMANDS = {
  help: () => ({
    lines: [
      '┌── Available Commands ─────────────────────────┐',
      '│                                               │',
      '│  whoami        - Display identity              │',
      '│  ls            - List directory contents       │',
      '│  cat <file>    - Display file contents        │',
      '│  ./status.sh   - Run status script            │',
      '│  nmap <target> - Simulate network scan        │',
      '│  volatility    - Memory forensics demo        │',
      '│  hashcat       - Hash cracking demo           │',
      '│  pwd           - Print working directory      │',
      '│  date          - Current date/time            │',
      '│  uname -a      - System information           │',
      '│  history       - Command history              │',
      '│  clear         - Clear terminal               │',
      '│  banner        - Show ASCII banner            │',
      '│                                               │',
      '│  Files: skills.txt, about.txt, projects.txt   │',
      '│         tools.txt, contact.txt, fyp.txt       │',
      '│         status.sh                              │',
      '│                                               │',
      '└───────────────────────────────────────────────┘',
    ],
    type: 'info',
  }),

  whoami: () => ({
    lines: ['omar_kaaki — DFIR Analyst / Security Engineer'],
    type: 'success',
  }),

  ls: () => ({
    lines: [
      'drwxr-xr-x  evidence/    forensics/    reports/',
      '-rw-r--r--  skills.txt   about.txt     projects.txt',
      '-rw-r--r--  tools.txt    contact.txt   fyp.txt',
      '-rwxr-xr-x  status.sh',
    ],
    type: 'default',
  }),

  pwd: () => ({
    lines: ['/home/omar_kaaki/forensics'],
    type: 'default',
  }),

  date: () => ({
    lines: [new Date().toString()],
    type: 'default',
  }),

  'uname -a': () => ({
    lines: ['Linux kali 6.1.0-kali9-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.1.27-1kali1 x86_64 GNU/Linux'],
    type: 'default',
  }),

  banner: () => ({
    lines: BANNER,
    type: 'ascii',
  }),

  nmap: (args) => {
    const target = args || '192.168.1.0/24';
    return {
      lines: [
        `Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString().split('T')[0]}`,
        `Nmap scan report for ${target}`,
        'Host is up (0.0012s latency).',
        '',
        'PORT     STATE  SERVICE       VERSION',
        '22/tcp   open   ssh           OpenSSH 9.2p1',
        '80/tcp   open   http          Apache/2.4.57',
        '443/tcp  open   https         nginx/1.24.0',
        '3306/tcp closed mysql',
        '8080/tcp open   http-proxy    Squid 5.7',
        '',
        `Nmap done: 1 IP address (1 host up) scanned in 2.34 seconds`,
      ],
      type: 'success',
    };
  },

  volatility: () => ({
    lines: [
      'Volatility Framework 3.0 - Memory Forensics',
      '════════════════════════════════════════════',
      '',
      'Analyzing memory dump: evidence.raw (4.0 GB)',
      '',
      'PID    PPID   Name              Offset',
      '────── ────── ────────────────── ──────────────',
      '4      0      System            0x85c6a3c0',
      '312    4      smss.exe          0x86215d40',
      '392    380    csrss.exe         0x86289030',
      '436    380    wininit.exe       0x862dd030',
      '456    428    csrss.exe         0x862f1850',
      '508    436    services.exe     0x86375580',
      '520    436    lsass.exe         0x8637d888',
      '1124   508    svchost.exe       0x866a7030',
      '2048   1      suspicious.exe    0x87b23440  ⚠ ALERT',
      '',
      '[!] Suspicious process detected: PID 2048',
      '[*] Recommend: vol3 -f evidence.raw windows.malfind --pid 2048',
    ],
    type: 'info',
  }),

  hashcat: () => ({
    lines: [
      'hashcat (v6.2.6) starting...',
      '',
      'Hash.Mode..........: 0 (MD5)',
      'Hash.Target........: 5f4dcc3b5aa765d61d8327deb882cf99',
      'Time.Started.......: ' + new Date().toLocaleTimeString(),
      'Speed.#1...........: 12847.2 MH/s',
      '',
      '5f4dcc3b5aa765d61d8327deb882cf99:password',
      '',
      'Session...........: hashcat',
      'Status............: Cracked',
      'Hash.Type.........: MD5',
      'Time.Elapsed......: 0 secs',
      'Recovered.........: 1/1 (100.00%) Digests',
    ],
    type: 'success',
  }),
};

function processCommand(input, history) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (trimmed === 'clear') return { clear: true };
  if (trimmed === 'history') {
    return {
      lines: history.map((cmd, i) => `  ${String(i + 1).padStart(4)}  ${cmd}`),
      type: 'default',
    };
  }

  if (trimmed.startsWith('cat ')) {
    const file = trimmed.slice(4).trim();
    if (FILE_SYSTEM[file]) {
      return { lines: FILE_SYSTEM[file], type: 'default' };
    }
    return { lines: [`cat: ${file}: No such file or directory`], type: 'error' };
  }

  if (trimmed === './status.sh' || trimmed === 'bash status.sh') {
    return { lines: FILE_SYSTEM['status.sh'], type: 'success' };
  }

  if (trimmed.startsWith('nmap')) {
    const args = trimmed.slice(4).trim().replace(/^-\S+\s*/, '');
    return COMMANDS.nmap(args);
  }

  const cmd = COMMANDS[trimmed];
  if (cmd) return cmd();

  return {
    lines: [`Command not found: ${trimmed}`, 'Type "help" for available commands.'],
    type: 'error',
  };
}

export default function InteractiveTerminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [booted, setBooted] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const bootLines = [
      { text: BANNER, type: 'ascii', delay: 0 },
      { text: ['[*] Initializing DFIR toolkit...'], type: 'info', delay: 400 },
      { text: ['[✓] Forensic environment ready'], type: 'success', delay: 800 },
      { text: ['[*] Type "help" for available commands', ''], type: 'info', delay: 1100 },
    ];

    let timeout;
    const addedLines = [];

    bootLines.forEach(({ text, type, delay }) => {
      timeout = setTimeout(() => {
        const newLines = Array.isArray(text)
          ? text.map((t) => ({ text: t, type }))
          : text.map((t) => ({ text: t, type }));
        addedLines.push(...newLines);
        setLines([...addedLines]);
        if (delay === bootLines[bootLines.length - 1].delay) {
          setBooted(true);
        }
      }, delay);
    });

    return () => clearTimeout(timeout);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!booted) return;

      const cmd = input;
      setInput('');
      setHistIndex(-1);

      if (cmd.trim()) {
        setHistory((prev) => [...prev, cmd.trim()]);
      }

      const promptLine = { text: `┌──(root㉿kali)-[~/forensics]\n└─$ ${cmd}`, type: 'prompt' };

      const result = processCommand(cmd, [...history, cmd.trim()]);
      if (!result) {
        setLines((prev) => [...prev, promptLine]);
        return;
      }

      if (result.clear) {
        setLines([]);
        return;
      }

      const outputLines = result.lines.map((t) => ({ text: t, type: result.type }));
      setLines((prev) => [...prev, promptLine, ...outputLines, { text: '', type: 'default' }]);
    },
    [input, booted, history]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length > 0) {
          const newIdx = histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1);
          setHistIndex(newIdx);
          setInput(history[newIdx]);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (histIndex !== -1) {
          const newIdx = histIndex + 1;
          if (newIdx >= history.length) {
            setHistIndex(-1);
            setInput('');
          } else {
            setHistIndex(newIdx);
            setInput(history[newIdx]);
          }
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const partial = input.trim().toLowerCase();
        const allCommands = [...Object.keys(COMMANDS), 'clear', 'history'];
        const allFiles = Object.keys(FILE_SYSTEM);

        if (partial.startsWith('cat ')) {
          const filePartial = partial.slice(4);
          const match = allFiles.find((f) => f.startsWith(filePartial));
          if (match) setInput(`cat ${match}`);
        } else {
          const match = allCommands.find((c) => c.startsWith(partial));
          if (match) setInput(match);
        }
      }
    },
    [history, histIndex, input]
  );

  const focusInput = useCallback(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <aside className="terminal-widget" onClick={focusInput}>
      <div className="terminal-bar">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-title">root@kali:~/forensics</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {lines.map((line, i) => {
          if (line.type === 'prompt') {
            return (
              <div key={i} className="terminal-line" style={{ opacity: 1 }}>
                {line.text.split('\n').map((t, j) => (
                  <div key={j}>
                    {j === 0 ? (
                      <span className="terminal-prompt">{t}</span>
                    ) : (
                      <>
                        <span className="terminal-prompt">└─$ </span>
                        <span className="terminal-cmd">{t.replace('└─$ ', '')}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            );
          }

          if (line.type === 'ascii') {
            return (
              <div key={i} className="terminal-ascii" style={{ opacity: 1 }}>
                {line.text}
              </div>
            );
          }

          const typeClass =
            line.type === 'success'
              ? 'success'
              : line.type === 'error'
              ? 'error'
              : line.type === 'info'
              ? 'info'
              : '';

          return (
            <div key={i} className={`terminal-output ${typeClass}`} style={{ opacity: 1 }}>
              {line.text}
            </div>
          );
        })}

        {booted && (
          <form onSubmit={handleSubmit} className="terminal-input-line">
            <span className="terminal-prompt">└─$ </span>
            <input
              ref={inputRef}
              className="terminal-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command..."
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
          </form>
        )}
      </div>
    </aside>
  );
}
