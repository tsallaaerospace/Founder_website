"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Twitter, Facebook, Instagram, Linkedin, Youtube, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Hero background image - local image
const HERO_BG_IMAGE = "/hero-founder.jpg";

export default function HeroSection() {
  // Position configuration for manual adjustment
  const LEFT_PARAGRAPH_TOP_OFFSET = "-167px";  // Adjust vertical position of left paragraph
  const LEFT_PARAGRAPH_X_OFFSET = "-100px";    // Adjust horizontal position of left paragraph (move left)
  const RIGHT_PARAGRAPH_TOP_OFFSET = "186px"; // Adjust vertical position of right paragraph (default: mt-12 lg:mt-24)
  const RIGHT_PARAGRAPH_X_OFFSET = "200px";    // Adjust horizontal position of right paragraph

  const containerRef = useRef<HTMLDivElement>(null);
  const vinayakRef = useRef<HTMLDivElement>(null);
  const tsallaRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Create a master timeline for the scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1.2, // Balanced value for responsiveness and smoothness
          invalidateOnRefresh: true,
          anticipatePin: 1, // Reduces 'jumping' during pinning
        },
      });

      // 1. Initial State & Split Animation - use force3D: true for GPU acceleration
      tl.to(vinayakRef.current, {
        y: "-100vh",
        force3D: true,
        ease: "power2.in",
      }, 0);

      tl.to(tsallaRef.current, {
        y: "100vh",
        force3D: true,
        ease: "power2.in",
      }, 0);

      tl.to(titleContainerRef.current, {
        opacity: 0,
        ease: "none",
      }, 0.4);

      // 2. Background zoom & Darken
      tl.to(bgRef.current, {
        scale: 1.15,
        ease: "none",
      }, 0);

      tl.to(foregroundRef.current, {
        scale: 1.15,
        ease: "none",
      }, 0);

      tl.to(foregroundRef.current, {
        opacity: 0,
        ease: "power1.inOut",
      }, 0.05);

      tl.to(overlayRef.current, {
        opacity: 0.9,
        ease: "none",
      }, 0.3);

      // 3. Content Reveal - Delayed until titles are nearly gone
      tl.fromTo(contentRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", pointerEvents: "auto" },
        0.35
      );

      // 4. Scroll Indicator Fade Out
      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.1
      }, 0);

    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Background Image (behind everything) */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${HERO_BG_IMAGE})`,
            backgroundPosition: "center 30%",
          }}
        />
      </div>

      {/* Subtle dark overlay behind text for readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(
            to top,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.2) 40%,
            rgba(0, 0, 0, 0.1) 100%
          )`,
        }}
      />

      {/* Split Title - VINAYAK & TSALLA (centered, behind person) */}
      <div
        ref={titleContainerRef}
        className="absolute inset-0 z-[5] pointer-events-none flex flex-col items-center justify-center will-change-opacity"
      >
        {/* VINAYAK - moves up on scroll */}
        <div ref={vinayakRef} className="will-change-transform">
          <h1
            className="text-[16vw] md:text-[14vw] lg:text-[12vw] font-black uppercase tracking-tighter leading-[0.85] text-center"
            style={{
              color: "#00CFFF",
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            VINAYAK
          </h1>
        </div>

        {/* TSALLA - moves down on scroll */}
        <div ref={tsallaRef} className="will-change-transform">
          <h1
            className="text-[16vw] md:text-[14vw] lg:text-[12vw] font-black uppercase tracking-tighter leading-[0.85] text-center"
            style={{
              color: "#FFFFFF",
              textShadow: "0 0 60px rgba(255, 255, 255, 0.2), 0 2px 30px rgba(0, 0, 0, 0.8)",
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            TSALLA
          </h1>
        </div>
      </div>

      {/* Foreground person layer - creates "text behind person" effect */}
      <div
        ref={foregroundRef}
        className="absolute inset-0 z-[8] pointer-events-none will-change-transform"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform delay-0"
          style={{
            backgroundImage: `url(${HERO_BG_IMAGE})`,
            backgroundPosition: "center 30%",
            maskImage: `radial-gradient(ellipse 26% 90% at 50% 50%, black 25%, transparent 65%)`,
            WebkitMaskImage: `radial-gradient(ellipse 26% 90% at 50% 50%, black 25%, transparent 65%)`,
          }}
        />
      </div>

      {/* Dynamic dark overlay - darkens as paragraphs appear */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[9] opacity-30 will-change-opacity"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.4) 40%,
            rgba(0, 0, 0, 0.9) 100%
          )`,
        }}
      />

      {/* Founder Story Content - Appears after title splits */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-20 flex items-end md:items-center px-6 md:px-12 lg:px-24 pb-16 md:pb-0 opacity-0 pointer-events-none"
      >
        <div className="w-full max-w-[90rem] mx-auto pt-20">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-24">
            {/* Left side - Company Info */}
            <div className="md:w-[45%]" style={{ marginTop: LEFT_PARAGRAPH_TOP_OFFSET, transform: `translateX(${LEFT_PARAGRAPH_X_OFFSET})` }}>
              <p className="text-2xl md:text-3xl lg:text-4xl text-white leading-tight font-light">
                <span className="text-[#00CFFF] font-semibold">Vinayak Tsalla</span> is the founder and CEO of{" "}
                <span className="text-[#00CFFF] font-semibold">Tsalla Aerospace Technologies</span> Private Limited,
              </p>

              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed font-light">
                an innovative drone technology company based in <span className="text-[#00CFFF] font-semibold">Bengaluru</span>,
                working to revolutionize the future of unmanned systems.
              </p>
            </div>

            {/* Right side - Personal Passion & Vision */}
            <div className="md:w-[45%]" style={{ marginTop: RIGHT_PARAGRAPH_TOP_OFFSET, transform: `translateX(${RIGHT_PARAGRAPH_X_OFFSET})` }}>
              <p className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-light">
                Vinayak has always loved science and technology. His passion for engineering led him to establish Tsalla Aerospace
                to build indigenous, world-class aerospace solutions for both defense and commercial sectors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none"
      >
        <span className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase mb-4">
          Scroll to Explore
        </span>
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-[#00CFFF] rounded-full animate-bounce" />
        </div>
      </div>

      {/* Navbar - Top Left */}
      <nav className="absolute top-8 left-8 z-50 px-8 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex items-center gap-8">
        {["About Vinayak", "News and Media", "Tsalla Drones"].map((item, index) => (
          <a
            key={index}
            href="#"
            className="text-xs md:text-sm font-bold text-white/90 hover:text-[#00CFFF] transition-colors duration-300 uppercase tracking-widest"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Social Media Links - Top Right */}
      <div className="absolute top-8 right-8 z-50 flex items-center gap-3 p-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
        {[Twitter, Facebook, Instagram, Linkedin, Youtube, Globe].map((Icon, index) => (
          <a
            key={index}
            href="#"
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-black hover:bg-[#00CFFF] hover:text-white transition-all duration-300 transform hover:scale-110"
          >
            <Icon size={14} strokeWidth={2.5} />
          </a>
        ))}
      </div>
    </section>
  );
}
