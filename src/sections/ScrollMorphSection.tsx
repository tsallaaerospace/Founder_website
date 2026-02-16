"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Types ---
export type AnimationPhase = "hidden" | "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
  src: string;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Component ---
const IMG_WIDTH = 70;
const IMG_HEIGHT = 95;

function FlipCard({
  src,
  index,
  target,
}: FlipCardProps) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
      }}
      className="cursor-default"
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl shadow-md border border-gray-100 bg-gray-200">
        <img
          src={src}
          alt={`journey-${index}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>
    </motion.div>
  );
}

// --- Journey Images with Story Content ---
const JOURNEY_CARDS = [
  {
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=300&q=80",
    back: { title: "Early Prototype", description: "Built in a garage with salvaged components." },
  },
  {
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&q=80",
    back: { title: "First Team", description: "Two engineers. One mission." },
  },
  {
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&q=80",
    back: { title: "First Flight", description: "The moment vision became airborne." },
  },
  {
    image: "https://images.unsplash.com/photo-1531297461136-82lw9z1?w=300&q=80",
    back: { title: "Scaling Production", description: "From prototype to scalable manufacturing." },
  },
  {
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&q=80",
    back: { title: "PCB Design", description: "Custom electronics for autonomous flight." },
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&q=80",
    back: { title: "Workshop Days", description: "Late nights refining every detail." },
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
    back: { title: "Engineering Team", description: "World-class talent united by purpose." },
  },
  {
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=300&q=80",
    back: { title: "CAD Modeling", description: "Precision design for real-world impact." },
  },
  {
    image: "https://images.unsplash.com/photo-1508614589041-895b8c9d7ef5?w=300&q=80",
    back: { title: "Field Testing", description: "Real conditions. Real results." },
  },
  {
    image: "https://images.unsplash.com/photo-1565514020176-db98e3c15463?w=300&q=80",
    back: { title: "Production Line", description: "Quality at scale." },
  },
  {
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&q=80",
    back: { title: "Brainstorming", description: "Every breakthrough starts with an idea." },
  },
  {
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&q=80",
    back: { title: "Assembly", description: "Hand-crafted with precision." },
  },
  {
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=300&q=80",
    back: { title: "Flight Testing", description: "Pushing boundaries in the sky." },
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&q=80",
    back: { title: "Hardware Detail", description: "Engineering excellence in every component." },
  },
  {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&q=80",
    back: { title: "Team Session", description: "Collaboration fuels innovation." },
  },
  {
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&q=80",
    back: { title: "Iteration", description: "Constant improvement, never settling." },
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80",
    back: { title: "Packaging", description: "Ready to change the world." },
  },
  {
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&q=80",
    back: { title: "Deployment", description: "In the field, saving lives." },
  },
  {
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&q=80",
    back: { title: "Lab Environment", description: "Where science meets purpose." },
  },
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80",
    back: { title: "Vision Board", description: "The future we're building." },
  },
];

const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000;

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function ScrollMorphSection() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("hidden");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // --- Container Size ---
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });

    return () => observer.disconnect();
  }, []);

  // --- Virtual Scroll Logic ---
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);
  const animationStarted = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      const isAtTop = scrollRef.current <= 0;
      const isAtBottom = scrollRef.current >= MAX_SCROLL;
      const isScrollingUp = e.deltaY < 0;
      const isScrollingDown = e.deltaY > 0;

      // Only hijack scroll if the section header has reached the top of the viewport
      if (isScrollingDown && rect && rect.top > 5) {
        return;
      }

      // If at boundaries and trying to scroll out, allow native scroll
      if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
        return;
      }

      e.preventDefault();
      const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      const rect = sectionRef.current?.getBoundingClientRect();
      const isAtTop = scrollRef.current <= 0;
      const isAtBottom = scrollRef.current >= MAX_SCROLL;
      const isScrollingUp = deltaY < 0;
      const isScrollingDown = deltaY > 0;

      // Only hijack scroll if the section header has reached the top of the viewport
      if (isScrollingDown && rect && rect.top > 5) {
        touchStartY = touchY;
        return;
      }

      // If at boundaries and trying to scroll out, allow native scroll
      if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
        touchStartY = touchY; // Update to prevent jump when returning
        return;
      }

      if (e.cancelable) e.preventDefault();
      touchStartY = touchY;
      const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll]);

  // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  // 2. Scroll Rotation (Shuffling): Starts after morph
  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 1100]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });



  // --- Intro Sequence ---
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      onEnter: () => {
        if (animationStarted.current) return;
        animationStarted.current = true;

        setIntroPhase("scatter");
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      },
    });

    return () => trigger.kill();
  }, []);

  // --- Random Scatter Positions ---
  const scatterPositions = useMemo(() => {
    return JOURNEY_CARDS.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, []);

  // --- Render Loop (Manual Calculation for Morph) ---
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
    };
  }, [smoothMorph, smoothScrollRotate]);

  // --- Content Opacity ---
  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  return (
    <section ref={sectionRef} className="relative w-full h-screen flex flex-col bg-white overflow-hidden">
      {/* Section Header */}
      <div className="pt-16 pb-4 px-6 text-center shrink-0">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-4"
        >
          Building the Future,{" "}
          <span className="text-gray-500">One Prototype at a Time</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
        >
          What started as relentless curiosity evolved into a mission-driven company
          redefining aerospace intelligence.
        </motion.p>
      </div>

      {/* Morph Animation Container */}
      <div
        ref={containerRef}
        className="relative w-full flex-grow bg-white overflow-hidden"
      >


        {/* Container */}
        <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">
          {/* Intro Text (Fades out) */}
          <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-[44%] -translate-y-1/2">
            <motion.h3
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={
                introPhase === "circle" && morphValue < 0.5
                  ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, filter: "blur(10px)" }
              }
              transition={{ duration: 1 }}
              className="text-2xl font-medium tracking-tight text-gray-900 md:text-4xl"
            >
              From <span className="text-cyan">Vision</span> to{" "}
              <span className="text-cyan">Reality</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={
                introPhase === "circle" && morphValue < 0.5
                  ? { opacity: 0.5 - morphValue }
                  : { opacity: 0 }
              }
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-4 text-xs font-bold tracking-[0.2em] text-gray-500"
            >
              SCROLL TO EXPLORE
            </motion.p>
          </div>

          {/* Arc Active Content (Fades in) */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
          >
            <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-4">
              A Vision <span className="text-cyan">Engineered for Impact</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-lg leading-relaxed">
              From hand-built prototypes to advanced autonomous systems, the company was
              founded on one belief — technology should serve humanity.
            </p>
            <p className="text-sm md:text-base text-gray-600 max-w-lg leading-relaxed mt-4">
              Every iteration, every test flight, and every late-night breakthrough has
              shaped a mission-driven aerospace company built for real-world impact.
            </p>
          </motion.div>

          {/* Main Container */}
          <div className="relative flex items-center justify-center w-full h-full">
            {JOURNEY_CARDS.slice(0, TOTAL_IMAGES).map((card, i) => {
              let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

              if (introPhase === "hidden") {
                target = { ...scatterPositions[i], opacity: 0 };
              } else if (introPhase === "scatter") {
                target = scatterPositions[i];
              } else if (introPhase === "line") {
                const lineSpacing = 80;
                const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                const lineX = i * lineSpacing - lineTotalWidth / 2;
                target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
              } else {
                const isMobile = containerSize.width < 768;
                const minDimension = Math.min(containerSize.width, containerSize.height);

                const circleRadius = Math.min(minDimension * 0.35, 350);
                const circleAngle = (i / TOTAL_IMAGES) * 360;
                const circleRad = (circleAngle * Math.PI) / 180;
                const circlePos = {
                  x: Math.cos(circleRad) * circleRadius,
                  y: Math.sin(circleRad) * circleRadius - 60,
                  rotation: circleAngle + 90,
                };

                const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                const arcCenterY = arcApexY + arcRadius;
                const spreadAngle = isMobile ? 100 : 130;
                const startAngle = -90 - spreadAngle / 2;
                const step = spreadAngle / (TOTAL_IMAGES - 1);

                const scrollProgress = Math.min(Math.max(rotateValue / 1000, 0), 1);
                const maxRotation = spreadAngle * 1.2;
                const boundedRotation = -scrollProgress * maxRotation;

                const currentArcAngle = startAngle + i * step + boundedRotation;
                const arcRad = (currentArcAngle * Math.PI) / 180;

                const arcPos = {
                  x: Math.cos(arcRad) * arcRadius,
                  y: Math.sin(arcRad) * arcRadius + arcCenterY - 80,
                  rotation: currentArcAngle + 90,
                  scale: isMobile ? 1.4 : 1.8,
                };

                target = {
                  x: lerp(circlePos.x, arcPos.x, morphValue),
                  y: lerp(circlePos.y, arcPos.y, morphValue),
                  rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                  scale: lerp(1, arcPos.scale, morphValue),
                  opacity: 1,
                };
              }

              return (
                <FlipCard
                  key={i}
                  src={card.image}
                  index={i}
                  total={TOTAL_IMAGES}
                  phase={introPhase}
                  target={target}
                />
              );
            })}
          </div>
        </div>


      </div>
    </section>
  );
}
