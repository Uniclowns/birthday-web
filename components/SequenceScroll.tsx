"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "motion/react";

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Configurable frame length
  const totalFrames = 288; 
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload sequence images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        // Assuming sequence format: ezgif-frame-001.webp
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `/sequence/ezgif-frame-${paddedIndex}.webp`;
        
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalFrames) {
            setImagesLoaded(true);
          }
        };
        // Error handling if images aren't present yet so it doesn't break
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalFrames) setImagesLoaded(true);
        };
        
        loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!imagesLoaded || !canvasRef.current || !images.length) return;
    
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    
    const index = Math.min(Math.round(latest), totalFrames - 1);
    const img = images[index];
    
    if (img && img.complete && img.naturalHeight !== 0) {
      const canvas = canvasRef.current;
      const ctx = context;
      
      const canvasAspectRatio = canvas.width / canvas.height;
      const imgAspectRatio = img.width / img.height;
      
      let renderableWidth, renderableHeight, xStart, yStart;

      // Object-cover equivalent calculation
      if (imgAspectRatio < canvasAspectRatio) {
          renderableWidth = canvas.width;
          renderableHeight = img.height * (renderableWidth / img.width);
          xStart = 0;
          yStart = (canvas.height - renderableHeight) / 2;
      } else {
          renderableHeight = canvas.height;
          renderableWidth = img.width * (renderableHeight / img.height);
          yStart = 0;
          xStart = (canvas.width - renderableWidth) / 2;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, xStart, yStart, renderableWidth, renderableHeight);
    }
  });

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Trigger a re-draw (hacky but works by reading then setting same value if possible, 
        // motion values handle it internally so we just force a state update if really needed,
        // but scroll usually handles it)
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Text layer opacity and transforms mapping
  // 0%
  const opacity0 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [1, 1, 0, 0]);
  const y0 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // 25%
  const opacity30 = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
  const y30 = useTransform(scrollYProgress, [0.2, 0.4], [50, -50]);

  // 50%
  const opacity60 = useTransform(scrollYProgress, [0.45, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
  const y60 = useTransform(scrollYProgress, [0.45, 0.65], [50, -50]);

  // 75%
  const opacity90 = useTransform(scrollYProgress, [0.7, 0.75, 0.85, 0.9], [0, 1, 1, 0]);
  const y90 = useTransform(scrollYProgress, [0.7, 0.9], [50, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[500vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-white dark:bg-[#0a0a0a]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        {/* Overlays */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6 md:p-12 z-10 mix-blend-difference text-white">
          {/* 0% Text */}
          <motion.div style={{ opacity: opacity0, y: y0 }} className="absolute text-center max-w-4xl px-4">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl font-medium tracking-wide">Happy Birthday <br className="md:hidden" /><span className="italic opacity-80">Jenni</span></h1>
          </motion.div>
          
          {/* 30% Text */}
          <motion.div style={{ opacity: opacity30, y: y30 }} className="absolute text-center max-w-3xl px-4">
            <p className="font-serif text-base md:text-2xl lg:text-3xl leading-relaxed md:leading-loose text-shadow-sm">
              "My dearest Jenni, on this blessed day of thy birth, I offer thee my heart with deeper devotion than ever before, for thou art the gentle light that brightens my days and the quiet star that watches over my nights. Since the moment thou entered my life, joy has walked beside me and peace has found a home within my heart. Thy smile outshines the morning sun and thy presence turns ordinary moments into treasures beyond measure. May this new year of thy life bring thee laughter, warmth, and dreams fulfilled, and know this with certainty, my love for thee shall remain steadfast and true for all the days that heaven grants us."
            </p>
          </motion.div>

          {/* 60% Text */}
          <motion.div style={{ opacity: opacity60, y: y60 }} className="absolute text-center max-w-3xl px-4">
            <p className="font-serif text-base md:text-2xl lg:text-3xl leading-relaxed md:leading-loose text-shadow-sm">
              "My beloved Jenni, I humbly invite thee to share a pleasant evening with me this day at 17.00. Let us begin with a warm meal together at Local Kitchen, where we may sit and enjoy good food while speaking of gentle things that bring joy to the heart. After our meal, let us wander through the mall and spend our time together in laughter and quiet moments. And should thy heart desire, we may also watch a film together before the night draws to its rest. I ask one small favor of thee, fair Jenni, that thou would grace this evening in the attire I have chosen for thee, a black shirt, black trousers or a black skirt, and shoes that carry thee comfortably through our little adventure. Thy presence alone shall make the evening a treasure to me."
            </p>
          </motion.div>

          {/* 90% Text */}
          <motion.div style={{ opacity: opacity90, y: y90 }} className="absolute text-center max-w-3xl px-4">
            <p className="font-serif text-base md:text-2xl lg:text-3xl leading-relaxed md:leading-loose text-shadow-sm">
              "My beloved Jenni, upon this precious day I lift my quiet prayer for thee, that heaven may watch over thy steps and fill thy days with gentle peace and enduring joy. I pray that happiness shall meet thee in times of trial and that light shall surround thee in every season of life. And if it be granted by grace, may our days continue side by side, growing in love, kindness, and faith with each passing year."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
