import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./sections/HeroSection";
import ScrollMorphSection from "./sections/ScrollMorphSection";
import ExperienceSection from "./sections/ExperienceSection";
import "./App.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Configure GSAP defaults
    gsap.config({
      nullTargetWarn: false,
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-black">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Hero Section with Split Title Animation */}
      <HeroSection />

      {/* Scroll Morph Journey Section */}
      <ScrollMorphSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Footer */}
      <footer className="relative w-full py-24 px-6 bg-black border-t border-white/5 overflow-hidden">
        {/* Large Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] select-none">
          <span className="text-[18vw] font-black tracking-tighter leading-none uppercase">
            TSALLA
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
            {/* Brand Column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-3xl font-black text-white tracking-tighter uppercase mb-4">
                TSALLA <span className="text-cyan">AEROSPACE</span>
              </h3>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed italic">
                "Relentless curiosity in pursuit of engineering excellence and autonomous flight intelligence."
              </p>
            </div>

            {/* Navigation Column */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
                {["Home", "Journey", "Experience", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-all text-xs uppercase tracking-widest font-bold"
                  >
                    {link}
                  </a>
                ))}
              </div>
              <div className="h-[1px] w-24 bg-white/10" />
              <p className="text-gray-600 text-[10px] uppercase tracking-[0.3em]">
                Bengaluru, India • Global Operations
              </p>
            </div>

            {/* Quote/Copyright Column */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <div className="mb-8 flex gap-6">
                <a href="#" className="text-gray-500 hover:text-cyan transition-colors">
                  <span className="text-xs font-bold tracking-widest uppercase">LinkedIn</span>
                </a>
                <a href="#" className="text-gray-500 hover:text-cyan transition-colors">
                  <span className="text-xs font-bold tracking-widest uppercase">X / Twitter</span>
                </a>
              </div>
              <p className="text-gray-600 text-[10px] uppercase tracking-widest">
                © 2024 TSALLA Aerospace Technologies.
              </p>
              <p className="text-gray-400 text-[9px] mt-1 font-mono uppercase opacity-50">
                Designed for the next generation of flight.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
