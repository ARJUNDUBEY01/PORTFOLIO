'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function SkillCard({ data }) {
  return (
    <div style={{ background: "rgba(12,12,12,0.95)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "40px 32px", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: data.color }} />
        <span style={{ color: data.color, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>{data.cat}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {data.items.map((item) =>
        <span key={item} style={{ padding: "8px 18px", borderRadius: 50, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)", fontSize: 13 }}>{item}</span>
        )}
      </div>
    </div>);

}

export default function Skills() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const leftY = useTransform(scrollYProgress, [0, 0.3], ["120vh", "0vh"]);
  const rightY = useTransform(scrollYProgress, [0.1, 0.4], ["120vh", "0vh"]);
  const middleY = useTransform(scrollYProgress, [0.4, 0.75], ["120vh", "0vh"]);

  const skills = [
  { cat: "Frontend", color: "#e63c2f", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"] },
  { cat: "Backend", color: "#3c8be6", items: ["Node.js", "Express", "NestJS", "REST APIs", "GraphQL", "WebSockets"] },
  { cat: "Database & Cloud", color: "#3ce68b", items: ["PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "CI/CD"] }];


  return (
    <section id="skills" ref={containerRef} style={{ height: "400vh", position: "relative", background: "#080808", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", width: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        
        {/* Center Sticky Text */}
        <div style={{ position: "absolute", zIndex: 1, textAlign: "center", width: "100%" }}>
          <p style={{ color: "#e63c2f", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>What I Use</p>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(64px,12vw,160px)", color: "#fff", lineHeight: 0.9, margin: 0 }}>My Tech<br /><span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>Arsenal.</span></h2>
        </div>

        {/* Cards Wrapper */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1300, height: "100%", margin: "0 auto", pointerEvents: "none" }}>
          
          {/* Card 1: Left */}
          <motion.div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[2%] top-[5%] md:top-[25%] w-[90vw] md:w-[clamp(280px,30vw,350px)]" style={{ y: leftY, pointerEvents: "auto" }}>
            <SkillCard data={skills[0]} />
          </motion.div>

          {/* Card 2: Right */}
          <motion.div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-[2%] top-[35%] md:top-[40%] w-[90vw] md:w-[clamp(280px,30vw,350px)]" style={{ y: rightY, pointerEvents: "auto" }}>
            <SkillCard data={skills[1]} />
          </motion.div>

          {/* Card 3: Middle (below text) */}
          <motion.div className="absolute left-1/2 -translate-x-1/2 top-[65%] w-[90vw] md:w-[clamp(280px,30vw,380px)] z-10" style={{ y: middleY, pointerEvents: "auto" }}>
            <SkillCard data={skills[2]} />
          </motion.div>

        </div>
      </div>
    </section>);

}