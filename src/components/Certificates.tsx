import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Certificates() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Creates a large scroll container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Zoom text animation: smoothly completes (0 to 0.3 progress)
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 80]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.35], [1, 0]); 
  const textDisplay = useTransform(scrollYProgress, (v) => v > 0.4 ? "none" : "flex");

  // Certificates emerge cleanly right as the text finishes vanishing
  const certOpacity = useTransform(scrollYProgress, [0.28, 0.4], [0, 1]);
  const certScale = useTransform(scrollYProgress, [0.28, 0.4], [0, 1]); 

  // Very gentle Y parallax speeds so they don't crash into the navbar
  const y1 = useTransform(scrollYProgress, [0.3, 1], ["0vh", "-5vh"]);
  const y2 = useTransform(scrollYProgress, [0.3, 1], ["5vh", "-10vh"]);
  const y3 = useTransform(scrollYProgress, [0.3, 1], ["-2vh", "-8vh"]);
  const y4 = useTransform(scrollYProgress, [0.3, 1], ["10vh", "-4vh"]);

  // Adjusted 'top' positions pushed further down the screen (avoiding navbar)
  const certs = [
    { src: "/certificates/cert1.png", y: y1, top: "22%", left: "5%", width: "clamp(260px, 25vw, 400px)", rotate: -4, delay: 0 },
    { src: "/certificates/cert2.png", y: y2, top: "42%", right: "5%", width: "clamp(280px, 28vw, 420px)", rotate: 3, delay: 0.5 },
    { src: "/certificates/cert3.png", y: y3, top: "62%", left: "12%", width: "clamp(250px, 24vw, 380px)", rotate: 2, delay: 1 },
    { src: "/certificates/cert4.png", y: y4, top: "68%", right: "18%", width: "clamp(240px, 22vw, 350px)", rotate: -3, delay: 1.5 },
  ];

  return (
    <section id="certificates" ref={containerRef} style={{ height: "350vh", position: "relative", background: "#080808", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", width: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        
        {/* Zooming Text/Projection */}
        <motion.div style={{ position: "absolute", scale: textScale, opacity: textOpacity, display: textDisplay as any, zIndex: 10, flexDirection: "column", alignItems: "center", pointerEvents: "none" }}>
          <p style={{ color: "#e63c2f", fontSize: "1.5vw", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1vw" }}>Continuous Learning</p>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "16vw", color: "#fff", lineHeight: 0.8, margin: 0, whiteSpace: "nowrap" }}>
            CERTIFICATES
          </h2>
        </motion.div>

        {/* The Floating Certificates Reveal */}
        <motion.div style={{ position: "absolute", width: "100%", height: "100%", opacity: certOpacity, scale: certScale, zIndex: 5 }}>
           
           {/* Center Title that fades in when certificates arrive */}
           <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", zIndex: 1, pointerEvents: "none" }}>
              <p style={{ color: "#e63c2f", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Official</p>
              <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(48px,8vw,100px)", color: "rgba(255,255,255,0.05)", margin: 0, whiteSpace: "nowrap" }}>Recognitions</h3>
           </div>

           {/* Floating Certificates */}
           {certs.map((cert, i) => (
             <motion.div 
               key={i} 
               style={{ 
                 position: "absolute", 
                 top: cert.top, 
                 left: cert.left, 
                 right: cert.right, 
                 width: cert.width, 
                 y: cert.y,
                 zIndex: 2 
               }}
             >
               {/* Continuous Floating Bob Animation overlayed on scroll Y */}
               <motion.div
                 animate={{ y: [0, -15, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: cert.delay }}
                 style={{ 
                   borderRadius: 16, 
                   overflow: "hidden", 
                   border: "1px solid rgba(255,255,255,0.1)", 
                   background: "rgba(255,255,255,0.02)", 
                   padding: 12, 
                   boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)",
                   rotate: cert.rotate 
                 }}
               >
                 <a href={cert.src} target="_blank" rel="noopener noreferrer" style={{ display: "block", cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                   <img src={cert.src} alt={`Certificate ${i+1}`} style={{ width: "100%", height: "auto", borderRadius: 8, display: "block" }} />
                 </a>
               </motion.div>
             </motion.div>
           ))}
        </motion.div>

      </div>
    </section>
  );
}
