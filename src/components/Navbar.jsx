import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'CONTACT', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between pointer-events-auto">
        {/* Logo Placeholder */}
        <a href="#home" className="w-12 h-12 bg-black/80 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
          🐸
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center bg-black/80 rounded-full px-2 py-1.5 shadow-lg">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href}
                className={`px-6 py-2 rounded-full text-sm md:text-base font-bold transition-colors ${
                  activeSection === link.href.substring(1) 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          <a 
            href="#contact"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-bold transition-colors uppercase tracking-wider shadow-xl shadow-orange-500/30"
          >
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
