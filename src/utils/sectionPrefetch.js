/** Preload lazy section chunks before the user navigates. */
export const sectionImporters = {
  home: () => import("../features/home/HeroSection"),
  about: () => import("../features/home/AboutSection"),
  project: () => import("../features/project/ProjectSection"),
  certificates: () => import("../features/certificates/CertificatesSection"),
  contact: () => import("../features/contact/ContactSection"),
};

export function prefetchSection(sectionId) {
  const load = sectionImporters[sectionId];
  if (load) load();
}

export function prefetchAllSections() {
  Object.keys(sectionImporters).forEach(prefetchSection);
}
