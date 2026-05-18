import { motion } from "framer-motion";
import javaSpringBootCert from "../../assets/Mastering Java + SpringBoot.png";
import cdacCert from "../../assets/cdac.png";
import csharpCert from "../../assets/Foundational CSharp with Microsoft.png";
import btechCert from "../../assets/btech.png";

// Dummy certificate data for the skeletons
const certificates = [
  {
    id: 1,
    title: "Java + Springboot Masterclass",
    issuer: "Udemy",
    image: javaSpringBootCert,
  },
  {
    id: 2,
    title: "Full Stack Developer",
    issuer: "CDAC Hyderabad",
    image: cdacCert,
  },
  {
    id: 3,
    title: "Foundational C# with Microsoft",
    issuer: "FreeCodeCamp",
    image: csharpCert,
  },
  {
    id: 4,
    title: "Computer Science Engineering",
    issuer: "Bhilai Institute of Technology Durg",
    image: btechCert,
  },
];

const CertificatesSection = () => {
  return (
    <section
      id="certificates"
      className="min-h-[70vh]
        bg-gradient-to-b from-black to-blue-900
        py-24 lg:px-24 md:px-10 px-4
        relative
        overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 will-change-transform"
        >
          <p className="text-gray-500 font-mono mb-4 text-sm md:text-base">
            &lt;!-- Continuous learning --&gt;
          </p>
          <h2 className="text-white text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            My <span className="text-blue-300">Certificates</span>
          </h2>
        </motion.div>

        {/* 4-Column Skeleton Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/40 border border-blue-900/50 shadow-2xl flex flex-col group hover:border-blue-500/50 transition-colors duration-300 overflow-hidden will-change-transform"
            >
              {/* Image Skeleton Container */}
              <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#0a0f1c]">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                  loading="lazy"
                />
                
                {/* Overlay highlight */}
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Skeleton Text Content */}
              <div className="p-5 flex flex-col flex-grow border-t border-blue-900/50">
                <h3 className="text-gray-300 font-bold mb-2 group-hover:text-white transition-colors line-clamp-1">
                  {cert.title}
                </h3>
                <p className="text-[#a0a0a0] font-mono text-xs">
                  {cert.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
