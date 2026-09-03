import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { FiX, FiSend, FiCheckCircle } from "react-icons/fi";

function ModalSphere() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#3ebeff"
          emissive="#06b6d4"
          emissiveIntensity={0.35}
          wireframe
          distort={0.3}
          speed={2}
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  );
}

const ContactModal3D = ({ isOpen, onClose }) => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.default.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        onClose();
      }, 1800);
    } catch (error) {
      console.error("Email send failed:", error?.text || error);
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md my-auto backdrop-blur-xl bg-slate-950/95 border border-cyan-500/35 rounded-3xl shadow-[0_0_70px_rgba(6,182,212,0.35)] overflow-hidden p-6 sm:p-8 flex flex-col transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background 3D Canvas */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-60">
          <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#3ebeff" />
            <ModalSphere />
          </Canvas>
        </div>

        {/* Header content */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-2 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              <span>COMMUNICATION BEACON // UPLINK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Establish{" "}
              <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                Transmission
              </span>
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close transmission console"
            className="p-2 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-gray-400 hover:text-cyan-300 hover:border-cyan-400/60 hover:bg-slate-800 transition-all duration-200"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {isSent ? (
          <div className="relative z-10 py-12 flex flex-col items-center justify-center text-center">
            <FiCheckCircle className="w-14 h-14 text-cyan-400 mb-4 animate-bounce shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
            <h3 className="text-xl font-bold text-white mb-2 font-mono">TRANSMISSION DISPATCHED</h3>
            <p className="text-cyan-200/90 text-xs sm:text-sm font-mono leading-relaxed">
              Signal acknowledged by sector MIHIR-01. Response frequency will open shortly!
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={sendEmail} className="relative z-10 space-y-4">
            <div>
              <label htmlFor="modal-name" className="block text-xs font-mono text-cyan-300/90 mb-1.5 tracking-wider">
                CALLSIGN // YOUR NAME
              </label>
              <input
                type="text"
                name="user_name"
                id="modal-name"
                required
                placeholder="Commander / Explorer Name"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300 font-mono text-sm shadow-inner"
              />
            </div>

            <div>
              <label htmlFor="modal-email" className="block text-xs font-mono text-cyan-300/90 mb-1.5 tracking-wider">
                COMM-CHANNEL // YOUR EMAIL
              </label>
              <input
                type="email"
                name="user_email"
                id="modal-email"
                required
                placeholder="frequency@domain.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300 font-mono text-sm shadow-inner"
              />
            </div>

            <div>
              <label htmlFor="modal-message" className="block text-xs font-mono text-cyan-300/90 mb-1.5 tracking-wider">
                TRANSMISSION PAYLOAD // MESSAGE
              </label>
              <textarea
                name="message"
                id="modal-message"
                required
                rows="4"
                placeholder="Initiate communication, project collaboration, or inquiry..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300 font-mono text-sm resize-none shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs sm:text-sm tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>DISPATCHING TRANSMISSION...</span>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  <span>[ DISPATCH TRANSMISSION // UPLINK ]</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ContactModal3D;
