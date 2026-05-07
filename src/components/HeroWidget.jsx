import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Per-page 3D widgets — each tied to a Mr-Robot / DFIR / hacking concept:
 *   terminal  → About    (3D Kali console with whoami / id / scan output)
 *   crt       → Projects (CRT monitor displaying a project list)
 *   cipher    → Skills   (matrix-style falling glyph stream)
 *   handshake → Contact  (encrypted handshake: client ↔ lock ↔ server)
 *
 * No post-processing — Scene3D in the background already supplies bloom and
 * the home Canvas is enough GPU pressure. toneMapped={false} keeps colors
 * vivid against the dark cards.
 */

/* ============================================================
 * TERMINAL (About)
 * ============================================================ */
function TerminalScene() {
  const groupRef = useRef();
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.32) * 0.18;
      groupRef.current.rotation.x = -0.04 + Math.cos(t * 0.25) * 0.06;
    }
  });

  const lines = [
    { txt: '$ whoami', kind: 'cmd' },
    { txt: 'omar_kaaki', kind: 'out' },
    { txt: '$ id', kind: 'cmd' },
    { txt: 'uid=1000(omar) groups=dfir,soc', kind: 'out' },
    { txt: '$ ./investigate --evidence', kind: 'cmd' },
    { txt: '[+] kit ready', kind: 'ok' },
    { txt: '[+] timeline reconstructed', kind: 'ok' },
  ];

  const colorFor = (k) => (k === 'cmd' ? '#f4b400' : k === 'ok' ? '#00ff88' : '#cfd6cb');

  return (
    <group ref={groupRef}>
      {/* Solid back panel */}
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[3.7, 2.4]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.92} />
      </mesh>
      {/* Wireframe terminal frame */}
      <mesh>
        <planeGeometry args={[3.7, 2.4]} />
        <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.5} toneMapped={false} />
      </mesh>

      {/* Title bar */}
      <mesh position={[0, 1.04, 0.005]}>
        <planeGeometry args={[3.7, 0.22]} />
        <meshBasicMaterial color="#0a0908" />
      </mesh>
      <mesh position={[0, 0.93, 0.006]}>
        <planeGeometry args={[3.7, 0.005]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.5} toneMapped={false} />
      </mesh>
      {/* Traffic lights */}
      <mesh position={[-1.65, 1.04, 0.012]}>
        <circleGeometry args={[0.045, 16]} />
        <meshBasicMaterial color="#ff5f57" toneMapped={false} />
      </mesh>
      <mesh position={[-1.5, 1.04, 0.012]}>
        <circleGeometry args={[0.045, 16]} />
        <meshBasicMaterial color="#febc2e" toneMapped={false} />
      </mesh>
      <mesh position={[-1.35, 1.04, 0.012]}>
        <circleGeometry args={[0.045, 16]} />
        <meshBasicMaterial color="#28c840" toneMapped={false} />
      </mesh>
      <Text
        position={[0, 1.04, 0.02]}
        fontSize={0.1}
        color="#7c8c80"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        root@omar:~/forensics
      </Text>

      {/* Terminal body lines */}
      {lines.map((line, i) => (
        <Text
          key={i}
          position={[-1.7, 0.72 - i * 0.21, 0.04]}
          fontSize={0.118}
          color={colorFor(line.kind)}
          anchorX="left"
          anchorY="middle"
          maxWidth={3.4}
          material-toneMapped={false}
        >
          {line.txt}
        </Text>
      ))}

      {/* Active prompt + blinking cursor */}
      <Text
        position={[-1.7, 0.72 - 7 * 0.21, 0.04]}
        fontSize={0.118}
        color="#f4b400"
        anchorX="left"
        anchorY="middle"
        material-toneMapped={false}
      >
        $
      </Text>
      {cursorOn && (
        <mesh position={[-1.55, 0.72 - 7 * 0.21, 0.04]}>
          <planeGeometry args={[0.08, 0.16]} />
          <meshBasicMaterial color="#00ff88" toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

/* ============================================================
 * CRT (Projects)
 * ============================================================ */
function CrtScene() {
  const groupRef = useRef();
  const flickerRef = useRef();
  const ledRef = useRef();
  const flickerTimer = useRef(0);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.24) * 0.22;
      groupRef.current.rotation.x = -0.04 + Math.cos(t * 0.2) * 0.05;
    }
    flickerTimer.current += dt;
    if (flickerTimer.current > 0.07) {
      flickerTimer.current = 0;
      if (flickerRef.current && flickerRef.current.material) {
        flickerRef.current.material.opacity = 0.025 + Math.random() * 0.04;
      }
    }
    if (ledRef.current) {
      const pulse = 0.6 + Math.sin(t * 2.5) * 0.4;
      ledRef.current.scale.setScalar(pulse);
    }
  });

  const projects = [
    { txt: '[01] Elegchos       CAPSTONE', kind: 'capstone' },
    { txt: '[02] Wazuh SIEM     DONE', kind: 'done' },
    { txt: '[03] DFIR Triage    DONE', kind: 'done' },
    { txt: '[04] Pentest Frame  FEATURED', kind: 'feat' },
    { txt: '[05] LSTM/XGBoost   DONE', kind: 'done' },
    { txt: '[06] ESCS Research  ACTIVE', kind: 'active' },
    { txt: '[07] Linux Kit      DONE', kind: 'done' },
    { txt: '[08] Gmail Monitor  DONE', kind: 'done' },
  ];

  const colorFor = (k) =>
    k === 'capstone' ? '#f4b400' :
    k === 'feat' ? '#f4b400' :
    k === 'active' ? '#00ff88' :
    '#cfd6cb';

  return (
    <group ref={groupRef}>
      {/* CRT chassis */}
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[3.6, 2.6, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.45} roughness={0.55} />
      </mesh>
      {/* Inner bezel cutout */}
      <mesh position={[0, 0.1, 0.005]}>
        <planeGeometry args={[3.0, 2.0]} />
        <meshBasicMaterial color="#001b0e" />
      </mesh>
      {/* Scanline grid */}
      <mesh position={[0, 0.1, 0.01]}>
        <planeGeometry args={[3.0, 2.0]} />
        <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.05} toneMapped={false} />
      </mesh>
      {/* Random flicker */}
      <mesh ref={flickerRef} position={[0, 0.1, 0.012]}>
        <planeGeometry args={[3.0, 2.0]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.03} toneMapped={false} />
      </mesh>

      {/* Title in CRT */}
      <Text
        position={[0, 0.97, 0.02]}
        fontSize={0.11}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        DFIR_PROJECTS.LOG
      </Text>

      {/* Project list */}
      {projects.map((p, i) => (
        <Text
          key={i}
          position={[-1.36, 0.73 - i * 0.18, 0.02]}
          fontSize={0.1}
          color={colorFor(p.kind)}
          anchorX="left"
          anchorY="middle"
          material-toneMapped={false}
        >
          {p.txt}
        </Text>
      ))}

      {/* Bottom: status line */}
      <Text
        position={[0, -0.74, 0.02]}
        fontSize={0.085}
        color="#7c8c80"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        8 records · log ok · uptime 0d 00:21:14
      </Text>

      {/* Power LED */}
      <mesh ref={ledRef} position={[1.25, -0.95, 0.012]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color="#00ff88" toneMapped={false} />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -1.45, 0]}>
        <boxGeometry args={[1.3, 0.18, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.45} roughness={0.55} />
      </mesh>
      <mesh position={[0, -1.6, 0]}>
        <boxGeometry args={[2.0, 0.1, 0.55]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.45} roughness={0.55} />
      </mesh>
    </group>
  );
}

