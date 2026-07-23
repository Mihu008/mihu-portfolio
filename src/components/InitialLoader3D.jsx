import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useTexture, Sparkles } from "@react-three/drei";
import logoImg from "../assets/LOGO.png";

function Logo3D() {
  const meshRef = useRef();
  const texture = useTexture(logoImg);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={2.4}>
        <planeGeometry args={[1.6, 1.6]} />
        <meshBasicMaterial
          map={texture}
          transparent
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

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
        return prev + 4;
      });
    }, 80);

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2400);

    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#050816] flex flex-col items-center justify-center transition-opacity duration-700 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 3D Canvas */}
      <div className="w-64 h-64 sm:w-80 sm:h-80 relative">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
          <ambientLight intensity={1.2} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#3ebeff" />
          <Sparkles count={40} scale={4} size={3} speed={0.4} color="#06b6d4" />
          <Logo3D />
        </Canvas>
      </div>

      {/* Loading Progress & Label */}
      <div className="mt-4 flex flex-col items-center text-center px-4 max-w-xs w-full">
        <h2 className="text-white text-lg font-extrabold font-mono tracking-widest bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent mb-1">
          MIHIR SINGH NETAM
        </h2>
        <p className="text-cyan-400/80 font-mono text-[11px] tracking-wider mb-4 animate-pulse">
          INITIALIZING SYSTEM ARCHITECTURE...
        </p>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-900 rounded-full border border-blue-500/30 overflow-hidden shadow-[0_0_10px_rgba(6,182,212,0.3)]">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-300 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
