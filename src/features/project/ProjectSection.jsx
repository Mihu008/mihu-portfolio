import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { FaJava, FaReact, FaNodeJs, FaGithub, FaDocker } from "react-icons/fa6";
import { SiJavascript, SiPostgresql, SiSpringboot, SiMongodb, SiMysql, SiPostman, SiNotion } from "react-icons/si";
import nexusImg from "../../assets/nexus.png";

// Dummy project data
const projects = [
  {
    id: 1,
    title: "Nexus AI",
    description: "Advanced AI orchestration system enabling autonomous agents, contextual memory, and extensible tool pipelines.",
    image: nexusImg,
    liveLink: "#",
    githubLink: "https://github.com/Mihu008/nexus-frontend",
    tags: ["React", "Java", "PostgreSQL","Docker"],
    objectFit: "object-cover object-left-top",
  },
  {
    id: 2,
    title: "Portfolio Template",
    description: "A highly customizable, responsive portfolio template built for developers and designers.",
    image: "https://images.unsplash.com/photo-1507238692062-8b0feae40f6b?q=80&w=800&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
    tags: ["Tailwind", "Framer", "Vite"],
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A collaborative Kanban board application with drag-and-drop functionality and team roles.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=800&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
    tags: ["React", "Redux", "Firebase"],
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description: "A real-time data visualization dashboard monitoring key business metrics and user engagement.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
    tags: ["D3.js", "Express", "PostgreSQL"],
  },
];

// Tech stack data
const techStack = [
  { name: 'Java', icon: FaJava, color: '#f89820', percentage: '86%' },
  { name: 'React', icon: FaReact, color: '#61dafb', percentage: '79%' },
  { name: 'Javascript', icon: SiJavascript, color: '#f7df1e', percentage: '54%' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791', percentage: '94%' },
  { name: 'Spring Boot', icon: SiSpringboot, color: '#6db33f', percentage: '62%' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248', percentage: '92%' },
  { name: 'MySQL', icon: SiMysql, color: '#4479a1', percentage: '76%' },
  { name: 'Postman', icon: SiPostman, color: '#ff6c37', percentage: '81%' },
  { name: 'Nodejs', icon: FaNodeJs, color: '#339933', percentage: '63%' },
  { name: 'Notion', icon: SiNotion, color: '#ffffff', percentage: '87%' },
  { name: 'Github', icon: FaGithub, color: '#ffffff', percentage: '85%' },
  { name: 'Docker', icon: FaDocker, color: '#2496ed', percentage: '85%' },
];

const ProjectSection = () => {
  return (
    <section
      id="project"
      className="min-h-screen
        bg-gradient-to-b from-blue-900 to-black
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
          className="text-center mb-16"
        >
          <p className="text-gray-500 font-mono mb-4 text-sm md:text-base">
            &lt;!-- My recent work --&gt;
          </p>
          <h2 className="text-white text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Featured <span className="text-blue-300">Projects</span>
          </h2>
        </motion.div>

        {/* 4-Column Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/40 backdrop-blur-sm border border-blue-900/50 shadow-2xl flex flex-col group hover:border-blue-500/50 transition-colors duration-300 overflow-hidden"
            >
              {/* Thumbnail Container */}
              <div className="w-full h-48 sm:h-56 relative overflow-hidden bg-[#0a0f1c]">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full ${project.objectFit || "object-cover"} transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal`}
                  loading="lazy"
                />
                
                {/* Hover Overlay with Links */}
                <div className="absolute inset-0 bg-blue-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black/60 text-white hover:text-blue-300 hover:scale-110 transition-all rounded-full"
                    title="Live Demo"
                  >
                    <FiExternalLink className="w-6 h-6" />
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black/60 text-white hover:text-blue-300 hover:scale-110 transition-all rounded-full"
                    title="Source Code"
                  >
                    <FiGithub className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-white text-xl font-bold mb-3 group-hover:text-blue-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-blue-100 font-mono text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tech Tags */}
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
            </motion.div>
          ))}
        </div>

        {/* --- What I Do Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="w-full mt-32 border-t border-blue-900/50 pt-16 flex flex-col gap-16"
        >
          <p className="text-gray-500 font-mono text-sm md:text-base mb-4">
            &lt;!-- What I do --&gt;
          </p>

          {/* 1. Back-End */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-2xl font-bold tracking-tight">
              1. Back-End Development
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-[#a0a0a0] font-mono text-sm md:text-base leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>API Design &amp; Development</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>Server-Side Business Logic</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>Performance &amp; caching strategies</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>Error handling &amp; logging</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>Deployment &amp; environment configuration</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>Third-party integrations</span>
              </div>
            </div>
          </div>

          {/* 2. Front-End */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-2xl font-bold tracking-tight">
              2. Front-End Development
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-[#a0a0a0] font-mono text-sm md:text-base leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>HTML5 / CSS3 / JavaScript</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>Tailwind CSS or Bootstrap</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>Web animations &amp; transitions</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>Responsive layout using Flexbox &amp; Grid</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>React.js / Vue.js integration</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>Cross-browser compatibility</span>
              </div>
            </div>
          </div>

          {/* 3. Design to Code */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-2xl font-bold tracking-tight">
              3. Design to Code
            </h3>
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
                <span className="border border-[#7e57c2] px-3 py-1 bg-[#2a1a4a]/30 text-blue-100">
                  SEO-ready structure
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>Mobile &amp; tablet optimization</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-500 mt-1">•</span>
                <span>
                  Asset optimization for <span className="border-b-2 border-fuchsia-500 text-white pb-0.5">performance</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- My Tech Stack Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="w-full mt-32 border-t border-blue-900/50 pt-16 flex flex-col will-change-transform"
        >
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
                  <tech.icon className="w-12 h-12 sm:w-16 sm:h-16 transition-transform group-hover:scale-110" style={{ color: tech.color }} />
                </div>
                <div className="flex justify-end">
                  <span className="text-gray-400 font-mono text-xs sm:text-sm">{tech.percentage}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectSection;
