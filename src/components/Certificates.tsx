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
    { src: "/certificates/cert1.png", y: y1, classes: "top-[10%] md:top-[22%] left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[5%] w-[80vw] md:w-[clamp(260px,25vw,400px)]", rotate: -4, delay: 0 },
    { src: "/certificates/cert2.png", y: y2, classes: "top-[32%] md:top-[42%] left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-[5%] w-[80vw] md:w-[clamp(280px,28vw,420px)]", rotate: 3, delay: 0.5 },
    { src: "/certificates/cert3.png", y: y3, classes: "top-[54%] md:top-[62%] left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[12%] w-[80vw] md:w-[clamp(250px,24vw,380px)]", rotate: 2, delay: 1 },
    { src: "/certificates/cert4.png", y: y4, classes: "top-[76%] md:top-[68%] left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-[18%] w-[80vw] md:w-[clamp(240px,22vw,350px)]", rotate: -3, delay: 1.5 },
  ];

  return (
    <section id="certificates" ref={containerRef} style={{ height: "350vh", position: "relative", background: "#080808", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", width: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        
        {/* Zooming Text/Projection */}
        <motion.div style={{ position: "absolute", scale: textScale, opacity: textOpacity, display: textDisplay as any, zIndex: 10, flexDirection: "column", alignItems: "center", pointerEvents: "none" }}>
          <p className="text-[12px] md:text-[1.5vw] mb-4 md:mb-[1vw]" style={{ color: "#e63c2f", letterSpacing: "0.2em", textTransform: "uppercase" }}>Continuous Learning</p>
          <h2 className="text-[18vw] md:text-[16vw]" style={{ fontFamily: "'Bebas Neue', cursive", color: "#fff", lineHeight: 0.8, margin: 0, whiteSpace: "nowrap" }}>
            CERTIFICATES
          </h2>
        </motion.div>

        {/* The Floating Certificates Reveal */}
        <motion.div style={{ position: "absolute", width: "100%", height: "100%", opacity: certOpacity, scale: certScale, zIndex: 5 }}>
           
           {/* Center Title & Ambient Glow that fades in when certificates arrive */}
           <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", zIndex: 1, pointerEvents: "none", width: "100%" }}>
              {/* Massive ambient radial glow backlight */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "70vw", height: "70vw", background: "radial-gradient(circle, rgba(230,60,47,0.15) 0%, rgba(255,255,255,0.05) 40%, rgba(8,8,8,0) 70%)", filter: "blur(40px)", zIndex: -1 }}></div>
              <p style={{ color: "#e63c2f", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, textShadow: "0 0 20px rgba(230,60,47,0.8)" }}>Official</p>
              <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(48px,9vw,110px)", color: "#fff", margin: 0, whiteSpace: "nowrap", textShadow: "0 10px 50px rgba(255,255,255,0.4)" }}>Recognitions</h3>
           </div>

           {/* Floating Certificates */}
           {certs.map((cert, i) => (
             <motion.div 
               key={i} 
               className={`absolute z-[2] ${cert.classes}`}
               style={{ y: cert.y }}
             >
               {/* Continuous Floating Bob Animation overlayed on scroll Y */}
               <motion.div
                 animate={{ y: [0, -15, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: cert.delay }}
                 style={{ 
                   borderRadius: 16, 
                   overflow: "hidden", 
                   border: "1px solid rgba(255,255,255,0.3)", 
                   background: "rgba(255,255,255,0.05)", 
                   padding: 12, 
                   boxShadow: "0 25px 50px -12px rgba(0,0,0,0.9), 0 0 40px rgba(255,255,255,0.15)",
                   rotate: cert.rotate 
                 }}
               >
                 <a href={cert.src} target="_blank" rel="noopener noreferrer" style={{ display: "block", cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                   <img src={cert.src} alt={`Certificate ${i+1}`} style={{ width: "100%", height: "auto", borderRadius: 8, display: "block", filter: "brightness(1.15)" }} />
                 </a>
               </motion.div>
             </motion.div>
           ))}
        </motion.div>

      </div>
    </section>
  );
}
