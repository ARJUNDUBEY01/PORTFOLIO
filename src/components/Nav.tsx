'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { S } from './shared';

export default function Nav({ scrolled }: { scrolled: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{ ...S.nav, justifyContent: "center", background: scrolled ? "rgba(8,8,8,0.92)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.4s ease", padding: undefined }} className="w-full px-5 py-4 md:py-5">
      <div className="w-full max-w-[1280px] flex items-center justify-between mx-auto">
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
      
      {/* Desktop Links */}
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
      <a href="#contact" style={S.cta as any} className="hidden md:inline-block">Contact Me</a>

      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden text-white hover:text-[#e63c2f] transition-colors" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0c0c0c] border-b border-white/10 md:hidden flex flex-col items-center py-8 gap-6 shadow-2xl">
          {["Home","About","Skills","Projects","Clones","Certificates","Contact"].map(l => (
            <a 
              key={l} 
              href={l === "Home" ? "#" : `#${l.toLowerCase()}`} 
              style={{ ...S.link, fontSize: 16 } as any}
              onClick={() => setIsOpen(false)}
            >
              {l}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ ...S.link, fontSize: 16 } as any} onClick={() => setIsOpen(false)}>
            Resume
          </a>
          <a href="#contact" style={{ ...S.cta, fontSize: 16, marginTop: 8 } as any} onClick={() => setIsOpen(false)}>Contact Me</a>
        </div>
      )}
      </div>
    </nav>
  );
}