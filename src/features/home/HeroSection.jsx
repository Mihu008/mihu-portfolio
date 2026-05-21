import { useState, useEffect } from "react";
import SplineScene from "../../components/SplineScene";

const TITLES = [
  "Full Stack Engineer · Backend Architect",
  "AI Systems Builder · Backend Engineer",
  "Backend Engineer · Automation & API Systems"
];

const HeroSection = () => {
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
        }, 30); // Fast deletion
      }
    } else {
      if (typedText === currentTitle) {
        timer = setTimeout(() => setIsDeleting(true), 2500); // Pause when fully typed
      } else {
        const isFirstStart = loopNum === 0 && typedText === "";
        timer = setTimeout(() => {
          setTypedText(currentTitle.substring(0, typedText.length + 1));
        }, isFirstStart ? 700 : 50); // Initial delay or normal typing speed
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum]);

  return (
    <section
      id="home"
      className="min-h-[100dvh]
        bg-gradient-to-b from-blue-900 to-black
        flex flex-col-reverse lg:flex-row
        items-center lg:items-center
        justify-end lg:justify-between
        gap-8 lg:gap-12
        px-4 md:px-10 lg:px-24
        pt-24 pb-12 lg:py-20
        relative
        overflow-hidden"
    >
      <div className="z-20 relative w-full lg:max-w-[48%] xl:max-w-[52%] shrink-0 lg:pointer-events-none">
        <div className="hero-fade-up hero-delay-1 lg:pointer-events-auto mb-6 lg:mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-300 drop-shadow-sm">
            Mihir Singh Netam
          </h1>
          <h2 className="text-blue-300 text-xl md:text-2xl lg:text-3xl font-semibold leading-tight flex flex-wrap items-center gap-3 min-h-[2.5rem]">
            <span className="w-8 h-[2px] bg-blue-400 rounded-full inline-block hidden sm:block"></span>
            <span>
              {typedText}
              <span className="ml-1 inline-block w-[3px] h-[1em] bg-blue-300 animate-pulse align-middle"></span>
            </span>
          </h2>
        </div>

        <div className="hero-fade-up hero-delay-2 font-mono md:max-w-xl lg:max-w-2xl text-base md:text-lg leading-relaxed lg:pointer-events-auto flex flex-col gap-5 text-gray-300/90">
          <p className="border-l-2 border-blue-500/30 pl-4 hover:border-blue-400 hover:text-blue-100 transition-all duration-300">
            I build scalable web systems, automation pipelines, and AI agent infrastructure. Currently engineering an AI Agent platform — designing the orchestration layer, tool-calling pipelines, task routing, and memory management that make autonomous agents reliable in production.
          </p>
          <p className="border-l-2 border-blue-500/30 pl-4 hover:border-blue-400 hover:text-blue-100 transition-all duration-300">
            I think in systems. Whether it's a REST API surface, a delegation workflow, or an event-driven automation chain — I care about correctness, scalability, and maintainability.
          </p>
        </div>
      </div>

      <div className="hero-spline-container relative z-30 w-full max-w-md sm:max-w-lg lg:max-w-none lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[50%] xl:w-[48%] h-[36vh] sm:h-[40vh] md:h-[44vh] lg:h-full lg:min-h-0 shrink-0">
        <SplineScene scene={import.meta.env.VITE_SPLINE_URL} />
      </div>
    </section>
  );
};

export default HeroSection;
