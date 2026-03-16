'use client';

import { useState, useEffect } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Loader from '@/components/Loader';
import Cursor from '@/components/Cursor';
import Background from '@/components/Background';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force scroll to top on refresh to show intro animation
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen">
      <div className="noise" />
      <Background />
      <Cursor />
      
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      <SmoothScroll>
        <div className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </div>
      </SmoothScroll>
    </main>
  );
}
