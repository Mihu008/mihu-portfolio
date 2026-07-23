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
        lg:px-24 md:px-10 px-4 py-20
        relative
        overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left Column: Glass Card with About Content */}
        <Reveal direction="left" className="z-20 w-full">
          <div className="backdrop-blur-md bg-slate-950/40 border border-blue-500/20 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(5,8,22,0.5)] flex flex-col items-start">
            
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>&lt;!-- About Me --&gt;</span>
            </div>

            {/* Heading */}
            <h2 className="text-white text-5xl md:text-6xl font-extrabold mb-8 leading-[1.08] tracking-tight">
              Inside My <br />
              <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Creative Core
              </span>
            </h2>

            {/* Paragraphs */}
            <div className="text-gray-300 font-mono text-sm sm:text-base mb-8 space-y-6 leading-[1.8]">
              <p>
                I&rsquo;m a{" "}
                <span className="bg-blue-500/15 border border-blue-400/30 text-cyan-300 px-2 py-0.5 rounded-md font-mono text-sm shadow-sm">
                  Frontend & Backend
                </span>{" "}
                <span className="bg-blue-500/15 border border-blue-400/30 text-cyan-300 px-2 py-0.5 rounded-md font-mono text-sm shadow-sm">
                  Developer
                </span>{" "}
                driven by a passion for building seamless, high-performance digital products. I specialize in crafting responsive, intuitive user interfaces while architecting scalable, efficient backend systems that power reliable applications.
              </p>
              <p className="text-gray-400">
                I enjoy collaborating with teams, solving real-world problems, and turning complex ideas into clean, engaging user experiences.
              </p>
            </div>

            {/* Download CV CTA */}
            <a
              href="/MIHIR_Resume.pdf"
              download="MIHIR_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between bg-slate-900/80 hover:bg-slate-800/90 text-blue-200 hover:text-white font-mono text-sm font-semibold transition-all duration-300 border border-blue-500/30 hover:border-cyan-400/50 rounded-xl overflow-hidden mb-10 group shadow-lg shadow-blue-500/10 hover:shadow-cyan-500/20 hover:-translate-y-0.5"
            >
              <span className="px-6 py-3.5">Download CV</span>
              <span className="bg-blue-500/20 p-3.5 border-l border-blue-500/30 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                <FiDownload className="w-5 h-5 text-cyan-300" />
              </span>
            </a>

            {/* Experience Block */}
            <div className="w-full pt-6 border-t border-blue-500/20">
              <p className="text-blue-300/70 font-mono mb-4 text-xs tracking-wider uppercase">
                &lt;!-- Professional Experience --&gt;
              </p>

              <div className="flex flex-row gap-6 sm:gap-12 font-mono text-xs sm:text-sm">
                <div className="text-cyan-300 font-semibold flex flex-col">
                  <span>2026 - Feb</span>
                  <span>2026 - June</span>
                </div>
                <div className="text-white flex flex-col font-bold">
                  <span>Full-Stack Developer Intern</span>
                </div>
                <div className="text-gray-400 flex flex-col">
                  <span>Botivate</span>
                  <span>Services LLP</span>
                </div>
              </div>
              <div className="flex flex-row gap-6 sm:gap-12 font-mono text-xs sm:text-sm">
                <div className="text-cyan-300 font-semibold flex flex-col">
                  <span>2026 - July</span>
                  <span>2026 - Present</span>
                </div>
                <div className="text-white flex flex-col font-bold">
                  <span>Full-Stack Developer</span>
                </div>
                <div className="text-gray-400 flex flex-col">
                  <span>Botivate</span>
                  <span>Services LLP</span>
                </div>
              </div>
            </div>

          </div>
        </Reveal>

        {/* Right Column: Glass Card with Profile Image */}
        <Reveal direction="right" delay={120} className="z-20 w-full max-w-[480px] mx-auto lg:mx-0">
          <div className="w-full flex flex-col backdrop-blur-md bg-slate-950/40 border border-blue-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(5,8,22,0.6)]">
            <div className="w-full aspect-[4/5] bg-slate-900/60 overflow-hidden relative">
              <img
                src={Me}
                alt="Profile Portrait"
                className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-500"
                loading="lazy"
                decoding="async"
                width={600}
                height={750}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>

            <div className="bg-slate-950/90 p-6 flex justify-between items-center border-t border-blue-500/20">
              <span className="text-blue-300/80 font-mono text-xs tracking-widest uppercase">Follow Me:</span>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com/in/mihirnetam-08m"
                  className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                  title="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                  title="X (Twitter)"
                >
                  <FaXTwitter className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/mihu_singh.07?igsh=bjhndjl4bHB2MTVx"
                  className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                  title="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="w-4 h-4" />
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
