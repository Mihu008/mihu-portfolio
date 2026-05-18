import { lazy, Suspense } from "react"
import Header from "./features/navigation/Header"
import ScrollToTop from "./features/navigation/ScrollToTop"

const HeroSection = lazy(() => import("./features/home/HeroSection"));
const AboutSection = lazy(() => import("./features/home/AboutSection"));
const ProjectSection = lazy(() => import("./features/project/ProjectSection"));
const CertificatesSection = lazy(() => import("./features/certificates/CertificatesSection"));
const ContactSection = lazy(() => import("./features/contact/ContactSection"));

export default function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-gray-500 font-mono">Loading...</div>}>
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <CertificatesSection />
        <ContactSection />
      </Suspense>
      <ScrollToTop />
    </>
  )
}

