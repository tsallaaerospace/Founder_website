import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./sections/HeroSection";
import ScrollMorphSection from "./sections/ScrollMorphSection";
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

      {/* Footer */}
      <footer className="w-full py-16 px-6 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">
              BRINC <span className="text-cyan">Drones</span>
            </h3>
            <p className="text-gray-500 text-sm">
              Technology in service of public safety.
            </p>
          </div>
          
          <div className="flex gap-8">
            <a
              href="#"
              className="text-gray-400 hover:text-cyan transition-colors text-sm"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan transition-colors text-sm"
            >
              Products
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan transition-colors text-sm"
            >
              Careers
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan transition-colors text-sm"
            >
              Contact
            </a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-600 text-xs">
              © 2024 BRINC Drones. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
