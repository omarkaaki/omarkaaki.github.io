import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

/**
 * NetworkGraph hero scene: a constellation of 60 nodes connected by edges,
 * with light pulses traveling along edges and occasional "threat" flashes.
 * The camera dollies back and orbits in response to scroll progress.
 */

const NODE_COUNT = 60;
const NEIGHBORS = 3;
const PULSE_COUNT = 12;

function buildGraph() {
  const nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const r = 1.4 + Math.pow(Math.random(), 0.7) * 1.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    nodes.push(new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    ));
  }
  const seen = new Set();
  const edges = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const dists = [];
    for (let j = 0; j < NODE_COUNT; j++) {
      if (i === j) continue;
      dists.push({ idx: j, d: nodes[i].distanceTo(nodes[j]) });
    }
    dists.sort((a, b) => a.d - b.d);
    for (let k = 0; k < NEIGHBORS; k++) {
      const j = dists[k].idx;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([i, j]);
      }
    }
  }
  return { nodes, edges };
}

function Edges({ nodes, edges }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      arr[i * 6] = nodes[a].x;
      arr[i * 6 + 1] = nodes[a].y;
      arr[i * 6 + 2] = nodes[a].z;
      arr[i * 6 + 3] = nodes[b].x;
      arr[i * 6 + 4] = nodes[b].y;
      arr[i * 6 + 5] = nodes[b].z;
    });
    return arr;
  }, [nodes, edges]);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.material.opacity = 0.18 + Math.sin(t * 0.6) * 0.04;
    }
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#d62c1a"
        transparent
        opacity={0.22}
        toneMapped={false}
      />
    </lineSegments>
  );
}

function Nodes({ nodes }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const phases = useMemo(() => nodes.map(() => Math.random() * Math.PI * 2), [nodes]);
  const alerts = useRef(nodes.map(() => 0));
  const colors = useMemo(() => {
    // Mr. Robot palette: dominant red, amber accent, occasional gray.
    const palette = [
      new THREE.Color('#d62c1a'), // signal red
      new THREE.Color('#d62c1a'),
      new THREE.Color('#f4b400'), // CRT amber
      new THREE.Color('#888888'), // muted gray
    ];
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((_, i) => {
      const c = palette[i % palette.length];
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    });
    return arr;
  }, [nodes]);

  useEffect(() => {
    if (!meshRef.current) return;
    nodes.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [nodes, dummy]);

  useFrame((state, dt) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const tmpColor = new THREE.Color();
    nodes.forEach((p, i) => {
      const breathe = 1 + Math.sin(t * 1.6 + phases[i]) * 0.18;
      let scale = breathe;
      if (alerts.current[i] > 0) {
        alerts.current[i] -= dt;
        scale *= 1.9;
        // Bright white-hot flash for the "alert" — pops against the red graph
        tmpColor.set('#ffffff');
      } else {
        if (Math.random() < 0.00045) {
          alerts.current[i] = 0.55;
        }
        tmpColor.setRGB(
          colors[i * 3],
          colors[i * 3 + 1],
          colors[i * 3 + 2]
        );
      }
      dummy.position.copy(p);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, tmpColor);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, nodes.length]}>
      <sphereGeometry args={[0.055, 12, 12]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

function Pulses({ nodes, edges }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const pulseColor = useMemo(() => new THREE.Color('#ffffff'), []);

  const pulses = useMemo(() =>
    Array.from({ length: PULSE_COUNT }, () => ({
      edge: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      speed: 0.35 + Math.random() * 0.5,
    })),
    [edges.length]
  );

  useFrame((_, dt) => {
    if (!meshRef.current) return;
    pulses.forEach((p, i) => {
      p.t += dt * p.speed;
      if (p.t > 1) {
        p.t = 0;
        p.edge = Math.floor(Math.random() * edges.length);
        p.speed = 0.35 + Math.random() * 0.5;
      }
      const [a, b] = edges[p.edge];
      dummy.position.lerpVectors(nodes[a], nodes[b], p.t);
      // brightness peaks mid-edge for a flash
      const brightness = Math.sin(p.t * Math.PI);
      dummy.scale.setScalar(0.5 + brightness * 0.9);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      // Pulses are amber CRT-glow → bright white at peak
      meshRef.current.setColorAt(
        i,
        pulseColor.setRGB(brightness, brightness * 0.78, brightness * 0.32)
      );
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, PULSE_COUNT]}>
      <sphereGeometry args={[0.07, 10, 10]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

function CameraRig() {
  const { camera, mouse } = useThree();
  const scrollRef = useRef(0);
  const targetRef = useRef(new THREE.Vector3());

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? Math.min(1, window.scrollY / Math.min(max, window.innerHeight * 2)) : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const s = scrollRef.current;

    // Scroll-driven dolly: pull back as you scroll
    const targetZ = 5.6 + s * 4.5;
    // Slow ambient orbit
    const orbitX = Math.sin(t * 0.06) * 1.3 + mouse.x * 0.6;
    const orbitY = Math.cos(t * 0.045) * 0.9 + mouse.y * 0.4;

    targetRef.current.set(orbitX, orbitY, targetZ);
    camera.position.lerp(targetRef.current, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 3, 3]} intensity={1.3} color="#d62c1a" />
      <pointLight position={[-3, -2, -2]} intensity={0.7} color="#f4b400" />
      <pointLight position={[0, -3, 2]} intensity={0.4} color="#ffffff" />
    </>
  );
}

function GraphScene() {
  const { nodes, edges } = useMemo(() => buildGraph(), []);
  return (
    <Float speed={0.7} rotationIntensity={0.25} floatIntensity={0.45}>
      <Edges nodes={nodes} edges={edges} />
      <Nodes nodes={nodes} />
      <Pulses nodes={nodes} edges={edges} />
    </Float>
  );
}

export default function Scene3D() {
  const [opacity, setOpacity] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      // Full at top, fade to 0.15 by 1.6vh, 0 by 2.4vh
      let o;
      if (y < vh * 0.6) {
        o = 1;
      } else if (y < vh * 1.6) {
        o = 1 - ((y - vh * 0.6) / vh) * 0.85;
      } else if (y < vh * 2.4) {
        o = 0.15 - ((y - vh * 1.6) / (vh * 0.8)) * 0.15;
      } else {
        o = 0;
      }
      setOpacity(Math.max(0, Math.min(1, o)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="scene3d-fixed"
      style={{ opacity, visibility: opacity === 0 ? 'hidden' : 'visible' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 55 }}
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <Lights />
          <GraphScene />
          <Stars radius={70} depth={28} count={1200} factor={3.2} fade speed={0.5} />
          {!reducedMotion && <CameraRig />}
          <EffectComposer>
            <Bloom
              intensity={0.85}
              luminanceThreshold={0.18}
              luminanceSmoothing={0.85}
              mipmapBlur
            />
            <ChromaticAberration
              offset={[0.0009, 0.0009]}
              blendFunction={BlendFunction.NORMAL}
            />
            <Vignette offset={0.25} darkness={0.55} eskil={false} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
