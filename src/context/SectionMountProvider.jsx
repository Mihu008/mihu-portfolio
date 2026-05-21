import { useCallback, useEffect, useMemo, useState } from "react";
import { SectionMountContext } from "./sectionMountContext";
import { prefetchSection } from "../utils/sectionPrefetch";

export function SectionMountProvider({ children }) {
  const [mounted, setMounted] = useState(() => new Set(["home"]));

  const ensureMounted = useCallback((sectionId) => {
    prefetchSection(sectionId);
    setMounted((prev) => {
      if (prev.has(sectionId)) return prev;
      const next = new Set(prev);
      next.add(sectionId);
      return next;
    });
  }, []);

  const isMounted = useCallback((sectionId) => mounted.has(sectionId), [mounted]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) ensureMounted(hash);
  }, [ensureMounted]);

  useEffect(() => {
    const prefetch = () => {
      ["about", "project", "certificates", "contact"].forEach(prefetchSection);
    };

    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(prefetch);
      return () => cancelIdleCallback(id);
    }

    const id = setTimeout(prefetch, 1200);
    return () => clearTimeout(id);
  }, []);

  const value = useMemo(
    () => ({ ensureMounted, isMounted }),
    [ensureMounted, isMounted]
  );

  return (
    <SectionMountContext.Provider value={value}>{children}</SectionMountContext.Provider>
  );
}
