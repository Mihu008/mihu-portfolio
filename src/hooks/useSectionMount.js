import { useContext } from "react";
import { SectionMountContext } from "../context/sectionMountContext";

export function useSectionMount() {
  const ctx = useContext(SectionMountContext);
  if (!ctx) {
    throw new Error("useSectionMount must be used within SectionMountProvider");
  }
  return ctx;
}
