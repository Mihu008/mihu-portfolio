import Reveal from "../../components/Reveal";
import javaSpringBootCert from "../../assets/optimized/Mastering Java + SpringBoot.webp";
import cdacCert from "../../assets/optimized/cdac.webp";
import csharpCert from "../../assets/optimized/Foundational CSharp with Microsoft.webp";
import btechCert from "../../assets/optimized/btech.webp";
import internshipCert from "../../assets/optimized/internship.webp";
import tedxCert from "../../assets/optimized/TedxBITD.webp";
import ojasCert from "../../assets/optimized/ojas.webp";
import starlightCert from "../../assets/optimized/starlight.webp";

const academicCertificates = [
  {
    id: 1,
    title: "Full-Stack Developer Internship",
    issuer: "Botivate Services LLP",
    image: internshipCert,
  },
  {
    id: 2,
    title: "Java + Springboot Masterclass",
    issuer: "Udemy",
    image: javaSpringBootCert,
  },
  {
    id: 3,
    title: "Full Stack Developer",
    issuer: "CDAC Hyderabad",
    image: cdacCert,
  },
  {
    id: 4,
    title: "Foundational C# with Microsoft",
    issuer: "FreeCodeCamp",
    image: csharpCert,
  },
  {
    id: 5,
    title: "Computer Science Engineering",
    issuer: "Bhilai Institute of Technology Durg",
    image: btechCert,
  },
];

const extracurricularActivities = [
  {
    id: 1,
    title: "TEDx Performer & Cultural Lead",
    issuer: "TEDxBITDurg",
    description: "Participated as a featured performer and led the cultural performance team for TEDxBITDurg.",
    image: tedxCert,
  },
  {
    id: 2,
    title: "OJAS Dance Winner & Team Lead",
    issuer: "BIT Durg - OJAS Fest",
    description: "Participated as a featured performer and won the Team Dance Competition at OJAS, the annual festival of BIT Durg.",
    image: ojasCert,
  },
  {
    id: 3,
    title: "Starlight Performer & Volunteer",
    issuer: "BIT Durg - Starlight",
    description: "Participated as a featured performer and volunteered in stage coordination and event execution for Starlight.",
    image: starlightCert,
  },
];

const CertificatesSection = () => {
  return (
    <section
      id="certificates"
      className="min-h-[70vh] py-24 lg:px-24 md:px-10 px-4 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header: Interstellar Achievement Archive */}
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>INTERSTELLAR ACHIEVEMENT ARCHIVE // VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight">
            Archival{" "}
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]">
              Flight Records
            </span>
          </h2>
        </Reveal>

        {/* Academic Certificates Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 xl:gap-6 mb-24">
          {academicCertificates.map((cert, index) => (
            <Reveal key={cert.id} delay={index * 80}>
              <article className="h-full backdrop-blur-xl bg-slate-950/50 border border-cyan-500/25 rounded-2xl flex flex-col group hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300 overflow-hidden">
                <div className="w-full aspect-[4/3] relative overflow-hidden bg-slate-900/80">
                  <div className="absolute top-2 left-2.5 z-10 px-2 py-0.5 rounded bg-slate-950/85 border border-cyan-500/30 text-[9px] font-mono text-cyan-300 tracking-wider">
                    CRED-00{cert.id}
                  </div>

                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                    decoding="async"
                    width={480}
                    height={360}
                  />
                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                <div className="p-5 flex flex-col flex-grow border-t border-cyan-500/20">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-cyan-400/70">VERIFIED</span>
                    <span className="text-[9px] font-mono text-gray-400">ID: 0{cert.id}</span>
                  </div>
                  <h3 className="text-gray-100 font-bold mb-1.5 group-hover:text-cyan-300 transition-colors line-clamp-1 text-sm">
                    {cert.title}
                  </h3>
                  <p className="text-cyan-300/80 font-mono text-xs">{cert.issuer}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Extracurricular Section Header */}
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>EXPEDITION LOGS & CULTURAL ENDEAVORS</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.08] tracking-tight">
            Expedition &{" "}
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]">
              Leadership
            </span>
          </h2>
        </Reveal>

        {/* Extracurricular Showcase Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {extracurricularActivities.map((activity, index) => (
            <Reveal key={activity.id} delay={index * 80} className="w-full">
              <article className="h-full backdrop-blur-xl bg-slate-950/50 border border-cyan-500/25 rounded-2xl flex flex-col group hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(34,211,238,0.22)] transition-all duration-300 overflow-hidden">
                <div className="w-full aspect-[16/10] relative overflow-hidden bg-slate-900/80">
                  <div className="absolute top-2.5 left-3 z-10 px-2.5 py-0.5 rounded bg-slate-950/85 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 tracking-wider">
                    EXPEDITION-0{activity.id}
                  </div>

                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    loading="lazy"
                    decoding="async"
                    width={500}
                    height={315}
                  />
                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                <div className="p-6 flex flex-col flex-grow border-t border-cyan-500/20">
                  <h3 className="text-white text-lg font-bold mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-cyan-300/80 font-mono text-xs mb-3">{activity.issuer}</p>
                  <p className="text-gray-300/90 font-mono text-xs leading-relaxed">
                    {activity.description}
                  </p>
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
