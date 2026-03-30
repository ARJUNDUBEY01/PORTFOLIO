'use client';
import { S } from './shared';

export default function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <nav style={{ ...S.nav, background: scrolled ? "rgba(8,8,8,0.92)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.4s ease", padding: undefined }} className="px-5 md:px-12 py-5">
      <a href="#" style={{ ...S.logo, textDecoration: "none", transition: "all 0.3s ease", display: "inline-flex" } as any} 
         onMouseEnter={e => {
           e.currentTarget.style.transform = "scale(1.1) rotate(-2deg)";
           e.currentTarget.style.color = "#e63c2f";
           (e.currentTarget.querySelector('span') as HTMLElement).style.color = "#fff";
         }} 
         onMouseLeave={e => {
           e.currentTarget.style.transform = "scale(1) rotate(0deg)";
           e.currentTarget.style.color = "#fff";
           (e.currentTarget.querySelector('span') as HTMLElement).style.color = "#e63c2f";
         }}>
        AD<span style={{ ...S.dot, transition: "color 0.3s ease" } as any}>.</span>
      </a>
      <ul style={S.links as any} className="hidden md:flex">
        {["Home","About","Skills","Projects","Clones","Certificates","Contact"].map(l => (
          <li key={l}><a href={l === "Home" ? "#" : `#${l.toLowerCase()}`} style={S.link as any}>{l}</a></li>
        ))}
        <li>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={S.link as any}>
            Resume
          </a>
        </li>
      </ul>
      <a href="#contact" style={S.cta as any} className="hidden sm:inline-block">Contact Me</a>
    </nav>
  );
}