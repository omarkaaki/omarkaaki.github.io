import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * The core 3D scene: a wireframe icosahedron core with orbiting rings,
 * data-shard particles, and a starfield. Built for atmosphere, not literalism.
 */

function CoreShield() {
  const wireRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (wireRef.current) {
      wireRef.current.rotation.x += delta * 0.15;
      wireRef.current.rotation.y += delta * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.3;
      innerRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <group>
      {/* Outer wireframe shell — the "shield" */}
      <Icosahedron ref={wireRef} args={[1.6, 1]}>
        <meshBasicMaterial
          color="#00ffc8"
          wireframe
          transparent
          opacity={0.55}
        />
      </Icosahedron>

      {/* Inner distorting core — restless, organic */}
      <Icosahedron ref={innerRef} args={[0.85, 4]}>
        <MeshDistortMaterial
          color="#6e8eff"
          emissive="#00ffc8"
          emissiveIntensity={0.4}
          distort={0.4}
          speed={2}
          metalness={0.7}
          roughness={0.2}
        />
      </Icosahedron>

      {/* Glow halo */}
      <Icosahedron args={[1.6, 1]}>
        <meshBasicMaterial
          color="#00ffc8"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Icosahedron>
    </group>
  );
}

function OrbitRing({ radius = 2.4, tilt = 0, color = '#00ffc8', speed = 0.5 }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <Torus
      ref={ref}
      args={[radius, 0.008, 16, 128]}
      rotation={[Math.PI / 2 + tilt, 0, 0]}
    >
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </Torus>
  );
}

function DataShards({ count = 60 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread shards in a sphere around the core
      const radius = 3 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ffc8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#00ffc8" />
      <pointLight position={[-3, -2, -2]} intensity={0.8} color="#a855f7" />
      <pointLight position={[0, -3, 2]} intensity={0.5} color="#6e8eff" />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="scene3d-wrap" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Lights />

          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.5}>
            <CoreShield />
          </Float>

          <OrbitRing radius={2.2} tilt={0.15} color="#00ffc8" speed={0.3} />
          <OrbitRing radius={2.6} tilt={-0.4} color="#a855f7" speed={-0.45} />
          <OrbitRing radius={3.0} tilt={0.6} color="#6e8eff" speed={0.2} />

          <DataShards count={80} />

          <Stars radius={50} depth={20} count={1500} factor={3} fade speed={1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
