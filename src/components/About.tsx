import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Image comes in during early scroll (0.1 to 0.4) then stays firmly LOCKED for the remainder (0.4 to 1) 
  const imgY = useTransform(scrollYProgress, [0.1, 0.4], ["100vh", "0vh"]);
  const imgOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <section id="about" ref={containerRef} style={{ height: "300vh", position: "relative", background: "#0f0f0f", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Sticky container holds the layout incredibly solid while scrolling */}
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", padding: "0 52px", overflow: "hidden" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, maxWidth: 1100, margin: "0 auto", width: "100%", alignItems: "center" }}>
          
          {/* Left Text Layer */}
          <div>
            <p style={{ color: "#e63c2f", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Who I Am</p>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(48px,6vw,80px)", color: "#fff", lineHeight: 0.95, marginBottom: 28 }}>Building digital<br/>experiences<br/><span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)", color: "transparent" }}>that matter.</span></h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: 20 }}>I'm a passionate Full Stack Developer from Ahmedabad, India, crafting robust, scalable applications from pixel-perfect frontends to resilient backend architectures.</p>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, lineHeight: 1.9, fontWeight: 300 }}>I obsess over developer experience, performance, and clean code. Whether it's a React SPA, a Node.js microservice, or a complex database architecture — I bring the same energy to every layer of the stack.</p>
          </div>

          {/* Right Floating Image */}
          <div style={{ position: "relative", height: "100%", width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "flex-end", zIndex: 10 }}>
            <motion.img 
              src="/arjun-new.jpg"
              alt="Arjun Dubey Portrait"
              style={{
                y: imgY,
                opacity: imgOpacity,
                maxWidth: "100%",
                maxHeight: "75vh", 
                height: "auto",
                width: "auto",
                objectFit: "contain", 
                objectPosition: "bottom", 
                filter: "grayscale(100%)", 
                borderRadius: 20,
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}