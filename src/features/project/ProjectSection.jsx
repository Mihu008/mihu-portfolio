import { FiGithub, FiExternalLink } from "react-icons/fi";
import { FaJava, FaReact, FaNodeJs, FaDocker, FaGithub, FaAws } from "react-icons/fa6";
import { TbBrandFramerMotion } from "react-icons/tb";
import {
  SiJavascript,
  SiPostgresql,
  SiSpringboot,
  SiMongodb,
  SiMysql,
  SiPostman,
  SiNextdotjs,
  SiThreedotjs,
  SiTailwindcss,
  SiTypescript,
  SiSupabase,
  SiVercel,
  SiRender,
} from "react-icons/si";
import Reveal from "../../components/Reveal";
import nexusImg from "../../assets/optimized/nexus.webp";
import checklistImg from "../../assets/optimized/Checklist.webp";
import whatsappImg from "../../assets/optimized/whatsapp.webp";

const projects = [
  {
    id: 1,
    title: "Nexus AI",
    description:
      "Advanced AI orchestration system enabling autonomous agents, contextual memory, and extensible tool pipelines.",
    image: nexusImg,
    liveLink: "https://nexus-ai-mihu.vercel.app/",
    githubLink: "https://github.com/Mihu008/nexus-frontend",
    tags: ["React", "Java", "PostgreSQL", "Docker"],
    objectFit: "object-cover object-left-top",
  },
  {
    id: 2,
    title: "Unified Ecosystem Engine",
    description:
      "A high-performance integration platform that consolidates fragmented enterprise systems into a single, synchronized core for real-time data flow and operations.",
    image: checklistImg,
    liveLink: "https://checklist-delegation-app.vercel.app/",
    githubLink: "https://github.com/Mihu008/checklist-delegation-app",
    tags: ["React", "Express", "PostgreSQL", "JWT"],
  },
  {
    id: 3,
    title: "WhatsApp CRM App",
    description:
      "A real-time messaging application mimicking the WhatsApp Web interface. Features WebSocket-based instant messaging, media sharing, and reactive conversation updates.",
    image: whatsappImg,
    liveLink: "https://whatsapp-web-clone-mihu.vercel.app/",
    githubLink: "https://github.com/Mihu008/whatsapp-web-clone",
    tags: ["React", "Node.js", "WebSockets", "MongoDB"],
  },
  {
    id: 4,
    title: "NovaQuery - AI SQL Studio",
    description:
      "NovaQuery is a modern PostgreSQL workspace that combines a professional SQL IDE with intelligent database analysis, schema exploration, query optimization, automated documentation, and AI-assisted development.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=75&w=480&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
    tags: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Tailwind"],
  },
];

