import { FiDownload } from "react-icons/fi";
import { FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";
import Reveal from "../../components/Reveal";
import Me from "../../assets/optimized/Me.webp";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="min-h-screen
        flex items-center justify-center
        lg:px-24 md:px-10 px-4 py-24
        relative
        overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left Column: Planetary Dossier Console */}
        <Reveal direction="left" className="z-20 w-full">
          <div className="backdrop-blur-xl bg-slate-950/50 border border-cyan-500/25 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(5,8,22,0.7),inset_0_0_20px_rgba(34,211,238,0.03)] flex flex-col items-start">
            
            {/* Classification Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-6 shadow-[0_0_12px_rgba(34,211,238,0.15)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>PLANETARY PROFILE // MIHIR-01</span>
            </div>

            {/* Heading */}
            <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-[1.08] tracking-tight">
              Inside The <br />
              <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                Core Architecture
              </span>
            </h2>

            {/* Profile Metrics Grid */}
            <div className="w-full grid grid-cols-2 gap-3 mb-6 p-3 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 text-[11px] font-mono text-cyan-300/90">
              <div>
                <span className="text-gray-400 block text-[10px]">CLASSIFICATION:</span>
                <span>Full-Stack Engineering System</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">CURRENT STATUS:</span>
                <span className="text-cyan-300">Active Orbital Deployment</span>
              </div>
            </div>

            {/* Paragraphs */}
            <div className="text-gray-300 font-mono text-sm sm:text-base mb-8 space-y-5 leading-[1.8]">
              <p>
                I am a{" "}
                <span className="bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 px-2 py-0.5 rounded-md font-mono text-xs sm:text-sm shadow-sm">
                  Full-Stack Architect
                </span>{" "}
                driven by building high-reliability distributed systems and intuitive user interfaces. I specialize in backend orchestration, autonomous agent systems, API pipelines, and resilient production infrastructure.
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                Focusing on architectural correctness, scalable data models, event-driven pipelines, and high-performance interactive interfaces.
              </p>
            </div>

            {/* Download Technical Dossier CTA */}
            <a
              href="/MIHIR_Resume.pdf"
              download="MIHIR_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between bg-slate-900/90 hover:bg-slate-800 text-cyan-200 hover:text-white font-mono text-xs sm:text-sm font-semibold transition-all duration-300 border border-cyan-500/30 hover:border-cyan-400/60 rounded-xl overflow-hidden mb-8 group shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:-translate-y-0.5"
            >
              <span className="px-6 py-3.5 tracking-wider">[ ACCESS DOSSIER // TECHNICAL CV ]</span>
              <span className="bg-cyan-500/20 p-3.5 border-l border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/40 transition-colors">
                <FiDownload className="w-4 h-4 text-cyan-300" />
              </span>
            </a>

            {/* Mission Logs & Deployments Block */}
            <div className="w-full pt-6 border-t border-cyan-500/20">
              <div className="flex items-center justify-between mb-4">
                <p className="text-cyan-300/80 font-mono text-xs tracking-wider uppercase">
                  // MISSION LOGS & ORBITAL DEPLOYMENTS
                </p>
                <span className="text-[10px] font-mono text-cyan-400/60">VERIFIED RECORDS</span>
              </div>

              <div className="space-y-4 font-mono text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-cyan-400/30 transition-colors">
                  <div>
                    <span className="text-white font-bold block">Full-Stack Developer</span>
                    <span className="text-gray-400 text-xs">Botivate Services LLP · Production Systems</span>
                  </div>
                  <span className="text-cyan-300 font-semibold text-xs px-2 py-1 rounded bg-cyan-500/10 w-fit">
                    2026.07 - PRESENT
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-cyan-400/30 transition-colors">
                  <div>
                    <span className="text-white font-bold block">Full-Stack Developer Intern</span>
                    <span className="text-gray-400 text-xs">Botivate Services LLP · Architecture & APIs</span>
                  </div>
                  <span className="text-cyan-300/80 font-semibold text-xs px-2 py-1 rounded bg-cyan-500/10 w-fit">
                    2026.02 - 2026.06
                  </span>
                </div>
              </div>
            </div>

          </div>
        </Reveal>

        {/* Right Column: Viewport Biometric Frame */}
        <Reveal direction="right" delay={120} className="z-20 w-full max-w-[480px] mx-auto lg:mx-0">
          <div className="w-full flex flex-col backdrop-blur-xl bg-slate-950/50 border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(5,8,22,0.8),inset_0_0_20px_rgba(34,211,238,0.05)]">
            
            {/* Viewport HUD Header */}
            <div className="bg-slate-950/90 px-5 py-3 flex justify-between items-center border-b border-cyan-500/20 text-[10px] font-mono text-cyan-400/80">
              <span>VIEWPORT // BIOMETRIC SENSOR</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>ACTIVE SCAN</span>
              </span>
            </div>

            <div className="w-full aspect-[4/5] bg-slate-900/80 overflow-hidden relative group">
              <img
                src={Me}
                alt="Developer Profile Portrait"
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                width={600}
                height={750}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              
              {/* Corner HUD Telemetry Marks */}
              <div className="absolute top-4 left-4 text-[10px] font-mono text-cyan-400/60 pointer-events-none">
                ┌ ENTITY: MIHIR-01
              </div>
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-cyan-400/60 pointer-events-none">
                SECTOR: 08-M ┘
              </div>
            </div>

            {/* Uplink Channels Footer */}
            <div className="bg-slate-950/95 p-5 flex justify-between items-center border-t border-cyan-500/20">
              <span className="text-cyan-300/80 font-mono text-xs tracking-widest uppercase">
                // UPLINK FREQUENCIES:
              </span>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com/in/mihirnetam-08m"
                  className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-300 hover:text-white hover:border-cyan-300 hover:bg-cyan-500/25 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300"
                  title="LinkedIn Frequency"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-300 hover:text-white hover:border-cyan-300 hover:bg-cyan-500/25 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300"
                  title="Sub-Space Comms (Twitter)"
                >
                  <FaXTwitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://instagram.com/mihu_singh.07?igsh=bjhndjl4bHB2MTVx"
                  className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-300 hover:text-white hover:border-cyan-300 hover:bg-cyan-500/25 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300"
                  title="Visual Log (Instagram)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;
