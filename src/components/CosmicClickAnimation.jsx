import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * CosmicClickAnimation
 * Zero extra bundle size - leverages already installed GSAP.
 * Spawns a high-tech cosmic shockwave with dual neon rings, core flash,
 * and radial energy sparks on pointerdown.
 */
export default function CosmicClickAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const handlePointerDown = (e) => {
      if (prefersReducedMotion.matches) return;

      const { clientX: x, clientY: y } = e;

      // Spawn burst container at click coordinates
      const burst = document.createElement("div");
      burst.className = "absolute pointer-events-none";
      burst.style.left = `${x}px`;
      burst.style.top = `${y}px`;
      burst.style.transform = "translate(-50%, -50%)";

      // 1. Central Cosmic Flash
      const core = document.createElement("div");
      core.className = "absolute rounded-full -translate-x-1/2 -translate-y-1/2";
      core.style.width = "12px";
      core.style.height = "12px";
      core.style.background = "radial-gradient(circle, #ffffff 0%, #22d3ee 60%, transparent 100%)";
      core.style.boxShadow = "0 0 16px #22d3ee, 0 0 30px #8b5cf6";
      burst.appendChild(core);

      // 2. Primary Cyan Shockwave Ring
      const ringCyan = document.createElement("div");
      ringCyan.className = "absolute rounded-full -translate-x-1/2 -translate-y-1/2";
      ringCyan.style.width = "40px";
      ringCyan.style.height = "40px";
      ringCyan.style.border = "1.5px solid #22d3ee";
      ringCyan.style.boxShadow = "0 0 14px rgba(34, 211, 238, 0.7), inset 0 0 10px rgba(34, 211, 238, 0.3)";
      burst.appendChild(ringCyan);

      // 3. Secondary Nebula Violet Shockwave Ring (Echo)
      const ringViolet = document.createElement("div");
      ringViolet.className = "absolute rounded-full -translate-x-1/2 -translate-y-1/2";
      ringViolet.style.width = "30px";
      ringViolet.style.height = "30px";
      ringViolet.style.border = "1px solid rgba(139, 92, 246, 0.85)";
      ringViolet.style.boxShadow = "0 0 18px rgba(139, 92, 246, 0.6)";
      burst.appendChild(ringViolet);

      // 4. Staggered Radial Cosmic Sparks (6 directional energy particles)
      const sparkCount = 6;
      const sparks = [];
      const sparkDistance = 38;

      for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement("div");
        spark.className = "absolute rounded-full -translate-x-1/2 -translate-y-1/2";
        spark.style.width = "3px";
        spark.style.height = "3px";
        spark.style.backgroundColor = i % 2 === 0 ? "#7dd3fc" : "#c084fc";
        spark.style.boxShadow = i % 2 === 0 ? "0 0 8px #22d3ee" : "0 0 8px #a855f7";
        burst.appendChild(spark);

        const angle = (i * (360 / sparkCount) * Math.PI) / 180;
        const targetX = Math.cos(angle) * (sparkDistance + (i % 2) * 12);
        const targetY = Math.sin(angle) * (sparkDistance + (i % 2) * 12);

        sparks.push({ el: spark, x: targetX, y: targetY });
      }

      container.appendChild(burst);

      // Animate with GSAP Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          burst.remove();
        },
      });

      // Core flash animation
      tl.fromTo(
        core,
        { scale: 0.2, opacity: 1 },
        { scale: 1.8, opacity: 0, duration: 0.28, ease: "power2.out" },
        0
      );

      // Primary cyan ring expansion
      tl.fromTo(
        ringCyan,
        { scale: 0.15, opacity: 0.95 },
        { scale: 2.2, opacity: 0, duration: 0.55, ease: "power2.out" },
        0
      );

      // Secondary violet ring expansion (slightly delayed and expansive)
      tl.fromTo(
        ringViolet,
        { scale: 0.1, opacity: 0.8 },
        { scale: 2.8, opacity: 0, duration: 0.68, ease: "expo.out" },
        0.04
      );

      // Spark bursts radiating outward
      sparks.forEach(({ el, x: targetX, y: targetY }) => {
        tl.fromTo(
          el,
          { x: 0, y: 0, scale: 1, opacity: 1 },
          {
            x: targetX,
            y: targetY,
            scale: 0.2,
            opacity: 0,
            duration: 0.48,
            ease: "power3.out",
          },
          0.02
        );
      });
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    />
  );
}
