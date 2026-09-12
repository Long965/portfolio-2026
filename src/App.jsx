import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const [isMuted, setIsMuted] = useState(true);
  const bgmRef = useRef(null);
  const typingRef = useRef(null);

  useEffect(() => {
    // We create Audio objects so we don't have to clutter the DOM
    bgmRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/02/10/audio_d0c6ff1cb8.mp3?filename=ambient-piano-amp-strings-10711.mp3');
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.3;

    typingRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_731518b525.mp3?filename=keyboard-typing-5997.mp3');
    typingRef.current.loop = true;
    typingRef.current.volume = 0.5;

    return () => {
      bgmRef.current.pause();
      typingRef.current.pause();
    };
  }, []);

  useEffect(() => {
    if (!isMuted) {
      bgmRef.current.play().catch(e => console.log('BGM Play Error:', e));
      typingRef.current.play().catch(e => console.log('Typing Play Error:', e));
    } else {
      if (bgmRef.current) bgmRef.current.pause();
      if (typingRef.current) typingRef.current.pause();
    }
  }, [isMuted]);

  return (
    <div className="bg-slate-900 min-h-screen text-slate-50 font-sans selection:bg-blue-500/30">
      <Navbar isMuted={isMuted} setIsMuted={setIsMuted} />
      <main>
        <Hero isMuted={isMuted} />
        <About />
        <Projects />
        <Contact />
      </main>
      
      <footer className="bg-slate-950 py-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Ly Tieu Long. All rights reserved.</p>
        <p className="mt-2">Designed & Built with React, Tailwind CSS, and Three.js</p>
      </footer>
    </div>
  );
}

export default App;
