import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import NeuralSphere from "./Hero/NeuralSphere";
import Particles from "./Hero/Particles";

function shouldEnable3D() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Scene controller that translates scroll progress into 3D camera/sphere motion
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

    // Smooth scroll position interpolations:
    // Shift sphere slightly left/right and deeper as user scrolls down
    const targetX = (progress < 0.25 ? 0 : progress < 0.6 ? 1.4 : -1.2) * (isMobile ? 0.4 : 1.0);
    const targetY = (Math.sin(progress * Math.PI * 2) * 0.4);
    const targetZ = -progress * 1.5;

    rigGroupRef.current.position.x = THREE.MathUtils.lerp(rigGroupRef.current.position.x, targetX, delta * 2);
    rigGroupRef.current.position.y = THREE.MathUtils.lerp(rigGroupRef.current.position.y, targetY, delta * 2);
    rigGroupRef.current.position.z = THREE.MathUtils.lerp(rigGroupRef.current.position.z, targetZ, delta * 2);

    // Subtle scroll-driven Y-rotation
    rigGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      rigGroupRef.current.rotation.y,
      progress * Math.PI * 1.5,
      delta * 2
    );
  });

  return (
    <group ref={rigGroupRef}>
      <NeuralSphere isMobile={isMobile} radius={isMobile ? 1.8 : 2.4} />
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0B1F47] to-[#162E73] z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Fullscreen 3D Canvas */}
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 7.2], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full relative z-10"
        >
          {/* Lighting */}
          <ambientLight intensity={0.85} />
          <directionalLight position={[10, 10, 10]} intensity={1.2} color="#e0f2fe" />
          <pointLight position={[-8, -8, -5]} intensity={1.5} color="#38bdf8" />
          <pointLight position={[6, -4, 6]} intensity={1.2} color="#0284c7" />

          {/* Continuous Scroll Rig & Particles */}
          <ScrollSceneRig isMobile={isMobile} />
          <Particles count={isMobile ? 120 : 250} />
        </Canvas>
      </Suspense>
    </div>
  );
}
