import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import logoImg from "../assets/optimized/LOGO.webp";

/* ─── Logo Nucleus ───────────────────────────────────────────── */
function LogoNucleus({ isHovered }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const texture = useTexture(logoImg);

  const hoverAnimRef = useRef({ scale: 1, glowScale: 1.1, glowOpacity: 0.18 });

  useEffect(() => {
    gsap.to(hoverAnimRef.current, {
      scale: isHovered ? 1.2 : 1.0,
      glowScale: isHovered ? 1.7 : 1.1,
      glowOpacity: isHovered ? 0.45 : 0.18,
      duration: 0.6,
      ease: isHovered ? "back.out(2.2)" : "power2.out",
    });
  }, [isHovered]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { scale, glowScale, glowOpacity } = hoverAnimRef.current;
    if (meshRef.current) {
      // Y offset -0.16 aligns crystal globe center with (0,0,0)
      meshRef.current.position.y = -0.16 + Math.sin(t * 1.5) * 0.05;
      // Gentle 3D perspective tilt instead of full 360 Y spin (prevents edge-on paper-thin flattening)
      meshRef.current.rotation.y = Math.sin(t * (isHovered ? 1.8 : 1.0)) * 0.14;
      meshRef.current.rotation.z = Math.sin(t * 0.8) * 0.03;
      meshRef.current.scale.set(scale, scale, 1);
    }
    if (glowRef.current) {
      const pulse = Math.sin(t * 2.5) * 0.08;
      const finalGlowScale = glowScale + pulse;
      glowRef.current.scale.set(finalGlowScale, finalGlowScale, 1);
      glowRef.current.material.opacity = glowOpacity + pulse * 0.5;
    }
  });

  return (
    <group>
      {/* Glow disc behind logo */}
      <mesh ref={glowRef}>
        <circleGeometry args={[1.15, 64]} />
        <meshBasicMaterial
          color={isHovered ? "#00eeff" : "#00aaff"}
          transparent
          opacity={0.18}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Logo plane */}
      <mesh ref={meshRef}>
        <planeGeometry args={[2.25, 2.25]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ─── Single Atomic Orbit (ring + electron) ──────────────────── */
function AtomicOrbit({
  tiltX = 0,
  tiltZ = 0,
  radius = 2.2,
  speed = 1,
  color = "#00eeff",
  electronSize = 0.1,
  ringOpacity = 0.55,
  isHovered = false,
}) {
  const electronRef = useRef();
  const trailRefs = useRef([]);
  const TRAIL = 8;
  const speedMultRef = useRef({ val: 1 });

  useEffect(() => {
    gsap.to(speedMultRef.current, {
      val: isHovered ? 2.4 : 1.0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [isHovered]);

  const trailData = useMemo(() =>
    Array.from({ length: TRAIL }, (_, i) => i),
    []
  );

  useFrame((state) => {
    const effectiveSpeed = speed * speedMultRef.current.val;
    const t = state.clock.elapsedTime * effectiveSpeed;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;

    if (electronRef.current) {
      electronRef.current.position.set(x, 0, z);
    }

    trailRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const offset = t - (i + 1) * (0.15 / speedMultRef.current.val);
      ref.position.set(Math.cos(offset) * radius, 0, Math.sin(offset) * radius);
      ref.material.opacity = (1 - (i + 1) / TRAIL) * (isHovered ? 0.75 : 0.5);
    });
  });

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      {/* The orbital ring */}
      <mesh>
        <torusGeometry args={[radius, isHovered ? 0.018 : 0.012, 8, 140]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 4.5 : 2}
          transparent
          opacity={isHovered ? Math.min(ringOpacity + 0.25, 0.9) : ringOpacity}
        />
      </mesh>

      {/* Trail */}
      {trailData.map((i) => (
        <mesh key={i} ref={(el) => (trailRefs.current[i] = el)}>
          <sphereGeometry args={[electronSize * (1 - i / TRAIL) * 0.7, 8, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isHovered ? 5.5 : 3}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Electron */}
      <mesh ref={electronRef}>
        <sphereGeometry args={[electronSize * (isHovered ? 1.35 : 1.0), 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 10 : 6}
        />
      </mesh>
    </group>
  );
}

/* ─── Full Atom Scene ────────────────────────────────────────── */
function AtomScene({ mousePosRef, isHovered }) {
  const sceneGroupRef = useRef();
  const sparklesAnimRef = useRef({ count: 50, scale: 7, size: 1.8, speed: 0.25 });

  useEffect(() => {
    gsap.to(sparklesAnimRef.current, {
      count: isHovered ? 140 : 50,
      scale: isHovered ? 9.5 : 7,
      size: isHovered ? 3.2 : 1.8,
      speed: isHovered ? 0.85 : 0.25,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [isHovered]);

  useFrame(() => {
    if (sceneGroupRef.current && mousePosRef.current) {
      const targetRotY = mousePosRef.current.x * 0.45;
      const targetRotX = -mousePosRef.current.y * 0.35;
      sceneGroupRef.current.rotation.y += (targetRotY - sceneGroupRef.current.rotation.y) * 0.08;
      sceneGroupRef.current.rotation.x += (targetRotX - sceneGroupRef.current.rotation.x) * 0.08;
    }
  });

  return (
    <group ref={sceneGroupRef}>
      <ambientLight intensity={isHovered ? 0.75 : 0.4} />
      <pointLight position={[0, 0, 4]} intensity={isHovered ? 7.5 : 4} color="#ffffff" />
      <pointLight position={[3, 3, 3]} intensity={isHovered ? 8.5 : 5} color="#00ccff" />
      <pointLight position={[-3, -3, -2]} intensity={isHovered ? 5.5 : 3} color="#aa44ff" />

      <Sparkles
        count={Math.round(sparklesAnimRef.current.count)}
        scale={sparklesAnimRef.current.scale}
        size={sparklesAnimRef.current.size}
        speed={sparklesAnimRef.current.speed}
        color={isHovered ? "#38bdf8" : "#88ccff"}
        opacity={isHovered ? 0.85 : 0.6}
      />

      <LogoNucleus isHovered={isHovered} />

      <AtomicOrbit
        tiltX={0}
        tiltZ={0}
        radius={2.1}
        speed={1.1}
        color="#00eeff"
        electronSize={0.11}
        ringOpacity={0.5}
        isHovered={isHovered}
      />

      <AtomicOrbit
        tiltX={Math.PI / 3}
        tiltZ={Math.PI / 6}
        radius={2.3}
        speed={0.75}
        color="#a855f7"
        electronSize={0.10}
        ringOpacity={0.45}
        isHovered={isHovered}
      />

      <AtomicOrbit
        tiltX={Math.PI / 6}
        tiltZ={Math.PI * 0.6}
        radius={2.0}
        speed={1.4}
        color="#f472b6"
        electronSize={0.09}
        ringOpacity={0.4}
        isHovered={isHovered}
      />
    </group>
  );
}

/* ─── Main Loader ────────────────────────────────────────────── */
export default function InitialLoader3D() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const loaderRef = useRef();
  const canvasWrapperRef = useRef();
  const sparklesLayerRef = useRef();
  const textWrapperRef = useRef();
  const logoTitleRef = useRef();
  const subtitleRef = useRef();
  const progressTrackRef = useRef();
  const progressBarRef = useRef();
  const percentTextRef = useRef();

  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastSpawnRef = useRef(0);

  // Spawn dynamic sparkle DOM particle
  const spawnSparkle = useCallback((x, y, isBurst = false) => {
    if (!sparklesLayerRef.current) return;

    const particle = document.createElement("span");
    const shapes = ["✦", "✧", "★", "✴", "•", "✨"];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const colors = ["#00eeff", "#a855f7", "#f472b6", "#38bdf8", "#ffffff", "#c084fc", "#7dd3fc"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.innerText = shape;
    particle.style.position = "fixed";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.color = color;
    particle.style.fontSize = `${Math.floor(Math.random() * 12 + 10)}px`;
    particle.style.pointerEvents = "none";
    particle.style.userSelect = "none";
    particle.style.zIndex = "105";
    particle.style.transform = "translate(-50%, -50%)";
    particle.style.textShadow = `0 0 10px ${color}`;

    sparklesLayerRef.current.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const dist = isBurst ? Math.random() * 90 + 35 : Math.random() * 45 + 15;
    const targetX = Math.cos(angle) * dist;
    const targetY = Math.sin(angle) * dist;
    const duration = isBurst ? Math.random() * 0.7 + 0.5 : Math.random() * 0.5 + 0.4;

    gsap.fromTo(
      particle,
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: isBurst ? Math.random() * 1.3 + 0.6 : Math.random() * 0.8 + 0.4,
        rotation: Math.random() * 90 - 45,
      },
      {
        x: targetX,
        y: targetY - (isBurst ? 18 : 8),
        opacity: 0,
        scale: 0,
        rotation: Math.random() * 360,
        duration: duration,
        ease: "power2.out",
        onComplete: () => {
          particle.remove();
        },
      }
    );
  }, []);

  // Entrance & Exit Timelines
  useEffect(() => {
    const tl = gsap.timeline();

    // Set initial states
    gsap.set(canvasWrapperRef.current, { scale: 0.6, opacity: 0 });
    gsap.set(logoTitleRef.current, { opacity: 0, y: 15, letterSpacing: "0.4em" });
    gsap.set(subtitleRef.current, { opacity: 0, y: 10 });
    gsap.set(progressTrackRef.current, { scaleX: 0, transformOrigin: "center center" });
    gsap.set(percentTextRef.current, { opacity: 0 });

    // Staggered Entrance Animation
    tl.to(loaderRef.current, { opacity: 1, duration: 0.4, ease: "power1.out" })
      .to(canvasWrapperRef.current, { scale: 1, opacity: 1, duration: 1.0, ease: "back.out(1.4)" }, "-=0.2")
      .to(logoTitleRef.current, { opacity: 1, y: 0, letterSpacing: "0.22em", duration: 0.8, ease: "power3.out" }, "-=0.6")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.5")
      .to(progressTrackRef.current, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, "-=0.4")
      .to(percentTextRef.current, { opacity: 1, duration: 0.4 }, "-=0.2");

    // Progress counter animation from 0% to 100%
    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 100,
      duration: 2.6,
      ease: "power2.inOut",
      onUpdate: () => {
        const currentVal = Math.round(progressObj.value);
        setProgress(currentVal);
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${currentVal}%`;
        }
      },
      onComplete: () => {
        // Exit timeline upon completion
        const exitTl = gsap.timeline({
          onComplete: () => setIsLoading(false),
        });

        exitTl
          .to(canvasWrapperRef.current, {
            scale: 1.18,
            opacity: 0,
            duration: 0.6,
            ease: "power3.in",
          })
          .to(
            textWrapperRef.current,
            {
              y: -20,
              opacity: 0,
              duration: 0.4,
              ease: "power2.in",
            },
            "-=0.5"
          )
          .to(
            loaderRef.current,
            {
              opacity: 0,
              filter: "blur(12px)",
              duration: 0.7,
              ease: "power2.inOut",
            },
            "-=0.3"
          );
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Periodic Center Sparkle Burst when Hovered
  useEffect(() => {
    if (!isHovered || !canvasWrapperRef.current) return;

    const interval = setInterval(() => {
      if (canvasWrapperRef.current) {
        const rect = canvasWrapperRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 3; i++) {
          spawnSparkle(centerX, centerY, true);
        }
      }
    }, 180);

    return () => clearInterval(interval);
  }, [isHovered, spawnSparkle]);

  // Handle Mouse Movement for Parallax & Sparkles
  const handleMouseMove = (e) => {
    if (!loaderRef.current) return;
    const rect = loaderRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    const normX = (relX - 0.5) * 2;
    const normY = (relY - 0.5) * 2;

    gsap.to(mousePosRef.current, {
      x: normX,
      y: normY,
      duration: 0.5,
      ease: "power2.out",
    });

    const now = Date.now();
    if (now - lastSpawnRef.current > 45) {
      spawnSparkle(e.clientX, e.clientY, isHovered);
      lastSpawnRef.current = now;
    }
  };

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "radial-gradient(ellipse at 50% 50%, #0d0d2b 0%, #07071a 55%, #000000 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Sparkles Particle Layer Overlay */}
      <div ref={sparklesLayerRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 105 }} />

      {/* Ambient glow blobs */}
      <div
        style={{
          position: "absolute",
          width: 550,
          height: 550,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,180,255,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          transition: "transform 0.3s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(160,50,255,0.1) 0%, transparent 70%)",
          top: "45%",
          left: "55%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* 3D Canvas */}
      <div
        ref={canvasWrapperRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: 340,
          height: 340,
          position: "relative",
          cursor: "pointer",
          transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 38 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <AtomScene mousePosRef={mousePosRef} isHovered={isHovered} />
        </Canvas>
        {/* Outer glow ring overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            boxShadow: isHovered
              ? "0 0 120px rgba(0,220,255,0.3), inset 0 0 60px rgba(168,85,247,0.2)"
              : "0 0 100px rgba(0,150,255,0.12)",
            transition: "box-shadow 0.5s ease",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Text & Progress */}
      <div
        ref={textWrapperRef}
        style={{
          marginTop: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 320,
          padding: "0 24px",
        }}
      >
        <h2
          ref={logoTitleRef}
          style={{
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
          }}
        >
          MIHIR SINGH NETAM
        </h2>

        <p
          ref={subtitleRef}
          style={{
            margin: "6px 0 14px",
            fontSize: 10,
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.18em",
            color: isHovered ? "rgba(56,189,248,0.9)" : "rgba(100,220,255,0.65)",
            textTransform: "uppercase",
            animation: "blink 2s ease-in-out infinite",
            transition: "color 0.3s ease",
          }}
        >
          Initializing System Architecture...
        </p>

        {/* Progress bar track */}
        <div
          ref={progressTrackRef}
          style={{
            width: "100%",
            height: 2,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 4,
            border: "1px solid rgba(0,180,255,0.15)",
            overflow: "hidden",
            boxShadow: isHovered ? "0 0 16px rgba(0,220,255,0.3)" : "0 0 10px rgba(0,200,255,0.12)",
            transition: "box-shadow 0.3s ease",
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              height: "100%",
              width: "0%",
              background: "linear-gradient(90deg, #3b82f6, #06b6d4, #a78bfa)",
              borderRadius: 4,
              boxShadow: "0 0 12px rgba(6,182,212,0.9)",
            }}
          />
        </div>

        <span
          ref={percentTextRef}
          style={{
            marginTop: 7,
            fontSize: 10,
            fontFamily: "'Courier New', monospace",
            color: isHovered ? "rgba(6,182,212,0.9)" : "rgba(6,182,212,0.55)",
            letterSpacing: "0.12em",
            transition: "color 0.3s ease",
          }}
        >
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
