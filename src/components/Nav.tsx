'use client';
import { S } from './shared';

export default function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <nav style={{ ...S.nav, background: scrolled ? "rgba(8,8,8,0.92)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.4s ease" }}>
      <div style={S.logo as any}>Dev<span style={S.dot as any}>.</span></div>
      <ul style={S.links as any}>
        {["Home","About","Skills","Projects","Clones","Certificates","Contact"].map(l => (
          <li key={l}><a href={l === "Home" ? "#" : `#${l.toLowerCase()}`} style={S.link as any}>{l}</a></li>
        ))}
      </ul>
      <a href="mailto:hello@dev.com" style={S.cta as any}>hello@dev.com</a>
    </nav>
  );
}