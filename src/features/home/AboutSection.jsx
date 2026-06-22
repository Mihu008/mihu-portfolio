import { FiDownload } from "react-icons/fi";
import { FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";
import Reveal from "../../components/Reveal";
import Me from "../../assets/optimized/Me.webp"


const AboutSection = () => {
  return (
    <section
      id="about"
      className="min-h-screen
        bg-gradient-to-b from-black to-blue-900
        flex items-center justify-center
        lg:px-24 md:px-10 px-4 py-20
        relative
        overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <Reveal direction="left" className="z-40 w-full flex flex-col items-start">
          <p className="text-gray-500 font-mono mb-8 text-sm md:text-base">
            &lt;!-- About me section --&gt;
          </p>

          <h2 className="text-white text-6xl md:text-[5rem] lg:text-[6rem] font-bold z-10 mb-10 leading-[1.05] tracking-tight">
            Inside My <br />
            <span className="text-gray-400">Creative</span> <br />
            Core
          </h2>

          <div className="text-[#a0a0a0] font-mono text-base md:text-[17px] mb-12 space-y-8 leading-[1.8] max-w-xl">
            <p>
              I&rsquo;m a <span className="bg-[#2a2a1a] text-[#d4d4aa] px-1.5 py-0.5">Frontend & Backend</span>{" "}
              <span className="bg-[#2a2a1a] text-[#d4d4aa] px-1.5 py-0.5">Developer</span> driven by a passion for
              building seamless, high-performance digital products. I specialize in crafting responsive, intuitive user
              interfaces while architecting scalable, efficient backend systems that power reliable applications.
            </p>
            <p>
              I enjoy collaborating with teams, solving real-world problems, and turning complex ideas into clean,
              engaging UI.
            </p>
          </div>

          <a
            href="/MIHIR_Resume.pdf"
            download="MIHIR_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-[200px] bg-[#1a1a1a] hover:bg-[#222] text-white font-mono text-sm font-semibold transition-colors border border-gray-800 mb-16 group"
          >
            <span className="px-6 py-4">Download CV</span>
            <span className="bg-[#222] p-4 h-full border-l border-gray-700 flex items-center justify-center group-hover:bg-[#333] transition-colors">
              <FiDownload className="w-5 h-5" />
            </span>
          </a>

          <div className="w-full max-w-xl">
            <p className="text-gray-500 font-mono mb-6 text-sm md:text-base">
              &lt;!-- My Professional Experience --&gt;
            </p>

            <div className="flex flex-row gap-8 sm:gap-16 font-mono text-sm md:text-base">
              <div className="text-[#d4d4aa] flex flex-col">
                <span>2026 -</span>
                <span>present</span>
              </div>
              <div className="text-white flex flex-col font-bold">
                <span>Full-Stack</span>
                <span>Developer</span>
                <span>Intern</span>
              </div>
              <div className="text-gray-400 flex flex-col">
                <span>Botivate</span>
                <span>Services</span>
                <span>LLP</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={120} className="z-40 w-full max-w-[500px] mx-auto lg:mx-0">
          <div className="w-full flex flex-col shadow-2xl border border-blue-500/30">
            <div className="w-full aspect-[4/5] bg-[#1e443b] overflow-hidden relative">
              <img
                src={Me}
                alt="Profile Portrait"
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
                decoding="async"
                width={600}
                height={750}
              />
            </div>

            <div className="bg-[#161616] p-6 flex justify-between items-center border-t border-gray-800">
              <span className="text-gray-400 font-mono text-sm tracking-widest">Follow me:</span>
              <div className="flex gap-6">
                <a
                  href="https://linkedin.com/in/mihirnetam-08m"
                  className="text-white hover:text-gray-400 transition-colors"
                  title="LinkedIn"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
                <a href="#" className="text-white hover:text-gray-400 transition-colors">
                  <FaXTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/mihu_singh.07?igsh=bjhndjl4bHB2MTVx"
                  className="text-white hover:text-gray-400 transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
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
