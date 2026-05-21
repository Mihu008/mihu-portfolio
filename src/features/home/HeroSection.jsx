import SplineScene from "../../components/SplineScene";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-[100dvh]
        bg-gradient-to-b from-blue-900 to-black
        flex flex-col-reverse lg:flex-row
        items-center lg:items-center
        justify-end lg:justify-between
        gap-8 lg:gap-12
        px-4 md:px-10 lg:px-24
        pt-24 pb-12 lg:py-20
        relative
        overflow-hidden"
    >
      <div className="z-20 relative w-full lg:max-w-[48%] xl:max-w-[52%] shrink-0 lg:pointer-events-none">
        <h1 className="hero-fade-up hero-delay-1 text-white text-5xl md:text-7xl lg:text-[7.5rem] font-bold mb-6 lg:mb-8 leading-[1.05] tracking-tight lg:pointer-events-auto">
          Full Stack <br /> Developer
        </h1>

        <p className="hero-fade-up hero-delay-2 text-blue-100 font-mono md:max-w-xl lg:max-w-2xl text-xl md:text-2xl leading-relaxed lg:pointer-events-auto">
          design and build scalable, secure, and high-performance applications,
          transforming complex requirements into seamless end-to-end digital solutions.
        </p>
      </div>

      <div className="hero-spline-container relative z-30 w-full max-w-md sm:max-w-lg lg:max-w-none lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[50%] xl:w-[48%] h-[36vh] sm:h-[40vh] md:h-[44vh] lg:h-full lg:min-h-0 shrink-0">
        <SplineScene scene={import.meta.env.VITE_SPLINE_URL} />
      </div>
    </section>
  );
};

export default HeroSection;
