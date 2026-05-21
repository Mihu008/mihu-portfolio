import { lazy, Suspense } from "react"
import Header from "./features/navigation/Header"
import ScrollToTop from "./features/navigation/ScrollToTop"
import LazySection from "./components/LazySection"
import HashScrollHandler from "./components/HashScrollHandler"
import { SectionMountProvider } from "./context/SectionMountProvider"

const HeroSection = lazy(() => import("./features/home/HeroSection"));
const AboutSection = lazy(() => import("./features/home/AboutSection"));
const ProjectSection = lazy(() => import("./features/project/ProjectSection"));
const CertificatesSection = lazy(() => import("./features/certificates/CertificatesSection"));
const ContactSection = lazy(() => import("./features/contact/ContactSection"));

const HeroFallback = () => (
  <div className="min-h-screen bg-black" aria-hidden="true" />
);

export default function App() {
  return (
    <SectionMountProvider>
      <HashScrollHandler />
      <Header />
      <main>
        <Suspense fallback={<HeroFallback />}>
          <HeroSection />
        </Suspense>

        <LazySection sectionId="about" minHeight="80vh">
          <AboutSection />
        </LazySection>

        <LazySection sectionId="project" minHeight="100vh">
          <ProjectSection />
        </LazySection>

        <LazySection sectionId="certificates" minHeight="70vh">
          <CertificatesSection />
        </LazySection>

        <LazySection sectionId="contact" minHeight="60vh">
          <ContactSection />
        </LazySection>
      </main>
      <ScrollToTop />
    </SectionMountProvider>
  )
}