/* ============================================================
 * CIPHER — matrix-style falling glyph stream (Skills)
 * ============================================================ */
const GLYPHS = '01<>!@#$%&*ΞΨΔΦΩabcdefABCDEF';

function CipherColumn({ x, speed, length, glyphSeed }) {
  const groupRef = useRef();
  const [swapTick, setSwapTick] = useState(0);
  const swapTimer = useRef(0);

  useFrame((_, dt) => {
    if (groupRef.current) {
      groupRef.current.position.y -= dt * speed;
      if (groupRef.current.position.y < -2.6 - length * 0.42) {
        groupRef.current.position.y = 2.6;
      }
    }
    swapTimer.current += dt;
    if (swapTimer.current > 0.18) {
      swapTimer.current = 0;
      setSwapTick((v) => (v + 1) % 1024);
    }
  });

  return (
    <group ref={groupRef} position={[x, 2.6, 0]}>
      {Array.from({ length }, (_, i) => {
        const isHead = i === 0;
        const opacity = isHead ? 1 : Math.max(0.08, 1 - i * 0.13);
        const ch = GLYPHS[(swapTick + i * 5 + glyphSeed) % GLYPHS.length];
        return (
          <Text
            key={i}
            position={[0, -i * 0.42, 0]}
            fontSize={0.32}
            color={isHead ? '#ffffff' : '#00ff88'}
            anchorX="center"
            anchorY="middle"
            fillOpacity={opacity}
            material-toneMapped={false}
          >
            {ch}
          </Text>
        );
      })}
    </group>
  );
}

