'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { S } from './shared';
import { useLenis, scrollToId } from './LenisContext';

const NAV_ITEMS = ['Home', 'About', 'Skills', 'Projects', 'Clones', 'Certificates', 'Contact'];

export default function Nav({ scrolled }) {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  const handleNav = (section) => {
    scrollToId(section.toLowerCase(), lenis);
    setIsOpen(false);
  };

  return (
    <nav
      style={{
        ...S.nav,
        justifyContent: 'center',
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
        padding: undefined
      }}
      className="w-full px-5 py-4 md:py-5">
      
      <div className="w-full max-w-[1280px] flex items-center justify-between mx-auto">

        {/* Logo */}
        <button
          onClick={() => handleNav('home')}
          style={{ ...S.logo, textDecoration: 'none', transition: 'all 0.3s ease', display: 'inline-flex', background: 'none', border: 'none', padding: 0, cursor: 'pointer', outline: 'none' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) rotate(-2deg)';
            e.currentTarget.style.color = '#e63c2f';
            e.currentTarget.querySelector('span').style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.querySelector('span').style.color = '#e63c2f';
          }}>
          
          AD<span style={{ ...S.dot, transition: 'color 0.3s ease' }}>.</span>
        </button>

        {/* Desktop Links */}
        <ul style={S.links} className="hidden md:flex">
          {NAV_ITEMS.map((l) =>
          <li key={l}>
              <button
              onClick={() => handleNav(l)}
              style={{ ...S.link, background: 'none', border: 'none', padding: 0, cursor: 'pointer', outline: 'none' }}>
              
                {l}
              </button>
            </li>
          )}
          <li>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={S.link}>
              Resume
            </a>
          </li>
        </ul>

        {/* Desktop CTA */}
        <button
          onClick={() => handleNav('contact')}
          style={{ ...S.cta, border: 'none', cursor: 'pointer', outline: 'none', fontFamily: 'inherit' }}
          className="hidden md:inline-block">
          
          Contact Me
        </button>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white hover:text-[#e63c2f] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu">
          
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Dropdown */}
        {isOpen &&
        <div className="absolute top-full left-0 w-full bg-[#0c0c0c] border-b border-white/10 md:hidden flex flex-col items-center py-8 gap-6 shadow-2xl">
            {NAV_ITEMS.map((l) =>
          <button
            key={l}
            onClick={() => handleNav(l)}
            style={{ ...S.link, fontSize: 16, background: 'none', border: 'none', padding: 0, cursor: 'pointer', outline: 'none' }}>
            
                {l}
              </button>
          )}
            <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...S.link, fontSize: 16 }}
            onClick={() => setIsOpen(false)}>
            
              Resume
            </a>
            <button
            onClick={() => handleNav('contact')}
            style={{ ...S.cta, fontSize: 16, marginTop: 8, border: 'none', cursor: 'pointer', outline: 'none', fontFamily: 'inherit' }}>
            
              Contact Me
            </button>
          </div>
        }
      </div>
    </nav>);

}