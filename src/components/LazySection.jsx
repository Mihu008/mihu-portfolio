import { Suspense } from "react";
import { useInView } from "../hooks/useInView";
import { useSectionMount } from "../hooks/useSectionMount";

const SectionFallback = ({ minHeight = "50vh" }) => (
  <div
    className="w-full bg-transparent"
    style={{ minHeight }}
    aria-hidden="true"
  />
);

/**
 * Mounts children when near the viewport or when nav requests the section.
 * Renders a scroll anchor so hash targets exist before content loads.
 */
export default function LazySection({
  sectionId,
  children,
  minHeight = "50vh",
  fallback = <SectionFallback minHeight={minHeight} />,
}) {
  const { ref, inView } = useInView({ rootMargin: "400px 0px" });
  const { isMounted } = useSectionMount();
  const shouldMount = inView || isMounted(sectionId);

  return (
    <div ref={ref}>
      {!shouldMount && (
        <div
          id={sectionId}
          className="section-scroll-anchor"
          style={{ minHeight }}
          aria-hidden="true"
        />
      )}
      {shouldMount ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