function CipherScene() {
  const COLUMNS = 5;
  const cols = useMemo(
    () =>
      Array.from({ length: COLUMNS }, (_, i) => ({
        x: (i - (COLUMNS - 1) / 2) * 0.7,
        speed: 0.8 + Math.random() * 0.7,
        length: 6 + Math.floor(Math.random() * 3),
        glyphSeed: Math.floor(Math.random() * GLYPHS.length),
      })),
    []
  );

  return (
    <group rotation={[0, -0.12, 0]}>
      {cols.map((c, i) => (
        <CipherColumn key={i} {...c} />
      ))}
      {/* Side rails */}
      <mesh position={[-2.0, 0, 0]}>
        <boxGeometry args={[0.018, 4, 0.018]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.4} toneMapped={false} />
      </mesh>
      <mesh position={[2.0, 0, 0]}>
        <boxGeometry args={[0.018, 4, 0.018]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.4} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ============================================================
 * HANDSHAKE — encrypted comms client ↔ lock ↔ server (Contact)
 * ============================================================ */
function HandshakeScene() {
  const lockRef = useRef();
  const NUM_PACKETS = 5;
  const packetRefs = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (lockRef.current) {
      lockRef.current.rotation.y = t * 0.5;
    }
    packetRefs.current.forEach((p, i) => {
      if (!p) return;
      const period = 3.5;
      const localT = ((t + i * 0.7) % period) / period; // 0..1
      const x = -1.9 + localT * 3.8;
      const y = Math.sin(localT * Math.PI) * 0.45;
      p.position.set(x, y, 0);
      const mat = p.material;
      if (mat) {
        if (x < -0.05) {
          mat.color.set('#00ff88');
        } else if (localT < 0.55) {
          mat.color.set('#ffffff');
        } else {
          mat.color.set('#f4b400');
        }
      }
      const pulse = 0.55 + Math.sin(localT * Math.PI) * 0.55;
      p.scale.setScalar(pulse);
    });
  });

  return (
    <group>
      {/* Connection line behind everything */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[3.6, 0.012, 0.012]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.32} toneMapped={false} />
      </mesh>

      {/* Endpoint A — CLIENT (left) */}
      <mesh position={[-1.95, 0, 0]}>
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color="#0a2018"
          emissive="#00ff88"
          emissiveIntensity={0.6}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[-1.95, 0, 0]}>
        <octahedronGeometry args={[0.46, 0]} />
        <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.5} toneMapped={false} />
      </mesh>

      {/* Endpoint B — SERVER (right) */}
      <mesh position={[1.95, 0, 0]}>
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color="#1a1408"
          emissive="#f4b400"
          emissiveIntensity={0.55}
          metalness={0.85}
          roughness={0.22}
        />
      </mesh>
      <mesh position={[1.95, 0, 0]}>
        <octahedronGeometry args={[0.46, 0]} />
        <meshBasicMaterial color="#f4b400" wireframe transparent opacity={0.5} toneMapped={false} />
      </mesh>

      {/* Lock symbol in middle (rotates) */}
      <group ref={lockRef}>
        {/* Padlock body */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.32, 0.28, 0.2]} />
          <meshStandardMaterial
            color="#0a2018"
            emissive="#00ff88"
            emissiveIntensity={0.5}
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>
        {/* Padlock shackle (half-torus, U-shape) */}
        <mesh position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.13, 0.025, 8, 18, Math.PI]} />
          <meshStandardMaterial
            color="#0a2018"
            emissive="#00ff88"
            emissiveIntensity={0.55}
            metalness={0.95}
            roughness={0.18}
          />
        </mesh>
        {/* Keyhole */}
        <mesh position={[0, -0.05, 0.105]}>
          <circleGeometry args={[0.05, 18]} />
          <meshBasicMaterial color="#f4b400" toneMapped={false} />
        </mesh>
      </group>

      {/* Traveling packets */}
      {Array.from({ length: NUM_PACKETS }).map((_, i) => (
        <mesh key={i} ref={(r) => (packetRefs.current[i] = r)} position={[-1.8, 0, 0]}>
          <boxGeometry args={[0.13, 0.06, 0.06]} />
          <meshBasicMaterial color="#00ff88" toneMapped={false} />
        </mesh>
      ))}

      {/* Labels */}
      <Text
        position={[-1.95, -0.62, 0]}
        fontSize={0.14}
        color="#00ff88"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        CLIENT
      </Text>
      <Text
        position={[1.95, -0.62, 0]}
        fontSize={0.14}
        color="#f4b400"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        SERVER
      </Text>
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.115}
        color="#cfd6cb"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        TLS 1.3 · AES-256
      </Text>
      <Text
        position={[0, -0.62, 0]}
        fontSize={0.085}
        color="#7c8c80"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        handshake · authenticated
      </Text>
    </group>
  );
}

/* ============================================================
 * Variant registry + Canvas wrapper
 * ============================================================ */
const VARIANTS = {
  terminal: TerminalScene,
  crt: CrtScene,
  cipher: CipherScene,
  handshake: HandshakeScene,
};

const VARIANT_FLOAT = {
  terminal:  { speed: 0.4, rot: 0.15, float: 0.18 },
  crt:       { speed: 0.4, rot: 0.15, float: 0.18 },
  cipher:    { speed: 0.0, rot: 0.0,  float: 0.0 },
  handshake: { speed: 0.5, rot: 0.2,  float: 0.25 },
};

export default function HeroWidget({ variant = 'terminal' }) {
  const Scene = VARIANTS[variant] || VARIANTS.terminal;
  const fc = VARIANT_FLOAT[variant] || VARIANT_FLOAT.terminal;
  const useFloat = fc.speed > 0;

  return (
    <div className="hero-widget" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 48 }}
        dpr={[1, 1.4]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} intensity={1.0} color="#00ff88" />
          <pointLight position={[-2, -1, -1]} intensity={0.55} color="#f4b400" />
          {useFloat ? (
            <Float speed={fc.speed} rotationIntensity={fc.rot} floatIntensity={fc.float}>
              <Scene />
            </Float>
          ) : (
            <Scene />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
