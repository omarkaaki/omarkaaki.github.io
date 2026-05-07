import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Per-page 3D widgets, sized to sit in a subpage hero. Four variants:
 *   skull  → About    (low-poly distorting head with glowing amber eyes)
 *   vault  → Projects (cubes orbiting a wireframe core)
 *   orbit  → Skills   (concentric dotted rings around a central node)
 *   beacon → Contact  (transmission tower: expanding signal rings)
 *
 * No post-processing to keep cost low — Scene3D in the background already
 * supplies bloom, so widgets just need crisp emissive geometry.
 */

function SkullScene() {
  const wire = useRef();
  const inner = useRef();
  const eyeL = useRef();
  const eyeR = useRef();

  useFrame((state, dt) => {
    if (wire.current) {
      wire.current.rotation.x += dt * 0.18;
      wire.current.rotation.y += dt * 0.24;
    }
    if (inner.current) {
      inner.current.rotation.x -= dt * 0.32;
      inner.current.rotation.z += dt * 0.18;
    }
    const pulse = 0.78 + Math.sin(state.clock.elapsedTime * 3.2) * 0.22;
    if (eyeL.current) eyeL.current.scale.setScalar(pulse);
    if (eyeR.current) eyeR.current.scale.setScalar(pulse);
  });

  return (
    <group>
      <Icosahedron ref={wire} args={[1.45, 1]}>
        <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.6} toneMapped={false} />
      </Icosahedron>
      <Icosahedron ref={inner} args={[0.92, 4]}>
        <MeshDistortMaterial
          color="#0a2018"
          emissive="#00ff88"
          emissiveIntensity={0.45}
          distort={0.32}
          speed={2.2}
          metalness={0.65}
          roughness={0.25}
        />
      </Icosahedron>
      <mesh ref={eyeL} position={[-0.32, 0.18, 0.92]}>
        <sphereGeometry args={[0.07, 14, 14]} />
        <meshBasicMaterial color="#f4b400" toneMapped={false} />
      </mesh>
      <mesh ref={eyeR} position={[0.32, 0.18, 0.92]}>
        <sphereGeometry args={[0.07, 14, 14]} />
        <meshBasicMaterial color="#f4b400" toneMapped={false} />
      </mesh>
      {/* Subtle outer halo */}
      <Icosahedron args={[1.55, 1]}>
        <meshBasicMaterial color="#00ff88" transparent opacity={0.05} side={THREE.BackSide} />
      </Icosahedron>
    </group>
  );
}

