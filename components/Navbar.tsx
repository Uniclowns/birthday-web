"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { title: "The Story", href: "#" },
  { title: "Memories", href: "#gallery" },
  { title: "Invitation", href: "#" },
  { title: "Love", href: "#" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[60] p-5 bg-white mix-blend-difference rounded-full text-slate-900 transition-transform duration-300 hover:scale-105"
      >
        <div className="relative w-6 h-5 flex flex-col justify-between items-center group">
          <span className={`w-full h-[2px] bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
          <span className={`w-full h-[2px] bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-full h-[2px] bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100vh" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 left-0 w-full bg-[#0f172a] z-50 flex flex-col justify-center items-center overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: "url('/sequence/ezgif-frame-001.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
            
            <div className="flex flex-col gap-6 md:gap-10 text-center relative z-10">
              {links.map((link, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.a 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.33, 1, 0.68, 1] }}
                    className="block font-serif text-4xl md:text-6xl lg:text-8xl text-white hover:text-slate-300 hover:italic transition-all duration-300"
                  >
                    {link.title}
                  </motion.a>
                </div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 font-sans tracking-widest text-sm text-slate-400 uppercase"
            >
              Happy Birthday Jenni
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
