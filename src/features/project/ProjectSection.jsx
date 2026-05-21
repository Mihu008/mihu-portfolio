import { FiGithub, FiExternalLink } from "react-icons/fi";
import { FaJava, FaReact, FaNodeJs, FaGithub, FaDocker } from "react-icons/fa6";
import { SiJavascript, SiPostgresql, SiSpringboot, SiMongodb, SiMysql, SiPostman, SiNotion } from "react-icons/si";
import Reveal from "../../components/Reveal";
import nexusImg from "../../assets/optimized/nexus.webp";
import checklistImg from "../../assets/optimized/Checklist.webp";

const projects = [
  {
    id: 1,
    title: "Nexus AI",
    description:
      "Advanced AI orchestration system enabling autonomous agents, contextual memory, and extensible tool pipelines.",
    image: nexusImg,
    liveLink: "#",
    githubLink: "https://github.com/Mihu008/nexus-frontend",
    tags: ["React", "Java", "PostgreSQL", "Docker"],
    objectFit: "object-cover object-left-top",
  },
  {
    id: 2,
    title: "Checklist Delegation System",
    description: "A multi-layer task delegation engine built for team workflows. Supports hierarchical task assignment, deadline tracking, and role-based access control with JWT-secured REST APIs.",
    image: checklistImg,
    liveLink: "#",
    githubLink: "#",
    tags: ["Node.js", "React.js", "PostgreSQL", "JWT", "Tailwind", "RBAC"],
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A collaborative Kanban board application with drag-and-drop functionality and team roles.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=75&w=480&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
    tags: ["React", "Redux", "Firebase"],
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description: "A real-time data visualization dashboard monitoring key business metrics and user engagement.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=75&w=480&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
    tags: ["D3.js", "Express", "PostgreSQL"],
  },
];

const techStack = [
  { name: "Java", icon: FaJava, color: "#f89820", percentage: "86%" },
  { name: "React", icon: FaReact, color: "#61dafb", percentage: "79%" },
  { name: "Javascript", icon: SiJavascript, color: "#f7df1e", percentage: "54%" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", percentage: "94%" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f", percentage: "62%" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248", percentage: "92%" },
  { name: "MySQL", icon: SiMysql, color: "#4479a1", percentage: "76%" },
  { name: "Postman", icon: SiPostman, color: "#ff6c37", percentage: "81%" },
  { name: "Nodejs", icon: FaNodeJs, color: "#339933", percentage: "63%" },
  { name: "Notion", icon: SiNotion, color: "#ffffff", percentage: "87%" },
  { name: "Github", icon: FaGithub, color: "#ffffff", percentage: "85%" },
  { name: "Docker", icon: FaDocker, color: "#2496ed", percentage: "85%" },
];

const ProjectSection = () => {
  return (
    <section
      id="project"
      className="min-h-screen bg-gradient-to-b from-blue-900 to-black py-24 lg:px-24 md:px-10 px-4 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <Reveal className="text-center mb-16">
          <p className="text-gray-500 font-mono mb-4 text-sm md:text-base">
            &lt;!-- My recent work --&gt;
          </p>
          <h2 className="text-white text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Featured <span className="text-blue-300">Projects</span>
          </h2>
        </Reveal>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 80} className="h-full">
              <article className="h-full bg-black/40 md:backdrop-blur-sm border border-blue-900/50 shadow-2xl flex flex-col group hover:border-blue-500/50 transition-colors duration-300 overflow-hidden">
                <div className="w-full h-48 sm:h-56 relative overflow-hidden bg-[#0a0f1c]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full ${project.objectFit || "object-cover"} transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100 lg:group-hover:mix-blend-normal`}
                    loading="lazy"
                    decoding="async"
                    width={480}
                    height={320}
                  />

                  <div className="absolute inset-0 bg-blue-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-black/60 text-white hover:text-blue-300 hover:scale-110 transition-transform rounded-full"
                      title="Live Demo"
                    >
                      <FiExternalLink className="w-6 h-6" />
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-black/60 text-white hover:text-blue-300 hover:scale-110 transition-transform rounded-full"
                      title="Source Code"
                    >
                      <FiGithub className="w-6 h-6" />
                    </a>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-white text-xl font-bold mb-3 group-hover:text-blue-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-blue-100 font-mono text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-blue-900/50">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={`${project.id}-${tag}-${tagIdx}`}
                        className="text-xs font-mono text-gray-400 bg-[#111] px-2 py-1 border border-gray-800"
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

        <Reveal className="w-full mt-32 border-t border-blue-900/50 pt-16 flex flex-col gap-16">
          <p className="text-gray-500 font-mono text-sm md:text-base mb-4">
            &lt;!-- What I do --&gt;
          </p>

          <div className="flex flex-col gap-6">
            <h3 className="text-white text-2xl font-bold tracking-tight">1. Back-End Development</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-[#a0a0a0] font-mono text-sm md:text-base leading-relaxed">
              {[
                "API Design & Development",
                "Server-Side Business Logic",
                "Performance & caching strategies",
                "Error handling & logging",
                "Deployment & environment configuration",
                "Third-party integrations",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-white text-2xl font-bold tracking-tight">2. Front-End Development</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-[#a0a0a0] font-mono text-sm md:text-base leading-relaxed">
              {[
                "HTML5 / CSS3 / JavaScript",
                "Tailwind CSS or Bootstrap",
                "Web animations & transitions",
                "Responsive layout using Flexbox & Grid",
                "React.js / Vue.js integration",
                "Cross-browser compatibility",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-white text-2xl font-bold tracking-tight">3. Design to Code</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-[#a0a0a0] font-mono text-sm md:text-base leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>Framer development</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>Clean, scalable, maintainable code</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span className="border border-[#7e57c2] px-3 py-1 bg-[#2a1a4a]/30 text-blue-100">SEO-ready structure</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>Mobile & tablet optimization</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>
                  Asset optimization for{" "}
                  <span className="border-b-2 border-fuchsia-500 text-white pb-0.5">performance</span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="w-full mt-32 border-t border-blue-900/50 pt-16 flex flex-col">
          <p className="text-gray-500 font-mono text-sm md:text-base mb-10">
            &lt;!-- My tech stack --&gt;
          </p>

          <div className="w-full border-t border-l border-blue-900/50 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {techStack.map((tech, idx) => (
              <div
                key={`${tech.name}-${idx}`}
                className="aspect-square p-4 sm:p-6 border-b border-r border-blue-900/50 flex flex-col justify-between group hover:bg-white/5 transition-colors"
              >
                <div className="flex justify-start">
                  <span className="text-gray-400 font-mono text-xs sm:text-sm font-semibold">{tech.name}</span>
                </div>
                <div className="flex justify-center items-center flex-grow py-4">
                  <tech.icon
                    className="w-12 h-12 sm:w-16 sm:h-16 transition-transform group-hover:scale-110"
                    style={{ color: tech.color }}
                  />
                </div>
                <div className="flex justify-end">
                  <span className="text-gray-400 font-mono text-xs sm:text-sm">{tech.percentage}</span>
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
