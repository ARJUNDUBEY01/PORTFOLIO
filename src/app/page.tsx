'use client';

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
  return (
    <main style={{ background: '#080808' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior: smooth; }
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