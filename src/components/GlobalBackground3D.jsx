import React, { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import NeuralSphere from "./Hero/NeuralSphere";
import Particles from "./Hero/Particles";

function shouldEnable3D() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Far Space background stars layer
function FarSpaceStars({ count = 1200 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#7dd3fc"),
      new THREE.Color("#38bdf8"),
      new THREE.Color("#a78bfa"),
    ];

    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.randFloat(18, 50);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.004;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.09} vertexColors transparent opacity={0.65} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

// Scene controller that translates scroll progress into 3D camera/sphere motion across cosmic sectors
function ScrollSceneRig({ isMobile }) {
  const rigGroupRef = useRef(null);
  const scrollRatio = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        scrollRatio.current = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (!rigGroupRef.current) return;

    const progress = scrollRatio.current;

    // Environmental Journey Trajectory:
    // Hero (0.0): Centered cosmic entity
    // About (0.25): Shifts right to frame the Planetary Profile
    // Projects (0.55): Shifts left to frame the Project Solar System
    // Certificates (0.78): Centers slightly deeper in Cosmic Archive
    // Contact (1.0): Shifts into Transmission Uplink
    const targetX = (progress < 0.2 ? 0 : progress < 0.5 ? 1.5 : progress < 0.8 ? -1.3 : 0.8) * (isMobile ? 0.35 : 1.0);
    const targetY = (Math.sin(progress * Math.PI * 2.2) * 0.45);
    const targetZ = -progress * 1.8;

    rigGroupRef.current.position.x = THREE.MathUtils.lerp(rigGroupRef.current.position.x, targetX, delta * 2.2);
    rigGroupRef.current.position.y = THREE.MathUtils.lerp(rigGroupRef.current.position.y, targetY, delta * 2.2);
    rigGroupRef.current.position.z = THREE.MathUtils.lerp(rigGroupRef.current.position.z, targetZ, delta * 2.2);

    // Continuous Celestial Rotation with scroll acceleration
    rigGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      rigGroupRef.current.rotation.y,
      progress * Math.PI * 1.8 + state.clock.elapsedTime * 0.05,
      delta * 2
    );
  });

  return (
    <group ref={rigGroupRef}>
      <NeuralSphere isMobile={isMobile} radius={isMobile ? 1.7 : 2.3} />
    </group>
  );
}

export default function GlobalBackground3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!shouldEnable3D()) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!shouldEnable3D()) return null;

  return (
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-none overflow-hidden select-none">
      {/* Background Gradient & Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02030a] via-[#050816] to-[#0b1026] z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-[650px] h-[650px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Fullscreen 3D Canvas */}
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 7.2], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          className="w-full h-full relative z-10"
        >
          {/* Lighting */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 10]} intensity={1.3} color="#e0f2fe" />
          <pointLight position={[-8, -8, -5]} intensity={1.5} color="#38bdf8" />
          <pointLight position={[6, -4, 6]} intensity={1.2} color="#22d3ee" />

          {/* Layer 1: Far Space Stars */}
          <FarSpaceStars count={isMobile ? 600 : 1200} />

          {/* Layer 2: Mid-Space Scroll Rig (Celestial Entity) */}
          <ScrollSceneRig isMobile={isMobile} />

          {/* Layer 3: Foreground Interactive Star Dust */}
          <Particles count={isMobile ? 100 : 220} />
        </Canvas>
      </Suspense>
    </div>
  );
}
