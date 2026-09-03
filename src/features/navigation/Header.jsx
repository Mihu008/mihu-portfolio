import logoImg from "../../assets/LOGO.png";
import { FiGithub, FiLinkedin, FiInstagram, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { useNavScroll } from "../../hooks/useNavScroll";
import ContactModal3D from "../../components/ContactModal3D";

const INSTAGRAM_URL = "https://instagram.com/mihu_singh.07?igsh=bjhndjl4bHB2MTVx";
const NAV_MAPPING = [
  { id: "home", label: "01 // HOME", name: "Home" },
  { id: "about", label: "02 // ABOUT", name: "About" },
  { id: "project", label: "03 // MISSIONS", name: "Missions" },
  { id: "certificates", label: "04 // ARCHIVES", name: "Archives" },
  { id: "contact", label: "05 // TRANSMISSION", name: "Transmission" },
];

const Header = () => {
  const { navigateToSection, prefetchOnHover } = useNavScroll();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((open) => !open);

  const handleNavClick = (e, sectionId) => {
    navigateToSection(e, sectionId, () => setIsOpen(false));
  };

  const [contactFormOpen, setContactFormOpen] = useState(false);
  const openContactForm = () => setContactFormOpen(true);
  const closeContactForm = () => setContactFormOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-slate-950/60 border-b border-cyan-500/15">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Brand & Telemetry */}
        <div className="header-animate-in flex items-center gap-3">
          <img
            src={logoImg}
            alt="Mihir Spacecraft Logo"
            className="h-10 w-10 rounded-xl object-contain shadow-[0_0_16px_rgba(34,211,238,0.35)] border border-cyan-500/40"
          />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold font-mono tracking-wider bg-gradient-to-r from-white via-cyan-100 to-blue-300 bg-clip-text text-transparent">
              MIHIR
            </span>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase">
              // COMMAND CENTER
            </span>
          </div>
        </div>

        {/* Spacecraft Navigation Items */}
        <nav className="lg:flex hidden items-center space-x-6 xl:space-x-8 header-animate-in header-delay-nav">
          {NAV_MAPPING.map((item) => (
            <a
              key={item.id}
              className="relative text-gray-300 hover:text-cyan-300 font-mono text-xs xl:text-sm tracking-wider transition-colors duration-300 group py-1.5"
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              onMouseEnter={() => prefetchOnHover(item.id)}
              onFocus={() => prefetchOnHover(item.id)}
            >
              <span className="text-cyan-400/60 group-hover:text-cyan-300 mr-1.5 transition-colors">
                [
              </span>
              <span>{item.label}</span>
              <span className="text-cyan-400/60 group-hover:text-cyan-300 ml-1.5 transition-colors">
                ]
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            </a>
          ))}
        </nav>

        {/* Telemetry Status & Social Uplinks */}
        <div className="md:flex hidden items-center space-x-4 header-animate-in header-delay-social">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-[11px] font-mono text-cyan-300 mr-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span>SYS.ONLINE</span>
          </div>

          <a
            className="text-gray-300 hover:text-cyan-300 transition-colors duration-300 p-2 rounded-lg hover:bg-cyan-500/10"
            href="https://github.com/Mihu008/Mihu008"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Uplink"
          >
            <FiGithub className="w-4 h-4" />
          </a>
          <a
            className="text-gray-300 hover:text-cyan-300 transition-colors duration-300 p-2 rounded-lg hover:bg-cyan-500/10"
            href="https://linkedin.com/in/mihirnetam-08m"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn Frequency"
          >
            <FiLinkedin className="w-4 h-4" />
          </a>
          <a
            className="text-gray-300 hover:text-cyan-300 transition-colors duration-300 p-2 rounded-lg hover:bg-cyan-500/10"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Visual Comms"
          >
            <FiInstagram className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={openContactForm}
            className="header-animate-in header-delay-cta ml-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-200 font-bold font-mono text-xs tracking-wider hover:bg-cyan-500/30 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300"
          >
            INITIATE UPLINK
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={toggleMenu}
            className="p-2 rounded-lg text-cyan-300 border border-cyan-500/20 bg-cyan-500/10 active:scale-95 transition-transform"
            aria-expanded={isOpen}
            aria-label="Toggle Navigation Console"
          >
            {isOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Console Drawer */}
      <div
        className="mobile-nav-panel md:hidden backdrop-blur-2xl bg-slate-950/95 border-b border-cyan-500/25 px-6 py-6 space-y-6"
        data-open={isOpen}
      >
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/15">
          <span className="text-xs font-mono text-cyan-400 tracking-wider">NAV CONSOLE // SECTOR 08</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
            ONLINE
          </span>
        </div>

        <nav className="flex flex-col space-y-3">
          {NAV_MAPPING.map((item) => (
            <a
              className="text-gray-300 hover:text-cyan-300 font-mono text-sm tracking-wider py-2 flex items-center justify-between group"
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              onFocus={() => prefetchOnHover(item.id)}
            >
              <span>{item.label}</span>
              <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
            </a>
          ))}
        </nav>

        <div className="pt-4 border-t border-cyan-500/15">
          <div className="flex space-x-6 justify-center mb-4">
            <a href="https://github.com/Mihu008/Mihu008" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-300">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/mihirnetam-08m" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-300 hover:text-cyan-300">
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-cyan-300">
              <FiInstagram className="w-5 h-5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              toggleMenu();
              openContactForm();
            }}
            className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-400/40 font-bold font-mono text-xs tracking-wider text-cyan-200 text-center"
          >
            ESTABLISH TRANSMISSION
          </button>
        </div>
      </div>

      <ContactModal3D isOpen={contactFormOpen} onClose={closeContactForm} />
    </header>
  );
};

export default Header;
