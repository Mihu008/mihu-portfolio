const HEADER_OFFSET = 88;

function getScrollTarget(sectionId) {
  return document.getElementById(sectionId);
}

function waitForScrollTarget(sectionId, maxAttempts = 40) {
  return new Promise((resolve) => {
    let attempts = 0;

    const check = () => {
      const el = getScrollTarget(sectionId);
      if (el) {
        resolve(el);
        return;
      }
      attempts += 1;
      if (attempts >= maxAttempts) {
        resolve(null);
        return;
      }
      requestAnimationFrame(check);
    };

    requestAnimationFrame(check);
  });
}

/**
 * Smooth-scroll to a section after it is mounted in the DOM.
 */
export async function scrollToSection(sectionId) {
  const target = await waitForScrollTarget(sectionId);
  if (!target) return;

  const top =
    target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
