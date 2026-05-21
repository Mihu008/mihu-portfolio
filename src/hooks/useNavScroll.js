import { useCallback } from "react";
import { useSectionMount } from "./useSectionMount";
import { prefetchSection } from "../utils/sectionPrefetch";
import { scrollToSection } from "../utils/scrollToSection";

export function useNavScroll() {
  const { ensureMounted } = useSectionMount();

  const navigateToSection = useCallback(
    async (e, sectionId, onAfterNavigate) => {
      e.preventDefault();
      ensureMounted(sectionId);
      prefetchSection(sectionId);
      window.history.pushState(null, "", `#${sectionId}`);
      await scrollToSection(sectionId);
      onAfterNavigate?.();
    },
    [ensureMounted]
  );

  const prefetchOnHover = useCallback((sectionId) => {
    prefetchSection(sectionId);
    ensureMounted(sectionId);
  }, [ensureMounted]);

  return { navigateToSection, prefetchOnHover };
}
