import { useState, useEffect, useCallback } from "react";
import { FiArrowUp } from "react-icons/fi";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 300);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        toggleVisibility();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener("scroll", onScroll);
  }, [toggleVisibility]);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="scroll-top-btn fixed bottom-8 right-8 z-50 p-4 rounded-full bg-blue-950/40 md:backdrop-blur-md border border-blue-500/30 text-blue-400 hover:text-white hover:border-blue-400 hover:bg-blue-600/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-colors duration-300 group flex items-center justify-center cursor-pointer active:scale-95"
      aria-label="Scroll to top"
    >
      <FiArrowUp className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300" />
    </button>
  );
};

export default ScrollToTop;
