import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Per-page 3D widgets — each one tied to a security/DFIR concept:
 *   biometric → About    (rotating wireframe eye with iris ring + scanning beam)
 *   shield    → Projects (hex perimeter shield with orbiting threats deflecting off)
 *   radar     → Skills   (concentric rings + sweep line + blips appearing on detection)
 *   cipher    → Contact  (matrix-style falling glyphs — encrypted data stream)
 *
 * Lightweight: no post-processing (the home Scene3D supplies bloom across the
 * whole page), and emissive colors via toneMapped={false} stay punchy.
 */

/* ============================================================
 * BIOMETRIC — wireframe eye + iris ring + scanning beam (About)
 * ============================================================ */
function BiometricScene() {
  const eyeballRef = useRef();
  const irisRef = useRef();
  const pupilGlowRef = useRef();
  const scanBeamRef = useRef();

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (eyeballRef.current) {
      // Eye "looks around" — slow drift in rotation
      eyeballRef.current.rotation.y = Math.sin(t * 0.4) * 0.35;
      eyeballRef.current.rotation.x = Math.cos(t * 0.3) * 0.2;
    }
    if (irisRef.current) {
      irisRef.current.rotation.z += dt * 0.6;
    }
    if (pupilGlowRef.current) {
      const pulse = 0.7 + Math.sin(t * 3.2) * 0.3;
      pupilGlowRef.current.scale.setScalar(pulse);
    }
    if (scanBeamRef.current) {
      // Vertical scanning beam sweeps top-to-bottom on a 2.5s loop
      const period = 2.5;
      const phase = (t % period) / period;
      scanBeamRef.current.position.y = 1.4 - phase * 2.8;
      const mat = scanBeamRef.current.material;
      if (mat) mat.opacity = Math.sin(phase * Math.PI) * 0.6;
    }
  });

  return (
    <group>
      <group ref={eyeballRef}>
        {/* Outer wireframe eyeball */}
        <mesh>
          <sphereGeometry args={[1.25, 28, 28]} />
          <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.32} toneMapped={false} />
        </mesh>
        {/* Front iris plate (faces camera) */}
        <group ref={irisRef} position={[0, 0, 0.92]}>
          <mesh>
            <torusGeometry args={[0.55, 0.04, 8, 48]} />
            <meshBasicMaterial color="#00ff88" toneMapped={false} />
          </mesh>
          <mesh>
            <torusGeometry args={[0.4, 0.018, 8, 48]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.7} toneMapped={false} />
          </mesh>
          {/* Iris radial spokes */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const x = Math.cos(angle) * 0.46;
            const y = Math.sin(angle) * 0.46;
            return (
              <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
                <boxGeometry args={[0.18, 0.014, 0.014]} />
                <meshBasicMaterial color="#00ff88" toneMapped={false} />
              </mesh>
            );
          })}
        </group>
        {/* Pupil */}
        <mesh position={[0, 0, 0.98]}>
          <sphereGeometry args={[0.16, 18, 18]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* Pupil glow halo */}
        <mesh ref={pupilGlowRef} position={[0, 0, 1.0]}>
          <sphereGeometry args={[0.22, 18, 18]} />
          <meshBasicMaterial color="#f4b400" transparent opacity={0.45} toneMapped={false} />
        </mesh>
      </group>

      {/* Scan beam (horizontal plane that sweeps vertically) */}
      <mesh ref={scanBeamRef} position={[0, 0, 0.5]}>
        <planeGeometry args={[3.4, 0.06]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.5} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>

      {/* Subtle halo */}
      <mesh>
        <sphereGeometry args={[1.4, 16, 16]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.04} side={THREE.BackSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ============================================================
 * SHIELD — hex perimeter + orbiting threats getting deflected (Projects)
 * ============================================================ */
function ShieldScene() {
  const shieldRef = useRef();
  const emblemRef = useRef();
  const ringRef = useRef();
  const NUM_THREATS = 6;
  const threatRefs = useRef([]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (shieldRef.current) {
      shieldRef.current.rotation.y += dt * 0.18;
      shieldRef.current.rotation.x = Math.sin(t * 0.3) * 0.12;
    }
    if (emblemRef.current) {
      emblemRef.current.rotation.x += dt * 0.5;
      emblemRef.current.rotation.z += dt * 0.3;
    }
    if (ringRef.current) {
      // Pulse the perimeter ring
      const s = 1 + Math.sin(t * 1.4) * 0.04;
      ringRef.current.scale.setScalar(s);
      const mat = ringRef.current.material;
      if (mat) mat.opacity = 0.35 + Math.sin(t * 1.4) * 0.15;
    }
    // Threats orbit and "bounce" off the shield (radius oscillates between 1.4 outer and 1.15 deflection)
    threatRefs.current.forEach((th, i) => {
      if (!th) return;
      const phase = (i / NUM_THREATS) * Math.PI * 2;
      const angle = t * 0.5 + phase;
      // Radial bounce — threats approach 1.15 (shield surface) then bounce back to 2.0
      const radial = 1.4 + Math.sin(t * 1.6 + phase) * 0.55;
      th.position.set(
        Math.cos(angle) * radial,
        Math.sin(angle * 1.3 + phase) * 0.35,
        Math.sin(angle) * radial
      );
      const mat = th.material;
      // When close to shield, flash brighter
      const closeness = Math.max(0, 1 - (radial - 1.15) / 0.85);
      if (mat) {
        mat.color.setRGB(
          1,
          0.25 + closeness * 0.5,
          0.25 + closeness * 0.2
        );
      }
      const pulse = 0.7 + Math.sin(t * 4 + phase) * 0.3;
      th.scale.setScalar(pulse);
    });
  });

  return (
    <group>
      {/* Hex shield body */}
      <group ref={shieldRef}>
        {/* Solid hex face */}
        <mesh>
          <cylinderGeometry args={[1.05, 1.05, 0.16, 6, 1, false]} />
          <meshStandardMaterial
            color="#0a2018"
            emissive="#00ff88"
            emissiveIntensity={0.42}
            metalness={0.85}
            roughness={0.22}
          />
        </mesh>
        {/* Hex outline (slightly larger, wireframe) */}
        <mesh ref={ringRef}>
          <cylinderGeometry args={[1.12, 1.12, 0.18, 6, 1, false]} />
          <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.5} toneMapped={false} />
        </mesh>
        {/* Emblem at center */}
        <mesh ref={emblemRef}>
          <octahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial
            color="#0c1410"
            emissive="#f4b400"
            emissiveIntensity={0.55}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Orbiting threats */}
      {Array.from({ length: NUM_THREATS }).map((_, i) => (
        <mesh key={i} ref={(r) => (threatRefs.current[i] = r)}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshBasicMaterial color="#ff4747" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ============================================================
 * RADAR — angled radar dish with sweep line and blips (Skills)
 * ============================================================ */
function RadarScene() {
  const sweepRef = useRef();
  const NUM_BLIPS = 8;
  const blipsRef = useRef([]);
  const blipState = useRef(
    Array.from({ length: NUM_BLIPS }, () => ({
      angle: Math.random() * Math.PI * 2,
      r: 0.5 + Math.random() * 1.6,
      life: 0.5 + Math.random() * 2.5,
    }))
  );

  useFrame((state, dt) => {
    if (sweepRef.current) {
      sweepRef.current.rotation.z -= dt * 0.85;
    }
    blipState.current.forEach((b, i) => {
      b.life -= dt;
      const blip = blipsRef.current[i];
      if (!blip) return;
      if (b.life <= 0) {
        b.angle = Math.random() * Math.PI * 2;
        b.r = 0.5 + Math.random() * 1.6;
        b.life = 1.5 + Math.random() * 2.5;
        blip.position.set(Math.cos(b.angle) * b.r, 0, Math.sin(b.angle) * b.r);
      }
      const op = Math.max(0, Math.min(1, b.life / 2));
      const mat = blip.material;
      if (mat) mat.opacity = op;
      // Pulse scale
      const pulse = 0.6 + Math.sin(state.clock.elapsedTime * 4 + i) * 0.4;
      blip.scale.setScalar(pulse);
    });
  });

  return (
    <group rotation={[-Math.PI / 2.5, 0, 0]}>
      {/* Concentric rings */}
      {[0.6, 1.1, 1.6, 2.1].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.006, 6, 80]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.42 - i * 0.07} toneMapped={false} />
        </mesh>
      ))}
      {/* Cross-hairs */}
      <mesh>
        <boxGeometry args={[4.4, 0.012, 0.012]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.22} toneMapped={false} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.012, 0.012, 4.4]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.22} toneMapped={false} />
      </mesh>
      {/* Diagonal grid lines */}
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[4.4, 0.008, 0.008]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.14} toneMapped={false} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[4.4, 0.008, 0.008]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.14} toneMapped={false} />
      </mesh>

      {/* Sweep line + cone */}
      <group ref={sweepRef} rotation={[Math.PI / 2, 0, 0]}>
        <mesh position={[1.05, 0, 0]}>
          <boxGeometry args={[2.1, 0.014, 0.014]} />
          <meshBasicMaterial color="#00ff88" toneMapped={false} />
        </mesh>
        {/* Trailing fan */}
        <mesh position={[0.6, 0, -0.4]} rotation={[0, 0, -Math.PI / 8]}>
          <planeGeometry args={[1.6, 1.0]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.13} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      </group>

      {/* Blips */}
      {Array.from({ length: NUM_BLIPS }).map((_, i) => {
        const initial = blipState.current[i];
        return (
          <mesh
            key={i}
            ref={(r) => (blipsRef.current[i] = r)}
            position={[Math.cos(initial.angle) * initial.r, 0, Math.sin(initial.angle) * initial.r]}
          >
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial color="#f4b400" transparent toneMapped={false} />
          </mesh>
        );
      })}

      {/* Center node */}
      <mesh>
        <sphereGeometry args={[0.1, 14, 14]} />
        <meshBasicMaterial color="#00ff88" toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.18, 14, 14]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.22} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ============================================================
 * CIPHER — matrix-style falling glyphs in 3D (Contact)
 * ============================================================ */
