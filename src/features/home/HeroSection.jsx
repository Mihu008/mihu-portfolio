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
        pt-28 pb-16
        relative
        overflow-hidden"
    >
      {/* Centered Command Center Console Card */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="relative backdrop-blur-xl bg-slate-950/50 border border-cyan-500/25 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_0_70px_rgba(5,8,22,0.7),inset_0_0_30px_rgba(34,211,238,0.03)] w-full flex flex-col items-center">

          {/* Top telemetry HUD Bar */}
          <div className="w-full flex items-center justify-between pb-4 mb-6 border-b border-cyan-500/15 text-[11px] font-mono text-cyan-400/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              <span className="tracking-widest uppercase">COMMAND CENTER // SECTOR: 08-M</span>
            </div>
            <span className="hidden sm:inline-block tracking-wider text-gray-400/80">
              COORDS: 21.09°N · 81.03°E
            </span>
          </div>

          {/* Status Capsule */}
          <div className="hero-fade-up hero-delay-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-6 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <span className="text-cyan-400 font-bold">●</span>
            <span>SYSTEM STATUS: ONLINE // FULL-STACK ARCHITECT</span>
          </div>

          {/* Name Header */}
          <h1 className="hero-fade-up hero-delay-1 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-blue-300 drop-shadow-[0_0_25px_rgba(34,211,238,0.2)]">
            Mihir Singh Netam
          </h1>

          {/* Animated Typing Title */}
          <h2 className="hero-fade-up hero-delay-1 text-cyan-300 text-lg sm:text-2xl md:text-3xl font-semibold leading-tight flex items-center justify-center gap-2 min-h-[2.5rem] mb-6">
            <span>
              {typedText}
              <span className="ml-1 inline-block w-[3px] h-[1em] bg-cyan-400 animate-pulse align-middle shadow-[0_0_8px_#22d3ee]" />
            </span>
          </h2>

          {/* Mission Briefing Paragraphs */}
          <div className="hero-fade-up hero-delay-2 font-mono max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-gray-300/90 flex flex-col gap-4 mb-8">
            <p>
              I engineer scalable web architectures, automation pipelines, and autonomous AI agent platforms — designing tool-calling systems, orchestration layers, distributed task routing, and contextual memory management.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              Architecting with precision: low-latency REST/event-driven backends, clean component systems, and resilient production infrastructure.
            </p>
          </div>

          {/* Interstellar Action Buttons */}
          <div className="hero-fade-up hero-delay-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#project"
              onClick={(e) => navigateToSection(e, "project")}
              onMouseEnter={() => prefetchOnHover("project")}
              onFocus={() => prefetchOnHover("project")}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs sm:text-sm tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] hover:-translate-y-0.5"
            >
              [ EXPLORE UNIVERSE ]
            </a>
            <a
              href="#contact"
              onClick={(e) => navigateToSection(e, "contact")}
              onMouseEnter={() => prefetchOnHover("contact")}
              onFocus={() => prefetchOnHover("contact")}
              className="px-7 py-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900/90 border border-cyan-400/40 hover:border-cyan-300 text-cyan-200 font-bold font-mono text-xs sm:text-sm tracking-wider transition-all duration-300 backdrop-blur-md hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:-translate-y-0.5"
            >
              [ ESTABLISH CONTACT ]
            </a>
          </div>

          {/* Bottom telemetry indicators */}
          <div className="w-full flex items-center justify-between pt-6 mt-8 border-t border-cyan-500/15 text-[10px] font-mono text-cyan-400/60">
            <span>INTERFACE // HUD-V2.6</span>
            <span className="animate-pulse text-cyan-300">TELEMETRY SYNCHRONIZED</span>
            <span>VELOCITY // 7.8 KM/S</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
