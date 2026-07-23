import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function shouldEnable3D() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Fallback skeleton loader while 3D scene mounts
function Hero3DFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none" aria-hidden="true">
      <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-3xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm animate-pulse flex items-center justify-center">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 animate-spin" style={{ animationDuration: '8s' }} />
      </div>
    </div>
  );
}

// Interactive 3D Cube Component
function InteractiveCube({ isClicked, setIsClicked }) {
  const outerCubeRef = useRef(null);
  const innerCoreRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Target values for smooth lerp animations
  const targetScale = hovered ? 1.12 : isClicked ? 1.25 : 1.0;
  const currentScale = useRef(1.0);
  const spinSpeed = useRef(0.5);

  useFrame((state, delta) => {
    // Smooth scale interpolation
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, delta * 6);

    if (outerCubeRef.current) {
      outerCubeRef.current.scale.setScalar(currentScale.current);

      // Rotate outer cube
      const speedMultiplier = isClicked ? 3.5 : hovered ? 1.5 : 1.0;
      spinSpeed.current = THREE.MathUtils.lerp(spinSpeed.current, speedMultiplier, delta * 4);

      outerCubeRef.current.rotation.x += delta * 0.4 * spinSpeed.current;
      outerCubeRef.current.rotation.y += delta * 0.6 * spinSpeed.current;
    }

    if (innerCoreRef.current) {
      // Counter rotation for inner element
      innerCoreRef.current.rotation.x -= delta * 0.8;
      innerCoreRef.current.rotation.z += delta * 0.9;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3;
      ringRef.current.rotation.y += delta * 0.5;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setIsClicked((prev) => !prev);
  };

  return (
    <group>
      {/* Floating Wrapper */}
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>

        {/* Outer Main Cube */}
        <mesh
          ref={outerCubeRef}
          onClick={handleClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[2.2, 2.2, 2.2]} />
          <meshPhysicalMaterial
            color={isClicked ? "#38bdf8" : hovered ? "#60a5fa" : "#2563eb"}
            roughness={0.15}
            metalness={0.85}
            transmission={0.3}
            thickness={0.6}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive={isClicked ? "#0284c7" : hovered ? "#1d4ed8" : "#1e3a8a"}
            emissiveIntensity={isClicked ? 0.8 : hovered ? 0.5 : 0.2}
            wireframe={false}
          />

          {/* Wireframe accent overlay */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(2.22, 2.22, 2.22)]} />
            <lineBasicMaterial color={isClicked ? "#7dd3fc" : hovered ? "#93c5fd" : "#60a5fa"} linewidth={2} />
          </lineSegments>
        </mesh>

        {/* Inner Glowing Core */}
        <mesh ref={innerCoreRef} scale={currentScale.current * 0.85}>
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color={isClicked ? "#a5f3fc" : "#38bdf8"}
            emissive={isClicked ? "#06b6d4" : "#0284c7"}
            emissiveIntensity={1.8}
            wireframe={true}
          />
        </mesh>

        {/* Orbital Ring Accent */}
        <mesh ref={ringRef} scale={1.85}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={0.9}
          />
        </mesh>

        {/* Floating Mini Background Orbs/Cubes */}
        <Float speed={4} floatIntensity={1.2} rotationIntensity={1}>
          <mesh position={[-2.4, 1.8, -1.2]} scale={0.35}>
            <boxGeometry />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} wireframe />
          </mesh>
        </Float>

        <Float speed={3} floatIntensity={1.5} rotationIntensity={1.2}>
          <mesh position={[2.5, -1.6, -0.8]} scale={0.4}>
            <octahedronGeometry />
            <meshStandardMaterial color="#60a5fa" emissive="#1d4ed8" emissiveIntensity={0.8} />
          </mesh>
        </Float>

      </Float>
    </group>
  );
}

export default function ThreeScene() {
  const [isClicked, setIsClicked] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!shouldEnable3D()) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!shouldEnable3D()) {
    return <Hero3DFallback />;
  }

  return (
    <div ref={containerRef} className="relative w-full h-full pointer-events-auto">
      {canRender ? (
        <Suspense fallback={<Hero3DFallback />}>
          <Canvas
            camera={{ position: [0, 0, 6.5], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Lighting Setup */}
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} color="#e0f2fe" castShadow />
            <pointLight position={[-10, -10, -5]} intensity={1.2} color="#3b82f6" />
            <pointLight position={[5, -5, 5]} intensity={1.0} color="#06b6d4" />

            {/* Sparkles / Ambient Particles */}
            <Sparkles count={45} scale={8} size={2.5} speed={0.4} color="#60a5fa" opacity={0.6} />

            {/* Main Interactive Cube */}
            <InteractiveCube isClicked={isClicked} setIsClicked={setIsClicked} />

            {/* Contact Shadow on Floor */}
            <ContactShadows
              position={[0, -2.4, 0]}
              opacity={0.6}
              scale={8}
              blur={2.5}
              far={4}
              color="#0284c7"
            />

            {/* Mouse Drag Orbit Controls */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={!isClicked}
              autoRotateSpeed={1.2}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 3}
              rotateSpeed={0.8}
            />
          </Canvas>

          {/* Interactive Hint Overlay */}
          <div className="absolute bottom-2 right-4 sm:right-6 pointer-events-none select-none text-[11px] font-mono text-blue-300/60 bg-blue-950/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-blue-500/20">
            {isClicked ? "⚡ Hyper Spin Active (Click to reset)" : "🖱️ Drag to rotate • Click cube to interact"}
          </div>
        </Suspense>
      ) : (
        <Hero3DFallback />
      )}
    </div>
  );
}