const GLYPHS = '01<>!@#$%&*ΞΨΔΦΩabcdefABCDEF';

function CipherColumn({ x, speed, length, glyphSeed }) {
  const groupRef = useRef();
  const [glyphList] = React.useState(() =>
    Array.from({ length }, (_, i) => GLYPHS[(glyphSeed + i * 3) % GLYPHS.length])
  );
  const swapTimer = useRef(0);
  const [swapTick, setSwapTick] = React.useState(0);

  useFrame((state, dt) => {
    if (groupRef.current) {
      groupRef.current.position.y -= dt * speed;
      // Loop top
      if (groupRef.current.position.y < -2.5 - length * 0.45) {
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
      {glyphList.map((_, i) => {
        const isHead = i === 0;
        const opacity = isHead ? 1 : Math.max(0.08, 1 - i * 0.13);
        const ch = GLYPHS[(swapTick + i * 5 + glyphSeed) % GLYPHS.length];
        return (
          <Text
            key={i}
            position={[0, -i * 0.45, 0]}
            fontSize={0.34}
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
    <group rotation={[0, -0.15, 0]}>
      {cols.map((c, i) => (
        <CipherColumn key={i} {...c} />
      ))}
      {/* Side accent: a vertical "secure channel" indicator */}
      <mesh position={[-2.0, 0, 0]}>
        <boxGeometry args={[0.02, 4, 0.02]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.4} toneMapped={false} />
      </mesh>
      <mesh position={[2.0, 0, 0]}>
        <boxGeometry args={[0.02, 4, 0.02]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.4} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ============================================================
 * Variant registry + default Canvas wrapper
 * ============================================================ */
const VARIANTS = {
  biometric: BiometricScene,
  shield: ShieldScene,
  radar: RadarScene,
  cipher: CipherScene,
};

const VARIANT_FLOAT = {
  biometric: { speed: 0.5, rot: 0.25, float: 0.3 },
  shield:    { speed: 0.6, rot: 0.3,  float: 0.35 },
  radar:     { speed: 0.0, rot: 0.0,  float: 0.0 }, // Radar should stay flat
  cipher:    { speed: 0.0, rot: 0.0,  float: 0.0 }, // Code rain stays vertical
};

export default function HeroWidget({ variant = 'biometric' }) {
  const Scene = VARIANTS[variant] || VARIANTS.biometric;
  const floatCfg = VARIANT_FLOAT[variant] || VARIANT_FLOAT.biometric;
  const useFloat = floatCfg.speed > 0;

  return (
    <div className="hero-widget" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 48 }}
        dpr={[1, 1.4]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <pointLight position={[3, 3, 3]} intensity={1.1} color="#00ff88" />
          <pointLight position={[-2, -1, -1]} intensity={0.6} color="#f4b400" />
          {useFloat ? (
            <Float speed={floatCfg.speed} rotationIntensity={floatCfg.rot} floatIntensity={floatCfg.float}>
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