function VaultScene() {
  const group = useRef();
  const inner = useRef();

  useFrame((state, dt) => {
    if (group.current) {
      group.current.rotation.y += dt * 0.18;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.18;
    }
    if (inner.current) {
      inner.current.rotation.x += dt * 0.6;
      inner.current.rotation.y += dt * 0.4;
    }
  });

  const cubes = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const r = 1.55;
      return [Math.cos(angle) * r, Math.sin(angle * 0.5) * 0.45, Math.sin(angle) * r];
    });
  }, []);

  return (
    <group ref={group}>
      {/* Central core */}
      <mesh ref={inner}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          color="#0a2018"
          emissive="#00ff88"
          emissiveIntensity={0.6}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.45} toneMapped={false} />
      </mesh>
      {/* Orbiting cubes */}
      {cubes.map((pos, i) => (
        <Float
          key={i}
          speed={1.6}
          rotationIntensity={1.4}
          floatIntensity={0.55}
          position={pos}
        >
          <mesh>
            <boxGeometry args={[0.28, 0.28, 0.28]} />
            <meshStandardMaterial
              color="#0c1410"
              emissive="#00ff88"
              emissiveIntensity={0.22}
              metalness={0.9}
              roughness={0.18}
            />
          </mesh>
          <mesh>
            <boxGeometry args={[0.31, 0.31, 0.31]} />
            <meshBasicMaterial color={i % 3 === 0 ? '#f4b400' : '#00ff88'} wireframe transparent opacity={0.55} toneMapped={false} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function OrbitScene() {
  const group = useRef();
  const ringRefs = useRef([]);

  useFrame((state, dt) => {
    if (group.current) {
      group.current.rotation.x = -0.32 + Math.sin(state.clock.elapsedTime * 0.18) * 0.06;
    }
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z += dt * (i % 2 === 0 ? 0.32 : -0.4) * (1 - i * 0.12);
      }
    });
  });

  const ringConfigs = [
    { radius: 0.72, count: 8, color: '#00ff88' },
    { radius: 1.22, count: 12, color: '#00ff88' },
    { radius: 1.74, count: 18, color: '#f4b400' },
    { radius: 2.28, count: 24, color: '#66d0a0' },
  ];

  return (
    <group ref={group} rotation={[-0.32, 0, 0]}>
      {/* Center node */}
      <mesh>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshBasicMaterial color="#00ff88" toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.18} toneMapped={false} />
      </mesh>
      {ringConfigs.map((cfg, ri) => (
        <group key={ri} ref={(r) => (ringRefs.current[ri] = r)}>
          <Torus args={[cfg.radius, 0.005, 8, 64]}>
            <meshBasicMaterial color={cfg.color} transparent opacity={0.32} toneMapped={false} />
          </Torus>
          {Array.from({ length: cfg.count }).map((_, i) => {
            const angle = (i / cfg.count) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * cfg.radius, Math.sin(angle) * cfg.radius, 0]}
              >
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshBasicMaterial color={cfg.color} toneMapped={false} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

function BeaconScene() {
  const NUM_RINGS = 5;
  const ringRefs = useRef([]);
  const phases = useMemo(
    () => Array.from({ length: NUM_RINGS }, (_, i) => i * (2.0 / NUM_RINGS)),
    []
  );
  const satellites = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => {
        const angle = (i / 3) * Math.PI * 2;
        return [Math.cos(angle) * 1.7, 0, Math.sin(angle) * 1.7];
      }),
    []
  );
  const satRefs = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const period = 2.4;
    ringRefs.current.forEach((ring, i) => {
      if (!ring) return;
      const localT = ((t + phases[i]) % period) / period;
      const radius = 0.35 + localT * 1.85;
      const op = (1 - localT) * 0.7;
      ring.scale.setScalar(radius);
      if (ring.material) ring.material.opacity = op;
    });
    satRefs.current.forEach((s, i) => {
      if (!s) return;
      const pulse = 0.7 + Math.sin(t * 2 + i * 1.2) * 0.3;
      s.scale.setScalar(pulse);
    });
  });

  return (
    <group rotation={[-0.42, 0, 0]}>
      {/* Central beacon */}
      <mesh>
        <sphereGeometry args={[0.2, 18, 18]} />
        <meshBasicMaterial color="#00ff88" toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.34, 18, 18]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.16} toneMapped={false} />
      </mesh>
      {/* Vertical antenna line */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 1.2, 8]} />
        <meshBasicMaterial color="#00ff88" toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#f4b400" toneMapped={false} />
      </mesh>
      {/* Expanding rings */}
      {phases.map((_, i) => (
        <mesh
          key={i}
          ref={(r) => (ringRefs.current[i] = r)}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[1, 0.012, 6, 64]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#00ff88' : '#f4b400'}
            transparent
            opacity={0.5}
            toneMapped={false}
          />
        </mesh>
      ))}
      {/* Satellite nodes */}
      {satellites.map((pos, i) => (
        <mesh key={i} ref={(r) => (satRefs.current[i] = r)} position={pos}>
          <sphereGeometry args={[0.06, 10, 10]} />
          <meshBasicMaterial color="#f4b400" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

const VARIANTS = {
  skull: SkullScene,
  vault: VaultScene,
  orbit: OrbitScene,
  beacon: BeaconScene,
};

export default function HeroWidget({ variant = 'skull' }) {
  const Scene = VARIANTS[variant] || VARIANTS.skull;
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
          <Float speed={0.55} rotationIntensity={0.3} floatIntensity={0.4}>
            <Scene />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