const techStack = [
  { name: "Java", icon: FaJava, color: "#f89820", percentage: "86%" },
  { name: "React", icon: FaReact, color: "#61dafb", percentage: "79%" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", percentage: "82%" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6", percentage: "80%" },
  { name: "Javascript", icon: SiJavascript, color: "#f7df1e", percentage: "84%" },
  { name: "Three.js", icon: SiThreedotjs, color: "#38bdf8", percentage: "78%" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06b6d4", percentage: "88%" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", percentage: "94%" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f", percentage: "62%" },
  { name: "Supabase", icon: SiSupabase, color: "#3ecf8e", percentage: "78%" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248", percentage: "92%" },
  { name: "MySQL", icon: SiMysql, color: "#4479a1", percentage: "76%" },
  { name: "Docker", icon: FaDocker, color: "#2496ed", percentage: "75%" },
  { name: "AWS", icon: FaAws, color: "#ff9900", percentage: "73%" },
  { name: "Vercel", icon: SiVercel, color: "#ffffff", percentage: "85%" },
  { name: "Render", icon: SiRender, color: "#46e3b7", percentage: "76%" },
  { name: "GitHub", icon: FaGithub, color: "#ffffff", percentage: "89%" },
  { name: "Framer Motion", icon: TbBrandFramerMotion, color: "#f43f5e", percentage: "72%" },
  { name: "Postman", icon: SiPostman, color: "#ff6c37", percentage: "81%" },
  { name: "Nodejs", icon: FaNodeJs, color: "#339933", percentage: "63%" },
];

const ProjectSection = () => {
  return (
    <section
      id="project"
      className="min-h-screen py-24 lg:px-24 md:px-10 px-4 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>&lt;!-- Featured Work --&gt;</span>
          </div>
          <h2 className="text-white text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </Reveal>

        {/* Project Cards Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 80} className="h-full">
              <article className="h-full backdrop-blur-md bg-slate-950/50 border border-blue-500/20 rounded-2xl flex flex-col group hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.18)] transition-all duration-300 overflow-hidden">
                
                {/* Image Container */}
                <div className="w-full h-48 sm:h-56 relative overflow-hidden bg-slate-900/80">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full ${project.objectFit || "object-cover"} transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100`}
                    loading="lazy"
                    decoding="async"
                    width={480}
                    height={320}
                  />

                  {/* Links Overlay */}
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-5">
                    {project.liveLink !== "#" && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-blue-500/20 border border-blue-400/40 text-cyan-300 hover:text-white hover:bg-cyan-500/40 hover:scale-110 transition-all duration-300"
                        title="Live Demo"
                      >
                        <FiExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.githubLink !== "#" && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-blue-500/20 border border-blue-400/40 text-cyan-300 hover:text-white hover:bg-cyan-500/40 hover:scale-110 transition-all duration-300"
                        title="Source Code"
                      >
                        <FiGithub className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-white text-lg font-bold mb-2.5 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300/90 font-mono text-xs sm:text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-blue-500/20">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={`${project.id}-${tag}-${tagIdx}`}
                        className="text-xs font-mono text-cyan-300 bg-blue-500/10 border border-blue-400/25 px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Competencies Section */}
        <Reveal className="w-full mt-24 backdrop-blur-md bg-slate-950/40 border border-blue-500/20 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(5,8,22,0.4)] flex flex-col gap-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-mono w-fit">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>&lt;!-- Engineering Focus --&gt;</span>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight text-cyan-300">
              1. Back-End Architecture & APIs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-300 font-mono text-sm leading-relaxed">
              {[
                "RESTful & GraphQL API Architecture",
                "Microservices Orchestration & Event Systems",
                "Database Optimization & Distributed Caching",
                "Scalable System Design & Low-Latency Engines",
                "Security Compliance (OAuth2, JWT, Spring Security)",
                "Deployment & CI/CD Pipeline Setup",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:border-blue-400/30 transition-colors">
                  <span className="text-cyan-400 font-bold">›</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight text-cyan-300">
              2. Front-End Engineering
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-300 font-mono text-sm leading-relaxed">
              {[
                "Modern JavaScript (ES6+) & React Patterns",
                "Reusable Component Systems",
                "Responsive UI Animations & Interactions",
                "Core Web Vitals & Frontend Performance",
                "State Management (Zustand/Redux)",
                "Cross-Browser Compatibility",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:border-blue-400/30 transition-colors">
                  <span className="text-cyan-400 font-bold">›</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight text-cyan-300">
              3. Design to Code & Reliability
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-300 font-mono text-sm leading-relaxed">
              {[
                "Figma → Code Design Systems",
                "SOLID Principles & Clean Architecture",
                "Server-Side Rendering & Edge Computing",
                "Docker Containerization & Cloud Deployment",
                "Automated Testing & CI/CD Workflows",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:border-blue-400/30 transition-colors">
                  <span className="text-cyan-400 font-bold">›</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Tech Stack Grid */}
        <Reveal className="w-full mt-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-mono mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>&lt;!-- Core Technologies --&gt;</span>
          </div>

          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {techStack.map((tech, idx) => (
              <div
                key={`${tech.name}-${idx}`}
                className="backdrop-blur-md bg-slate-950/40 border border-blue-500/20 rounded-2xl p-5 flex flex-col justify-between group hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-200 font-mono text-xs font-semibold">{tech.name}</span>
                  <span className="text-cyan-300 font-mono text-xs">{tech.percentage}</span>
                </div>
                <div className="flex justify-center items-center py-3">
                  <tech.icon
                    className="w-12 h-12 transition-transform group-hover:scale-110"
                    style={{ color: tech.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ProjectSection;
