import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-50 font-sans selection:bg-blue-500/30">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      
      <footer className="bg-slate-950 py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Ly Tieu Long. All rights reserved.</p>
        <p className="mt-2">Designed & Built with React, Tailwind CSS, and Three.js</p>
      </footer>
    </div>
  );
}

export default App;
