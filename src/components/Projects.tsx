'use client';
import { useState, useEffect, useRef } from 'react';
import { useInView } from './hooks';

export default function Projects() {
  const [scrollX, setScrollX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref2, inView] = useInView(0.05);
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      if (rect.top <= 0 && rect.bottom >= wh) {
        setScrollX(Math.min(1, -rect.top / (rect.height - wh)));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const projects = [
    { title:"E-Commerce Platform", tag:"Full Stack", desc:"React + Node.js + PostgreSQL. Cart, payments, admin dashboard, real-time inventory.", color:"#e63c2f", tech:["React","Node","Stripe","PostgreSQL"] },
    { title:"SaaS Dashboard", tag:"Frontend", desc:"Next.js analytics with live charts, user roles, dark/light mode and export features.", color:"#3c8be6", tech:["Next.js","TypeScript","Recharts","Tailwind"] },
    { title:"REST API Engine", tag:"Backend", desc:"High-performance Node.js microservice handling 10k+ req/s with Redis caching.", color:"#3ce68b", tech:["Node.js","Express","Redis","Docker"] },
    { title:"Real-time Chat", tag:"Full Stack", desc:"WebSocket messaging with rooms, media uploads, and end-to-end encryption.", color:"#e6c03c", tech:["Socket.io","React","MongoDB","AWS S3"] },
    { title:"Portfolio CMS", tag:"Full Stack", desc:"Headless CMS with NestJS and React, drag-and-drop editor and markdown support.", color:"#c03ce6", tech:["NestJS","React","GraphQL","Prisma"] },
  ];
  const cardW = 380, gap = 28;
  const maxTx = projects.length * (cardW + gap) - 900;

  return (
    <section id="projects" ref={containerRef} style={{ height: "500vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#0f0f0f", display: "flex", flexDirection: "column", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
        <div ref={ref2} style={{ padding: "0 52px", marginBottom: 48 }}>
          <p style={{ color: "#e63c2f", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, opacity: inView?1:0, transition: "all 0.6s" }}>What I've Built</p>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(48px,6vw,80px)", color: "#fff", lineHeight: 0.95, opacity: inView?1:0, transform: inView?"none":"translateY(24px)", transition: "all 0.7s ease 0.1s" }}>Selected<br/><span style={{ WebkitTextStroke:"1px rgba(255,255,255,0.35)", color:"transparent" }}>Projects.</span></h2>
        </div>
        <div style={{ overflow: "hidden", paddingLeft: 52 }}>
          <div style={{ display: "flex", gap, transform: `translateX(${-scrollX * Math.max(0, maxTx)}px)`, transition: "transform 0.0s linear", willChange: "transform" }}>
            {projects.map((p) => (
              <div key={p.title} style={{ minWidth: cardW, height: 340, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                    <span style={{ padding: "5px 14px", borderRadius: 50, fontSize: 11, background: p.color+"20", color: p.color, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>{p.tag}</span>
                    <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 22 }}>↗</span>
                  </div>
                  <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 32, color: "#fff", marginBottom: 14 }}>{p.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.7, fontWeight: 300 }}>{p.desc}</p>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {p.tech.map(t => <span key={t} style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", padding: "4px 10px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 50 }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ margin: "32px 52px 0", height: 1, background: "rgba(255,255,255,0.07)" }}>
          <div style={{ height: "100%", width: `${scrollX*100}%`, background: "#e63c2f", transition: "width 0.08s" }} />
        </div>
      </div>
    </section>
  );
}