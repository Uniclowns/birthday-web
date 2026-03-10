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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 auto-rows-[280px] sm:auto-rows-[250px] md:auto-rows-[350px]">
        {images.map((num, i) => {
          const isLarge = i === 0 || i === 7 || i === 14;
          const isWide = i === 3 || i === 10 || i === 18;
          const isTall = i === 5 || i === 12;
          
          let spanClass = "col-span-1 row-span-1";
          if (isLarge) spanClass = "sm:col-span-2 sm:row-span-2";
          else if (isWide) spanClass = "sm:col-span-2 col-span-1 row-span-1";
          else if (isTall) spanClass = "row-span-2 col-span-1";
          
          const rotations = ["rotate-[-3deg]", "rotate-[2deg]", "rotate-[-1deg]", "rotate-[3deg]", "rotate-[0deg]", "rotate-[-2deg]"];
          const rotation = rotations[i % rotations.length];
          
          return (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              key={num} 
              className={`polaroid ${spanClass} ${rotation} relative w-full h-full cursor-pointer group`}
            >
              <div className="relative w-full h-full overflow-hidden bg-slate-200">
                <Image 
                  src={`/Bento Cards/${num}.jpg`}
                  alt={`Memory ${num}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale hover:grayscale-0"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
