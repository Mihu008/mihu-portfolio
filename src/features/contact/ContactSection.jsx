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
      className="min-h-[60vh] bg-gradient-to-b from-blue-900 to-black flex flex-col items-center justify-center py-24 lg:px-24 md:px-10 px-4 relative overflow-hidden"
    >
      <div className="z-40 w-full max-w-4xl mx-auto flex flex-col items-center">
        <Reveal className="text-center mb-16">
          <p className="text-gray-400 font-mono mb-4 text-sm tracking-widest uppercase">
            &lt;!-- Get in Touch --&gt;
          </p>
          <h2 className="text-white text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Contact <span className="text-blue-300">Me</span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="w-full max-w-md p-8 md:p-12">
          <ul className="flex flex-col gap-8">
            {contactInfo.map((info) => (
              <li
                key={info.id}
                className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300"
              >
                <div className="flex-shrink-0 text-gray-400 group-hover:text-blue-300 transition-colors duration-300">
                  <info.icon className="w-6 h-6" />
                </div>
                <span className="text-[#a0a0a0] font-mono text-sm md:text-base group-hover:text-white transition-colors duration-300">
                  {info.text}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
