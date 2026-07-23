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
      className="min-h-[70vh] py-24 lg:px-24 md:px-10 px-4 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>&lt;!-- Credentials & Degrees --&gt;</span>
          </div>
          <h2 className="text-white text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight">
            My{" "}
            <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Certificates
            </span>
          </h2>
        </Reveal>

        {/* Certificate Cards Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {certificates.map((cert, index) => (
            <Reveal key={cert.id} delay={index * 80}>
              <article className="h-full backdrop-blur-md bg-slate-950/40 border border-blue-500/20 rounded-2xl flex flex-col group hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 overflow-hidden">
                <div className="w-full aspect-[4/3] relative overflow-hidden bg-slate-900/80">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                    decoding="async"
                    width={480}
                    height={360}
                  />
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                <div className="p-5 flex flex-col flex-grow border-t border-blue-500/20">
                  <h3 className="text-gray-200 font-bold mb-1.5 group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {cert.title}
                  </h3>
                  <p className="text-blue-300/70 font-mono text-xs">{cert.issuer}</p>
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
