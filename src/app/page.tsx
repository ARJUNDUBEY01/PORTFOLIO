'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { useScrollY } from '../components/hooks';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Clones from '../components/Clones';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';

export default function Home() {
  const scrollY = useScrollY();

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true, 
      wheelMultiplier: 1, 
      touchMultiplier: 2, 
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <main style={{ background: '#080808' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
      `}</style>
      <Nav scrolled={scrollY > 50} />
      <Hero scrollY={scrollY} />
      <About />
      <Skills />
      <Projects />
      <Clones />
      <Certificates />
      <Contact />
    </main>
  );
}