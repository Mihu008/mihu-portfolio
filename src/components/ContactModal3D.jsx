import { useRef, useState } from "react";
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

  if (!isOpen) return null;

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md backdrop-blur-xl bg-slate-950/85 border border-cyan-500/30 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.25)] overflow-hidden p-6 sm:p-8 flex flex-col transition-all duration-300"
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>&lt;!-- Quick Message --&gt;</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Get in{" "}
              <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-xl bg-slate-900/80 border border-blue-500/30 text-gray-400 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-slate-800 transition-all duration-200"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {isSent ? (
          <div className="relative z-10 py-12 flex flex-col items-center justify-center text-center">
            <FiCheckCircle className="w-14 h-14 text-cyan-400 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
            <p className="text-gray-300/90 text-sm font-mono">
              Thanks for reaching out. I'll get back to you shortly!
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={sendEmail} className="relative z-10 space-y-4">
            <div>
              <label htmlFor="modal-name" className="block text-xs font-mono text-cyan-300/90 mb-1.5">
                NAME
              </label>
              <input
                type="text"
                name="user_name"
                id="modal-name"
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-blue-500/20 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300 font-mono text-sm"
              />
            </div>

            <div>
              <label htmlFor="modal-email" className="block text-xs font-mono text-cyan-300/90 mb-1.5">
                EMAIL
              </label>
              <input
                type="email"
                name="user_email"
                id="modal-email"
                required
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-blue-500/20 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300 font-mono text-sm"
              />
            </div>

            <div>
              <label htmlFor="modal-message" className="block text-xs font-mono text-cyan-300/90 mb-1.5">
                MESSAGE
              </label>
              <textarea
                name="message"
                id="modal-message"
                required
                rows="4"
                placeholder="How can I help you?"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-blue-500/20 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300 font-mono text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal3D;
