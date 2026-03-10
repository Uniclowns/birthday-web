"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SequenceScroll from "@/components/SequenceScroll";
import BentoGrid from "@/components/BentoGrid";
import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <main className="bg-slate-50 min-h-screen">
      <AnimatePresence>
        {!entered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 text-white cursor-pointer"
            onClick={() => setEntered(true)}
          >
            <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "url('/sequence/ezgif-frame-001.webp')", backgroundSize: "cover", backgroundPosition: "center", filter: "blur(10px)" }} />
            <div className="text-center relative z-10 px-4">
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-8 font-medium tracking-wide drop-shadow-lg">
                For Jenni
              </h1>
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-white inline-flex flex-col items-center gap-2"
              >
                <span>Tap to begin</span>
                <span className="w-px h-12 bg-white/50 mt-4 block" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {entered && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <Navbar />
          <AudioPlayer isPlaying={true} />
          
          <SequenceScroll />
          
          {/* Content below the sequence scroll with overlap */}
          <div className="relative z-10 bg-white -mt-[100vh] w-full isolate rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] pt-12">
            
            <BentoGrid />
            
            {/* Stats Section with simple counter effect using framer motion */}
            <section className="py-24 px-6 md:px-12 bg-slate-50 border-t border-slate-100 text-center">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-3xl md:text-5xl text-slate-900 mb-12 md:mb-16 italic"
              >
                Every moment matters
              </motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="text-5xl md:text-7xl font-serif text-[#0f172a] mb-2 md:mb-4">365+</div>
                  <div className="text-[10px] md:text-sm font-sans tracking-widest text-slate-500 uppercase">Days Together</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-5xl md:text-7xl font-serif text-[#0f172a] mb-2 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">∞</div>
                  <div className="text-[10px] md:text-sm font-sans tracking-widest text-slate-500 uppercase">Memories</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-5xl md:text-7xl font-serif text-[#0f172a] mb-2 md:mb-4">1</div>
                  <div className="text-[10px] md:text-sm font-sans tracking-widest text-slate-500 uppercase">Love</div>
                </motion.div>
              </div>
            </section>
            
            <footer className="py-16 text-center bg-[#0a0a0a] text-white">
              <p className="font-serif text-2xl md:text-3xl italic mb-6 text-slate-300">"Forever & Always"</p>
              <div className="w-12 h-px bg-slate-700 mx-auto mb-6" />
              <p className="font-sans text-[10px] text-slate-500 tracking-[0.2em] uppercase">Made with love for Jenni</p>
            </footer>
          </div>
        </motion.div>
      )}
    </main>
  );
}
