const fs = require('fs');

const code = fs.readFileSync('c:/Users/ARJUN DUBEY/OneDrive/Desktop/port/src/app/page.tsx', 'utf-8').split('\n');

const extract = (start, end) => code.slice(start - 1, end).join('\n');

const PHOTO = extract(6, 6);
const useInView = extract(8, 19);
const useScrollY = extract(21, 29);
const S = extract(31, 43);
const Nav = extract(45, 57);
const Hero = extract(59, 110);
const About = extract(112, 135);
const SkillCardAndSkills = extract(137, 202);
const Projects = extract(204, 264);
const Experience = extract(266, 297);
const Contact = extract(299, 318);

fs.mkdirSync('c:/Users/ARJUN DUBEY/OneDrive/Desktop/port/src/components', { recursive: true });

fs.writeFileSync('c:/Users/ARJUN DUBEY/OneDrive/Desktop/port/src/components/shared.ts', 
  `${PHOTO}\n\n${S}\nexport { PHOTO, S };`
);

fs.writeFileSync('c:/Users/ARJUN DUBEY/OneDrive/Desktop/port/src/components/hooks.ts', 
  `'use client';\nimport { useState, useEffect, useRef } from 'react';\n\n${useInView.replace('function useInView', 'export function useInView')}\n\n${useScrollY.replace('function useScrollY', 'export function useScrollY')}`
);

fs.writeFileSync('c:/Users/ARJUN DUBEY/OneDrive/Desktop/port/src/components/Nav.tsx', 
  `'use client';\nimport { S } from './shared';\n\n${Nav.replace('function Nav', 'export default function Nav')}`
);

fs.writeFileSync('c:/Users/ARJUN DUBEY/OneDrive/Desktop/port/src/components/Hero.tsx', 
  `'use client';\nimport { useState, useEffect } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport { S, PHOTO } from './shared';\n\n${Hero.replace('function Hero', 'export default function Hero')}`
);

fs.writeFileSync('c:/Users/ARJUN DUBEY/OneDrive/Desktop/port/src/components/About.tsx', 
  `'use client';\nimport { useInView } from './hooks';\n\n${About.replace('function About', 'export default function About')}`
);

fs.writeFileSync('c:/Users/ARJUN DUBEY/OneDrive/Desktop/port/src/components/Skills.tsx', 
  `'use client';\nimport { useRef } from 'react';\nimport { motion, useScroll, useTransform } from 'framer-motion';\n\n${SkillCardAndSkills.replace('function Skills', 'export default function Skills')}`
);

fs.writeFileSync('c:/Users/ARJUN DUBEY/OneDrive/Desktop/port/src/components/Projects.tsx', 
  `'use client';\nimport { useState, useEffect, useRef } from 'react';\nimport { useInView } from './hooks';\n\n${Projects.replace('function Projects', 'export default function Projects')}`
);

fs.writeFileSync('c:/Users/ARJUN DUBEY/OneDrive/Desktop/port/src/components/Experience.tsx', 
  `'use client';\nimport { useInView } from './hooks';\n\n${Experience.replace('function Experience', 'export default function Experience')}`
);

fs.writeFileSync('c:/Users/ARJUN DUBEY/OneDrive/Desktop/port/src/components/Contact.tsx', 
  `'use client';\nimport { useInView } from './hooks';\nimport { S } from './shared';\n\n${Contact.replace('function Contact', 'export default function Contact')}`
);

const pageTsx = `'use client';

import { useScrollY } from '../components/hooks';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

export default function Home() {
  const scrollY = useScrollY();
  return (
    <main style={{ background: '#080808' }}>
      <style>{\`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior: smooth; }
      \`}</style>
      <Nav scrolled={scrollY > 50} />
      <Hero scrollY={scrollY} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}`;

fs.writeFileSync('c:/Users/ARJUN DUBEY/OneDrive/Desktop/port/src/app/page.tsx', pageTsx);
console.log('Split complete');
