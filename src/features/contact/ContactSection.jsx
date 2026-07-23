import { FiBriefcase, FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { MdOutlineGTranslate } from "react-icons/md";
import Reveal from "../../components/Reveal";

const ContactSection = () => {
  const contactInfo = [
    { id: 1, icon: FiBriefcase, text: "4+ years of coding experience" },
    { id: 2, icon: FiMapPin, text: "Rajnandgaon, Chhattisgarh, India" },
    { id: 3, icon: MdOutlineGTranslate, text: "English, Hindi" },
    { id: 4, icon: FiMail, text: import.meta.env.VITE_EMAIL },
    { id: 5, icon: FiPhone, text: import.meta.env.VITE_PHONE },
  ];

  return (
    <section
      id="contact"
      className="min-h-[60vh] flex flex-col items-center justify-center py-24 lg:px-24 md:px-10 px-4 relative overflow-hidden"
    >
      <div className="z-20 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>&lt;!-- Get In Touch --&gt;</span>
          </div>
          <h2 className="text-white text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight">
            Contact{" "}
            <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
        </Reveal>

        {/* Contact Information Glass Card */}
        <Reveal delay={120} className="w-full max-w-lg">
          <div className="backdrop-blur-md bg-slate-950/40 border border-blue-500/20 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(5,8,22,0.5)]">
            <ul className="flex flex-col gap-6">
              {contactInfo.map((info) => (
                <li
                  key={info.id}
                  className="flex items-center gap-5 group hover:translate-x-1.5 transition-transform duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-400/20 text-cyan-300 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 shrink-0">
                    <info.icon className="w-5 h-5" />
                  </div>
                  <span className="text-gray-300 font-mono text-sm sm:text-base group-hover:text-white transition-colors duration-300">
                    {info.text}
                  </span>
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
