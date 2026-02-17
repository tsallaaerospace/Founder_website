"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
    id: string;
    company: string;
    description: string;
    image: string;
}

const experiences: ExperienceItem[] = [
    {
        id: "01",
        company: "Airbus",
        description: "Contributing to the future of aerospace at Airbus, focusing on innovative systems and next-generation flight technologies that define the global standard for aviation excellence.",
        image: "/airbus.avif",
    },
    {
        id: "02",
        company: "ICON",
        description: "Pioneering new frontiers in personal aviation with ICON, working on aircraft that blend award-winning design with revolutionary flight safety and intuitive controls.",
        image: "/icon.jpg",
    },
    {
        id: "03",
        company: "SAAB Technologies",
        description: "Developing advanced defense and security solutions at SAAB, leveraging world-class engineering to create systems that protect and secure nations across the globe.",
        image: "/SAAB.webp",
    },
    {
        id: "04",
        company: "Bharat Forge Kalyani",
        description: "Driving industrial innovation and manufacturing excellence with Bharat Forge Kalyani, building critical components for the aerospace and defense sectors with indigenous precision.",
        image: "/Bharat_Forge.webp",
    },
];

export default function ExperienceSection() {
    const triggerRef = useRef<HTMLDivElement>(null);
    const titleContainerRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<HTMLDivElement>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=800%", // Longer scroll for more fluid transitions
                    pin: true,
                    scrub: 2, // Increased scrub for smoother, weighted movement
                    anticipatePin: 1,
                },
            });

            // 1. Initial Intro Zoom - Fly through 'EXPERIENCE'
            tl.to(titleContainerRef.current, {
                scale: 15,
                x: "4.5vw",
                y: "6vh",
                duration: 4, // Longer duration for smoother scaling
                ease: "none", // Linear response is best for scrub transitions
                force3D: true,
            }, 0)
                .to(titleContainerRef.current, {
                    autoAlpha: 0,
                    duration: 2,
                    ease: "none",
                }, 1); // Start fading out as scale increases

            // 2. Sequence Slides
            experiences.forEach((_, index) => {
                const slide = slideRefs.current[index];
                if (!slide) return;

                // Ensure all slides start hidden
                gsap.set(slide, { zIndex: index + 10, opacity: 0 });

                if (index === 0) {
                    // First slide reveals as we pass through intro
                    tl.fromTo(slide,
                        { opacity: 0, scale: 1.1, filter: "blur(10px)" },
                        {
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                            duration: 3,
                            ease: "none",
                            immediateRender: false
                        },
                        1.5 // Synchronized with intro title fade
                    );

                    // Animate text info
                    tl.from(slide.querySelectorAll(".company-title span"), {
                        y: 100,
                        rotateX: -90,
                        opacity: 0,
                        stagger: 0.08,
                        duration: 1.5,
                        ease: "power4.out",
                    }, 2.5);

                    tl.from(slide.querySelector(".description-text"), {
                        y: 30,
                        opacity: 0,
                        duration: 1.2,
                        ease: "power3.out"
                    }, 3.5);

                    tl.from(slide.querySelector(".action-button"), {
                        scale: 0.8,
                        opacity: 0,
                        duration: 1,
                        ease: "back.out(1.7)"
                    }, 3.2);
                } else {
                    // Subsequent slides: Professional Cross-Fade transition
                    const prevSlide = slideRefs.current[index - 1];
                    const startTime = index * 5; // More spacing for smoothness

                    // Phase: Previous slide fades out
                    tl.to(prevSlide!, {
                        opacity: 0,
                        scale: 0.95,
                        filter: "blur(20px)",
                        duration: 3,
                        ease: "none",
                    }, startTime);

                    // Phase: Current slide fades in
                    tl.fromTo(slide,
                        { opacity: 0, scale: 1.05, filter: "blur(20px)" },
                        {
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                            duration: 3,
                            ease: "none",
                            immediateRender: false
                        },
                        startTime + 0.5 // Slighter overlap for better blend
                    );

                    // Animate text info
                    tl.from(slide.querySelectorAll(".company-title span"), {
                        y: 80,
                        rotateX: -90,
                        opacity: 0,
                        stagger: 0.08,
                        duration: 1.5,
                        ease: "power4.out",
                    }, startTime + 1.5);

                    tl.from(slide.querySelector(".description-text"), {
                        y: 30,
                        opacity: 0,
                        duration: 1.2,
                        ease: "power3.out"
                    }, startTime + 2.5);

                    tl.from(slide.querySelector(".action-button"), {
                        scale: 0.8,
                        opacity: 0,
                        duration: 1,
                        ease: "back.out(1.7)"
                    }, startTime + 2.2);
                }
            });
        },
        { scope: triggerRef }
    );


    return (
        <div ref={triggerRef} className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
            {/* 3D Intro Word Layer */}
            <div
                ref={titleContainerRef}
                className="absolute inset-0 flex items-center justify-center z-[100] pointer-events-none will-change-transform"
            >
                <h2
                    className="text-[14vw] font-black text-white tracking-[-0.05em] leading-none uppercase select-none flex"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                    {"EXPERIENCE".split("").map((char, i) => (
                        <span key={i} className="inline-block relative">
                            <span
                                style={{
                                    color: "white",
                                    textShadow: "none"
                                }}
                            >
                                {char}
                            </span>
                            {char === "X" && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <svg className="w-full h-full p-[20%]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {/* Top Triangle */}
                                        <path d="M50 34 L56 42 L44 42 Z" stroke="white" strokeWidth="2" fill="white" />
                                        {/* Left Triangle */}
                                        <path d="M34 50 L42 44 L42 56 Z" stroke="white" strokeWidth="2" fill="white" />
                                        {/* Right Triangle */}
                                        <path d="M66 50 L58 44 L58 56 Z" stroke="white" strokeWidth="2" fill="white" />
                                    </svg>
                                </div>
                            )}
                        </span>
                    ))}
                </h2>
            </div>

            {/* Experience Slides Collection */}
            <div ref={slidesRef} className="absolute inset-0 w-full h-full">
                {experiences.map((exp, index) => (
                    <div
                        key={exp.id}
                        ref={(el) => { slideRefs.current[index] = el; }}
                        className="absolute inset-0 w-full h-full opacity-0 will-change-transform flex items-center justify-center"
                    >
                        {/* Background Image with Overlay */}
                        <div
                            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
                            style={{ backgroundImage: `url(${exp.image})` }}
                        />
                        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute inset-0 z-[1] bg-black/30 backdrop-blur-[2px]" />

                        {/* Slide Content */}
                        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white pointer-events-none perspective-1000">
                            {/* Centered Company Title */}
                            <div className="text-center">
                                <h3 className={`company-title font-black tracking-tighter uppercase leading-[0.9] flex flex-wrap justify-center max-w-4xl mx-auto ${exp.company.length > 10 ? "text-5xl md:text-[8.5vw]" : "text-7xl md:text-[12vw]"
                                    }`}>
                                    {exp.company.split(" ").map((word, wordIndex) => (
                                        <span key={wordIndex} className="inline-block whitespace-nowrap mx-[0.1em]">
                                            {word.split("").map((char, charIndex) => (
                                                <span
                                                    key={charIndex}
                                                    className="inline-block"
                                                    style={{ transformStyle: "preserve-3d" }}
                                                >
                                                    {char}
                                                </span>
                                            ))}
                                        </span>
                                    ))}
                                </h3>
                            </div>

                            {/* Bottom Right Info (Button + Description) */}
                            <div className="absolute bottom-16 right-8 md:right-24 max-w-sm md:max-w-md pointer-events-auto flex flex-col items-start md:items-end gap-8 text-left md:text-right">
                                <div className="action-button">
                                    <button className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#00CFFF] hover:text-white transition-all overflow-hidden relative">
                                        <span className="relative z-10 text-xs text-inherit">Explore Legacy</span>
                                        <ArrowUpRight size={18} className="relative z-10 group-hover:rotate-45 transition-transform" />
                                    </button>
                                </div>
                                <p className="description-text text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        </div>

                        {/* Large Subtle background text */}
                        <div className="absolute bottom-0 right-0 p-12 overflow-hidden pointer-events-none opacity-10">
                            <span className="text-[25vw] font-black leading-none uppercase select-none whitespace-nowrap -mb-20">
                                {exp.company}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Decorative Overlays */}
            <div className="absolute inset-0 z-[50] pointer-events-none border-[40px] border-black/10 mix-blend-overlay" />
        </div>
    );
}
