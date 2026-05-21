import { FiGithub, FiLinkedin, FiInstagram, FiMenu, FiX } from "react-icons/fi";

const INSTAGRAM_URL = "https://instagram.com/mihu_singh.07?igsh=bjhndjl4bHB2MTVx";
import { useState, useRef } from "react";
import { useNavScroll } from "../../hooks/useNavScroll";

const NAV_ITEMS = ["Home", "About", "Project", "Certificates", "Contact"];

const Header = () => {
  const { navigateToSection, prefetchOnHover } = useNavScroll();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((open) => !open);

  const handleNavClick = (e, item) => {
    const sectionId = item.toLowerCase();
    navigateToSection(e, sectionId, () => setIsOpen(false));
  };

  const [contactFormOpen, setContactFormOpen] = useState(false);
  const openContactForm = () => setContactFormOpen(true);
  const closeContactForm = () => setContactFormOpen(false);

  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    const emailjs = await import("@emailjs/browser");
    emailjs.default
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )
      .then(
        () => closeContactForm(),
        (error) => console.error("Email send failed:", error.text)
      );
  };

  return (
    <header className="absolute w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <div className="header-animate-in flex items-center">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center text-cyan-600 front-bold text-xl mr-3">
            M
          </div>
          <span className="text-xl font-bold font-mono bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
            Mihir
          </span>
        </div>

        <nav className="lg:flex hidden space-x-8 header-animate-in header-delay-nav">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.toLowerCase();
            return (
              <a
                key={item}
                className="relative text-gray-800 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 font-mono text-sm tracking-wide transition-colors duration-300 group"
                href={`#${sectionId}`}
                onClick={(e) => handleNavClick(e, item)}
                onMouseEnter={() => prefetchOnHover(sectionId)}
                onFocus={() => prefetchOnHover(sectionId)}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all" />
              </a>
            );
          })}
        </nav>

        <div className="md:flex hidden items-center space-x-4 header-animate-in header-delay-social">
          <a
            className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300"
            href="https://github.com/Mihu008/Mihu008"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub className="w-5 h-5" />
          </a>
          <a
            className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300"
            href="https://linkedin.com/in/mihirnetam-08m"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="w-5 h-5" />
          </a>
          <a
            className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FiInstagram className="w-5 h-5" />
          </a>

          <button
            type="button"
            onClick={openContactForm}
            className="header-animate-in header-delay-cta ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-blue-700 font-bold font-mono text-sm tracking-wide hover:from-blue-700 hover:to-cyan-700 hover:text-white transition-all duration-500"
          >
            Get in Touch
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={toggleMenu}
            className="text-grey-300 active:scale-95 transition-transform"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className="mobile-nav-panel md:hidden bg-white dark:bg-gray-900 shadow-lg px-4 py-5 space-y-5"
        data-open={isOpen}
      >
        <nav className="flex flex-col space-y-3">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.toLowerCase();
            return (
              <a
                className="text-gray-300 font-mono tracking-wide py-2"
                key={item}
                href={`#${sectionId}`}
                onClick={(e) => handleNavClick(e, item)}
                onFocus={() => prefetchOnHover(sectionId)}
              >
                {item}
              </a>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-5">
            <a href="https://github.com/Mihu008/Mihu008" target="_blank" rel="noopener noreferrer">
              <FiGithub className="w-5 h-5 text-gray-300" />
            </a>
            <a href="https://linkedin.com/in/mihirnetam-08m" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin className="w-5 h-5 text-gray-300" />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FiInstagram className="w-5 h-5 text-gray-300" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              toggleMenu();
              openContactForm();
            }}
            className="mt-4 block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 font-bold font-mono text-sm tracking-wide text-white"
          >
            Contact Me
          </button>
        </div>
      </div>

      {contactFormOpen && (
        <div
          className="contact-overlay fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="contact-panel bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-300">Get in Touch</h2>
              <button type="button" onClick={closeContactForm} aria-label="Close form">
                <FiX className="w-5 h-5 text-gray-300 font-extrabold" />
              </button>
            </div>

            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  id="email"
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows="4"
                  placeholder="How can I help you?"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-600/50 active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
