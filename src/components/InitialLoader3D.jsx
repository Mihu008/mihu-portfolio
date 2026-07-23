import { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import logoImg from "../assets/LOGO.png";

/* ─── Logo Nucleus ───────────────────────────────────────────── */
function LogoNucleus() {
  const meshRef = useRef();
  const glowRef = useRef();
  const texture = useTexture(logoImg);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      // Gentle bob + very slow Y rotation
      meshRef.current.position.y = Math.sin(t * 1.2) * 0.06;
      meshRef.current.rotation.y = t * 0.3;
    }
    if (glowRef.current) {
      // Pulsing glow behind the logo
      const s = 1.1 + Math.sin(t * 2) * 0.08;
      glowRef.current.scale.set(s, s, 1);
      glowRef.current.material.opacity = 0.18 + Math.sin(t * 2) * 0.08;
    }
  });

  return (
    <group>
      {/* Glow disc behind logo */}
      <mesh ref={glowRef}>
        <circleGeometry args={[1.1, 64]} />
        <meshBasicMaterial color="#00aaff" transparent opacity={0.18} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      {/* Logo plane */}
      <mesh ref={meshRef}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ─── Single Atomic Orbit (ring + electron) ──────────────────── */
function AtomicOrbit({ tiltX = 0, tiltZ = 0, radius = 2.2, speed = 1, color = "#00eeff", electronSize = 0.1, ringOpacity = 0.55 }) {
  const electronRef = useRef();
  const trailRefs = useRef([]);
  const TRAIL = 8;

  // Pre-build trail positions
  const trailData = useMemo(() =>
    Array.from({ length: TRAIL }, (_, i) => i),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;

    if (electronRef.current) {
      electronRef.current.position.set(x, 0, z);
    }

    // Trail spheres — each slightly behind in time
    trailRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const offset = t - (i + 1) * 0.15;
      ref.position.set(Math.cos(offset) * radius, 0, Math.sin(offset) * radius);
      ref.material.opacity = (1 - (i + 1) / TRAIL) * 0.5;
    });
  });

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      {/* The orbital ring (torus) */}
      <mesh>
        <torusGeometry args={[radius, 0.012, 8, 140]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          transparent
          opacity={ringOpacity}
        />
      </mesh>

      {/* Trail */}
      {trailData.map((i) => (
        <mesh
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
        >
          <sphereGeometry args={[electronSize * (1 - i / TRAIL) * 0.7, 8, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={3}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Electron */}
      <mesh ref={electronRef}>
        <sphereGeometry args={[electronSize, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={6}
        />
      </mesh>
    </group>
  );
}

/* ─── Full Atom Scene ────────────────────────────────────────── */
function AtomScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 4]} intensity={4} color="#ffffff" />
      <pointLight position={[3, 3, 3]} intensity={5} color="#00ccff" />
      <pointLight position={[-3, -3, -2]} intensity={3} color="#aa44ff" />

      <Sparkles count={50} scale={7} size={1.8} speed={0.25} color="#88ccff" opacity={0.6} />

      {/* Nucleus */}
      <LogoNucleus />

      {/* Orbit 1 — equatorial, cyan, fast */}
      <AtomicOrbit
        tiltX={0}
        tiltZ={0}
        radius={2.1}
        speed={1.1}
        color="#00eeff"
        electronSize={0.11}
        ringOpacity={0.5}
      />

      {/* Orbit 2 — tilted 60°, violet, medium */}
      <AtomicOrbit
        tiltX={Math.PI / 3}
        tiltZ={Math.PI / 6}
        radius={2.3}
        speed={0.75}
        color="#a855f7"
        electronSize={0.10}
        ringOpacity={0.45}
      />

      {/* Orbit 3 — tilted 120°, pink, slow */}
      <AtomicOrbit
        tiltX={Math.PI / 6}
        tiltZ={Math.PI * 0.6}
        radius={2.0}
        speed={1.4}
        color="#f472b6"
        electronSize={0.09}
        ringOpacity={0.4}
      />
    </>
  );
}



/* ─── Main Loader ────────────────────────────────────────────── */
export default function InitialLoader3D() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3;
      });
    }, 80);

    const fadeTimer = setTimeout(() => setIsFading(true), 2800);
    const removeTimer = setTimeout(() => setIsLoading(false), 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "radial-gradient(ellipse at 50% 50%, #0d0d2b 0%, #07071a 55%, #000000 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.8s ease",
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? "none" : "all",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow blobs */}
      <div style={{
        position: "absolute",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,120,255,0.1) 0%, transparent 70%)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        width: 360,
        height: 360,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(100,0,255,0.08) 0%, transparent 70%)",
        top: "45%",
        left: "55%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }} />

      {/* 3D Canvas */}
      <div style={{ width: 340, height: 340, position: "relative" }}>
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 38 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <AtomScene />
        </Canvas>
        {/* Outer glow ring overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          boxShadow: "0 0 100px rgba(0,150,255,0.12)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Text & Progress */}
      <div style={{
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 320,
        padding: "0 24px",
      }}>
        <h2 style={{
          margin: 0,
          fontSize: 15,
          fontWeight: 800,
          fontFamily: "'Courier New', monospace",
          letterSpacing: "0.22em",
          background: "linear-gradient(90deg, #7dd3fc, #a78bfa, #22d3ee, #93c5fd, #7dd3fc)",
          backgroundSize: "250% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "shimmer 3s linear infinite",
        }}>
          MIHIR SINGH NETAM
        </h2>

        <p style={{
          margin: "6px 0 14px",
          fontSize: 10,
          fontFamily: "'Courier New', monospace",
          letterSpacing: "0.18em",
          color: "rgba(100,220,255,0.65)",
          textTransform: "uppercase",
          animation: "blink 2s ease-in-out infinite",
        }}>
          Initializing System Architecture...
        </p>

        {/* Progress bar */}
        <div style={{
          width: "100%",
          height: 2,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 4,
          border: "1px solid rgba(0,180,255,0.15)",
          overflow: "hidden",
          boxShadow: "0 0 10px rgba(0,200,255,0.12)",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #3b82f6, #06b6d4, #a78bfa)",
            borderRadius: 4,
            transition: "width 0.1s linear",
            boxShadow: "0 0 12px rgba(6,182,212,0.9)",
          }} />
        </div>

        <span style={{
          marginTop: 7,
          fontSize: 10,
          fontFamily: "'Courier New', monospace",
          color: "rgba(6,182,212,0.55)",
          letterSpacing: "0.12em",
        }}>
          {progress}%
        </span>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 250% center; }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.45; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
