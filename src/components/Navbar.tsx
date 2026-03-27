'use client';

import { Syne } from 'next/font/google';

const syne = Syne({ subsets: ['latin'], weight: ['800'] });

const NAV_LINKS = [
  { label: 'WORK', id: '#work' },
  { label: 'LABS', id: '#skills' },
  { label: 'INFO', id: '#about' },
  { label: 'CONTACT', id: '#contact' }
];

export default function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-[1000] mix-blend-difference pointer-events-none select-none">
      <div 
        onClick={() => scrollTo('#hero')}
        className={`${syne.className} text-2xl font-black text-white pointer-events-auto cursor-pointer tracking-tighter`}
      >
        ARJUN.
      </div>
      <div className="flex gap-8 md:gap-12 pointer-events-auto">
        {NAV_LINKS.map((link) => (
          <button 
            key={link.label}
            onClick={() => scrollTo(link.id)}
            className="text-[10px] font-black text-white/70 hover:text-white tracking-[0.3em] transition-colors"
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
