import { useEffect } from "react";
import { useSectionMount } from "../hooks/useSectionMount";
import { scrollToSection } from "../utils/scrollToSection";

/** Handles direct URL hashes (e.g. /#project) on load and hash changes. */
export default function HashScrollHandler() {
  const { ensureMounted } = useSectionMount();

  useEffect(() => {
    const handleHash = () => {
      const sectionId = window.location.hash.replace("#", "");
      if (!sectionId) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      ensureMounted(sectionId);
      scrollToSection(sectionId);
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [ensureMounted]);

  return null;
}
