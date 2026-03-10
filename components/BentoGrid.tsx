"use client";

import Image from "next/image";
import { motion } from "motion/react";

const images = Array.from({ length: 22 }, (_, i) => i + 1);

export default function BentoGrid() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto bg-transparent relative z-10" id="gallery">
      <div className="text-center mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-5xl md:text-7xl text-slate-900 mb-6 font-medium tracking-tight"
        >
          Our Memories
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans text-xl text-slate-500 max-w-2xl mx-auto"
        >
          A collection of beautiful moments together. Every picture tells a story of love, laughter, and a journey we continue to walk side by side.
        </motion.p>
      </div>
      
      <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-6 md:gap-10 space-y-6 md:space-y-10">
        {images.map((num, i) => {
          const rotations = ["rotate-[-3deg]", "rotate-[2deg]", "rotate-[-1deg]", "rotate-[3deg]", "rotate-[0deg]", "rotate-[-2deg]"];
          const rotation = rotations[i % rotations.length];

          return (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              key={num} 
              className={`polaroid ${rotation} relative w-full inline-block cursor-pointer group`}
            >
              {/* For masonry, we let the image define the height via intrinsic aspect ratio instead of absolute fill */}
              <div className="relative w-full overflow-hidden bg-slate-200">
                <Image 
                  src={`/Bento Cards/${num}.jpg`}
                  alt={`Memory ${num}`}
                  width={600}
                  height={800}
                  className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105 grayscale hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
