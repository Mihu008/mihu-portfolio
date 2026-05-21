import { lazy, Suspense, useEffect, useRef, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

function shouldEnableSpline() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function HeroFallback() {
  return (
    <div className="hero-spline-canvas hero-3d-fallback" aria-hidden="true" />
  );
}

export default function SplineScene({ scene }) {
  const containerRef = useRef(null);
  const [canLoad, setCanLoad] = useState(false);

  useEffect(() => {
    if (!shouldEnableSpline() || !scene) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [scene]);

  if (!scene || !shouldEnableSpline()) {
    return <HeroFallback />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-auto">
      {canLoad ? (
        <Suspense fallback={<HeroFallback />}>
          <div className="hero-spline-canvas">
            <Spline scene={scene} className="w-full h-full" />
          </div>
        </Suspense>
      ) : (
        <HeroFallback />
      )}
    </div>
  );
}
