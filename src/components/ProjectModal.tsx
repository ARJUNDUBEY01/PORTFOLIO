'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Vote, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Project {
  title: string;
  desc: string;
  tech: string[];
  image: string;
  github: string;
  live: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  if (!project) return null;

  const pollOptions = [
    { label: 'Feature A: Real-time Analytics', votes: 45 },
    { label: 'Feature B: Secure Authentication', votes: 32 },
    { label: 'Feature C: Multi-platform Support', votes: 23 },
  ];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-auto"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl h-full max-h-[90vh] bg-neutral-900 border border-white/10 rounded-[30px] overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Left Side: Info & Interactive Demo */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
              <span className="text-accent font-bold tracking-widest text-xs uppercase mb-4 block">Live Demo Experience</span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">{project.title}</h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed max-w-2xl">{project.desc}</p>

              {/* Interactive Section for Voting App */}
              {project.title === 'VOTING-APP' && (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Vote className="text-accent" size={24} />
                    <h3 className="text-xl font-bold text-white">Interactive Poll Demo</h3>
                  </div>
                  
                  {!voted ? (
                    <div className="space-y-4">
                      {pollOptions.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedOption(i)}
                          className={`w-full p-4 rounded-xl border transition-all text-left flex justify-between items-center ${
                            selectedOption === i 
                              ? 'bg-accent/20 border-accent text-white' 
                              : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                          }`}
                        >
                          {opt.label}
                          {selectedOption === i && <CheckCircle2 size={18} className="text-accent" />}
                        </button>
                      ))}
                      <button 
                        disabled={selectedOption === null}
                        onClick={() => setVoted(true)}
                        className="w-full py-4 bg-white text-black font-bold rounded-xl mt-4 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Vote
                      </button>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <div className="text-center py-4 text-accent font-bold flex items-center justify-center gap-2">
                        <CheckCircle2 size={24} /> Vote Submitted Successfully!
                      </div>
                      {pollOptions.map((opt, i) => {
                        const isWinner = i === 0;
                        return (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between text-sm text-white/60">
                              <span>{opt.label}</span>
                              <span className="font-bold text-white">{isWinner ? opt.votes + 1 : opt.votes}%</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${isWinner ? opt.votes + 1 : opt.votes}%` }}
                                className={`h-full ${isWinner ? 'bg-accent' : 'bg-white/20'}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                      <button 
                        onClick={() => { setVoted(false); setSelectedOption(null); }}
                        className="w-full text-xs text-white/40 hover:text-white uppercase tracking-widest mt-4"
                      >
                        Reset Demo
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-3 mb-12">
                {project.tech.map(t => (
                  <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white/60 uppercase tracking-widest">
                    {t}
                  </span>
                ))}
              </div>

              {/* External Links */}
              <div className="flex gap-4">
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-black text-sm hover:scale-105 transition-transform"
                >
                  <Github size={18} /> VIEW SOURCE CODE
                </a>
                {project.live !== '#' && (
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-black text-sm hover:bg-white/20 transition-all shadow-xl"
                  >
                    <ExternalLink size={18} /> VISIT LIVE PROJECT
                  </a>
                )}
              </div>
            </div>

            {/* Right Side: Visuals */}
            <div className="w-full md:w-[40%] bg-neutral-950 relative overflow-hidden hidden md:block border-l border-white/10">
              <Image 
                src={project.image}
                alt={project.title}
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-900 to-transparent" />
              
              {/* Floating Decorative Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/20 blur-[100px] rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
