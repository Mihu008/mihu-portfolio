import { useState, useEffect } from "react";
import { useNavScroll } from "../../hooks/useNavScroll";

const TITLES = [
  "Full Stack Developer · Backend Architect",
  "AI Systems Builder · Backend Engineer",
  "Backend Developer · Automation & API Systems",
  "Frontend Developer · UI/UX Designer"
];

const HeroSection = () => {
  const { navigateToSection, prefetchOnHover } = useNavScroll();
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const currentTitle = TITLES[loopNum % TITLES.length];
    let timer;

    if (isDeleting) {
      if (typedText === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
      } else {
        timer = setTimeout(() => {
          setTypedText(currentTitle.substring(0, typedText.length - 1));
        }, 30);
      }
    } else {
      if (typedText === currentTitle) {
        timer = setTimeout(() => setIsDeleting(true), 2500);
      } else {
        const isFirstStart = loopNum === 0 && typedText === "";
        timer = setTimeout(() => {
          setTypedText(currentTitle.substring(0, typedText.length + 1));
        }, isFirstStart ? 700 : 50);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum]);

  return (
    <section
      id="home"
      className="min-h-[100dvh]
        flex flex-col items-center justify-center
        px-4 sm:px-6 lg:px-12
        pt-24 pb-16
        relative
        overflow-hidden"
    >
      {/* Centered Hero Content Over Glass Backdrop */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="backdrop-blur-md bg-slate-950/40 border border-blue-500/20 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_0_60px_rgba(5,8,22,0.6)] w-full flex flex-col items-center">

          {/* Subheading / Status Badge */}
          <div className="hero-fade-up hero-delay-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Backend Developer</span>
          </div>

          {/* Name Header */}
          <h1 className="hero-fade-up hero-delay-1 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-300 drop-shadow-sm">
            Mihir Singh Netam
          </h1>

          {/* Animated Typing Title */}
          <h2 className="hero-fade-up hero-delay-1 text-blue-300 text-lg sm:text-2xl md:text-3xl font-semibold leading-tight flex items-center justify-center gap-2 min-h-[2.5rem] mb-6">
            <span>
              {typedText}
              <span className="ml-1 inline-block w-[3px] h-[1em] bg-cyan-300 animate-pulse align-middle" />
            </span>
          </h2>

          {/* Description Paragraphs */}
          <div className="hero-fade-up hero-delay-2 font-mono max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-gray-300/90 flex flex-col gap-4 mb-8">
            <p>
              I build scalable web systems, automation pipelines, and AI agent infrastructure. Currently engineering an AI Agent platform — designing the orchestration layer, tool-calling pipelines, task routing, and memory management that make autonomous agents reliable in production.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              I think in systems. Whether it's a REST API surface, a delegation workflow, or an event-driven automation chain — I care about correctness, scalability, and maintainability.
            </p>
          </div>

          {/* Action CTA Buttons */}
          <div className="hero-fade-up hero-delay-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#project"
              onClick={(e) => navigateToSection(e, "project")}
              onMouseEnter={() => prefetchOnHover("project")}
              onFocus={() => prefetchOnHover("project")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => navigateToSection(e, "contact")}
              onMouseEnter={() => prefetchOnHover("contact")}
              onFocus={() => prefetchOnHover("contact")}
              className="px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-blue-500/30 hover:border-cyan-400/50 text-blue-200 font-medium text-sm transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5"
            >
              Get in Touch
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
