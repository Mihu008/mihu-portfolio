import Reveal from "../../components/Reveal";
import javaSpringBootCert from "../../assets/optimized/Mastering Java + SpringBoot.webp";
import cdacCert from "../../assets/optimized/cdac.webp";
import csharpCert from "../../assets/optimized/Foundational CSharp with Microsoft.webp";
import btechCert from "../../assets/optimized/btech.webp";

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
      className="min-h-[70vh] bg-gradient-to-b from-black to-blue-900 py-24 lg:px-24 md:px-10 px-4 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <Reveal className="text-center mb-16">
          <p className="text-gray-500 font-mono mb-4 text-sm md:text-base">
            &lt;!-- Continuous learning --&gt;
          </p>
          <h2 className="text-white text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            My <span className="text-blue-300">Certificates</span>
          </h2>
        </Reveal>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {certificates.map((cert, index) => (
            <Reveal key={cert.id} delay={index * 80}>
              <article className="bg-black/40 border border-blue-900/50 shadow-2xl flex flex-col group hover:border-blue-500/50 transition-colors duration-300 overflow-hidden">
                <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#0a0f1c]">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                    loading="lazy"
                    decoding="async"
                    width={480}
                    height={360}
                  />
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                <div className="p-5 flex flex-col flex-grow border-t border-blue-900/50">
                  <h3 className="text-gray-300 font-bold mb-2 group-hover:text-white transition-colors line-clamp-1">
                    {cert.title}
                  </h3>
                  <p className="text-[#a0a0a0] font-mono text-xs">{cert.issuer}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
