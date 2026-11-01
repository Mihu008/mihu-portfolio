import { FiBriefcase, FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { MdOutlineGTranslate } from "react-icons/md";
import Reveal from "../../components/Reveal";

const ContactSection = () => {
  const contactInfo = [
    { id: 1, icon: FiBriefcase, label: "DEVELOPMENT EXPERIENCE", text: "4+ years of software engineering & architecture" },
    { id: 2, icon: FiMapPin, label: "SECTOR COORDINATES", text: "Rajnandgaon, Chhattisgarh, India" },
    { id: 3, icon: MdOutlineGTranslate, label: "LANGUAGE", text: "English, Hindi" },
    { id: 4, icon: FiMail, label: "DIRECT TRANSMISSION", text: import.meta.env.VITE_EMAIL },
    { id: 5, icon: FiPhone, label: "VOICE FREQUENCY", text: import.meta.env.VITE_PHONE },
  ];

  return (
    <section
      id="contact"
      className="min-h-[60vh] flex flex-col items-center justify-center py-24 lg:px-24 md:px-10 px-4 relative overflow-hidden"
    >
      <div className="z-20 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header: Deep Space Transmission */}
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span>SUB-SPACE TRANSMISSION // FREQUENCY OPEN</span>
          </div>
          <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight">
            Establish{" "}
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]">
              Transmission
            </span>
          </h2>
        </Reveal>

        {/* Transmission Channels Console Card */}
        <Reveal delay={120} className="w-full max-w-xl">
          <div className="backdrop-blur-xl bg-slate-950/55 border border-cyan-500/25 rounded-3xl p-8 sm:p-12 shadow-[0_0_60px_rgba(5,8,22,0.7),inset_0_0_20px_rgba(34,211,238,0.03)]">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-cyan-500/15 text-[10px] font-mono text-cyan-400/80">
              <span>CHANNEL ID // COMM-SEC-08</span>
              <span className="text-cyan-300 font-semibold animate-pulse">AWAITING UPLINK</span>
            </div>

            <ul className="flex flex-col gap-6">
              {contactInfo.map((info) => (
                <li
                  key={info.id}
                  className="flex items-center gap-5 group hover:translate-x-1.5 transition-transform duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 flex items-center justify-center group-hover:border-cyan-300 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] transition-all duration-300 shrink-0">
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-cyan-400/70 tracking-wider">
                      {info.label}
                    </span>
                    <span className="text-gray-200 font-mono text-xs sm:text-sm group-hover:text-white transition-colors duration-300">
                      {info.text}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
