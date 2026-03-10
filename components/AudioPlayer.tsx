"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer({ isPlaying: initialPlay = false }: { isPlaying?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(initialPlay);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (initialPlay && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio auto-play prevented:", e));
      setIsPlaying(true);
    }
  }, [initialPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log(e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center p-4 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-[0_8px_32px_0_rgba(15,23,42,0.15)] cursor-pointer hover:bg-white transition-all duration-300 mix-blend-luminosity" 
      onClick={togglePlay}
    >
      <audio ref={audioRef} src="/Music/background.mp3" loop />
      {isPlaying ? <Volume2 size={24} className="text-slate-900" /> : <VolumeX size={24} className="text-slate-900" />}
    </div>
  );
}
