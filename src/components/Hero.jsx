'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { S, PHOTO } from './shared';
import { useLenis, scrollToId } from './LenisContext';

export default function Hero({ scrollY }) {
  const lenis = useLenis();
  const scale = 1 + Math.min(scrollY / 800, 0.15);
  const opacity = Math.max(0, 1 - scrollY / 400);
  const ty = -scrollY * 0.2;

  const roles = ["Full Stack Developer", "Creator", "Engineer"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 1500); // Change role every 1.5 seconds

    return () => clearInterval(intervalId);
  }, [roles.length]);

  return (
    <section id="hero" style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", background: "#080808", fontFamily: "'DM Sans', sans-serif" }}>
      <div className="absolute right-0 bottom-0 w-full md:w-[46%] h-full opacity-30 md:opacity-100 mix-blend-lighten pointer-events-none" style={{ transform: `scale(${scale})`, transformOrigin: "bottom center", zIndex: 1 }}>
        <img src={PHOTO} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", filter: "grayscale(100%) contrast(1.1)", maskImage: "linear-gradient(to right, transparent 0%, black 30%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%)" }} />
      </div>
      <div style={{ position: "relative", zIndex: 2, opacity, transform: `translateY(${ty}px)`, transition: "opacity 0.05s", width: "100%" }} className="px-5 w-full flex justify-center">
        <div className="w-full max-w-[1280px] mx-auto">
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 17, fontWeight: 300, marginBottom: 10 }}>👋 Hi there — I'm</p>
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(52px,11vw,168px)", lineHeight: 0.9, letterSpacing: -1, color: "#fff", margin: 0 }}>Arjun Dubey</h1>
          
          {/* Animated Role Text */}
          <div style={{ height: "clamp(52px, 11vw, 168px)", overflow: "hidden", position: "relative", marginTop: 5 }}>
              <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(52px,11vw,168px)", lineHeight: 0.9, letterSpacing: -1, color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.5)", margin: 0, position: "absolute", width: "100%" }}>
                <AnimatePresence mode="popLayout">
                  <motion.span
                  key={roles[roleIndex]}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ display: "inline-block" }}>
                  
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </h1>
          </div>

          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, fontWeight: 300, marginTop: 18 }}>based in Ahmedabad, India.</p>
          <div style={{ marginTop: 36 }} className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => scrollToId('projects', lenis)} style={{ ...S.cta, border: "none", cursor: "pointer", outline: "none", fontFamily: "inherit" }}>You need a frontend dev</button>
            <button onClick={() => scrollToId('contact', lenis)} style={{ ...S.cta, background: "transparent", border: "1.5px solid rgba(255,255,255,0.35)", cursor: "pointer", outline: "none", fontFamily: "inherit" }}>You need a backend dev</button>
          </div>
        </div>
      </div>
    </section>);

}